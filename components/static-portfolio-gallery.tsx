"use client"

import { useState } from "react"

const staticItems = [
  {
    id: "1",
    title: "Dnata Window Wrap",
    category: "Large Format",
    image: "/images/portfolio/dnata-window-wrap.webp",
    client: "Dnata",
  },
  {
    id: "2",
    title: "ZNZ Boutique Hotel Menu",
    category: "Digital Printing",
    image: "/images/portfolio/znz-boutique-single-sheet-menu.webp",
    client: "ZNZ Boutique Hotel",
  },
  {
    id: "3",
    title: "Corporate Diaries",
    category: "Offset Printing",
    image: "/images/portfolio/diaries.webp",
  },
]

export function StaticPortfolioGallery() {
  const [active, setActive] = useState("All")

  const categories = ["All", ...Array.from(new Set(staticItems.map((item) => item.category)))]
  const filtered = active === "All" ? staticItems : staticItems.filter((item) => item.category === active)

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
          <div key={item.id} className="group relative overflow-hidden rounded-xl">
            <img
              src={item.image}
              alt={item.title}
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
