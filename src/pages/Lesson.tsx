import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Video,
  FileText,
  HelpCircle,
  Wrench,
} from 'lucide-react'
import { getCourseBySlug, getAllLessons, getLesson } from '../data/courses'
import { useLearning } from '../context/LearningContext'

const typeConfig = {
  video: { icon: Video, label: 'Vidéo', color: 'text-cyan-600 dark:text-cyan-400' },
  texte: { icon: FileText, label: 'Lecture', color: 'text-violet-600 dark:text-violet-400' },
  quiz: { icon: HelpCircle, label: 'Quiz', color: 'text-amber-600 dark:text-amber-400' },
  pratique: { icon: Wrench, label: 'Pratique', color: 'text-emerald-600 dark:text-emerald-400' },
}

export function Lesson() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>()
  const course = slug ? getCourseBySlug(slug) : undefined
  const lesson = course && lessonId ? getLesson(course, lessonId) : undefined
  const {
    isEnrolled,
    enroll,
    completeLesson,
    isLessonComplete,
    setLastVisited,
  } = useLearning()

  if (!course || !lesson || !lessonId) return <Navigate to="/cours" replace />

  const allLessons = getAllLessons(course)
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const done = isLessonComplete(course.id, lessonId)
  const enrolled = isEnrolled(course.id)
  const TypeIcon = typeConfig[lesson.type].icon

  const handleComplete = () => {
    if (!enrolled) enroll(course.id)
    completeLesson(course.id, lessonId)
  }

  const handleStart = () => {
    if (!enrolled) enroll(course.id)
    setLastVisited(course.id, lessonId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-faint mb-6 flex flex-wrap items-center gap-2">
        <Link to="/cours" className="hover:text-brand-600 dark:hover:text-brand-400">Cours</Link>
        <span>/</span>
        <Link
          to={`/cours/${course.slug}`}
          className="hover:text-brand-600 dark:hover:text-brand-400 truncate max-w-[200px]"
        >
          {course.title}
        </Link>
        <span>/</span>
        <span className="text-body truncate">{lesson.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div
              className={`inline-flex items-center gap-1.5 text-sm ${typeConfig[lesson.type].color} mb-2`}
            >
              <TypeIcon className="w-4 h-4" />
              {typeConfig[lesson.type].label} · {lesson.duration} min
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              {lesson.title}
            </h1>
            <p className="text-muted mt-2">{lesson.description}</p>
          </div>

          {lesson.type === 'video' && (
            <div
              className="aspect-video rounded-2xl bg-elevated border border-theme flex items-center justify-center"
              onClick={handleStart}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </div>
                <p className="text-muted text-sm">Lecteur vidéo — démo pédagogique</p>
                <p className="text-xs text-faint mt-1">
                  Intégrez vos vidéos via URL ou hébergement
                </p>
              </div>
            </div>
          )}

          {lesson.type === 'quiz' && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
              <HelpCircle className="w-10 h-10 text-amber-600 dark:text-amber-400 mb-4" />
              <h2 className="font-display text-lg font-semibold text-heading mb-2">
                Quiz de validation
              </h2>
              <p className="text-muted text-sm mb-6">
                Ce quiz permet de valider vos acquis sur le module. Dans une version connectée à un
                backend, les questions seraient interactives avec scoring.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl card-inner border border-theme">
                  <p className="text-heading font-medium mb-3">
                    1. Quel espace colorimétrique est indépendant du périphérique ?
                  </p>
                  <div className="space-y-2 text-sm">
                    {['sRGB', 'CMYK', 'CIELAB (Lab)', 'Adobe RGB'].map((opt, i) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer text-body"
                      >
                        <input
                          type="radio"
                          name="q1"
                          defaultChecked={i === 2}
                          className="accent-brand-500"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {lesson.content && (
            <div
              className="prose-lesson rounded-2xl card-base p-6 sm:p-8"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
              onClick={handleStart}
            />
          )}

          {!lesson.content && lesson.type !== 'quiz' && lesson.type !== 'video' && (
            <div className="rounded-2xl card-base p-8 text-muted">
              Contenu pratique — suivez les instructions de votre formateur en atelier ou en
              session live.
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            {!done ? (
              <button
                type="button"
                onClick={handleComplete}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                Marquer comme terminée
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500/15 text-brand-700 dark:text-brand-400 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
                Leçon terminée
              </span>
            )}
          </div>

          <div className="flex justify-between pt-6 border-t border-theme">
            {prev ? (
              <Link
                to={`/cours/${course.slug}/lecon/${prev.id}`}
                className="inline-flex items-center gap-1 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400"
              >
                <ChevronLeft className="w-4 h-4" />
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/cours/${course.slug}/lecon/${next.id}`}
                className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to={`/cours/${course.slug}`}
                className="text-sm text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
              >
                Retour au cours
              </Link>
            )}
          </div>
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl card-base p-5 max-h-[70vh] overflow-y-auto">
            <h3 className="font-display font-semibold text-heading text-sm mb-4">Programme</h3>
            <ul className="space-y-1">
              {allLessons.map((l) => {
                const isCurrent = l.id === lessonId
                const isDone = isLessonComplete(course.id, l.id)
                return (
                  <li key={l.id}>
                    <Link
                      to={`/cours/${course.slug}/lecon/${l.id}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isCurrent
                          ? 'bg-brand-500/15 text-brand-700 dark:text-brand-300'
                          : 'text-muted hover:text-heading hover:bg-muted'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isDone && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500 shrink-0" />
                        )}
                        <span className="truncate">{l.title}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
