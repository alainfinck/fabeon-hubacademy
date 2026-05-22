import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Mic2,
  Tag,
  Mail,
} from 'lucide-react'
import type { HubEvent } from '../types'
import { api } from '../api/client'
import { CONTACT } from '../data/contact'
import { PageError, PageLoader } from '../components/PageLoader'
import {
  eventFormatLabels,
  eventTypeColors,
  eventTypeLabels,
  formatEventDateRange,
  isEventPast,
} from '../lib/eventUtils'

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [event, setEvent] = useState<HubEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    api
      .getEventBySlug(slug)
      .then(setEvent)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Événement introuvable')
      )
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <PageLoader />
  if (error || !event) {
    return (
      <PageError
        message={error || 'Événement introuvable'}
        onRetry={() => window.location.reload()}
      />
    )
  }

  const past = isEventPast(event)

  return (
    <div className="pb-20">
      <div className={`h-48 sm:h-64 bg-gradient-to-br ${event.imageGradient}`} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative">
        <Link
          to="/evenements"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tous les événements
        </Link>

        <div className="rounded-2xl card-base border p-6 sm:p-8 shadow-lg dark:shadow-xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full border ${eventTypeColors[event.type]}`}
            >
              {eventTypeLabels[event.type]}
            </span>
            <span className="text-xs badge-muted px-2 py-0.5 rounded">
              {eventFormatLabels[event.format]}
            </span>
            {past && (
              <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted font-medium">
                Événement terminé
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-heading">
            {event.title}
          </h1>

          <dl className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <dt className="text-faint text-xs uppercase tracking-wide">Date</dt>
                <dd className="font-medium text-heading mt-0.5">
                  {formatEventDateRange(event)}
                </dd>
              </div>
            </div>
            {event.time && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <dt className="text-faint text-xs uppercase tracking-wide">Horaires</dt>
                  <dd className="font-medium text-heading mt-0.5">{event.time}</dd>
                </div>
              </div>
            )}
            <div className="flex items-start gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <dt className="text-faint text-xs uppercase tracking-wide">Lieu</dt>
                <dd className="font-medium text-heading mt-0.5">{event.location}</dd>
              </div>
            </div>
            {event.seats != null && event.seatsLeft != null && (
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <dt className="text-faint text-xs uppercase tracking-wide">Places</dt>
                  <dd className="font-medium text-heading mt-0.5">
                    {event.seatsLeft} / {event.seats} disponibles
                  </dd>
                </div>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Tag className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <dt className="text-faint text-xs uppercase tracking-wide">Tarif</dt>
                <dd className="font-medium text-accent-600 dark:text-accent-400 mt-0.5">
                  {event.price}
                </dd>
              </div>
            </div>
          </dl>

          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold text-heading mb-3">
              Présentation
            </h2>
            <p className="text-body leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </section>

          {event.speakers.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-heading mb-3 flex items-center gap-2">
                <Mic2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Intervenants
              </h2>
              <ul className="space-y-2">
                {event.speakers.map((s) => (
                  <li
                    key={s}
                    className="text-sm text-body px-3 py-2 rounded-lg bg-muted/50 border border-theme-subtle"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {event.topics.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-heading mb-3">
                Thématiques
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.topics.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {!past && (
            <div className="mt-10 p-5 rounded-xl bg-brand-500/10 border border-brand-500/20">
              <p className="text-sm text-body leading-relaxed">
                Pour vous inscrire ou obtenir le lien de connexion (webinar), contactez notre
                équipe formation.
              </p>
              <a
                href={`mailto:${CONTACT.email}?subject=Inscription — ${encodeURIComponent(event.title)}`}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                Demander une inscription
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
