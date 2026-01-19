import { Link } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import '@/styles/f1-modern.css'

export default function HomePage() {
  return (
    <MainLayout>
      <div className="f1-page">
        {/* Hero Section */}
        <section className="f1-hero-section">
          {/* Logo/Title */}
          <div className="f1-hero-title-container">
            <h1 className="f1-hero-title">
              Pitline Corner
            </h1>
            <p className="f1-hero-subtitle">
              Votre Quartier Général
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="f1-hero-buttons">
            <Link
              to="/register"
              className="f1-hero-btn f1-hero-btn-primary"
            >
              Rejoindre la Course
            </Link>

            <Link
              to="/login"
              className="f1-hero-btn f1-hero-btn-outline"
            >
              Connexion Pilote
            </Link>
          </div>

          {/* Features */}
          <div className="f1-features-section">
            <div className="f1-feature-card">
              <div className="f1-feature-card-content">
                <div className="f1-feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3z"/>
                    <path d="M3 9h18"/>
                    <path d="M9 21V9"/>
                    <circle cx="15" cy="15" r="2"/>
                    <path d="M15 13v4"/>
                    <path d="M13 15h4"/>
                  </svg>
                </div>
                <h3 className="f1-feature-title">
                  Gestion de Course
                </h3>
                <p className="f1-feature-text">
                  Suivez chaque tour, analysez les performances et prenez les décisions qui mènent à la victoire.
                </p>
              </div>
            </div>

            <div className="f1-feature-card">
              <div className="f1-feature-card-content">
                <div className="f1-feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 9v6"/>
                    <path d="M9 12h6"/>
                  </svg>
                </div>
                <h3 className="f1-feature-title">
                  Stats en Temps Réel
                </h3>
                <p className="f1-feature-text">
                  Accédez aux données live, aux télemétries et aux stratégies de tous les pilotes.
                </p>
              </div>
            </div>

            <div className="f1-feature-card">
              <div className="f1-feature-card-content">
                <div className="f1-feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                    <path d="M12 3v12"/>
                    <circle cx="12" cy="21" r="1"/>
                    <path d="M12 15v6"/>
                    <path d="M8 21h8"/>
                  </svg>
                </div>
                <h3 className="f1-feature-title">
                  Classement Mondial
                </h3>
                <p className="f1-feature-text">
                  Competez avec les meilleurs pilotes et dominez le championnat du monde.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
