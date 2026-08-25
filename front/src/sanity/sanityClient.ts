import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url' // Use named import

export const client = createClient({
  projectId: 't3n0rxcc',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-08-01',
})

// Initialize builder using createImageUrlBuilder
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}