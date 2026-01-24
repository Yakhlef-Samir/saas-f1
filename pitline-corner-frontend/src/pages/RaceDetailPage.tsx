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
        {/* Header Section */}
        <div className="f1-stats">
          <div className="f1-container">
            <div className="flex justify-between items-start mb-6">
              <div>
                {isLoading ? (
                  <div className="h-10 w-96 bg-gray-200 rounded animate-pulse mb-4"></div>
                ) : (
                  <h1 className="text-4xl font-bold text-f1-red mb-4">{currentRace?.name}</h1>
                )}
                {isLoading ? (
                  <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <div className="flex items-center gap-6 text-f1-black">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {currentRace?.country}
                    </div>
                    <div className={`px-3 py-1 rounded text-sm font-semibold ${currentRace?.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {currentRace?.status === 'completed' ? 'Terminée' : 'À venir'}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
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

        {/* Race Info Cards */}
        <div className="f1-stats">
          <div className="f1-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
                ))
              ) : (
                <>
                  <div className="f1-stat-card f1-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <Flag className="w-5 h-5 text-f1-red" />
                      <span className="text-f1-black text-sm font-semibold">Saison</span>
                    </div>
                    <p className="text-2xl font-bold text-f1-red">{currentRace?.season}</p>
                  </div>
                  <div className="f1-stat-card f1-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <Gauge className="w-5 h-5 text-f1-red" />
                      <span className="text-f1-black text-sm font-semibold">Round</span>
                    </div>
                    <p className="text-2xl font-bold text-f1-red">{currentRace?.round}</p>
                  </div>
                  <div className="f1-stat-card f1-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-5 h-5 text-f1-red" />
                      <span className="text-f1-black text-sm font-semibold">Pilotes</span>
                    </div>
                    <p className="text-2xl font-bold text-f1-red">{drivers.length}</p>
                  </div>
                  <div className="f1-stat-card f1-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-f1-red" />
                      <span className="text-f1-black text-sm font-semibold">Circuit</span>
                    </div>
                    <p className="text-lg font-bold text-f1-black">{currentRace?.circuit?.name}</p>
                    <p className="text-xs text-f1-black mt-1">{currentRace?.circuit?.country}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="f1-filters">
          <div className="f1-container">
            <div className="mb-6">
              <div className="flex gap-2 border-b border-gray-200 mb-6">
                {['overview', 'drivers', 'laps', 'pits'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-semibold transition uppercase tracking-wider text-sm ${
                      activeTab === tab
                        ? 'text-f1-red border-b-2 border-f1-red'
                        : 'text-f1-black hover:text-f1-black'
                    }`}
                  >
                    {tab === 'overview' && 'Aperçu'}
                    {tab === 'drivers' && 'Pilotes'}
                    {tab === 'laps' && 'Tours'}
                    {tab === 'pits' && 'Arrêts'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold text-f1-black mb-6">Aperçu de la course</h2>
                    {isLoading ? (
                      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-f1-red mb-4">Détails de la course</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-f1-black text-sm">Date</span>
                              <p className="text-f1-black font-semibold">{currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div>
                              <span className="text-f1-black text-sm">Statut</span>
                              <p className="text-f1-black font-semibold">{currentRace?.status === 'completed' ? 'Terminée' : 'À venir'}</p>
                            </div>
                            <div>
                              <span className="text-f1-black text-sm">Données importées</span>
                              <p className="text-f1-black font-semibold">{currentRace?.data_imported ? 'Oui ✓' : 'Non'}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-f1-red mb-4">Circuit</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-f1-black text-sm">Nom</span>
                              <p className="text-f1-black font-semibold">{currentRace?.circuit?.name}</p>
                            </div>
                            <div>
                              <span className="text-f1-black text-sm">Pays</span>
                              <p className="text-f1-black font-semibold">{currentRace?.circuit?.country}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-f1-black text-sm">Longueur</span>
                                <p className="text-f1-black font-semibold">{currentRace?.circuit?.length_km} km</p>
                              </div>
                              <div>
                                <span className="text-f1-black text-sm">Virages</span>
                                <p className="text-f1-black font-semibold">{currentRace?.circuit?.turns}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
      </div>
    </AppLayout>
  )
}

export default RaceDetailPage
