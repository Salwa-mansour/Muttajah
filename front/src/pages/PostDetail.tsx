import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../sanity/sanityClient'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { Post } from './Posts'
import { customPortableTextComponents } from '../components/PortableTextComponents'
import {faList} from '@fortawesome/free-solid-svg-icons'
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

return (
    <section className="postDetail-container container">
      {loading ? (
        <p className="loading-text">Loading post...</p>
      ) : !post ? (
        <p className="error-text">Post not found.</p>
      ) : (
        <div className="main-wrapper">
          <Link to="/posts" className="back-link" title="Back to All Posts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="back-caret-icon"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>

          <article className="single-page-content">
            <header className="post-header" role="post header">
              {post.mainImage?.asset && (
                <figure className="main-img">
                  <img
                    src={urlFor(post.mainImage).width(1200).height(600).url()}
                    alt={post.title}
                  />
                </figure>
              )}
              <div className="post-header__data">
                <h1 className="post-title">{post.title}</h1>
                {post.locationDetails && (
                  <h6 className="location">
                    📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                  </h6>
                )}
              </div>
            </header>

            <div className="weather-quiery">
              <div className="weather-inline-wrapper">
                <div className="weather-summary-wrapper box">
                  <WeatherSummary weather={weather} />
                  <button
                    className="mobile-only-btn"
                    onClick={() => setIsPopOpen(true)}
                  >
                    <FontAwesomeIcon icon={faList} /> Show daily cast
                  </button>
                </div>
                <div className="datePicker-wrapper">
                  <WeatherDatePicker weather={weather} />
                </div>
                <div className="desktop-daily-cast box">
                  <DailyCast weather={weather} />
                </div>
              </div>

              <WeatherPop
                isOpen={isPopOpen}
                onClose={() => setIsPopOpen(false)}
                weather={weather}
              />
            </div>

            <div className="post">
              {post.body ? (
                <PortableText
                  value={post.body}
                  components={customPortableTextComponents}
                />
              ) : (
                <p>No content written yet.</p>
              )}
            </div>
          </article>
        </div>
      )}
    </section>
  )
}