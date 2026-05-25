import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, ArrowRight, Wrench, Clock, Sparkles } from 'lucide-react'
import type { Workshop } from '../../types'
import { workshopExamples } from '../../data/workshopExamples'
import { levelLabels } from '../../data/categories'
import { formatDate } from '../../utils/format'
import { CardCoverImage } from '../CardCoverImage'
import {
  coverFallbackSeed,
  getWorkshopCoverImage,
  getWorkshopExampleCoverImage,
} from '../../data/coverImages'

interface Props {
  workshops: Workshop[]
  embedded?: boolean
  iaHighlight?: boolean
}

export function HomeWorkshopsSection({ workshops, embedded = false, iaHighlight = false }: Props) {
  const upcoming = [...workshops]
    .filter((w) => !w.location.toLowerCase().includes('en ligne') || w.ia)
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className={embedded ? '' : 'border-y border-theme bg-section'}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? 'py-10' : 'py-20'}`}>
        {!embedded && (
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 dark:text-accent-400 mb-3">
                <Wrench className="w-4 h-4" />
                Ateliers physiques
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
                Prochaines dates & travaux en atelier
              </h2>
            </div>
            <Link
              to="/ateliers"
              className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl border border-theme hover:border-brand-500/50 text-body font-semibold text-sm transition-colors bg-surface"
            >
              Tous les ateliers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <h3 className="font-display text-lg font-semibold text-heading mb-4">
          {iaHighlight ? 'Prochains ateliers IA' : 'Prochaines sessions'}
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {upcoming.map((w) => (
            <article
              key={w.id}
              className="group rounded-2xl card-base overflow-hidden card-glow flex flex-col"
            >
              <CardCoverImage
                src={getWorkshopCoverImage(w)}
                imageGradient={w.imageGradient}
                alt={w.title}
                className="h-32"
                fallbackSeed={coverFallbackSeed(w.id)}
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {w.ia && (
                    <span className="inline-flex items-center gap-1 text-xs bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 px-2 py-0.5 rounded font-medium">
                      <Sparkles className="w-3 h-3" />
                      Atelier IA
                    </span>
                  )}
                  <span className="text-xs badge-muted px-2 py-0.5 rounded">
                    {levelLabels[w.level]}
                  </span>
                  <span className="text-xs bg-accent-500/15 text-accent-600 dark:text-accent-400 px-2 py-0.5 rounded font-medium">
                    {w.price}
                  </span>
                </div>
                <h4 className="font-display text-xl font-semibold text-heading">{w.title}</h4>
                <p className="text-muted text-sm mt-2 flex-1">{w.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                    {formatDate(w.date)}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                    {w.location}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                    {w.duration}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                    {w.seatsLeft} place{w.seatsLeft > 1 ? 's' : ''} restante{w.seatsLeft > 1 ? 's' : ''}
                  </li>
                </ul>
                <button
                  type="button"
                  className="mt-6 w-full py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
                >
                  Réserver une place
                </button>
              </div>
            </article>
          ))}
        </div>

        <h3 className="font-display text-lg font-semibold text-heading mb-4">
          Exemples de travaux en atelier
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workshopExamples.map((ex) => (
            <div
              key={ex.id}
              className="group rounded-2xl border border-theme overflow-hidden card-glow bg-surface"
            >
              <CardCoverImage
                src={getWorkshopExampleCoverImage(ex)}
                imageGradient={ex.imageGradient}
                alt={ex.title}
                className="h-28"
                fallbackSeed={coverFallbackSeed(ex.id)}
              />
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
    </div>
  )
}
