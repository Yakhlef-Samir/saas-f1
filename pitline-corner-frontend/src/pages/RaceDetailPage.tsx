import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useRaceStore, selectCurrentRace, selectDrivers, selectLapData, selectRaceLoading, selectRaceError } from '@/stores'
import { Calendar, MapPin, Flag, Users, Gauge } from 'lucide-react'
import '@/styles/f1-core.css'
import '@/styles/race-detail.css'

const RaceDetailPage = () => {
  const { raceId } = useParams<{ raceId: string }>()
  const currentRace = useRaceStore(selectCurrentRace)
  const drivers = useRaceStore(selectDrivers)
  const lapData = useRaceStore(selectLapData)
  const isLoading = useRaceStore(selectRaceLoading)
  const error = useRaceStore(selectRaceError)
  const loadRace = useRaceStore((state) => state.loadRace)
  const loadDrivers = useRaceStore((state) => state.loadDrivers)
  const loadLapData = useRaceStore((state) => state.loadLapData)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (raceId) {
      const id = parseInt(raceId)
      loadRace(id)
      loadDrivers()
      loadLapData(id)
    }
  }, [raceId, loadRace, loadDrivers, loadLapData])

  if (error) {
    return (
      <AppLayout>
        <div className="f1-page">
          <div className="f1-container py-12 text-center">
            <h2 className="text-3xl font-bold text-f1-red mb-4">Erreur de chargement</h2>
            <p className="text-f1-black mb-6">{error}</p>
            <button
              onClick={() => raceId && loadRace(parseInt(raceId))}
              className="f1-btn f1-btn-primary"
            >
              Réessayer
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!currentRace && !isLoading) {
    return (
      <AppLayout>
        <div className="f1-page">
          <div className="f1-container py-12 text-center">
            <h2 className="text-3xl font-bold text-f1-red mb-4">Course non trouvée</h2>
            <Link
              to="/library"
              className="f1-btn f1-btn-primary inline-block"
            >
              Retour aux courses
            </Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="race-detail-container f1-page">
        {/* SECTION 1: Hero Header */}
        <div className="race-detail-hero">
          <div className="f1-container">
            <div className="race-detail-hero-content">
              <div className="race-detail-hero-left">
                {isLoading ? (
                  <>
                    <div className="h-10 w-96 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <h1 className="race-detail-hero-title">{currentRace?.name}</h1>
                    <div className="race-detail-hero-meta">
                      <div className="race-detail-hero-meta-item">
                        <Calendar />
                        {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="race-detail-hero-meta-item">
                        <MapPin />
                        {currentRace?.country}
                      </div>
                      <div className={`race-detail-status-badge ${currentRace?.status === 'completed' ? 'completed' : currentRace?.status === 'scheduled' ? 'pending' : 'active'}`}>
                        {currentRace?.status === 'completed' ? 'Terminée' : 'À venir'}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="race-detail-hero-actions">
                <Link
                  to="/library"
                  className="f1-btn f1-btn-secondary"
                >
                  ← Retour
                </Link>
                <Link
                  to={`/strategy/new?raceId=${raceId}`}
                  className="f1-btn f1-btn-primary"
                >
                  Simuler la course
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Enhanced Stat Cards */}
        <div className="f1-container">
          <div className="race-detail-stats-section">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
              ))
            ) : (
              <>
                <div className="race-detail-stat-card">
                  <div className="race-detail-stat-card-header">
                    <Flag className="race-detail-stat-card-icon" />
                    <span className="race-detail-stat-card-label">Saison</span>
                  </div>
                  <div className="race-detail-stat-card-value">{currentRace?.season}</div>
                </div>
                <div className="race-detail-stat-card">
                  <div className="race-detail-stat-card-header">
                    <Gauge className="race-detail-stat-card-icon" />
                    <span className="race-detail-stat-card-label">Round</span>
                  </div>
                  <div className="race-detail-stat-card-value">{currentRace?.round}</div>
                </div>
                <div className="race-detail-stat-card">
                  <div className="race-detail-stat-card-header">
                    <Users className="race-detail-stat-card-icon" />
                    <span className="race-detail-stat-card-label">Pilotes</span>
                  </div>
                  <div className="race-detail-stat-card-value">{drivers.length}</div>
                </div>
                <div className="race-detail-stat-card">
                  <div className="race-detail-stat-card-header">
                    <MapPin className="race-detail-stat-card-icon" />
                    <span className="race-detail-stat-card-label">Circuit</span>
                  </div>
                  <div className="race-detail-stat-card-value">{currentRace?.circuit?.name}</div>
                  <div className="race-detail-stat-card-subtext">{currentRace?.circuit?.country}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SECTION 3: Tab Navigation */}
        <div className="f1-container">
          <div className="race-detail-tabs">
            <div className="race-detail-tab-list">
              {['overview', 'drivers', 'laps', 'pits'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`race-detail-tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab === 'overview' && 'Aperçu'}
                  {tab === 'drivers' && 'Pilotes'}
                  {tab === 'laps' && 'Tours'}
                  {tab === 'pits' && 'Arrêts'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="race-detail-content">
                {/* SECTION 4: Overview Tab - Race Overview Content */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold text-f1-black mb-6">Aperçu de la course</h2>
                    {isLoading ? (
                      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <>
                        <div className="race-detail-overview-grid">
                          {/* Race Details Section */}
                          <div className="race-detail-overview-section">
                            <h3 className="race-detail-overview-title">Détails de la course</h3>
                            <div className="race-detail-overview-fields">
                              <div className="race-detail-field">
                                <span className="race-detail-field-label">Date</span>
                                <div className="race-detail-field-with-icon">
                                  <Calendar className="race-detail-field-icon" />
                                  <span className="race-detail-field-value">{currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                              </div>
                              <div className="race-detail-field">
                                <span className="race-detail-field-label">Statut</span>
                                <span className="race-detail-field-value">{currentRace?.status === 'completed' ? 'Terminée' : 'À venir'}</span>
                              </div>
                              <div className="race-detail-field">
                                <span className="race-detail-field-label">Données importées</span>
                                <span className="race-detail-field-value">{currentRace?.data_imported ? 'Oui ✓' : 'Non'}</span>
                              </div>
                            </div>
                          </div>

                          {/* SECTION 5: Circuit Card */}
                          <div className="race-detail-overview-section">
                            <div className="race-detail-circuit-card">
                              <div className="race-detail-circuit-header">
                                <h3 className="race-detail-circuit-title">{currentRace?.circuit?.name}</h3>
                                <span className="race-detail-circuit-country-badge">{currentRace?.circuit?.country}</span>
                              </div>
                              <div className="race-detail-circuit-stats">
                                <div className="race-detail-circuit-stat">
                                  <span className="race-detail-circuit-stat-label">Longueur</span>
                                  <span className="race-detail-circuit-stat-value">{currentRace?.circuit?.length_km} km</span>
                                </div>
                                <div className="race-detail-circuit-stat">
                                  <span className="race-detail-circuit-stat-label">Virages</span>
                                  <span className="race-detail-circuit-stat-value">{currentRace?.circuit?.turns}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Drivers Tab */}
                {activeTab === 'drivers' && (
                  <div>
                    <h2 className="text-2xl font-bold text-f1-black mb-6">Pilotes participants</h2>
                    {isLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {drivers.map((driver) => (
                          <div key={driver.id} className="f1-race-card-compact">
                            {/* Driver Code Badge (Left) */}
                            <div className="f1-race-card-compact-image" style={{ background: '#6b7280' }}>
                              <span className="font-mono text-lg font-bold text-white">{driver.code}</span>
                            </div>

                            {/* Driver Info (Center/Content) */}
                            <div className="f1-race-card-compact-content">
                              <div className="f1-race-card-compact-header">
                                <div>
                                  <h3 className="f1-race-card-compact-title">{driver.first_name} {driver.last_name}</h3>
                                  <p className="f1-race-card-compact-circuit">{driver.team}</p>
                                </div>
                                <span className="inline-block px-3 py-1 ml-4 bg-red-100 text-f1-red text-xs font-bold rounded">#{driver.driver_number}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Laps Tab */}
                {activeTab === 'laps' && (
                  <div>
                    <h2 className="text-2xl font-bold text-f1-black mb-6">Données de tours</h2>
                    {isLoading ? (
                      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                    ) : lapData.length > 0 ? (
                      <p className="text-f1-black">Données de tours disponibles pour {lapData.length} tours</p>
                    ) : (
                      <p className="text-f1-black">Aucune donnée de tours disponible pour cette course</p>
                    )}
                  </div>
                )}

                {/* Pits Tab */}
                {activeTab === 'pits' && (
                  <div>
                    <h2 className="text-2xl font-bold text-f1-black mb-6">Arrêts au stand</h2>
                    <p className="text-f1-black">Données d'arrêts au stand bientôt disponibles</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default RaceDetailPage
