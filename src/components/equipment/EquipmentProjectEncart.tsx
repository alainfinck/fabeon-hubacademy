import { Link } from 'react-router-dom'
import { Lightbulb, PlusCircle, ArrowRight, Users, Sparkles } from 'lucide-react'

export function EquipmentProjectEncart() {
  return (
    <section className="relative overflow-hidden border-b border-theme">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-brand-500/5 to-violet-500/10 dark:from-accent-500/15 dark:via-brand-500/10 dark:to-violet-500/15" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="rounded-2xl border-2 border-accent-500/30 bg-surface-solid shadow-lg dark:shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 dark:text-accent-300 bg-accent-500/15 border border-accent-500/25 rounded-full px-4 py-1.5 mb-4">
                <Sparkles className="w-4 h-4" />
                Projets innovants
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading leading-tight">
                Du matériel à la pointe pour vos projets les plus{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500 dark:from-brand-400 dark:to-accent-400">
                  originaux
                </span>
              </h2>
              <p className="text-body mt-4 text-base sm:text-lg leading-relaxed max-w-2xl">
                Soumettez-nous vos projets innovants : nous les réaliserons sur notre parc
                machines (Massivit 1800, Bambu Lab, Zünd 250×300, Epson V7000 UV, HP Latex,
                éco-solvant, sublimation…). Une équipe de{' '}
                <strong className="text-heading font-semibold">passionnés</strong> est à votre
                disposition pour les mener à bien, sous encadrement d&apos;experts.
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-muted">
                <Users className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                Imprimeurs, enseignes, studios et créatifs : donnez vie à vos idées les plus
                ambitieuses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <Link
                to="/projets-entreprises/deposer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-base transition-colors shadow-md shadow-accent-500/20"
              >
                <PlusCircle className="w-5 h-5" />
                Soumettre un projet
              </Link>
              <Link
                to="/projets-entreprises"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-theme bg-surface font-semibold text-heading hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                Voir les projets
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
