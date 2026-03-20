import Link from "next/link"
import { AnimateIn } from "@/components/animate-in"

interface ServiceHeroProps {
  title: string
  tagline: string
  heroImage: string
  startingPrice?: string
}

export function ServiceHero({ title, tagline, heroImage, startingPrice }: ServiceHeroProps) {
  return (
    <section
      className="relative flex min-h-[60vh] items-center"
      style={{
        backgroundImage: `url(${encodeURI(heroImage)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E2254] via-[#1E2254]/90 to-[#1E2254]/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <AnimateIn variant="fade-up">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-white md:text-5xl lg:text-6xl text-balance">
              {title}
            </h1>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={100}>
            <p className="mt-4 text-lg text-white/80 md:text-xl">
              {tagline}
            </p>
          </AnimateIn>

          {startingPrice && (
            <AnimateIn variant="fade-up" delay={200}>
              <p className="mt-2 text-sm text-white/60">
                Starting from {startingPrice}
              </p>
            </AnimateIn>
          )}

          <AnimateIn variant="fade-up" delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/contact?service=${encodeURIComponent(title)}`}
                className="inline-flex items-center rounded-lg bg-[#F21D2F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#F21D2F]/90"
              >
                Get a {title} Quote
              </Link>
              <a
                href="https://wa.me/255773194472"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
