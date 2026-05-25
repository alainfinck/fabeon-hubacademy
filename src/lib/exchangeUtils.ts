import type { CategoryId } from '../types'
import { categories } from '../data/categories'

export function getCategoryLabel(topic: CategoryId): string {
  return categories.find((c) => c.id === topic)?.label ?? topic
}

export function formatExchangeDate(iso: string): string {
  const d = new Date(iso.includes('T') ? iso : `${iso.replace(' ', 'T')}Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function excerptBody(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  return `${flat.slice(0, max).trim()}…`
}
