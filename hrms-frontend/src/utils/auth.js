import { AUTH_ROLES, ROLE_HOME_PATHS } from './constants'

const ROLE_LABELS = {
  [AUTH_ROLES.ADMIN]: 'Admin',
  [AUTH_ROLES.HR]: 'HR',
  [AUTH_ROLES.MANAGER]: 'Manager',
  [AUTH_ROLES.EMPLOYEE]: 'Employee',
}

export const normalizeRole = (role) => {
  const value = String(role ?? '').trim().toLowerCase()

  if (!value) return ''
  if (value === 'administrator') return AUTH_ROLES.ADMIN

  return value
}

export const getRoleHomePath = (role) => ROLE_HOME_PATHS[normalizeRole(role)] || '/login'

export const getRoleLabel = (role) => ROLE_LABELS[normalizeRole(role)] || 'User'

export const isAllowedRole = (role, allowedRoles = []) => {
  if (!allowedRoles.length) return true

  const normalizedRole = normalizeRole(role)
  return allowedRoles.map(normalizeRole).includes(normalizedRole)
}