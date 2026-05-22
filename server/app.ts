import express from 'express'
import cors from 'cors'
import { randomUUID } from 'crypto'
import { getDb } from './db.js'
import { seedDatabase } from './seed.js'
import { migrateContactInfo } from './migrate.js'
import { buildModules, mapCourseRow, mapWorkshopRow } from './mappers.js'
import type { UserProgress } from '../src/types/index.js'

seedDatabase()
migrateContactInfo()

const app = express()
app.use(cors())
app.use(express.json())

function ensureLearner(learnerId: string) {
  const db = getDb()
  const exists = db.prepare('SELECT id FROM learners WHERE id = ?').get(learnerId)
  if (!exists) {
    db.prepare('INSERT INTO learners (id) VALUES (?)').run(learnerId)
    db.prepare('INSERT INTO learner_meta (learner_id) VALUES (?)').run(learnerId)
  }
}

function getLearnerId(req: express.Request): string | null {
  const id = req.header('x-learner-id')
  return typeof id === 'string' && id.length > 0 ? id : null
}

function loadProgress(learnerId: string): UserProgress {
  const db = getDb()
  const enrolled = db
    .prepare('SELECT course_id FROM enrollments WHERE learner_id = ?')
    .all(learnerId) as { course_id: string }[]

  const completed = db
    .prepare(
      'SELECT course_id, lesson_id FROM completed_lessons WHERE learner_id = ?'
    )
    .all(learnerId) as { course_id: string; lesson_id: string }[]

  const completedLessons: Record<string, string[]> = {}
  for (const row of completed) {
    if (!completedLessons[row.course_id]) completedLessons[row.course_id] = []
    completedLessons[row.course_id].push(row.lesson_id)
  }

  const meta = db
    .prepare(
      'SELECT last_course_id, last_lesson_id FROM learner_meta WHERE learner_id = ?'
    )
    .get(learnerId) as
    | { last_course_id: string | null; last_lesson_id: string | null }
    | undefined

  const progress: UserProgress = {
    enrolledCourses: enrolled.map((e) => e.course_id),
    completedLessons,
  }

  if (meta?.last_course_id && meta?.last_lesson_id) {
    progress.lastVisitedLesson = {
      courseId: meta.last_course_id,
      lessonId: meta.last_lesson_id,
    }
  }

  return progress
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: 'sqlite' })
})

app.get('/api/categories', (_req, res) => {
  const rows = getDb()
    .prepare('SELECT * FROM categories ORDER BY id')
    .all()
  res.json(rows)
})

app.get('/api/courses', (_req, res) => {
  const rows = getDb()
    .prepare('SELECT * FROM courses ORDER BY sort_order')
    .all()
  res.json(rows.map((r) => mapCourseRow(r as Parameters<typeof mapCourseRow>[0], [])))
})

app.get('/api/courses/:slug', (req, res) => {
  const db = getDb()
  const row = db
    .prepare('SELECT * FROM courses WHERE slug = ?')
    .get(req.params.slug)

  if (!row) {
    res.status(404).json({ error: 'Cours introuvable' })
    return
  }

  const courseRow = row as { id: string }
  const moduleRows = db
    .prepare(
      'SELECT * FROM modules WHERE course_id = ? ORDER BY sort_order'
    )
    .all(courseRow.id)
  const lessonRows = db
    .prepare(
      'SELECT * FROM lessons WHERE course_id = ? ORDER BY sort_order'
    )
    .all(courseRow.id)

  const modules = buildModules(
    moduleRows as Parameters<typeof buildModules>[0],
    lessonRows as Parameters<typeof buildModules>[1]
  )

  res.json(mapCourseRow(row as Parameters<typeof mapCourseRow>[0], modules))
})

app.get('/api/workshops', (_req, res) => {
  const rows = getDb()
    .prepare('SELECT * FROM workshops ORDER BY sort_order')
    .all()
  res.json(rows.map((r) => mapWorkshopRow(r as Parameters<typeof mapWorkshopRow>[0])))
})

