import { Link } from 'react-router-dom'
import { Target, Users, Cpu, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Expertise terrain',
    text: 'Nos formateurs sont des opérateurs, techniciens et coloristes en activité dans l\'industrie graphique.',
  },
  {
    icon: Cpu,
    title: 'Machines réelles',
    text: 'HP Latex, Mimaki, Zünd, Caldera — vous formez sur le même matériel que dans votre atelier.',
  },
  {
    icon: Users,
    title: 'Accompagnement',
    text: 'Parcours modulaires, suivi de progression et ateliers en petits groupes pour une montée en compétences durable.',
  },
]

const partners = [
  'HP', 'Mimaki', 'EFI', 'Zünd', 'Caldera', '3M', 'Avery Dennison', 'Esko',
]

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-heading">
          À propos de Fabeon HubAcademy
        </h1>
        <p className="text-body mt-6 text-lg leading-relaxed">
          Fabeon HubAcademy est la plateforme de formation en ligne et en atelier dédiée aux
          métiers de l'<strong className="text-heading">impression numérique</strong> et de la{' '}
          <strong className="text-heading">communication visuelle</strong>.
        </p>
        <p className="text-muted mt-4 leading-relaxed">
          Nous accompagnons les ateliers d'impression, les enseignes, les studios de création et les
          services reprographie dans la montée en compétences de leurs équipes : calibration des
          couleurs, pilotage d'imprimantes grand format, découpe à plat, RIP Caldera et Onyx, et
          fabrication de produits innovants en atelier.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-16">
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-6 rounded-2xl card-base">
            <Icon className="w-10 h-10 text-brand-600 dark:text-brand-400 mb-4" />
            <h3 className="font-display font-semibold text-heading">{title}</h3>
            <p className="text-muted text-sm mt-2 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-display text-xl font-semibold text-heading mb-6">
          Écosystème & partenaires
        </h2>
        <div className="flex flex-wrap gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="px-4 py-2 rounded-xl border border-theme bg-surface text-body text-sm font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl hero-card border p-8 sm:p-12">
        <h2 className="font-display text-2xl font-bold text-heading">
          Formation entreprise
        </h2>
        <p className="text-muted mt-3 max-w-xl leading-relaxed">
          Licences multi-utilisateurs, parcours personnalisés et sessions intra-entreprise dans vos
          locaux ou dans nos ateliers équipés Lyon et Paris.
        </p>
        <a
          href="mailto:formation@fabeon.fr"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors"
        >
          formation@fabeon.fr
          <ArrowRight className="w-5 h-5" />
        </a>
      </section>

      <div className="mt-12 text-center">
        <Link
          to="/cours"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
        >
          Découvrir le catalogue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
