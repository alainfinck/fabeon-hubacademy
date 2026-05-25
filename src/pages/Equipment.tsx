import { Link } from 'react-router-dom'
import { Factory, MapPin, ArrowRight, Wrench } from 'lucide-react'
import { EquipmentCard } from '../components/equipment/EquipmentCard'
import { EquipmentByCategoryBlock } from '../components/equipment/EquipmentByCategoryBlock'
import { EquipmentRelatedFormations } from '../components/equipment/EquipmentRelatedFormations'
import { EquipmentProjectEncart } from '../components/equipment/EquipmentProjectEncart'
import { equipmentCategoryIcons } from '../components/equipment/equipmentCategoryIcons'
import { equipmentCategories, getEquipmentByCategory } from '../data/equipment'
import { SMART_FACTORY } from '../data/smartFactory'
import { CONTACT } from '../data/contact'

export function Equipment() {
  return (
    <div className="pb-20">
      {/* En-tête compact */}
      <div className="border-b border-theme bg-section/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-2">
            <Factory className="w-4 h-4" />
            Parc machines — {CONTACT.workshopLocation}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-heading">
            Matériel de formation
          </h1>
          <p className="text-muted mt-2 text-sm sm:text-base flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
              {CONTACT.addressFull}
            </span>
            <span className="text-faint hidden sm:inline">·</span>
            <span>Formation et ateliers sur machines réelles</span>
          </p>
        </div>
      </div>

      {/* Navigation catégories — accès direct */}
      <nav
        className="sticky top-[4.5rem] z-30 border-b border-theme bg-header/95 backdrop-blur-md"
        aria-label="Catégories de matériel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-1 overflow-x-auto py-2.5 scrollbar-none -mx-1 px-1">
            {equipmentCategories.map((cat) => {
              const Icon = equipmentCategoryIcons[cat.icon] ?? Factory
              const count = getEquipmentByCategory(cat.id).length
              return (
                <li key={cat.id} className="shrink-0">
                  <a
                    href={`#${cat.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 whitespace-nowrap transition-colors"
                  >
                    <Icon className="w-4 h-4 opacity-70" />
                    {cat.label}
                    <span className="text-xs font-medium text-faint tabular-nums">
                      ({count})
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <EquipmentProjectEncart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EquipmentByCategoryBlock
          variant="compact"
          showFooterLink
          description="Vue synthétique du parc — détail complet sur la page SmartFactory."
        />
      </div>

      {/* Liste par catégorie — contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {equipmentCategories.map((category, index) => {
          const items = getEquipmentByCategory(category.id)
          const Icon = equipmentCategoryIcons[category.icon] ?? Factory

          return (
            <section
              key={category.id}
              id={category.id}
              className={`scroll-mt-[8.5rem] py-10 sm:py-12 ${
                index > 0 ? 'border-t border-theme' : 'pt-8'
              }`}
            >
              <header className="flex flex-wrap items-center gap-3 mb-6">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} shrink-0`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-heading">
                    {category.label}
                  </h2>
                  <p className="text-sm text-muted mt-0.5">{category.description}</p>
                </div>
                <span className="text-xs font-medium text-faint badge-muted px-2.5 py-1 rounded-full shrink-0">
                  {items.length} machine{items.length > 1 ? 's' : ''}
                </span>
              </header>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map((item) => (
                  <EquipmentCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EquipmentRelatedFormations />
      </div>

      {/* Pied de page — infos & CTA */}
      <section className="border-t border-theme bg-section mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl border border-brand-500/25 bg-brand-500/5 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <p className="text-sm text-muted max-w-2xl leading-relaxed">
              Tous ces équipements sont utilisés en atelier présentiel et pour les projets
              terrain déposés par les professionnels partenaires — pas de simulation logicielle
              seule.
            </p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to={SMART_FACTORY.path}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-theme bg-surface font-semibold text-sm text-heading hover:border-brand-500/40 transition-colors"
              >
                SmartFactory
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ateliers"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
              >
                Réserver un atelier
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Wrench className="w-9 h-9 text-brand-600 dark:text-brand-400 mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-heading">
              Pratiquer sur ce matériel
            </h2>
            <p className="text-sm text-muted mt-2 max-w-lg mx-auto">
              Parcours avec modules machines ou sessions atelier au HubAcademy.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link
                to="/ateliers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
              >
                Ateliers
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cours"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-theme bg-surface font-semibold text-sm text-heading hover:border-brand-500/40 transition-colors"
              >
                Catalogue cours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
