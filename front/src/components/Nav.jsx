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
        <ul className="nav-items">
            <li><Link to="/posts" >discover</Link></li>
            <li><a href="#">about</a></li>
            <li><a href="#">Contact</a></li>    
        </ul>
    </nav>

  )
}

export default Nav