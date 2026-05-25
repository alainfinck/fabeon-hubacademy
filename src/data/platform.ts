export const TRAINING_LANGUAGES = [
  'Français',
  'Anglais',
  'Allemand',
  'Espagnol',
  'Italien',
] as const

export const TRAINING_LANGUAGE_COUNT = TRAINING_LANGUAGES.length

export const MARKETPLACE = {
  title: 'Marketplace formateurs',
  shortLabel: 'Marketplace formateurs',
  path: '/marketplace-formateurs',
  tagline:
    'Espace dédié aux formateurs et experts externes pour publier leurs parcours liés à l\'impression numérique et à la communication visuelle.',
  description:
    'Formateurs indépendants, fabricants, intégrateurs ou consultants : déposez vos formations (vidéo, hybride ou atelier) sur la marketplace Fabeon HubAcademy. Chaque contenu est relu par notre équipe pédagogique avant publication.',
  topics: [
    'Calibration & gestion couleur',
    'Grand format, RIP & workflow',
    'Découpe, finition & prototypage',
    'Textile, sublimation & signalétique',
    'IA appliquée à l\'atelier d\'impression',
  ],
} as const

export const EXCHANGE_HUB = {
  title: "Hub d'échange",
  shortLabel: "Hub d'échange",
  path: '/hub-echange',
  submitPath: '/hub-echange/publier',
  tagline:
    'Communauté des professionnels de l\'impression : partagez retours terrain, astuces RIP, workflows IA et questions techniques.',
  description:
    'Posez vos questions, partagez vos réglages et échangez avec imprimeurs, coloristes et intégrateurs sur les thématiques impression, découpe, RIP et IA.',
} as const
