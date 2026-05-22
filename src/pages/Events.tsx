import { useMemo, useState } from 'react'
import { CalendarDays, Filter, Star } from 'lucide-react'
import type { EventType } from '../types'
import { useData } from '../context/DataContext'
import { PageHeader } from '../components/PageHeader'
import { PageError, PageLoader } from '../components/PageLoader'
import { EventCard } from '../components/events/EventCard'
import { eventTypeLabels, isEventPast } from '../lib/eventUtils'

type FilterValue = 'all' | EventType | 'upcoming' | 'past'

const filters: { value: FilterValue; label: string }[] = [
  { value: 'upcoming', label: 'À venir' },
  { value: 'all', label: 'Tous' },
  { value: 'conference', label: eventTypeLabels.conference },
  { value: 'webinar', label: eventTypeLabels.webinar },
  { value: 'salon', label: eventTypeLabels.salon },
  { value: 'masterclass', label: eventTypeLabels.masterclass },
  { value: 'meetup', label: eventTypeLabels.meetup },
  { value: 'past', label: 'Passés' },
]

export function Events() {
  const { events, loading, error, refresh } = useData()
  const [filter, setFilter] = useState<FilterValue>('upcoming')

  const filtered = useMemo(() => {
    let list = [...events]
    if (filter === 'upcoming') list = list.filter((e) => !isEventPast(e))
    else if (filter === 'past') list = list.filter((e) => isEventPast(e))
    else if (filter !== 'all') list = list.filter((e) => e.type === filter)
    return list.sort((a, b) => a.date.localeCompare(b.date))
  }, [events, filter])

  const featured = useMemo(
    () => events.filter((e) => e.featured && !isEventPast(e)).slice(0, 2),
    [events]
  )

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} onRetry={refresh} />

  return (
    <>
      <PageHeader
        icon={CalendarDays}
        badge="Événements"
        title="Conférences, webinars & salons"
        description="Rencontrez experts et formateurs Fabeon : conférences techniques, webinars RIP et découpe, salons pro et meetups de la communauté."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        {featured.length > 0 && filter === 'upcoming' && (
          <section className="mb-12">
            <h2 className="font-display text-lg font-semibold text-heading flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              À ne pas manquer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        )}

        <div className="flex items-center gap-2 flex-wrap mb-8">
          <Filter className="w-4 h-4 text-faint shrink-0" />
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/30'
                  : 'text-muted hover:text-heading border border-transparent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl card-base border">
            <CalendarDays className="w-12 h-12 text-faint mx-auto mb-4" />
            <p className="font-medium text-heading">Aucun événement pour ce filtre</p>
            <p className="text-sm text-muted mt-2">
              Revenez bientôt : de nouvelles dates sont ajoutées régulièrement.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
