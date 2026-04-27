import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

const tabs = [
  'Leave',
  'Payroll',
  'Recruitment',
  'Performance',
  'Compliance',
  'Expenses',
  'Configurator',
  'Security',
]

const initialLeaveForm = {
  leaveType: 'Sick Leave',
  fromDate: '',
  toDate: '',
  reason: '',
}

const leaveRecords = [
  { id: 1, employee: 'Riya Sharma', type: 'Sick Leave', from: '2026-04-10', to: '2026-04-11', status: 'Approved' },
  { id: 2, employee: 'Aman Verma', type: 'Casual Leave', from: '2026-04-17', to: '2026-04-17', status: 'Pending' },
]

const payrollRows = [
  { employee: 'Riya Sharma', basic: 32000, hra: 12800, allowance: 6000, deductions: 4100, net: 46700 },
  { employee: 'Aman Verma', basic: 36000, hra: 14400, allowance: 6800, deductions: 4650, net: 52550 },
]

const candidates = [
  { name: 'Sneha Patel', role: 'Claims Executive', stage: 'Interview Round 2' },
  { name: 'Karan Shah', role: 'Branch Sales Manager', stage: 'Offer Discussion' },
]

const goals = [
  { owner: 'Riya Sharma', goal: 'Renewal Conversion Rate', kpi: '78%', review: 'On Track' },
  { owner: 'Kabir Mehta', goal: 'Cross-Sell Ratio', kpi: '1.4', review: 'Needs Attention' },
]

const complianceItems = [
  { law: 'PF Filing', dueDate: '2026-05-15', status: 'Upcoming' },
  { law: 'ESI Filing', dueDate: '2026-05-21', status: 'On Track' },
  { law: 'Professional Tax Return', dueDate: '2026-05-28', status: 'Delayed' },
]

const expenseRows = [
  { employee: 'Priya Desai', category: 'Travel', amount: 1840, status: 'Approved' },
  { employee: 'Dev Shah', category: 'Client Meeting', amount: 2350, status: 'Pending' },
]

const integrations = [
  { name: 'Tally', status: 'Ready' },
  { name: 'QuickBooks', status: 'Ready' },
  { name: 'LinkedIn', status: 'Planned' },
  { name: 'MSG91 SMS', status: 'Ready' },
]

export default function HRSuite() {
  const [activeTab, setActiveTab] = useState('Leave')
  const [leaveForm, setLeaveForm] = useState(initialLeaveForm)
  const [workflowSteps, setWorkflowSteps] = useState(['Employee Request', 'Manager Approval', 'HR Validation', 'Final Closure'])
  const [dynamicFields, setDynamicFields] = useState(['Policy Type', 'Branch', 'Client Segment'])
  const [fieldInput, setFieldInput] = useState('')
  const [twoFactorRequired, setTwoFactorRequired] = useState(true)

  const monthlyPayroll = useMemo(() => payrollRows.reduce((sum, row) => sum + row.net, 0), [])

  const addDynamicField = () => {
    if (!fieldInput.trim()) return
    setDynamicFields((prev) => [...prev, fieldInput.trim()])
    setFieldInput('')
  }

  const addWorkflowStep = () => {
    setWorkflowSteps((prev) => [...prev, `Custom Step ${prev.length + 1}`])
  }

  const removeWorkflowStep = (index) => {
    setWorkflowSteps((prev) => prev.filter((_, i) => i !== index))
  }

  const submitLeave = () => {
    if (!leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason) {
      toast.error('Fill leave request details first')
      return
    }
    toast.success('Leave request sent for manager approval')
    setLeaveForm(initialLeaveForm)
  }

  const exportReport = (name) => {
    const content = `Report,${name},Generated At,${new Date().toISOString()}`
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-report.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="page-title">HR Suite Control Room</h1>
        <p className="page-subtitle mt-2">Frontend command center for leave, payroll, compliance, recruitment, configurability and security.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${activeTab === tab ? 'bg-[#00509d] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {activeTab === 'Leave' ? (
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Leave Management and Team Planner</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Leave Type</label>
                <select
                  value={leaveForm.leaveType}
                  onChange={(event) => setLeaveForm((prev) => ({ ...prev, leaveType: event.target.value }))}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#1d70b8] focus:ring-4 focus:ring-[#1d70b8]/15"
                >
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Earned Leave</option>
                  <option>Work From Home</option>
                </select>
              </div>
              <Input
                type="date"
                label="From Date"
                value={leaveForm.fromDate}
                onChange={(event) => setLeaveForm((prev) => ({ ...prev, fromDate: event.target.value }))}
              />
              <Input
                type="date"
                label="To Date"
                value={leaveForm.toDate}
                onChange={(event) => setLeaveForm((prev) => ({ ...prev, toDate: event.target.value }))}
              />
              <Input
                label="Reason"
                value={leaveForm.reason}
                onChange={(event) => setLeaveForm((prev) => ({ ...prev, reason: event.target.value }))}
                placeholder="Medical consultation"
              />
              <Button onClick={submitLeave}>Submit Leave Request</Button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/70 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Approval Board</h3>
              <div className="mt-3 space-y-2">
                {leaveRecords.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-3 text-sm">
                    <p className="font-semibold text-slate-900">{item.employee} • {item.type}</p>
                    <p className="text-slate-500">{item.from} to {item.to}</p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === 'Payroll' ? (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Payroll, Benefits and Tax Console</h2>
            <Button variant="outline" onClick={() => exportReport('Payroll')}>Export Payroll CSV</Button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Monthly Net Payroll</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">INR {monthlyPayroll.toLocaleString('en-IN')}</p>
            </div>
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">PF + ESI Deductions</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">INR 8,750</p>
            </div>
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Benefits Enrollment</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">89%</p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100/60 text-left text-xs uppercase tracking-[0.14em] text-slate-600">
                <tr>
                  <th className="px-4 py-2.5">Employee</th>
                  <th className="px-4 py-2.5">Basic</th>
                  <th className="px-4 py-2.5">HRA</th>
                  <th className="px-4 py-2.5">Allowance</th>
                  <th className="px-4 py-2.5">Deductions</th>
                  <th className="px-4 py-2.5">Net Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {payrollRows.map((row) => (
                  <tr key={row.employee}>
                    <td className="px-4 py-2.5 text-sm text-slate-700">{row.employee}</td>
                    <td className="px-4 py-2.5 text-sm text-slate-700">{row.basic}</td>
                    <td className="px-4 py-2.5 text-sm text-slate-700">{row.hra}</td>
                    <td className="px-4 py-2.5 text-sm text-slate-700">{row.allowance}</td>
                    <td className="px-4 py-2.5 text-sm text-slate-700">{row.deductions}</td>
                    <td className="px-4 py-2.5 text-sm font-semibold text-slate-900">{row.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {activeTab === 'Recruitment' ? (
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Recruitment, Onboarding and Offboarding</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Open Roles</h3>
              <p className="mt-3 text-sm text-slate-700">Claims Specialist</p>
              <p className="mt-1 text-sm text-slate-700">Branch Relationship Manager</p>
              <Button className="mt-3">Post New Job</Button>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Candidate Pipeline</h3>
              <div className="mt-3 space-y-2">
                {candidates.map((item) => (
                  <div key={item.name} className="rounded-lg bg-slate-50 p-2.5 text-sm">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-slate-500">{item.role}</p>
                    <p className="text-xs text-[#00509d]">{item.stage}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Onboarding Checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Document Upload</li>
                <li>Policy and Code of Conduct Acceptance</li>
                <li>System Access Provisioning</li>
                <li>First Week Manager Plan</li>
              </ul>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === 'Performance' ? (
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Performance, Appraisals and Succession</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">KPI Tracker</h3>
              <div className="mt-3 space-y-2">
                {goals.map((item) => (
                  <div key={item.owner} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <p className="font-semibold text-slate-900">{item.owner}</p>
                    <p className="text-slate-600">{item.goal}</p>
                    <p className="text-xs text-[#00509d]">KPI: {item.kpi} • {item.review}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Succession Bench</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>Critical Role: Branch Operations Head</p>
                <p>Primary Successor: Aman Verma (Readiness 82%)</p>
                <p>Development Plan: Leadership workshop, compliance certification, mentoring cycle.</p>
              </div>
              <Button className="mt-4" variant="secondary">Start Appraisal Cycle</Button>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === 'Compliance' ? (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Compliance and Document Repository</h2>
            <Button variant="outline" onClick={() => exportReport('Compliance')}>Export Compliance CSV</Button>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Statutory Deadlines</h3>
              <div className="mt-3 space-y-2">
                {complianceItems.map((item) => (
                  <div key={item.law} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <p className="font-semibold text-slate-900">{item.law}</p>
                    <p className="text-slate-600">Due: {item.dueDate}</p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${item.status === 'Delayed' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Document Vault</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>HR Policy Handbook v3.2</p>
                <p>Offer Letter Templates v1.8</p>
                <p>Medical Certificates (4 expiring this month)</p>
                <p>Compliance Audit Logs</p>
              </div>
              <Button className="mt-4">Upload Document</Button>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === 'Expenses' ? (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Expense and Integration Hub</h2>
            <Button variant="outline" onClick={() => exportReport('Expenses')}>Export Expense CSV</Button>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Reimbursement Queue</h3>
              <div className="mt-3 space-y-2">
                {expenseRows.map((item) => (
                  <div key={`${item.employee}-${item.category}`} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <p className="font-semibold text-slate-900">{item.employee}</p>
                    <p className="text-slate-600">{item.category} • INR {item.amount}</p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Integration Connectors</h3>
              <div className="mt-3 space-y-2">
                {integrations.map((item) => (
                  <div key={item.name} className="rounded-lg border border-slate-200 p-2.5 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">{item.name}</span> • {item.status}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === 'Configurator' ? (
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">No-Code Configurator</h2>
          <p className="mt-2 text-sm text-slate-500">Create form fields and approval workflows without writing code.</p>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Dynamic Fields</h3>
              <div className="mt-3 flex gap-2">
                <Input
                  placeholder="Add field name"
                  value={fieldInput}
                  onChange={(event) => setFieldInput(event.target.value)}
                />
                <Button onClick={addDynamicField}>Add</Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {dynamicFields.map((field) => (
                  <span key={field} className="rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-semibold text-[#00509d]">
                    {field}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Workflow Builder</h3>
                <Button variant="outline" onClick={addWorkflowStep}>Add Step</Button>
              </div>
              <div className="mt-3 space-y-2">
                {workflowSteps.map((step, index) => (
                  <div key={`${step}-${index}`} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <span>{index + 1}. {step}</span>
                    <button
                      type="button"
                      onClick={() => removeWorkflowStep(index)}
                      className="text-xs font-semibold text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === 'Security' ? (
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Security and Access Control</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Role-Based Access</p>
              <p className="mt-2 text-sm text-slate-700">Admin/HR, Manager, Employee</p>
            </div>
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">2FA Policy</p>
              <button
                type="button"
                onClick={() => setTwoFactorRequired((prev) => !prev)}
                className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${twoFactorRequired ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
              >
                {twoFactorRequired ? 'Enforced' : 'Optional'}
              </button>
            </div>
            <div className="data-tile">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Active Sessions</p>
              <p className="mt-2 text-sm text-slate-700">18 secure sessions</p>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  )
}
