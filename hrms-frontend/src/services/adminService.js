import apiClient from './api'

const unwrap = (response) => response?.data ?? response

export const createHr = async (email) => unwrap(await apiClient.post('/create_employee/', { email, role: 'hr' }))

export const getUsers = async () => unwrap(await apiClient.get('/auth/users/'))

export const setPassword = async (userId, password) =>
  unwrap(await apiClient.post('/auth/admin/set-password/', { user_id: userId, password }))

export const listDepartments = async () => unwrap(await apiClient.get('/departments/'))

export const createDepartment = async (name) => unwrap(await apiClient.post('/departments/', { name }))

export const updateDepartment = async (id, data) => unwrap(await apiClient.put(`/departments/${id}/`, data))

export const patchDepartment = async (id, data) => unwrap(await apiClient.patch(`/departments/${id}/`, data))

export const deleteDepartment = async (id) => unwrap(await apiClient.delete(`/departments/${id}/`))

export const listDesignations = async () => unwrap(await apiClient.get('/designations/'))

export const createDesignation = async (data) => unwrap(await apiClient.post('/designations/', data))

export const updateDesignation = async (id, data) => unwrap(await apiClient.put(`/designations/${id}/`, data))

export const patchDesignation = async (id, data) => unwrap(await apiClient.patch(`/designations/${id}/`, data))

export const deleteDesignation = async (id) => unwrap(await apiClient.delete(`/designations/${id}/`))