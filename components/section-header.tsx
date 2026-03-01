interface SectionHeaderProps {
  label: string
  heading: string
  centered?: boolean
  light?: boolean
}

export function SectionHeader({ label, heading, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {label}
      </p>
      <h2
        className={`font-[family-name:var(--font-heading)] mt-2 text-2xl font-bold md:text-3xl text-balance ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {heading}
      </h2>
    </div>
  )
}
