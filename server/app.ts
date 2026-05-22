import express from 'express'
import cors from 'cors'
import { randomUUID } from 'crypto'
import { getDb } from './db.js'
import { seedDatabase } from './seed.js'
import { migrateContactInfo } from './migrate.js'
import { migrateAuthTables } from './migrateAuth.js'
import { seedEnterpriseProjects } from './seedEnterpriseProjects.js'
import {
  mapEnterpriseProject,
  mapEnterpriseProjectDetail,
} from './enterpriseProjects.js'
import { buildModules, mapCourseRow, mapEventRow, mapWorkshopRow } from './mappers.js'
import { seedEvents } from './seedEvents.js'
import { migrateCoursePrices } from './migrateCoursePrices.js'
import { migrateIaContent } from './migrateIaContent.js'
import { createSessionToken, hashPassword, verifyPassword } from './auth.js'
import type { AuthUser, UserProgress } from '../src/types/index.js'

seedDatabase()
migrateContactInfo()
migrateAuthTables()
seedEnterpriseProjects()
seedEvents()
migrateCoursePrices()
migrateIaContent()

const SESSION_DAYS = 30

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

function getBearerToken(req: express.Request): string | null {
  const auth = req.header('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  const token = auth.slice(7).trim()
  return token.length > 0 ? token : null
}

function sessionExpiry(): string {
  const d = new Date()
  d.setDate(d.getDate() + SESSION_DAYS)
  return d.toISOString()
}

function createSession(userId: string): string {
  const db = getDb()
  const token = createSessionToken()
  db.prepare(
    'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
  ).run(token, userId, sessionExpiry())
  return token
}

function getUserFromToken(token: string): (AuthUser & { learnerId: string }) | null {
  const db = getDb()
  const row = db
    .prepare(
      `SELECT u.id, u.email, u.name, u.learner_id AS learnerId
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now')`
    )
    .get(token) as { id: string; email: string; name: string; learnerId: string } | undefined
  if (!row) return null
  return { id: row.id, email: row.email, name: row.name, learnerId: row.learnerId }
}

function mapAuthResponse(user: AuthUser & { learnerId: string }, token: string) {
  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
    learnerId: user.learnerId,
  }
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

app.get('/api/events', (req, res) => {
  const type = req.query.type as string | undefined
  const db = getDb()
  let rows: Parameters<typeof mapEventRow>[0][]

  if (type && type !== 'all') {
    rows = db
      .prepare('SELECT * FROM events WHERE type = ? ORDER BY date ASC')
      .all(type) as Parameters<typeof mapEventRow>[0][]
  } else {
    rows = db
      .prepare('SELECT * FROM events ORDER BY date ASC')
      .all() as Parameters<typeof mapEventRow>[0][]
  }

  res.json(rows.map(mapEventRow))
})

app.get('/api/events/:slug', (req, res) => {
  const row = getDb()
    .prepare('SELECT * FROM events WHERE slug = ?')
    .get(req.params.slug) as Parameters<typeof mapEventRow>[0] | undefined

  if (!row) {
    res.status(404).json({ error: 'Événement introuvable' })
    return
  }
  res.json(mapEventRow(row))
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

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body as {
    email?: string
    password?: string
    name?: string
  }

  const trimmedEmail = email?.trim().toLowerCase()
  const trimmedName = name?.trim()

  if (!trimmedEmail || !password || !trimmedName) {
    res.status(400).json({ error: 'Nom, e-mail et mot de passe requis' })
    return
  }
  if (password.length < 8) {
    res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    res.status(400).json({ error: 'Adresse e-mail invalide' })
    return
  }

  const db = getDb()
  const existing = db
    .prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE')
    .get(trimmedEmail)
  if (existing) {
    res.status(409).json({ error: 'Un compte existe déjà avec cet e-mail' })
    return
  }

  const userId = randomUUID()
  const learnerId = randomUUID()
  ensureLearner(learnerId)

  db.prepare(
    `INSERT INTO users (id, email, password_hash, name, learner_id)
     VALUES (?, ?, ?, ?, ?)`
  ).run(userId, trimmedEmail, hashPassword(password), trimmedName, learnerId)

  const user = { id: userId, email: trimmedEmail, name: trimmedName, learnerId }
  const token = createSession(userId)
  res.status(201).json(mapAuthResponse(user, token))
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string }
  const trimmedEmail = email?.trim().toLowerCase()

  if (!trimmedEmail || !password) {
    res.status(400).json({ error: 'E-mail et mot de passe requis' })
    return
  }

  const row = getDb()
    .prepare(
      'SELECT id, email, name, password_hash, learner_id AS learnerId FROM users WHERE email = ? COLLATE NOCASE'
    )
    .get(trimmedEmail) as
    | {
        id: string
        email: string
        name: string
        password_hash: string
        learnerId: string
      }
    | undefined

  if (!row || !verifyPassword(password, row.password_hash)) {
    res.status(401).json({ error: 'E-mail ou mot de passe incorrect' })
    return
  }

  ensureLearner(row.learnerId)
  const token = createSession(row.id)
  res.json(
    mapAuthResponse(
      { id: row.id, email: row.email, name: row.name, learnerId: row.learnerId },
      token
    )
  )
})

app.get('/api/auth/me', (req, res) => {
  const token = getBearerToken(req)
  if (!token) {
    res.status(401).json({ error: 'Non connecté' })
    return
  }
  const user = getUserFromToken(token)
  if (!user) {
    res.status(401).json({ error: 'Session expirée' })
    return
  }
  res.json({ user: { id: user.id, email: user.email, name: user.name }, learnerId: user.learnerId })
})

app.post('/api/auth/logout', (req, res) => {
  const token = getBearerToken(req)
  if (token) {
    getDb().prepare('DELETE FROM sessions WHERE token = ?').run(token)
  }
  res.json({ ok: true })
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

app.get('/api/enterprise-projects', (req, res) => {
  const status = req.query.status as string | undefined
  const db = getDb()
  let rows: Parameters<typeof mapEnterpriseProject>[0][]

  if (status && status !== 'all') {
    rows = db
      .prepare(
        `SELECT id, company, contact_name, email, phone, project_type, description, deadline, status, created_at
         FROM enterprise_projects WHERE status = ? ORDER BY created_at DESC`
      )
      .all(status) as Parameters<typeof mapEnterpriseProject>[0][]
  } else {
    rows = db
      .prepare(
        `SELECT id, company, contact_name, email, phone, project_type, description, deadline, status, created_at
         FROM enterprise_projects ORDER BY created_at DESC`
      )
      .all() as Parameters<typeof mapEnterpriseProject>[0][]
  }

  res.json(rows.map(mapEnterpriseProject))
})

app.get('/api/enterprise-projects/:id', (req, res) => {
  const row = getDb()
    .prepare(
      `SELECT id, company, contact_name, email, phone, project_type, description, deadline, status, created_at
       FROM enterprise_projects WHERE id = ?`
    )
    .get(req.params.id) as Parameters<typeof mapEnterpriseProjectDetail>[0] | undefined

  if (!row) {
    res.status(404).json({ error: 'Projet introuvable' })
    return
  }
  res.json(mapEnterpriseProjectDetail(row))
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
