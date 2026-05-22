import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { Course } from '../../types'
import { CourseCard } from '../CourseCard'
import { staticCourses } from '../../data/staticCatalog'

interface Props {
  courses: Course[]
}

export function HomeLatestFormationsSection({ courses }: Props) {
  const source = courses.length > 0 ? courses : staticCourses
  const latest = source
    .filter((c) => c.format === 'en-ligne' || c.format === 'hybride')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 4)

  if (latest.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-2">
            <Sparkles className="w-4 h-4" />
            Nouveautés
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
            Dernières formations en ligne
          </h2>
          <p className="text-muted mt-2 max-w-xl">
            Parcours vidéo et modules interactifs — tarifs affichés, inscription immédiate.
          </p>
        </div>
        <Link
          to="/formation-en-ligne"
          className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
        >
          Toutes les formations
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latest.map((course) => (
          <CourseCard key={course.id} course={course} showPrice />
        ))}
      </div>
    </section>
  )
}
