import Image from "next/image";

export default function Header({ stickyUntil = "70vh" }) {
  return (
    <>
      {/* Logo — fixed, always visible in the top-left corner, overlays on top */}
      <a href="#" className="fixed top-1 2xl:left-16 xl:left-4 z-[100]">
        <Image
          src="/Logothelogofinal.png"
          alt="Logo"
          width={320}
          height={120}
          className="w-22 h-auto drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          priority
        />
      </a>

      {/* Header with sticky nav — full width, logo overlaps it */}
      <div style={{ height: stickyUntil }}>
        <div className="sticky top-0 w-full z-50 flex items-center px-6 max-w-7xl 2xl:max-w-350 mx-auto will-change-transform">
          <header className="flex-1 bg-white/10 backdrop-blur-md rounded-b-3xl shadow-[0_0_80px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)]">
            <nav className="flex items-center justify-around px-6 py-4">
              <a
                href="#"
                className="text-white font-impact text-3xl tracking-wide uppercase"
              >
                PROJECTS
              </a>
              <a
                href="#"
                className="text-white font-impact text-3xl tracking-wide uppercase"
              >
                GALLERY
              </a>
              <a
                href="#"
                className="text-white font-impact text-3xl tracking-wide uppercase"
              >
                OFFERS
              </a>
              <a
                href="#"
                className="text-white font-impact text-3xl tracking-wide uppercase"
              >
                ABOUT ME
              </a>
            </nav>
          </header>
        </div>
      </div>
    </>
  );
}
