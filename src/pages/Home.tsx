import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Users,
  Wrench,
  Play,
  CheckCircle2,
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { CourseCard } from '../components/CourseCard'
import { CategoryIcon } from '../components/CategoryIcon'
import { PageError, PageLoader } from '../components/PageLoader'

const stats = [
  { value: '8+', label: 'Parcours certifiants' },
  { value: '120+', label: 'Heures de formation' },
  { value: '4', label: 'Ateliers équipés' },
  { value: '500+', label: 'Apprenants formés' },
]

const features = [
  'Contenus rédigés par des experts terrain',
  'Machines réelles : Zünd, HP Latex, Caldera',
  'Progression sauvegardée dans votre espace',
  'Ateliers pratiques à Illkirch-Graffenstaden',
]

export function Home() {
  const { courses, categories, loading, error, refresh } = useData()
  const featured = courses.filter((c) => c.featured).slice(0, 4)

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
                de prototypage — tout ce dont votre atelier a besoin, en un seul endroit.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/cours"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
                >
                  Explorer les cours
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/ateliers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme hover:border-brand-500/50 text-body font-semibold transition-colors bg-surface"
                >
                  <Wrench className="w-5 h-5" />
                  Ateliers pratiques
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
              <div className="aspect-square max-w-md mx-auto rounded-3xl hero-card border p-8 shadow-xl dark:shadow-2xl">
                <div className="space-y-4">
                  {[
                    { label: 'Calibration ICC', pct: 78, color: 'bg-violet-500' },
                    { label: 'Pilotage Latex 700', pct: 45, color: 'bg-cyan-500' },
                    { label: 'Zünd — Router Dibond', pct: 12, color: 'bg-emerald-500' },
                    { label: 'Caldera Nesting', pct: 0, color: 'bg-orange-500' },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl hero-card-inner border">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-body">{item.label}</span>
                        <span className="text-faint">{item.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading text-center mb-4">
          Domaines de formation
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12">
          Parcours structurés par métier, du coloriste au poseur, du RIP operator au concepteur retail.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/cours?categorie=${cat.id}`}
              className="group p-6 rounded-2xl card-base hover:border-brand-500/30 transition-all card-glow"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}
              >
                <CategoryIcon name={cat.icon} className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                {cat.label}
              </h3>
              <p className="text-sm text-muted mt-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              Cours populaires
            </h2>
            <p className="text-muted mt-2">Les formations les plus suivies par nos apprenants</p>
          </div>
          <Link
            to="/cours"
            className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 font-medium text-sm"
          >
            Voir tout le catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl hero-card border p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <Users className="w-10 h-10 text-brand-600 dark:text-brand-400 mb-4" />
            <h2 className="font-display text-2xl font-bold text-heading">
              Formez toute votre équipe atelier
            </h2>
            <p className="text-muted mt-3 leading-relaxed">
              Accès multi-utilisateurs, suivi des progressions et parcours sur-mesure pour vos
              opérateurs impression, découpe et prépresse.
            </p>
          </div>
          <Link
            to="/a-propos"
            className="shrink-0 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}
