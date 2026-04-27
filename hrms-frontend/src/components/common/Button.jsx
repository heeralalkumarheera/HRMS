const variants = {
  primary: 'bg-gradient-to-r from-[#00509d] to-[#1d70b8] text-white shadow-md shadow-[#1d70b8]/30 hover:-translate-y-0.5 hover:brightness-105',
  secondary: 'bg-gradient-to-r from-[#2a9d8f] to-[#21867a] text-white shadow-md shadow-[#2a9d8f]/30 hover:-translate-y-0.5 hover:brightness-105',
  outline: 'border border-[#00509d]/25 bg-white text-[#00509d] hover:border-[#00509d]/50 hover:bg-[#edf5ff]',
}

export default function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {loading ? 'Please wait...' : children}
    </button>
  )
}
