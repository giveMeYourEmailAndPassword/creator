"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Container from "./components/Container";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import EmblaCarousel from "./components/EmblaCarousel";
import Image from "next/image";

export default function Home() {
  const [dimOpacity, setDimOpacity] = useState(0);
  const [bgOffset, setBgOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const start = 0;
      const end = 600;
      const progress = Math.min(
        Math.max((window.scrollY - start) / (end - start), 0),
        1,
      );
      setDimOpacity(progress * 0.5);
      // Subtle parallax: scroll down → bg moves down, scroll up → bg moves up
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setBgOffset(Math.min(scrollFraction * 40, 22));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Parallax background */}
      <div
        className="fixed inset-0 z-[-1] will-change-transform"
        style={{
          backgroundImage: "url('/bg-orig.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `translateY(-${bgOffset}px) scale(1.05)`,
        }}
      />
      <div
        className="fixed inset-0 bg-black pointer-events-none z-0 transition-opacity duration-0"
        style={{ opacity: dimOpacity }}
      />
      <Header />

      <Container pt="pt-20">
        <div className="py-14 px-10 bg-white/10 rounded-3xl backdrop-blur-md shadow-[0_0_100px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)]">
          <h1 className="text-5xl">VISUAL DEVELOPMENT</h1>
          <Image
            src="/container/photo_1_2026-02-22_13-37-45.jpg"
            alt="Visual Development"
            width={400}
            height={300}
          />
        </div>
      </Container>

      <Container pt="pt-80">
        <div className="py-14 px-10 bg-white/10 rounded-3xl backdrop-blur-md shadow-[0_0_100px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)]">
          <h1 className="text-5xl">ILLUSTRATION</h1>
          <Image
            src="/container/photo_2_2026-02-22_13-37-45.jpg"
            alt="Visual Development"
            width={400}
            height={300}
          />
        </div>
      </Container>

      <Container pt="pt-80">
        <div className="py-14 px-10 bg-white/10 rounded-3xl backdrop-blur-md shadow-[0_0_100px_4px_rgba(255,255,255,0.3),inset_0_0_30px_2px_rgba(255,255,255,0.2)] mb-20">
          <EmblaCarousel />
        </div>
      </Container>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
