import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { courses } from '../data/courses'
import { categories, levelLabels, formatLabels } from '../data/categories'
import { CourseCard } from '../components/CourseCard'
import type { CategoryId, CourseLevel, CourseFormat } from '../types'

const filterActive = 'bg-brand-500/15 text-brand-600 dark:text-brand-400'
const filterIdle = 'text-muted hover:text-heading'

export function Catalog() {
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
  }, [search, category, level, format])

  const setCategoryFilter = (id: CategoryId | 'all') => {
    setCategory(id)
    if (id === 'all') {
      searchParams.delete('categorie')
    } else {
      searchParams.set('categorie', id)
    }
    setSearchParams(searchParams)
  }

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
        <aside className="lg:w-64 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
            <input
              type="search"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-theme text-heading placeholder:text-faint focus:outline-none focus:border-brand-500/50 text-sm"
            />
          </div>

          <div className="p-5 rounded-2xl card-base space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-body">
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
            </div>

            <div>
              <label className="text-xs text-faint uppercase tracking-wide">Catégorie</label>
              <div className="mt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === 'all' ? filterActive : filterIdle
                  }`}
                >
                  Toutes
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat.id ? filterActive : filterIdle
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-faint uppercase tracking-wide">Niveau</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CourseLevel | 'all')}
                className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-theme text-sm text-body focus:outline-none focus:border-brand-500/50"
              >
                <option value="all">Tous niveaux</option>
                {Object.entries(levelLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-faint uppercase tracking-wide">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as CourseFormat | 'all')}
                className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-theme text-sm text-body focus:outline-none focus:border-brand-500/50"
              >
                <option value="all">Tous formats</option>
                {Object.entries(formatLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <p className="text-sm text-faint mb-6">
            {filtered.length} cours{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
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
