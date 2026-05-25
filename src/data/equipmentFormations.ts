import type { EquipmentCategoryId } from './equipment'

export interface EquipmentFormationLinks {
  courseSlugs: string[]
  workshopSlugs: string[]
}

/** Parcours et ateliers associés à chaque machine du parc SmartFactory. */
export const equipmentFormationLinks: Record<string, EquipmentFormationLinks> = {
  'massivit-1800': {
    courseSlugs: ['atelier-signaletique-innovante', 'ia-lab-signalétique-presentiel'],
    workshopSlugs: ['lab-ia-plv-retail'],
  },
  'bambu-lab': {
    courseSlugs: ['atelier-signaletique-innovante'],
    workshopSlugs: ['atelier-retail-led'],
  },
  'hp-latex': {
    courseSlugs: [
      'pilotage-imprimante-grand-format',
      'habillage-vehicule-fleet',
      'calibration-couleurs-fondamentaux',
    ],
    workshopSlugs: ['masterclass-ia-pose-vinyle', 'atelier-retail-led'],
  },
  'epson-eco-solvant': {
    courseSlugs: ['pilotage-imprimante-grand-format', 'habillage-vehicule-fleet'],
    workshopSlugs: ['masterclass-ia-pose-vinyle'],
  },
  'epson-v7000': {
    courseSlugs: [
      'pilotage-imprimante-grand-format',
      'atelier-signaletique-innovante',
      'ia-lab-signalétique-presentiel',
      'ia-visuels-generatifs-impression',
    ],
    workshopSlugs: ['atelier-retail-led', 'lab-ia-plv-retail'],
  },
  sublimation: {
    courseSlugs: ['sublimation-textile-production', 'calibration-couleurs-fondamentaux'],
    workshopSlugs: [],
  },
  'zund-g3': {
    courseSlugs: [
      'decoupe-plat-zund',
      'atelier-signaletique-innovante',
      'ia-lab-signalétique-presentiel',
    ],
    workshopSlugs: ['zund-intensive', 'atelier-retail-led', 'lab-ia-plv-retail'],
  },
  'cabine-peinture': {
    courseSlugs: ['atelier-signaletique-innovante'],
    workshopSlugs: ['atelier-retail-led'],
  },
}

/** Formations par famille de machines (vue SmartFactory / synthèse). */
export const categoryFormationLinks: Record<EquipmentCategoryId, EquipmentFormationLinks> = {
  'impression-3d': {
    courseSlugs: ['atelier-signaletique-innovante', 'ia-lab-signalétique-presentiel'],
    workshopSlugs: ['lab-ia-plv-retail', 'atelier-retail-led'],
  },
  traceurs: {
    courseSlugs: [
      'pilotage-imprimante-grand-format',
      'habillage-vehicule-fleet',
      'calibration-couleurs-fondamentaux',
    ],
    workshopSlugs: ['masterclass-ia-pose-vinyle', 'atelier-retail-led'],
  },
  'impression-encres': {
    courseSlugs: [
      'pilotage-imprimante-grand-format',
      'sublimation-textile-production',
      'atelier-signaletique-innovante',
      'calibration-couleurs-fondamentaux',
      'ia-visuels-generatifs-impression',
    ],
    workshopSlugs: ['atelier-retail-led', 'lab-ia-plv-retail', 'calibration-terrain'],
  },
  decoupe: {
    courseSlugs: [
      'decoupe-plat-zund',
      'atelier-signaletique-innovante',
      'ia-lab-signalétique-presentiel',
    ],
    workshopSlugs: ['zund-intensive', 'atelier-retail-led', 'lab-ia-plv-retail'],
  },
  finition: {
    courseSlugs: ['atelier-signaletique-innovante'],
    workshopSlugs: ['atelier-retail-led'],
  },
}

export function getFormationLinksForEquipment(
  equipmentId: string
): EquipmentFormationLinks | undefined {
  return equipmentFormationLinks[equipmentId]
}

export function getFormationLinksForCategory(
  categoryId: EquipmentCategoryId
): EquipmentFormationLinks {
  return categoryFormationLinks[categoryId]
}
