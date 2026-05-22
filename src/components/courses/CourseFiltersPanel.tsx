import { Search, SlidersHorizontal } from 'lucide-react'
import { levelLabels, formatLabels } from '../../data/categories'
import type { Category, CategoryId, CourseFormat, CourseLevel } from '../../types'

const filterActive = 'bg-brand-500/15 text-brand-600 dark:text-brand-400 font-medium'
const filterIdle = 'text-muted hover:text-heading'

interface Props {
  categories: Category[]
  search: string
  onSearchChange: (value: string) => void
  category: CategoryId | 'all'
  onCategoryChange: (id: CategoryId | 'all') => void
  level: CourseLevel | 'all'
  onLevelChange: (level: CourseLevel | 'all') => void
  format?: CourseFormat | 'all'
  onFormatChange?: (format: CourseFormat | 'all') => void
  showFormatFilter?: boolean
  formatOptions?: CourseFormat[]
}

export function CourseFiltersPanel({
  categories,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  level,
  onLevelChange,
  format = 'all',
  onFormatChange,
  showFormatFilter = true,
  formatOptions,
}: Props) {
  const formats = formatOptions ?? (Object.keys(formatLabels) as CourseFormat[])

  return (
    <aside className="lg:w-64 shrink-0 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
        <input
          type="search"
          placeholder="Rechercher un cours…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-theme text-heading placeholder:text-faint focus:outline-none focus:border-brand-500/50 text-sm"
        />
      </div>

      <div className="p-5 rounded-2xl card-base space-y-5">
        <div className="flex items-center gap-2 text-sm font-medium text-body">
          <SlidersHorizontal className="w-4 h-4" />
          Filtres
        </div>

        <div>
          <label className="text-xs text-faint uppercase tracking-wide">Thème</label>
          <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
            <button
              type="button"
              onClick={() => onCategoryChange('all')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                category === 'all' ? filterActive : filterIdle
              }`}
            >
              Tous les thèmes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
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
            onChange={(e) => onLevelChange(e.target.value as CourseLevel | 'all')}
            className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-theme text-sm text-body focus:outline-none focus:border-brand-500/50"
          >
            <option value="all">Tous niveaux</option>
            {Object.entries(levelLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {showFormatFilter && onFormatChange && (
          <div>
            <label className="text-xs text-faint uppercase tracking-wide">Format</label>
            <select
              value={format}
              onChange={(e) => onFormatChange(e.target.value as CourseFormat | 'all')}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-theme text-sm text-body focus:outline-none focus:border-brand-500/50"
            >
              <option value="all">Tous formats</option>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {formatLabels[f]}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </aside>
  )
}
