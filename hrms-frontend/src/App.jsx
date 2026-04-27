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

const AppShell = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
)

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
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<AppShell><Dashboard /></AppShell>} />
          <Route path="/employees" element={<AppShell><EmployeeList /></AppShell>} />
          <Route path="/add-employee" element={<AppShell><AddEmployee /></AppShell>} />
          <Route path="/employee/:id" element={<AppShell><EmployeeView /></AppShell>} />
          <Route path="/attendance" element={<AppShell><Attendance /></AppShell>} />
          <Route path="/events" element={<AppShell><Events /></AppShell>} />
          <Route path="/hr-suite" element={<AppShell><HRSuite /></AppShell>} />
          <Route path="/self-service" element={<AppShell><SelfService /></AppShell>} />
          <Route path="/requirement-audit" element={<AppShell><RequirementAudit /></AppShell>} />
          <Route path="/marked-attendance" element={<ProtectedRoute><MarkedAttendance /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App