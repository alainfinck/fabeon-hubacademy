import { getDb } from './db.js'
import { categories } from '../src/data/categories.js'
import { courses } from '../src/data/courses.js'
import { workshops } from '../src/data/workshops.js'
import { events } from '../src/data/events.js'

const IA_CATEGORY = categories.find((c) => c.id === 'ia')!
const IA_COURSES = courses.filter((c) => c.category === 'ia')
const IA_WORKSHOPS = workshops.filter((w) => w.ia)
const IA_EVENTS = events.filter(
  (e) => e.topics.includes('IA') || e.slug.includes('ia-')
)

/** Ajoute thème IA, cours, ateliers et événements sur bases déjà seedées. */
export function migrateIaContent() {
  const db = getDb()

  const workshopCols = db.prepare('PRAGMA table_info(workshops)').all() as { name: string }[]
  if (!workshopCols.some((c) => c.name === 'ia')) {
    db.exec(`ALTER TABLE workshops ADD COLUMN ia INTEGER NOT NULL DEFAULT 0`)
  }

  const hasCategory = db
    .prepare('SELECT 1 FROM categories WHERE id = ?')
    .get('ia') as { 1: number } | undefined
  if (!hasCategory) {
    db.prepare(`
      INSERT INTO categories (id, label, description, icon, color)
      VALUES (@id, @label, @description, @icon, @color)
    `).run(IA_CATEGORY)
  }

  const insertCourse = db.prepare(`
    INSERT OR IGNORE INTO courses (
      id, slug, title, subtitle, description, category, level, format,
      duration, lessons_count, instructor, instructor_role, tags, featured, price,
      equipment, software, objectives, prerequisites, image_gradient, sort_order
    ) VALUES (
      @id, @slug, @title, @subtitle, @description, @category, @level, @format,
      @duration, @lessons_count, @instructor, @instructor_role, @tags, @featured, @price,
      @equipment, @software, @objectives, @prerequisites, @image_gradient, @sort_order
    )
  `)

  const maxSort = db.prepare('SELECT MAX(sort_order) as m FROM courses').get() as {
    m: number | null
  }
  let sortOrder = (maxSort.m ?? -1) + 1

  for (const course of IA_COURSES) {
    const exists = db.prepare('SELECT 1 FROM courses WHERE id = ?').get(course.id)
    if (exists) continue

    insertCourse.run({
      id: course.id,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      category: course.category,
      level: course.level,
      format: course.format,
      duration: course.duration,
      lessons_count: course.lessonsCount,
      instructor: course.instructor,
      instructor_role: course.instructorRole,
      tags: JSON.stringify(course.tags),
      featured: course.featured ? 1 : 0,
      price: course.price,
      equipment: course.equipment ? JSON.stringify(course.equipment) : null,
      software: course.software ? JSON.stringify(course.software) : null,
      objectives: JSON.stringify(course.objectives),
      prerequisites: JSON.stringify(course.prerequisites),
      image_gradient: course.imageGradient,
      sort_order: sortOrder++,
    })

    course.modules.forEach((mod, mi) => {
      db.prepare(`
        INSERT OR IGNORE INTO modules (id, course_id, title, sort_order)
        VALUES (@id, @course_id, @title, @sort_order)
      `).run({ id: mod.id, course_id: course.id, title: mod.title, sort_order: mi })

      mod.lessons.forEach((lesson, li) => {
        db.prepare(`
          INSERT OR IGNORE INTO lessons (
            id, course_id, module_id, title, duration, type, description, content, video_url, sort_order
          ) VALUES (
            @id, @course_id, @module_id, @title, @duration, @type, @description, @content, @video_url, @sort_order
          )
        `).run({
          id: lesson.id,
          course_id: course.id,
          module_id: mod.id,
          title: lesson.title,
          duration: lesson.duration,
          type: lesson.type,
          description: lesson.description,
          content: lesson.content ?? null,
          video_url: lesson.videoUrl ?? null,
          sort_order: li,
        })
      })
    })
  }

  const insertWorkshop = db.prepare(`
    INSERT OR IGNORE INTO workshops (
      id, slug, title, description, date, location, seats, seats_left,
      duration, equipment, level, price, image_gradient, sort_order, ia
    ) VALUES (
      @id, @slug, @title, @description, @date, @location, @seats, @seats_left,
      @duration, @equipment, @level, @price, @image_gradient, @sort_order, @ia
    )
  `)

  const maxWSort = db.prepare('SELECT MAX(sort_order) as m FROM workshops').get() as {
    m: number | null
  }
  let wSort = (maxWSort.m ?? -1) + 1

  for (const w of IA_WORKSHOPS) {
    const exists = db.prepare('SELECT 1 FROM workshops WHERE id = ?').get(w.id)
    if (exists) {
      db.prepare('UPDATE workshops SET ia = 1 WHERE id = ?').run(w.id)
      continue
    }
    insertWorkshop.run({
      id: w.id,
      slug: w.slug,
      title: w.title,
      description: w.description,
      date: w.date,
      location: w.location,
      seats: w.seats,
      seats_left: w.seatsLeft,
      duration: w.duration,
      equipment: JSON.stringify(w.equipment),
      level: w.level,
      price: w.price,
      image_gradient: w.imageGradient,
      sort_order: wSort++,
      ia: 1,
    })
  }

  const insertEvent = db.prepare(`
    INSERT OR IGNORE INTO events (
      id, slug, title, description, type, format, date, end_date, time_label,
      location, speakers, topics, seats, seats_left, price, free, featured, image_gradient, sort_order
    ) VALUES (
      @id, @slug, @title, @description, @type, @format, @date, @end_date, @time_label,
      @location, @speakers, @topics, @seats, @seats_left, @price, @free, @featured, @image_gradient, @sort_order
    )
  `)

  const maxESort = db.prepare('SELECT MAX(sort_order) as m FROM events').get() as {
    m: number | null
  }
  let eSort = (maxESort.m ?? -1) + 1

  for (const e of IA_EVENTS) {
    if (db.prepare('SELECT 1 FROM events WHERE id = ?').get(e.id)) continue
    insertEvent.run({
      id: e.id,
      slug: e.slug,
      title: e.title,
      description: e.description,
      type: e.type,
      format: e.format,
      date: e.date,
      end_date: e.endDate ?? null,
      time_label: e.time ?? null,
      location: e.location,
      speakers: JSON.stringify(e.speakers),
      topics: JSON.stringify(e.topics),
      seats: e.seats ?? null,
      seats_left: e.seatsLeft ?? null,
      price: e.price,
      free: e.free ? 1 : 0,
      featured: e.featured ? 1 : 0,
      image_gradient: e.imageGradient,
      sort_order: eSort++,
    })
  }
}
