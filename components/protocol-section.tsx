"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ─── SVG Animations ─── */

function MonitorSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide immediately on mount to prevent one-frame flash
      gsap.set(".sk", { opacity: 0, y: 6 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })

      // Reset to clean state at start of every cycle
      tl.set(".sk", { opacity: 0, y: 6 })

      // Nav dots then bar — staggered vertical fade-in
      tl.to(".sk-nav-dot", { opacity: 1, y: 0, duration: 0.25, stagger: 0.08, ease: "power2.out" })
      tl.to(".sk-nav-bar", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "<0.1")

      // Hero block
      tl.to(".sk-hero", { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "+=0.12")

      // Text lines (top to bottom stagger)
      tl.to(".sk-line", { opacity: 1, y: 0, duration: 0.25, stagger: 0.1, ease: "power2.out" }, "+=0.1")

      // Two-col content block as a single unit
      tl.to(".sk-block", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "+=0.1")

      // Fade everything out simultaneously (upward exit)
      tl.to(".sk", { opacity: 0, y: -4, duration: 0.4 }, "+=0.7")
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center select-none"
      aria-hidden="true"
    >
      {/* Monitor body */}
      <div
        className="relative rounded-[12px] p-[10px] w-64 md:w-80"
        style={{
          background: "linear-gradient(160deg, #22263a, #191c2d)",
          border: "2px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Screen */}
        <div
          className="relative overflow-hidden rounded-[6px] bg-[#07090f]"
          style={{ aspectRatio: "16/10" }}
        >
          <div className="p-[10px] flex flex-col gap-[7px]">
            {/* Nav row */}
            <div className="flex items-center gap-[5px]">
              <div className="sk sk-nav-dot h-[6px] w-[6px] rounded-full bg-[#F21D2F]/65" />
              <div className="sk sk-nav-dot h-[6px] w-[6px] rounded-full bg-white/20" />
              <div className="sk sk-nav-dot h-[6px] w-[6px] rounded-full bg-white/20" />
              <div className="sk sk-nav-bar ml-auto h-[5px] w-[38%] rounded-full bg-white/15" />
            </div>

            {/* Hero block */}
            <div className="sk sk-hero h-10 rounded-[4px] bg-white/10" />

            {/* Text lines */}
            <div className="sk sk-line h-[4px] w-[88%] rounded-full bg-white/20" />
            <div className="sk sk-line h-[4px] w-[72%] rounded-full bg-white/15" />
            <div className="sk sk-line h-[4px] w-[80%] rounded-full bg-white/12" />

            {/* Two-col content — animated as a single unit */}
            <div className="sk sk-block flex gap-[7px] mt-[2px]">
              <div className="h-7 w-[38%] rounded-[3px] bg-white/10" />
              <div className="flex-1 flex flex-col gap-[5px] pt-[2px]">
                <div className="h-[4px] w-full rounded-full bg-white/15" />
                <div className="h-[4px] w-[75%] rounded-full bg-white/12" />
                <div className="h-[4px] w-[55%] rounded-full bg-white/10" />
              </div>
            </div>
          </div>

          {/* Blinking cursor */}
          <div
            className="absolute bottom-[8px] left-[10px] h-[9px] w-[1.5px] rounded-full bg-[#F21D2F]/65"
            style={{ animation: "cursor-blink 1.1s step-end infinite" }}
          />
        </div>

        {/* Chin with power LED */}
        <div className="flex items-center justify-center pt-[8px]">
          <div
            className="h-[4px] w-[4px] rounded-full bg-[#F21D2F]/55 animate-pulse"
            style={{ boxShadow: "0 0 6px 2px rgba(242,29,47,0.35)" }}
          />
        </div>
      </div>

      {/* Stand neck */}
      <div
        className="w-[22px] h-[14px]"
        style={{
          background: "linear-gradient(to bottom, #22263a, #191c2d)",
          borderLeft: "2px solid rgba(255,255,255,0.06)",
          borderRight: "2px solid rgba(255,255,255,0.06)",
        }}
      />

      {/* Stand base */}
      <div
        className="h-[6px] w-[76px] rounded-[3px]"
        style={{
          background: "linear-gradient(to bottom, #22263a, #191c2d)",
          border: "2px solid rgba(255,255,255,0.06)",
        }}
      />
    </div>
  )
}

function PrintingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const laserRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const laser = laserRef.current
      if (!laser) return

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })

      // ── Reset to clean state at start of every cycle ──
      tl.set(".pp-el", { opacity: 0, y: 6 })
      tl.set(laser, { left: 0 })

      // ── Three strokes — each sweeps the laser then reveals two elements ──

      // Stroke 1 → letterhead bar + rule line
      tl.to(laser, { left: "calc(100% - 2px)", duration: 1.5, ease: "sine.inOut" })
      tl.to(".pp-el-1", { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.15")
      tl.to(".pp-el-2", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.05")
      tl.set(laser, { left: 0 })

      // Stroke 2 → text lines + image block
      tl.to(laser, { left: "calc(100% - 2px)", duration: 1.5, ease: "sine.inOut" })
      tl.to(".pp-el-3", { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.15")
      tl.to(".pp-el-4", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.05")
      tl.set(laser, { left: 0 })

      // Stroke 3 → footer + color swatches
      tl.to(laser, { left: "calc(100% - 2px)", duration: 1.5, ease: "sine.inOut" })
      tl.to(".pp-el-5", { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.15")
      tl.to(".pp-el-6", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.05")
      tl.set(laser, { left: 0 })

      // ── Hold fully-printed state, then fade everything out ──
      tl.to(".pp-el", { opacity: 0, y: -4, duration: 0.35, stagger: 0.05 }, "+=1.0")
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-80 h-64 md:w-96 md:h-72 select-none"
      aria-hidden="true"
    >
      {/* ── Dot grid background ── */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateRows: "repeat(8, 1fr)",
          gridTemplateColumns: "repeat(12, 1fr)",
        }}
      >
        {Array.from({ length: 96 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <div className="h-[3px] w-[3px] rounded-full bg-white/20" />
          </div>
        ))}
      </div>

      {/* ── Page document ── */}
      <div
        className="absolute top-[6%] left-[14%] right-[14%] bottom-[6%] rounded-[5px] overflow-hidden flex flex-col justify-between p-[14px]"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Element 1: Letterhead bar */}
        <div className="pp-el pp-el-1 flex items-center gap-[7px] shrink-0">
          <div className="h-[8px] w-[8px] rounded-full bg-[#F21D2F]/80 shrink-0" />
          <div className="h-[5px] flex-1 rounded-full bg-white/55" />
          <div className="h-[5px] w-[20%] rounded-full bg-white/30" />
        </div>

        {/* Element 2: Horizontal rule */}
        <div className="pp-el pp-el-2 h-[1px] w-full bg-white/20 shrink-0" />

        {/* Element 3: Text line cluster */}
        <div className="pp-el pp-el-3 flex flex-col gap-[6px] shrink-0">
          <div className="h-[4px] w-[92%] rounded-full bg-white/45" />
          <div className="h-[4px] w-[76%] rounded-full bg-white/35" />
          <div className="h-[4px] w-[84%] rounded-full bg-white/28" />
        </div>

        {/* Element 4: Image block + text stub */}
        <div className="pp-el pp-el-4 flex gap-[10px] shrink-0">
          <div className="h-[30px] w-[30px] rounded-[3px] bg-white/15 shrink-0" />
          <div className="flex flex-col gap-[5px] pt-[3px]">
            <div className="h-[4px] w-[110px] md:w-[130px] rounded-full bg-white/40" />
            <div className="h-[4px] w-[85px] md:w-[100px] rounded-full bg-white/28" />
          </div>
        </div>

        {/* Element 5: Footer rule */}
        <div className="pp-el pp-el-5 h-[1px] w-[55%] bg-white/15" />

        {/* Element 6: Color swatch row */}
        <div className="pp-el pp-el-6 shrink-0 flex items-center gap-[6px]">
          <div className="h-[10px] w-[10px] rounded-full bg-[#F21D2F]/80 shrink-0" />
          <div className="h-[10px] w-[10px] rounded-full shrink-0" style={{ background: "rgba(234,179,8,0.85)" }} />
          <div className="h-[10px] w-[10px] rounded-full shrink-0" style={{ background: "rgba(59,130,246,0.85)" }} />
          <div className="h-[4px] flex-1 rounded-full bg-white/20 ml-[4px]" />
        </div>
      </div>

      {/* ── Laser line — position controlled by GSAP via laserRef ── */}
      <div
        ref={laserRef}
        className="absolute top-0 bottom-0 w-[2px] rounded-full pointer-events-none"
        style={{
          left: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(242,29,47,0.95) 50%, transparent 100%)",
          boxShadow:
            "0 0 18px 5px rgba(242,29,47,0.50), 0 0 4px 1px rgba(242,29,47,0.85)",
        }}
      />
    </div>
  )
}

function PackageDelivery() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide all animated elements on mount
      gsap.set(".pkg-el", { opacity: 0 })
      gsap.set(".pkg-flap-l", { rotation: -45, transformOrigin: "bottom left" })
      gsap.set(".pkg-flap-r", { rotation: 45, transformOrigin: "bottom right" })
      gsap.set(".pkg-tape", { scaleX: 0, transformOrigin: "left center" })
      gsap.set(".pkg-path", { strokeDashoffset: 200 })
      gsap.set(".pkg-dest", { scale: 0, transformOrigin: "center center" })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })

      // Reset
      tl.set(".pkg-el", { opacity: 0 })
      tl.set(".pkg-flap-l", { rotation: -45, transformOrigin: "bottom left" })
      tl.set(".pkg-flap-r", { rotation: 45, transformOrigin: "bottom right" })
      tl.set(".pkg-tape", { scaleX: 0, transformOrigin: "left center" })
      tl.set(".pkg-path", { strokeDashoffset: 200 })
      tl.set(".pkg-dest", { scale: 0 })

      // Fade in box body
      tl.to(".pkg-box", { opacity: 1, duration: 0.3, ease: "power2.out" })

      // Show flaps (open state)
      tl.to(".pkg-flap-l, .pkg-flap-r", { opacity: 1, duration: 0.2 }, "<")

      // Close flaps
      tl.to(".pkg-flap-l", { rotation: 0, duration: 0.4, ease: "power2.inOut" }, "+=0.15")
      tl.to(".pkg-flap-r", { rotation: 0, duration: 0.4, ease: "power2.inOut" }, "<")

      // Draw tape across
      tl.to(".pkg-tape", { opacity: 1, duration: 0.01 }, "+=0.1")
      tl.to(".pkg-tape", { scaleX: 1, duration: 0.5, ease: "sine.inOut" })

      // Brief hold
      tl.addLabel("sealed", "+=0.3")

      // Show and draw delivery path
      tl.to(".pkg-path", { opacity: 1, duration: 0.01 }, "sealed")
      tl.to(".pkg-path", { strokeDashoffset: 0, duration: 1.2, ease: "sine.inOut" }, "sealed")

      // Destination marker arrives
      tl.to(".pkg-dest", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")

      // Destination glow pulse
      tl.to(".pkg-dest-glow", { opacity: 1, scale: 1.8, duration: 0.5, ease: "power2.out" }, "-=0.1")
      tl.to(".pkg-dest-glow", { opacity: 0, scale: 2.2, duration: 0.4 })

      // Hold completed state
      tl.addLabel("done", "+=0.8")

      // Fade out everything
      tl.to(".pkg-el", { opacity: 0, y: -4, duration: 0.4 }, "done")
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-80 md:w-96 flex flex-col items-center select-none"
      aria-hidden="true"
    >
      <svg
        width="100%"
        viewBox="0 0 320 180"
        fill="none"
        className="overflow-visible"
      >
        {/* ── Box body ── */}
        <rect
          className="pkg-el pkg-box"
          x="40" y="50" width="70" height="55" rx="4"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          fill="rgba(255,255,255,0.05)"
        />

        {/* ── Box flaps (left & right halves) ── */}
        <line
          className="pkg-el pkg-flap-l"
          x1="40" y1="50" x2="75" y2="50"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          className="pkg-el pkg-flap-r"
          x1="110" y1="50" x2="75" y2="50"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ── Tape seal ── */}
        <line
          className="pkg-el pkg-tape"
          x1="52" y1="50" x2="98" y2="50"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ── Delivery path (dashed) ── */}
        <path
          className="pkg-el pkg-path"
          d="M 115 77 C 150 77, 160 120, 200 120 S 250 90, 275 90"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          style={{ strokeDasharray: "200", strokeDashoffset: "200" }}
        />

        {/* ── Destination marker ── */}
        <g className="pkg-el pkg-dest">
          {/* Glow ring */}
          <circle
            className="pkg-dest-glow"
            cx="275" cy="90" r="8"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            opacity="0"
          />
          {/* Solid dot */}
          <circle
            cx="275" cy="90" r="5"
            fill="rgba(255,255,255,0.9)"
          />
          {/* Inner checkmark */}
          <path
            d="M 271.5 90 L 274 92.5 L 278.5 87.5"
            stroke="rgba(242,29,47,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <div className="mt-2 font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.2em] text-white/30 text-center">
        Sealed &amp; Delivered
      </div>
    </div>
  )
}

