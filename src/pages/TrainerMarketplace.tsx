import { Link } from 'react-router-dom'
import { Store, Globe, ArrowRight, Mail, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { MarketplaceExampleCard } from '../components/marketplace/MarketplaceExampleCard'
import { CONTACT } from '../data/contact'
import { MARKETPLACE, TRAINING_LANGUAGES } from '../data/platform'

const steps = [
  'Décrivez votre parcours (thème impression, format, langue, niveau).',
  'Transmettez un extrait ou un plan de module pour relecture.',
  'Après validation, votre formation est publiée sur la marketplace.',
]

export function TrainerMarketplace() {
  return (
    <>
      <PageHeader
        icon={Store}
        badge={MARKETPLACE.shortLabel}
        title="Publiez vos formations sur Fabeon HubAcademy"
        description={MARKETPLACE.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-heading mb-2">
            À quoi ressemble une formation publiée ?
          </h2>
          <p className="text-sm text-muted max-w-2xl mb-6 leading-relaxed">
            Voici un exemple réel de parcours déposé par un formateur externe, relu par notre équipe
            puis mis en ligne sur le catalogue formation en ligne.
          </p>
          <MarketplaceExampleCard />
        </section>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl card-base border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-brand-600 dark:text-brand-400" />
              <h2 className="font-display text-xl font-bold text-heading">
                Formations en 5 langues
              </h2>
            </div>
            <p className="text-muted leading-relaxed">
              La plateforme accueille des parcours en ligne dans les langues suivantes, pour toucher
              les ateliers et équipes à l&apos;international :
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {TRAINING_LANGUAGES.map((lang) => (
                <li
                  key={lang}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 border border-brand-500/20 text-body"
                >
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl card-base border p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-heading mb-4">
              Thématiques acceptées
            </h2>
            <ul className="space-y-2">
              {MARKETPLACE.topics.map((topic) => (
                <li key={topic} className="flex items-start gap-2 text-sm text-body">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0 mt-0.5" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-12 rounded-3xl hero-card border p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-heading">Comment déposer ?</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4 text-body">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-white font-semibold flex items-center justify-center shrink-0 text-sm">
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          <a
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Dépôt formation — Marketplace Fabeon HubAcademy')}`}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contacter l&apos;équipe formation
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-muted mt-4">
            Ou revenez au{' '}
            <Link
              to="/formation-en-ligne"
              className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              catalogue formation en ligne
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  )
}
