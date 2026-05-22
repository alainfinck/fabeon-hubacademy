import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { navCategories } from '../../data/nav'

export function HomePlatformSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
      <h2 className="font-display text-2xl font-bold text-heading text-center mb-4">
        La plateforme Fabeon HubAcademy
      </h2>
      <p className="text-muted text-center max-w-2xl mx-auto mb-10">
        Formation, présentiel, offres entreprises et ressources — accédez directement à chaque espace.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {navCategories.map((category) => {
          const Icon = category.icon
          const mainLink = category.items[0]?.to ?? '/'
          return (
            <div
              key={category.id}
              className="rounded-2xl card-base p-5 flex flex-col hover:border-brand-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-display font-semibold text-heading">{category.label}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed flex-1 mb-4">
                {category.items[0]?.description}
              </p>
              <ul className="space-y-2 mb-4">
                {category.items.map(({ to, label, icon: ItemIcon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="group flex items-center gap-2 text-sm font-medium text-body hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      <ItemIcon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      {label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={mainLink}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline mt-auto"
              >
                Découvrir
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
