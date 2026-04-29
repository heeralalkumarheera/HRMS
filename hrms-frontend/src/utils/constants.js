export const APP_NAME = 'Techstile HRMS'
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const AUTH_ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
}

export const ROLE_HOME_PATHS = {
  [AUTH_ROLES.ADMIN]: '/admin/dashboard',
  [AUTH_ROLES.HR]: '/hr/dashboard',
  [AUTH_ROLES.MANAGER]: '/manager/dashboard',
  [AUTH_ROLES.EMPLOYEE]: '/employee/dashboard',
}

export const STORAGE_KEYS = {
  token: 'hrms_token',
  refreshToken: 'hrms_refresh_token',
  user: 'hrms_user',
  markedAttendance: 'hrms_marked_attendance',
}

export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  FRONTEND: 'Front-End',
  BACKEND: 'Back-End',
  UI_UX: 'UI/UX',
  FULL_STACK: 'Full Stack',
}

export const LEAVE_TYPES = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Work From Home']

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LEAVE: 'leave',
}
