import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../sanity/sanityClient'
import { urlFor } from '../utils/urlFor'
// import '/css/index.css'

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

export default function Posts() {
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
   <> 
  <section className='posts-container container'>
  {posts.map((post) => (
        <article   key={post._id} className='item-card' >
            <figure className='post-img'>
              {post.mainImage && post.mainImage.asset && (
                <img
                  // Use urlFor to generate the source, define a width, and auto-format to WebP
                  src={urlFor(post.mainImage).width(1200).height(600).url()}
                  alt={post.title}
                
                />
              )}
            </figure>
               <div className='card-info'>
                  {post.locationDetails && (
                        <h6 className='location' >
                          📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                        </h6>
                      )}
                  <h3 className='post-title'>
                      {post.title}
                  </h3>
                  <p className='post-desc'>
                      post descrtion
                  </p>
                  <Link   to={`/post/${post._id}`} title='read more' className='card-link' ></Link>
            </div>{/*card-info */}
            
        </article>
        ))}
</section>
     {/* <div>
      <h1>Travel Stories</h1>
      <div >
        {posts.map((post) => (
          <article
            key={post._id}
           
          >
            <h2>{post.title}</h2>

        {post.mainImage && post.mainImage.asset && (
        <img
          // Use urlFor to generate the source, define a width, and auto-format to WebP
          src={urlFor(post.mainImage).width(1200).height(600).url()}
          alt={post.title}
        
        />
      )}

            {post.locationDetails && (
              <p >
                📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
              </p>
            )}
            <Link
              to={`/post/${post._id}`}
             
            >
              Read Story →
            </Link>
          </article>
        ))}
      </div>
    </div> */}
      </>
  )}
