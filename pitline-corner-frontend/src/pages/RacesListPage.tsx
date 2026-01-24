import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useRaceStore, selectRaces, selectRaceLoading, selectRaceError } from '@/stores'
import { Calendar, MapPin, Users, RefreshCw } from 'lucide-react'

const RacesListPage = () => {
  const races = useRaceStore(selectRaces)
  const isLoading = useRaceStore(selectRaceLoading)
  const error = useRaceStore(selectRaceError)
  const loadRaces = useRaceStore((state) => state.loadRaces)

  useEffect(() => {
    loadRaces()
  }, [loadRaces])

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadRaces}>Réessayer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses F1</h1>
          <p className="text-gray-600 mt-2">Découvrez toutes les courses de la saison</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadRaces}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Rafraîchir
          </Button>
          <Button asChild>
            <Link to="/simulations/new">Nouvelle simulation</Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race) => (
            <Card key={race.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{race.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(race.date).toLocaleDateString('fr-FR')}
                    </CardDescription>
                  </div>
                  <Badge variant={race.status === 'completed' ? 'default' : 'secondary'}>
                    {race.status === 'completed' ? 'Terminée' : 'À venir'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {race.country}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    Saison {race.season} • Round {race.round}
                  </div>
                  <div className="flex gap-2 pt-3">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/races/${race.id}`}>Détails</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link to={`/simulations/new?raceId=${race.id}`}>Simuler</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && races.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Aucune course trouvée</h3>
          <Button onClick={loadRaces}>Actualiser</Button>
        </div>
      )}
    </div>
  )
}

export default RacesListPage
