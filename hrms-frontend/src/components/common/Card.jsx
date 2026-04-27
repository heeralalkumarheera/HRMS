export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`glass-panel p-5 md:p-6 ${hover ? 'transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/10' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
