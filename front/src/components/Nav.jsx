import logo from '../assets/logoipsum-380.png'
import { Link,useLocation } from 'react-router-dom'


const style ={
 
  navItem:{
    height:'100%',

  }
}
function Nav() {
  const location = useLocation();

  // Check the current path
  const isHome = location.pathname === '/';
  return (
     <nav className={`nav ${isHome ? "home-nav":""}`}  >
        <Link  to="/" className="logo" >
          <img src={logo} alt="logo"  />
        </Link>
        <div className='nav-container'>
              <button className="toggle-nav" >
                <svg viewBox="0 0 100 100" width="200" height="200" >
                    <g stroke="#38BDF8" strokeWidth="6" strokeLinecap="round">
                    
                      <line x1="25" y1="35" x2="75" y2="35" />
                      

                      <line x1="25" y1="50" x2="75" y2="50" />
                    
                      <line x1="25" y1="65" x2="75" y2="65" />
                    </g>
              </svg>
              </button>
              <ul className="nav-items">
                  <li><Link to="/posts" >discover</Link></li>
                  <li><a href="#">about</a></li>
                  <li><a href="#">Contact</a></li>    
              </ul>
        </div>
    </nav>

  )
}

export default Nav