"use client"

import { useState } from "react"
import { PostCard } from "@/components/blog/post-card"
import { FileText } from "lucide-react"

interface BlogFilterProps {
  posts: any[]
}

const categories = ["All", "News", "Tips", "Case Study", "Events"]

export function BlogFilter({ posts }: BlogFilterProps) {
  const [active, setActive] = useState("All")

  const filtered =
    active === "All"
      ? posts
      : posts.filter((p: any) => p.category === active)

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-primary text-white"
                : "border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post: any) => (
            <PostCard key={post._id || post.slug?.current} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">
            Coming soon — we&apos;re working on our first stories.
          </p>
        </div>
      )}
    </section>
  )
}
