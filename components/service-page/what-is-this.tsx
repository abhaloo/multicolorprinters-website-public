import { AnimateIn } from "@/components/animate-in"

interface WhatIsThisProps {
  title: string
  description: string[]
}

export function WhatIsThis({ title, description }: WhatIsThisProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground md:text-3xl">
            What is {title}?
          </h2>
        </AnimateIn>

        <div className="mt-6 space-y-4">
          {description.map((paragraph, index) => (
            <AnimateIn key={index} variant="fade-up" delay={100 * (index + 1)}>
              <p className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
