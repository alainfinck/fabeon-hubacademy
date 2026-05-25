import type { CategoryId, CourseFormat, CourseLevel } from '../types'

export interface MarketplaceListingExample {
  id: string
  title: string
  subtitle: string
  description: string
  category: CategoryId
  level: CourseLevel
  format: CourseFormat
  durationMinutes: number
  lessonsCount: number
  languages: string[]
  price: string
  instructor: string
  instructorRole: string
  provider: string
  imageGradient: string
  imageUrl?: string
  modules: string[]
  learnersCount: number
  rating: number
  publishedAt: string
}

/** Exemple concret affiché sur la page marketplace formateurs. */
export const marketplaceListingExample: MarketplaceListingExample = {
  id: 'marketplace-caldera-nesting',
  title: 'Nesting Caldera Grand RIP — flux multi-imprimantes',
  subtitle: 'Hotfolders, imposition et files d\'attente pour ateliers 80+ jobs/jour',
  description:
    'Parcours déposé par un intégrateur Caldera certifié : configuration des queues par machine, règles de nesting textile vs rigide, scripts de nommage et reprise sur erreur RIP. Vidéos terrain + check-lists téléchargeables.',
  category: 'logiciels',
  level: 'intermediaire',
  format: 'en-ligne',
  durationMinutes: 330,
  lessonsCount: 11,
  languages: ['Français', 'Anglais'],
  price: '279 € HT',
  instructor: 'Thomas Bertrand',
  instructorRole: 'Intégrateur RIP — 12 ans ateliers grand format',
  provider: 'Formateur externe — validé HubAcademy',
  imageGradient: 'from-orange-600 via-amber-700 to-slate-900',
  modules: [
    'Architecture Grand RIP & droits utilisateurs',
    'Hotfolders par client et par machine',
    'Nesting textile vs rigide — règles métier',
    'Scripts de nommage et reprise sur erreur',
  ],
  learnersCount: 48,
  rating: 4.8,
  publishedAt: 'mars 2026',
}
