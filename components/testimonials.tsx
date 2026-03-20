import { Star } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"
import type { GoogleReviewsData } from "@/lib/google-reviews"

const fallbackTestimonials = [
  {
    quote: "Multi Color Printers transformed our brand materials. The quality of their offset printing is unmatched in Zanzibar. Highly recommend!",
    name: "Ahmed Hassan",
    role: "Hotel General Manager",
    rating: 5,
  },
  {
    quote: "Fast turnaround and exceptional attention to detail. They handled our entire packaging redesign flawlessly.",
    name: "Fatma Ali",
    role: "Product Manager, Spice Co.",
    rating: 5,
  },
  {
    quote: "We've been using Multi Color for over 5 years. Consistent quality, fair pricing, and a team that truly cares about your project.",
    name: "James Mwangi",
    role: "Marketing Director",
    rating: 5,
  },
]

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

interface TestimonialsProps {
  googleReviews?: GoogleReviewsData | null
}

export function Testimonials({ googleReviews }: TestimonialsProps) {
  const hasGoogleReviews = googleReviews && googleReviews.reviews.length > 0

  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <SectionHeader
            label="Testimonials"
            heading="What Our Clients Say"
          />
        </AnimateIn>

        {hasGoogleReviews && (
          <AnimateIn>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <GoogleIcon className="h-5 w-5" />
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-lg font-bold text-foreground">
                  {googleReviews.overallRating.toFixed(1)}
                </span>
                <StarRating rating={Math.round(googleReviews.overallRating)} />
                <span>
                  stars on Google &middot; {googleReviews.totalReviews} reviews
                </span>
              </div>
              <a
                href={googleReviews.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-medium text-primary underline-offset-4 hover:underline"
              >
                View on Google
              </a>
            </div>
          </AnimateIn>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {hasGoogleReviews
            ? googleReviews.reviews.map((review, index) => (
                <AnimateIn key={review.authorName + review.time} variant="fade-up" delay={index * 100}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <QuoteIcon className="mb-3 h-8 w-8 text-primary/15" />

                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {review.text}
                    </p>

                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                      {review.profilePhotoUrl ? (
                        <img
                          src={review.profilePhotoUrl}
                          alt={review.authorName}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                          {review.authorName.split(" ").map(n => n[0]).join("")}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-foreground">
                          {review.authorName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {review.relativeTimeDescription}
                        </p>
                      </div>
                      <div className="ml-auto flex shrink-0 items-center gap-1.5">
                        <StarRating rating={review.rating} />
                        <GoogleIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))
            : fallbackTestimonials.map((t, index) => (
                <AnimateIn key={t.name} variant="fade-up" delay={index * 100}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <QuoteIcon className="mb-3 h-8 w-8 text-primary/15" />

                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t.quote}
                    </p>

                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-foreground">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{t.role}</p>
                      </div>
                      <div className="ml-auto flex shrink-0 gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
        </div>
      </div>
    </section>
  )
}
