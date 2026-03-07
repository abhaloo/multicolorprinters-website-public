"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const mainStatement = "We focus on craft."
const words = mainStatement.split(" ")

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax texture
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

      // Counter-statement fade in
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

      // Word-by-word reveal
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

      // Pillars fade up
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

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111318] py-32 md:py-40"
    >
      {/* Parallax paper texture */}
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
          Most print shops focus on: volume and speed.
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
                  <span className="text-[#F21D2F]">{word}</span>
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
            <div key={item.number} className="philosophy-pillar flex items-start gap-4">
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
