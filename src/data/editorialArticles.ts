import type { CategoryId } from '../types'

export type EditorialBlock =
  | { type: 'intro'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

export interface EditorialArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  category: CategoryId
  heroImage: string
  heroImageAlt: string
  sourceUrl: string
  imageGradient: string
  blocks: EditorialBlock[]
  cta: {
    title: string
    paragraphs: string[]
    image: string
    imageAlt: string
  }
}

/** Contenus repris de fabeon.fr — articles « À la une ». */
export const editorialArticles: EditorialArticle[] = [
  {
    id: 'impression-grand-format-2025',
    slug: 'captez-tous-les-regards-avec-limpression-grand-format',
    title: 'Captez tous les regards avec l’impression grand format',
    excerpt:
      'Vitrines, événements, enseignes, transports : l’impression grand format habille notre environnement et valorise vos produits dans toute leur grandeur.',
    publishedAt: '2025-08-07',
    category: 'impression',
    heroImage: '/editorial/impression-grand-format-hero.jpg',
    heroImageAlt:
      'Réalisation signalétique grand format — atelier Fabéon, impression et habillage d’espace',
    sourceUrl:
      'https://fabeon.fr/2025/08/07/captez-tous-les-regards-avec-limpression-grand-format/',
    imageGradient: 'from-cyan-600 to-blue-800',
    blocks: [
      {
        type: 'intro',
        text: 'Vitrines, événements, enseignes, transports : l’impression grand format habille notre environnement et valorise vos produits dans toute leur grandeur',
      },
      {
        type: 'heading',
        text: 'Une présence dans tous les espaces',
      },
      {
        type: 'paragraph',
        text: 'En ville ou sur les lieux de vente, l’impression grand format s’impose sous forme de : bâches, affiches géantes, covering de véhicules, signalétique ou encore habillages de vitrines. Elle ne se limite plus à la publicité, c’est aussi un outil stratégique pour informer, décorer ou valoriser un espace.',
      },
      {
        type: 'heading',
        text: 'Des technologies toujours plus innovantes',
      },
      {
        type: 'paragraph',
        text: 'L’impression grand format a beaucoup évolué avec l’arrivée des nouvelles technologies numériques. Les imprimeurs peuvent aujourd’hui travailler sur une grande variété de matériaux comme le vinyle, le textile, le bois ou le verre tout en garantissant une qualité d’image et une tenue remarquable, y compris en extérieur.',
      },
      {
        type: 'paragraph',
        text: 'Ces progrès s’accompagnent d’outils de découpe et de logiciels toujours plus performants, qui permettent des réalisations personnalisées, capables de répondre à des exigences complexes. Traceurs jet d’encre, imprimantes UV à plat, machines à sublimation ou rouleaux latex : chaque équipement est conçu pour répondre à des usages spécifiques.',
      },
      {
        type: 'paragraph',
        text: 'Les machines modernes intègrent de nombreuses fonctions automatisées de calibration, séchage ou de découpe, pour maximiser l’efficacité et limiter les erreurs. Ce niveau de performance demande des compétences spécifiques : gestion des encres, profils colorimétriques, maintenance régulière. Autant de savoir-faire essentiels à la maîtrise de ces outils.',
      },
      {
        type: 'heading',
        text: 'De nouveaux profils métiers en pleine expansion',
      },
      {
        type: 'paragraph',
        text: 'Avec cette évolution rapide du secteur, de nouveaux métiers ont vu le jour. Ils croisent souvent les domaines du graphisme, de la technique et de la gestion de projet. Parmi eux :',
      },
      {
        type: 'list',
        items: [
          'Opérateur d’impression numérique grand format',
          'Technicien polyvalent en signalétique',
          'Poseur-installateur spécialisé en covering ou signalétique',
          'Chef de projet en communication visuelle',
          'Designer print spécialisé en support grand format',
        ],
      },
    ],
    cta: {
      title: 'Envie de vous former à ces métiers ?',
      paragraphs: [
        'Que vous soyez en reconversion, en montée en compétences ou curieux du secteur, des formations existent pour vous accompagner.',
        'Contactez-nous pour en savoir plus sur nos parcours ou pour construire une formation sur mesure !',
      ],
      image: '/editorial/fabeon-cta.png',
      imageAlt: 'Fabéon — formation impression grand format',
    },
  },
]

export function getEditorialArticleBySlug(slug: string): EditorialArticle | undefined {
  return editorialArticles.find((a) => a.slug === slug)
}

export function formatEditorialDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
