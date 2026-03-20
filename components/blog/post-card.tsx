import Link from "next/link"
import { format } from "date-fns"
import { urlFor } from "@/lib/sanity"
import { ArrowRight, Calendar } from "lucide-react"

interface PostCardProps {
  post: {
    title: string
    slug: { current: string }
    excerpt?: string
    coverImage?: any
    category?: string
    publishedAt?: string
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden">
        {post.coverImage ? (
          <img
            src={urlFor(post.coverImage).width(600).height(338).url()}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-secondary via-secondary/80 to-primary/30" />
        )}
        {post.category && (
          <span className="absolute top-4 left-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(post.publishedAt), "MMM d, yyyy")}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors">
            Read more
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
