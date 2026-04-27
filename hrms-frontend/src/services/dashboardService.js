const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export const getStats = async () => {
  await wait()
  return [
    { role: 'Front-End Developer', count: 80, color: 'from-sky-500 to-cyan-500' },
    { role: 'Back-End Developer', count: 60, color: 'from-emerald-500 to-green-600' },
    { role: 'UI/UX Developer', count: 20, color: 'from-rose-500 to-pink-600' },
  ]
}

export const getEnglishProficiency = async () => {
  await wait(300)
  return { percentage: 75 }
}

export const getAttendanceReport = async () => {
  await wait()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const present = [85, 78, 90, 88, 92, 86]
  const absent = [15, 22, 10, 12, 8, 14]

  return months.map((month, index) => ({
    month,
    present: present[index],
    absent: absent[index],
  }))
}
