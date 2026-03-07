"use client"

import { useState, useEffect, useRef } from "react"

/* ─── Card 1: Diagnostic Shuffler (Color Precision) ─── */
const shufflerItems = [
  { label: "CMYK Calibration", symbol: "◈", color: "#F21D2F" },
  { label: "Pantone Matching", symbol: "◉", color: "#1E2254" },
  { label: "Color Proofing", symbol: "◎", color: "#9395BF" },
]

function DiagnosticShuffler() {
  const [items, setItems] = useState(shufflerItems)

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev]
        const last = next.pop()!
        next.unshift(last)
        return next
      })
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-36" aria-label="Color calibration services cycling display">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="absolute left-0 right-0"
          style={{
            transform: `translateY(${i * 14}px) scale(${1 - i * 0.05})`,
            zIndex: items.length - i,
            transition: "all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
            opacity: 1 - i * 0.28,
          }}
        >
          <div className="flex items-center gap-3 rounded-[1.25rem] border border-[#1E2254]/10 bg-white/80 px-4 py-3 shadow-sm">
            <span className="text-xl select-none" style={{ color: item.color }} aria-hidden="true">
              {item.symbol}
            </span>
            <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#111318]">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Card 2: Telemetry Typewriter (Reliable Speed) ─── */
const feedMessages = [
  "Order received. Proofing spec... done.",
  "Color profile locked. Press run initiated.",
  "Turnaround: 48h. Quality check: passed.",
  "30,000+ orders. Zero missed deadlines.",
]

function TelemetryTypewriter() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const msg = feedMessages[msgIndex]
    if (charIndex < msg.length) {
      const t = setTimeout(
        () => {
          setDisplayed(msg.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        },
        40 + Math.random() * 20
      )
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setMsgIndex((m) => (m + 1) % feedMessages.length)
        setDisplayed("")
        setCharIndex(0)
      }, 2200)
      return () => clearTimeout(t)
    }
  }, [charIndex, msgIndex])

  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-[1.25rem] bg-[#111318] p-5 h-36 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F21D2F] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F21D2F]" />
        </span>
        <span className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.18em] text-[#F21D2F]">
          Live Feed
        </span>
      </div>
      <p
        className="font-[family-name:var(--font-data)] text-sm leading-relaxed text-white/80 min-h-[2.5rem]"
        aria-live="polite"
        aria-atomic="true"
      >
        {displayed}
        <span
          className="inline-block w-[2px] h-[1em] bg-[#F21D2F] align-middle ml-0.5 relative top-[1px]"
          style={{ opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}
          aria-hidden="true"
        />
      </p>
    </div>
  )
}

/* ─── Card 3: Cursor Protocol Scheduler (25+ Years Expertise) ─── */
const dayLabels = ["S", "M", "T", "W", "T", "F", "S"]
const scheduledDays = [1, 3, 5] // Mon, Wed, Fri

function CursorScheduler() {
  const [activeDays, setActiveDays] = useState<number[]>([])
  const [saved, setSaved] = useState(false)
  const [pressedDay, setPressedDay] = useState<number | null>(null)
  const timeouts = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  const schedule = (fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      timeouts.current.delete(id)
      fn()
    }, delay)
    timeouts.current.add(id)
    return id
  }

  useEffect(() => {
    let stepIndex = 0

    const runCycle = () => {
      setActiveDays([])
      setSaved(false)
      setPressedDay(null)
      stepIndex = 0
      activateNext()
    }

    const activateNext = () => {
      if (stepIndex < scheduledDays.length) {
        const day = scheduledDays[stepIndex]
        setPressedDay(day)
        schedule(() => {
          setPressedDay(null)
          setActiveDays((prev) => [...prev, day])
          stepIndex++
          schedule(activateNext, 600)
        }, 250)
      } else {
        schedule(() => {
          setSaved(true)
          schedule(runCycle, 1800)
        }, 500)
      }
    }

    schedule(runCycle, 800)

    return () => {
      timeouts.current.forEach(clearTimeout)
      timeouts.current.clear()
    }
  }, [])

  return (
    <div className="h-36 flex flex-col justify-between" aria-label="Weekly scheduling demonstration">
      <div className="grid grid-cols-7 gap-1.5">
        {dayLabels.map((day, i) => {
          const isActive = activeDays.includes(i)
          const isPressed = pressedDay === i
          return (
            <div
              key={`${day}-${i}`}
              className="aspect-square flex items-center justify-center rounded-lg text-xs font-[family-name:var(--font-data)] font-medium"
              style={{
                backgroundColor: isActive ? "#F21D2F" : "rgba(30,34,84,0.08)",
                color: isActive ? "white" : "#111318",
                transform: isPressed ? "scale(0.88)" : "scale(1)",
                transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                boxShadow: isActive ? "0 2px 8px rgba(242,29,47,0.3)" : "none",
              }}
              aria-label={`${day}${isActive ? " — scheduled" : ""}`}
            >
              {day}
            </div>
          )
        })}
      </div>
      <div
        className="rounded-xl px-3 py-2 text-center text-xs font-[family-name:var(--font-data)] font-medium"
        style={{
          backgroundColor: saved ? "#1E2254" : "rgba(30,34,84,0.07)",
          color: saved ? "white" : "rgba(17,19,24,0.55)",
          transform: saved ? "scale(0.97)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
      >
        {saved ? "Schedule Confirmed ✓" : "Confirm Schedule"}
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
const cards = [
  {
    id: "shuffler",
    Widget: DiagnosticShuffler,
    heading: "Color Precision",
    descriptor:
      "Every shade matched. Industrial CMYK and Pantone systems calibrated for each job — no guesswork, just exact color.",
  },
  {
    id: "typewriter",
    Widget: TelemetryTypewriter,
    heading: "Reliable Speed",
    descriptor:
      "30,000+ orders delivered on time. Fast turnarounds built into our workflow — your deadline drives our press schedule.",
  },
  {
    id: "scheduler",
    Widget: CursorScheduler,
    heading: "Trusted Expertise",
    descriptor:
      "25+ years serving Zanzibar's best brands. Consistent results you can count on, week after week.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-[#F5F0EB] py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl md:mb-16">
          <span className="font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.22em] text-[#F21D2F]">
            What sets us apart
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-[#111318] sm:text-4xl md:text-5xl">
            Built for precision.
            <br />
            Driven by craft.
          </h2>
        </div>

        {/* Three interactive cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ id, Widget, heading, descriptor }) => (
            <div
              key={id}
              className="rounded-[1.5rem] border border-[#1E2254]/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:rounded-[2rem] sm:p-8"
            >
              <Widget />
              <div className="mt-8 border-t border-[#1E2254]/10 pt-6">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#111318]">
                  {heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#111318]/60">
                  {descriptor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
