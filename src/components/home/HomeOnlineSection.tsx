import { Link } from 'react-router-dom'
import { ArrowRight, MonitorPlay } from 'lucide-react'
import type { Course } from '../../types'
import { CourseCard } from '../CourseCard'

interface Props {
  courses: Course[]
}

export function HomeOnlineSection({ courses }: Props) {
  const online = courses
    .filter((c) => c.format === 'en-ligne' || c.format === 'hybride')
    .slice(0, 4)

  return (
    <section id="formation-en-ligne" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-3">
            <MonitorPlay className="w-4 h-4" />
            Formation en ligne
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
            Derniers cours disponibles
          </h2>
          <p className="text-muted mt-3 leading-relaxed">
            Apprenez à votre rythme : calibration, grand format, RIP Caldera, découpe Zünd…
            Modules vidéo, quiz et suivi de progression depuis votre espace.
          </p>
        </div>
        <Link
          to="/cours"
          className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
        >
          Tout le catalogue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {online.length === 0 ? (
        <p className="text-muted text-center py-12">Aucun cours en ligne pour le moment.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {online.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  )
}
