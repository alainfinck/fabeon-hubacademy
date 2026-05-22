import type { Course } from '../types'

export function getAllLessons(course: Course) {
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  )
}

export function getLesson(course: Course, lessonId: string) {
  return getAllLessons(course).find((l) => l.id === lessonId)
}

export function countLessons(course: Course) {
  return getAllLessons(course).length
}
