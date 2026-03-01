interface PageHeroProps {
  title: string
  subtitle: string
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-secondary pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          {subtitle}
        </p>
        <h1 className="font-[family-name:var(--font-heading)] mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
          {title}
        </h1>
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
    </section>
  )
}
