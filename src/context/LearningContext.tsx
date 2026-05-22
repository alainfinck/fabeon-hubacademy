import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { UserProgress } from '../types'
import { getAllLessons, getCourseById } from '../data/courses'

const STORAGE_KEY = 'fabeon-learning-progress'

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as UserProgress
  } catch {
    /* ignore */
  }
  return { enrolledCourses: [], completedLessons: {} }
}

interface LearningContextValue {
  progress: UserProgress
  enroll: (courseId: string) => void
  unenroll: (courseId: string) => void
  isEnrolled: (courseId: string) => boolean
  completeLesson: (courseId: string, lessonId: string) => void
  isLessonComplete: (courseId: string, lessonId: string) => boolean
  getCourseProgress: (courseId: string) => number
  setLastVisited: (courseId: string, lessonId: string) => void
}

const LearningContext = createContext<LearningContextValue | null>(null)

export function LearningProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadProgress)

  const persist = useCallback((next: UserProgress) => {
    setProgress(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const enroll = useCallback(
    (courseId: string) => {
      if (progress.enrolledCourses.includes(courseId)) return
      persist({
        ...progress,
        enrolledCourses: [...progress.enrolledCourses, courseId],
      })
    },
    [progress, persist]
  )

  const unenroll = useCallback(
    (courseId: string) => {
      const { [courseId]: _, ...rest } = progress.completedLessons
      persist({
        ...progress,
        enrolledCourses: progress.enrolledCourses.filter((id) => id !== courseId),
        completedLessons: rest,
      })
    },
    [progress, persist]
  )

  const isEnrolled = useCallback(
    (courseId: string) => progress.enrolledCourses.includes(courseId),
    [progress.enrolledCourses]
  )

  const completeLesson = useCallback(
    (courseId: string, lessonId: string) => {
      const existing = progress.completedLessons[courseId] ?? []
      if (existing.includes(lessonId)) return
      persist({
        ...progress,
        completedLessons: {
          ...progress.completedLessons,
          [courseId]: [...existing, lessonId],
        },
        lastVisitedLesson: { courseId, lessonId },
      })
    },
    [progress, persist]
  )

  const isLessonComplete = useCallback(
    (courseId: string, lessonId: string) =>
      (progress.completedLessons[courseId] ?? []).includes(lessonId),
    [progress.completedLessons]
  )

  const getCourseProgress = useCallback(
    (courseId: string) => {
      const course = getCourseById(courseId)
      if (!course) return 0
      const total = getAllLessons(course).length
      const done = (progress.completedLessons[courseId] ?? []).length
      return total > 0 ? Math.round((done / total) * 100) : 0
    },
    [progress.completedLessons]
  )

  const setLastVisited = useCallback(
    (courseId: string, lessonId: string) => {
      persist({ ...progress, lastVisitedLesson: { courseId, lessonId } })
    },
    [progress, persist]
  )

  const value = useMemo(
    () => ({
      progress,
      enroll,
      unenroll,
      isEnrolled,
      completeLesson,
      isLessonComplete,
      getCourseProgress,
      setLastVisited,
    }),
    [
      progress,
      enroll,
      unenroll,
      isEnrolled,
      completeLesson,
      isLessonComplete,
      getCourseProgress,
      setLastVisited,
    ]
  )

  return (
    <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
  )
}

export function useLearning() {
  const ctx = useContext(LearningContext)
  if (!ctx) throw new Error('useLearning must be used within LearningProvider')
  return ctx
}
