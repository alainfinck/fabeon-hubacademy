import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '../types'
import {
  api,
  clearAuth,
  getAuthToken,
  setAuthSession,
} from '../api/client'

interface AuthContextValue {
  user: AuthUser | null
  ready: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function restore() {
      if (!getAuthToken()) {
        if (!cancelled) {
          setUser(null)
          setReady(true)
        }
        return
      }
      try {
        const data = await api.getMe()
        const token = getAuthToken()
        if (!cancelled && token) {
          setAuthSession(token, data.learnerId)
          setUser(data.user)
        }
      } catch {
        clearAuth()
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setReady(true)
      }
    }
    restore()
    return () => {
      cancelled = true
    }
  }, [])

  const applySession = useCallback(
    (session: { user: AuthUser; token: string; learnerId: string }) => {
      setAuthSession(session.token, session.learnerId)
      setUser(session.user)
    },
    []
  )

  const login = useCallback(
    async (email: string, password: string) => {
      const session = await api.login(email, password)
      applySession(session)
    },
    [applySession]
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const session = await api.register(name, email, password)
      applySession(session)
    },
    [applySession]
  )

  const logout = useCallback(async () => {
    try {
      await api.logout()
    } catch {
      /* ignore */
    }
    clearAuth()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
