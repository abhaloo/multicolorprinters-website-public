"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const mainStatement = "We focus on craft."
const words = mainStatement.split(" ")

/* ─── Dot grid constants ─── */
const DOT_SPACING = 32        // px between dot centers
const DOT_RADIUS_REST = 1.6   // px radius at rest
const DOT_RADIUS_MAX = 3.4    // px radius at maximum displacement
const REPEL_RADIUS = 120      // px — cursor influence zone
const REPEL_STRENGTH = 5      // impulse scalar per frame when in zone
const STIFFNESS = 0.08        // spring constant — how fast dots return
const DAMPING = 0.82          // velocity multiplier per frame (1 = no damping)
const COLOR_DIST = 22         // displacement px at which dot reaches full red

/* ─── Color cache — avoids per-dot string allocation in the RAF loop ─── */
const COLOR_STEPS = 64
const colorCache: string[] = Array.from({ length: COLOR_STEPS + 1 }, (_, i) => {
  const t = i / COLOR_STEPS
  const r = Math.round(255 + (242 - 255) * t)
  const g = Math.round(255 + (29  - 255) * t)
  const b = Math.round(255 + (47  - 255) * t)
  const a = (0.10 + 0.55 * t).toFixed(3)
  return `rgba(${r},${g},${b},${a})`
})

interface Dot {
  restX: number
  restY: number
  x: number
  y: number
  vx: number
  vy: number
}

function buildGrid(width: number, height: number): Dot[] {
  const dots: Dot[] = []
  const cols = Math.ceil(width / DOT_SPACING) + 2
  const rows = Math.ceil(height / DOT_SPACING) + 2
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * DOT_SPACING
      const y = r * DOT_SPACING
      dots.push({ restX: x, restY: y, x, y, vx: 0, vy: 0 })
    }
  }
  return dots
}

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const craftRef = useRef<HTMLSpanElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const craftPosRef = useRef({ x: -9999, y: -9999 })
  const cursorInSectionRef = useRef(false)
  const dotsRef = useRef<Dot[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    /* ── GSAP animations (unchanged) ── */
    const ctx = gsap.context(() => {
      gsap.to(".philosophy-bg", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.fromTo(
        ".philosophy-neutral",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".philosophy-neutral",
            start: "top 82%",
            once: true,
          },
        }
      )

      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".philosophy-main",
            start: "top 78%",
            once: true,
          },
        }
      )

      gsap.fromTo(
        ".philosophy-pillar",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".philosophy-pillars",
            start: "top 82%",
            once: true,
          },
        }
      )
    }, sectionRef)

    /* ── Canvas dot grid setup ── */
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return () => ctx.revert()

    const ctx2d = canvas.getContext("2d")
    if (!ctx2d) return () => ctx.revert()

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    function resize() {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
      dotsRef.current = buildGrid(canvas.width, canvas.height)

      // Static fallback for reduced motion — draw once and exit
      if (reducedMotion) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height)
        for (const dot of dotsRef.current) {
          ctx2d.beginPath()
          ctx2d.arc(dot.x, dot.y, DOT_RADIUS_REST, 0, Math.PI * 2)
          ctx2d.fillStyle = "rgba(255,255,255,0.10)"
          ctx2d.fill()
        }
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(section)
    resize()

    if (reducedMotion) {
      return () => {
        ctx.revert()
        ro.disconnect()
      }
    }

    /* ── RAF animation loop ── */
    function tick() {
      if (!canvas || !ctx2d) return
      const { width, height } = canvas

      // Update craft word position each frame (accounts for GSAP scroll animation)
      if (craftRef.current) {
        const craftRect = craftRef.current.getBoundingClientRect()
        const sectionRect = section.getBoundingClientRect()
        craftPosRef.current = {
          x: craftRect.left + craftRect.width / 2 - sectionRect.left,
          y: craftRect.top + craftRect.height / 2 - sectionRect.top,
        }
      }

      // Active magnetic point: cursor when inside section, craft word when outside
      const active = cursorInSectionRef.current ? mouseRef.current : craftPosRef.current
      const mx = active.x
      const my = active.y

      ctx2d.clearRect(0, 0, width, height)

      for (const dot of dotsRef.current) {
        // Vector from magnetic point to dot (repulsion direction)
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Repulsion impulse when cursor is within influence zone
        if (dist < REPEL_RADIUS && dist > 0.5) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH
          dot.vx += (dx / dist) * force
          dot.vy += (dy / dist) * force
        }

        // Spring: pull back toward rest position
        dot.vx += (dot.restX - dot.x) * STIFFNESS
        dot.vy += (dot.restY - dot.y) * STIFFNESS

        // Velocity damping
        dot.vx *= DAMPING
        dot.vy *= DAMPING

        // Integrate
        dot.x += dot.vx
        dot.y += dot.vy

        // Color + radius based on displacement from rest
        const dispX = dot.x - dot.restX
        const dispY = dot.y - dot.restY
        const displacement = Math.sqrt(dispX * dispX + dispY * dispY)
        const t = Math.min(displacement / COLOR_DIST, 1)

        // Radius and color via cache (avoids string allocation per dot per frame)
        const radius = DOT_RADIUS_REST + (DOT_RADIUS_MAX - DOT_RADIUS_REST) * t
        const cacheIdx = Math.round(t * COLOR_STEPS)

        ctx2d.beginPath()
        ctx2d.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx2d.fillStyle = colorCache[cacheIdx]
        ctx2d.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    /* ── Mouse tracking (section-relative coordinates) ── */
    function handleMouseMove(e: MouseEvent) {
      const rect = section.getBoundingClientRect()
      cursorInSectionRef.current = true
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    function handleMouseLeave() {
      cursorInSectionRef.current = false
      mouseRef.current = { x: -9999, y: -9999 }
    }

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      ctx.revert()
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111318] py-32 md:py-40"
    >
      {/* Elastic dot grid canvas — behind everything */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Parallax paper texture — sits above canvas, still barely visible */}
      <div
        className="philosophy-bg pointer-events-none absolute"
        style={{
          inset: "-20%",
          backgroundImage: "url('/images/paper-texture.webp')",
          backgroundSize: "512px 512px",
          backgroundRepeat: "repeat",
          opacity: 0.04,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Counter-statement */}
        <p className="philosophy-neutral font-[family-name:var(--font-heading)] text-base text-white/30 md:text-lg">
          Most print shops focus on: volume and speed. That&apos;s our bare minimum.
        </p>

        {/* Main manifesto */}
        <div className="philosophy-main mt-8">
          <h2 className="font-[family-name:var(--font-drama)] italic font-black leading-none text-white text-5xl md:text-7xl lg:text-[6.5rem]">
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="manifesto-word mr-[0.2em] inline-block"
              >
                {word === "craft." ? (
                  <span ref={craftRef} className="text-[#F21D2F]">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>
        </div>

        {/* Three pillars */}
        <div className="philosophy-pillars mt-20 grid gap-8 md:grid-cols-3">
          {[
            {
              number: "01",
              text: "Precision over quantity — every job calibrated to spec",
            },
            {
              number: "02",
              text: "Industrial machines, human judgment at every step",
            },
            {
              number: "03",
              text: "Every print a permanent mark of your brand's identity",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="philosophy-pillar flex items-start gap-4"
            >
              <span className="font-[family-name:var(--font-data)] text-xs text-[#F21D2F] mt-1 shrink-0">
                {item.number}
              </span>
              <p className="font-[family-name:var(--font-heading)] text-sm leading-relaxed text-white/45">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
