// components/success-celebration.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Animated checkmark using SVG stroke-dashoffset
function AnimatedCheckmark() {
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      {/* Green circle background with scale animation */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-green-100 transition-transform duration-500 ease-out",
          drawn ? "scale-100" : "scale-0"
        )}
      />
      {/* Checkmark SVG */}
      <svg
        className="relative h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M5 13l4 4L19 7"
          className="text-green-600"
          style={{
            strokeDasharray: 30,
            strokeDashoffset: drawn ? 0 : 30,
            transition: "stroke-dashoffset 0.4s ease-out 0.3s",
          }}
        />
      </svg>
    </div>
  )
}

// Simple confetti particles using CSS animations
function ConfettiParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360
    const distance = 60 + (i % 3) * 30
    const x = Math.cos((angle * Math.PI) / 180) * distance
    const y = Math.sin((angle * Math.PI) / 180) * distance
    const colors = [
      "bg-green-400",
      "bg-green-500",
      "bg-emerald-400",
      "bg-red-400",
      "bg-blue-500",
      "bg-yellow-400",
    ]
    const color = colors[i % colors.length]
    const size = 4 + (i % 3) * 2
    const delay = (i % 4) * 50

    return { id: i, x, y, color, size, delay }
  })

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn("absolute rounded-full", p.color)}
          style={{
            width: p.size,
            height: p.size,
            opacity: 0,
            animation: `confetti-burst 0.8s ease-out ${p.delay}ms forwards`,
            // @ts-expect-error CSS custom properties
            "--confetti-x": `${p.x}px`,
            "--confetti-y": `${p.y}px`,
          }}
        />
      ))}
    </div>
  )
}

interface SuccessCelebrationProps {
  onReset: () => void
}

export function SuccessCelebration({ onReset }: SuccessCelebrationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-5 py-12 text-center outline-none"
    >
      {/* Confetti + Checkmark */}
      <div className="relative">
        <ConfettiParticles />
        <AnimatedCheckmark />
      </div>

      {/* Heading */}
      <h3
        className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500"
        style={{ animationDelay: "400ms", animationFillMode: "both" }}
      >
        Quote Request Sent!
      </h3>

      {/* Subtext */}
      <p
        className="max-w-sm text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500"
        style={{ animationDelay: "550ms", animationFillMode: "both" }}
      >
        Thank you! We&apos;ll review your project details and get back to you within 24 hours.
      </p>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="mt-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted animate-in fade-in slide-in-from-bottom-2 duration-500"
        style={{ animationDelay: "700ms", animationFillMode: "both" }}
      >
        Submit Another Request
      </button>
    </div>
  )
}
