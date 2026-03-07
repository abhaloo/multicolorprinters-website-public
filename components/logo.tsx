import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  /** Scale factor relative to base size. Default 1 = ~3rem tall */
  scale?: number
  /** Use light variant (white text) for dark backgrounds */
  variant?: "light" | "dark"
}

export function Logo({ className, scale = 1, variant = "dark" }: LogoProps) {
  const baseSize = 3 // rem
  const height = baseSize * scale

  return (
    <div
      className={cn("flex items-center select-none", className)}
      style={{ gap: `${0.6 * scale}rem`, height: `${height}rem` }}
      aria-label="Multi-Color Printers - Quality Printing, Packaging & Stationery"
      role="img"
    >
      {/* Left graphic mark — three wavy S-curve ribbons */}
      <svg
        viewBox="0 0 40 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}rem`, width: `${height * 0.5}rem` }}
        aria-hidden="true"
      >
        {/* Left ribbon — blue */}
        <path
          d="M6 0 C6 0, 18 12, 18 20 C18 28, 6 32, 6 40 C6 48, 18 52, 18 60 C18 68, 6 80, 6 80"
          stroke="#2E338C"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Middle ribbon — red */}
        <path
          d="M20 0 C20 0, 32 12, 32 20 C32 28, 20 32, 20 40 C20 48, 32 52, 32 60 C32 68, 20 80, 20 80"
          stroke="#F21D2F"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right ribbon — blue */}
        <path
          d="M34 0 C34 0, 46 12, 46 20 C46 28, 34 32, 34 40 C34 48, 46 52, 46 60 C46 68, 34 80, 34 80"
          stroke="#2E338C"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Right side — text and crosshair */}
      <div className="relative flex flex-col justify-center" style={{ gap: 0 }}>
        {/* Line 1: Multi-Color */}
        <span
          className="font-sans leading-none"
          style={{
            color: variant === "light" ? "#FFFFFF" : "#2E338C",
            fontWeight: 900,
            fontSize: `${0.85 * scale}rem`,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Multi-Color
        </span>

        {/* Middle divider line with inline crosshair */}
        <div
          className="flex items-center"
          style={{ height: `${0.15 * scale}rem`, margin: `${0.08 * scale}rem 0` }}
        >
          {/* Horizontal line */}
          <div
            className="shrink-0"
            style={{
              flex: 1,
              height: `${0.1 * scale}rem`,
              minHeight: "1px",
              backgroundColor: variant === "light" ? "#FFFFFF" : "#2E338C",
            }}
          />
          {/* Crosshair inline */}
          <div className="relative shrink-0" style={{ marginLeft: `${-0.1 * scale}rem` }}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: `${1.2 * scale}rem`,
                height: `${1.2 * scale}rem`,
                display: "block",
              }}
              aria-hidden="true"
            >
              {/* Semi-circle arc (right half) */}
              <path
                d="M16 4 A12 12 0 0 1 16 28"
                stroke={variant === "light" ? "#FFFFFF" : "#2E338C"}
                strokeWidth="2"
                fill="none"
              />
              {/* Vertical tick at top */}
              <line
                x1="16" y1="0" x2="16" y2="8"
                stroke={variant === "light" ? "#FFFFFF" : "#2E338C"}
                strokeWidth="2"
              />
              {/* Horizontal line through center */}
              <line
                x1="0" y1="16" x2="28" y2="16"
                stroke={variant === "light" ? "#FFFFFF" : "#2E338C"}
                strokeWidth="2"
              />
            </svg>
            {/* Registered trademark symbol */}
            <span
              className="absolute font-sans font-bold"
              style={{
                top: `${-0.1 * scale}rem`,
                right: `${-0.4 * scale}rem`,
                fontSize: `${0.35 * scale}rem`,
                color: "#F21D2F",
                lineHeight: 1,
              }}
            >
              &reg;
            </span>
          </div>
        </div>

        {/* Line 2: P R I N T E R S */}
        <span
          className="font-sans uppercase leading-none"
          style={{
            color: "#F21D2F",
            fontWeight: 400,
            fontSize: `${0.55 * scale}rem`,
            letterSpacing: `${0.35 * scale}em`,
            lineHeight: 1.1,
            marginTop: `${0.05 * scale}rem`,
          }}
        >
          Printers
        </span>

        {/* Line 3: Tagline */}
        <span
          className="font-sans italic text-right leading-none"
          style={{
            color: "#F21D2F",
            fontSize: `${0.3 * scale}rem`,
            marginTop: `${0.15 * scale}rem`,
          }}
        >
          &ldquo;Quality Printing, Packaging &amp; Stationery&rdquo;
        </span>
      </div>
    </div>
  )
}
