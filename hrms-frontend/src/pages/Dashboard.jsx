import { useEffect, useState } from 'react'
import {
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Card from '../components/common/Card'
import Modal from '../components/common/Modal'
import Loader from '../components/common/Loader'
import * as dashboardService from '../services/dashboardService'

function AnimatedNumber({ value = 0, duration = 800 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let raf = null
    const start = performance.now()

    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setDisplay(Math.floor(t * value))
      if (t < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <span className="kpi-number">{display}</span>
}

export default function Dashboard() {
  const [stats, setStats] = useState([])
  const [proficiency, setProficiency] = useState(0)
  const [attendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDetail, setOpenDetail] = useState(null)
  const [roleSeries, setRoleSeries] = useState({})

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, proficiencyResponse, attendanceResponse] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getEnglishProficiency(),
          dashboardService.getAttendanceReport(),
        ])

        setStats(statsResponse)
        setProficiency(proficiencyResponse.percentage)
        setAttendanceData(attendanceResponse)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  useEffect(() => {
    const map = {}
    stats.forEach((s, i) => {
      map[s.role] = Array.from({ length: 8 }).map((_, k) =>
        Math.max(0, s.count + Math.round((Math.random() - 0.4) * (5 + i * 3))),
      )
    })
    setRoleSeries(map)
  }, [stats])

  if (loading) {
    return <Loader />
  }

  const accentColors = ['#00509d', '#1d70b8', '#2a9d8f', '#f77f00', '#7d8597']

  return (
    <section className="space-y-6">
      <div className="glass-panel p-5 md:p-6">
        <h1 className="page-title">Insurance Broker Operations Dashboard</h1>
        <p className="page-subtitle mt-2">Track advisor capacity, field attendance, and team delivery performance in real time.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item, index) => (
          <Card key={item.role} className="data-tile kpi-tile">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">{item.role}</p>
              <div className="w-9 h-9 rounded-lg bg-white/60 flex items-center justify-center shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v20" stroke="#1d70b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 12h14" stroke="#1d70b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <AnimatedNumber value={item.count} />
              <span className="text-sm text-slate-500">advisors</span>
            </div>

            <div className="mt-4 sparkline" aria-hidden onClick={() => setOpenDetail(item.role)}>
              {/* render mini bars from roleSeries */}
              <div className="flex items-end gap-1 h-8">
                {(roleSeries[item.role] || Array.from({ length: 8 })).map((v, idx) => (
                  <div key={idx} className="bg-gradient-to-t from-blue-600 to-blue-300 rounded-sm" style={{ width: 6, height: `${Math.max(6, (v / Math.max(1, item.count + 6)) * 100)}%` }} />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Client Communication Proficiency</h3>
                <p className="mt-2 text-sm text-slate-500">{proficiency}% of advisors are rated advanced for policy communication.</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Overall Score</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{proficiency}%</p>
              </div>
            </div>

            <div className="mt-4 h-3 rounded-full bg-slate-200">
              <div className="h-3 rounded-full bg-gradient-to-r from-[#2a9d8f] via-[#1d70b8] to-[#00509d]" style={{ width: `${proficiency}%` }} />
            </div>

            <div className="mt-4 quick-actions">
              <button className="btn-action">Message top advisors</button>
              <button className="btn-action">Schedule training</button>
              <button className="btn-action outline">Export report</button>
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Recent Activity</h3>
          <ul className="space-y-3">
            {[
              'Vikas submitted attendance from field',
              'New policy issued for client: Sharma',
              'Rohit updated KYC documents',
            ].map((act, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-slate-800 text-xs font-semibold">{i + 1}</div>
                <div>
                  <p className="text-sm text-slate-800">{act}</p>
                  <p className="text-xs text-slate-500">{new Date().toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      
      <Modal isOpen={!!openDetail} onClose={() => setOpenDetail(null)} title={openDetail ? `${openDetail} — Details` : ''} onConfirm={() => setOpenDetail(null)}>
        <div className="space-y-3">
          <p className="text-sm text-slate-700">This panel shows recent trends and quick actions for the selected role. Use this modal to message advisors, view roster, or export their activity.</p>
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-slate-800">Recent Trend</h4>
            <div className="mt-2 flex items-end gap-1 h-20">
              {(roleSeries[openDetail] || Array.from({ length: 8 })).map((v, i) => (
                <div key={i} style={{ width: 12, height: `${Math.max(8, (v / Math.max(1, (stats.find(s => s.role === openDetail)?.count || 10) + 6)) * 100)}%` }} className="bg-gradient-to-t from-sky-600 to-sky-300 rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Card>
        <h3 className="text-lg font-semibold text-slate-800">Client Communication Proficiency</h3>
        <div className="mt-3 h-3 rounded-full bg-slate-200">
          <div className="h-3 rounded-full bg-gradient-to-r from-[#2a9d8f] via-[#1d70b8] to-[#00509d]" style={{ width: `${proficiency}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate-500">{proficiency}% of advisors are rated advanced for policy communication.</p>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Last 6-Month Advisor Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData} barGap={6}>
            <CartesianGrid strokeDasharray="4 4" stroke="#d9e2ec" />
            <XAxis dataKey="month" stroke="#627d98" />
            <YAxis stroke="#627d98" />
            <Tooltip />
            <Bar dataKey="present" radius={[8, 8, 0, 0]} name="Present">
              {attendanceData.map((entry, index) => (
                <Cell key={`present-${entry.month}`} fill={accentColors[index % accentColors.length]} />
              ))}
            </Bar>
            <Bar dataKey="absent" fill="#f77f00" radius={[8, 8, 0, 0]} name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </section>
  )
}
