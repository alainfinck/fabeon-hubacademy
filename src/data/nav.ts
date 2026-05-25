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
  Factory,
  Store,
  MessagesSquare,
  Newspaper,
  Layers,
} from 'lucide-react'
import { FABEON_PRESENTATION } from './fabeonPresentation'
import { SMART_FACTORY } from './smartFactory'
import { EXCHANGE_HUB, MARKETPLACE } from './platform'

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

/** Liens de premier niveau dans le header (sans sous-menu). */
export interface NavDirectLink {
  id: string
  to: string
  label: string
  icon: LucideIcon
}

export const navDirectLinks: NavDirectLink[] = [
  {
    id: 'smartfactory',
    to: SMART_FACTORY.path,
    label: 'SmartFactory',
    icon: Factory,
  },
]

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
        description: 'Cours vidéo en 5 langues : calibration, grand format, Caldera, Zünd.',
      },
      {
        to: MARKETPLACE.path,
        label: MARKETPLACE.shortLabel,
        icon: Store,
        title: MARKETPLACE.shortLabel,
        description: 'Déposez vos formations liées à l\'impression (formateurs externes).',
      },
      {
        to: EXCHANGE_HUB.path,
        label: EXCHANGE_HUB.shortLabel,
        icon: MessagesSquare,
        title: EXCHANGE_HUB.shortLabel,
        description: 'Partagez questions et astuces : impression, RIP, découpe, IA…',
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
    id: 'fabeon',
    label: 'Fabéon',
    icon: Layers,
    items: [
      {
        to: SMART_FACTORY.path,
        label: 'SmartFactory',
        icon: Factory,
        title: SMART_FACTORY.title,
        description: 'Parc machines : 3D, UV, latex, éco-solvant, Zünd 250×300 cm, sublimation.',
      },
      {
        to: FABEON_PRESENTATION.path,
        label: 'Présentation',
        icon: Layers,
        title: FABEON_PRESENTATION.title,
        description: 'Campus, Start-up Studio et espaces de travail au Parc d’Innovation.',
      },
      {
        to: '/actualites',
        label: 'À la une',
        icon: Newspaper,
        title: 'À la une',
        description: 'Articles Fabéon : grand format, métiers et formations.',
      },
      {
        to: '/a-propos',
        label: 'À propos',
        icon: Info,
        title: 'À propos',
        description: 'Fabeon HubAcademy et nos formateurs.',
      },
      {
        to: '/materiel',
        label: 'Matériel de formation',
        icon: GraduationCap,
        title: 'Matériel de formation',
        description: 'Équipements du HubAcademy utilisés en atelier et en cours.',
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

const navDirectPaths = new Set(navDirectLinks.map((link) => link.to))

export function isCategoryActive(category: NavCategory, pathname: string): boolean {
  return category.items.some(
    (item) =>
      !navDirectPaths.has(item.to) && isNavItemActive(item.to, pathname)
  )
}
