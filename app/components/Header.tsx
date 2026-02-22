export default function Header({ stickyUntil = '70vh' }) {
  return (
    <div style={{ height: stickyUntil }}>
      <div className="sticky top-0 w-full z-50 flex items-center px-6 max-w-7xl 2xl:max-w-350 mx-auto will-change-transform">
        <header className="flex-1 bg-white/10 backdrop-blur-md rounded-b-3xl shadow-[0_0_80px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)]">
          <nav className="flex items-center justify-around px-6 py-3">
            <a href="#" className="text-white font-impact text-3xl tracking-wide uppercase">PROJECTS</a>
            <a href="#" className="text-white font-impact text-3xl tracking-wide uppercase">GALLERY</a>
            <a href="#" className="text-white font-impact text-3xl tracking-wide uppercase">OFFERS</a>
            <a href="#" className="text-white font-impact text-3xl tracking-wide uppercase">ABOUT ME</a>
          </nav>
        </header>
      </div>
    </div>
  )
}
