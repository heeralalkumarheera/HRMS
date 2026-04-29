import axios from 'axios'
import { STORAGE_KEYS } from '../utils/constants'
import { normalizeRole } from '../utils/auth'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ============================================
// MOCK DATA (for offline testing/development)
// ============================================
const mockUsers = [
  { id: 1, name: 'Aarav Patel', email: 'admin@hrms.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Riya Sharma', email: 'riya@hrms.com', password: 'emp123', role: 'employee' },
]

const buildMockToken = (user) => `mock-token-${user.role}-${user.id}-${Date.now()}`

const normalizeUser = (user, fallbackEmail = '') => {
  if (!user) return null

  const email = user.email || fallbackEmail
  const role = normalizeRole(user.role) || normalizeRole('employee')

  return {
    ...user,
    email,
    role,
    name: user.name || user.full_name || email?.split('@')?.[0] || 'User',
  }
}

const persistSession = (token, user, refreshToken) => {
  localStorage.setItem(STORAGE_KEYS.token, token)
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))

  if (refreshToken) {
    localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken)
  } else {
    localStorage.removeItem(STORAGE_KEYS.refreshToken)
  }
}

// ============================================
// REAL API INTEGRATION
// ============================================
export const login = async (email, password) => {
  try {
    const response = await authClient.post('/auth/login/', { email, password })
    const token = response.data.access || response.data.token || response.data.access_token
    const refreshToken = response.data.refresh || response.data.refresh_token || null

    if (!token) {
      throw new Error('Login response missing access token')
    }

    const user = normalizeUser(response.data.user, email)
    persistSession(token, user, refreshToken)

    return { token, user, refreshToken }
  } catch (apiError) {
    // FALLBACK TO MOCK (for development/testing without backend)
    console.warn('Backend login failed, using mock data:', apiError.message)

    const user = mockUsers.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    )

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const token = buildMockToken(user)
    const safeUser = normalizeUser({ id: user.id, name: user.name, email: user.email, role: user.role }, email)

    persistSession(token, safeUser)

    return { token, user: safeUser }
  }
}

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken)
    await authClient.post('/auth/logout/', refreshToken ? { refresh: refreshToken } : {})
  } catch (error) {
    console.warn('Logout API call failed:', error.message)
  } finally {
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.refreshToken)
    localStorage.removeItem(STORAGE_KEYS.user)
  }
}

export const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken)

  if (!storedRefreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await authClient.post('/auth/refresh/', { refresh: storedRefreshToken })
  const token = response.data.access || response.data.token || response.data.access_token
  const nextRefreshToken = response.data.refresh || response.data.refresh_token || storedRefreshToken

  if (!token) {
    throw new Error('Refresh response missing access token')
  }

  localStorage.setItem(STORAGE_KEYS.token, token)
  localStorage.setItem(STORAGE_KEYS.refreshToken, nextRefreshToken)

  return { token, refreshToken: nextRefreshToken, user: getCurrentUser() }
}

export const getCurrentUser = () => {
  const rawUser = localStorage.getItem(STORAGE_KEYS.user)
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}

export const isAuthenticated = () => Boolean(localStorage.getItem(STORAGE_KEYS.token))
