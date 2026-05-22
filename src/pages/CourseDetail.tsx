import { Link, useParams, Navigate } from 'react-router-dom'
import {
  Clock,
  BookOpen,
  User,
  CheckCircle2,
  Play,
  ChevronRight,
  Monitor,
  Wrench,
} from 'lucide-react'
import { levelLabels, formatLabels } from '../data/categories'
import { CategoryBadge } from '../components/CategoryBadge'
import { ProgressBar } from '../components/ProgressBar'
import { PageLoader } from '../components/PageLoader'
import { useLearning } from '../context/LearningContext'
import { useCourse } from '../hooks/useCourse'
import { getAllLessons } from '../lib/courseUtils'
import { formatDuration } from '../utils/format'

const lessonTypeIcons: Record<string, string> = {
  video: 'Vidéo',
  texte: 'Lecture',
  quiz: 'Quiz',
  pratique: 'Pratique',
}

export function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { course, loading, error } = useCourse(slug)
  const { isEnrolled, enroll, unenroll, getCourseProgress, isLessonComplete } = useLearning()

  if (loading) return <PageLoader />
  if (error || !course) return <Navigate to="/cours" replace />

  const enrolled = isEnrolled(course.id)
  const progress = getCourseProgress(course.id)
  const allLessons = getAllLessons(course)
  const firstLesson = allLessons[0]

  return (
    <div>
      <div className={`bg-gradient-to-br ${course.imageGradient} relative`}>
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/cours" className="text-sm text-white/80 hover:text-white mb-4 inline-block">
            ← Retour au catalogue
          </Link>
          <CategoryBadge categoryId={course.category} size="md" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-4 max-w-3xl">
            {course.title}
          </h1>
          <p className="text-lg text-white/90 mt-2 max-w-2xl">{course.subtitle}</p>
          <div className="flex flex-wrap gap-3 mt-6 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDuration(course.duration)}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lessonsCount} leçons
            </span>
            <span>{levelLabels[course.level]}</span>
            <span>{formatLabels[course.format]}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-display text-xl font-semibold text-heading mb-4">Description</h2>
              <p className="text-body leading-relaxed">{course.description}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-heading mb-4">
                Objectifs pédagogiques
              </h2>
              <ul className="space-y-2">
                {course.objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-2 text-body">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-500 shrink-0 mt-0.5" />
                    {obj}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-heading mb-6">
                Programme du cours
              </h2>
              <div className="space-y-6">
                {course.modules.map((mod, mi) => (
                  <div key={mod.id} className="rounded-2xl border border-theme overflow-hidden">
                    <div className="px-5 py-3 bg-elevated border-b border-theme">
                      <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                        Module {mi + 1}
                      </span>
                      <h3 className="font-display font-semibold text-heading">{mod.title}</h3>
                    </div>
                    <ul className="divide-y divide-theme">
                      {mod.lessons.map((lesson) => {
                        const done = isLessonComplete(course.id, lesson.id)
                        return (
                          <li key={lesson.id}>
                            <Link
                              to={`/cours/${course.slug}/lecon/${lesson.id}`}
                              className="flex items-center gap-4 px-5 py-4 hover:bg-muted transition-colors group"
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                  done
                                    ? 'bg-brand-500/20 text-brand-600 dark:text-brand-400'
                                    : 'bg-muted text-faint'
                                }`}
                              >
                                {done ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4 ml-0.5" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-heading font-medium group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors truncate">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-faint mt-0.5">
                                  {lessonTypeIcons[lesson.type]} · {lesson.duration} min
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-faint group-hover:text-brand-600 dark:group-hover:text-brand-400" />
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 rounded-2xl card-base p-6 space-y-5">
              {enrolled && <ProgressBar value={progress} label="Votre progression" />}

              {enrolled ? (
                <>
                  <Link
                    to={
                      firstLesson
                        ? `/cours/${course.slug}/lecon/${firstLesson.id}`
                        : '#'
                    }
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    {progress > 0 ? 'Continuer' : 'Commencer'}
                  </Link>
                <button
                  type="button"
                  onClick={() => void unenroll(course.id)}
                    className="w-full py-2 text-sm text-faint hover:text-muted transition-colors"
                  >
                    Se désinscrire
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => void enroll(course.id)}
                  className="w-full py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
                >
                  S'inscrire au cours
                </button>
              )}

              <div className="pt-4 border-t border-theme space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-brand-600 dark:text-brand-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-heading font-medium">{course.instructor}</p>
                    <p className="text-faint">{course.instructorRole}</p>
                  </div>
                </div>
              </div>

              {course.equipment && course.equipment.length > 0 && (
                <div>
                  <p className="text-xs text-faint uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5" /> Matériel
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.equipment.map((e) => (
                      <span key={e} className="text-xs badge-muted px-2 py-1 rounded">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {course.software && course.software.length > 0 && (
                <div>
                  <p className="text-xs text-faint uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5" /> Logiciels
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.software.map((s) => (
                      <span key={s} className="text-xs badge-muted px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {course.prerequisites.length > 0 && (
                <div>
                  <p className="text-xs text-faint uppercase tracking-wide mb-2">Prérequis</p>
                  <ul className="text-sm text-muted space-y-1">
                    {course.prerequisites.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-brand-700 dark:text-brand-400/80 bg-brand-500/10 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
