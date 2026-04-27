import Button from './Button'

export default function Modal({ isOpen, onClose, title, children, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001d3d]/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/70 bg-white/95 p-5 shadow-xl shadow-slate-900/20">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100">
            X
          </button>
        </div>
        <div>{children}</div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  )
}
