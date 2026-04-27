import { useState } from 'react'
import toast from 'react-hot-toast'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

const payslips = [
  { month: 'March 2026', amount: 52600, status: 'Generated' },
  { month: 'February 2026', amount: 52100, status: 'Generated' },
  { month: 'January 2026', amount: 51950, status: 'Generated' },
]

export default function SelfService() {
  const [profile, setProfile] = useState({
    fullName: 'Riya Sharma',
    email: 'riya@techstile.com',
    phone: '9876543210',
    emergencyContact: '9123456780',
  })

  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Casual Leave',
    date: '',
    reason: '',
  })

  const updateProfile = () => {
    toast.success('Profile details saved')
  }

  const sendLeaveRequest = () => {
    if (!leaveForm.date || !leaveForm.reason) {
      toast.error('Please fill leave details')
      return
    }
    toast.success('Leave request sent to reporting manager')
    setLeaveForm({ leaveType: 'Casual Leave', date: '', reason: '' })
  }

  const downloadPayslip = (month) => {
    const content = `Payslip,${month},Generated At,${new Date().toISOString()}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${month.toLowerCase().replace(/\s+/g, '-')}-payslip.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="page-title">Employee Self-Service Portal</h1>
        <p className="page-subtitle mt-2">Update your profile, raise leave requests, view attendance and download payslips.</p>
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">My Profile</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Input
              label="Full Name"
              value={profile.fullName}
              onChange={(event) => setProfile((prev) => ({ ...prev, fullName: event.target.value }))}
            />
            <Input
              label="Email"
              value={profile.email}
              onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
            />
            <Input
              label="Phone"
              value={profile.phone}
              onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
            />
            <Input
              label="Emergency Contact"
              value={profile.emergencyContact}
              onChange={(event) => setProfile((prev) => ({ ...prev, emergencyContact: event.target.value }))}
            />
          </div>
          <Button className="mt-4" onClick={updateProfile}>Save Profile</Button>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Quick Leave Request</h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Leave Type</label>
              <select
                value={leaveForm.leaveType}
                onChange={(event) => setLeaveForm((prev) => ({ ...prev, leaveType: event.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#1d70b8] focus:ring-4 focus:ring-[#1d70b8]/15"
              >
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
                <option>Work From Home</option>
              </select>
            </div>
            <Input
              type="date"
              label="Date"
              value={leaveForm.date}
              onChange={(event) => setLeaveForm((prev) => ({ ...prev, date: event.target.value }))}
            />
            <Input
              label="Reason"
              value={leaveForm.reason}
              onChange={(event) => setLeaveForm((prev) => ({ ...prev, reason: event.target.value }))}
              placeholder="Family function"
            />
            <Button onClick={sendLeaveRequest}>Submit Request</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Attendance Snapshot</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Present Days</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">21</p>
            </div>
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Late Marks</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
            </div>
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Overtime Hours</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">6.5</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Payslip Downloads</h2>
          <div className="mt-4 space-y-2">
            {payslips.map((item) => (
              <div key={item.month} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white/80 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.month}</p>
                  <p className="text-xs text-slate-500">INR {item.amount.toLocaleString('en-IN')} • {item.status}</p>
                </div>
                <Button variant="outline" onClick={() => downloadPayslip(item.month)}>Download</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