/* ─── Protocol Steps Data ─── */
const steps = [
  {
    number: "01",
    title: "Brief & Blueprint",
    description:
      "You bring the vision. We engineer the exact specification — paper weight, color profile, finish type, and quantity. Nothing goes to press without a locked proof.",
    bg: "#1E2254",
    Animation: MonitorSkeleton,
  },
  {
    number: "02",
    title: "Press & Precision",
    description:
      "HP Indigo 5500, Heidelberg SpeedMaster and more top-of-the-line equipment guided by master hands. Every sheet inspected. Every color matched to the approved proof.",
    bg: "#111318",
    Animation: PrintingPage,
  },
  {
    number: "03",
    title: "Deliver & Endure",
    description:
      "Quality-checked, perfectly packaged, delivered on deadline. Prints built to last — because your brand deserves permanence, not just paper.",
    bg: "#F21D2F",
    Animation: PackageDelivery,
  },
]

/* ─── Main Section ─── */
export function ProtocolSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const nextCard = cardRefs.current[i + 1]
        if (!nextCard) return

        ScrollTrigger.create({
          trigger: nextCard,
          start: "top 70%",
          end: "top 5%",
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(card, {
              scale: gsap.utils.interpolate(1, 0.9, self.progress),
              opacity: gsap.utils.interpolate(1, 0.45, self.progress),
              transformOrigin: "center top",
            })
          },
        })
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-[#F5F0EB] pt-24" aria-label="Our printing process">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <span className="font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.22em] text-[#F21D2F]">
          The Process
        </span>
        <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold text-[#111318] md:text-5xl">
          How we press.
        </h2>
      </div>

      {/* Sticky stacking cards */}
      <div ref={wrapperRef}>
        {steps.map(({ number, title, description, bg, Animation }, i) => (
          <div
            key={number}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="sticky top-0 flex min-h-[100dvh] items-center rounded-t-[3rem]"
            style={{ backgroundColor: bg, willChange: "transform, opacity" }}
          >
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-32">
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
                {/* Animation */}
                <div className="flex items-center justify-center py-8 md:py-0">
                  <Animation />
                </div>

                {/* Content */}
                <div>
                  <span className="font-[family-name:var(--font-data)] text-sm text-white/60">
                    {number}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold text-white md:text-5xl">
                    {title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/90">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
