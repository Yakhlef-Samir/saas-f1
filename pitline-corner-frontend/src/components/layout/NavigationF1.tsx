import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import '@/styles/f1-modern.css'

export function NavigationF1() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Accueil', href: '/', icon: 'home' },
    { name: 'Race Library', href: '/library', icon: 'flag' },
    { name: 'Strategy Time Machine', href: '/strategy', icon: 'clock' },
    { name: 'Dashboard', href: '/dashboard', icon: 'chart', requiresAuth: true },
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      home: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      flag: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      clock: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      chart: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    }
    return icons[iconName] || icons.home
  }

  return (
    <nav className="f1-nav f1-nav-slide-down">
      <div className="f1-container f1-nav-container">
        {/* Logo */}
        <Link to="/" className="f1-nav-logo">
          <div className="f1-nav-logo-icon">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <span className="f1-nav-logo-text">Pitline Corner</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="f1-nav-links">
          {navigation.map((item) => {
            if (item.requiresAuth && !user) return null
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`f1-nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* User Actions */}
        <div className="f1-nav-actions">
          {user ? (
            <>
              <div className="f1-nav-user-info">
                <span className="f1-nav-user-welcome">Bienvenue,</span>
                <span className="f1-nav-user-email">{user.email}</span>
              </div>
              <button
                onClick={logout}
                className="f1-nav-btn f1-nav-btn-outline"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="f1-nav-btn f1-nav-btn-outline f1-hidden sm:f1-flex">
                  Connexion
                </button>
              </Link>
              <Link to="/register">
                <button className="f1-nav-btn f1-nav-btn-primary">
                  S'inscrire
                </button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="f1-nav-mobile-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="f1-nav-mobile-menu f1-nav-fade-in">
          <div className="f1-container">
            <div className="f1-nav-mobile-links">
              {navigation.map((item) => {
                if (item.requiresAuth && !user) return null
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`f1-nav-mobile-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getIcon(item.icon)}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
            
            {!user && (
              <div className="f1-nav-mobile-actions">
                <Link
                  to="/login"
                  className="f1-nav-mobile-action"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="f1-nav-mobile-action"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
