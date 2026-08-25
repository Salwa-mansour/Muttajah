import { PortableTextComponents } from '@portabletext/react'
import { createImageUrlBuilder } from '@sanity/image-url' 
import { client } from '../sanity/sanityClient'
import { urlFor } from '../utils/urlFor'

// Helper to build Sanity image CDN URLs
const builder = createImageUrlBuilder(client)

export const customPortableTextComponents: PortableTextComponents = {
  // Custom styling for standard block types (headings, blockquotes, etc.)
  block: {
    h1: ({ children }) => <h1 style={{ fontSize: '2rem', marginTop: '1.5rem' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '1.5rem', marginTop: '1.25rem', color: '#1e293b' }}>{children}</h2>,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem',  margin: '1rem 0' }}>
        {children}
      </blockquote>
    ),
  },

  // Custom styling for inline text decorators (bold, links)
  marks: {
    link: ({ value, children }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} target="_blank" rel={rel} style={{ color: '#2563eb', textDecoration: 'underline' }}>
          {children}
        </a>
      )
    },
  },

  // Custom embedded components (Images, Custom Objects)
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure style={{ margin: '1.5rem 0' }}>
          <img
            src={urlFor(value).width(800).auto('format').url()}
            alt={value.alt || 'Travel story photo'}
            style={{ width: '100%', borderRadius: '8px', height: 'auto' }}
          />
          {value.caption && (
            <figcaption style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}