import { STORAGE_KEYS } from '../utils/constants'

const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

const readMarkedAttendance = () => {
  const rawData = localStorage.getItem(STORAGE_KEYS.markedAttendance)
  if (!rawData) return []
  try {
    return JSON.parse(rawData)
  } catch {
    return []
  }
}

const writeMarkedAttendance = (entries) => {
  localStorage.setItem(STORAGE_KEYS.markedAttendance, JSON.stringify(entries))
}

export const markAttendance = async (date, location = 'Surat') => {
  await wait()

  const userRaw = localStorage.getItem(STORAGE_KEYS.user)
  const user = userRaw ? JSON.parse(userRaw) : null

  const entries = readMarkedAttendance()
  entries.push({
    id: Date.now(),
    employeeId: user?.id || 0,
    email: user?.email || 'employee@techstile.com',
    date,
    location,
  })
  writeMarkedAttendance(entries)

  return { success: true, message: 'Attendance marked successfully' }
}

export const getAttendanceByEmployee = async (employeeId, month, year) => {
  await wait(300)
  const entries = readMarkedAttendance()

  return entries.filter((item) => {
    const d = new Date(item.date)
    return (
      String(item.employeeId) === String(employeeId)
      && d.getMonth() + 1 === month
      && d.getFullYear() === year
    )
  })
}

export const getMonthlyReport = async (month, year) => {
  await wait(300)
  const entries = readMarkedAttendance()
  const monthlyEntries = entries.filter((item) => {
    const d = new Date(item.date)
    return d.getMonth() + 1 === month && d.getFullYear() === year
  })

  return {
    totalMarked: monthlyEntries.length,
    month,
    year,
  }
}
