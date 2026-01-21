import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import '@/styles/f1-modern.css'

export default function StrategyPage() {
  const [selectedScenario, setSelectedScenario] = useState('overtake')
  const [selectedDriver, setSelectedDriver] = useState('ver')
  const [targetLap, setTargetLap] = useState(25)

  const scenarios = [
    {
      id: 'overtake',
      name: 'Simulation Dépassement',
      description: 'Analysez les meilleures opportunités de dépassement',
      icon: '🏁'
    },
    {
      id: 'pitstop',
      name: 'Stratégie Pit Stop',
      description: 'Optimisez le timing de vos arrêts au stand',
      icon: '🏎️'
    },
    {
      id: 'defend',
      name: 'Défense Position',
      description: 'Protégez votre position contre les attaques',
      icon: '🛡️'
    },
    {
      id: 'weather',
      name: 'Adaptation Météo',
      description: 'Ajustez votre stratégie aux conditions changeantes',
      icon: '🌧️'
    }
  ]

  const drivers = [
    { id: 'ver', name: 'Verstappen', team: 'Red Bull', number: 1 },
    { id: 'lec', name: 'Leclerc', team: 'Ferrari', number: 16 },
    { id: 'ham', name: 'Hamilton', team: 'Mercedes', number: 44 },
    { id: 'per', name: 'Perez', team: 'Red Bull', number: 11 },
    { id: 'sai', name: 'Sainz', team: 'Ferrari', number: 55 },
    { id: 'rus', name: 'Russell', team: 'Mercedes', number: 63 }
  ]

  return (
    <MainLayout>
      <div className="f1-page">
        <div className="f1-strategy-page">
          {/* Hero Section */}
          <section className="f1-strategy-hero">
            <div className="f1-strategy-hero-content">
              <h1 className="f1-strategy-hero-title">
                Strategy Time Machine
              </h1>
              <p className="f1-strategy-hero-subtitle">
                Voyagez dans le temps pour optimiser vos stratégies de course
              </p>
            </div>
          </section>

          {/* Strategy Selection */}
          <section className="f1-strategy-selection">
            <div className="f1-strategy-container">
              <h2 className="f1-strategy-section-title">
                Choisissez votre Scénario
              </h2>
              
              <div className="f1-strategy-scenarios">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`f1-strategy-scenario-card ${selectedScenario === scenario.id ? 'active' : ''}`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <div className="f1-strategy-scenario-icon">
                      {scenario.icon}
                    </div>
                    <h3 className="f1-strategy-scenario-title">
                      {scenario.name}
                    </h3>
                    <p className="f1-strategy-scenario-description">
                      {scenario.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Configuration */}
          <section className="f1-strategy-config">
            <div className="f1-strategy-container">
              <h2 className="f1-strategy-section-title">
                Configuration de la Simulation
              </h2>
              
              <div className="f1-strategy-config-grid">
                {/* Driver Selection */}
                <div className="f1-strategy-config-card">
                  <h3 className="f1-strategy-config-title">
                    Pilote Sélectionné
                  </h3>
                  <div className="f1-strategy-driver-grid">
                    {drivers.map((driver) => (
                      <div
                        key={driver.id}
                        className={`f1-strategy-driver-card ${selectedDriver === driver.id ? 'active' : ''}`}
                        onClick={() => setSelectedDriver(driver.id)}
                      >
                        <div className="f1-strategy-driver-number">
                          {driver.number}
                        </div>
                        <div className="f1-strategy-driver-info">
                          <div className="f1-strategy-driver-name">
                            {driver.name}
                          </div>
                          <div className="f1-strategy-driver-team">
                            {driver.team}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lap Selection */}
                <div className="f1-strategy-config-card">
                  <h3 className="f1-strategy-config-title">
                    Tour Cible
                  </h3>
                  <div className="f1-strategy-lap-config">
                    <div className="f1-strategy-lap-slider">
                      <input
                        type="range"
                        min="1"
                        max="70"
                        value={targetLap}
                        onChange={(e) => setTargetLap(Number(e.target.value))}
                        className="f1-strategy-slider"
                      />
                    </div>
                    <div className="f1-strategy-lap-display">
                      <span className="f1-strategy-lap-number">
                        Tour {targetLap}
                      </span>
                      <span className="f1-strategy-lap-total">
                        / 70
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Simulation Results */}
          <section className="f1-strategy-results">
            <div className="f1-strategy-container">
              <h2 className="f1-strategy-section-title">
                Résultats de Simulation
              </h2>
              
              <div className="f1-strategy-results-grid">
                <div className="f1-strategy-result-card">
                  <div className="f1-strategy-result-header">
                    <h3 className="f1-strategy-result-title">
                      Position Actuelle
                    </h3>
                    <div className="f1-strategy-result-value">
                      P5
                    </div>
                  </div>
                  <div className="f1-strategy-result-details">
                    <div className="f1-strategy-result-detail">
                      <span className="f1-strategy-detail-label">Temps au tour:</span>
                      <span className="f1-strategy-detail-value">1:23.456</span>
                    </div>
                    <div className="f1-strategy-result-detail">
                      <span className="f1-strategy-detail-label">Écart au leader:</span>
                      <span className="f1-strategy-detail-value">+12.345s</span>
                    </div>
                  </div>
                </div>

                <div className="f1-strategy-result-card highlight">
                  <div className="f1-strategy-result-header">
                    <h3 className="f1-strategy-result-title">
                      Position Prédite
                    </h3>
                    <div className="f1-strategy-result-value success">
                      P3
                    </div>
                  </div>
                  <div className="f1-strategy-result-details">
                    <div className="f1-strategy-result-detail">
                      <span className="f1-strategy-detail-label">Gain:</span>
                      <span className="f1-strategy-detail-value success">+2 positions</span>
                    </div>
                    <div className="f1-strategy-result-detail">
                      <span className="f1-strategy-detail-label">Confiance:</span>
                      <span className="f1-strategy-detail-value">85%</span>
                    </div>
                  </div>
                </div>

                <div className="f1-strategy-result-card">
                  <div className="f1-strategy-result-header">
                    <h3 className="f1-strategy-result-title">
                      Recommandation
                    </h3>
                    <div className="f1-strategy-result-icon">
                      🏁
                    </div>
                  </div>
                  <div className="f1-strategy-result-details">
                    <div className="f1-strategy-recommendation">
                      <p>
                        Dépassement conseillé au virage 3. 
                        Utilisez l'aileron arrière DRS activé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="f1-strategy-actions">
            <div className="f1-strategy-container">
              <div className="f1-strategy-buttons">
                <button className="f1-strategy-btn f1-strategy-btn-primary">
                  Lancer la Simulation
                </button>
                <button className="f1-strategy-btn f1-strategy-btn-outline">
                  Exporter les Résultats
                </button>
                <Link to="/dashboard" className="f1-strategy-btn f1-strategy-btn-outline">
                  Retour au Dashboard
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
