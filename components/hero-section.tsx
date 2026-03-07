"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { companyInfo } from "@/lib/data"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[600px] items-end overflow-hidden"
    >
      {/* Full-bleed background video */}
      {/* suppressHydrationWarning: React SSR omits `muted` (it's a DOM property, not an HTML attribute) causing a benign server/client mismatch */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-printing.webp"
        aria-hidden="true"
        suppressHydrationWarning
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — heavy dark bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, #111318 0%, rgba(17,19,24,0.75) 40%, rgba(17,19,24,0.25) 75%, rgba(17,19,24,0.1) 100%)"
        }}
        aria-hidden="true"
      />

      {/* Content — bottom-left */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
        <div className="max-w-2xl">

          {/* Pre-label */}
          <div className="hero-anim mb-5 opacity-0 w-fit">
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2">
              <span className="h-px w-6 bg-[#F21D2F]" aria-hidden="true" />
              <span className="font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.22em] text-white">
                Zanzibar&apos;s Master Press Since 1995
              </span>
            </div>
          </div>

          {/* Two-part headline */}
          <h1 className="flex flex-col">
            <span className="hero-anim font-[family-name:var(--font-heading)] text-xl font-bold uppercase tracking-wider text-white/60 opacity-0 md:text-2xl">
              Ink becomes
            </span>
            <span className="hero-anim font-[family-name:var(--font-drama)] italic font-black leading-none text-white opacity-0 text-[4.5rem] md:text-[7rem] lg:text-[8.5rem]">
              Legacy.
            </span>
          </h1>

          {/* Descriptor */}
          <p className="hero-anim mt-5 max-w-md text-base leading-relaxed text-white/70 opacity-0 md:text-lg">
            Industrial precision. Editorial elegance. Every print a permanent mark of your brand&apos;s story.
          </p>

          {/* CTAs */}
          <div className="hero-anim mt-8 flex flex-col gap-4 opacity-0 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-magnetic inline-flex items-center justify-center rounded-full bg-[#F21D2F] px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(242,29,47,0.35)] w-fit"
            >
              <span className="btn-slide-layer bg-[#d1182a]" aria-hidden="true" />
              <span className="relative">Request a Quote</span>
            </Link>

            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors hover:-translate-y-px"
            >
              <span>Chat with Us</span>
              <span className="text-[#F21D2F]" aria-hidden="true">&#8594;</span>
            </a>
          </div>

          {/* Stats row */}
          <div className="hero-anim mt-8 opacity-0">
            <div className="inline-flex flex-wrap gap-8 rounded-[1.5rem] border border-white/10 bg-white/10 backdrop-blur-md px-6 py-5">
              {[
                { value: companyInfo.stats.yearsExperience, label: "Years of Craft" },
                { value: companyInfo.stats.projectsDelivered, label: "Orders Pressed" },
                { value: companyInfo.stats.businessesServed, label: "Brands Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-widest text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
