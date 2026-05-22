import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { CourseCard } from '../components/CourseCard'
import { PageError, PageLoader } from '../components/PageLoader'
import { CourseFiltersPanel } from '../components/courses/CourseFiltersPanel'
import type { CategoryId, CourseFormat, CourseLevel } from '../types'

export function Catalog() {
  const { courses, categories, loading, error, refresh } = useData()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('categorie') as CategoryId | null
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>(
    initialCategory && categories.some((c) => c.id === initialCategory)
      ? initialCategory
      : 'all'
  )
  const [level, setLevel] = useState<CourseLevel | 'all'>('all')
  const [format, setFormat] = useState<CourseFormat | 'all'>('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return courses.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (level !== 'all' && c.level !== level) return false
      if (format !== 'all' && c.format !== format) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.instructor.toLowerCase().includes(q)
      )
    })
  }, [courses, search, category, level, format])

  const setCategoryFilter = (id: CategoryId | 'all') => {
    setCategory(id)
    if (id === 'all') {
      searchParams.delete('categorie')
    } else {
      searchParams.set('categorie', id)
    }
    setSearchParams(searchParams)
  }

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} onRetry={refresh} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-heading">
          Catalogue des cours
        </h1>
        <p className="text-muted mt-2 max-w-2xl">
          Calibration, impression grand format, découpe Zünd, logiciels RIP et communication
          visuelle — trouvez le parcours adapté à votre métier.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <CourseFiltersPanel
          categories={categories}
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategoryFilter}
          level={level}
          onLevelChange={setLevel}
          format={format}
          onFormatChange={setFormat}
        />

        <div className="flex-1">
          <p className="text-sm text-faint mb-6">
            {filtered.length} cours{filtered.length !== 1 ? 's' : ''} trouvé
            {filtered.length !== 1 ? 's' : ''}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 rounded-2xl card-base">
              <p className="text-muted">Aucun cours ne correspond à vos critères.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
