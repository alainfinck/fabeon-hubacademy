import type { EnterpriseProjectStatus } from '../types'

export const projectStatusLabels: Record<EnterpriseProjectStatus, string> = {
  pending: 'En attente',
  assigned: 'Attribué',
  in_progress: 'En cours',
  completed: 'Terminé',
}

export const projectStatusColors: Record<EnterpriseProjectStatus, string> = {
  pending: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
  assigned: 'bg-brand-500/15 text-brand-700 dark:text-brand-300 border-brand-500/30',
  in_progress: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
  completed: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
}

export function formatProjectDate(iso: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function excerpt(text: string, max = 140): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trim()}…`
}
