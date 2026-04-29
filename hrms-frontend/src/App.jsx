import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import EmployeeList from './pages/EmployeeList'
import AddEmployee from './pages/AddEmployee'
import EmployeeView from './pages/EmployeeView'
import Attendance from './pages/Attendance'
import MarkedAttendance from './pages/MarkedAttendance'
import Events from './pages/Events'
import Login from './pages/Login'
import HRSuite from './pages/HRSuite'
import SelfService from './pages/SelfService'
import RequirementAudit from './pages/RequirementAudit'
import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import Loader from './components/common/Loader'
import { useAuth } from './hooks/useAuth'
import { AUTH_ROLES } from './utils/constants'
import { getRoleHomePath } from './utils/auth'

const AppShell = ({ children, allowedRoles }) => (
  <ProtectedRoute allowedRoles={allowedRoles}>
    <Layout>{children}</Layout>
  </ProtectedRoute>
)

function LoginRedirect() {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return <Loader fullPage />
  }

  if (isAuthenticated) {
    return <Navigate to={getRoleHomePath(user?.role)} replace />
  }

  return <Login />
}

function HomeRedirect() {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return <Loader fullPage />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={getRoleHomePath(user?.role)} replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '14px',
              border: '1px solid #d9e2ec',
              background: '#ffffff',
              color: '#102a43',
              fontWeight: 600,
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginRedirect />} />

          <Route path="/dashboard" element={<HomeRedirect />} />
          <Route path="/admin/dashboard" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN]}><Dashboard /></AppShell>} />
          <Route path="/hr/dashboard" element={<AppShell allowedRoles={[AUTH_ROLES.HR]}><HRSuite /></AppShell>} />
          <Route path="/manager/dashboard" element={<AppShell allowedRoles={[AUTH_ROLES.MANAGER]}><RequirementAudit /></AppShell>} />
          <Route path="/employee/dashboard" element={<AppShell allowedRoles={[AUTH_ROLES.EMPLOYEE]}><SelfService /></AppShell>} />

          <Route path="/employees" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN, AUTH_ROLES.HR, AUTH_ROLES.MANAGER]}><EmployeeList /></AppShell>} />
          <Route path="/add-employee" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN, AUTH_ROLES.HR]}><AddEmployee /></AppShell>} />
          <Route path="/employee/:id" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN, AUTH_ROLES.HR, AUTH_ROLES.MANAGER]}><EmployeeView /></AppShell>} />
          <Route path="/attendance" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN, AUTH_ROLES.HR, AUTH_ROLES.EMPLOYEE]}><Attendance /></AppShell>} />
          <Route path="/events" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN, AUTH_ROLES.HR, AUTH_ROLES.MANAGER]}><Events /></AppShell>} />
          <Route path="/hr-suite" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN, AUTH_ROLES.HR]}><HRSuite /></AppShell>} />
          <Route path="/self-service" element={<AppShell allowedRoles={[AUTH_ROLES.EMPLOYEE]}><SelfService /></AppShell>} />
          <Route path="/requirement-audit" element={<AppShell allowedRoles={[AUTH_ROLES.ADMIN, AUTH_ROLES.HR, AUTH_ROLES.MANAGER]}><RequirementAudit /></AppShell>} />
          <Route path="/marked-attendance" element={<AppShell allowedRoles={[AUTH_ROLES.EMPLOYEE]}><MarkedAttendance /></AppShell>} />

          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App