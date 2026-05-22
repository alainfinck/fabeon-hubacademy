import type { EnterpriseProjectStatus } from '../types'

export interface EnterpriseProjectSeed {
  company: string
  contactName: string
  email: string
  phone: string
  projectType: string
  description: string
  deadline: string
  status: EnterpriseProjectStatus
}

/** Projets d'exemple insérés en base au démarrage si aucun exemple n'existe encore. */
export const enterpriseProjectExamples: EnterpriseProjectSeed[] = [
  {
    company: 'Signalétique Alsace',
    contactName: 'Marie Keller',
    email: 'm.keller@signaletique-alsace.fr',
    phone: '03 88 12 45 00',
    projectType: 'Signalétique / retail',
    description:
      'Création d\'un kit PLV complet pour un réseau de pharmacies : totems 2 m, wobblers et habillages vitrine. Fichiers fournis en PDF/X-4, contrainte Delta E < 3 sur les rouges corporate.',
    deadline: '2026-06-15',
    status: 'pending',
  },
  {
    company: 'PrintShop Mulhouse',
    contactName: 'Thomas Weber',
    email: 't.weber@printshop-mulhouse.fr',
    phone: '03 89 55 22 18',
    projectType: 'Calibration & profils ICC',
    description:
      'Audit colorimétrique sur presse latex HP : chartes IT8, création profil ICC papier/backlit et rapport Delta E pour un client automobile.',
    deadline: '2026-05-30',
    status: 'in_progress',
  },
  {
    company: 'Affichage Grand Est',
    contactName: 'Sophie Martin',
    email: 's.martin@affichage-ge.fr',
    phone: '03 88 76 90 12',
    projectType: 'Impression grand format',
    description:
      'Bâche mesh 5 × 12 m pour chantier BTP : test d\'accroche, finition œillets renforcés et livrable avec fiche technique matériaux.',
    deadline: '2026-07-01',
    status: 'assigned',
  },
  {
    company: 'Déco Vision Strasbourg',
    contactName: 'Luc Berger',
    email: 'l.berger@deco-vision.fr',
    phone: '03 88 24 11 77',
    projectType: 'Découpe & finition (Zünd)',
    description:
      'Découpe router Dibond 3 mm pour stand salon modulaire 3 × 3 m : plans DXF fournis, rainures V-cut et nomenclature pièces pour montage.',
    deadline: '2026-04-20',
    status: 'completed',
  },
  {
    company: 'MediaPrint Strasbourg',
    contactName: 'Nadia El Amrani',
    email: 'n.elamrani@mediaprint.fr',
    phone: '03 88 35 60 44',
    projectType: 'Workflow RIP (Caldera, Onyx)',
    description:
      'Optimisation nesting Caldera pour série d\'étiquettes vinyle : réduction chutes, presets machine et documentation procédure pour l\'équipe.',
    deadline: '2026-06-01',
    status: 'pending',
  },
  {
    company: 'Enseignes Pro 67',
    contactName: 'Philippe Roth',
    email: 'p.roth@enseignes-pro67.fr',
    phone: '03 88 18 33 09',
    projectType: 'Autre projet atelier',
    description:
      'Prototype enseigne lumineuse lettres boîtier : découpe Plexiglas, impression face avant et câblage LED test — livrable avec photos et BOM.',
    deadline: '2026-05-15',
    status: 'assigned',
  },
]
