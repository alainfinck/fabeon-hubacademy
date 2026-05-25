import type {
  AuthSession,
  AuthUser,
  Category,
  Course,
  EnterpriseProject,
  EnterpriseProjectDetail,
  EnterpriseProjectStatus,
  ExchangePost,
  HubEvent,
  CategoryId,
  EventType,
  UserProgress,
  Workshop,
} from '../types'

const API_BASE = '/api'

const LEARNER_KEY = 'fabeon-learner-id'
const AUTH_TOKEN_KEY = 'fabeon-auth-token'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
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

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

function getLearnerHeaders(): Record<string, string> {
  const id = getLearnerId()
  return id ? { 'x-learner-id': id } : {}
}

function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function setAuthSession(token: string, learnerId: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(LEARNER_KEY, learnerId)
}

export function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(LEARNER_KEY)
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

  getEvents: (type?: EventType) =>
    request<HubEvent[]>(type ? `/events?type=${type}` : '/events'),

  getEventBySlug: (slug: string) => request<HubEvent>(`/events/${slug}`),

  register: (name: string, email: string, password: string) =>
    request<AuthSession>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () =>
    request<{ user: AuthUser; learnerId: string }>('/auth/me'),

  logout: () =>
    request<{ ok: boolean }>('/auth/logout', { method: 'POST' }),

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

  getEnterpriseProjects: (status?: EnterpriseProjectStatus) =>
    request<EnterpriseProject[]>(
      status ? `/enterprise-projects?status=${status}` : '/enterprise-projects'
    ),

  getEnterpriseProject: (id: string | number) =>
    request<EnterpriseProjectDetail>(`/enterprise-projects/${id}`),

  getExchangePosts: (topic?: CategoryId | 'all') =>
    request<ExchangePost[]>(
      topic && topic !== 'all' ? `/exchange-posts?topic=${topic}` : '/exchange-posts'
    ),

  getExchangePost: (id: string | number) =>
    request<ExchangePost>(`/exchange-posts/${id}`),

  submitExchangePost: (data: {
    topic: CategoryId
    title: string
    body: string
    authorName: string
    authorRole?: string
    email?: string
  }) =>
    request<{ id: number; ok: boolean }>('/exchange-posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  submitEnterpriseProject: (data: {
    company: string
    contactName: string
    email: string
    phone: string
    projectType: string
    description: string
    deadline: string
  }) =>
    request<{ id: number; ok: boolean }>('/enterprise-projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
