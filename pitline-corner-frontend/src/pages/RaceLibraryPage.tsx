import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { RaceCard, RaceCardCompact } from '@/components/ui/race-card'
import { useRaces, useRaceFilters } from '@/hooks/useRaces'
import type { Race } from '@/types'

export default function RaceLibraryPage() {
  const navigate = useNavigate()
  const { races, isLoading, error } = useRaces()
  const { getRacesBySeason, getCompletedRaces, getUpcomingRaces, searchRaces } = useRaceFilters()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeason, setSelectedSeason] = useState<number>(2024)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

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
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold text-error mb-2">Erreur de chargement</h2>
          <p className="text-text-secondary mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Race Library</h1>
        <p className="text-text-secondary">
          Explorez toutes les courses F1 avec analyses stratégiques détaillées
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{races.length}</div>
            <div className="text-sm text-text-secondary">Courses totales</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{completedRaces.length}</div>
            <div className="text-sm text-text-secondary">Courses terminées</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{upcomingRaces.length}</div>
            <div className="text-sm text-text-secondary">Courses à venir</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher une course, circuit ou pays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Season Filter */}
            <div className="flex gap-2">
              {availableSeasons.map((season) => (
                <Button
                  key={season}
                  variant={selectedSeason === season ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSeason(season)}
                >
                  {season}
                </Button>
              ))}
            </div>
            
            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grille
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                Liste
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Filtres:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Recherche: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 text-xs hover:text-text"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedSeason && (
              <Badge variant="secondary" className="gap-1">
                Saison {selectedSeason}
                <button
                  onClick={() => setSelectedSeason(0)}
                  className="ml-1 text-xs hover:text-text"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Race Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            Toutes ({filteredRaces.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Terminées ({getCompletedRaces().length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            À venir ({getUpcomingRaces().length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRaces.length === 0 ? (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-medium mb-2">Aucune course trouvée</h3>
              <p className="text-text-secondary">
                Essayez d'ajuster vos filtres ou votre recherche
              </p>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredRaces.map((race) => (
                viewMode === 'grid' ? (
                  <RaceCard
                    key={race.id}
                    race={race}
                    onSelect={handleRaceSelect}
                  />
                ) : (
                  <RaceCardCompact
                    key={race.id}
                    race={race}
                    onSelect={handleRaceSelect}
                  />
                )
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {getCompletedRaces().map((race) => (
              viewMode === 'grid' ? (
                <RaceCard
                  key={race.id}
                  race={race}
                  onSelect={handleRaceSelect}
                />
              ) : (
                <RaceCardCompact
                  key={race.id}
                  race={race}
                  onSelect={handleRaceSelect}
                />
              )
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {getUpcomingRaces().map((race) => (
              viewMode === 'grid' ? (
                <RaceCard
                  key={race.id}
                  race={race}
                  onSelect={handleRaceSelect}
                />
              ) : (
                <RaceCardCompact
                  key={race.id}
                  race={race}
                  onSelect={handleRaceSelect}
                />
              )
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
