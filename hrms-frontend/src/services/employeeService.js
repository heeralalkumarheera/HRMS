import { ROLES } from '../utils/constants'

const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

let employees = [
  {
    id: 1001,
    name: 'Riya Sharma',
    email: 'riya@techstile.com',
    password: 'emp123',
    role: ROLES.FRONTEND,
    phone: '9876543210',
    joiningDate: '2024-01-10',
    imageUrl: '',
    address: 'Adajan, Surat',
    department: 'Engineering',
  },
  {
    id: 1002,
    name: 'Aman Verma',
    email: 'aman@techstile.com',
    password: 'emp123',
    role: ROLES.BACKEND,
    phone: '9812345678',
    joiningDate: '2023-08-21',
    imageUrl: '',
    address: 'Vesu, Surat',
    department: 'Engineering',
  },
  {
    id: 1003,
    name: 'Nisha Joshi',
    email: 'nisha@techstile.com',
    password: 'emp123',
    role: ROLES.UI_UX,
    phone: '9898989898',
    joiningDate: '2024-03-14',
    imageUrl: '',
    address: 'Katargam, Surat',
    department: 'Design',
  },
  {
    id: 1004,
    name: 'Kabir Mehta',
    email: 'kabir@techstile.com',
    password: 'emp123',
    role: ROLES.FULL_STACK,
    phone: '9321456780',
    joiningDate: '2023-11-05',
    imageUrl: '',
    address: 'Athwa, Surat',
    department: 'Engineering',
  },
  {
    id: 1005,
    name: 'Priya Desai',
    email: 'priya@techstile.com',
    password: 'emp123',
    role: ROLES.FRONTEND,
    phone: '9012345670',
    joiningDate: '2022-12-19',
    imageUrl: '',
    address: 'Udhna, Surat',
    department: 'Engineering',
  },
  {
    id: 1006,
    name: 'Dev Shah',
    email: 'dev@techstile.com',
    password: 'emp123',
    role: ROLES.BACKEND,
    phone: '9871200432',
    joiningDate: '2025-01-02',
    imageUrl: '',
    address: 'Piplod, Surat',
    department: 'Platform',
  },
]

export const getEmployees = async () => {
  await wait()
  return [...employees]
}

export const getEmployeeById = async (id) => {
  await wait(300)
  const employee = employees.find((item) => String(item.id) === String(id))
  if (!employee) {
    throw new Error('Employee not found')
  }
  return { ...employee }
}

export const addEmployee = async (data) => {
  await wait(700)
  const newEmployee = {
    ...data,
    id: Date.now(),
    department: data.department || 'Engineering',
  }
  employees = [newEmployee, ...employees]
  return newEmployee
}

export const updateEmployee = async (id, data) => {
  await wait(700)
  let updatedEmployee = null
  employees = employees.map((item) => {
    if (String(item.id) === String(id)) {
      updatedEmployee = { ...item, ...data }
      return updatedEmployee
    }
    return item
  })

  if (!updatedEmployee) {
    throw new Error('Employee not found')
  }

  return updatedEmployee
}

export const deleteEmployee = async (id) => {
  await wait(400)
  employees = employees.filter((item) => String(item.id) !== String(id))
  return { success: true }
}
