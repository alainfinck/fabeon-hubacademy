export type EquipmentCategoryId =
  | 'impression-3d'
  | 'traceurs'
  | 'impression-encres'
  | 'decoupe'
  | 'finition'

export interface EquipmentItem {
  id: string
  name: string
  brand?: string
  description: string
  specs: string[]
  technologies: string[]
  /** Logo partenaire dans public/logos/ */
  logoSrc?: string
  imageUrl: string
  imageGradient: string
  highlighted?: boolean
}

export interface EquipmentCategory {
  id: EquipmentCategoryId
  label: string
  description: string
  icon: string
  color: string
}

import { EQUIPMENT_IMAGE_PATHS } from './equipmentImages'

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: 'impression-3d',
    label: 'Impression 3D',
    description: 'Prototypage volumique, pièces grand format et production additive.',
    icon: 'Box',
    color: 'from-violet-500 to-purple-700',
  },
  {
    id: 'traceurs',
    label: 'Traceurs & éco-solvant',
    description: 'HP Latex et Epson éco-solvant pour vinyle, marquage publicitaire et grands formats.',
    icon: 'Printer',
    color: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'impression-encres',
    label: 'UV & sublimation',
    description: 'UV à plat, sublimation textile et applications textile tendu.',
    icon: 'Droplets',
    color: 'from-fuchsia-500 to-rose-700',
  },
  {
    id: 'decoupe',
    label: 'Découpe',
    description: 'Table Zünd grand format pour router, cutter et finitions de bord.',
    icon: 'Scissors',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'finition',
    label: 'Finition & peinture',
    description: 'Cabine et zone de finition pour laquage et protection des pièces.',
    icon: 'Paintbrush',
    color: 'from-orange-500 to-amber-700',
  },
]

