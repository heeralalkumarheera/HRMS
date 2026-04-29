import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/common/Loader'
import { getRoleHomePath, isAllowedRole } from '../utils/auth'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader fullPage />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!isAllowedRole(user?.role, allowedRoles)) {
    return <Navigate to={getRoleHomePath(user?.role)} replace />
  }

  return children
}
