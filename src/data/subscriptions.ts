export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  seats: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'equipe',
    name: 'Équipe',
    description: 'Pour les petits ateliers qui montent en compétences',
    price: '299 €',
    period: '/ mois HT',
    seats: 'Jusqu\'à 5 apprenants',
    features: [
      'Accès illimité à tous les cours en ligne',
      'Suivi de progression par apprenant',
      'Certificats de fin de module',
      'Support email sous 48 h',
    ],
    cta: 'Souscrire — Équipe',
  },
  {
    id: 'atelier-pro',
    name: 'Atelier Pro',
    description: 'L\'offre la plus choisie par les imprimeurs',
    price: '690 €',
    period: '/ mois HT',
    seats: 'Jusqu\'à 15 apprenants',
    features: [
      'Tout le plan Équipe',
      'Tableau de bord manager',
      'Parcours personnalisés par métier',
      '1 session live Q&R / mois',
      'Priorité sur les ateliers physiques',
    ],
    highlighted: true,
    cta: 'Souscrire — Atelier Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Grandes structures & réseaux d\'impression',
    price: 'Sur devis',
    period: '',
    seats: 'Apprenants illimités',
    features: [
      'Cours en ligne illimités',
      'Dépôt de projets réels pour vos étudiants',
      'Formations intra-entreprise',
      'Account manager dédié',
      'API & reporting avancé',
    ],
    cta: 'Demander un devis',
  },
]
