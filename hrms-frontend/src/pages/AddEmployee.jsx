import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import * as employeeService from '../services/employeeService'
import { ROLES } from '../utils/constants'

const initialForm = {
  imageUrl: '',
  name: '',
  email: '',
  password: '',
  role: '',
  phone: '',
  joiningDate: '',
}

export default function AddEmployee() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
  }, [preview])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)
    setForm((prev) => ({ ...prev, imageUrl }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await employeeService.addEmployee(form)
      toast.success('Employee added successfully')
      navigate('/employees')
    } catch (error) {
      toast.error(error.message || 'Failed to add employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h1 className="page-title">Add Policy Advisor</h1>
      <p className="page-subtitle mt-2">Create a complete advisor profile and onboarding details.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Image Upload *</label>
          <input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-slate-600" required />
          {preview ? <img src={preview} alt="Preview" className="mt-3 h-20 w-20 rounded-lg object-cover" /> : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Name" name="name" value={form.name} onChange={onChange} required />
          <Input label="Email" type="email" name="email" value={form.email} onChange={onChange} required />
          <Input label="Password" type="password" name="password" value={form.password} onChange={onChange} required />

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Role <span className="text-rose-500">*</span></label>
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-techstile-accent"
              required
            >
              <option value="">Select role</option>
              <option value={ROLES.FRONTEND}>{ROLES.FRONTEND}</option>
              <option value={ROLES.BACKEND}>{ROLES.BACKEND}</option>
              <option value={ROLES.UI_UX}>{ROLES.UI_UX}</option>
              <option value={ROLES.FULL_STACK}>{ROLES.FULL_STACK}</option>
            </select>
          </div>

          <Input label="Phone Number" name="phone" value={form.phone} onChange={onChange} required />
          <Input label="Joining Date" type="date" name="joiningDate" value={form.joiningDate} onChange={onChange} required />
        </div>

        <Button type="submit" loading={loading}>Save Employee</Button>
      </form>
    </Card>
  )
}
