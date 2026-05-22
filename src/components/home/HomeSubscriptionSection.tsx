import { Link } from 'react-router-dom'
import { CheckCircle2, Infinity, Building2 } from 'lucide-react'
import { subscriptionPlans } from '../../data/subscriptions'
import { CONTACT } from '../../data/contact'

export function HomeSubscriptionSection() {
  return (
    <section id="abonnement" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-3">
          <Infinity className="w-4 h-4" />
          Abonnement entreprise
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
          Accès illimité aux cours en ligne
        </h2>
        <p className="text-muted mt-3 leading-relaxed">
          Formez toute votre équipe d'impression, découpe et prépresse sans limite de modules.
          Facturation mensuelle, résiliable à tout moment.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-6 flex flex-col ${
              plan.highlighted
                ? 'border-brand-500/50 bg-brand-500/5 shadow-lg shadow-brand-500/10'
                : 'border-theme card-base'
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-brand-600 text-white px-3 py-0.5 rounded-full">
                Recommandé
              </span>
            )}
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h3 className="font-display text-xl font-bold text-heading">{plan.name}</h3>
            </div>
            <p className="text-sm text-muted">{plan.description}</p>
            <p className="mt-4">
              <span className="font-display text-3xl font-bold text-heading">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-muted ml-1">{plan.period}</span>
              )}
            </p>
            <p className="text-xs text-faint mt-1">{plan.seats}</p>
            <ul className="mt-6 space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-body">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${CONTACT.email}?subject=Abonnement ${plan.name} — Fabeon HubAcademy`}
              className={`mt-6 block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                plan.highlighted
                  ? 'bg-brand-600 hover:bg-brand-500 text-white'
                  : 'border border-theme hover:border-brand-500/50 text-heading bg-surface'
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted mt-8">
        Besoin d'une offre sur-mesure ?{' '}
        <Link to="/a-propos" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
          Contactez-nous
        </Link>
      </p>
    </section>
  )
}
