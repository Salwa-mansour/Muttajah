import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../sanity/sanityClient'
import { Post } from './Home'
import { customPortableTextComponents } from '../components/PortableTextComponents'
import TripWeather from '../components/TripWeather'
import { urlFor } from '../utils/urlFor'

interface Location {
  lng: number
  lat: number
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && _id == $id][0]{ _id, title, body, locationDetails, mainImage }`,
        { id }
      )
      .then((data: Post) => {
        setPost(data)
        if (data?.locationDetails?.lat && data?.locationDetails?.lng) {
          setLocation(data.locationDetails)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p style={styles.statusText}>Loading post...</p>
  if (!post) return <p style={styles.statusText}>Post not found.</p>

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        ← Back to All Posts
      </Link>

      <h1 style={styles.title}>{post.title}</h1>

      {post.mainImage?.asset && (
        <img
          src={urlFor(post.mainImage).width(1200).height(600).url()}
          alt={post.title}
          style={styles.heroImage}
        />
      )}

      {location && <TripWeather location={location} />}

      <div style={styles.bodyContent}>
        {post.body ? (
          <PortableText value={post.body} components={customPortableTextComponents} />
        ) : (
          <p>No content written yet.</p>
        )}
      </div>
    </div>
  )
}

// ==========================================
// STYLES OBJECT
// ==========================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem',
  },
  backLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 500,
  },
  title: {
    marginTop: '1rem',
    color: '#0f172a',
    fontSize: '2.25rem',
    lineHeight: '1.2',
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginTop: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  bodyContent: {
    lineHeight: '1.7',
    fontSize: '1.1rem',
    color: '#334155',
    marginTop: '1.5rem',
  },
  statusText: {
    color: '#64748b',
    padding: '2rem',
    textAlign: 'center',
  },
}