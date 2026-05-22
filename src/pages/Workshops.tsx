import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { workshops } from '../data/workshops'
import { levelLabels } from '../data/categories'
import { formatDate } from '../utils/format'

export function Workshops() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-heading">
          Ateliers pratiques
        </h1>
        <p className="text-muted mt-3 max-w-2xl leading-relaxed">
          Sessions en présentiel sur machines réelles : imprimantes grand format, tables Zünd,
          stations LED et audit colorimétrique. Matériel professionnel fourni sur place.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {workshops.map((w) => (
          <article
            key={w.id}
            className="rounded-2xl card-base overflow-hidden card-glow flex flex-col"
          >
            <div className={`h-32 bg-gradient-to-br ${w.imageGradient}`} />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs badge-muted px-2 py-0.5 rounded">
                  {levelLabels[w.level]}
                </span>
                <span className="text-xs bg-accent-500/15 text-accent-600 dark:text-accent-400 px-2 py-0.5 rounded font-medium">
                  {w.price}
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold text-heading">{w.title}</h2>
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
                  {w.seatsLeft} place{w.seatsLeft > 1 ? 's' : ''} restante{w.seatsLeft > 1 ? 's' : ''} sur {w.seats}
                </li>
              </ul>

              {w.equipment.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.equipment.map((e) => (
                    <span key={e} className="text-xs badge-muted px-2 py-1 rounded">
                      {e}
                    </span>
                  ))}
                </div>
              )}

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
    </div>
  )
}
