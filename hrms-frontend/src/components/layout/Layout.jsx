import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f8ff] via-[#e6f2ff] to-[#f0f8ff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_40%)]" />
      <Sidebar />
      <main className="relative min-h-screen p-4 md:p-6 lg:ml-72 lg:p-8">
        <Navbar />
        <div className="fade-up mt-6">{children}</div>
      </main>
    </div>
  )
}
