import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Category, Course, HubEvent, Workshop } from '../types'
import { api } from '../api/client'
import {
  staticCategories,
  staticCourses,
  staticEvents,
  staticWorkshops,
} from '../data/staticCatalog'

interface DataContextValue {
  categories: Category[]
  courses: Course[]
  workshops: Workshop[]
  events: HubEvent[]
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
  const [events, setEvents] = useState<HubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [cats, crs, wrk, evts] = await Promise.all([
        api.getCategories(),
        api.getCourses(),
        api.getWorkshops(),
        api.getEvents(),
      ])
      setCategories(cats.length > 0 ? cats : staticCategories)
      setCourses(crs.length > 0 ? crs : staticCourses)
      setWorkshops(wrk.length > 0 ? wrk : staticWorkshops)
      setEvents(evts.length > 0 ? evts : staticEvents)
      courseCache.clear()
    } catch {
      setCategories(staticCategories)
      setCourses(staticCourses)
      setWorkshops(staticWorkshops)
      setEvents(staticEvents)
      setError(null)
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
      events,
      loading,
      error,
      getCourse,
      refresh: load,
    }),
    [categories, courses, workshops, events, loading, error]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
