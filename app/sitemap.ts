import type { MetadataRoute } from "next"
import { getAllServiceSlugs } from "@/lib/service-details"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://multicolorprinters.com"

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.9 },
    ...getAllServiceSlugs().map((slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.3 },
  ]
}
