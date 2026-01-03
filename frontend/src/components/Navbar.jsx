import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, user, logout } = useResume()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Don't show navbar on landing page
  if (location.pathname === '/') {
    return null
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📄</span>
          <span className="brand-text">ResumeBuilder</span>
        </Link>

        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/builder" className="nav-link">
                Builder
              </Link>
              <div className="user-section">
                <span className="user-name">
                  👤 {user?.username || 'User'}
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
