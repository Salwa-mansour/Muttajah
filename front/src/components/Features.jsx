
import { useRef } from 'react'
import   gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'                   
import featrue_1_img from '../assets/stephen-crane-hPuCMQLiZ8U-unsplash.jpg'
import featrue_3_img from '../assets/soma-laszlo-rt4SRyA29TE-unsplash.jpg'
import featrue_2_img from '../assets/david-becker-6BPmpe2o1aw-unsplash.jpg'
import featrue_4_img from '../assets/stanislav-margolin-CRmUtjJE3nM-unsplash.jpg'
import featrue_5_img from '../assets/compagnons-z2_GyXqzOcE-unsplash.jpg'
import '../css/features.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

function Features() {
     const containerRef = useRef()
   
        useGSAP(
            () => {
            // Create a GSAP MatchMedia instance
            const mm = gsap.matchMedia();

            // Add conditions for Mobile and Desktop
            mm.add(
                {
                    isDesktop: '(min-width: 768px)',
                    isMobile: '(max-width: 767px)',
                },
                (context) => {
                // Destructure boolean conditions
                const { isDesktop } = context.conditions;

                    if (isDesktop) {
                        desktopAnimations()
                    } else {
                        mobileAnimations()
                    }
                });
            
            },
            { scope: containerRef } // Scopes selector queries automatically
        );


    // Define mobile animations inside or access scoped queries via gsap.utils.toArray
  const mobileAnimations = () => {
    // Select all feature cards scoped within containerRef
  const featureCards = gsap.utils.toArray('.feature', containerRef.current)

    featureCards.forEach((card) => {
      gsap.from(card, {
        y: 60,               // Slide up from 60px below
        opacity: 0.5,
        scale: 0.5,
        rotate: 15,
        duration: 0.7,
        ease: 'elastic.out(1, 0.75)',
        scrollTrigger: {
          trigger: card,     // Individual trigger for each card
          start: 'top 95%',  // Starts animation when card top reaches 85% of viewport
          toggleActions: 'play none none reverse', // Plays on enter, reverses on scrolling back up
          
        },
      });
    });

    // 2. Motion Path Scroll Timeline (Sun & Cloud follow the path on scroll)
  const pathTl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current, // Pin or track progress across the entire section
     start: 'top 50%',        // Starts when top of section hits top of viewport
     end: 'bottom bottom',    // Extends scroll distance across the whole section height
     scrub: 1,
      markers:true
    },
  })

  // Move the Sun from start to end along the curve path
  pathTl.to(
    '.sun-icon-item',
    {
      motionPath: {
        path: '#linerPath',
        align: '#linerPath',
        alignOrigin: [0.5, 0.5], // Center icon on path
        autoRotate: false,
      },
      ease: 'none',
    },
    0 // Starts at timeline position 0
  )

  // Move the Cloud slightly offset along the path
  pathTl.to(
    '.cloud-icon-item',
    {
      motionPath: {
        path: '#linerPath',
        align: '#linerPath',
        alignOrigin: [0.5, 0.5],
        start: 0.1, // Offset start position on path (10% ahead)
        end: 1,
        autoRotate: false,
      },
      ease: 'none',
    },
    0 // Runs concurrently with the sun animation
  )

  };
    const desktopAnimations = ()=>{
        console.log('desktop animations')
    }




  return (
    <>
    <section className="features" ref={containerRef} >
    <div className="section-headeing">
        <h1>featers</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quae.</p>
    </div>
     <div className="background">
    <svg width="50" height="1750" viewBox="0 0 50 1750" xmlns="http://www.w3.org/2000/svg" className="line-path">
        <path 
    id="linerPath" 
    d="M 25 50 L 25 1700" 
    stroke="#afaeac" 
    strokeWidth="4" 
    strokeDasharray="12 12" 
    strokeLinecap="round" 
  />
</svg>
    <svg  viewBox="0 0 1021 1750" fill="none" xmlns="http://www.w3.org/2000/svg" className="curve-path">
      <path id="weatherPath" d="M869.51 4.98096C869.51 4.98096 92.2848 72.8008 46.5095 431.981C-6.4157 847.264 1011.9 471.855 1015.51 890.481C1019.21 1319.64 1.40592 893.322 5.00955 1322.48C8.60041 1750.12 1015.51 1744.48 1015.51 1744.48" stroke="#afaeac"  strokeWidth="10" strokeDasharray="36 36"></path>
    </svg>

    <div className="path-container sun-icon-item">
      <svg viewBox="0 0 100 100" width="200" height="200" className=" icon-path sun-path">
        <g strokeLinecap="round" strokeLinejoin="round">
           {/* Sun Core  */}
          <circle cx="50" cy="50" r="18" className="sun-body" fill="#FFDE59" stroke="#FF914D" strokeWidth="4" />
          
     {/* Rays (Now closer to the circle: 22px to 31px radius)  */}
          <g className="sun-rays" stroke="#FF914D" strokeWidth="4">
             <line x1="50" y1="19" x2="50" y2="28" /> {/* Top  */}
            <line x1="50" y1="72" x2="50" y2="81" /> {/* Bottom */}
            <line x1="19" y1="50" x2="28" y2="50" />  {/*Left */}
            <line x1="72" y1="50" x2="81" y2="50" /> {/* Right */}
            <line x1="28" y1="28" x2="34" y2="34" /> {/* Top-Left */}
            <line x1="66" y1="66" x2="72" y2="72" /> {/* Bottom-Right */}
            <line x1="28" y1="72" x2="34" y2="66" /> {/* Bottom-Left */}
            <line x1="66" y1="34" x2="72" y2="28" /> {/* Top-Right */}
          </g>
        </g>
      </svg>
    </div>

    
   {/* 1. The Cloud (Follows the motion path)  */}
  <div className="path-container cloud-icon-item">
    <svg viewBox="0 0 100 100" width="200" height="200" className="icon-path cloud-path">
      <path d="M 25,45 A 12,12 0 0,1 25,21 A 16,16 0 0,1 55,13 A 14,14 0 0,1 75,45 Z" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="4"/>
    </svg>

    <svg viewBox="0 0 100 100" width="200" height="200" className="icon-path rain-path">
     
       <g stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round">
       Column 1 (Left) 
      <line x1="26" y1="53" x2="24" y2="58" />
      <line x1="23" y1="65" x2="21" y2="70" />
      <line x1="20" y1="77" x2="18" y2="82" />

       Column 2 
      <line x1="41" y1="53" x2="39" y2="58" />
      <line x1="37" y1="66" x2="35" y2="71" />
      <line x1="33" y1="79" x2="31" y2="84" />

       Column 3 
      <line x1="56" y1="52" x2="54" y2="57" />
      <line x1="52" y1="64" x2="50" y2="69" />
      <line x1="48" y1="76" x2="46" y2="81" />

       Column 4 (Right) 
      <line x1="71" y1="54" x2="69" y2="59" />
      <line x1="67" y1="67" x2="65" y2="72" />
      <line x1="63" y1="80" x2="61" y2="85" />
    </g>
      
    </svg>
  </div>

   
  </div>  {/*Properly close background wrapper here */}
    <div className='features-container'>
   {/* Feature cards sit inside .features alongside .background  */}
  <div className="feature sunny-feature">
    <img src={featrue_1_img} alt="Feature 1" width="300" />
    <div className="feature-content">
      <h2>Feature 1</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  <div className="feature cloud-sun-feature">
    <img src={featrue_2_img} alt="Feature 2" width="300" />
    <div className="feature-content">
      <h2>Feature 2</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  <div className="feature cloudy-feature">
    <img src={featrue_3_img} alt="Feature 3" width="300" />
    <div className="feature-content">
      <h2>Feature 3</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  <div className="feature rainy-feature">
    <img src={featrue_4_img} alt="Feature 4" width="300" />
    <div className="feature-content">
      <h2>Feature 4</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  <div className="feature snowy-feature">
    <img src={featrue_5_img} alt="Feature 5" width="300" />
    <div className="feature-content">
      <h2>Feature 5</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>
</div>{/* end-features-container */}
      <div className="bg-overlays">
       Gradient Layers 
      <div className="bg-gradient sun-bg"></div>
      <div className="bg-gradient cloudy-bg"></div>
      <div className="bg-gradient rainy-bg"></div>
      <div className="bg-gradient snowy-bg"></div>


    </div>
    <div className="motion-background">
        <div id="rain-lottie-container" className="lottie-bg"></div>
      <div id="snow-lottie-container" className="lottie-bg"></div>
    </div>
</section>
    </>
  )
}

export default Features