export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  name,
  className = '',
  dark = false,
}) {
  return (
    <div>
      {label && (
        <label className={`mb-1 block text-sm font-medium ${dark ? 'text-white/80' : 'text-slate-700'}`}>
          {label}
          {required ? <span className={dark ? 'text-[#f97316]' : 'text-rose-500'}> *</span> : null}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-3.5 py-2.5 outline-none ring-0 transition duration-200 ${
          dark
            ? `bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:bg-white/15 focus:ring-4 focus:ring-[#6366f1]/30 ${
                error ? 'border-[#f97316]' : ''
              }`
            : `bg-white/90 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#1d70b8] focus:bg-white focus:ring-4 focus:ring-[#1d70b8]/15 ${
                error ? 'border-rose-400' : ''
              }`
        } ${className}`}
      />
      {error ? <p className={`mt-1 text-xs ${dark ? 'text-[#f97316]' : 'text-rose-600'}`}>{error}</p> : null}
    </div>
  )
}
