import { useRef } from 'react'
import   gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'                    
import '../css/home.css'
import heroImage from '../assets/johannes-plenio-bhCdwWNmXw8-unsplash.jpg'
import Features from '../components/Features'

// Register plugins outside the component
gsap.registerPlugin(ScrollTrigger, useGSAP)

function Home() {
  const containerRef = useRef()
   
  useGSAP(
    () => {
      // 1. Add body class
      document.body.classList.add('js-enabled')

      // 2. Setup ScrollTrigger Animation
  gsap.to('.sun-glow-wrapper', {
        opacity: 0.2,
        scale: 0.7,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
       //   markers: true,
        },
      })
    
      // 3. Return cleanup for non-GSAP side effects (like body class)
      return () => {
        document.body.classList.remove('js-enabled')
      }
    },
    { scope: containerRef } // Scopes selectors like .sun-glow-wrapper to this container
  )

  return (
    <>
    <div ref={containerRef}>
      <section className="hero">
        <div className="hero-image-wrapper">
          <img
            className="hero-image"
            src={heroImage}
            alt="Hero background visual"
          />

          <div className="sun-glow-wrapper">
            <div className="sun-shine"></div>
            <svg viewBox="0 0 100 100" className="sun-icon">
              <g strokeLinecap="round" strokeLinejoin="round">
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  className="sun-body"
                  fill="#FFDE59"
                  stroke="#FF914D"
                  strokeWidth="4"
                />

                <g className="sun-rays" stroke="#FF914D" strokeWidth="4">
                  <line x1="50" y1="19" x2="50" y2="28" />
                  <line x1="50" y1="72" x2="50" y2="81" />
                  <line x1="19" y1="50" x2="28" y2="50" />
                  <line x1="72" y1="50" x2="81" y2="50" />
                  <line x1="28" y1="28" x2="34" y2="34" />
                  <line x1="66" y1="66" x2="72" y2="72" />
                  <line x1="28" y1="72" x2="34" y2="66" />
                  <line x1="66" y1="34" x2="72" y2="28" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Website</h1>
          <h3>Discover the world with us and decide your next intended path</h3>
          <button className="hero-button">Start Discovering</button>
        </div>
      </section>
    </div>
    <Features/>
    </>
  )
}

export default Home