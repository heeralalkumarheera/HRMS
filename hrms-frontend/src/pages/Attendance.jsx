import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import * as attendanceService from '../services/attendanceService'

const days = Array.from({ length: 31 }, (_, index) => index + 1)

export default function Attendance() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedShift, setSelectedShift] = useState('General')
  const [location, setLocation] = useState('Surat HQ')
  const [overtimeHours, setOvertimeHours] = useState('0')
  const [punchInAt, setPunchInAt] = useState('09:30')
  const [punchOutAt, setPunchOutAt] = useState('18:45')
  const [geoEnabled, setGeoEnabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleMarkAttendance = async () => {
    if (!selectedDate) {
      toast.error('Please select a date first')
      return
    }

    const date = new Date()
    date.setDate(selectedDate)

    setLoading(true)
    try {
      await attendanceService.markAttendance(date.toISOString(), location)
      toast.success('Attendance marked')
      navigate('/marked-attendance', {
        state: {
          date: date.toDateString(),
          location,
        },
      })
    } catch (error) {
      toast.error(error.message || 'Unable to mark attendance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h1 className="page-title">Mark Monthly Attendance</h1>
      <p className="page-subtitle mt-2">Capture advisor field presence for monthly operations reporting.</p>

      <div className="mt-5 grid gap-4 rounded-xl border border-slate-200 bg-white/70 p-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Shift</label>
          <select
            value={selectedShift}
            onChange={(event) => setSelectedShift(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#1d70b8] focus:ring-4 focus:ring-[#1d70b8]/15"
          >
            <option>General</option>
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>

        <Input
          label="Work Location / Geofence"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Surat HQ"
        />

        <Input
          label="Overtime Hours"
          value={overtimeHours}
          onChange={(event) => setOvertimeHours(event.target.value)}
          placeholder="0"
        />

        <Input
          label="Punch In"
          type="time"
          value={punchInAt}
          onChange={(event) => setPunchInAt(event.target.value)}
        />

        <Input
          label="Punch Out"
          type="time"
          value={punchOutAt}
          onChange={(event) => setPunchOutAt(event.target.value)}
        />

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Geofencing</p>
          <button
            type="button"
            onClick={() => setGeoEnabled((prev) => !prev)}
            className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${geoEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
          >
            {geoEnabled ? 'Enabled' : 'Disabled'}
          </button>
          <p className="mt-2 text-xs text-slate-500">Device API integration will connect to GPS/Maps from backend.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDate(day)}
            className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${selectedDate === day ? 'border-[#00509d] bg-gradient-to-r from-[#00509d] to-[#1d70b8] text-white shadow-md shadow-[#1d70b8]/25' : 'border-slate-200 bg-white/90 text-slate-700 hover:bg-[#edf5ff]'}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button onClick={handleMarkAttendance} loading={loading}>Mark Attendance</Button>
        {selectedDate ? <p className="text-sm text-slate-500">Selected day: {selectedDate}</p> : null}
        <p className="text-sm text-slate-500">Shift: {selectedShift} • {punchInAt}-{punchOutAt}</p>
      </div>
    </Card>
  )
}
