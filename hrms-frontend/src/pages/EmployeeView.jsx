import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import * as employeeService from '../services/employeeService'
import * as dashboardService from '../services/dashboardService'

export default function EmployeeView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [attendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeData, report] = await Promise.all([
          employeeService.getEmployeeById(id),
          dashboardService.getAttendanceReport(),
        ])
        setEmployee(employeeData)
        setAttendanceData(report)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <Loader />
  }

  if (!employee) {
    return <Card>Employee not found</Card>
  }

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={employee.imageUrl || 'https://via.placeholder.com/96'}
              alt={employee.name}
              className="h-24 w-24 rounded-2xl border border-white/80 object-cover shadow-sm"
            />
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="text-sm text-slate-500">{employee.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/employees')}>Back</Button>
            <Button onClick={() => navigate(`/add-employee?edit=${employee.id}`)}>Edit</Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <p><span className="font-semibold text-slate-700">Email:</span> {employee.email}</p>
          <p><span className="font-semibold text-slate-700">Phone:</span> {employee.phone}</p>
          <p><span className="font-semibold text-slate-700">Department:</span> {employee.department}</p>
          <p><span className="font-semibold text-slate-700">Joining Date:</span> {employee.joiningDate}</p>
          <p className="md:col-span-2"><span className="font-semibold text-slate-700">Address:</span> {employee.address}</p>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Attendance (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData} barGap={6}>
            <CartesianGrid strokeDasharray="4 4" stroke="#d9e2ec" />
            <XAxis dataKey="month" stroke="#627d98" />
            <YAxis stroke="#627d98" />
            <Tooltip />
            <Bar dataKey="present" fill="#1d70b8" radius={[8, 8, 0, 0]} name="Present" />
            <Bar dataKey="absent" fill="#f77f00" radius={[8, 8, 0, 0]} name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
