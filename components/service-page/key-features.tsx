import {
  Palette, Layout, Image, FileCheck, Layers, Zap, Users, FileText,
  BarChart3, Paintbrush, Sparkles, Repeat, BookOpen, Box, Shield,
  Package, Maximize2, Sun, Eye, Truck, Shirt, Ruler, Heart, Tag,
  Droplets, QrCode, Scissors, DollarSign, CircleDot,
  type LucideIcon,
} from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { SectionHeader } from "@/components/section-header"

const iconMap: Record<string, LucideIcon> = {
  Palette, Layout, Image, FileCheck, Layers, Zap, Users, FileText,
  BarChart3, Paintbrush, Sparkles, Repeat, BookOpen, Box, Shield,
  Package, Maximize2, Sun, Eye, Truck, Shirt, Ruler, Heart, Tag,
  Droplets, QrCode, Scissors, DollarSign,
}

interface Feature {
  icon: string
  title: string
  description: string
}

interface KeyFeaturesProps {
  features: Feature[]
}

export function KeyFeatures({ features }: KeyFeaturesProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <SectionHeader label="What we offer" heading="Key Features" />
        </AnimateIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || CircleDot
            return (
              <AnimateIn key={index} variant="fade-up" delay={100 * index}>
                <div className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
