import type { CategoryId } from '../types'

export interface ExchangePostSeed {
  topic: CategoryId
  title: string
  body: string
  authorName: string
  authorRole: string
  replyCount: number
}

export const exchangePostSeeds: ExchangePostSeed[] = [
  {
    topic: 'calibration',
    title: 'Profil ICC textile : Delta E acceptable en production ?',
    body: 'Nous calibrons une Mimaki sublimation avec i1Pro3. En réception client on vise Delta E < 3 sur les gris neutres — est-ce réaliste sur du polyester mélangé ?',
    authorName: 'Sophie M.',
    authorRole: 'Coloriste — atelier signalétique',
    replyCount: 12,
  },
  {
    topic: 'impression',
    title: 'Banding sur dégradés latex 360 g/m²',
    body: 'HP Latex 800W, mode qualité, température 35 °C. Les dégradés ciel présentent des bandes toutes les 8 cm. Qui a testé un ripassage avec plus de passes ?',
    authorName: 'Marc D.',
    authorRole: 'Opérateur grand format',
    replyCount: 8,
  },
  {
    topic: 'logiciels',
    title: 'Hotfolder Caldera + nommage jobs multi-clients',
    body: 'Je cherche un schéma de nommage fichier (client_commande_support) qui évite les collisions dans le nesting automatique. Partagez vos conventions si vous en avez une stable.',
    authorName: 'Julien R.',
    authorRole: 'Responsable prépresse',
    replyCount: 15,
  },
  {
    topic: 'ia',
    title: 'Workflow IA : du prompt au fichier prêt RIP',
    body: 'Nous testons Midjourney + retouche Photoshop + export TIFF 300 dpi pour signalétique intérieure. Comment gérez-vous les droits d’usage et la validation couleur avant impression ?',
    authorName: 'Nadia K.',
    authorRole: 'Directrice création',
    replyCount: 21,
  },
  {
    topic: 'decoupe',
    title: 'Zünd : coin arrondi vs chanfrein sur Dibond 3 mm',
    body: 'Quel outil et quelle vitesse utilisez-vous pour un chanfrein 45° propre sur Dibond sans éclats sur la face imprimée ?',
    authorName: 'Thomas L.',
    authorRole: 'Chef d’atelier finition',
    replyCount: 6,
  },
  {
    topic: 'communication',
    title: 'PLV retail : résistance UV en vitrine sud',
    body: 'Enseigne mode, vitrines plein sud. Latex vs UV : retours d’expérience après 6 mois d’exposition (jaunissement, craquelures) ?',
    authorName: 'Émilie V.',
    authorRole: 'Responsable production',
    replyCount: 9,
  },
  {
    topic: 'ateliers',
    title: 'Prototype cabine peinture + découpe : séquence atelier',
    body: 'Pour un module formation, quelle séquence recommandez-vous : impression → découpe → peinture ou peinture partielle avant découpe sur supports composites ?',
    authorName: 'Formateur Fabeon',
    authorRole: 'HubAcademy — ateliers',
    replyCount: 4,
  },
]
