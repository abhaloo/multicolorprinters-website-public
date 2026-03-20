export interface GoogleReview {
  authorName: string
  rating: number
  text: string
  relativeTimeDescription: string
  profilePhotoUrl?: string
  time: number
}

export interface GoogleReviewsData {
  reviews: GoogleReview[]
  overallRating: number
  totalReviews: number
  placeUrl: string
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) return null

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,url&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )

    if (!res.ok) return null

    const data = await res.json()
    if (data.status !== "OK" || !data.result) return null

    const reviews = (data.result.reviews || [])
      .filter((r: any) => r.rating >= 4 && r.text)
      .sort((a: any, b: any) => b.time - a.time)
      .slice(0, 5)
      .map((r: any) => ({
        authorName: r.author_name,
        rating: r.rating,
        text: r.text,
        relativeTimeDescription: r.relative_time_description,
        profilePhotoUrl: r.profile_photo_url,
        time: r.time,
      }))

    return {
      reviews,
      overallRating: data.result.rating || 0,
      totalReviews: data.result.user_ratings_total || 0,
      placeUrl: data.result.url || "",
    }
  } catch {
    return null
  }
}
