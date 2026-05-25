import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  GraduationCap,
  MapPin,
  Wrench,
} from 'lucide-react'
import { useData } from '../../context/DataContext'
import {
  equipmentCategories,
  equipmentItems,
  type EquipmentCategoryId,
} from '../../data/equipment'
import {
  categoryFormationLinks,
  getFormationLinksForCategory,
  getFormationLinksForEquipment,
} from '../../data/equipmentFormations'
import { resolveFormations } from '../../lib/equipmentFormationsUtils'
import { equipmentCategoryIcons } from './equipmentCategoryIcons'
import { CourseCard } from '../CourseCard'
import { levelLabels } from '../../data/categories'
import { formatDate } from '../../utils/format'
import { CardCoverImage } from '../CardCoverImage'
import { getWorkshopCoverImage, coverFallbackSeed } from '../../data/coverImages'
import type { Workshop } from '../../types'

interface Props {
  title?: string
  description?: string
  /** Une seule machine */
  equipmentId?: string
  /** Une catégorie de machines */
  categoryId?: EquipmentCategoryId
  /** Sinon : toutes les catégories du parc */
  className?: string
}

function WorkshopFormationCard({ workshop }: { workshop: Workshop }) {
  return (
    <Link
      to="/ateliers"
      className="group flex gap-4 rounded-xl border border-theme bg-surface p-4 hover:border-brand-500/40 transition-colors"
    >
      <CardCoverImage
        src={getWorkshopCoverImage(workshop)}
        imageGradient={workshop.imageGradient}
        alt={workshop.title}
        className="w-28 sm:w-32 shrink-0 rounded-lg h-auto min-h-[5.5rem]"
        overlay="light"
        fallbackSeed={coverFallbackSeed(workshop.id)}
      />
      <div className="min-w-0 flex-1 py-0.5">
        <span className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wide">
          Atelier présentiel
        </span>
        <h4 className="font-display font-semibold text-heading text-sm sm:text-base mt-1 group-hover:text-brand-600 dark:group-hover:text-brand-300 line-clamp-2">
          {workshop.title}
        </h4>
        <ul className="mt-2 space-y-1 text-xs text-muted">
          <li className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {formatDate(workshop.date)} · {workshop.duration}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{workshop.location}</span>
          </li>
        </ul>
        <p className="text-xs text-faint mt-2">{levelLabels[workshop.level]} · {workshop.price}</p>
      </div>
    </Link>
  )
}

function FormationGroup({
  label,
  categoryColor,
  iconName,
  courses,
  workshops,
}: {
  label: string
  categoryColor?: string
  iconName?: string
  courses: ReturnType<typeof resolveFormations>['courses']
  workshops: ReturnType<typeof resolveFormations>['workshops']
}) {
  if (courses.length === 0 && workshops.length === 0) return null

  const Icon = iconName ? equipmentCategoryIcons[iconName] : GraduationCap

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5">
        {categoryColor && Icon ? (
          <div
            className={`w-9 h-9 rounded-lg bg-gradient-to-br ${categoryColor} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
        ) : (
          <GraduationCap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
        )}
        <h3 className="font-display font-semibold text-heading">{label}</h3>
      </div>

      {courses.length > 0 && (
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wide mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Parcours
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {workshops.length > 0 && (
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wide mb-3">
            <Wrench className="w-3.5 h-3.5" />
            Ateliers sur machines
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {workshops.map((w) => (
              <WorkshopFormationCard key={w.id} workshop={w} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function EquipmentRelatedFormations({
  title = 'Formations liées à ces machines',
  description = 'Parcours en ligne, hybrides ou ateliers présentiel sur le parc SmartFactory Fabéon.',
  equipmentId,
  categoryId,
  className = '',
}: Props) {
  const { courses, workshops, loading } = useData()

  if (loading) {
    return (
      <section className={`rounded-2xl border border-theme p-8 text-center text-muted ${className}`}>
        Chargement des formations…
      </section>
    )
  }

  if (equipmentId) {
    const links = getFormationLinksForEquipment(equipmentId)
    if (!links) return null
    const resolved = resolveFormations(links, courses, workshops)
    const item = equipmentItems.find((e) => e.id === equipmentId)

    return (
      <section className={`rounded-2xl border border-theme bg-surface-solid p-6 sm:p-8 ${className}`}>
        <FormationGroup
          label={item ? `Formations — ${item.name}` : title}
          courses={resolved.courses}
          workshops={resolved.workshops}
        />
      </section>
    )
  }

  if (categoryId) {
    const links = getFormationLinksForCategory(categoryId)
    const cat = equipmentCategories.find((c) => c.id === categoryId)
    const resolved = resolveFormations(links, courses, workshops)

    return (
      <section className={`rounded-2xl border border-theme bg-surface-solid p-6 sm:p-8 ${className}`}>
        <FormationGroup
          label={cat?.label ?? title}
          categoryColor={cat?.color}
          iconName={cat?.icon}
          courses={resolved.courses}
          workshops={resolved.workshops}
        />
      </section>
    )
  }

  return (
    <section
      className={`rounded-2xl border border-theme bg-surface-solid overflow-hidden ${className}`}
    >
      <div className="px-5 sm:px-6 py-5 border-b border-theme bg-brand-500/5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-heading flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-brand-600 dark:text-brand-400 shrink-0" />
              {title}
            </h2>
            <p className="text-sm text-muted mt-2 max-w-2xl leading-relaxed">{description}</p>
          </div>
          <Link
            to="/formation-en-ligne"
            className="inline-flex items-center gap-2 shrink-0 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-3 transition-all"
          >
            Tout le catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-12">
        {equipmentCategories.map((cat) => {
          const links = categoryFormationLinks[cat.id]
          const resolved = resolveFormations(links, courses, workshops)
          return (
            <FormationGroup
              key={cat.id}
              label={cat.label}
              categoryColor={cat.color}
              iconName={cat.icon}
              courses={resolved.courses}
              workshops={resolved.workshops}
            />
          )
        })}
      </div>

      <div className="px-5 sm:px-6 py-4 border-t border-theme bg-muted/20 flex flex-wrap gap-3">
        <Link
          to="/formation-en-ligne"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors"
        >
          Formation en ligne
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/ateliers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-theme text-sm font-semibold text-heading hover:border-brand-500/40 transition-colors"
        >
          Ateliers physiques
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
