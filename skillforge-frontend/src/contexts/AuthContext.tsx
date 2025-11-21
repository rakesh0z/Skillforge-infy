import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { login as loginRequest, register as registerRequest, fetchProfile } from '../api/auth'
import { setAuthToken } from '../api/http'
import type { UserProfile, UserRole } from '../types'

interface AuthContextValue {
  user: UserProfile | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<UserProfile>
  register: (payload: {
    name: string
    email: string
    password: string
    role: UserRole
  }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'skillforge:token'
const USER_KEY = 'skillforge:user'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<UserProfile | null>(() => {
    const cached = localStorage.getItem(USER_KEY)
    return cached ? (JSON.parse(cached) as UserProfile) : null
  })
  const [loading, setLoading] = useState<boolean>(!!token)

  useEffect(() => {
    if (token) {
      setAuthToken(token)
      fetchProfile()
        .then((profile) => {
          setUser(profile)
          localStorage.setItem(USER_KEY, JSON.stringify(profile))
        })
        .catch(() => {
          logout()
        })
        .finally(() => setLoading(false))
    } else {
      setAuthToken(null)
      setLoading(false)
    }
  }, [])

  const persistSession = (sessionToken: string, profile: UserProfile) => {
    setTokenState(sessionToken)
    setAuthToken(sessionToken)
    localStorage.setItem(TOKEN_KEY, sessionToken)
    setUser(profile)
    localStorage.setItem(USER_KEY, JSON.stringify(profile))
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await loginRequest({ email, password })
      const profile: UserProfile = {
        email: response.email,
        name: response.name,
        role: response.role,
      }
      persistSession(response.token, profile)
      toast.success('Welcome back!')
      return profile
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? 'Login failed')
      throw error
    }
  }

  const register = async (payload: {
    name: string
    email: string
    password: string
    role: UserRole
  }) => {
    try {
      await registerRequest(payload)
      toast.success('Account created. Please log in.')
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    setTokenState(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setAuthToken(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [user, token, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

