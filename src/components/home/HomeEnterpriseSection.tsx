import { Link } from 'react-router-dom'
import {
  Briefcase,
  Factory,
  Users,
  FileText,
  List,
  PlusCircle,
} from 'lucide-react'

const steps = [
  {
    icon: Factory,
    title: 'Vous déposez',
    text: 'Décrivez votre besoin réel : fichiers, contraintes, délais, matériaux.',
  },
  {
    icon: Users,
    title: 'Nous attribuons',
    text: 'Le projet est confié à un apprenant encadré par nos formateurs.',
  },
  {
    icon: FileText,
    title: 'Livraison encadrée',
    text: 'Prototype ou rapport technique validé avant production.',
  },
]

interface Props {
  embedded?: boolean
}

export function HomeEnterpriseSection({ embedded = false }: Props) {
  return (
    <section className={embedded ? '' : 'border-t border-theme bg-section'}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? 'py-10' : 'py-20'}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {!embedded && (
              <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-3">
                <Briefcase className="w-4 h-4" />
                Projets entreprises
              </div>
            )}
            {!embedded && (
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading mb-4">
                Imprimeurs : confiez vos projets réels
              </h2>
            )}
            <p className="text-muted leading-relaxed">
              Ateliers d'impression, enseignes et studios : consultez les projets ouverts et
              déposez les vôtres pour nos apprenants.
            </p>

            <div className="mt-8 space-y-6">
              {steps.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-heading">{title}</h3>
                    <p className="text-sm text-muted mt-1">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/projets-entreprises"
              className="flex items-center gap-4 p-6 rounded-2xl card-base hover:border-brand-500/30 transition-all card-glow group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
                <List className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300">
                  Consulter les projets
                </h3>
                <p className="text-sm text-muted mt-1">
                  Projets terrain disponibles pour les apprenants.
                </p>
              </div>
            </Link>
            <Link
              to="/projets-entreprises/deposer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-accent-500/10 border border-accent-500/30 hover:bg-accent-500/15 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center shrink-0">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-heading">
                  Déposer un projet
                </h3>
                <p className="text-sm text-muted mt-1">
                  Formulaire entreprise — réponse sous 48 h.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
