import { Link } from 'react-router-dom'
import { Globe, Store, ArrowRight, Languages, Upload } from 'lucide-react'
import { MARKETPLACE, TRAINING_LANGUAGES } from '../../data/platform'

export function HomeInternationalSection() {
  return (
    <section className="border-y border-theme bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="rounded-2xl card-base border p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-500/15 border border-brand-500/25 rounded-full px-4 py-1.5 mb-5">
              <Globe className="w-4 h-4" />
              Formations multilingues
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading leading-tight">
              Disponibles en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-600 dark:from-brand-400 dark:to-cyan-300">
                5 langues
              </span>
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              Parcours en ligne et ressources accessibles dans les principales langues européennes
              de l&apos;industrie graphique — pour former vos équipes partout en Europe.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {TRAINING_LANGUAGES.map((lang) => (
                <li
                  key={lang}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-surface-solid border border-theme text-body"
                >
                  <Languages className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl card-base border-2 border-accent-500/25 p-6 sm:p-8 shadow-lg dark:shadow-xl bg-surface-solid">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 dark:text-accent-300 bg-accent-500/15 border border-accent-500/25 rounded-full px-4 py-1.5 mb-5">
              <Store className="w-4 h-4" />
              {MARKETPLACE.shortLabel}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading leading-tight">
              Publiez vos formations{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-orange-500 dark:from-accent-400 dark:to-orange-300">
                liées à l&apos;impression
              </span>
            </h2>
            <p className="text-muted mt-4 leading-relaxed">{MARKETPLACE.tagline}</p>
            <ul className="mt-5 space-y-2">
              {MARKETPLACE.topics.slice(0, 3).map((topic) => (
                <li key={topic} className="flex items-start gap-2 text-sm text-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
            <Link
              to={MARKETPLACE.path}
              className="inline-flex items-center justify-center gap-2 w-full mt-8 py-3.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
            >
              <Upload className="w-5 h-5" />
              Déposer une formation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
