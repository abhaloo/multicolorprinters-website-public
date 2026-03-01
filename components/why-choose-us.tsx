import { Award, Cog, Clock, BadgeDollarSign } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const values = [
  {
    icon: Award,
    title: "25+ Years Experience",
    description: "Over two and a half decades of printing expertise serving Zanzibar and East Africa.",
  },
  {
    icon: Cog,
    title: "Industry Equipment",
    description: "HP Indigo 5500 & Heidelberg SpeedMaster for unmatched print precision.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Efficient workflows and dedicated teams to meet your tightest deadlines.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Quality",
    description: "Premium results at competitive prices — no compromises on craftsmanship.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <SectionHeader
              label="Why choose us"
              heading="A Print Partner You Can Count On"
              centered={false}
            />
            <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
              At Multi Color Printers, we combine state-of-the-art technology with
              hands-on craftsmanship to deliver prints that make an impact. From
              concept to delivery, we&apos;re with you every step of the way.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <value.icon className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
