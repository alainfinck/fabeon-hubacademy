import type { CategoryId, EventType } from '../types'

const W = 640
const H = 360

/** Construit une URL Unsplash vérifiée (photo-ID sans suffixe variable). */
function u(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${W}&h=${H}&q=80`
}

/** Secours local — toujours disponible si Unsplash échoue. */
export function picsumFallback(seed: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${W}/${H}`
}

/** IDs Unsplash testés (HTTP 200) — thématiques impression / atelier. */
const photos = {
  colorChart: '1507003211169-0a1dd7228f2d',
  analytics: '1460925895917-afdab827c52f',
  factory: '1581092160562-40aa08e78837',
  retail: '1441986300917-64674bd600d8',
  carWrap: '1492144534655-ae79c964c9d7',
  fabric: '1558618666-fcd25c85cd64',
  workshop: '1582719478250-c89cae4dc85b',
  team: '1522071820081-009f0129c71c',
  office: '1552664730-d307ca884978',
  meeting: '1556761175-b413da4baf72',
  conference: '1540575467063-178a50c2df87',
  meetup: '1517245386807-bb43f82c33c4',
  laptop: '1454165804606-c3d57bc86b40',
  training: '1516321318423-f06f85e504b3',
  presentation: '1600880292203-757bb62b4baf',
  ai: '1677442136019-21780ecad995',
  design: '1516321318423-f06f85e504b3',
  photoEdit: '1516035069371-29a1b244cc32',
  building: '1486406146926-c627a92fd1ab',
} as const

const courseById: Record<string, string> = {
  'calibration-fondamentaux': u(photos.colorChart),
  'pilotage-imprimante-gf': u(photos.factory),
  'zund-decoupe-plat': u(photos.factory),
  'caldera-rip': u(photos.analytics),
  'atelier-signalétique-innovante': u(photos.retail),
  'habillage-vehicule': u(photos.carWrap),
  'sublimation-textile': u(photos.fabric),
  'onyx-gestion-production': u(photos.office),
  'ia-visuels-generatifs': u(photos.ai),
  'ia-workflow-atelier': u(photos.laptop),
  'ia-lab-signalétique': u(photos.design),
  'ia-retouche-upscale': u(photos.photoEdit),
}

export const categoryCoverImages: Record<CategoryId, string> = {
  calibration: u(photos.colorChart),
  impression: u(photos.factory),
  decoupe: u(photos.factory),
  logiciels: u(photos.analytics),
  ateliers: u(photos.workshop),
  communication: u(photos.retail),
  ia: u(photos.ai),
}

const workshopById: Record<string, string> = {
  w1: u(photos.retail),
  w2: u(photos.colorChart),
  w3: u(photos.factory),
  w4: u(photos.analytics),
  w5: u(photos.ai),
  w6: u(photos.design),
  w7: u(photos.analytics),
  w8: u(photos.carWrap),
}

const workshopExampleById: Record<string, string> = {
  ex1: u(photos.retail),
  ex2: u(photos.colorChart),
  ex3: u(photos.factory),
  ex4: u(photos.analytics),
  ex5: u(photos.carWrap),
  ex6: u(photos.workshop),
  ex7: u(photos.ai),
  ex8: u(photos.photoEdit),
}

const eventById: Record<string, string> = {
  ev1: u(photos.conference),
  ev2: u(photos.analytics),
  ev3: u(photos.conference),
  ev4: u(photos.colorChart),
  ev5: u(photos.meetup),
  ev6: u(photos.factory),
  ev7: u(photos.factory),
  ev8: u(photos.workshop),
  ev9: u(photos.ai),
  ev10: u(photos.design),
  ev11: u(photos.meetup),
}

const eventByType: Record<EventType, string> = {
  conference: u(photos.conference),
  webinar: u(photos.presentation),
  salon: u(photos.conference),
  masterclass: u(photos.workshop),
  meetup: u(photos.meetup),
}

const subscriptionById: Record<string, string> = {
  equipe: u(photos.team),
  'atelier-pro': u(photos.workshop),
  enterprise: u(photos.meeting),
}

const projectByType: Record<string, string> = {
  'Impression grand format': u(photos.factory),
  'Signalétique / retail': u(photos.retail),
  'Découpe & finition': u(photos.factory),
  'Calibration couleurs': u(photos.colorChart),
  'Autre projet atelier': u(photos.workshop),
}

const defaultCover = u(photos.workshop)

export function getCourseCoverImage(course: {
  id: string
  category: CategoryId
  imageUrl?: string
}): string {
  if (course.imageUrl) return course.imageUrl
  return courseById[course.id] ?? categoryCoverImages[course.category] ?? defaultCover
}

export function getCategoryCoverImage(categoryId: CategoryId): string {
  return categoryCoverImages[categoryId]
}

export function getWorkshopCoverImage(workshop: {
  id: string
  ia?: boolean
  imageUrl?: string
}): string {
  if (workshop.imageUrl) return workshop.imageUrl
  if (workshop.ia) return categoryCoverImages.ia
  return workshopById[workshop.id] ?? defaultCover
}

export function getWorkshopExampleCoverImage(example: { id: string }): string {
  return workshopExampleById[example.id] ?? defaultCover
}

export function getEventCoverImage(event: {
  id: string
  type: EventType
  imageUrl?: string
}): string {
  if (event.imageUrl) return event.imageUrl
  return eventById[event.id] ?? eventByType[event.type] ?? defaultCover
}

export function getSubscriptionCoverImage(plan: { id: string }): string {
  return subscriptionById[plan.id] ?? defaultCover
}

export function getEnterpriseProjectCoverImage(project: {
  projectType: string
}): string {
  return projectByType[project.projectType] ?? defaultCover
}

/** Seed stable pour le fallback picsum (par entité). */
export function coverFallbackSeed(key: string): string {
  return `fabeon-${key}`
}
