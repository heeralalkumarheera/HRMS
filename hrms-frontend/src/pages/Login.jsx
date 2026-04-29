import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { APP_NAME } from '../utils/constants'
import { useAuth } from '../hooks/useAuth'
import { getRoleHomePath } from '../utils/auth'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const user = await login(form.email, form.password)
      toast.success('Login successful')
      navigate(getRoleHomePath(user?.role), { replace: true })
    } catch (error) {
      toast.error(error.message || 'Unable to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f3d] via-[#1a1055] to-[#0d0525]" />
      <div className="pointer-events-none absolute top-0 left-[10%] h-96 w-96 rounded-full bg-gradient-to-br from-[#6366f1]/40 to-[#ec4899]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[5%] h-80 w-80 rounded-full bg-gradient-to-tl from-[#06b6d4]/30 to-[#8b5cf6]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-[40%] right-[20%] h-72 w-72 rounded-full bg-gradient-to-bl from-[#f97316]/25 to-[#ec4899]/15 blur-2xl" />

      <div className="login-gradient-shell relative w-full max-w-lg">
        <div className="login-gradient-inner overflow-hidden">
          <div className="px-6 py-8 md:px-8 md:py-10">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white shadow-2xl shadow-[#6366f1]/50">
                <LockClosedIcon className="h-7 w-7" />
              </div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#a78bfa]">Secure Portal</p>
              <h1 className="mt-3 bg-gradient-to-r from-white via-[#e9d5ff] to-white bg-clip-text text-4xl font-bold text-transparent">{APP_NAME}</h1>
              <p className="mt-2 text-sm text-[#d0d5dd]">Access your modern HR management platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl p-4 shadow-2xl md:p-5">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={onChange}
                required
                dark={true}
              />

              <div>
                <label className="mb-1 block text-sm font-medium text-white/80">
                  Password <span className="text-[#f97316]">*</span>
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={onChange}
                    required
                    className="pr-10"
                    dark={true}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/20 text-[#6366f1] focus:ring-[#6366f1]/30" />
                  Remember this device
                </label>
                <button type="button" className="font-medium text-[#a78bfa] hover:text-white transition">
                  Need help?
                </button>
              </div>

              <Button type="submit" loading={loading} className="mt-2 w-full">
                Sign In Securely
              </Button>
            </form>

            <div className="mt-5 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-center text-xs text-white/70">
              Demo: admin@hrms.com / admin123
            </div>

            <p className="mt-4 text-center text-xs text-white/50">
              Enterprise-grade security with zero-trust architecture
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
