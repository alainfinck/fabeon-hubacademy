import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'calibration',
    label: 'Calibration & couleurs',
    description: 'Profils ICC, spectrophotomètrie, Delta E et fidélité colorimétrique.',
    icon: 'Palette',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'impression',
    label: 'Impression grand format',
    description: 'Pilotage imprimantes UV, latex, solvant et sublimation.',
    icon: 'Printer',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'decoupe',
    label: 'Découpe & finition',
    description: 'Zünd, Kongsberg, router CNC et finitions de bord.',
    icon: 'Scissors',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'logiciels',
    label: 'Logiciels RIP & workflow',
    description: 'Caldera, Onyx, Fiery, nesting et automatisation.',
    icon: 'Monitor',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'ateliers',
    label: 'Ateliers fabrication',
    description: 'Prototypage, signalétique innovante et produits sur-mesure.',
    icon: 'Hammer',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'communication',
    label: 'Communication visuelle',
    description: 'Conception, habillage, retail et expérience de marque.',
    icon: 'Layers',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'ia',
    label: 'IA & création assistée',
    description:
      'Visuels génératifs, prompting, automatisation de fichiers et workflows IA pour l\'impression.',
    icon: 'Sparkles',
    color: 'from-fuchsia-500 to-violet-600',
  },
]

export const levelLabels: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  expert: 'Expert',
}

export const formatLabels: Record<string, string> = {
  'en-ligne': 'En ligne',
  atelier: 'Atelier présentiel',
  hybride: 'Hybride',
  'atelier-ia': 'Atelier IA',
}
