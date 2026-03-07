"use client"

import { useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const brands = [
  { name: "Sea Cliff Resort & Spa", logo: "/images/client_logos/SEA-CLIFF-RESORTS-AND-SPA-ZANZIBAR-LOGO.webp" },
  { name: "The Residence Zanzibar", logo: "/images/client_logos/the-residence-zanzibar.svg", invert: true },
  { name: "ZRA — Zanzibar Revenue Authority", logo: "/images/client_logos/zra.webp" },
  { name: "Zanzibar Ports Corporation", logo: "/images/client_logos/zanzibar-ports-authority.webp" },
  { name: "Neptune Pwani Beach Resort & Spa", logo: "/images/client_logos/neptune-hotel.webp" },
  { name: "TUI Blue Bahari", logo: "/images/client_logos/tui-blue.webp" },
  { name: "Lux Marijani", logo: "/images/lux-marijani.webp" },
  { name: "Blue Bay Beach Resort", logo: "/images/client_logos/bluebay-logo.avif" },
  { name: "Zanzibar Serena Hotel", logo: "/images/client_logos/serenazanzibar-1.svg" },
  { name: "Commission for Tourism — ZCT", logo: "/images/client_logos/zct-logo.webp" },
  { name: "Zanzibar University", logo: "/images/client_logos/zanzibar-university.webp" },
  { name: "RIU Palace", logo: "/images/client_logos/riu.svg" },
  { name: "Zuri White Sands", logo: "/images/client_logos/zuri-white-logo.webp", invert: true },
  { name: "Sultan Sands Island Hotel", logo: "/images/client_logos/sultan-sands-logo.avif" },
  { name: "Safari Blue", logo: "/images/client_logos/safari-blue-logo.webp", invert: true },
  { name: "Zanzibar Submarine", logo: "/images/client_logos/Logo-Zanzibar-submarine-outline.svg" },
]

export function ClientsStrip() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

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
        <div className="relative group/carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-center">
              {brands.map((brand) => (
                <div key={brand.name} className="flex-[0_0_auto] px-4 sm:px-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`h-12 w-auto max-w-[160px] object-contain grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100${brand.invert ? " invert" : ""}`}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Nav arrows — visible on hover, desktop-only */}
          <button
            onClick={scrollPrev}
            aria-label="Previous clients"
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next clients"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  )
}
