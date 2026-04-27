/**
 * EMPLOYEE SERVICE - API Integration Template
 * 
 * Current: Mock data with simulated delays
 * Target: Real API calls to backend
 * 
 * Swap this entire file once backend endpoints are ready
 */

import apiClient from './api'

// ============================================
// MOCK DATA (offline/development fallback)
// ============================================
let mockEmployees = [
  {
    id: 1001,
    name: 'Riya Sharma',
    email: 'riya@techstile.com',
    password: 'emp123',
    role: 'Front-End',
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
    role: 'Back-End',
    phone: '9812345678',
    joiningDate: '2023-08-21',
    imageUrl: '',
    address: 'Vesu, Surat',
    department: 'Engineering',
  },
]

// ============================================
// REAL API IMPLEMENTATION
// ============================================

/**
 * GET /employees → Fetch all employees
 * Response: Array of employee objects
 */
export const getEmployees = async () => {
  try {
    // REAL: Uncomment when backend is ready
    // const response = await apiClient.get('/employees')
    // return response.data

    // MOCK: Fallback for development
    return [...mockEmployees]
  } catch (error) {
    console.warn('Failed to fetch employees, using mock:', error.message)
    return [...mockEmployees]
  }
}

/**
 * GET /employees/:id → Fetch single employee
 * Response: Employee object
 */
export const getEmployeeById = async (id) => {
  try {
    // REAL: Uncomment when backend is ready
    // const response = await apiClient.get(`/employees/${id}`)
    // return response.data

    // MOCK: Fallback
    const employee = mockEmployees.find((item) => String(item.id) === String(id))
    if (!employee) throw new Error('Employee not found')
    return { ...employee }
  } catch (error) {
    console.warn('Failed to fetch employee, using mock:', error.message)
    const employee = mockEmployees.find((item) => String(item.id) === String(id))
    if (!employee) throw new Error('Employee not found')
    return { ...employee }
  }
}

/**
 * POST /employees → Add new employee
 * Request: Employee object
 * Response: Created employee with ID
 */
export const addEmployee = async (data) => {
  try {
    // REAL: Uncomment when backend is ready
    // const response = await apiClient.post('/employees', data)
    // return response.data

    // MOCK: Fallback
    const newEmployee = {
      ...data,
      id: Date.now(),
      department: data.department || 'Engineering',
    }
    mockEmployees = [newEmployee, ...mockEmployees]
    return newEmployee
  } catch (error) {
    console.warn('Failed to add employee, using mock:', error.message)
    const newEmployee = {
      ...data,
      id: Date.now(),
      department: data.department || 'Engineering',
    }
    mockEmployees = [newEmployee, ...mockEmployees]
    return newEmployee
  }
}

/**
 * PUT /employees/:id → Update employee
 * Request: Updated employee data
 * Response: Updated employee object
 */
export const updateEmployee = async (id, data) => {
  try {
    // REAL: Uncomment when backend is ready
    // const response = await apiClient.put(`/employees/${id}`, data)
    // return response.data

    // MOCK: Fallback
    let updatedEmployee = null
    mockEmployees = mockEmployees.map((item) => {
      if (String(item.id) === String(id)) {
        updatedEmployee = { ...item, ...data }
        return updatedEmployee
      }
      return item
    })

    if (!updatedEmployee) throw new Error('Employee not found')
    return updatedEmployee
  } catch (error) {
    console.warn('Failed to update employee, using mock:', error.message)
    let updatedEmployee = null
    mockEmployees = mockEmployees.map((item) => {
      if (String(item.id) === String(id)) {
        updatedEmployee = { ...item, ...data }
        return updatedEmployee
      }
      return item
    })
    if (!updatedEmployee) throw new Error('Employee not found')
    return updatedEmployee
  }
}

/**
 * DELETE /employees/:id → Delete employee
 * Response: { success: true }
 */
export const deleteEmployee = async (id) => {
  try {
    // REAL: Uncomment when backend is ready
    // const response = await apiClient.delete(`/employees/${id}`)
    // return response.data

    // MOCK: Fallback
    mockEmployees = mockEmployees.filter((item) => String(item.id) !== String(id))
    return { success: true }
  } catch (error) {
    console.warn('Failed to delete employee, using mock:', error.message)
    mockEmployees = mockEmployees.filter((item) => String(item.id) !== String(id))
    return { success: true }
  }
}
