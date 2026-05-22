import type { EventFormat, EventType, HubEvent } from '../types'

export const eventTypeLabels: Record<EventType, string> = {
  conference: 'Conférence',
  webinar: 'Webinar',
  salon: 'Salon',
  masterclass: 'Masterclass',
  meetup: 'Meetup',
}

export const eventFormatLabels: Record<EventFormat, string> = {
  presentiel: 'Présentiel',
  'en-ligne': 'En ligne',
  hybride: 'Hybride',
}

export const eventTypeColors: Record<EventType, string> = {
  conference: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
  webinar: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30',
  salon: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
  masterclass: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30',
  meetup: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
}

export function isEventPast(event: HubEvent): boolean {
  const end = event.endDate ?? event.date
  return new Date(end) < new Date(new Date().toDateString())
}

export function formatEventDateRange(event: HubEvent): string {
  const opts: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const start = new Date(event.date).toLocaleDateString('fr-FR', opts)
  if (event.endDate && event.endDate !== event.date) {
    const end = new Date(event.endDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    })
    return `${start} → ${end}`
  }
  return start
}
