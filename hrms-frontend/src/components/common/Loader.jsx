export default function Loader({ fullPage = false }) {
  const content = (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#00509d]" />
      Loading workspace data...
    </div>
  )

  if (fullPage) {
    return <div className="broker-grid flex min-h-screen items-center justify-center">{content}</div>
  }

  return <div className="flex items-center justify-center py-8">{content}</div>
}
