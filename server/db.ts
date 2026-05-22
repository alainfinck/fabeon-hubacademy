import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR =
  process.env.VERCEL || process.env.VERCEL_ENV
    ? '/tmp'
    : path.join(__dirname, 'data')
const DB_PATH = path.join(DATA_DIR, 'fabeon.db')

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initSchema(db)
  }
  return db
}

function initSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      level TEXT NOT NULL,
      format TEXT NOT NULL,
      duration INTEGER NOT NULL,
      lessons_count INTEGER NOT NULL,
      instructor TEXT NOT NULL,
      instructor_role TEXT NOT NULL,
      tags TEXT NOT NULL DEFAULT '[]',
      featured INTEGER NOT NULL DEFAULT 0,
      price TEXT NOT NULL DEFAULT '',
      equipment TEXT,
      software TEXT,
      objectives TEXT NOT NULL DEFAULT '[]',
      prerequisites TEXT NOT NULL DEFAULT '[]',
      image_gradient TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (category) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS modules (
      id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      title TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (id, course_id),
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      module_id TEXT NOT NULL,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      content TEXT,
      video_url TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (id, course_id),
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workshops (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      seats INTEGER NOT NULL,
      seats_left INTEGER NOT NULL,
      duration TEXT NOT NULL,
      equipment TEXT NOT NULL DEFAULT '[]',
      level TEXT NOT NULL,
      price TEXT NOT NULL,
      image_gradient TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      ia INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      learner_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      enrolled_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (learner_id, course_id),
      FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS completed_lessons (
      learner_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (learner_id, course_id, lesson_id),
      FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS learner_meta (
      learner_id TEXT PRIMARY KEY,
      last_course_id TEXT,
      last_lesson_id TEXT,
      FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL,
      format TEXT NOT NULL,
      date TEXT NOT NULL,
      end_date TEXT,
      time_label TEXT,
      location TEXT NOT NULL,
      speakers TEXT NOT NULL DEFAULT '[]',
      topics TEXT NOT NULL DEFAULT '[]',
      seats INTEGER,
      seats_left INTEGER,
      price TEXT NOT NULL,
      free INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      image_gradient TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS enterprise_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      project_type TEXT NOT NULL,
      description TEXT NOT NULL,
      deadline TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)
}

export function jsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}
