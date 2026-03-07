"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ─── SVG Animations ─── */

function RotatingCircles() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="shrink-0"
    >
      {[80, 60, 40, 20].map((r, i) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeDasharray={`${r * 0.5} ${r * 0.12}`}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 100 100`}
            to={`${i % 2 === 0 ? 360 : -360} 100 100`}
            dur={`${5 + i * 2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <circle cx="100" cy="100" r="4" fill="#F21D2F" />
    </svg>
  )
}

function ScanningLaser() {
  return (
    <div className="relative w-52 h-32" aria-hidden="true">
      {/* Dot grid */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateRows: "repeat(5, 1fr)",
          gridTemplateColumns: "repeat(8, 1fr)",
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <div className="h-[3px] w-[3px] rounded-full bg-white/20" />
          </div>
        ))}
      </div>
      {/* Laser line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] rounded-full"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(242,29,47,0.9), transparent)",
          boxShadow: "0 0 10px 3px rgba(242,29,47,0.5)",
          animation: "laser-scan 2.2s ease-in-out infinite",
        }}
      />
    </div>
  )
}

function EKGWaveform() {
  const pathD =
    "M0,28 L22,28 L28,8 L34,48 L40,8 L46,28 L80,28 L86,8 L92,48 L98,8 L104,28 L138,28 L144,8 L150,48 L156,8 L162,28 L200,28"
  return (
    <svg
      width="200"
      height="56"
      viewBox="0 0 200 56"
      aria-hidden="true"
      className="overflow-visible shrink-0"
    >
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 500,
          strokeDashoffset: 500,
          animation: "ekg-draw 2.4s ease-out infinite",
        }}
      />
    </svg>
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
    Animation: RotatingCircles,
  },
  {
    number: "02",
    title: "Press & Precision",
    description:
      "HP Indigo 5500 and Heidelberg SpeedMaster guided by master hands. Every sheet inspected. Every color matched to the approved proof.",
    bg: "#111318",
    Animation: ScanningLaser,
  },
  {
    number: "03",
    title: "Deliver & Endure",
    description:
      "Quality-checked, perfectly packaged, delivered on deadline. Prints built to last — because your brand deserves permanence, not just paper.",
    bg: "#F21D2F",
    Animation: EKGWaveform,
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
