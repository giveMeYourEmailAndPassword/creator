export default function Footer({ stickyUntil = '40vh' }) {
  return (
    <div>
      <div style={{ height: stickyUntil }} />
      <div className="sticky bottom-0 w-full z-50 flex items-center px-6 max-w-7xl 2xl:max-w-350 mx-auto will-change-transform">
        <footer className="flex-1 bg-white/10 backdrop-blur-md rounded-t-3xl shadow-[0_0_80px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)]">
          <nav className="flex items-center justify-around px-6 py-3 text-white font-impact text-lg tracking-wide uppercase">
            <span>&copy; {new Date().getFullYear()} All rights reserved</span>
            <a href="mailto:Marikadraw@gmail.com" className="hover:text-white/70 transition-colors">
              Marikadraw@gmail.com
            </a>
            <span>Powered by SOMETHING</span>
          </nav>
        </footer>
      </div>
    </div>
  )
}
