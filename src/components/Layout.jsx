import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { GB as EN, NL } from 'country-flag-icons/react/3x2'
import Footer from './Footer'
import './Layout.css'

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('en')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef(null)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const setLanguageTo = (lang) => {
    setLanguage(lang)
    setIsLanguageDropdownOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

          <div className={`navbar-center ${isMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-menu">
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
          
          <div className="navbar-right">
            <div className="language-toggle-wrapper" ref={languageDropdownRef}>
              <button
                className="language-toggle-btn"
                onClick={toggleLanguageDropdown}
                aria-label="Select language"
                aria-expanded={isLanguageDropdownOpen}
              >
                <span className="language-flag">
                  {language === 'en' ? <EN title="United Kingdom" className="w-8 rounded-md" /> : <NL title="Netherlands" className="w-8 rounded-md" />}
                </span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="language-dropdown">
                  <button
                    className={`language-option ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguageTo('en')}
                  >
                    <span className="language-option-flag"><EN title="United Kingdom" className="w-8 rounded-md" /></span>
                    <span className="language-option-text">English</span>
                  </button>
                  <button
                    className={`language-option ${language === 'nl' ? 'active' : ''}`}
                    onClick={() => setLanguageTo('nl')}
                  >
                    <span className="language-option-flag"><NL title="Netherlands" className="w-8 rounded-md" /></span>
                    <span className="language-option-text">Nederlands</span>
                  </button>
                </div>
              )}
            </div>
          </div>
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
