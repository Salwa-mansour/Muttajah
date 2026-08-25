import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../sanity/sanityClient'
import { urlFor } from '../utils/urlFor'

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage:any
  body: any

  locationDetails?: {
    countryName: string
    cityName: string
    lat: number
    lng: number
  }
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // GROQ Query to fetch post details + custom location object
    client
      .fetch(`*[_type == "post"]{ _id, title, slug,mainImage, locationDetails }`)
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading travel stories...</p>

  return (
    <div>
      <h1>Travel Stories</h1>
      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
        {posts.map((post) => (
          <article
            key={post._id}
            style={{
              padding: '1.25rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          >
            <h2>{post.title}</h2>

        {post.mainImage && post.mainImage.asset && (
        <img
          // Use urlFor to generate the source, define a width, and auto-format to WebP
          src={urlFor(post.mainImage).width(1200).height(600).url()}
          alt={post.title}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '12px',
            marginTop: '1.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        />
      )}

            {post.locationDetails && (
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
              </p>
            )}
            <Link
              to={`/post/${post._id}`}
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                color: '#2563eb',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Read Story →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}