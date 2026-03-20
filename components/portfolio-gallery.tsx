"use client"

import { useState } from "react"
import { urlFor } from "@/lib/sanity"

interface PortfolioItem {
  _id: string
  title: string
  category: string
  image: any
  client?: string
  description?: string
}

interface PortfolioGalleryProps {
  items: PortfolioItem[]
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [active, setActive] = useState("All")

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted-foreground">
          Our portfolio is being updated — check back soon.
        </p>
      </div>
    )
  }

  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))]
  const filtered = active === "All" ? items : items.filter((item) => item.category === active)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-primary text-white"
                : "border border-border bg-card text-muted-foreground hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item._id} className="group relative overflow-hidden rounded-xl">
            <img
              src={urlFor(item.image).width(600).height(450).url()}
              alt={item.image?.alt || item.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6 md:opacity-0 transition-opacity md:group-hover:opacity-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {item.category}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                {item.title}
              </h3>
              {item.client && (
                <p className="text-sm text-white/70">{item.client}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
