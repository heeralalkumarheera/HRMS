import axios from 'axios'
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants'
import { refreshToken as refreshAuthToken } from './authService'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

const clearAuthSession = () => {
  localStorage.removeItem(STORAGE_KEYS.token)
  localStorage.removeItem(STORAGE_KEYS.refreshToken)
  localStorage.removeItem(STORAGE_KEYS.user)
}

let refreshRequest = null

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config

    if (error?.response?.status === 401 && originalRequest && !originalRequest._retry) {
      const requestUrl = originalRequest.url || ''

      if (requestUrl.includes('/auth/login/') || requestUrl.includes('/auth/refresh/') || !localStorage.getItem(STORAGE_KEYS.refreshToken)) {
        clearAuthSession()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        originalRequest._retry = true
        if (!refreshRequest) {
          refreshRequest = refreshAuthToken().finally(() => {
            refreshRequest = null
          })
        }

        const { token } = await refreshRequest
        originalRequest.headers.Authorization = `Bearer ${token}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        clearAuthSession()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
