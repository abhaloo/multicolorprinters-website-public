import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { companyInfo } from "@/lib/data"
import { CountUp } from "@/components/count-up"

const trustPoints = [
  "Fast Turnaround",
  "Premium Quality",
  "Free Proofing",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary pt-24 pb-0 md:pt-32 md:pb-0">
      {/* Gradient orbs for visual depth on mobile — static to avoid GPU repaints */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col gap-8 py-12 lg:py-20">
            {/* Badge */}
            <div className="hero-stagger hero-stagger-1 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F25764] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Zanzibar&apos;s trusted print house since 1999
              </span>
            </div>

            {/* Headline */}
            <div className="hero-stagger hero-stagger-2 flex flex-col gap-4">
              <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight tracking-tight text-secondary-foreground md:text-5xl lg:text-6xl text-balance">
                Your Vision,{" "}
                <span className="text-primary">Perfectly</span>{" "}
                Printed
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-accent">
                From business cards to large-format banners to billboards, we deliver
                exceptional commercial printing with precision color
                matching and unmatched quality.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-stagger hero-stagger-3 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="btn-cta bg-primary text-primary-foreground hover:bg-[#d1182a] font-semibold px-8 py-6 text-base shadow-lg shadow-primary/25"
              >
                <Link href="/contact">
                  Request a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 cta-arrow-icon" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-accent hover:text-secondary-foreground hover:bg-accent/10 font-medium px-8 py-6 text-base"
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="hero-stagger hero-stagger-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              {trustPoints.map((point) => (
                <span
                  key={point}
                  className="flex items-center gap-2 text-sm font-medium text-accent"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#F25764]" />
                  {point}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl lg:rounded-t-2xl lg:rounded-b-none">
              <Image
                src="/images/hero-printing.webp"
                alt="Premium printed marketing materials — brochures, business cards, and packaging"
                width={700}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-card/95 p-5 backdrop-blur-sm shadow-xl hidden lg:block">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Trusted by
                    </span>
                    <CountUp
                      value={companyInfo.stats.businessesServed}
                      className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground"
                    />
                    <span className="text-[10px] font-medium text-muted-foreground">Businesses</span>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Experience
                    </span>
                    <CountUp
                      value={companyInfo.stats.yearsExperience}
                      className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground"
                    />
                    <span className="text-[10px] font-medium text-muted-foreground">Years</span>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Delivered
                    </span>
                    <CountUp
                      value={companyInfo.stats.projectsDelivered}
                      className="font-[family-name:var(--font-heading)] text-xl font-bold text-primary"
                    />
                    <span className="text-[10px] font-medium text-muted-foreground">Orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only trust stats */}
        <div className="hero-stagger hero-stagger-4 flex justify-between gap-4 pb-8 lg:hidden">
          <div className="flex flex-col items-center">
            <CountUp
              value={companyInfo.stats.businessesServed}
              className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white"
            />
            <span className="text-[10px] font-medium text-accent">Businesses</span>
          </div>
          <div className="h-10 w-px bg-accent/30" />
          <div className="flex flex-col items-center">
            <CountUp
              value={companyInfo.stats.yearsExperience}
              className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white"
            />
            <span className="text-[10px] font-medium text-accent">Years</span>
          </div>
          <div className="h-10 w-px bg-accent/30" />
          <div className="flex flex-col items-center">
            <CountUp
              value={companyInfo.stats.projectsDelivered}
              className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary"
            />
            <span className="text-[10px] font-medium text-accent">Orders</span>
          </div>
        </div>
      </div>

      {/* Bottom wave/separator */}
      <div className="relative mt-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full text-background"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V20C240 0 480 0 720 20C960 40 1200 40 1440 20V60H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
