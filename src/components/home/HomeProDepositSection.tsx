import { Link } from 'react-router-dom'
import {
  Briefcase,
  PlusCircle,
  ArrowRight,
  Factory,
  Users,
  FileCheck,
  Building2,
} from 'lucide-react'

const benefits = [
  'Projets réels traités par des apprenants encadrés',
  'Supervision de formateurs experts certifiés',
  'Calibration, grand format, Zünd, RIP, signalétique…',
  'Réponse sous 48 h ouvrées après dépôt',
]

const steps = [
  { icon: Factory, title: 'Vous déposez', text: 'Décrivez votre besoin, fichiers et délais.' },
  { icon: Users, title: 'Nous attribuons', text: 'Un apprenant prend en charge le projet.' },
  { icon: FileCheck, title: 'Livraison encadrée', text: 'Prototype ou rapport validé par nos experts.' },
]

export function HomeProDepositSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-500/10 dark:from-brand-500/15 dark:to-accent-500/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-500/15 border border-brand-500/25 rounded-full px-4 py-1.5 mb-5">
              <Building2 className="w-4 h-4" />
              Espace professionnels
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-heading leading-tight">
              Vous êtes un pro ?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500 dark:from-brand-400 dark:to-accent-400">
                Déposez un projet à réaliser
              </span>
            </h2>
            <p className="text-muted mt-4 text-base sm:text-lg leading-relaxed max-w-xl">
              Imprimeurs, enseignes, studios et ateliers : confiez-nous vos projets terrain. Nos
              apprenants les réalisent sous encadrement pédagogique — comme un laboratoire
              d&apos;innovation pour votre métier.
            </p>
            <ul className="mt-6 space-y-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl card-base border-2 border-brand-500/20 p-6 sm:p-8 shadow-lg dark:shadow-xl bg-surface-solid">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-heading">
                  Déposer votre projet
                </h3>
                <p className="text-sm text-muted">Formulaire en ligne — 5 minutes</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {steps.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="font-medium text-heading text-sm">{title}</p>
                    <p className="text-xs text-muted mt-0.5">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/projets-entreprises/deposer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-base transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Déposer un projet maintenant
            </Link>
            <Link
              to="/projets-entreprises"
              className="flex items-center justify-center gap-2 w-full mt-3 py-3 rounded-xl border border-theme text-sm font-medium text-body hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Consulter les projets ouverts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
