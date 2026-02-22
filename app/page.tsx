"use client"

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Container from './components/Container'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function Home() {
  const [dimOpacity, setDimOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const start = 0
      const end = 600
      const progress = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1)
      setDimOpacity(progress * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed w-full relative"
      style={{ backgroundImage: "url('/bg-orig-2.png')" }}
    >
      <div
        className="fixed inset-0 bg-black pointer-events-none z-0 transition-opacity duration-0"
        style={{ opacity: dimOpacity }}
      />
      <Header />

      <Container pt="pt-20">
        <div className="py-14 px-10 bg-white/10 rounded-3xl backdrop-blur-md shadow-[0_0_100px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)]">
          <h1 className="text-5xl">VISUAL DEVELOPMENT</h1>
        </div>
      </Container>

      <Container pt="pt-80">
        <div className="py-14 px-10 bg-white/10 rounded-3xl backdrop-blur-md shadow-[0_0_100px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)]">
          <h1 className="text-5xl">ILLUSTRATION</h1>
        </div>
      </Container>

      <Container pt="pt-80">
        <div className="py-14 px-10 bg-white/10 rounded-3xl backdrop-blur-md shadow-[0_0_100px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)] mb-20">
          asdasd
        </div>
      </Container>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
