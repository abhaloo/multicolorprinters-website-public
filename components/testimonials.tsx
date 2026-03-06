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
                className="rounded-xl border border-border bg-background p-6 shadow-sm"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