app.post('/api/learners', (_req, res) => {
  const id = randomUUID()
  ensureLearner(id)
  res.status(201).json({ id })
})

app.get('/api/progress', (req, res) => {
  const learnerId = getLearnerId(req)
  if (!learnerId) {
    res.status(400).json({ error: 'Header x-learner-id requis' })
    return
  }
  ensureLearner(learnerId)
  res.json(loadProgress(learnerId))
})

app.post('/api/progress/enroll', (req, res) => {
  const learnerId = getLearnerId(req)
  const { courseId } = req.body as { courseId?: string }
  if (!learnerId || !courseId) {
    res.status(400).json({ error: 'learner et courseId requis' })
    return
  }
  ensureLearner(learnerId)
  getDb()
    .prepare(
      'INSERT OR IGNORE INTO enrollments (learner_id, course_id) VALUES (?, ?)'
    )
    .run(learnerId, courseId)
  res.json(loadProgress(learnerId))
})

app.delete('/api/progress/enroll/:courseId', (req, res) => {
  const learnerId = getLearnerId(req)
  if (!learnerId) {
    res.status(400).json({ error: 'Header x-learner-id requis' })
    return
  }
  const db = getDb()
  db.prepare(
    'DELETE FROM enrollments WHERE learner_id = ? AND course_id = ?'
  ).run(learnerId, req.params.courseId)
  db.prepare(
    'DELETE FROM completed_lessons WHERE learner_id = ? AND course_id = ?'
  ).run(learnerId, req.params.courseId)
  res.json(loadProgress(learnerId))
})

app.post('/api/progress/lessons/complete', (req, res) => {
  const learnerId = getLearnerId(req)
  const { courseId, lessonId } = req.body as {
    courseId?: string
    lessonId?: string
  }
  if (!learnerId || !courseId || !lessonId) {
    res.status(400).json({ error: 'Paramètres manquants' })
    return
  }
  ensureLearner(learnerId)
  const db = getDb()
  db.prepare(
    'INSERT OR IGNORE INTO enrollments (learner_id, course_id) VALUES (?, ?)'
  ).run(learnerId, courseId)
  db.prepare(
    `INSERT OR IGNORE INTO completed_lessons (learner_id, course_id, lesson_id)
     VALUES (?, ?, ?)`
  ).run(learnerId, courseId, lessonId)
  db.prepare(
    `UPDATE learner_meta SET last_course_id = ?, last_lesson_id = ? WHERE learner_id = ?`
  ).run(courseId, lessonId, learnerId)
  res.json(loadProgress(learnerId))
})

app.post('/api/enterprise-projects', (req, res) => {
  const { company, contactName, email, phone, projectType, description, deadline } =
    req.body as {
      company?: string
      contactName?: string
      email?: string
      phone?: string
      projectType?: string
      description?: string
      deadline?: string
    }

  if (!company?.trim() || !contactName?.trim() || !email?.trim() || !projectType || !description?.trim()) {
    res.status(400).json({ error: 'Champs obligatoires manquants' })
    return
  }

  const result = getDb()
    .prepare(
      `INSERT INTO enterprise_projects
       (company, contact_name, email, phone, project_type, description, deadline)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      company.trim(),
      contactName.trim(),
      email.trim(),
      phone?.trim() || null,
      projectType,
      description.trim(),
      deadline || null
    )

  res.status(201).json({ id: result.lastInsertRowid, ok: true })
})

app.patch('/api/progress/last-visited', (req, res) => {
  const learnerId = getLearnerId(req)
  const { courseId, lessonId } = req.body as {
    courseId?: string
    lessonId?: string
  }
  if (!learnerId || !courseId || !lessonId) {
    res.status(400).json({ error: 'Paramètres manquants' })
    return
  }
  ensureLearner(learnerId)
  getDb()
    .prepare(
      `UPDATE learner_meta SET last_course_id = ?, last_lesson_id = ? WHERE learner_id = ?`
    )
    .run(courseId, lessonId, learnerId)
  res.json(loadProgress(learnerId))
})

export default app
