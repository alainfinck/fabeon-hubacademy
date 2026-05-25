import type { LucideIcon } from 'lucide-react'
import { Building2, GraduationCap, Rocket } from 'lucide-react'

export interface PresentationAudience {
  title: string
  description: string
  ctaLabel: string
  ctaTo: string
}

export interface PresentationSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export interface FabeonPillar {
  id: string
  slug: string
  title: string
  tagline: string
  sourceUrl: string
  heroImage: string
  heroImageAlt: string
  imageGradient: string
  icon: LucideIcon
  audiences?: PresentationAudience[]
  sections: PresentationSection[]
  footerNote?: string
}

/** Contenus repris de fabeon.fr — Campus, Studio, Espaces. */
export const fabeonPillars: FabeonPillar[] = [
  {
    id: 'campus',
    slug: 'campus',
    title: 'Fabéon Campus',
    tagline:
      'Formations longues et courtes : numérique, impression, IA et métiers de demain au Parc d’Innovation.',
    sourceUrl: 'https://fabeon.fr/fabeon/campus/',
    heroImage: '/presentation/campus.jpg',
    heroImageAlt: 'Fabéon Campus — formation et alternance au Parc d’Innovation',
    imageGradient: 'from-violet-600 to-indigo-900',
    icon: GraduationCap,
    audiences: [
      {
        title: 'Lycéen, étudiant ou en reconversion',
        description:
          'Vous cherchez une formation concrète, professionnalisante et reconnue, pour apprendre un métier et intégrer rapidement le monde du travail grâce à l’alternance ?',
        ctaLabel: 'Trouver ma formation',
        ctaTo: '/formation-en-ligne',
      },
      {
        title: 'Salarié, manager ou dirigeant',
        description:
          'Vous souhaitez développer vos compétences, accompagner l’évolution de vos équipes ou anticiper les transformations digitales de votre secteur ?',
        ctaLabel: 'Découvrir le catalogue',
        ctaTo: '/cours',
      },
    ],
    sections: [
      {
        heading: 'Le campus de Fabéon, c’est…',
        paragraphs: [
          'Un lieu de formation et d’expérimentation où le numérique rencontre les métiers industriels et créatifs, au service des talents et des entreprises alsaciennes.',
        ],
      },
      {
        heading: 'Le numérique au cœur des métiers',
        paragraphs: [
          'Au campus Fabéon, nous accompagnons les entreprises et les individus dans l’intégration des technologies digitales — impression numérique, design, intelligence artificielle et automatisation — au service des métiers, de la production aux fonctions support (communication, commercial, RH).',
          'Nos formations visent des usages concrets, une montée en compétences durable, en intégrant une dimension responsable : sobriété numérique, efficacité des processus, meilleure utilisation des ressources et valorisation des compétences humaines.',
          'Le numérique comme levier de qualité, d’autonomie et de transformation responsable.',
        ],
      },
      {
        heading: 'Formations longues : préparer les métiers de demain',
        paragraphs: [
          'Nos formations longues s’adressent aux étudiants, apprenants et personnes en reconversion. Elles forment à des métiers concrets et opérationnels dans les domaines de l’impression 3D et fabrication additive, du design web et conception UI/UX, de l’intelligence artificielle et data.',
          'Les parcours combinent théorie, projets, pratique terrain et alternance pour une montée en compétences durable et immédiatement mobilisable en entreprise.',
        ],
      },
      {
        heading: 'Formations courtes : développer les compétences en entreprise',
        paragraphs: [
          'Fabéon accompagne les salariés, équipes et dirigeants dans le développement de leurs compétences numériques et organisationnelles.',
          'Les contenus sont pensés pour tous les métiers, de la production aux fonctions support, avec une approche pragmatique, orientée usages et performance.',
        ],
        list: [
          'Impression numérique, colorimétrie et industries graphiques',
          'Intelligence artificielle appliquée aux métiers de l’entreprise (production, communication, commercial…)',
          'Automatisation des tâches et des processus',
          'Impression 3D et prototypage',
        ],
      },
      {
        heading: 'Organisme de formation certifié',
        paragraphs: [
          'Installé à Strasbourg Sud au cœur du Parc d’Innovation à Illkirch-Graffenstaden, Fabéon est accessible en transport en commun. Des places de parking sont accessibles.',
          'Fabéon est un organisme de formation certifié Qualiopi, au titre des actions de formation et de la formation par apprentissage (CFA).',
        ],
      },
    ],
  },
  {
    id: 'studio',
    slug: 'studio',
    title: 'Fabéon Studio',
    tagline:
      'Start-up Studio dédié à l’accompagnement et l’accélération de projets innovants à vocation industrielle.',
    sourceUrl: 'https://fabeon.fr/fabeon-studio/',
    heroImage: '/presentation/studio.jpg',
    heroImageAlt: 'Fabéon Studio — espaces de co-working et innovation',
    imageGradient: 'from-orange-600 to-rose-900',
    icon: Rocket,
    sections: [
      {
        heading: 'Le Start-up Studio, c’est quoi ?',
        paragraphs: [
          'Le Start-up Studio de Fabéon est dédié à l’accompagnement et à l’accélération de projets innovants à vocation industrielle. Notre mission : constituer des équipes d’innovation capables de concevoir, prototyper et déployer des solutions sur mesure, en réponse aux problématiques concrètes des industriels.',
          'Nous combinons compétences, technologies, communautés et lieux d’expérimentation pour transformer une idée en solution opérationnelle et déployable.',
        ],
      },
      {
        heading: 'Ici, on mutualise !',
        paragraphs: ['Vous vous appuyez sur des compétences clés et des plateformes techniques :'],
        list: [
          'Ingénierie & savoir-faire industriel',
          'Électronique imprimée',
          'Prototypage 3D & fabrication additive',
          'Intelligence artificielle & Data',
          'Cybersécurité',
          'Développement logiciel & applications métiers',
          'UI / UX & design d’interfaces',
          'Impression numérique & industrialisation',
          'Plateformes cloud & hébergement sécurisé',
        ],
      },
      {
        heading: 'Ne pas innover seul…',
        paragraphs: ['Vous apprenez, partagez. L’innovation naît aussi des échanges informels et des regards croisés :'],
        list: [
          'Communauté de startuper',
          'Experts métiers & technologies',
          'Advisory board pour challenger son projet',
          'Connexions aux partenaires, clients et territoires',
          'Rencontres inspirantes et retours d’expérience',
          'Temps de partage entre pairs',
          'Ateliers, démonstrations, séminaires',
        ],
      },
      {
        heading: 'Un espace pour innover',
        paragraphs: ['Vous travaillez dans un environnement unique en son genre :'],
        list: [
          'Espaces de travail modulables',
          'Bureaux',
          'Espaces détente et créativité',
          'Lieu d’expérimentation',
          'Accès possible aux équipements',
        ],
      },
      {
        heading: 'Une approche responsable, inclusive et pragmatique',
        paragraphs: [
          'Au Start-up Studio Fabéon, les projets sont accompagnés dans une démarche agile, ancrée dans le réel industriel. Nous intégrons dès l’amont des enjeux environnementaux (sobriété, durabilité, optimisation des ressources) et une démarche inclusive, ouverte aux profils, aux compétences et aux parcours variés.',
          'L’objectif : faire mieux, pas forcément plus, et concevoir des solutions utiles, responsables et déployables.',
        ],
      },
    ],
  },
  {
    id: 'espaces',
    slug: 'espaces',
    title: 'Fabéon Espaces',
    tagline:
      'Espaces de travail flexibles au Parc d’Innovation d’Illkirch — journée, semaine ou longue durée.',
    sourceUrl: 'https://fabeon.fr/location-espaces/',
    heroImage: '/presentation/espaces.jpg',
    heroImageAlt: 'Fabéon — espaces de travail et de rencontres à Illkirch',
    imageGradient: 'from-teal-600 to-emerald-900',
    icon: Building2,
    sections: [
      {
        heading: 'Vous cherchez un espace de travail et de rencontres ?',
        paragraphs: [
          'Situés au cœur du Parc d’Innovation d’Illkirch, aux portes de Strasbourg Sud, nous proposons des espaces de travail flexibles à la journée, à la semaine ou en location longue durée.',
          'Profitez d’un environnement professionnel moderne et facilement accessible. Un cadre idéal pour travailler, recevoir vos clients ou organiser vos séminaires et rencontres dans un environnement confortable et dynamique.',
        ],
        list: [
          'Accès sécurisé par badge',
          'Parking sur site',
          'Places PMR',
          'Stationnement vélos',
          'Restaurants et services à proximité immédiate',
          'Espaces lumineux et climatisés',
        ],
      },
      {
        heading: 'Une approche responsable, inclusive et pragmatique',
        paragraphs: [
          'Les projets hébergés à Fabéon s’inscrivent dans une démarche agile, ancrée dans le réel industriel, avec des enjeux environnementaux (sobriété, durabilité, optimisation des ressources) et une ouverture aux profils et parcours variés.',
          'L’objectif : faire mieux, pas forcément plus, et concevoir des solutions utiles, responsables et déployables.',
        ],
      },
    ],
    footerNote:
      'Contactez-nous pour les tarifs et les disponibilités : contact@fabeon.fr ou 03 67 15 59 01.',
  },
]

export const FABEON_PRESENTATION = {
  title: 'Présentation Fabéon',
  path: '/presentation',
  intro:
    'HubAcademy s’inscrit dans l’écosystème Fabéon au Parc d’Innovation de Strasbourg Sud : campus de formation, start-up studio et espaces de travail.',
} as const

export function getFabeonPillarBySlug(slug: string): FabeonPillar | undefined {
  return fabeonPillars.find((p) => p.slug === slug)
}
