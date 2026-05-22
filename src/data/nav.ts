import type { LucideIcon } from 'lucide-react'
import {
  MonitorPlay,
  Wrench,
  CalendarDays,
  Infinity,
  BookOpen,
  LayoutDashboard,
  Briefcase,
  Info,
  GraduationCap,
  Building2,
  Sparkles,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  title: string
  description: string
}

export interface NavCategory {
  id: string
  label: string
  icon: LucideIcon
  items: NavItem[]
}

export const navCategories: NavCategory[] = [
  {
    id: 'formation',
    label: 'Formation',
    icon: GraduationCap,
    items: [
      {
        to: '/formation-en-ligne',
        label: 'Formation en ligne',
        icon: MonitorPlay,
        title: 'Formation en ligne',
        description: 'Cours vidéo : calibration, grand format, Caldera, Zünd.',
      },
      {
        to: '/formation-en-ligne?theme=ia',
        label: 'Parcours IA',
        icon: Sparkles,
        title: 'IA & création assistée',
        description: 'Visuels génératifs, workflow atelier et lab IA présentiel.',
      },
      {
        to: '/cours',
        label: 'Catalogue des cours',
        icon: BookOpen,
        title: 'Catalogue',
        description: 'Tous les parcours par métier et niveau.',
      },
      {
        to: '/mon-espace',
        label: 'Mon espace',
        icon: LayoutDashboard,
        title: 'Mon espace',
        description: 'Progression et cours inscrits.',
      },
    ],
  },
  {
    id: 'presentiel',
    label: 'Présentiel',
    icon: Wrench,
    items: [
      {
        to: '/ateliers',
        label: 'Ateliers physiques',
        icon: Wrench,
        title: 'Ateliers physiques',
        description: 'Sessions machines réelles à Illkirch-Graffenstaden.',
      },
      {
        to: '/ateliers?ia=1',
        label: 'Ateliers IA',
        icon: Sparkles,
        title: 'Ateliers IA',
        description: 'Labs IA, prompting print et prototypes PLV sur machines réelles.',
      },
      {
        to: '/evenements',
        label: 'Événements',
        icon: CalendarDays,
        title: 'Événements & conférences',
        description: 'Conférences, webinars, salons et meetups.',
      },
    ],
  },
  {
    id: 'entreprises',
    label: 'Entreprises',
    icon: Building2,
    items: [
      {
        to: '/abonnement',
        label: 'Abonnement',
        icon: Infinity,
        title: 'Abonnement entreprise',
        description: 'Cours illimités pour vos équipes atelier.',
      },
      {
        to: '/projets-entreprises',
        label: 'Projets terrain',
        icon: Briefcase,
        title: 'Projets entreprises',
        description: 'Consultez et déposez des projets terrain.',
      },
    ],
  },
  {
    id: 'academie',
    label: 'Académie',
    icon: Info,
    items: [
      {
        to: '/a-propos',
        label: 'À propos',
        icon: Info,
        title: 'À propos',
        description: 'Fabeon HubAcademy et nos formateurs.',
      },
    ],
  },
]

/** Tous les liens à plat (accueil, footer, etc.) */
export const allNavItems: NavItem[] = navCategories.flatMap((c) => c.items)

export function isNavItemActive(to: string, pathname: string): boolean {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function isCategoryActive(category: NavCategory, pathname: string): boolean {
  return category.items.some((item) => isNavItemActive(item.to, pathname))
}
