import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AppLayout } from '@/components/layout/AppLayout'
import { useRaces, useRaceFilters } from '@/hooks/useRaces'
import type { Race } from '@/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import '@/styles/f1-modern.css'

/**
 * Formate une date pour l'affichage
 */
const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'Date non définie'
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, 'dd MMMM yyyy', { locale: fr })
  } catch (error) {
    console.error('Erreur de formatage de date:', error)
    return 'Date invalide'
  }
}

/**
 * Page d'accueil de la bibliothèque des courses F1.
 * Permet de filtrer les courses par saison, recherche et affichage en grille ou liste.
 */
export default function RaceLibraryPage() {
  const navigate = useNavigate()
  const { races, isLoading, error } = useRaces()
  const { getRacesBySeason, getCompletedRaces, getUpcomingRaces, searchRaces } = useRaceFilters()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeason, setSelectedSeason] = useState<number>(2024)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'upcoming'>('all')

  // Filter races based on search and season
  const filteredRaces = useMemo(() => {
    let filtered = races
    
    // Filter by season
    if (selectedSeason) {
      filtered = getRacesBySeason(selectedSeason)
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = searchRaces(searchQuery)
    }
    
    return filtered
  }, [races, selectedSeason, searchQuery, getRacesBySeason, searchRaces])

  // Get available seasons
  const availableSeasons = useMemo(() => {
    const seasons = [...new Set(races.map(race => race.season))].sort((a, b) => b - a)
    return seasons
  }, [races])

  // Get race counts
  const completedRaces = getCompletedRaces()
  const upcomingRaces = getUpcomingRaces()

  const handleRaceSelect = (race: Race) => {
    navigate(`/race/${race.id}`)
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="f1-container f1-section">
          <div className="f1-flex f1-items-center f1-justify-center" style={{ minHeight: '24rem' }}>
            <div className="f1-loading">
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout>
        <div className="f1-container f1-section">
          <div className="f1-empty-state">
            <h2 className="f1-text-2xl f1-font-bold f1-text-gray-900 f1-mb-6">Erreur de chargement</h2>
            <p className="f1-text-gray-600 f1-mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="f1-btn f1-btn-primary"
            >
              Réessayer
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="f1-min-h-screen f1-bg-gray-50">

        {/* Stats Section */}
        <div className="f1-stats">
          <div className="f1-container">
            <div className="f1-stats-grid">
              {/* Total Races */}
              <div className="f1-stat-card f1-transform">
                <div className="f1-stat-content">
                  <h3 className="number-red">{races.length}</h3>
                  <p>Courses totales</p>
                </div>
                <div className="f1-stat-icon red">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Completed Races */}
              <div className="f1-stat-card f1-transform">
                <div className="f1-stat-content">
                  <h3 className="number-green">{completedRaces.length}</h3>
                  <p>Courses terminées</p>
                </div>
                <div className="f1-stat-icon green">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Upcoming Races */}
              <div className="f1-stat-card f1-transform">
                <div className="f1-stat-content">
                  <h3 className="number-amber">{upcomingRaces.length}</h3>
                  <p>Courses à venir</p>
                </div>
                <div className="f1-stat-icon amber">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="f1-filters">
          <div className="f1-container">
            <div className="f1-space-y-4">
              {/* Search Bar */}
              <div className="f1-search-container">
                <svg className="f1-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher une course, circuit ou pays..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="f1-search-input"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="f1-filters-controls">
                {/* Season Filter */}
                <div className="f1-season-buttons">
                  {availableSeasons.map((season) => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={`f1-btn-filter ${selectedSeason === season ? 'active' : ''}`}
                    >
                      SAISON {season}
                    </button>
                  ))}
                </div>
                
                {/* View Mode Toggle */}
                <div className="f1-view-buttons">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`f1-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    GRILLE
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`f1-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    LISTE
                  </button>
                </div>
              </div>

              {(searchQuery || selectedSeason) && (
                <div className="f1-active-filters">
                  <span className="f1-active-filters-label">Filtres actifs:</span>
                  {searchQuery && (
                    <div className="f1-filter-tag">
                      Recherche: {searchQuery}
                      <button onClick={() => setSearchQuery('')}>×</button>
                    </div>
                  )}
                  {selectedSeason && (
                    <div className="f1-filter-tag">
                      Saison {selectedSeason}
                      <button onClick={() => setSelectedSeason(0)}>×</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Race Grid Section */}
        <div className="f1-race-grid">
          <div className="f1-container">
            <div className="f1-tabs">
              <div className="f1-tabs-list">
                <button 
                  className={`f1-tab-trigger ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  Toutes les courses
                </button>
                <button 
                  className={`f1-tab-trigger ${activeTab === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  Terminées
                </button>
                <button 
                  className={`f1-tab-trigger ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  À venir
                </button>
              </div>
              
              <div className={`f1-tab-content ${activeTab === 'all' ? 'active' : ''}`}>
                {filteredRaces.length === 0 ? (
                  <div className="f1-empty-state">
                    <h2 className="f1-text-2xl f1-font-bold f1-text-gray-900 f1-mb-6">Aucune course trouvée</h2>
                    <p className="f1-text-gray-600 f1-mb-8">
                      {searchQuery ? 'Essayez une autre recherche' : 'Aucune course disponible pour cette saison'}
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedSeason(2024)
                      }}
                      className="f1-btn f1-btn-primary"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                ) : (
                  <div className={
                    viewMode === 'grid' 
                      ? 'f1-race-grid-container'
                      : 'f1-race-list-container'
                  }>
                    {filteredRaces.map((race) => {
                     
                      return viewMode === 'grid' ? (
                        <div key={race.id}
                          onClick={() => handleRaceSelect(race)}
                          className="f1-race-card f1-transform"
                        >
                          <div className="f1-race-card-image">
                         
                            <div className={`f1-race-card-badge ${race.status === 'completed' ? 'completed' : 'upcoming'}`}>
                              {race.status === 'completed' ? 'TERMINÉE' : 'À VENIR'}
                            </div>
                          </div>
                          <div className="f1-race-card-content">
                            <h3 className="f1-race-card-title">{race.name}</h3>
                            <p className="f1-race-card-circuit">{race.circuit_name || 'Circuit'}</p>
                            <div className="f1-race-card-meta">
                              <div className="f1-race-card-meta-item">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formatDate(race.date)}</span>
                              </div>
                              <div className="f1-race-card-meta-item">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{race.country || 'Lieu'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={race.id}
                          onClick={() => handleRaceSelect(race)}
                          className="f1-race-card-compact f1-transform"
                        >
                          <div className="f1-race-card-compact-image">
                            
                          </div>
                          <div className="f1-race-card-compact-content">
                            <div className="f1-race-card-compact-header">
                              <h3 className="f1-race-card-compact-title">{race.name}</h3>
                              <span className={`f1-race-card-compact-badge ${race.status === 'completed' ? 'completed' : 'upcoming'}`}>
                                {race.status === 'completed' ? 'TERMINÉE' : 'À VENIR'}
                              </span>
                            </div>
                            <p className="f1-race-card-compact-circuit">{race.circuit_name || 'Circuit'}</p>
                            <div className="f1-race-card-compact-meta">
                              <div className="f1-race-card-compact-meta-item">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formatDate(race.date)}</span>
                              </div>
                              <div className="f1-race-card-compact-meta-item">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{race.country || 'Lieu'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className={`f1-tab-content ${activeTab === 'completed' ? 'active' : ''}`}>
                <div className={
                  viewMode === 'grid' 
                    ? 'f1-race-grid-container'
                    : 'f1-race-list-container'
                }>
                  {getCompletedRaces().map((race) => {
                    return viewMode === 'grid' ? (
                      <div key={race.id}
                        onClick={() => handleRaceSelect(race)}
                        className="f1-race-card f1-transform"
                      >
                        <div className="f1-race-card-image">
                         
                          <div className="f1-race-card-badge completed">TERMINÉE</div>
                        </div>
                        <div className="f1-race-card-content">
                          <h3 className="f1-race-card-title">{race.name}</h3>
                          <p className="f1-race-card-circuit">{race.circuit_name || 'Circuit'}</p>
                          <div className="f1-race-card-meta">
                            <div className="f1-race-card-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(race.date)}</span>
                            </div>
                            <div className="f1-race-card-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{race.country || 'Lieu'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={race.id}
                        onClick={() => handleRaceSelect(race)}
                        className="f1-race-card-compact f1-transform"
                      >
                        <div className="f1-race-card-compact-image">
                          
                        </div>
                        <div className="f1-race-card-compact-content">
                          <div className="f1-race-card-compact-header">
                            <h3 className="f1-race-card-compact-title">{race.name}</h3>
                            <span className="f1-race-card-compact-badge completed">TERMINÉE</span>
                          </div>
                          <p className="f1-race-card-compact-circuit">{race.circuit_name || 'Circuit'}</p>
                          <div className="f1-race-card-compact-meta">
                            <div className="f1-race-card-compact-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(race.date)}</span>
                            </div>
                            <div className="f1-race-card-compact-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{race.country || 'Lieu'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </div>

              <div className={`f1-tab-content ${activeTab === 'upcoming' ? 'active' : ''}`}>
                <div className={
                  viewMode === 'grid' 
                    ? 'f1-race-grid-container'
                    : 'f1-race-list-container'
                }>
                  {getUpcomingRaces().map((race) => (
                    viewMode === 'grid' ? (
                      <div key={race.id} 
                        onClick={() => handleRaceSelect(race)}
                        className="f1-race-card f1-transform"
                      >
                        <div className="f1-race-card-image">
                          <div className="f1-race-card-image-placeholder">Circuit Image</div>
                          <div className="f1-race-card-badge upcoming">À VENIR</div>
                        </div>
                        <div className="f1-race-card-content">
                          <h3 className="f1-race-card-title">{race.name}</h3>
                          <p className="f1-race-card-circuit">{race.circuit_name || 'Circuit'}</p>
                          <div className="f1-race-card-meta">
                            <div className="f1-race-card-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(race.date)}</span>
                            </div>
                            <div className="f1-race-card-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{race.country || 'Lieu'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={race.id} 
                        onClick={() => handleRaceSelect(race)}
                        className="f1-race-card-compact f1-transform"
                      >
                        <div className="f1-race-card-compact-image">
                          <div className="f1-race-card-image-placeholder">F1</div>
                        </div>
                        <div className="f1-race-card-compact-content">
                          <div className="f1-race-card-compact-header">
                            <h3 className="f1-race-card-compact-title">{race.name}</h3>
                            <span className="f1-race-card-compact-badge upcoming">À VENIR</span>
                          </div>
                          <p className="f1-race-card-compact-circuit">{race.circuit_name || 'Circuit'}</p>
                          <div className="f1-race-card-compact-meta">
                            <div className="f1-race-card-compact-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(race.date)}</span>
                            </div>
                            <div className="f1-race-card-compact-meta-item">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{race.country || 'Lieu'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
