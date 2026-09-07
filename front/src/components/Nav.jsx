import logo from '../assets/logoipsum-380.png'
import { Link } from 'react-router-dom'


const style ={
 
  navItem:{
    height:'100%',

  }
}
function Nav() {
  return (
     <nav className='nav' >
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