import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { STORAGE_KEYS } from '../utils/constants'

export default function MarkedAttendance() {
  const navigate = useNavigate()
  const location = useLocation()

  const userRaw = localStorage.getItem(STORAGE_KEYS.user)
  const user = userRaw ? JSON.parse(userRaw) : null

  return (
    <div className="broker-grid flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CheckCircleIcon className="mx-auto h-14 w-14 text-[#2a9d8f]" />
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Your Attendance Is Marked</h1>

        <div className="mt-4 space-y-1 text-sm text-slate-600">
          <p><span className="font-medium text-slate-800">Email:</span> {user?.email || 'employee@techstile.com'}</p>
          <p><span className="font-medium text-slate-800">Location:</span> {location.state?.location || 'Surat'}</p>
          <p><span className="font-medium text-slate-800">Date:</span> {location.state?.date || new Date().toDateString()}</p>
        </div>

        <Button className="mt-6 w-full" onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </Card>
    </div>
  )
}
