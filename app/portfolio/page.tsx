import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { StaticPortfolioGallery } from "@/components/static-portfolio-gallery"
import { CTASection } from "@/components/cta-section"
import { AnimateIn } from "@/components/animate-in"
import { fetchPortfolioItems } from "@/lib/sanity"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Our Portfolio",
  description:
    "Browse our portfolio of commercial printing projects in Zanzibar — digital prints, offset work, graphic design, and packaging solutions.",
  alternates: { canonical: "/portfolio" },
}

export default async function PortfolioPage() {
  const items = await fetchPortfolioItems()

  return (
    <main>
      <PageHero
        title="Our Portfolio"
        subtitle="A selection of our work across print, design, and packaging"
        accent="blue"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            {items.length > 0 ? (
              <PortfolioGallery items={items} />
            ) : (
              <StaticPortfolioGallery />
            )}
          </AnimateIn>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
