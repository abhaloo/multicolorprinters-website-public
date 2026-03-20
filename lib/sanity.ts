import { createClient } from "next-sanity"
import { createImageUrlBuilder } from "@sanity/image-url"
import { apiVersion, dataset, projectId } from "@/sanity/env"

const isSanityConfigured = !!projectId

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null

const builder = isSanityConfigured && client ? createImageUrlBuilder({ projectId, dataset }) : null

export function urlFor(source: any) {
  if (!builder) {
    // Return a chainable stub that resolves to a placeholder
    const stub = {
      url: () => "/images/placeholder.webp",
      width: () => stub,
      height: () => stub,
      fit: () => stub,
      auto: () => stub,
      format: () => stub,
      quality: () => stub,
      image: () => stub,
    }
    return stub
  }
  return builder.image(source)
}

// Blog queries
export async function fetchAllPosts() {
  if (!client) return []
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, coverImage, category, author, publishedAt
    }`
  )
}

export async function fetchPostBySlug(slug: string) {
  if (!client) return null
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, category, author, body, publishedAt
    }`,
    { slug }
  )
}

export async function fetchPostSlugs() {
  if (!client) return []
  return client.fetch(`*[_type == "post"].slug.current`)
}

export async function fetchRelatedPosts(category: string, currentId: string) {
  if (!client) return []
  return client.fetch(
    `*[_type == "post" && category == $category && _id != $currentId] | order(publishedAt desc) [0...3] {
      _id, title, slug, excerpt, coverImage, category, publishedAt
    }`,
    { category, currentId }
  )
}

// Portfolio queries
export async function fetchPortfolioItems() {
  if (!client) return []
  return client.fetch(
    `*[_type == "portfolio"] | order(order asc, _createdAt desc) {
      _id, title, slug, category, image, client, description, featured
    }`
  )
}

// Job queries
export async function fetchOpenJobs() {
  if (!client) return []
  return client.fetch(
    `*[_type == "job" && isOpen == true] | order(publishedAt desc) {
      _id, title, slug, department, type, description, requirements, publishedAt
    }`
  )
}
