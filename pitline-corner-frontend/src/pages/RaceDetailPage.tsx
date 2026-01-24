import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useRaceStore, selectCurrentRace, selectDrivers, selectLapData, selectRaceLoading, selectRaceError } from '@/stores'
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
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => raceId && loadRace(parseInt(raceId))}
              className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
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
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Course non trouvée</h2>
            <Link
              to="/library"
              className="inline-block px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Retour aux courses
            </Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  const getStatusColor = () => {
    if (currentRace?.status === 'completed') return 'bg-green-100 text-green-800'
    if (currentRace?.status === 'cancelled') return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  const getStatusLabel = () => {
    if (currentRace?.status === 'completed') return 'Terminée'
    if (currentRace?.status === 'cancelled') return 'Annulée'
    return 'À venir'
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-start justify-between">
            <div>
              {isLoading ? (
                <>
                  <div className="h-8 w-96 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-red-600">
                    {currentRace?.name}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      📅 {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      📍 {currentRace?.country}
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor()}`}>
                      ⏳ {getStatusLabel()}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <Link
                to="/library"
                className="px-4 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition font-semibold"
              >
                ← Retour
              </Link>
              <Link
                to={`/strategy/new?raceId=${raceId}`}
                className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                ▶ Simuler la course
              </Link>
            </div>
          </div>
        </header>

        {/* STATS CARDS */}
        <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
            ))
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-600">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Saison</div>
                <div className="text-3xl font-bold text-red-600 mt-2">{currentRace?.season}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Round</div>
                <div className="text-3xl font-bold text-green-500 mt-2">{currentRace?.round}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pilotes</div>
                <div className="text-3xl font-bold text-yellow-500 mt-2">{drivers.length}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Circuit</div>
                <div className="text-xl font-bold text-gray-900 mt-2">{currentRace?.circuit?.name}</div>
                <div className="text-xs text-gray-500 mt-1">{currentRace?.circuit?.country}</div>
              </div>
            </>
          )}
        </section>

        {/* TABS */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 border-b text-sm font-medium">
            {['overview', 'drivers', 'laps', 'pits'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-3 border-b-2 transition ${
                  activeTab === tab
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && 'Aperçu'}
                {tab === 'drivers' && 'Pilotes'}
                {tab === 'laps' && 'Tours'}
                {tab === 'pits' && 'Arrêts'}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                  📋 Aperçu de la course
                </h2>

                {isLoading ? (
                  <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</div>
                      <div className="text-gray-900 font-semibold mt-1">
                        {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</div>
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusColor()}`}>
                        ⏳ {getStatusLabel()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Données importées</div>
                      <div className="text-gray-900 font-semibold mt-1">{currentRace?.data_imported ? 'Oui ✓' : 'Non'}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* CIRCUIT CARD */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                  📍 Circuit
                </h2>

                {isLoading ? (
                  <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <>
                    <div className="mb-4">
                      <div className="font-semibold text-lg">{currentRace?.circuit?.name}</div>
                      <div className="text-sm text-gray-500">🇧🇭 {currentRace?.circuit?.country}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                        {currentRace?.circuit?.length_km} km
                      </span>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                        {currentRace?.circuit?.turns} virages
                      </span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* DRIVERS TAB */}
          {activeTab === 'drivers' && (
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Pilotes participants ({drivers.length})</h2>

              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="w-12 h-12 rounded-lg bg-gray-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {driver.code}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{driver.first_name} {driver.last_name}</h3>
                        <p className="text-sm text-gray-600 truncate">{driver.team}</p>
                      </div>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                        #{driver.driver_number}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* LAPS TAB */}
          {activeTab === 'laps' && (
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Données de tours</h2>

              {isLoading ? (
                <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              ) : lapData.length > 0 ? (
                <p className="text-gray-700">Données de tours disponibles pour {lapData.length} tours</p>
              ) : (
                <p className="text-gray-700">Aucune donnée de tours disponible pour cette course</p>
              )}
            </div>
          )}

          {/* PITS TAB */}
          {activeTab === 'pits' && (
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Arrêts au stand</h2>
              <p className="text-gray-700">Données d'arrêts au stand bientôt disponibles</p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  )
}

export default RaceDetailPage
