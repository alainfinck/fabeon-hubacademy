import type { Course } from '../types'

export const courses: Course[] = [
  {
    id: 'calibration-fondamentaux',
    slug: 'calibration-couleurs-fondamentaux',
    title: 'Calibration des couleurs — Fondamentaux',
    subtitle: 'Maîtriser la chaîne colorimétrique de l\'impression numérique',
    description:
      'Apprenez à construire et maintenir des profils ICC fiables, à utiliser un spectrophotomètre et à garantir la reproductibilité des couleurs entre écran, fichier et support imprimé.',
    category: 'calibration',
    level: 'debutant',
    format: 'en-ligne',
    duration: 420,
    lessonsCount: 14,
    instructor: 'Sophie Maréchal',
    instructorRole: 'Coloriste certifiée G7 / FOGRA',
    tags: ['ICC', 'Delta E', 'Spectro', 'G7'],
    featured: true,
    equipment: ['X-Rite i1Pro', 'Barbieri Spectro LFP'],
    software: ['i1Profiler', 'ColorThink'],
    imageGradient: 'from-violet-600 via-purple-700 to-indigo-900',
    objectives: [
      'Comprendre les espaces colorimétriques (sRGB, Adobe RGB, CMYK)',
      'Créer un profil ICC papier/support',
      'Mesurer et interpréter les courbes de densité',
      'Diagnostiquer les écarts Delta E',
    ],
    prerequisites: ['Notions de base en impression numérique'],
    modules: [
      {
        id: 'm1',
        title: 'Théorie colorimétrique',
        lessons: [
          {
            id: 'l1-1',
            title: 'Introduction à la colorimétrie',
            duration: 25,
            type: 'video',
            description: 'CIE Lab, illuminants et perception visuelle.',
            content: `<p>La <strong>colorimétrie</strong> est la science qui mesure et décrit objectivement les couleurs. En impression numérique, elle permet de traduire une intention créative (écran) en résultat physique (encre sur support).</p>
<h3>Espaces colorimétriques</h3>
<ul><li><strong>sRGB</strong> — standard web et écrans grand public</li><li><strong>Adobe RGB</strong> — gamut élargi pour la photo et le print</li><li><strong>CMYK</strong> — espace soustractif de l'impression</li><li><strong>Lab (CIELAB)</strong> — espace de référence indépendant du device</li></ul>
<p>Chaque transition entre espaces implique une conversion potentiellement destructive si elle n'est pas maîtrisée.</p>`,
          },
          {
            id: 'l1-2',
            title: 'Profils ICC et chaîne colorimétrique',
            duration: 30,
            type: 'video',
            description: 'Source → RIP → imprimante → support.',
            content: `<p>Un <strong>profil ICC</strong> décrit le comportement colorimétrique d'un périphérique. La chaîne typique en grand format :</p>
<ul><li>Profil de l'écran (calibration hardware)</li><li>Profil de l'espace de travail (Adobe RGB ou ProPhoto)</li><li>Profil du RIP (Caldera, Onyx…)</li><li>Profil du couple encre/support</li></ul>
<p>La règle d'or : <strong>convertir une seule fois</strong> vers le profil de destination final.</p>`,
          },
          {
            id: 'l1-3',
            title: 'Quiz — Espaces colorimétriques',
            duration: 10,
            type: 'quiz',
            description: 'Validez vos acquis sur les bases.',
          },
        ],
      },
      {
        id: 'm2',
        title: 'Mesure et profilage',
        lessons: [
          {
            id: 'l2-1',
            title: 'Utilisation du spectrophotomètre',
            duration: 35,
            type: 'pratique',
            description: 'Patch charts, conditions D50 et procédure de mesure.',
            content: `<p>Le <strong>spectrophotomètre</strong> mesure la réflectance spectrale d'une surface imprimée. Procédure standard :</p>
<ul><li>Imprimer la charte IT8.7/4 ou custom du RIP</li><li>Laisser sécher le temps prescrit (24–48 h selon encre)</li><li>Mesurer chaque patch sans pression excessive</li><li>Exporter les mesures vers le logiciel de profilage</li></ul>`,
          },
          {
            id: 'l2-2',
            title: 'Interpréter le Delta E',
            duration: 20,
            type: 'texte',
            description: 'ΔE00, tolérances et arbitrage qualité/coût.',
            content: `<p>Le <strong>Delta E (ΔE)</strong> quantifie l'écart entre deux couleurs. En production grand format :</p>
<ul><li>ΔE &lt; 1 — imperceptible à l'œil nu</li><li>ΔE 1–2 — acceptable pour la plupart des applications</li><li>ΔE &gt; 3 — visible, action corrective requise</li></ul>
<p>Utilisez la formule <strong>ΔE00</strong> (CIEDE2000) pour les comparaisons professionnelles.</p>`,
          },
        ],
      },
    ],
  },
  {
    id: 'pilotage-imprimante-gf',
    slug: 'pilotage-imprimante-grand-format',
    title: 'Pilotage imprimante grand format',
    subtitle: 'HP Latex, Mimaki, EFI — réglages, maintenance et production',
    description:
      'Formation complète au pilotage d\'imprimantes grand format : têtes d\'impression, profils média, maintenance préventive et optimisation du débit de production.',
    category: 'impression',
    level: 'intermediaire',
    format: 'hybride',
    duration: 540,
    lessonsCount: 18,
    instructor: 'Marc Delattre',
    instructorRole: 'Technicien applicatif EFI & Mimaki',
    tags: ['Latex', 'UV', 'Maintenance', 'Production'],
    featured: true,
    equipment: ['HP Latex 700', 'Mimaki UCJV330-160', 'Système de déviation'],
    software: ['HP Print OS', 'Mimaki RasterLink'],
    imageGradient: 'from-cyan-500 via-blue-600 to-slate-900',
    objectives: [
      'Configurer les profils média par support',
      'Diagnostiquer les défauts de tête (banding, nozzles)',
      'Optimiser la vitesse/qualité selon l\'application',
      'Planifier la maintenance préventive',
    ],
    prerequisites: ['Expérience en atelier d\'impression recommandée'],
    modules: [
      {
        id: 'm1',
        title: 'Architecture des imprimantes GF',
        lessons: [
          {
            id: 'l1-1',
            title: 'Technologies d\'impression comparées',
            duration: 30,
            type: 'video',
            description: 'Latex, UV, solvant, aqueux et sublimation.',
            content: `<p>Chaque technologie impose des contraintes de production différentes :</p>
<ul><li><strong>Latex</strong> — encres aqueuses polymérisées, odeur faible, séchage rapide</li><li><strong>UV</strong> — polymérisation instantanée, supports rigides et souples</li><li><strong>Solvant / éco-solvant</strong> — pénétration dans le vinyle, outdoor durable</li><li><strong>Sublimation</strong> — polyester et textiles, transfert calandre</li></ul>`,
          },
          {
            id: 'l1-2',
            title: 'Chargement média et tension',
            duration: 25,
            type: 'pratique',
            description: 'Alignement, pinch rollers et détection de bord.',
          },
        ],
      },
      {
        id: 'm2',
        title: 'Production et qualité',
        lessons: [
          {
            id: 'l2-1',
            title: 'Profils média et modes qualité',
            duration: 35,
            type: 'video',
            description: 'Draft, production, qualité photo.',
          },
          {
            id: 'l2-2',
            title: 'Maintenance des têtes d\'impression',
            duration: 40,
            type: 'pratique',
            description: 'Nettoyage, purge, remplacement et logs.',
            content: `<p>La <strong>maintenance des têtes</strong> conditionne 80 % de la qualité d'impression. Checklist quotidienne :</p>
<ul><li>Test de nozzle avant chaque production critique</li><li>Nettoyage manuel si banding horizontal</li><li>Vérification des capots et étanchéité</li><li>Journalisation des incidents dans le carnet machine</li></ul>`,
          },
        ],
      },
    ],
  },
  {
    id: 'zund-decoupe-plat',
    slug: 'decoupe-plat-zund',
    title: 'Découpe à plat — Machines Zünd',
    subtitle: 'Router, cutter, V-cut et workflow de finition',
    description:
      'Maîtrisez les tables de découpe Zünd : configuration des outils, fichiers de découpe, matériaux composites et intégration avec le flux d\'impression amont.',
    category: 'decoupe',
    level: 'intermediaire',
    format: 'en-ligne',
    duration: 360,
    lessonsCount: 12,
    instructor: 'Julien Perrin',
    instructorRole: 'Opérateur senior Zünd & Kongsberg',
    tags: ['Zünd', 'Router', 'Kiss-cut', 'DXF'],
    featured: true,
    equipment: ['Zünd G3 L-2500', 'Module router HF', 'Module cutter'],
    software: ['Zünd Cut Center', 'Esko ArtPro'],
    imageGradient: 'from-emerald-500 via-teal-600 to-slate-900',
    objectives: [
      'Choisir l\'outil adapté au matériau',
      'Préparer les fichiers de découpe (DXF, ZCC)',
      'Paramétrer vitesse, pression et profondeur',
      'Intégrer découpe et impression en flux continu',
    ],
    prerequisites: ['Notions de CAO vectorielle'],
    modules: [
      {
        id: 'm1',
        title: 'Fondamentaux Zünd',
        lessons: [
          {
            id: 'l1-1',
            title: 'Présentation de l\'écosystème Zünd',
            duration: 20,
            type: 'video',
            description: 'Modules interchangeables et Cut Center.',
          },
          {
            id: 'l1-2',
            title: 'Préparation des fichiers de découpe',
            duration: 30,
            type: 'texte',
            description: 'Calques, repères et compensation kerf.',
            content: `<p>Les fichiers de découpe doivent être en <strong>vectoriel pur</strong> (pas de pixels). Règles essentielles :</p>
<ul><li>Un calque par opération (coupe, rainure, marquage)</li><li>Repères d'impression et de découpe alignés (crop marks)</li><li>Compensation kerf selon l'épaisseur de lame</li><li>Éviter les angles &lt; 30° en router</li></ul>`,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Matériaux et outils',
        lessons: [
          {
            id: 'l2-1',
            title: 'Router : Dibond, Forex, Plexi',
            duration: 35,
            type: 'pratique',
            description: 'Fraises, profondeur et stratégies de passes.',
          },
          {
            id: 'l2-2',
            title: 'Cutter : vinyle, carton, textile',
            duration: 30,
            type: 'pratique',
            description: 'Kiss-cut, through-cut et perf.',
          },
        ],
      },
    ],
  },
  {
    id: 'caldera-rip',
    slug: 'caldera-rip-workflow',
    title: 'Caldera RIP — Workflow professionnel',
    subtitle: 'Imposition, nesting, profils et automatisation',
    description:
      'Formation approfondie sur Caldera : gestion des files d\'attente, création de profils, nesting intelligent et scripts d\'automatisation pour ateliers à fort volume.',
    category: 'logiciels',
    level: 'avance',
    format: 'en-ligne',
    duration: 480,
    lessonsCount: 16,
    instructor: 'Nadia Benali',
    instructorRole: 'Consultante workflow Caldera certifiée',
    tags: ['Caldera', 'RIP', 'Nesting', 'Automatisation'],
    featured: true,
    software: ['Caldera Prime', 'Caldera Direct-to-Film'],
    imageGradient: 'from-orange-500 via-amber-600 to-slate-900',
    objectives: [
      'Structurer les presets par machine et support',
      'Configurer le nesting multi-feuilles',
      'Automatiser les tâches répétitives (hotfolders)',
      'Monitorer la production via le dashboard',
    ],
    prerequisites: ['Pilotage imprimante grand format recommandé'],
    modules: [
      {
        id: 'm1',
        title: 'Interface et organisation',
        lessons: [
          {
            id: 'l1-1',
            title: 'Architecture Caldera Prime',
            duration: 25,
            type: 'video',
            description: 'Queues, devices, media et presets.',
          },
          {
            id: 'l1-2',
            title: 'Création de presets production',
            duration: 35,
            type: 'pratique',
            description: 'Nommage, duplication et versioning.',
            content: `<p>Un <strong>preset Caldera</strong> bien structuré inclut : machine, résolution, mode qualité, profil ICC, marges et repères. Convention de nommage recommandée :</p>
<ul><li><code>MACHINE_SUPPORT_QUALITE_vX</code></li><li>Exemple : <code>LATEX700_DIBOND3mm_PHOTO_v2</code></li></ul>`,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Nesting et automatisation',
        lessons: [
          {
            id: 'l2-1',
            title: 'Nesting intelligent multi-jobs',
            duration: 40,
            type: 'video',
            description: 'Optimisation matière et rotation.',
          },
          {
            id: 'l2-2',
            title: 'Hotfolders et scripts',
            duration: 30,
            type: 'pratique',
            description: 'Automatisation des flux entrants.',
          },
        ],
      },
    ],
  },
  {
    id: 'atelier-signalétique-innovante',
    slug: 'atelier-signaletique-innovante',
    title: 'Atelier — Signalétique innovante',
    subtitle: 'Prototypage rapide et produits retail sur-mesure',
    description:
      'Atelier pratique de 2 jours : concevez et fabriquez des solutions signalétiques innovantes en combinant impression, découpe, éclairage LED et assemblage.',
    category: 'ateliers',
    level: 'intermediaire',
    format: 'atelier',
    duration: 960,
    lessonsCount: 8,
    instructor: 'Équipe Fabeon',
    instructorRole: 'Formateurs terrain & designers',
    tags: ['Retail', 'LED', 'Prototypage', 'POS'],
    featured: true,
    equipment: ['Imprimante UV', 'Table Zünd', 'Fraiseuse', 'Poste soudure LED'],
    imageGradient: 'from-rose-500 via-pink-600 to-purple-900',
    objectives: [
      'Concevoir un concept retail imprimable',
      'Choisir les matériaux et finitions adaptés',
      'Assembler un prototype fonctionnel',
      'Présenter un dossier technique client',
    ],
    prerequisites: ['Au moins un cours en impression ou découpe'],
    modules: [
      {
        id: 'm1',
        title: 'Conception & brief',
        lessons: [
          {
            id: 'l1-1',
            title: 'Analyse du brief client',
            duration: 45,
            type: 'texte',
            description: 'Contraintes retail, normes et délais.',
          },
          {
            id: 'l1-2',
            title: 'Choix matériaux et faisabilité',
            duration: 60,
            type: 'pratique',
            description: 'Arbres de décision matière/process.',
          },
        ],
      },
      {
        id: 'm2',
        title: 'Fabrication',
        lessons: [
          {
            id: 'l2-1',
            title: 'Impression et découpe du prototype',
            duration: 120,
            type: 'pratique',
            description: 'Session atelier encadrée.',
          },
          {
            id: 'l2-2',
            title: 'Assemblage et finitions',
            duration: 90,
            type: 'pratique',
            description: 'Collage, visserie, intégration LED.',
          },
        ],
      },
    ],
  },
  {
    id: 'habillage-vehicule',
    slug: 'habillage-vehicule-fleet',
    title: 'Habillage véhicule & flotte',
    subtitle: 'Vinyle cast, pose et durabilité outdoor',
    description:
      'Techniques d\'habillage véhicule : choix des films, découpe, pose à sec et mouillée, entretien et réglementation publicitaire.',
    category: 'communication',
    level: 'intermediaire',
    format: 'hybride',
    duration: 300,
    lessonsCount: 10,
    instructor: 'Thomas Girard',
    instructorRole: 'Poseur certifié 3M & Avery Dennison',
    tags: ['Fleet', 'Vinyle', 'Cast', 'Pose'],
    featured: false,
    equipment: ['Plotter de découpe', 'Squeegees', 'Décapeuses'],
    software: ['FlexiSIGN', 'SignLab'],
    imageGradient: 'from-indigo-500 via-blue-600 to-cyan-800',
    objectives: [
      'Sélectionner le film adapté (cast vs calendared)',
      'Préparer les gabarits et zones de découpe',
      'Maîtriser la pose complexe (angles, jonctions)',
      'Conseiller le client sur l\'entretien',
    ],
    prerequisites: ['Découpe vinyle — bases'],
    modules: [
      {
        id: 'm1',
        title: 'Films et préparation',
        lessons: [
          {
            id: 'l1-1',
            title: 'Typologie des films adhésifs',
            duration: 25,
            type: 'video',
            description: 'Cast, polymeric, monoméric.',
          },
          {
            id: 'l1-2',
            title: 'Gabarits et découpe',
            duration: 30,
            type: 'pratique',
            description: 'Templates véhicule et zones de sécurité.',
          },
        ],
      },
    ],
  },
  {
    id: 'sublimation-textile',
    slug: 'sublimation-textile-production',
    title: 'Sublimation textile — Production',
    subtitle: 'Transfert, calandre et gestion des couleurs textile',
    description:
      'Workflow complet de sublimation textile : préparation fichier, impression papier transfert, calandre et contrôle qualité sur polyester.',
    category: 'impression',
    level: 'debutant',
    format: 'en-ligne',
    duration: 240,
    lessonsCount: 8,
    instructor: 'Laura Chen',
    instructorRole: 'Spécialiste textile & sportswear',
    tags: ['Sublimation', 'Textile', 'Calandre', 'Sport'],
    featured: false,
    equipment: ['Imprimante sublimation', 'Calandre Rotex'],
    imageGradient: 'from-fuchsia-500 via-purple-600 to-slate-900',
    objectives: [
      'Préparer les fichiers miroir pour sublimation',
      'Régler température et pression calandre',
      'Contrôler le ghosting et les défauts de transfert',
    ],
    prerequisites: [],
    modules: [
      {
        id: 'm1',
        title: 'Workflow sublimation',
        lessons: [
          {
            id: 'l1-1',
            title: 'Principes de la sublimation',
            duration: 20,
            type: 'video',
            description: 'Encre gazeuse et polyester.',
          },
          {
            id: 'l1-2',
            title: 'Réglages calandre',
            duration: 25,
            type: 'pratique',
            description: 'Température, vitesse et pression.',
          },
        ],
      },
    ],
  },
  {
    id: 'onyx-gestion-production',
    slug: 'onyx-gestion-production',
    title: 'ONYX — Gestion de production',
    subtitle: 'File d\'attente, reporting et multi-imprimantes',
    description:
      'Optimisez votre atelier avec ONYX : centralisation des jobs, statistiques de production et gestion multi-devices.',
    category: 'logiciels',
    level: 'intermediaire',
    format: 'en-ligne',
    duration: 180,
    lessonsCount: 6,
    instructor: 'Nadia Benali',
    instructorRole: 'Consultante workflow certifiée',
    tags: ['ONYX', 'RIP', 'Production'],
    featured: false,
    software: ['ONYX Thrive', 'ONYX Hub'],
    imageGradient: 'from-sky-500 to-blue-800',
    objectives: [
      'Centraliser les files multi-imprimantes',
      'Exploiter les rapports de production',
    ],
    prerequisites: ['Pilotage imprimante GF'],
    modules: [
      {
        id: 'm1',
        title: 'ONYX Thrive',
        lessons: [
          {
            id: 'l1-1',
            title: 'Dashboard et files',
            duration: 30,
            type: 'video',
            description: 'Vue d\'ensemble production.',
          },
        ],
      },
    ],
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug)
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function getAllLessons(course: Course) {
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  )
}

export function getLesson(course: Course, lessonId: string) {
  return getAllLessons(course).find((l) => l.id === lessonId)
}
