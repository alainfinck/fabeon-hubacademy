import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Mail, MapPin } from 'lucide-react'
import type { FabeonPillar } from '../../data/fabeonPresentation'
import { CardCoverImage } from '../CardCoverImage'
import { coverFallbackSeed } from '../../data/coverImages'
import { CONTACT } from '../../data/contact'

interface Props {
  pillar: FabeonPillar
}

export function PresentationPillarContent({ pillar }: Props) {
  const Icon = pillar.icon

  return (
    <section id={pillar.slug} className="scroll-mt-24">
      <CardCoverImage
        src={pillar.heroImage}
        imageGradient={pillar.imageGradient}
        alt={pillar.heroImageAlt}
        className="h-40 sm:h-52 rounded-t-2xl"
        overlay="strong"
        fallbackSeed={coverFallbackSeed(pillar.id)}
      />

      <div className="rounded-b-2xl card-base border border-t-0 p-6 sm:p-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              {pillar.title}
            </h2>
            <p className="text-muted mt-1 leading-relaxed">{pillar.tagline}</p>
          </div>
        </div>

        {pillar.audiences && pillar.audiences.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {pillar.audiences.map((audience) => (
              <div
                key={audience.title}
                className="p-5 rounded-xl bg-muted/40 border border-theme-subtle"
              >
                <h3 className="font-display font-semibold text-heading text-sm sm:text-base">
                  {audience.title}
                </h3>
                <p className="text-sm text-body mt-2 leading-relaxed">{audience.description}</p>
                <Link
                  to={audience.ctaTo}
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all"
                >
                  {audience.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 space-y-10">
          {pillar.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="font-display text-xl font-bold text-heading">{section.heading}</h3>
              {section.paragraphs?.map((p) => (
                <p key={p} className="text-body mt-3 leading-relaxed">
                  {p}
                </p>
              ))}
              {section.list && section.list.length > 0 && (
                <ul className="mt-3 space-y-2 text-body leading-relaxed list-disc pl-6 marker:text-brand-600 dark:marker:text-brand-400">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {pillar.footerNote && (
          <p className="mt-8 text-sm text-body leading-relaxed p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
            {pillar.footerNote}
          </p>
        )}

        <div className="mt-8 pt-6 border-t border-theme flex flex-wrap gap-3 items-center justify-between">
          <a
            href={pillar.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
          >
            Voir sur fabeon.fr
            <ExternalLink className="w-4 h-4" />
          </a>
          {pillar.id === 'espaces' && (
            <a
              href="mailto:contact@fabeon.fr?subject=Location%20espaces%20Fab%C3%A9on"
              className="inline-flex items-center gap-2 text-sm font-semibold text-body hover:text-brand-600 dark:hover:text-brand-400"
            >
              <Mail className="w-4 h-4" />
              contact@fabeon.fr
            </a>
          )}
          {pillar.id === 'campus' && (
            <span className="inline-flex items-center gap-1.5 text-xs text-faint">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {CONTACT.addressFull}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
