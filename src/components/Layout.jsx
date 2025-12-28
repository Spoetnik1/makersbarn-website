import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import './Layout.css'

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/tmb-logo.webp" alt="Maker's Barn" className="navbar-logo-img" />
          </Link>
          
          <button 
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="navbar-item">
              <Link 
                to="/" 
                className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/about" 
                className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/accommodation" 
                className={`navbar-link ${isActive('/accommodation') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Accommodation
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/contact" 
                className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout
