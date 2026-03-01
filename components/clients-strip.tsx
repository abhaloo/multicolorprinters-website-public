"use client"

import { useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"

interface Brand {
  name: string
  logo?: string
}

const brands: Brand[] = [
  { name: "Sea Cliff Resort & Spa", logo: "/images/client_logos/SEA-CLIFF-RESORTS-AND-SPA-ZANZIBAR-LOGO.png" },
  { name: "The Residence Hotel", logo: "/images/client_logos/the residence-zanzibar.svg" },
  { name: "ZRA — Zanzibar Revenue Authority", logo: "/images/client_logos/zra.png" },
  { name: "Zanzibar Ports Corporation", logo: "/images/client_logos/zanzibar ports authority.png" },
  { name: "Neptune Pwani Beach Resort & Spa", logo: "/images/client_logos/neptune hotel.png" },
  { name: "TUI Blue Bahari", logo: "/images/client_logos/TUI BLUE.png" },
  { name: "Lux Marijani", logo: "/images/Lux marijani.png" },
  { name: "Blue Bay Beach Resort", logo: "/images/client_logos/BluebayGroupLogo_High Resolution.avif" },
  { name: "Zanzibar Serena Hotel", logo: "/images/client_logos/serenazanzibar-1.svg" },
  { name: "Commission for Tourism — ZCT", logo: "/images/client_logos/zct-logo.png" },
  { name: "Zanzibar University", logo: "/images/client_logos/zanzibar university.jpg" },
  { name: "RIU Palace", logo: "/images/client_logos/riu.svg" },
  { name: "RIU Jambo", logo: "/images/client_logos/riu.svg" },
  { name: "Ocean Paradise Beach Resort & Spa" },
  { name: "Zanzibar Petroleum Ltd" },
  { name: "Zuri White Sands", logo: "/images/client_logos/zuri-white-logo.png" },
  { name: "Sultan Sands Island Hotel", logo: "/images/client_logos/Sultan Sands logo.avif" },
  { name: "Kwanza Aldiana" },
  { name: "Safari Blue", logo: "/images/client_logos/safari blue logo.png" },
  { name: "Zanzibar Submarine", logo: "/images/client_logos/Logo-Zanzibar-submarine-outline.svg" },
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
          <div className="flex items-center">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex-[0_0_auto] px-8"
              >
                {brand.logo ? (
                  <div className="relative h-12 w-32 grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                ) : (
                  <span className="whitespace-nowrap text-lg font-bold tracking-tight text-muted-foreground/40 transition-colors hover:text-foreground font-[family-name:var(--font-heading)]">
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
