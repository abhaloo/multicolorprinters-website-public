import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Calendar, User } from "lucide-react"
import {
  fetchPostBySlug,
  fetchPostSlugs,
  fetchRelatedPosts,
  urlFor,
} from "@/lib/sanity"
import { PostBody } from "@/components/blog/post-body"
import { PostCard } from "@/components/blog/post-card"
import { CTASection } from "@/components/cta-section"

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs()
  return (slugs ?? []).map((slug: string) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found | Multi Color Printers" }
  }

  return {
    title: `${post.title} | Multi Color Printers`,
    description: post.excerpt ?? "",
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) notFound()

  const relatedPosts = post.category
    ? await fetchRelatedPosts(post.category, post._id)
    : []

  return (
    <main>
      {/* Header */}
      <header className="relative bg-secondary pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-primary/10" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          {post.category && (
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {post.category}
            </span>
          )}

          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl lg:text-5xl text-balance">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-accent">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.publishedAt), "MMMM d, yyyy")}
              </span>
            )}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-background"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V20C240 0 480 0 720 20C960 40 1200 40 1440 20V60H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div className="mx-auto -mt-2 max-w-4xl px-6">
          <img
            src={urlFor(post.coverImage).width(800).url()}
            alt={post.title}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Body */}
      <article className="py-12 md:py-16 px-6">
        <PostBody body={post.body ?? []} />
      </article>

      {/* Related posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="border-t bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-[family-name:var(--font-heading)] mb-8 text-2xl font-bold">
              Related Articles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related: any) => (
                <PostCard key={related._id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </main>
  )
}
