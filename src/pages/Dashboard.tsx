import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Play, TrendingUp, Award } from 'lucide-react'
import type { Course } from '../types'
import { useData } from '../context/DataContext'
import { useLearning } from '../context/LearningContext'
import { CourseCard } from '../components/CourseCard'
import { ProgressBar } from '../components/ProgressBar'
import { PageError, PageLoader } from '../components/PageLoader'
import { getLesson } from '../lib/courseUtils'

export function Dashboard() {
  const { courses, loading: dataLoading, error, refresh, getCourse } = useData()
  const { progress, getCourseProgress, isEnrolled, loading: progressLoading } =
    useLearning()

  const enrolledCourses = courses.filter((c) => isEnrolled(c.id))
  const suggested = courses.filter((c) => !isEnrolled(c.id)).slice(0, 3)

  const totalLessons = enrolledCourses.reduce((acc, c) => acc + c.lessonsCount, 0)
  const completedLessons = enrolledCourses.reduce(
    (acc, c) => acc + (progress.completedLessons[c.id]?.length ?? 0),
    0
  )
  const globalProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  const lastVisit = progress.lastVisitedLesson
  const lastCourseSummary = lastVisit
    ? courses.find((c) => c.id === lastVisit.courseId)
    : null
  const [lastCourseFull, setLastCourseFull] = useState<Course | null>(null)

  useEffect(() => {
    if (!lastCourseSummary) {
      setLastCourseFull(null)
      return
    }
    getCourse(lastCourseSummary.slug).then(setLastCourseFull)
  }, [lastCourseSummary?.slug, getCourse])

  if (dataLoading || progressLoading) return <PageLoader />
  if (error) return <PageError message={error} onRetry={refresh} />

  const lastLesson =
    lastCourseFull && lastVisit
      ? getLesson(lastCourseFull, lastVisit.lessonId)
      : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-heading">Mon espace</h1>
      <p className="text-muted mt-2">Suivez votre progression et reprenez vos formations.</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="p-5 rounded-2xl card-base">
          <BookOpen className="w-8 h-8 text-brand-600 dark:text-brand-400 mb-3" />
          <p className="font-display text-2xl font-bold text-heading">{enrolledCourses.length}</p>
          <p className="text-sm text-muted">Cours inscrits</p>
        </div>
        <div className="p-5 rounded-2xl card-base">
          <TrendingUp className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-3" />
          <p className="font-display text-2xl font-bold text-heading">{completedLessons}</p>
          <p className="text-sm text-muted">Leçons terminées</p>
        </div>
        <div className="p-5 rounded-2xl card-base">
          <Award className="w-8 h-8 text-accent-500 dark:text-accent-400 mb-3" />
          <p className="font-display text-2xl font-bold text-heading">{globalProgress}%</p>
          <p className="text-sm text-muted">Progression globale</p>
        </div>
      </div>

      {enrolledCourses.length > 0 && (
        <div className="mt-6">
          <ProgressBar value={globalProgress} label="Progression globale" />
        </div>
      )}

      {lastCourseSummary && lastLesson && (
        <div className="mt-10 p-6 rounded-2xl border border-brand-500/20 bg-brand-500/5">
          <p className="text-xs text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wide mb-2">
            Reprendre
          </p>
          <h2 className="font-display text-lg font-semibold text-heading">{lastLesson.title}</h2>
          <p className="text-sm text-muted mt-1">{lastCourseSummary.title}</p>
          <Link
            to={`/cours/${lastCourseSummary.slug}/lecon/${lastLesson.id}`}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors"
          >
            <Play className="w-4 h-4" />
            Continuer
          </Link>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-heading mb-6">Mes cours</h2>
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-theme">
            <BookOpen className="w-12 h-12 text-faint mx-auto mb-4" />
            <p className="text-muted">Vous n'êtes inscrit à aucun cours pour le moment.</p>
            <Link
              to="/cours"
              className="inline-block mt-4 text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 font-medium text-sm"
            >
              Parcourir le catalogue →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                showProgress={getCourseProgress(course.id)}
              />
            ))}
          </div>
        )}
      </section>

      {suggested.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold text-heading mb-6">
            Suggestions pour vous
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggested.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
