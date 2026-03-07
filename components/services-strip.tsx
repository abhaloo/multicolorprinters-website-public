import Image from "next/image"
import { AnimateIn } from "@/components/animate-in"

// NOTE: gradient values must remain as complete static strings (not assembled from parts)
// so Tailwind's scanner can detect them. image paths are placeholder scaffolding for when
// real photos are provided — see ServiceThumbnail above.
const services = [
  {
    label: "Business Cards",
    image: "/images/services/business-cards.webp",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    label: "Brochures",
    image: "/images/services/brochures.webp",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    label: "Large Format",
    image: "/images/services/large-format.webp",
    gradient: "from-orange-500 to-red-600",
  },
  {
    label: "Packaging",
    image: "/images/services/packaging.webp",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    label: "Stationery",
    image: "/images/services/stationery.webp",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    label: "Digital Print",
    image: "/images/services/digital-print.webp",
    gradient: "from-rose-500 to-pink-600",
  },
]

type Service = typeof services[number]

// Ready to use when photos land in public/images/services/
// Swap <ServiceFallback service={service} /> for <ServiceThumbnail service={service} />
function ServiceThumbnail({ service }: { service: Service }) {
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

function ServiceFallback({ service }: { service: Service }) {
  return (
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient}`}
    >
      <span className="text-lg font-bold text-white">
        {service.label.charAt(0)}
      </span>
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
                  <ServiceFallback service={service} />
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