export const equipmentItems: EquipmentItem[] = [
  {
    id: 'massivit-1800',
    name: 'Massivit 1800',
    brand: 'Massivit',
    description:
      'Imprimante 3D très grand format pour prototypes volumétriques, décors retail, mannequins et pièces de communication monumentales.',
    specs: [
      'Très grand format 3D — volumes monumentaux',
      'Résines et composites signalétique & retail',
      'Stands, PLV et volumes complexes',
    ],
    technologies: ['3D grand format', 'Prototypage', 'Retail & PLV'],
    logoSrc: '/logos/massivit.png',
    imageUrl: EQUIPMENT_IMAGE_PATHS.massivit1800,
    imageGradient: 'from-purple-600 to-violet-900',
    highlighted: true,
  },
  {
    id: 'bambu-lab',
    name: 'Imprimantes 3D Bambu Lab',
    brand: 'Bambu Lab',
    description:
      'Parc d’imprimantes 3D Bambu Lab en chambres fermées pour prototypage rapide, pièces de précision, jigs d’atelier et maquettes.',
    specs: [
      'Enceintes fermées — sécurité & stabilité thermique',
      'Plusieurs postes Bambu Lab',
      'Filaments PLA, PETG, ABS, fibres',
    ],
    technologies: ['FDM', 'Prototypage', 'Pièces techniques'],
    imageUrl: EQUIPMENT_IMAGE_PATHS.bambuLab,
    imageGradient: 'from-slate-600 to-violet-800',
  },
  {
    id: 'hp-latex',
    name: 'Imprimantes HP Latex',
    brand: 'HP',
    description:
      'Traceurs HP Latex pour impression vinyle, marquage publicitaire, bâches, signalétique intérieur / extérieur et applications roll-to-roll.',
    specs: [
      'Encres latex — sans odeur de solvant',
      'Vinyle, bâche, textile, papier peint',
      'Marquage publicitaire & signalétique',
    ],
    technologies: ['Latex', 'Vinyle', 'Grand format', 'Publicité'],
    imageUrl: EQUIPMENT_IMAGE_PATHS.hpLatex,
    imageGradient: 'from-cyan-500 to-blue-800',
    highlighted: true,
  },
  {
    id: 'epson-eco-solvant',
    name: 'Epson éco-solvant',
    brand: 'Epson',
    description:
      'Imprimante Epson éco-solvant pour signalétique, véhicules, vinyles adhésifs et supports grand format avec encres à faible impact.',
    specs: [
      'Encres éco-solvant',
      'Vinyle adhésif & signalétique',
      'Intérieur / extérieur',
    ],
    technologies: ['Éco-solvant', 'Vinyle', 'Véhicules'],
    logoSrc: '/logos/epson.png',
    imageUrl: EQUIPMENT_IMAGE_PATHS.epsonEcoSolvant,
    imageGradient: 'from-sky-500 to-cyan-900',
  },
  {
    id: 'epson-v7000',
    name: 'Epson SureColor V7000',
    brand: 'Epson',
    description:
      'Imprimante UV à plat 10 couleurs pour Forex, Dibond, verre, bois, vinyle et packaging — qualité photo, blanc et vernis.',
    specs: [
      'UV à plat — 10 couleurs',
      'Format max. 125 × 250 cm',
      'Supports rigides & souples',
    ],
    technologies: ['UV à plat', '10 couleurs', 'Forex', 'Dibond'],
    logoSrc: '/logos/epson.png',
    imageUrl: EQUIPMENT_IMAGE_PATHS.epsonV7000,
    imageGradient: 'from-indigo-500 to-blue-900',
    highlighted: true,
  },
  {
    id: 'sublimation',
    name: 'Ligne sublimation textile',
    brand: 'Epson / calandre',
    description:
      'Imprimante sublimation pour textile : sportswear, goodies, textile tendu, drapeaux et transfert sur polyester.',
    specs: [
      'Impression papier transfert',
      'Calandre professionnelle',
      'Textile tendu & sportswear',
    ],
    technologies: ['Sublimation', 'Textile', 'Textile tendu'],
    logoSrc: '/logos/epson.png',
    imageUrl: EQUIPMENT_IMAGE_PATHS.sublimation,
    imageGradient: 'from-fuchsia-500 to-pink-800',
    highlighted: true,
  },
  {
    id: 'zund-g3',
    name: 'Table de découpe Zünd',
    brand: 'Zünd',
    description:
      'Découpe grand format à plat : router Dibond & Forex, cutter vinyle, rainures V-cut et finitions de bord pour stands et signalétique.',
    specs: [
      'Format de travail 250 × 300 cm',
      'Router & cutter',
      'Dibond, Forex, carton, vinyle',
    ],
    technologies: ['Zünd', '250×300 cm', 'Router', 'Vinyle'],
    logoSrc: '/logos/4041-Zund%20Logo.svg',
    imageUrl: EQUIPMENT_IMAGE_PATHS.zund,
    imageGradient: 'from-emerald-500 to-teal-800',
    highlighted: true,
  },
  {
    id: 'cabine-peinture',
    name: 'Cabine de peinture',
    description:
      'Cabine équipée pour laquage, peinture de finition et protection des pièces imprimées ou usinées.',
    specs: [
      'Cabine de peinture professionnelle',
      'Laquage et finition protectrice',
      'Sécurité et ventilation conformes',
    ],
    technologies: ['Peinture', 'Laquage', 'Finition'],
    imageUrl: EQUIPMENT_IMAGE_PATHS.cabinePeinture,
    imageGradient: 'from-orange-600 to-rose-900',
  },
]

export function getEquipmentByCategory(categoryId: EquipmentCategoryId): EquipmentItem[] {
  const mapping: Record<EquipmentCategoryId, string[]> = {
    'impression-3d': ['massivit-1800', 'bambu-lab'],
    traceurs: ['hp-latex', 'epson-eco-solvant'],
    'impression-encres': ['epson-v7000', 'sublimation'],
    decoupe: ['zund-g3'],
    finition: ['cabine-peinture'],
  }
  const ids = mapping[categoryId]
  return equipmentItems.filter((e) => ids.includes(e.id))
}

export function getAllEquipmentGroupedByCategory(): {
  category: EquipmentCategory
  items: EquipmentItem[]
}[] {
  return equipmentCategories
    .map((category) => ({
      category,
      items: getEquipmentByCategory(category.id),
    }))
    .filter((g) => g.items.length > 0)
}
