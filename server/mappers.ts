import type { Course, Lesson, Module, Workshop } from '../src/types/index.js'
import { jsonParse } from './db.js'

interface CourseRow {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  category: string
  level: string
  format: string
  duration: number
  lessons_count: number
  instructor: string
  instructor_role: string
  tags: string
  featured: number
  equipment: string | null
  software: string | null
  objectives: string
  prerequisites: string
  image_gradient: string
}

interface ModuleRow {
  id: string
  course_id: string
  title: string
  sort_order: number
}

interface LessonRow {
  id: string
  course_id: string
  module_id: string
  title: string
  duration: number
  type: string
  description: string
  content: string | null
  video_url: string | null
  sort_order: number
}

export function mapCourseRow(row: CourseRow, modules: Module[] = []): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    category: row.category as Course['category'],
    level: row.level as Course['level'],
    format: row.format as Course['format'],
    duration: row.duration,
    lessonsCount: row.lessons_count,
    instructor: row.instructor,
    instructorRole: row.instructor_role,
    tags: jsonParse<string[]>(row.tags, []),
    featured: row.featured === 1,
    equipment: row.equipment ? jsonParse<string[]>(row.equipment, []) : undefined,
    software: row.software ? jsonParse<string[]>(row.software, []) : undefined,
    objectives: jsonParse<string[]>(row.objectives, []),
    prerequisites: jsonParse<string[]>(row.prerequisites, []),
    imageGradient: row.image_gradient,
    modules,
  }
}

export function buildModules(
  moduleRows: ModuleRow[],
  lessonRows: LessonRow[]
): Module[] {
  return moduleRows.map((m) => ({
    id: m.id,
    title: m.title,
    lessons: lessonRows
      .filter((l) => l.module_id === m.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapLessonRow),
  }))
}

function mapLessonRow(row: LessonRow): Lesson {
  return {
    id: row.id,
    title: row.title,
    duration: row.duration,
    type: row.type as Lesson['type'],
    description: row.description,
    content: row.content ?? undefined,
    videoUrl: row.video_url ?? undefined,
  }
}

export function mapWorkshopRow(row: {
  id: string
  slug: string
  title: string
  description: string
  date: string
  location: string
  seats: number
  seats_left: number
  duration: string
  equipment: string
  level: string
  price: string
  image_gradient: string
}): Workshop {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date,
    location: row.location,
    seats: row.seats,
    seatsLeft: row.seats_left,
    duration: row.duration,
    equipment: jsonParse<string[]>(row.equipment, []),
    level: row.level as Workshop['level'],
    price: row.price,
    imageGradient: row.image_gradient,
  }
}
