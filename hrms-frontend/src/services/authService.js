import apiClient from './api'
import { STORAGE_KEYS } from '../utils/constants'

// ============================================
// MOCK DATA (for offline testing/development)
// ============================================
const mockUsers = [
  { id: 1, name: 'Aarav Patel', email: 'admin@hrms.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Riya Sharma', email: 'riya@hrms.com', password: 'emp123', role: 'employee' },
]

const buildMockToken = (user) => `mock-token-${user.role}-${user.id}-${Date.now()}`

// ============================================
// REAL API INTEGRATION
// ============================================
export const login = async (email, password) => {
  try {
    // Call real backend API
    // Expected response structure: { token: "...", user: { id, name, email, role } }
    const response = await apiClient.post('/auth/login/', { email, password })
    const { token, user } = response.data

    // Store token + user in localStorage
    localStorage.setItem(STORAGE_KEYS.token, token)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))

    return { token, user }
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
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role }

    localStorage.setItem(STORAGE_KEYS.token, token)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(safeUser))

    return { token, user: safeUser }
  }
}

export const logout = async () => {
  try {
    // Call backend logout endpoint
    await apiClient.post('/auth/logout/', {})
  } catch (error) {
    console.warn('Logout API call failed:', error.message)
  }

  // Always clear local storage regardless of API response
  localStorage.removeItem(STORAGE_KEYS.token)
  localStorage.removeItem(STORAGE_KEYS.user)
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
