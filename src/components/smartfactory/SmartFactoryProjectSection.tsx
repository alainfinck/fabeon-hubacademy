import { Link } from 'react-router-dom'
import { ArrowRight, Factory, PlusCircle } from 'lucide-react'

export function SmartFactoryProjectSection() {
  return (
    <section className="mb-12 rounded-3xl border-2 border-accent-500/30 overflow-hidden bg-gradient-to-br from-accent-500/10 via-brand-500/5 to-slate-500/5 dark:from-accent-500/15 dark:via-brand-500/10 dark:to-slate-900/40">
      <div className="p-8 sm:p-12 lg:p-14 text-center max-w-3xl mx-auto">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 dark:text-accent-300 bg-white/80 dark:bg-slate-900/80 border border-accent-500/25 rounded-full px-4 py-1.5 mb-6">
          <Factory className="w-4 h-4" />
          Prototypage & pré-série
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-heading leading-tight">
          Un projet à réaliser sur notre parc machines ?
        </h2>
        <p className="text-body mt-4 text-base sm:text-lg leading-relaxed">
          Décrivez votre besoin (prototypage, pré-série, signalétique, découpe, 3D…) : nos équipes
          et apprenants encadrés étudient votre demande et vous recontactent sous 48 h ouvrées.
        </p>
        <Link
          to="/projets-entreprises/deposer"
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto min-w-[min(100%,20rem)] mt-8 px-10 py-5 sm:py-6 rounded-2xl bg-accent-500 hover:bg-accent-600 text-white font-bold text-lg sm:text-xl transition-colors shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30"
        >
          <PlusCircle className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
          Déposer une demande de projet
          <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
        </Link>
        <p className="mt-5 text-sm text-muted">
          <Link
            to="/projets-entreprises"
            className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Voir les projets déjà déposés
          </Link>
        </p>
      </div>
    </section>
  )
}
