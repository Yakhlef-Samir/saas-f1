import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useRaceStore, selectDrivers, selectRaceLoading, selectRaceError } from '@/stores'
import { User, Flag } from 'lucide-react'

const DriversListPage = () => {
  const drivers = useRaceStore(selectDrivers)
  const isLoading = useRaceStore(selectRaceLoading)
  const error = useRaceStore(selectRaceError)
  const loadDrivers = useRaceStore((state) => state.loadDrivers)

  useEffect(() => {
    loadDrivers()
  }, [loadDrivers])

  const handleRetry = () => {
    loadDrivers()
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleRetry}>Réessayer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pilotes F1</h1>
          <p className="text-gray-600 mt-2">Découvrez tous les pilotes de la saison</p>
        </div>
        <Button asChild>
          <Link to="/drivers/compare">Comparer les pilotes</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {drivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <CardTitle className="text-lg">
                  {driver.first_name} {driver.last_name}
                </CardTitle>
                <CardDescription>
                  <Badge variant="outline" className="font-mono">
                    {driver.code}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="font-semibold text-primary">{driver.team}</p>
                  </div>
                  {driver.country && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Flag className="h-4 w-4" />
                      {driver.country}
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      #{driver.driver_number}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/drivers/${driver.id}`}>Profil</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link to={`/simulations/new?driverId=${driver.id}`}>Simuler</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && drivers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Aucun pilote trouvé</h3>
          <Button onClick={handleRetry}>Actualiser</Button>
        </div>
      )}
    </div>
  )
}

export default DriversListPage
