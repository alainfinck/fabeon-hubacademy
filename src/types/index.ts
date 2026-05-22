export type CourseLevel = 'debutant' | 'intermediaire' | 'avance' | 'expert'
export type CourseFormat = 'en-ligne' | 'atelier' | 'hybride' | 'atelier-ia'
export type LessonType = 'video' | 'texte' | 'quiz' | 'pratique'

export type CategoryId =
  | 'calibration'
  | 'impression'
  | 'decoupe'
  | 'logiciels'
  | 'ateliers'
  | 'communication'
  | 'ia'

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
  price: string
  equipment?: string[]
  software?: string[]
  modules: Module[]
  objectives: string[]
  prerequisites: string[]
  imageGradient: string
}

export type EventType = 'conference' | 'webinar' | 'salon' | 'masterclass' | 'meetup'
export type EventFormat = 'presentiel' | 'en-ligne' | 'hybride'

export interface HubEvent {
  id: string
  slug: string
  title: string
  description: string
  type: EventType
  format: EventFormat
  date: string
  endDate?: string
  time?: string
  location: string
  speakers: string[]
  topics: string[]
  seats?: number
  seatsLeft?: number
  price: string
  free: boolean
  featured: boolean
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
  /** Ateliers dédiés intelligence artificielle */
  ia?: boolean
}

export type EnterpriseProjectStatus =
  | 'pending'
  | 'assigned'
  | 'in_progress'
  | 'completed'

export interface EnterpriseProject {
  id: number
  company: string
  projectType: string
  description: string
  deadline: string | null
  status: EnterpriseProjectStatus
  createdAt: string
}

export interface EnterpriseProjectDetail extends EnterpriseProject {
  contactName: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface AuthSession {
  user: AuthUser
  token: string
  learnerId: string
}

export interface UserProgress {
  enrolledCourses: string[]
  completedLessons: Record<string, string[]>
  lastVisitedLesson?: { courseId: string; lessonId: string }
}
