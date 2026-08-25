import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client } from '../sanity/sanityClient'
import { Post } from './Home'
import { PortableText } from '@portabletext/react'
import { customPortableTextComponents } from '../components/PortableTextComponents'
import { WeatherSection } from '../components/WeatherSection'
import { urlFor } from '../utils/urlFor'


interface WeatherData {
  temperature: number
  windspeed: number
  weathercode: number
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Fetch Post from Sanity
    client
    .fetch(`*[_type == "post" && _id == $id][0]{ _id, title, body, locationDetails, mainImage }`, { id })
      .then((data: Post) => {
        setPost(data)
        setLoading(false)

        // 2. Fetch Current Weather if coordinates exist
        if (data?.locationDetails?.lat && data?.locationDetails?.lng) {
          const { lat, lng } = data.locationDetails
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
          )
            .then((res) => res.json())
            .then((weatherRes) => {
              if (weatherRes.current_weather) {
                setWeather({
                  temperature: weatherRes.current_weather.temperature,
                  windspeed: weatherRes.current_weather.windspeed,
                  weathercode: weatherRes.current_weather.weathercode,
                })
              }
            })
            .catch(console.error)
        }
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading post...</p>
  if (!post) return <p>Post not found.</p>

  return (
    <div>
      <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
        ← Back to All Posts
      </Link>

      <h1 style={{ marginTop: '1rem' }}>{post.title}</h1>
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
      {/* Weather Widget Section */}
      {post.locationDetails && (
        <div
          style={{
            background: '#f8fafc',
            padding: '1rem',
            borderRadius: '8px',
            borderLeft: '4px solid #2563eb',
            margin: '1.5rem 0',
          }}
        >
          <h3 style={{ margin: 0 }}>
            Live Weather in {post.locationDetails.cityName}, {post.locationDetails.countryName}
          </h3>
          {weather ? (
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>
              🌡️ <strong>{weather.temperature}°C</strong> | 💨 Wind: {weather.windspeed} km/h
            </p>
          ) : (
            <p style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>Fetching weather data...</p>
          )}
        </div>
      )}
<WeatherSection/>
      <div style={{ lineHeight: '1.7', fontSize: '1.1rem', color: '#334155' }}>
        {post.body ? (
          <PortableText value={post.body} components={customPortableTextComponents} />
        ) : (
          <p>No content written yet.</p>
        )}
      </div>
    </div>
  )
}