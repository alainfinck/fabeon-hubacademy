import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { FABEON_PRESENTATION, type FabeonPillar } from '../../data/fabeonPresentation'
import { CardCoverImage } from '../CardCoverImage'
import { coverFallbackSeed } from '../../data/coverImages'

interface Props {
  pillar: FabeonPillar
  /** Lien interne vers l’ancre sur la page présentation */
  detailHref?: string
}

export function PresentationPillarCard({ pillar, detailHref }: Props) {
  const Icon = pillar.icon
  const to = detailHref ?? `${FABEON_PRESENTATION.path}#${pillar.slug}`

  return (
    <div className="group flex flex-col rounded-2xl card-base overflow-hidden hover:border-brand-500/40 transition-all card-glow h-full">
      <CardCoverImage
        src={pillar.heroImage}
        imageGradient={pillar.imageGradient}
        alt={pillar.heroImageAlt}
        className="h-40 sm:h-44"
        overlay="strong"
        fallbackSeed={coverFallbackSeed(pillar.id)}
      />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <h3 className="font-display text-lg font-semibold text-heading">{pillar.title}</h3>
        </div>
        <p className="text-sm text-muted leading-relaxed flex-1">{pillar.tagline}</p>
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <Link
            to={to}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all"
          >
            En savoir plus
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={pillar.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-faint hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            fabeon.fr
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
