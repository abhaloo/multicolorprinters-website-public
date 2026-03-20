import type { Metadata } from "next"
import { fetchAllPosts } from "@/lib/sanity"
import { PageHero } from "@/components/page-hero"
import { BlogFilter } from "@/components/blog/blog-filter"
import { CTASection } from "@/components/cta-section"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Stories & Insights | Multi Color Printers",
  description:
    "Tips, news, case studies, and events from Multi Color Printers — Zanzibar's trusted printing partner.",
}

export default async function BlogPage() {
  const posts = await fetchAllPosts()

  return (
    <main>
      <PageHero
        title="Stories & Insights"
        subtitle="Our Blog"
        accent="blue"
      />
      <BlogFilter posts={posts ?? []} />
      <CTASection />
    </main>
  )
}
