import {createClient, type ClientConfig} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

if (!projectId || projectId === 'replace-with-your-project-id') {
  console.warn(
    '\n⚠️  Sanity project ID not configured.\n' +
      '   Copy web/.env.example to web/.env and fill in your project ID.\n' +
      '   See the root README.md for setup instructions.\n',
  )
}

const config: ClientConfig = {
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2024-10-01',
  useCdn: true,
}

export const sanity = createClient(config)

const builder = imageUrlBuilder(config)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// Helper that returns the image URL, or a fallback path if the source
// is a plain string (useful while content is still being seeded).
export function imgUrl(source: any, fallback?: string): string | undefined {
  if (!source) return fallback
  if (typeof source === 'string') return source
  try {
    return urlFor(source).auto('format').url()
  } catch {
    return fallback
  }
}
