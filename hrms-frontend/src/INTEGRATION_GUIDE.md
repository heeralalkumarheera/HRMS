/**
 * INTEGRATION GUIDE: Swap Mock → Real API
 * 
 * Current state: All services use mock data with fake delays
 * Next state: Replace with real API calls to backend
 * 
 * Backend Base URL: https://hrms-6639.onrender.com/api
 * 
 * ENDPOINTS TO IMPLEMENT (from Postman):
 * 
 * 1. AUTH ENDPOINTS:
 *    - POST /auth/login → { email, password }
 *    - POST /auth/refresh → refresh token
 *    - POST /auth/logout → logout
 * 
 * 2. TODO: Get full endpoint list from backend team:
 *    - GET /employees → list all employees
 *    - POST /employees → add employee
 *    - GET /employees/:id → get employee details
 *    - PUT /employees/:id → update employee
 *    - DELETE /employees/:id → delete employee
 *    - GET /dashboard/stats → dashboard stats
 *    - GET /attendance → get attendance records
 *    - POST /attendance → mark attendance
 *    - GET /events → list events
 *    - POST /events → add event
 */

// STEPS TO SWAP MOCK → REAL:
// 
// 1. Update src/services/authService.js:
//    Remove hardcoded users array
//    Replace login() with apiClient.post('/auth/login')
//    
// 2. Update src/services/employeeService.js:
//    Replace getEmployees() with apiClient.get('/employees')
//    Replace addEmployee() with apiClient.post('/employees')
//    And so on...
//
// 3. Update src/services/dashboardService.js:
//    Replace getStats() with apiClient.get('/dashboard/stats')
//    
// 4. Update src/services/attendanceService.js:
//    Replace markAttendance() with apiClient.post('/attendance')
//    
// 5. Update src/services/eventService.js:
//    Replace getEvents() with apiClient.get('/events')

export const INTEGRATION_STATUS = {
  auth: 'READY_FOR_SWAP',
  employees: 'AWAITING_ENDPOINTS',
  dashboard: 'AWAITING_ENDPOINTS',
  attendance: 'AWAITING_ENDPOINTS',
  events: 'AWAITING_ENDPOINTS',
}
