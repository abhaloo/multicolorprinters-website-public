"use client"

import { useState } from "react"

const categories = ["All", "Digital", "Offset", "Design", "Packaging"]

type ImageProject = { title: string; category: string; image: string }
type GradientProject = { title: string; category: string; gradient: string }
type Project = ImageProject | GradientProject

const projects: Project[] = [
  { title: "Dnata Window Wrap", category: "Design", image: "/images/portfolio/dnata-window-wrap.webp" },
  { title: "ZNZ Boutique Menu", category: "Digital", image: "/images/portfolio/znz-boutique-single-sheet-menu.webp" },
  { title: "Tourism Brochure Series", category: "Digital", gradient: "from-secondary to-accent" },
  { title: "Annual Report 2024", category: "Offset", gradient: "from-primary to-[#F25764]" },
  { title: "Spice Brand Identity", category: "Design", gradient: "from-accent to-secondary" },
  { title: "Luxury Hotel Menu Set", category: "Digital", gradient: "from-[#F25764] to-primary" },
  { title: "Product Box Collection", category: "Packaging", gradient: "from-secondary to-[#F25764]" },
  { title: "Magazine Layout Design", category: "Design", gradient: "from-primary to-accent" },
  { title: "Conference Materials", category: "Offset", gradient: "from-accent to-[#F25764]" },
  { title: "Food Packaging Range", category: "Packaging", gradient: "from-[#F25764] to-secondary" },
  { title: "Wedding Invitation Suite", category: "Digital", gradient: "from-secondary to-primary" },
  { title: "Corporate Stationery", category: "Offset", gradient: "from-primary to-secondary" },
  { title: "Retail Display Boxes", category: "Packaging", gradient: "from-accent to-primary" },
  { title: "Event Poster Campaign", category: "Design", gradient: "from-[#F25764] to-accent" },
]

export function PortfolioGallery() {
  const [active, setActive] = useState("All")

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active)

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${active === cat
                ? "bg-primary text-white"
                : "bg-card text-muted-foreground border border-border hover:border-primary/30"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <div
            key={project.title}
            className="group relative overflow-hidden rounded-xl"
          >
            {"image" in project ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} transition-transform group-hover:scale-105`}
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6 md:opacity-0 transition-opacity md:group-hover:opacity-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {project.category}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
