import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Factory } from 'lucide-react'
import {
  getAllEquipmentGroupedByCategory,
  type EquipmentItem,
} from '../../data/equipment'
import { SMART_FACTORY } from '../../data/smartFactory'
import { equipmentCategoryIcons } from './equipmentCategoryIcons'

interface Props {
  title?: string
  description?: string
  /** compact : listes par catégorie ; detailed : cartes machines plus aérées */
  variant?: 'compact' | 'detailed'
  showFooterLink?: boolean
  /** Affiche une vignette photo par machine (detailed uniquement) */
  showMachinePhotos?: boolean
  className?: string
}

function MachineLine({
  item,
  detailed,
  showPhoto,
}: {
  item: EquipmentItem
  detailed: boolean
  showPhoto: boolean
}) {
  return (
    <li
      className={
        detailed && showPhoto
          ? 'rounded-xl border border-theme-subtle bg-muted/30 p-4 flex gap-4'
          : detailed
            ? 'rounded-xl border border-theme-subtle bg-muted/30 p-4'
            : ''
      }
    >
      {showPhoto && detailed && (
        <div className="w-24 sm:w-28 shrink-0 rounded-lg overflow-hidden border border-theme aspect-[4/3]">
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-semibold text-heading text-sm sm:text-base">{item.name}</span>
          {item.brand && (
            <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
              {item.brand}
            </span>
          )}
        </div>
        {detailed && (
          <p className="text-sm text-muted mt-1.5 leading-relaxed">{item.description}</p>
        )}
        <ul className={`mt-2 space-y-1 ${detailed ? '' : 'mt-1'}`}>
          {item.specs.map((spec) => (
            <li
              key={spec}
              className="text-xs sm:text-sm text-body flex items-start gap-1.5 leading-snug"
            >
              <span className="text-brand-600 dark:text-brand-500 shrink-0 mt-1">·</span>
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function EquipmentByCategoryBlock({
  title = 'Parc machines disponible',
  description = 'Équipements réels de la SmartFactory Fabéon, utilisables pour vos projets terrain et nos formations.',
  variant = 'compact',
  showFooterLink = true,
  showMachinePhotos = false,
  className = '',
}: Props) {
  const grouped = getAllEquipmentGroupedByCategory()
  const detailed = variant === 'detailed'
  const withPhotos = detailed && showMachinePhotos

  return (
    <section
      className={`rounded-2xl border border-theme bg-surface-solid overflow-hidden ${className}`}
      aria-labelledby="equipment-by-category-title"
    >
      <div className="px-5 sm:px-6 py-5 border-b border-theme bg-brand-500/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
            <Factory className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="min-w-0">
            <h2
              id="equipment-by-category-title"
              className="font-display text-lg sm:text-xl font-bold text-heading"
            >
              {title}
            </h2>
            <p className="text-sm text-muted mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      <div className={`p-5 sm:p-6 ${detailed ? 'space-y-10' : 'space-y-6'}`}>
        {grouped.map(({ category, items }) => {
          const Icon = equipmentCategoryIcons[category.icon] ?? Factory
          return (
            <div key={category.id} id={`equip-${category.id}`}>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${category.color} shrink-0`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-heading">{category.label}</h3>
                  <p className="text-xs text-muted leading-snug">{category.description}</p>
                </div>
                <span className="ml-auto text-xs text-faint badge-muted px-2 py-0.5 rounded-full shrink-0">
                  {items.length}
                </span>
              </div>
              <ul
                className={
                  withPhotos
                    ? 'space-y-3'
                    : detailed
                      ? 'grid sm:grid-cols-2 gap-3'
                      : 'space-y-3 pl-1'
                }
              >
                {items.map((item) => (
                  <MachineLine
                    key={item.id}
                    item={item}
                    detailed={detailed}
                    showPhoto={withPhotos}
                  />
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="px-5 sm:px-6 py-4 border-t border-theme flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/20">
        <p className="inline-flex items-center gap-1.5 text-xs text-faint">
          <Cpu className="w-3.5 h-3.5 shrink-0" />
          Parc SmartFactory — Illkirch-Graffenstaden
        </p>
        {showFooterLink && (
          <Link
            to={SMART_FACTORY.path}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all shrink-0"
          >
            Découvrir la SmartFactory
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  )
}
