import {
  BookOpen,
  Clock,
  Globe,
  Star,
  User,
  BadgeCheck,
  Tag,
  Layers,
} from 'lucide-react'
import { CategoryBadge } from '../CategoryBadge'
import { CourseCoverImage } from '../CourseCoverImage'
import { marketplaceListingExample } from '../../data/marketplaceExamples'
import { levelLabels, formatLabels } from '../../data/categories'
import { formatDuration } from '../../utils/format'

const ex = marketplaceListingExample

export function MarketplaceExampleCard() {
  return (
    <article className="rounded-2xl border-2 border-accent-500/25 bg-surface-solid overflow-hidden shadow-lg dark:shadow-xl">
      <div className="px-4 sm:px-6 py-3 border-b border-theme bg-accent-500/10 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-heading flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-accent-600 dark:text-accent-400" />
          Exemple concret — formation publiée sur la marketplace
        </p>
        <span className="text-xs font-medium text-muted">{ex.publishedAt}</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-0">
        <div className="lg:col-span-2 relative">
          <CourseCoverImage
            course={{
              id: ex.id,
              category: ex.category,
              title: ex.title,
              imageGradient: ex.imageGradient,
              imageUrl: ex.imageUrl,
            }}
            className="h-48 lg:h-full min-h-[12rem]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute bottom-3 left-3 z-10">
            <CategoryBadge categoryId={ex.category} />
          </div>
          <span className="absolute top-3 right-3 z-10 text-xs font-semibold bg-brand-600 text-white px-2.5 py-1 rounded-full shadow-sm">
            Formateur externe
          </span>
        </div>

        <div className="lg:col-span-3 p-6 sm:p-8">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-heading leading-tight">
            {ex.title}
          </h3>
          <p className="text-sm text-muted mt-2 leading-relaxed">{ex.subtitle}</p>

          <p className="text-sm text-body mt-4 leading-relaxed">{ex.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-faint badge-muted px-2 py-0.5 rounded">
              {levelLabels[ex.level]}
            </span>
            <span className="text-xs text-faint badge-muted px-2 py-0.5 rounded">
              {formatLabels[ex.format]}
            </span>
            {ex.languages.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center gap-1 text-xs text-faint badge-muted px-2 py-0.5 rounded"
              >
                <Globe className="w-3 h-3" />
                {lang}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-faint">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(ex.durationMinutes)}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {ex.lessonsCount} leçons
            </span>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              {ex.rating}/5 · {ex.learnersCount} inscrits
            </span>
          </div>

          <p className="flex items-center gap-1.5 mt-3 text-sm text-body">
            <User className="w-4 h-4 text-faint shrink-0" />
            <span>
              <span className="font-medium">{ex.instructor}</span>
              <span className="text-muted"> — {ex.instructorRole}</span>
            </span>
          </p>
          <p className="text-xs text-brand-600 dark:text-brand-400 mt-1 font-medium">
            {ex.provider}
          </p>

          <div className="mt-5 pt-5 border-t border-theme">
            <p className="text-xs font-semibold uppercase tracking-wide text-faint flex items-center gap-1.5 mb-2">
              <Layers className="w-3.5 h-3.5" />
              Aperçu du programme
            </p>
            <ul className="space-y-1.5">
              {ex.modules.map((m) => (
                <li key={m} className="text-sm text-muted flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-500 mt-2 shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 flex items-baseline gap-2">
            <Tag className="w-5 h-5 text-accent-500 dark:text-accent-400 shrink-0" />
            <span className="font-display text-2xl font-bold text-accent-600 dark:text-accent-400">
              {ex.price}
            </span>
            <span className="text-xs text-muted">par apprenant · marketplace</span>
          </p>
        </div>
      </div>
    </article>
  )
}
