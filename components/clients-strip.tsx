"use client"

import { useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"

const brands = [
  "Sea Cliff Resort & Spa",
  "The Residence Hotel",
  "ZRA — Zanzibar Revenue Authority",
  "Zanzibar Ports Corporation",
  "Zanzibar University",
  "Neptune Pwani Beach Resort & Spa",
  "TUI Blue Bahari",
  "RIU Palace",
  "Lux Marijani",
  "Blue Bay Beach Resort",
  "RIU Jambo",
  "Zanzibar Serena Hotel",
  "Ocean Paradise Beach Resort & Spa",
  "Commission for Tourism — ZCT",
  "Zanzibar Petroleum Ltd",
  "Zuri White Sands",
  "Sultan Sands Island Hotel",
  "Kwanza Aldiana",
]

export function ClientsStrip() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  })

  const autoScroll = useCallback(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 2500)
    return () => clearInterval(interval)
  }, [emblaApi])

  useEffect(() => {
    const cleanup = autoScroll()
    return cleanup
  }, [autoScroll])

  return (
    <section className="bg-card py-12 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Trusted by businesses across Zanzibar
        </p>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex-[0_0_auto] px-8"
              >
                <span className="whitespace-nowrap text-lg font-bold tracking-tight text-muted-foreground/40 transition-colors hover:text-foreground font-[family-name:var(--font-heading)]">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
