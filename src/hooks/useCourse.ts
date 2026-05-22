import { useEffect, useState } from 'react'
import type { Course } from '../types'
import { useData } from '../context/DataContext'

export function useCourse(slug: string | undefined) {
  const { getCourse } = useData()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setCourse(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    getCourse(slug).then((c) => {
      if (cancelled) return
      if (!c) setError('Cours introuvable')
      setCourse(c)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [slug, getCourse])

  return { course, loading, error }
}
