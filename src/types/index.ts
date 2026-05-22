export type CourseLevel = 'debutant' | 'intermediaire' | 'avance' | 'expert'
export type CourseFormat = 'en-ligne' | 'atelier' | 'hybride'
export type LessonType = 'video' | 'texte' | 'quiz' | 'pratique'

export type CategoryId =
  | 'calibration'
  | 'impression'
  | 'decoupe'
  | 'logiciels'
  | 'ateliers'
  | 'communication'

export interface Category {
  id: CategoryId
  label: string
  description: string
  icon: string
  color: string
}

export interface Lesson {
  id: string
  title: string
  duration: number
  type: LessonType
  description: string
  content?: string
  videoUrl?: string
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  category: CategoryId
  level: CourseLevel
  format: CourseFormat
  duration: number
  lessonsCount: number
  instructor: string
  instructorRole: string
  tags: string[]
  featured: boolean
  equipment?: string[]
  software?: string[]
  modules: Module[]
  objectives: string[]
  prerequisites: string[]
  imageGradient: string
}

export interface Workshop {
  id: string
  slug: string
  title: string
  description: string
  date: string
  location: string
  seats: number
  seatsLeft: number
  duration: string
  equipment: string[]
  level: CourseLevel
  price: string
  imageGradient: string
}

export interface UserProgress {
  enrolledCourses: string[]
  completedLessons: Record<string, string[]>
  lastVisitedLesson?: { courseId: string; lessonId: string }
}
