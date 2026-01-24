import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import {
  useStrategyStore,
  selectPitStopSimulation,
  selectStrategyLoading,
  selectStrategyError,
  useRaceStore,
  selectRaces,
  selectDrivers
} from '@/stores'
import '@/styles/f1-core.css'
import '@/styles/strategy-new.css'

export default function NewSimulationPage() {
  const [searchParams] = useSearchParams()
  const [selectedScenario, setSelectedScenario] = useState('pitstop')
  const [selectedDriver, setSelectedDriver] = useState('1')
  const [targetLap, setTargetLap] = useState(25)

  // Get data from stores
  const pitStopSimulation = useStrategyStore(selectPitStopSimulation)
  const isLoading = useStrategyStore(selectStrategyLoading)
  const error = useStrategyStore(selectStrategyError)
  const simulatePitStop = useStrategyStore((state) => state.simulatePitStop)
  const clearError = useStrategyStore((state) => state.clearError)

  const races = useRaceStore(selectRaces)
  const drivers = useRaceStore(selectDrivers)
  const loadRaces = useRaceStore((state) => state.loadRaces)
  const loadDrivers = useRaceStore((state) => state.loadDrivers)

  // Get race ID from URL params
  const raceId = parseInt(searchParams.get('raceId') || '1')

  // Load data on mount
  useEffect(() => {
    loadRaces()
    loadDrivers()
  }, [loadRaces, loadDrivers])

  // Handle pit stop simulation
  const handleSimulate = async () => {
    if (!raceId || !selectedDriver || !targetLap) return

    const driverId = parseInt(selectedDriver)
    await simulatePitStop(raceId, driverId, targetLap)
  }

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

  const currentRace = races.find((r) => r.id === raceId)

  return (
    <AppLayout>
      <div className="f1-page strategy-new-container">
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
              {currentRace && (
                <p className="f1-strategy-race-info">
                  {currentRace.name} - {new Date(currentRace.date).getFullYear()}
                </p>
              )}
            </div>
          </section>

          {/* Error Display */}
          {error && (
            <section className="f1-strategy-error">
              <div className="f1-strategy-error-content">
                <p className="f1-strategy-error-message">{error}</p>
                <button
                  className="f1-strategy-btn f1-strategy-btn-outline"
                  onClick={clearError}
                >
                  Fermer
                </button>
              </div>
            </section>
          )}

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
                    {drivers.length > 0 ? (
                      drivers.slice(0, 24).map((driver) => (
                        <div
                          key={driver.id}
                          className={`f1-strategy-driver-card ${selectedDriver === String(driver.id) ? 'active' : ''}`}
                          onClick={() => setSelectedDriver(String(driver.id))}
                        >
                          <div className="f1-strategy-driver-number">
                            {driver.driver_number}
                          </div>
                          <div className="f1-strategy-driver-info">
                            <div className="f1-strategy-driver-name">
                              {driver.code}
                            </div>
                            <div className="f1-strategy-driver-team">
                              {driver.team}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Chargement des pilotes...</p>
                    )}
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

              {pitStopSimulation && selectedScenario === 'pitstop' ? (
                <div className="f1-strategy-results-grid">
                  <div className="f1-strategy-result-card">
                    <div className="f1-strategy-result-header">
                      <h3 className="f1-strategy-result-title">
                        Position Actuelle
                      </h3>
                      <div className="f1-strategy-result-value">
                        P{pitStopSimulation.original_position_final}
                      </div>
                    </div>
                    <div className="f1-strategy-result-details">
                      <div className="f1-strategy-result-detail">
                        <span className="f1-strategy-detail-label">Arrêt original:</span>
                        <span className="f1-strategy-detail-value">
                          Tour {pitStopSimulation.original_stop_lap}
                        </span>
                      </div>
                      <div className="f1-strategy-result-detail">
                        <span className="f1-strategy-detail-label">Stratégie:</span>
                        <span className="f1-strategy-detail-value">
                          {pitStopSimulation.detailed_analysis.original_tire_strategy}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="f1-strategy-result-card highlight">
                    <div className="f1-strategy-result-header">
                      <h3 className="f1-strategy-result-title">
                        Position Prédite
                      </h3>
                      <div className={`f1-strategy-result-value ${pitStopSimulation.position_gain > 0 ? 'success' : ''}`}>
                        P{pitStopSimulation.alternative_position_final}
                      </div>
                    </div>
                    <div className="f1-strategy-result-details">
                      <div className="f1-strategy-result-detail">
                        <span className="f1-strategy-detail-label">Gain position:</span>
                        <span className={`f1-strategy-detail-value ${pitStopSimulation.position_gain > 0 ? 'success' : ''}`}>
                          {pitStopSimulation.position_gain > 0 ? '+' : ''}{pitStopSimulation.position_gain}
                        </span>
                      </div>
                      <div className="f1-strategy-result-detail">
                        <span className="f1-strategy-detail-label">Confiance:</span>
                        <span className="f1-strategy-detail-value">
                          {pitStopSimulation.confidence_score.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="f1-strategy-result-card">
                    <div className="f1-strategy-result-header">
                      <h3 className="f1-strategy-result-title">
                        Recommandation
                      </h3>
                      <div className="f1-strategy-result-icon">
                        🎯
                      </div>
                    </div>
                    <div className="f1-strategy-result-details">
                      <div className="f1-strategy-recommendation">
                        <p>{pitStopSimulation.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="f1-strategy-results-placeholder">
                  <p>Lancez la simulation pour voir les résultats</p>
                </div>
              )}
            </div>
          </section>

          {/* Action Buttons */}
          <section className="f1-strategy-actions">
            <div className="f1-strategy-container">
              <div className="f1-strategy-buttons">
                <button
                  className="f1-strategy-btn f1-strategy-btn-primary"
                  onClick={handleSimulate}
                  disabled={isLoading || !selectedDriver}
                >
                  {isLoading ? 'Simulation en cours...' : 'Lancer la Simulation'}
                </button>
                <button className="f1-strategy-btn f1-strategy-btn-outline">
                  Exporter les Résultats
                </button>
                <Link to="/library" className="f1-strategy-btn f1-strategy-btn-outline">
                  Retour aux Courses
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}
