import { Star } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

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
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Testimonials"
          heading="What Our Clients Say"
          light
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-accent">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-white">
                  {t.name}
                </p>
                <p className="text-xs text-accent">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
