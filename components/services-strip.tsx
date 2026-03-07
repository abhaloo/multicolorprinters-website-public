import Image from "next/image"
import { AnimateIn } from "@/components/animate-in"

const services = [
  {
    label: "Business Cards",
    image: "/images/services/business-cards.webp",
  },
  {
    label: "Brochures",
    image: "/images/services/brochures.webp",
  },
  {
    label: "Large Format",
    image: "/images/services/large-format.webp",
  },
  {
    label: "Packaging",
    image: "/images/services/packaging.webp",
  },
  {
    label: "Stationery",
    image: "/images/services/stationery.webp",
  },
  {
    label: "Digital Print",
    image: "/images/services/digital-print.webp",
  },
]

type Service = (typeof services)[number]

function ServiceIcon({ service }: { service: Service }) {
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-xl">
      <Image
        src={service.image}
        alt={service.label}
        width={64}
        height={64}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export function ServicesStrip() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-10">
          <AnimateIn>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                What we print
              </p>
              <h2 className="font-[family-name:var(--font-heading)] mt-2 text-2xl font-bold text-foreground md:text-3xl text-balance">
                Everything Your Business Needs
              </h2>
            </div>
          </AnimateIn>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((service, index) => (
              <AnimateIn key={service.label} variant="fade-up" delay={index * 80}>
                <div
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <ServiceIcon service={service} />
                  <span className="text-sm font-semibold text-foreground text-center">
                    {service.label}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
