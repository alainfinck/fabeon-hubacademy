import { getDb } from './db.js'
import { courses } from '../src/data/courses.js'

export function migrateCoursePrices() {
  const db = getDb()
  const cols = db.prepare('PRAGMA table_info(courses)').all() as { name: string }[]
  if (!cols.some((c) => c.name === 'price')) {
    db.exec(`ALTER TABLE courses ADD COLUMN price TEXT NOT NULL DEFAULT ''`)
  }

  const update = db.prepare('UPDATE courses SET price = ? WHERE id = ?')
  for (const course of courses) {
    if (course.price) {
      update.run(course.price, course.id)
    }
  }
}
