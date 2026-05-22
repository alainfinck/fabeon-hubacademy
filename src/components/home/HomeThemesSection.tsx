import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Category, Course } from '../../types'
import { CategoryIcon } from '../CategoryIcon'

function parsePriceEuro(price: string): number | null {
  const m = price.match(/(\d+)/)
  return m ? Number.parseInt(m[1], 10) : null
}

interface Props {
  categories: Category[]
  courses: Course[]
}

export function HomeThemesSection({ categories, courses }: Props) {
  return (
    <section className="border-y border-theme bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
            Formations par thématique
          </h2>
          <p className="text-muted mt-3 leading-relaxed">
            Choisissez votre domaine : chaque thème regroupe les parcours adaptés à votre métier
            d&apos;atelier.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const themeCourses = courses.filter(
              (c) =>
                c.category === cat.id &&
                (c.format === 'en-ligne' || c.format === 'hybride')
            )
            const prices = themeCourses
              .map((c) => parsePriceEuro(c.price))
              .filter((p): p is number => p != null)
            const fromPrice =
              prices.length > 0 ? `À partir de ${Math.min(...prices)} € HT` : null

            return (
              <Link
                key={cat.id}
                to={`/formation-en-ligne?theme=${cat.id}`}
                className="group flex flex-col rounded-2xl card-base overflow-hidden hover:border-brand-500/40 transition-all card-glow"
              >
                <div
                  className={`h-24 bg-gradient-to-br ${cat.color} relative flex items-end p-5`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <CategoryIcon name={cat.icon} className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-theme-subtle flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-faint">
                      {themeCourses.length} parcours
                      {fromPrice && (
                        <span className="block mt-1 font-display text-base font-bold text-accent-600 dark:text-accent-400">
                          {fromPrice}
                        </span>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
                      Voir
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
