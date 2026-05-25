import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Factory } from 'lucide-react'
import { getAllEquipmentGroupedByCategory } from '../../data/equipment'
import { SMART_FACTORY } from '../../data/smartFactory'
import { equipmentCategoryIcons } from './equipmentCategoryIcons'
import { EquipmentCard } from './EquipmentCard'

interface Props {
  title?: string
  description?: string
  /** compact : grille 2 colonnes ; detailed : grille 3 colonnes sur grands écrans */
  variant?: 'compact' | 'detailed'
  showFooterLink?: boolean
  /** @deprecated Les cartes affichent toujours une photo */
  showMachinePhotos?: boolean
  className?: string
}

export function EquipmentByCategoryBlock({
  title = 'Parc machines disponible',
  description = 'Équipements réels de la SmartFactory Fabéon, utilisables pour vos projets terrain et nos formations.',
  variant = 'compact',
  showFooterLink = true,
  className = '',
}: Props) {
  const grouped = getAllEquipmentGroupedByCategory()
  const detailed = variant === 'detailed'
  const gridClass = detailed
    ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5'
    : 'grid sm:grid-cols-2 gap-4'

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
              <div className={gridClass}>
                {items.map((item) => (
                  <EquipmentCard key={item.id} item={item} category={category} />
                ))}
              </div>
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
