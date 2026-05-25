import { Cpu, CheckCircle2 } from 'lucide-react'
import type { EquipmentCategory, EquipmentItem } from '../../data/equipment'
import { CardCoverImage } from '../CardCoverImage'
import { coverFallbackSeed } from '../../data/coverImages'

interface Props {
  item: EquipmentItem
  category?: EquipmentCategory
}

export function EquipmentCard({ item, category }: Props) {
  return (
    <article className="group rounded-2xl card-base overflow-hidden card-glow flex flex-col h-full">
      <div className="relative">
        <CardCoverImage
          src={item.imageUrl}
          imageGradient={item.imageGradient}
          alt={item.name}
          className="h-44"
          fallbackSeed={coverFallbackSeed(item.id)}
        />
        {category && (
          <span
            className={`absolute top-3 left-3 z-10 text-xs font-semibold text-white px-2.5 py-0.5 rounded-full shadow-sm bg-gradient-to-br ${category.color}`}
          >
            {category.label}
          </span>
        )}
        {item.highlighted && (
          <span className="absolute top-3 right-3 z-10 text-xs font-semibold bg-accent-500 text-white px-2.5 py-0.5 rounded-full shadow-sm">
            Machine phare
          </span>
        )}
        {item.logoSrc && (
          <div className="absolute bottom-3 right-3 z-10 h-10 px-2 rounded-lg bg-white/95 dark:bg-slate-900/95 border border-theme flex items-center justify-center">
            <img
              src={item.logoSrc}
              alt={item.brand ?? item.name}
              className="h-6 w-auto max-w-[5rem] object-contain"
            />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.technologies.map((t) => (
            <span
              key={t}
              className="text-xs badge-muted px-2 py-0.5 rounded font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold text-heading">
          {item.name}
        </h3>
        {item.brand && (
          <p className="text-sm text-brand-600 dark:text-brand-400 font-medium mt-0.5">
            {item.brand}
          </p>
        )}
        <p className="text-sm text-muted mt-3 leading-relaxed flex-1">
          {item.description}
        </p>

        <ul className="mt-5 space-y-2 pt-4 border-t border-theme-subtle">
          {item.specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2 text-sm text-body">
              <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0 mt-0.5" />
              {spec}
            </li>
          ))}
        </ul>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-faint">
          <Cpu className="w-3.5 h-3.5" />
          Disponible en atelier — Illkirch-Graffenstaden
        </p>
      </div>
    </article>
  )
}
