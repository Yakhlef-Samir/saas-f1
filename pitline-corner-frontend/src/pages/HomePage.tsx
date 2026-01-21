import { Link } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import '@/styles/f1-modern.css'

export default function HomePage() {
  return (
    <MainLayout>
      <div className="f1-min-h-screen f1-bg-gray-50">
        {/* Hero Section */}
        <div className="f1-hero">
          <div className="f1-container">
            <div className="f1-hero-content f1-fade-in">
              <div className="f1-badge">F1 RACE LIBRARY</div>
              <h1 className="f1-title">
                <span className="f1-title-gradient">Explorez les Courses F1</span>
              </h1>
              <p className="f1-subtitle">
                Accédez à toutes les courses de Formule 1 avec analyses stratégiques détaillées, 
                données de performance et simulations de courses.
              </p>
              <div className="f1-buttons">
                <Link
                  to="/register"
                  className="f1-btn f1-btn-primary"
                >
                  Explorer les courses
                </Link>
                <Link
                  to="/login"
                  className="f1-btn f1-btn-secondary"
                >
                  Voir les statistiques
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="f1-stats">
          <div className="f1-container">
            <div className="f1-stats-grid">
              {/* Feature 1 */}
              <div className="f1-stat-card f1-transform">
                <div className="f1-stat-content">
                  <h3 className="number-red">Stratégie Avancée</h3>
                  <p>Analyse IA des courses
                    <br />
                    recommandations en temps réel</p>
                </div>
                <div className="f1-stat-icon red">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="f1-stat-card f1-transform">
                <div className="f1-stat-content">
                  <h3 className="number-green">Performance Live</h3>
                  <p>Télemétrie en direct 
                    <br />
                    suivi des pilotes professionnels</p>
                </div>
                <div className="f1-stat-icon green">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="f1-stat-card f1-transform">
                <div className="f1-stat-content">
                  <h3 className="number-amber">Communauté Elite</h3>
                  <p>Compétitions exclusives 
                    <br />
                    classements mondiaux</p>
                </div>
                <div className="f1-stat-icon amber">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="f1-filters">
          <div className="f1-container">
            <div className="text-center">
              <h2 className="f1-section-title">Prêt à Dompter la Piste?</h2>
              <p className="f1-text-gray-600 mb-8">
                Rejoignez des milliers de passionnés et transformez votre passion en performance
              </p>
              <div className="f1-buttons justify-center">
                <Link
                  to="/register"
                  className="f1-btn f1-btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  Commencer Gratuitement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
