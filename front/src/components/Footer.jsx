import { Link } from 'react-router-dom'
import logo from '../assets/logoipsum-380.png'

const style = {
  footer: {
    width: '100%',
    backgroundColor: '#0F1123', // Deep midnight background
    backgroundImage: `
      radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 40%)
    `,
    color: '#fff',
    padding: '5rem 8% 3rem 8%',
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5rem',
    borderTop: '2px dashed rgba(56, 189, 248, 0.3)', // Funky dashed border line
    position: 'relative',
    overflow: 'hidden',
  },
  topSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '3rem',
  },
  brandColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    maxWidth: '380px',
  },
  logoWrapper: {
    display: 'inline-block',
    padding: '12px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '24px',
    border: '2px solid rgba(56, 189, 248, 0.4)',
    boxShadow: '0 0 25px rgba(56, 189, 248, 0.25), inset 0 0 10px rgba(168, 85, 247, 0.2)',
    transform: 'rotate(-2deg)', // Funky subtle tilt
    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    width: 'fit-content',
  },
  logo: {
    height: '75px', // Significantly larger logo
    width: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(56, 189, 248, 0.4))',
  },
  tagline: {
    color: '#CBD5E1',
    fontSize: '1.05rem',
    lineHeight: '1.6',
    margin: 0,
    fontWeight: '500',
  },
  linksGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  cardColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    padding: '1.75rem 2rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    minWidth: '160px',
  },
  heading: {
    background: 'linear-gradient(135deg, #38BDF8 0%, #A855F7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
  },
  link: {
    color: '#F1F5F9',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'lowercase',
    display: 'inline-block',
    transition: 'all 0.2s ease',
  },
  bottomSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.5rem',
    fontSize: '0.9rem',
    color: '#94A3B8',
  },
  copyright: {
    margin: 0,
    fontWeight: '500',
  },
  legalLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  badge: {
    background: 'linear-gradient(90deg, #FF7E5F, #FEB47B)',
    color: '#0F1123',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    marginLeft: '6px',
    verticalAlign: 'middle',
  }
}

function Footer() {
  return (
    <footer className="footer" style={style.footer}>
      {/* Injecting CSS for interactive hover states */}
      <style>{`
        .funky-logo-wrapper:hover {
          transform: rotate(2deg) scale(1.05) !important;
          border-color: #A855F7 !important;
          box-shadow: 0 0 35px rgba(168, 85, 247, 0.4) !important;
        }
        .funky-link:hover {
          color: #38BDF8 !important;
          transform: translateX(6px);
        }
      `}</style>

      {/* Upper Footer */}
      <div style={style.topSection}>
        <div style={style.brandColumn}>
          <Link to="/" className="funky-logo-wrapper" style={style.logoWrapper}>
            <img src={logo} alt="logo" style={style.logo} />
          </Link>
          <p style={style.tagline}>
            Ready for your next adventure? ✨ Explore forecasts, secret spots, and epic journeys! 🚀
          </p>
        </div>

        <div style={style.linksGroup}>
          {/* Navigation Card */}
          <div style={style.cardColumn}>
            <span style={style.heading}>Explore ⚡</span>
            <Link to="/posts" className="funky-link" style={style.link}>discover</Link>
            <a href="#" className="funky-link" style={style.link}>about</a>
            <a href="#" className="funky-link" style={style.link}>contact</a>
          </div>

          {/* Social Card */}
          <div style={style.cardColumn}>
            <span style={style.heading}>Hang Out ✌️</span>
            <a href="#" className="funky-link" style={style.link}>twitter / x</a>
            <a href="#" className="funky-link" style={style.link}>github</a>
            <a href="#" className="funky-link" style={style.link}>
              linkedin <span style={style.badge}>NEW</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={style.bottomSection}>
        <p style={style.copyright}>
          &copy; {new Date().getFullYear()} Your Company. Crafted with 💙 & playful vibes.
        </p>

        <div style={style.legalLinks}>
          <a href="#" className="funky-link" style={style.link}>privacy policy</a>
          <a href="#" className="funky-link" style={style.link}>terms of service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer