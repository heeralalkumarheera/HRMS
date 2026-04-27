import Card from '../components/common/Card'

const modules = [
  {
    id: 1,
    name: 'Employee Database Management',
    status: 'partial',
    notes: 'Profiles, search and CRUD are ready. Bulk import, audit trail and full document lifecycle need backend wiring.',
  },
  {
    id: 2,
    name: 'Time Tracking',
    status: 'partial',
    notes: 'Attendance page is live with web mark flow. Biometric APIs, geofence validation and shift engines are pending backend.',
  },
  {
    id: 3,
    name: 'Leave Management',
    status: 'implemented',
    notes: 'Dynamic leave application, planner and approval board now available in HR Suite.',
  },
  {
    id: 4,
    name: 'Payroll Management',
    status: 'implemented',
    notes: 'Frontend payroll workspace, salary breakdown cards and payslip table are ready for API mapping.',
  },
  {
    id: 5,
    name: 'Benefits Administration',
    status: 'implemented',
    notes: 'Benefit enrollment and summary cards are present in HR Suite.',
  },
  {
    id: 6,
    name: 'Recruitment Management',
    status: 'implemented',
    notes: 'Job pipeline board and candidate shortlist interactions are ready in frontend.',
  },
  {
    id: 7,
    name: 'Onboarding and Offboarding',
    status: 'implemented',
    notes: 'Checklist-driven onboarding and offboarding action panel are available in HR Suite.',
  },
  {
    id: 8,
    name: 'Performance Management',
    status: 'implemented',
    notes: 'Goals, KPI scores and appraisal actions are now rendered in dynamic UI blocks.',
  },
  {
    id: 9,
    name: 'Compliance Management',
    status: 'implemented',
    notes: 'Compliance deadlines, status board and alert chips are present in frontend.',
  },
  {
    id: 10,
    name: 'Expense Management',
    status: 'implemented',
    notes: 'Expense submission, category tracking and reimbursement board now included.',
  },
  {
    id: 11,
    name: 'Document Management',
    status: 'implemented',
    notes: 'Secure repository style listing, versions and expiry signals are in HR Suite.',
  },
  {
    id: 12,
    name: 'Employee Self-Service Portal',
    status: 'implemented',
    notes: 'Dedicated self-service page includes profile updates, payslips and attendance widgets.',
  },
  {
    id: 13,
    name: 'HR Analytics and Reporting',
    status: 'implemented',
    notes: 'Analytics widgets plus export-friendly report grid are available in frontend.',
  },
  {
    id: 14,
    name: 'Succession Planning',
    status: 'implemented',
    notes: 'Critical role readiness and successor plan cards are integrated in HR Suite.',
  },
  {
    id: 15,
    name: 'Data Security',
    status: 'partial',
    notes: 'Frontend contains security center and session views. Real encryption and 2FA enforcement require backend.',
  },
  {
    id: 16,
    name: 'Third-Party Integrations',
    status: 'implemented',
    notes: 'Integration catalog and API endpoint console UI are available for future connector hooks.',
  },
  {
    id: 17,
    name: 'Mobile Access',
    status: 'partial',
    notes: 'Responsive web coverage has been enhanced. Dedicated native app will be separate project phase.',
  },
  {
    id: 18,
    name: 'Customization',
    status: 'implemented',
    notes: 'Admin-facing dynamic form configuration panel is available in HR Suite.',
  },
  {
    id: 19,
    name: 'Super Configurability',
    status: 'implemented',
    notes: 'No-code styled workflow builder and configurable fields are available in frontend.',
  },
  {
    id: 20,
    name: 'Scalability',
    status: 'partial',
    notes: 'Frontend layout and module architecture are scale-ready. Cloud auto-scaling depends on deployment/backend.',
  },
]

const statusStyles = {
  implemented: 'bg-emerald-100 text-emerald-700',
  partial: 'bg-amber-100 text-amber-700',
  missing: 'bg-rose-100 text-rose-700',
}

export default function RequirementAudit() {
  const implementedCount = modules.filter((item) => item.status === 'implemented').length
  const partialCount = modules.filter((item) => item.status === 'partial').length
  const missingCount = modules.filter((item) => item.status === 'missing').length
  const completion = Math.round(((implementedCount + partialCount * 0.5) / modules.length) * 100)

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="page-title">Intact HRMS Requirement Audit</h1>
        <p className="page-subtitle mt-2">Frontend verification matrix against the 20-module company requirement report.</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="data-tile">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Implemented</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{implementedCount}</p>
          </div>
          <div className="data-tile">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Partial</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{partialCount}</p>
          </div>
          <div className="data-tile">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Missing</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{missingCount}</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Frontend Completion Score</span>
            <span className="font-semibold text-slate-700">{completion}%</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-slate-200">
            <div className="h-3 rounded-full bg-gradient-to-r from-[#2a9d8f] to-[#00509d]" style={{ width: `${completion}%` }} />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Module-by-Module Verification</h2>
        <div className="mt-4 space-y-3">
          {modules.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">{item.id}. {item.name}</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.notes}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
