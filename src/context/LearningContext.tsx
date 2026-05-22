import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { UserProgress } from '../types'
import { api, ensureLearnerId } from '../api/client'
import { useData } from './DataContext'

const emptyProgress: UserProgress = {
  enrolledCourses: [],
  completedLessons: {},
}

interface LearningContextValue {
  progress: UserProgress
  loading: boolean
  enroll: (courseId: string) => Promise<void>
  unenroll: (courseId: string) => Promise<void>
  isEnrolled: (courseId: string) => boolean
  completeLesson: (courseId: string, lessonId: string) => Promise<void>
  isLessonComplete: (courseId: string, lessonId: string) => boolean
  getCourseProgress: (courseId: string) => number
  setLastVisited: (courseId: string, lessonId: string) => Promise<void>
}

const LearningContext = createContext<LearningContextValue | null>(null)

export function LearningProvider({ children }: { children: ReactNode }) {
  const { courses } = useData()
  const [progress, setProgress] = useState<UserProgress>(emptyProgress)
  const [loading, setLoading] = useState(true)
  const [lessonTotals, setLessonTotals] = useState<Record<string, number>>({})

  const loadProgress = useCallback(async () => {
    try {
      await ensureLearnerId()
      const p = await api.getProgress()
      setProgress(p)
    } catch {
      setProgress(emptyProgress)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  useEffect(() => {
    const totals: Record<string, number> = {}
    for (const c of courses) {
      totals[c.id] = c.lessonsCount
    }
    setLessonTotals(totals)
  }, [courses])

  const enroll = useCallback(async (courseId: string) => {
    const p = await api.enroll(courseId)
    setProgress(p)
  }, [])

  const unenroll = useCallback(async (courseId: string) => {
    const p = await api.unenroll(courseId)
    setProgress(p)
  }, [])

  const isEnrolled = useCallback(
    (courseId: string) => progress.enrolledCourses.includes(courseId),
    [progress.enrolledCourses]
  )

  const completeLesson = useCallback(async (courseId: string, lessonId: string) => {
    const p = await api.completeLesson(courseId, lessonId)
    setProgress(p)
  }, [])

  const isLessonComplete = useCallback(
    (courseId: string, lessonId: string) =>
      (progress.completedLessons[courseId] ?? []).includes(lessonId),
    [progress.completedLessons]
  )

  const getCourseProgress = useCallback(
    (courseId: string) => {
      const total = lessonTotals[courseId] ?? 0
      const done = (progress.completedLessons[courseId] ?? []).length
      return total > 0 ? Math.round((done / total) * 100) : 0
    },
    [progress.completedLessons, lessonTotals]
  )

  const setLastVisited = useCallback(async (courseId: string, lessonId: string) => {
    const p = await api.setLastVisited(courseId, lessonId)
    setProgress(p)
  }, [])

  const value = useMemo(
    () => ({
      progress,
      loading,
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
      loading,
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
