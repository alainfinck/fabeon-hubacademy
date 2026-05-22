import type { Category, Course, UserProgress, Workshop } from '../types'

const API_BASE = '/api'

const LEARNER_KEY = 'fabeon-learner-id'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getLearnerHeaders(),
      ...init?.headers,
    },
    ...init,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error((err as { error?: string }).error ?? 'Erreur API')
  }
  return res.json() as Promise<T>
}

export function getLearnerId(): string | null {
  return localStorage.getItem(LEARNER_KEY)
}

function getLearnerHeaders(): Record<string, string> {
  const id = getLearnerId()
  return id ? { 'x-learner-id': id } : {}
}

export async function ensureLearnerId(): Promise<string> {
  let id = getLearnerId()
  if (id) return id
  const { id: newId } = await fetch(`${API_BASE}/learners`, {
    method: 'POST',
  }).then((r) => r.json() as Promise<{ id: string }>)
  localStorage.setItem(LEARNER_KEY, newId)
  return newId
}

export const api = {
  getCategories: () => request<Category[]>('/categories'),

  getCourses: () => request<Course[]>('/courses'),

  getCourseBySlug: (slug: string) => request<Course>(`/courses/${slug}`),

  getWorkshops: () => request<Workshop[]>('/workshops'),

  getProgress: () => request<UserProgress>('/progress'),

  enroll: (courseId: string) =>
    request<UserProgress>('/progress/enroll', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    }),

  unenroll: (courseId: string) =>
    request<UserProgress>(`/progress/enroll/${courseId}`, { method: 'DELETE' }),

  completeLesson: (courseId: string, lessonId: string) =>
    request<UserProgress>('/progress/lessons/complete', {
      method: 'POST',
      body: JSON.stringify({ courseId, lessonId }),
    }),

  setLastVisited: (courseId: string, lessonId: string) =>
    request<UserProgress>('/progress/last-visited', {
      method: 'PATCH',
      body: JSON.stringify({ courseId, lessonId }),
    }),
}
