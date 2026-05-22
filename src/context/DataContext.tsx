import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Category, Course, Workshop } from '../types'
import { api } from '../api/client'

interface DataContextValue {
  categories: Category[]
  courses: Course[]
  workshops: Workshop[]
  loading: boolean
  error: string | null
  getCourse: (slug: string) => Promise<Course | null>
  refresh: () => Promise<void>
}

const DataContext = createContext<DataContextValue | null>(null)

const courseCache = new Map<string, Course>()

export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [cats, crs, wrk] = await Promise.all([
        api.getCategories(),
        api.getCourses(),
        api.getWorkshops(),
      ])
      setCategories(cats)
      setCourses(crs)
      setWorkshops(wrk)
      courseCache.clear()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const getCourse = async (slug: string): Promise<Course | null> => {
    if (courseCache.has(slug)) return courseCache.get(slug)!
    try {
      const course = await api.getCourseBySlug(slug)
      courseCache.set(slug, course)
      return course
    } catch {
      return null
    }
  }

  const value = useMemo(
    () => ({
      categories,
      courses,
      workshops,
      loading,
      error,
      getCourse,
      refresh: load,
    }),
    [categories, courses, workshops, loading, error]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
