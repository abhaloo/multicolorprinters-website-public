import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Our Portfolio | Multi Color Printers",
  description:
    "Browse our portfolio of commercial printing projects — digital prints, offset work, graphic design, and packaging solutions.",
}

export default function PortfolioPage() {
  return (
    <main>
      <PageHero
        title="Our Portfolio"
        subtitle="A Showcase of Quality Printing"
        accent="blue"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <PortfolioGallery />
        </div>
      </section>

      <CTASection />
    </main>
  )
}
