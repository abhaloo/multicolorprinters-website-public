import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/service-details"
import { ServiceHero } from "@/components/service-page/service-hero"
import { WhatIsThis } from "@/components/service-page/what-is-this"
import { KeyFeatures } from "@/components/service-page/key-features"
import { IdealFor } from "@/components/service-page/ideal-for"
import { ExampleGallery } from "@/components/service-page/example-gallery"
import { ServiceCta } from "@/components/service-page/service-cta"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return {
    title: `${service.title} in Zanzibar`,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} in Zanzibar | Multi Color Printers`,
      description: service.metaDescription,
      images: [{ url: service.heroImage }],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) notFound()

  return (
    <main>
      <ServiceHero
        title={service.title}
        tagline={service.tagline}
        heroImage={service.heroImage}
        startingPrice={service.startingPrice}
      />
      <WhatIsThis title={service.title} description={service.description} />
      <KeyFeatures features={service.features} />
      <IdealFor items={service.idealFor} serviceTitle={service.title} />
      <ExampleGallery serviceTitle={service.title} />
      <ServiceCta serviceTitle={service.title} />
    </main>
  )
}
