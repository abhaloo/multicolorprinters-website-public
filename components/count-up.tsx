"use client"

import { useEffect, useRef, useState } from "react"

function parseStatValue(value: string): { target: number; suffix: string } {
  const match = value.match(/^([\d,]+)(.*)$/)
  if (!match) return { target: 0, suffix: value }
  return {
    target: parseInt(match[1].replace(/,/g, ""), 10),
    suffix: match[2],
  }
}

interface CountUpProps {
  value: string
  duration?: number
  className?: string
}

export function CountUp({ value, duration = 2000, className }: CountUpProps) {
  const { target, suffix } = parseStatValue(value)
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  useEffect(() => {
    if (!started) return

    let startTime: number | undefined
    let rafId: number

    function animate(timestamp: number) {
      if (startTime === undefined) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [started, target, duration])

  return (
    <span ref={ref} className={className}>
      {started ? count.toLocaleString() + suffix : value}
    </span>
  )
}
