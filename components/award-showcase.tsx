import Image from "next/image"
import { companyInfo } from "@/lib/data"
import { AnimateIn } from "@/components/animate-in"

export function AwardShowcase() {
  const { award } = companyInfo

  return (
    <section className="relative overflow-hidden bg-secondary py-20 sm:py-28">
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('/images/paper-texture.webp')",
          backgroundSize: "512px 512px",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Left — Award image with warm glow */}
          <AnimateIn variant="fade-right" delay={0}>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                {/* Warm ambient glow behind the trophy */}
                <div
                  className="absolute inset-0 -m-8 rounded-full blur-[60px]"
                  style={{
                    background: "radial-gradient(circle, rgba(218,165,32,0.25) 0%, rgba(218,165,32,0.08) 50%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                {/* Secondary warm ring */}
                <div
                  className="absolute inset-0 -m-4 rounded-full blur-[30px]"
                  style={{
                    background: "radial-gradient(circle, rgba(255,200,60,0.15) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
                <Image
                  src={award.image}
                  alt={`${award.title} — ${award.event}`}
                  width={420}
                  height={420}
                  className="relative z-10 w-[280px] max-w-full rotate-[-2deg] rounded-lg shadow-2xl sm:w-[360px] md:w-[400px]"
                />
              </div>
            </div>
          </AnimateIn>

          {/* Right — Typography-forward copy */}
          <div className="text-center md:text-left">
            <AnimateIn variant="fade-up" delay={100}>
              <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.25em] text-amber-400/80">
                Recognition
              </p>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={200}>
              <h2 className="mt-4 font-[family-name:var(--font-drama)] text-3xl font-black italic leading-tight text-white sm:text-4xl lg:text-5xl">
                {award.title}
              </h2>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={300}>
              <p className="mt-4 font-[family-name:var(--font-heading)] text-base font-semibold text-white/70 sm:text-lg">
                {award.region} — {award.event}
              </p>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={400}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50 md:max-w-none">
                Recognized for excellence in commercial printing and design across Tanzania.
              </p>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={500}>
              <p className="mt-5 text-sm text-white/40">
                Awarded by{" "}
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400/70 underline decoration-amber-400/30 underline-offset-2 transition-colors hover:text-amber-400 hover:decoration-amber-400/60"
                >
                  {award.organization}
                </a>
              </p>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
