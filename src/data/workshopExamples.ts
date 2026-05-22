export interface WorkshopExample {
  id: string
  title: string
  category: string
  description: string
  skills: string[]
  imageGradient: string
}

/** Exemples de réalisations en atelier physique */
export const workshopExamples: WorkshopExample[] = [
  {
    id: 'ex1',
    title: 'Présentoir retail LED',
    category: 'Signalétique & retail',
    description:
      'Conception, impression UV sur Dibond, découpe Zünd et intégration LED — prototype livré en 2 jours.',
    skills: ['Impression UV', 'Zünd', 'Assemblage LED'],
    imageGradient: 'from-rose-500 to-purple-700',
  },
  {
    id: 'ex2',
    title: 'Audit colorimétrique client',
    category: 'Calibration',
    description:
      'Mesure spectro sur chartes IT8, création de profil ICC et rapport Delta E pour un atelier grand format.',
    skills: ['Spectro', 'ICC', 'Delta E'],
    imageGradient: 'from-violet-500 to-indigo-700',
  },
  {
    id: 'ex3',
    title: 'Router Dibond — stand salon',
    category: 'Découpe & finition',
    description:
      'Découpe router, rainures V-cut et assemblage d\'un stand modulaire 3 × 3 m pour salon professionnel.',
    skills: ['Router CNC', 'Dibond', 'V-cut'],
    imageGradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'ex4',
    title: 'Nesting Caldera haute cadence',
    category: 'RIP & production',
    description:
      'Optimisation nesting multi-jobs, hotfolders et scripts pour un flux de 80+ impressions/jour.',
    skills: ['Caldera', 'Nesting', 'Automatisation'],
    imageGradient: 'from-orange-500 to-amber-700',
  },
  {
    id: 'ex5',
    title: 'Habillage véhicule fleet',
    category: 'Communication visuelle',
    description:
      'Vinyle cast, gabarits véhicule et pose — formation terrain sur flotte de 4 utilitaires.',
    skills: ['Vinyle cast', 'Pose', 'Fleet'],
    imageGradient: 'from-indigo-500 to-blue-700',
  },
  {
    id: 'ex6',
    title: 'Prototype packaging luxe',
    category: 'Fabrication innovante',
    description:
      'Emballage rigid box, dorure simulée et découpe kiss-cut carton — POC pour une marque cosmétique.',
    skills: ['Carton', 'Kiss-cut', 'Prototypage'],
    imageGradient: 'from-fuchsia-500 to-pink-700',
  },
]
