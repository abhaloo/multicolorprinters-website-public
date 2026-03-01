import type { Metadata } from "next"
import { Palette, Printer, Factory, Package } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CTASection } from "@/components/cta-section"
import { servicesList } from "@/lib/data"

export const metadata: Metadata = {
  title: "Our Services | Multi Color Printers",
  description:
    "Complete print solutions: graphic design, digital printing with HP Indigo 5500, offset printing with Heidelberg SpeedMaster, and packaging.",
}

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Our in-house design team brings your ideas to life. From brand identity to marketing materials, we offer professional designing, editing, typesetting, scanning, and image manipulation services to ensure your prints are pixel-perfect.",
    features: ["Brand Identity Design", "Layout & Typesetting", "Image Editing & Retouching", "Scanning & Digitization", "Pre-Press Preparation"],
    gradient: "from-accent to-secondary",
  },
  {
    icon: Printer,
    title: "Digital Printing",
    description:
      "Powered by the HP Indigo 5500 digital press, we deliver stunning full-color prints with variable data printing capabilities. Ideal for short runs, personalized marketing, and fast turnaround projects without compromising on quality.",
    features: ["HP Indigo 5500 Technology", "Variable Data Printing", "Short Run Specialists", "Same-Day Turnaround Available", "Pantone Color Matching"],
    gradient: "from-primary to-[#F25764]",
  },
  {
    icon: Factory,
    title: "Offset Printing",
    description:
      "Our Heidelberg SpeedMaster press handles high-volume commercial printing with exceptional consistency. Perfect for large runs of brochures, magazines, books, and marketing collateral with options for varnish coating and special finishes.",
    features: ["Heidelberg SpeedMaster Press", "High-Volume Production", "Varnish & UV Coating", "Spot Color Printing", "Consistent Color Reproduction"],
    gradient: "from-secondary to-accent",
  },
  {
    icon: Package,
    title: "Packaging Solutions",
    description:
      "End-to-end packaging services from structural design to final production. We create eye-catching product packaging, display boxes, and custom containers that protect your products and elevate your brand presence on the shelf.",
    features: ["Custom Box Design", "Product Packaging", "Display & POS Materials", "Die-Cutting & Folding", "Embossing & Foil Stamping"],
    gradient: "from-[#F25764] to-primary",
  },
]

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="Complete Print Solutions Under One Roof"
      />

      {/* Service Sections — Zigzag Layout */}
      {services.map((service, index) => (
        <section
          key={service.title}
          className={index % 2 === 0 ? "bg-background" : "bg-card"}
        >
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image placeholder */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div
                  className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                >
                  <service.icon className="h-24 w-24 text-white/30" />
                </div>
              </div>

              {/* Text */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <service.icon className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground md:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Products Grid */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Complete product range
            </p>
            <h2 className="font-[family-name:var(--font-heading)] mt-2 text-2xl font-bold text-foreground md:text-3xl">
              Everything We Print
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {servicesList.map((product) => (
              <div
                key={product}
                className="rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:border-primary/30"
              >
                {product}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
