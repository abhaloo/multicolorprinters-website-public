import { Printer, BookOpen, Image as ImageIcon, Package, FileText, Layers } from "lucide-react"

const services = [
  { icon: FileText, label: "Business Cards" },
  { icon: BookOpen, label: "Brochures" },
  { icon: ImageIcon, label: "Large Format" },
  { icon: Package, label: "Packaging" },
  { icon: Layers, label: "Stationery" },
  { icon: Printer, label: "Digital Print" },
]

export function ServicesStrip() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What we print
            </p>
            <h2 className="font-[family-name:var(--font-heading)] mt-2 text-2xl font-bold text-foreground md:text-3xl text-balance">
              Everything Your Business Needs
            </h2>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((service) => (
              <div
                key={service.label}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <service.icon className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center">
                  {service.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
