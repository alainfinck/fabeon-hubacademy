import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Play,
  CheckCircle2,
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { CategoryIcon } from '../components/CategoryIcon'
import { PageError, PageLoader } from '../components/PageLoader'
import { PartnersSection } from '../components/PartnersSection'
import { HomeProDepositSection } from '../components/home/HomeProDepositSection'
import { HomeEnterpriseProjectsSection } from '../components/home/HomeEnterpriseProjectsSection'
import { HomeLatestFormationsSection } from '../components/home/HomeLatestFormationsSection'
import { HomeThemesSection } from '../components/home/HomeThemesSection'
import { HomePlatformSection } from '../components/home/HomePlatformSection'
import { HomeWorkshopsSection } from '../components/home/HomeWorkshopsSection'
import { staticCategories } from '../data/staticCatalog'

const stats = [
  { value: '12+', label: 'Parcours certifiants' },
  { value: '150+', label: 'Heures de formation' },
  { value: '8', label: 'Ateliers & labs IA' },
  { value: '500+', label: 'Apprenants formés' },
]

const features = [
  'Contenus rédigés par des experts terrain',
  'Machines réelles : Zünd, HP Latex, Caldera',
  'Parcours IA : visuels génératifs & workflow atelier',
  'Ateliers pratiques et labs IA à Illkirch-Graffenstaden',
]

export function Home() {
  const { categories, courses, workshops, loading, error, refresh } = useData()
  const heroCategories = categories.length > 0 ? categories : staticCategories

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} onRetry={refresh} />

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-6">
                <Award className="w-4 h-4" />
                Formation impression numérique & communication visuelle
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-heading leading-tight">
                Maîtrisez l'art de l'
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-600 dark:from-brand-400 dark:to-cyan-300">
                  impression
                </span>{' '}
                et de la{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-orange-500 dark:from-accent-400 dark:to-orange-300">
                  fabrication
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                Calibration couleurs, pilotage grand format, découpe Zünd, Caldera RIP et ateliers
                de prototypage — tout ce dont votre atelier a besoin.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/formation-en-ligne"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
                >
                  Formation en ligne
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/ateliers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme hover:border-brand-500/50 text-body font-semibold transition-colors bg-surface"
                >
                  Ateliers physiques
                </Link>
                <Link
                  to="/ateliers?ia=1"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-fuchsia-500/40 text-fuchsia-700 dark:text-fuchsia-300 font-semibold transition-colors bg-fuchsia-500/10 hover:bg-fuchsia-500/15"
                >
                  Ateliers IA
                </Link>
              </div>
              <ul className="mt-8 space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden lg:block">
              <div className="max-w-md mx-auto rounded-3xl hero-card border p-6 shadow-xl dark:shadow-2xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-faint mb-3">
                  7 thématiques — parcours & ateliers
                </p>
                <div className="space-y-2 max-h-[22rem] overflow-y-auto pr-1">
                  {heroCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/formation-en-ligne?theme=${cat.id}`}
                      className="block p-3 rounded-xl hero-card-inner border hover:border-brand-500/30 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0`}
                        >
                          <CategoryIcon name={cat.icon} className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-body group-hover:text-brand-600 dark:group-hover:text-brand-300">
                          {cat.label}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading">Reprendre la leçon</p>
                    <p className="text-xs text-muted">Delta E — Interprétation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-theme bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-heading">{s.value}</p>
                <p className="text-sm text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeLatestFormationsSection courses={courses} />

      <HomeThemesSection categories={categories.length > 0 ? categories : staticCategories} courses={courses} />

      <HomeWorkshopsSection workshops={workshops} />

      <PartnersSection />

      <HomeProDepositSection />

      <HomeEnterpriseProjectsSection />

      <HomePlatformSection />
    </>
  )
}
