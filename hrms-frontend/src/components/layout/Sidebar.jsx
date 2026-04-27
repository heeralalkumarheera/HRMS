import { NavLink, useNavigate } from 'react-router-dom'
import {
  Squares2X2Icon,
  HomeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
  ArrowRightOnRectangleIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'

const menuItems = [
  { path: '/dashboard', name: 'Overview', icon: Squares2X2Icon },
  { path: '/employees', name: 'Policy Advisors', icon: UsersIcon },
  { path: '/add-employee', name: 'Add Advisor', icon: ClipboardDocumentListIcon },
  { path: '/events', name: 'Calendar', icon: CalendarIcon },
  { path: '/attendance', name: 'Field Presence', icon: ClockIcon },
  { path: '/self-service', name: 'Self Service', icon: UserCircleIcon },
  { path: '/hr-suite', name: 'HR Suite', icon: PresentationChartLineIcon },
  { path: '/requirement-audit', name: 'Requirement Audit', icon: ShieldCheckIcon },
  { path: '/marked-attendance', name: 'Attendance Status', icon: HomeIcon },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden min-h-screen w-72 border-r border-blue-100/60 bg-gradient-to-b from-[#f7fcff] via-[#f0f9ff] to-[#f8fdff] p-3 text-slate-800 shadow-[10px_0_22px_rgba(59,130,246,0.03)] lg:block">
      <div className="flex h-full flex-col rounded-[1.35rem] border border-white/70 bg-white/60 p-3 backdrop-blur-xl">
        <div className="mb-4 rounded-2xl border border-blue-100 bg-white/85 p-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 text-sky-600">
              <BuildingOffice2Icon className="h-5.5 w-5.5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-slate-900">Techstile Brokers</h1>
              <p className="text-xs text-slate-500">Insurance Operations Workspace</p>
            </div>
          </div>
        </div>

        <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Navigation</p>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'border border-blue-100 bg-white/90 text-slate-900 shadow-[0_6px_16px_rgba(59,130,246,0.08)]'
                    : 'border border-transparent text-slate-700 hover:border-blue-50 hover:bg-white/80 hover:text-slate-900'
                }`
              }
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-100">
                <item.icon className="h-4.5 w-4.5 transition group-hover:scale-105" />
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2.5 pt-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-blue-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 transition hover:from-sky-100 hover:to-blue-100"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
              <ArrowRightOnRectangleIcon className="h-4.5 w-4.5" />
            </span>
            <span>Logout</span>
          </button>

          <div className="rounded-2xl border border-blue-100 bg-white/85 p-3 text-xs text-slate-600 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.16em] text-sky-600">Active Mode</p>
            <p className="mt-1 text-sm font-medium text-slate-800">Client-ready UI and backend-friendly flow.</p>
            <div className="mt-2.5 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
