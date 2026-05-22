import { partners } from '../data/partners'
import { PartnerLogo } from './PartnerLogo'

interface Props {
  title?: string
  subtitle?: string
  compact?: boolean
}

export function PartnersSection({
  title = 'Partenaires technologiques',
  subtitle = 'Écosystème impression numérique, RIP, découpe et finition — marques présentes dans nos formations et ateliers.',
  compact = false,
}: Props) {
  return (
    <section
      className={`border-y border-theme bg-section ${compact ? 'py-10' : 'py-14 sm:py-16'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${compact ? 'mb-8' : 'mb-10'}`}>
          <h2
            className={`font-display font-bold text-heading ${
              compact ? 'text-xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            {title}
          </h2>
          {!compact && (
            <p className="text-muted mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group flex items-center justify-center rounded-xl border border-theme bg-white dark:bg-slate-950 px-3 py-4 sm:py-5 transition-all hover:border-brand-500/30 hover:shadow-md dark:hover:shadow-none"
              title={partner.name}
            >
              <PartnerLogo
                partner={partner}
                className="opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
