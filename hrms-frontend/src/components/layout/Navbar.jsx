import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { useAuth } from '../../hooks/useAuth'
import { getRoleLabel } from '../../utils/auth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="rounded-2xl border border-blue-100/50 bg-white/90 px-5 py-4 backdrop-blur-lg shadow-sm md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-blue-600">Broker Command Center</p>
          <h2 className="text-base font-semibold text-slate-900 md:text-lg">
            {user?.name || 'User'}
            <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">{getRoleLabel(user?.role)}</span>
          </h2>
          <p className="mt-1 text-xs text-slate-600">{today}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  )
}
