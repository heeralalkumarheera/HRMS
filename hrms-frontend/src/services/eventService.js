const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

let events = [
  { id: 1, title: 'Sprint Planning', date: '2026-04-23', type: 'Meeting' },
  { id: 2, title: 'Payroll Freeze', date: '2026-04-28', type: 'Deadline' },
  { id: 3, title: 'Design QA', date: '2026-05-03', type: 'Review' },
]

export const getEvents = async () => {
  await wait()
  return [...events]
}

export const addEvent = async (data) => {
  await wait(500)
  const newEvent = { id: Date.now(), ...data }
  events = [newEvent, ...events]
  return newEvent
}

export const updateEvent = async (id, data) => {
  await wait(500)
  let updated = null
  events = events.map((item) => {
    if (String(item.id) === String(id)) {
      updated = { ...item, ...data }
      return updated
    }
    return item
  })
  return updated
}

export const deleteEvent = async (id) => {
  await wait(400)
  events = events.filter((item) => String(item.id) !== String(id))
  return { success: true }
}
