import Link from "next/link"
import { CircleDot } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"

interface IdealForProps {
  items: string[]
  serviceTitle: string
}

export function IdealFor({ items, serviceTitle }: IdealForProps) {
  return (
    <section className="bg-[#1E2254] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <h2 className="font-[family-name:var(--font-heading)] text-center text-2xl font-bold text-white md:text-3xl">
            Ideal For
          </h2>
        </AnimateIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <AnimateIn key={index} variant="fade-up" delay={80 * index}>
              <div className="flex items-center gap-3 rounded-lg bg-white/5 px-5 py-4">
                <CircleDot className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-white">{item}</span>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn variant="fade-up" delay={400}>
          <div className="mt-12 border-t border-white/10 pt-10 text-center">
            <p className="text-white/70">
              Not sure if this is the right service for your project?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center rounded-lg bg-[#F21D2F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#F21D2F]/90"
            >
              Ask Our Experts
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
