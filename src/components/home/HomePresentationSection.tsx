import { Link } from 'react-router-dom'
import { ArrowRight, Layers } from 'lucide-react'
import { FABEON_PRESENTATION, fabeonPillars } from '../../data/fabeonPresentation'
import { PresentationPillarCard } from '../presentation/PresentationPillarCard'

export function HomePresentationSection() {
  return (
    <section className="border-y border-theme bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-2">
              <Layers className="w-4 h-4" />
              Présentation
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              L&apos;écosystème Fabéon
            </h2>
            <p className="text-muted mt-3 leading-relaxed">{FABEON_PRESENTATION.intro}</p>
          </div>
          <Link
            to={FABEON_PRESENTATION.path}
            className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
          >
            Découvrir Campus, Studio & Espaces
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {fabeonPillars.map((pillar) => (
            <PresentationPillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
