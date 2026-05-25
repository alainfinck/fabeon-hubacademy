import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react'
import type { HubEvent } from '../../types'
import { CardCoverImage } from '../CardCoverImage'
import { coverFallbackSeed, getEventCoverImage } from '../../data/coverImages'
import {
  eventFormatLabels,
  eventTypeColors,
  eventTypeLabels,
  formatEventDateRange,
  isEventPast,
} from '../../lib/eventUtils'

interface Props {
  event: HubEvent
}

export function EventCard({ event }: Props) {
  const past = isEventPast(event)

  return (
    <Link
      to={`/evenements/${event.slug}`}
      className={`group relative block rounded-2xl card-base overflow-hidden card-glow transition-all ${
        past ? 'opacity-75' : 'hover:border-brand-500/30'
      }`}
    >
      <div className="relative">
        <CardCoverImage
          src={getEventCoverImage(event)}
          imageGradient={event.imageGradient}
          alt={event.title}
          className="h-36"
          fallbackSeed={coverFallbackSeed(event.id)}
        />
        {event.featured && !past && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-heading shadow-sm">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            À la une
          </span>
        )}
        {past && (
          <span className="absolute top-3 right-3 z-10 text-xs font-medium px-2 py-0.5 rounded-full bg-slate-900/80 text-white">
            Terminé
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${eventTypeColors[event.type]}`}
          >
            {eventTypeLabels[event.type]}
          </span>
          <span className="text-xs badge-muted px-2 py-0.5 rounded">
            {eventFormatLabels[event.format]}
          </span>
        </div>

        <h3 className="font-display font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-2">
          {event.title}
        </h3>

        <p className="text-sm text-muted mt-2 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <ul className="mt-4 space-y-1.5 text-xs text-muted">
          <li className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-brand-600 dark:text-brand-400" />
            {formatEventDateRange(event)}
            {event.time && <span className="text-faint">· {event.time}</span>}
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-600 dark:text-brand-400" />
            <span className="line-clamp-1">{event.location}</span>
          </li>
          {event.seats != null && event.seatsLeft != null && (
            <li className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 shrink-0 text-brand-600 dark:text-brand-400" />
              {event.seatsLeft} / {event.seats} places disponibles
            </li>
          )}
        </ul>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-theme-subtle">
          <span className="text-sm font-medium text-accent-600 dark:text-accent-400">
            {event.price}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Détails
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
