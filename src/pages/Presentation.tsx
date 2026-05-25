import { Link } from 'react-router-dom'
import { ArrowRight, Layers, MapPin, Phone } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { PresentationPillarContent } from '../components/presentation/PresentationPillarContent'
import { PresentationPillarCard } from '../components/presentation/PresentationPillarCard'
import { FABEON_PRESENTATION, fabeonPillars } from '../data/fabeonPresentation'
import { CONTACT } from '../data/contact'

export function Presentation() {
  return (
    <div className="pb-20">
      <PageHeader
        icon={Layers}
        badge="Présentation"
        title={FABEON_PRESENTATION.title}
        description={FABEON_PRESENTATION.intro}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {fabeonPillars.map((pillar) => (
            <PresentationPillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {fabeonPillars.map((pillar) => (
            <PresentationPillarContent key={pillar.id} pillar={pillar} />
          ))}
        </div>

        <section className="max-w-4xl mx-auto mt-16 rounded-3xl hero-card border p-8 sm:p-10">
          <h2 className="font-display text-xl font-bold text-heading">Nous retrouver</h2>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            Parc d&apos;Innovation — Strasbourg Sud, Illkirch-Graffenstaden
          </p>
          <ul className="mt-6 space-y-2 text-sm text-body">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0 mt-0.5" />
              {CONTACT.addressFull}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
              <a href={CONTACT.phoneHref} className="hover:text-brand-600 dark:hover:text-brand-400">
                {CONTACT.phone}
              </a>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/formation-en-ligne"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
            >
              HubAcademy — formations
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://fabeon.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme text-body font-semibold hover:border-brand-500/40 transition-colors"
            >
              Site fabeon.fr
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
