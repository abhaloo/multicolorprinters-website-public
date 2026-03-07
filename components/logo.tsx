import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  /** Scale factor relative to base size. Default 1 = ~3rem tall */
  scale?: number
}

/* ── Ribbon geometry — stylised "M" ─────────────────────────────
 *
 * Three solid S-curve ribbons that collectively form the letter M.
 * Each ribbon bulges LEFTWARD at its bellies and returns RIGHT
 * at the waist, with tapered pointed tips at top and bottom.
 *
 * Key positions for a ribbon centred at tipX:
 *
 *        y=0   tip (pointed, at tipX)
 *              ↓
 *        y=20  belly — furthest LEFT, ribbon thickest
 *              ↓
 *        y=40  waist — back RIGHT, ribbon narrows
 *              ↓
 *        y=60  belly — furthest LEFT again
 *              ↓
 *        y=80  tip (pointed, at tipX)
 *
 * Width at belly: 6 units  |  Width at waist: 3 units
 * ─────────────────────────────────────────────────────────────── */

const SWING = 8       // leftward amplitude from tipX
const HW_BELLY = 3    // half-width at belly peaks
const HW_WAIST = 1.5  // half-width at waist

const RIBBONS = [
  { tipX: 12, color: "#2E338C" },    // left — blue
  { tipX: 19.5, color: "#F21D2F" },  // center — red
  { tipX: 27, color: "#2E338C" },    // right — blue
] as const

function ribbonPath(tipX: number): string {
  const t = tipX
  // Belly edges (leftward from tip)
  const br = t - SWING + HW_BELLY   // belly right edge
  const bl = t - SWING - HW_BELLY   // belly left edge
  // Waist edges (rightward, near tip)
  const wr = t + HW_WAIST           // waist right edge
  const wl = t - HW_WAIST           // waist left edge

  return [
    // Top tip
    `M${t},0`,
    // ── Right edge going down ──
    `C${t},0 ${br},12 ${br},20`,         // tip → first belly
    `C${br},28 ${wr},32 ${wr},40`,       // belly → waist
    `C${wr},48 ${br},52 ${br},60`,       // waist → second belly
    `C${br},68 ${t},80 ${t},80`,         // belly → bottom tip
    // ── Left edge going up (reversed) ──
    `C${t},80 ${bl},68 ${bl},60`,        // bottom tip → second belly
    `C${bl},52 ${wl},48 ${wl},40`,       // belly → waist
    `C${wl},32 ${bl},28 ${bl},20`,       // waist → first belly
    `C${bl},12 ${t},0 ${t},0`,           // belly → top tip
    `Z`,
  ].join(" ")
}

/* ── Component ──────────────────────────────────────────────────── */

export function Logo({ className, scale = 1 }: LogoProps) {
  const height = 3 * scale

  return (
    <div
      className={cn("flex items-center select-none", className)}
      style={{ gap: `${0.5 * scale}rem`, height: `${height}rem` }}
      aria-label="Multi-Color Printers — Quality Printing, Packaging & Stationery"
      role="img"
    >
      {/* ── "M" mark: three solid tapered S-wave ribbons ── */}
      <svg
        viewBox="0 0 30 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}rem`, width: `${height * 0.375}rem` }}
        shapeRendering="geometricPrecision"
        aria-hidden="true"
      >
        {RIBBONS.map((r, i) => (
          <path key={i} d={ribbonPath(r.tipX)} fill={r.color} />
        ))}
      </svg>

      {/* ── Right side: text stack + crosshair ── */}
      <div
        className="relative flex flex-col justify-center"
        style={{ minWidth: `${5.2 * scale}rem` }}
      >
        {/* Line 1: Multi-Color */}
        <span
          className="font-sans leading-none"
          style={{
            color: "#2E338C",
            fontWeight: 900,
            fontSize: `${0.82 * scale}rem`,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          Multi-Color
        </span>

        {/* Divider line — 1px */}
        <div
          style={{
            height: "1px",
            backgroundColor: "#2E338C",
            margin: `${0.1 * scale}rem 0`,
            width: "100%",
          }}
        />

        {/* Line 2: P R I N T E R S */}
        <span
          className="font-sans uppercase leading-none"
          style={{
            color: "#F21D2F",
            fontWeight: 400,
            fontSize: `${0.42 * scale}rem`,
            letterSpacing: "0.55em",
            lineHeight: 1,
            textAlign: "right",
          }}
        >
          Printers
        </span>

        {/* Line 3: Tagline */}
        <span
          className="font-sans italic leading-none"
          style={{
            color: "#F25764",
            fontSize: `${0.24 * scale}rem`,
            marginTop: `${0.12 * scale}rem`,
            lineHeight: 1,
            textAlign: "right",
          }}
        >
          &ldquo;Quality Printing, Packaging &amp; Stationery&rdquo;
        </span>

        {/* Crosshair — overlaps right side of text stack */}
        <svg
          viewBox="0 0 40 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            width: `${1.6 * scale}rem`,
            height: `${2.24 * scale}rem`,
            right: `${-0.65 * scale}rem`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          shapeRendering="geometricPrecision"
          aria-hidden="true"
        >
          {/* Semi-circle arc (right side) */}
          <path
            d="M14 6 A18 18 0 0 1 14 50"
            stroke="#2E338C"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Vertical tick at top */}
          <line
            x1="14" y1="0" x2="14" y2="10"
            stroke="#2E338C"
            strokeWidth="1.2"
          />
          {/* Horizontal crossbar through center */}
          <line
            x1="0" y1="28" x2="32" y2="28"
            stroke="#2E338C"
            strokeWidth="1.2"
          />
        </svg>

        {/* ® symbol */}
        <span
          className="absolute font-sans"
          style={{
            top: `${-0.1 * scale}rem`,
            right: `${-1.1 * scale}rem`,
            fontSize: `${0.3 * scale}rem`,
            fontWeight: 700,
            color: "#F21D2F",
            lineHeight: 1,
          }}
        >
          &reg;
        </span>
      </div>
    </div>
  )
}
