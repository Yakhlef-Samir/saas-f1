import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useRaceStore, selectCurrentRace, selectDrivers, selectLapData, selectRaceLoading, selectRaceError } from '@/stores'
import '@/styles/f1-core.css'
import '@/styles/race-detail.css'
import { COUNTRY_ISO2 } from "../hooks/useCountryCodes";


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
        <div className="min-h-screen bg-white">
          <div className="max-w-6xl mx-auto px-8 py-16 text-center">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => raceId && loadRace(parseInt(raceId))}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
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
        <div className="min-h-screen bg-white">
          <div className="max-w-6xl mx-auto px-8 py-16 text-center">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Course non trouvée</h2>
            <Link
              to="/library"
              className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
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
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* HEADER ROW */}
          <div className="flex justify-between items-start mb-10">
            <div className="flex-1">
              {isLoading ? (
                <>
                  <div className="h-12 w-96 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-bold text-red-600 mb-3">
                    {currentRace?.name || 'Bahrain Grand Prix'}
                  </h1>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      📅 {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center gap-2">
                      📍 {currentRace?.country || 'Bahrain'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
                      ⏳ {getStatusLabel()}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 ml-6">
              <Link
                to="/library"
                className="px-6 py-2 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-50 transition"
              >
                ← RETOUR
              </Link>
              <Link
                to={`/strategy/new?raceId=${raceId}`}
                className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                ► SIMULE LA COURSE
              </Link>
            </div>
          </div>

          {/* RACE OVERVIEW CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
              ))
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-sm border-l-4 border-red-600 p-5">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Saison</div>
                  <div className="text-2xl font-bold text-red-600 mt-3">{currentRace?.season || '2024'}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border-l-4 border-green-500 p-5">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Round</div>
                  <div className="text-2xl font-bold text-green-500 mt-3">{currentRace?.round || '1'}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border-l-4 border-yellow-500 p-5">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pilotes</div>
                  <div className="text-2xl font-bold text-yellow-500 mt-3">{drivers.length || '20'}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border-l-4 border-blue-500 p-5">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Circuit</div>
                  <div className="text-xl font-bold text-blue-600 mt-3">{currentRace?.circuit?.name || 'Unknown circuit'}</div>
                  <div className="text-xs text-gray-500 mt-1">{currentRace?.circuit?.country || 'Unknown country'}</div>
                </div>
              </>
            )}
          </div>

          {/* TABS */}
          <div className="flex gap-12 border-b-2 border-gray-200 mb-8">
            {['overview', 'drivers', 'laps', 'pits'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-bold text-sm uppercase tracking-wider transition ${
                  activeTab === tab
                    ? 'text-red-600 border-b-2 border-red-600 -mb-2'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' && 'APERÇU'}
                {tab === 'drivers' && 'PILOTES'}
                {tab === 'laps' && 'TOURS'}
                {tab === 'pits' && 'ARRÊTS'}
              </button>
            ))}
          </div>

          {/* CONTENT SECTION */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-3 gap-8">
              {/* LEFT: Race Overview (2/3) */}
              <div className="col-span-2 bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-8">
                  Aperçu de la course
                </h2>

                {isLoading ? (
                  <div className="h-40 bg-gray-100 rounded-lg animate-pulse"></div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Date</div>
                        <div className="text-gray-900 font-semibold text-base">
                          {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Statut</div>
                        <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold ${getStatusColor()}`}>
                          ⏳ {getStatusLabel()}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Donnée importées</div>
                        <div className="text-gray-900 font-semibold text-base">{currentRace?.data_imported ? 'Oui' : 'Non'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Donnée importées</div>
                        <div className="text-gray-900 font-semibold text-base">{currentRace?.data_imported ? 'Oui' : 'Non'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT: Circuit Card (1/3) */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-8">
                📍 Circuit
                </h2>

                {isLoading ? (
                  <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        {currentRace?.circuit?.name || 'Unknown circuit'}
                        <span className="text-lg">
                          {currentRace?.country ? COUNTRY_CODES[currentRace.country] ?? 'Unknown country' : 'Unknown country'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{currentRace?.circuit?.country || 'Unknown country'}</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Distance</span>
                        <span className="inline-block px-3 py-2 bg-gray-100 text-gray-800 rounded-full text-xs font-bold whitespace-nowrap">
                          {currentRace?.circuit?.length_km || '5'} km
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Virages</span>
                        <span className="inline-block px-3 py-2 bg-gray-100 text-gray-800 rounded-full text-xs font-bold whitespace-nowrap">
                          {currentRace?.circuit?.turns || '15'} virages
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* DRIVERS TAB */}
          {activeTab === 'drivers' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Pilotes participants ({drivers.length})</h2>

              {isLoading ? (
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="w-14 h-14 rounded-lg bg-gray-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {driver.code}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm truncate">{driver.first_name} {driver.last_name}</h3>
                        <p className="text-xs text-gray-600 truncate">{driver.team}</p>
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
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Données de tours</h2>

              {isLoading ? (
                <div className="h-40 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : lapData.length > 0 ? (
                <p className="text-gray-700">Données de tours disponibles pour {lapData.length} tours</p>
              ) : (
                <p className="text-gray-700">Aucune donnée de tours disponible pour cette course</p>
              )}
            </div>
          )}

          {/* PITS TAB */}
          {activeTab === 'pits' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Arrêts au stand</h2>
              <p className="text-gray-700">Données d'arrêts au stand bientôt disponibles</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default RaceDetailPage
