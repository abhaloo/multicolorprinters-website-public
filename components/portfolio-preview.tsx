import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"

const projects = [
  {
    title: "Zanzibar Tourism Campaign",
    category: "Digital Print",
    gradient: "from-secondary to-accent",
  },
  {
    title: "Spice Island Product Packaging",
    category: "Packaging",
    gradient: "from-primary to-[#F25764]",
  },
  {
    title: "Hotel Chain Brand Collateral",
    category: "Offset Print",
    gradient: "from-[#F25764] to-secondary",
  },
]

export function PortfolioPreview() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <SectionHeader
            label="Our work"
            heading="Recent Projects"
          />
        </AnimateIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <AnimateIn key={project.title} variant="scale-in" delay={index * 100}>
              <div
                className="group relative overflow-hidden rounded-[1.5rem]"
              >
                {/* Gradient placeholder */}
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${project.gradient}`}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6 md:opacity-0 transition-opacity md:group-hover:opacity-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-semibold px-8"
          >
            <Link href="/portfolio">
              View All Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
