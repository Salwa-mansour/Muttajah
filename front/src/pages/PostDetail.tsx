import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../sanity/sanityClient'
import { Post } from './Posts'
import { customPortableTextComponents } from '../components/PortableTextComponents'
import TripWeather from '../components/TripWeather'
import { urlFor } from '../utils/urlFor'
import '../css/postDetail.css'
import { LocationCoords, useTripWeather } from '../hooks/useTripWeather'
import { WeatherDatePicker, WeatherSummary, DailyCast } from '../components/TripWeatherComponents'
import WeatherPop from '../components/WeatherPop'

interface Location {
  lng: number
  lat: number
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<Location | null>(null)
  const weather = useTripWeather(location!)
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false)
  console.log(location)

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

  if (loading) return <p >Loading post...</p>
  if (!post) return <p >Post not found.</p>

  return (
    <section className='postDetail-container container' >
      <div className='main-wrapper' >
         <Link to="/" className='back-link'>
              ← Back to All Posts
           </Link>

      <article className='single-page-content'>
          <header className='post-header' role='post header'>
                {post.mainImage?.asset && (
                  <figure className='main-img'>
                      <img
                        src={urlFor(post.mainImage).width(1200).height(600).url()}
                        alt={post.title}
                    
                      />
                  </figure>
                )}
                   <div className='post-header__data'>
                    <h1 className='post-title'>{post.title}</h1>
                      {post.locationDetails && (
                          <h6 className='location' >
                            📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                          </h6>
                        )}
                    </div>{/*post-header__data */}
            </header>
          <div className='weather-quiery'>
           {/* Mobile Drawer Trigger */}
                  <button className="mobile-only-btn" onClick={() => setIsPopOpen(true)}>
                    🌤️ Open Weather Details
                  </button>

                  {/* INLINE / DESKTOP VIEW */}
                  <div className="weather-inline-wrapper">
                    <WeatherDatePicker weather={weather} />
                    <WeatherSummary weather={weather} />
                    
                    {/* Hidden on mobile via CSS rules, visible on desktop */}
                    <div className="desktop-daily-cast">
                      <DailyCast weather={weather} />
                    </div>
                  </div>

                  {/* MOBILE POP / DRAWER */}
                  <WeatherPop 
                    isOpen={isPopOpen} 
                    onClose={() => setIsPopOpen(false)} 
                    weather={weather} 
                  />
          </div>{/*weather-quiery */}
            <div className='post'>
              {post.body ? (
                <PortableText value={post.body} components={customPortableTextComponents} />
              ) : (
                <p>No content written yet.</p>
              )}
            </div>
         </article>
       </div>{/*main-wrapper */}
    </section>
  )
}
