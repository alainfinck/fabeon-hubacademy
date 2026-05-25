export const SMART_FACTORY = {
  title: 'SmartFactory Fabéon',
  path: '/smartfactory',
  sourceUrl: 'https://fabeon.fr/smartfactory/',
  tagline:
    'Accélérateur industriel au Parc d’Innovation — parc machines de pointe pour prototypage, pré-série et production flexible.',
  heroImage: '/smartfactory/hero-atelier.jpg',
  heroImageAlt: 'Atelier SmartFactory Fabéon — Parc d’Innovation Illkirch',
  bannerImage: '/smartfactory/banner-smartfactory.png',
  intro: [
    'Fabéon réunit campus, studio et SmartFactory : un véritable accélérateur industriel pour accompagner la transformation digitale et responsable des entreprises, en valorisant vos idées en produits innovants, performants et prêts à être mis sur le marché.',
    'Dotée d’un parc machines de pointe — impression 2D, impression 3D petit et grand format, impression textile, électronique imprimée, sérigraphie, découpe, cabine de peinture — la SmartFactory offre une capacité de production complète et flexible, avec intégration possible de l’IoT, de la data et de l’intelligence artificielle dans vos projets.',
  ],
  contactEmail: 'franck@fabeon.fr',
} as const

export const smartFactoryGallery = [
  {
    src: '/smartfactory/galerie-atelier-1.jpg',
    alt: 'Atelier SmartFactory Fabéon — vue 1',
  },
  {
    src: '/smartfactory/galerie-atelier-2.jpg',
    alt: 'Atelier SmartFactory Fabéon — vue 2',
  },
  {
    src: '/smartfactory/galerie-atelier-3.jpg',
    alt: 'Atelier SmartFactory Fabéon — vue 3',
  },
  {
    src: '/smartfactory/galerie-espaces.jpg',
    alt: 'Espaces de travail Fabéon',
  },
  {
    src: '/smartfactory/galerie-bienvenue.jpg',
    alt: 'Accueil Parc d’Innovation Fabéon',
  },
  {
    src: '/smartfactory/galerie-coworking.png',
    alt: 'Espace coworking Fabéon',
  },
  {
    src: '/smartfactory/machine-bambu-lab.jpg',
    alt: 'Fab lab — impression 3D',
  },
  {
    src: '/smartfactory/machine-grand-format.jpg',
    alt: 'Impression grand format',
  },
] as const

export const smartFactoryServices = [
  {
    id: 'prototypage',
    title: 'Prototypage rapide et validation',
    image: '/smartfactory/service-prototypage.png',
    paragraphs: [
      'Validez vos concepts grâce à un prototypage multi-technologies, précis et adaptable à vos besoins : impression numérique 2D, 3D, textile, électronique imprimée, découpe Zünd et finitions en cabine.',
      'Accès au parc machines après prise en main et formation personnalisée, pour gagner en autonomie tout en bénéficiant de l’expertise Fabéon.',
    ],
  },
  {
    id: 'pre-serie',
    title: 'Pré-série et industrialisation',
    image: '/smartfactory/service-pre-serie.png',
    paragraphs: [
      'Réalisation de pré-séries pour tester vos produits en conditions réelles et anticiper les contraintes industrielles avant la grande série.',
      'Production des premières séries sur place après formation adaptée. Vous repartez avec des pré-séries finalisées et un cahier des charges technique prêt pour l’industrialisation.',
    ],
  },
  {
    id: 'conseil',
    title: 'Conseil et accompagnement technologique',
    image: '/smartfactory/service-conseil.png',
    list: [
      'Sélection des matériaux et procédés adaptés',
      'Choix des imprimantes et technologies d’impression',
      'Optimisation technique et fonctionnelle',
      'Intégration IoT et intelligence artificielle',
      'Formations sur-mesure (fabrication additive, design, maintenance)',
    ],
  },
] as const

export const smartFactoryEnvironment = {
  title: 'Nos valeurs environnementales',
  sections: [
    {
      heading: 'Soucieux de l’environnement',
      text: 'Démarche éco-responsable : réduction des pertes de matières, procédés optimisés et production locale « Made in France » pour limiter l’empreinte carbone.',
    },
    {
      heading: 'Actions concrètes',
      text: 'Machines sélectionnées pour leur faible consommation énergétique et la limitation du gaspillage d’encre. Supervision IoT des consommables et logiciels d’optimisation des flux d’impression.',
    },
  ],
} as const
