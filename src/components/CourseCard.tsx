import { Link } from 'react-router-dom'
import { Clock, BookOpen, User, Tag } from 'lucide-react'
import type { Course } from '../types'
import { CategoryBadge } from './CategoryBadge'
import { CourseCoverImage } from './CourseCoverImage'
import { levelLabels, formatLabels } from '../data/categories'
import { formatDuration } from '../utils/format'

interface Props {
  course: Course
  showProgress?: number
  showPrice?: boolean
}

export function CourseCard({ course, showProgress, showPrice = true }: Props) {
  return (
    <Link
      to={`/cours/${course.slug}`}
      className="group relative block rounded-2xl border border-theme bg-surface overflow-hidden card-glow transition-all duration-300 hover:border-brand-500/30"
    >
      <div className="relative">
        <CourseCoverImage
          course={course}
          className="h-40"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 304px"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-3 left-3 z-10">
            <CategoryBadge categoryId={course.category} />
          </div>
          {course.featured && (
            <span className="absolute top-3 right-3 z-10 text-xs font-semibold bg-accent-500 text-white px-2 py-0.5 rounded-full shadow-sm">
              Populaire
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">{course.subtitle}</p>
        {showPrice && course.price && (
          <p className="mt-4 flex items-baseline gap-2">
            <Tag className="w-5 h-5 text-accent-500 dark:text-accent-400 shrink-0 self-center" />
            <span className="font-display text-2xl sm:text-3xl font-bold text-accent-600 dark:text-accent-400 leading-none">
              {course.price}
            </span>
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-faint badge-muted px-2 py-0.5 rounded">
            {levelLabels[course.level]}
          </span>
          <span className="text-xs text-faint badge-muted px-2 py-0.5 rounded">
            {formatLabels[course.format]}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-faint">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatDuration(course.duration)}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.lessonsCount} leçons
          </span>
        </div>
        <p className="flex items-center gap-1 mt-2 text-xs text-faint">
          <User className="w-3.5 h-3.5" />
          {course.instructor}
        </p>
        {showProgress !== undefined && showProgress > 0 && (
          <div className="mt-4 pt-4 border-t border-theme">
            <div className="flex justify-between text-xs text-muted mb-1">
              <span>Progression</span>
              <span>{showProgress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div
                className="h-1.5 rounded-full bg-brand-500 transition-all"
                style={{ width: `${showProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
