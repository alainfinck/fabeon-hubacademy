import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, ArrowRight, Wrench } from 'lucide-react'
import type { Workshop } from '../../types'
import { workshopExamples } from '../../data/workshopExamples'
import { levelLabels } from '../../data/categories'
import { formatDate } from '../../utils/format'
import { CONTACT } from '../../data/contact'

interface Props {
  workshops: Workshop[]
}

export function HomeWorkshopsSection({ workshops }: Props) {
  const upcoming = [...workshops]
    .filter((w) => !w.location.toLowerCase().includes('en ligne'))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4)

  return (
    <section
      id="ateliers-physiques"
      className="border-y border-theme bg-section scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 dark:text-accent-400 mb-3">
              <Wrench className="w-4 h-4" />
              Ateliers physiques
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              Prochaines dates & travaux en atelier
            </h2>
            <p className="text-muted mt-3 leading-relaxed">
              Sessions sur machines réelles à {CONTACT.addressLine2} — places limitées,
              encadrement par des experts terrain.
            </p>
          </div>
          <Link
            to="/ateliers"
            className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl border border-theme hover:border-brand-500/50 text-body font-semibold text-sm transition-colors bg-surface"
          >
            Tous les ateliers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <h3 className="font-display text-lg font-semibold text-heading mb-4">
          Prochaines sessions
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {upcoming.map((w) => (
            <article
              key={w.id}
              className="flex gap-4 p-5 rounded-2xl card-base card-glow"
            >
              <div
                className={`w-2 shrink-0 rounded-full bg-gradient-to-b ${w.imageGradient}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs badge-muted px-2 py-0.5 rounded">
                    {levelLabels[w.level]}
                  </span>
                  <span className="text-xs font-medium text-accent-600 dark:text-accent-400">
                    {w.price}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-heading">{w.title}</h4>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  <li className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500 shrink-0" />
                    {formatDate(w.date)}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500 shrink-0" />
                    <span className="truncate">{w.location}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500 shrink-0" />
                    {w.seatsLeft} place{w.seatsLeft > 1 ? 's' : ''} restante{w.seatsLeft > 1 ? 's' : ''}
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h3 className="font-display text-lg font-semibold text-heading mb-4">
          Exemples de travaux réalisés en atelier
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workshopExamples.map((ex) => (
            <div
              key={ex.id}
              className="rounded-2xl border border-theme overflow-hidden card-glow bg-surface"
            >
              <div className={`h-24 bg-gradient-to-br ${ex.imageGradient}`} />
              <div className="p-5">
                <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                  {ex.category}
                </span>
                <h4 className="font-display font-semibold text-heading mt-1">{ex.title}</h4>
                <p className="text-sm text-muted mt-2 leading-relaxed">{ex.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {ex.skills.map((s) => (
                    <span key={s} className="text-xs badge-muted px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
