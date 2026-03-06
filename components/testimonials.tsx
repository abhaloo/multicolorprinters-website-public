import { Star } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"

const testimonials = [
  {
    quote: "Multi Color Printers transformed our brand materials. The quality of their offset printing is unmatched in Zanzibar. Highly recommend!",
    name: "Ahmed Hassan",
    role: "Hotel General Manager",
    rating: 5,
  },
  {
    quote: "Fast turnaround and exceptional attention to detail. They handled our entire packaging redesign flawlessly.",
    name: "Fatma Ali",
    role: "Product Manager, Spice Co.",
    rating: 5,
  },
  {
    quote: "We've been using Multi Color for over 5 years. Consistent quality, fair pricing, and a team that truly cares about your project.",
    name: "James Mwangi",
    role: "Marketing Director",
    rating: 5,
  },
]

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <SectionHeader
            label="Testimonials"
            heading="What Our Clients Say"
          />
        </AnimateIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <AnimateIn key={t.name} variant="fade-up" delay={index * 100}>
              <div
                className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Decorative quote mark */}
                <QuoteIcon className="mb-3 h-8 w-8 text-primary/15" />

                {/* Quote text */}
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t.quote}
                </p>

                {/* Author row */}
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  {/* Avatar initials */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{t.role}</p>
                  </div>
                  <div className="ml-auto flex shrink-0 gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
