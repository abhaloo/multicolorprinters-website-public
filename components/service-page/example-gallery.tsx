import Link from "next/link"
import { AnimateIn } from "@/components/animate-in"
import { SectionHeader } from "@/components/section-header"

interface ExampleGalleryProps {
  serviceTitle: string
}

export function ExampleGallery({ serviceTitle }: ExampleGalleryProps) {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <SectionHeader label="Portfolio" heading={`Our ${serviceTitle} Work`} />
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={100}>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Visit our portfolio to see examples of our {serviceTitle.toLowerCase()} projects.
            </p>
            <Link
              href="/portfolio"
              className="mt-4 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              View Portfolio
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
