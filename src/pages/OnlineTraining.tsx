import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MonitorPlay } from 'lucide-react'
import { useData } from '../context/DataContext'
import { PageHeader } from '../components/PageHeader'
import { PageError, PageLoader } from '../components/PageLoader'
import { CourseCard } from '../components/CourseCard'
import { CourseFiltersPanel } from '../components/courses/CourseFiltersPanel'
import type { CategoryId, CourseFormat, CourseLevel } from '../types'

const ONLINE_FORMATS: CourseFormat[] = ['en-ligne', 'hybride']

export function OnlineTraining() {
  const { courses, categories, loading, error, refresh } = useData()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialCategory = searchParams.get('theme') as CategoryId | null
  const initialLevel = searchParams.get('niveau') as CourseLevel | null

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [category, setCategory] = useState<CategoryId | 'all'>(
    initialCategory && categories.some((c) => c.id === initialCategory)
      ? initialCategory
      : 'all'
  )
  const [level, setLevel] = useState<CourseLevel | 'all'>(
    initialLevel && ['debutant', 'intermediaire', 'avance', 'expert'].includes(initialLevel)
      ? initialLevel
      : 'all'
  )
  const [format, setFormat] = useState<CourseFormat | 'all'>(
    (searchParams.get('format') as CourseFormat) === 'en-ligne' ||
      searchParams.get('format') === 'hybride'
      ? (searchParams.get('format') as CourseFormat)
      : 'all'
  )

  const onlineCourses = useMemo(
    () => courses.filter((c) => ONLINE_FORMATS.includes(c.format)),
    [courses]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return onlineCourses.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (level !== 'all' && c.level !== level) return false
      if (format !== 'all' && c.format !== format) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.instructor.toLowerCase().includes(q)
      )
    })
  }, [onlineCourses, search, category, level, format])

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === '') next.delete(key)
      else next.set(key, value)
    }
    setSearchParams(next, { replace: true })
  }

  const handleCategoryChange = (id: CategoryId | 'all') => {
    setCategory(id)
    updateParams({ theme: id === 'all' ? null : id })
  }

  const handleLevelChange = (l: CourseLevel | 'all') => {
    setLevel(l)
    updateParams({ niveau: l === 'all' ? null : l })
  }

  const handleFormatChange = (f: CourseFormat | 'all') => {
    setFormat(f)
    updateParams({ format: f === 'all' ? null : f })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    updateParams({ q: value.trim() || null })
  }

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} onRetry={refresh} />

  return (
    <>
      <PageHeader
        icon={MonitorPlay}
        badge="Formation en ligne"
        title="Apprenez à votre rythme"
        description="Modules vidéo, textes, quiz et suivi de progression — disponibles en 5 langues. Filtrez par thème, niveau ou mot-clé. Formateurs externes : publiez vos parcours via la marketplace."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <CourseFiltersPanel
            categories={categories}
            search={search}
            onSearchChange={handleSearchChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            level={level}
            onLevelChange={handleLevelChange}
            format={format}
            onFormatChange={handleFormatChange}
            formatOptions={ONLINE_FORMATS}
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm text-faint mb-6">
              {filtered.length} cours en ligne trouvé{filtered.length !== 1 ? 's' : ''} sur{' '}
              {onlineCourses.length}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-16 rounded-2xl card-base border">
                <MonitorPlay className="w-10 h-10 text-faint mx-auto mb-3" />
                <p className="font-medium text-heading">Aucun cours ne correspond</p>
                <p className="text-sm text-muted mt-2">
                  Modifiez les filtres ou la recherche pour afficher d&apos;autres parcours.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} showPrice />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
