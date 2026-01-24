import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { useRaceStore, selectCurrentRace, selectDrivers, selectLapData, selectRaceLoading, selectRaceError } from '@/stores'
import { Calendar, MapPin, Users, Settings, Timer, Flag } from 'lucide-react'

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

  useEffect(() => {
    if (raceId) {
      const id = parseInt(raceId)
      loadRace(id)
      // Charger tous les drivers (l'endpoint race/drivers n'existe pas encore)
      loadDrivers() 
      loadLapData(id)
    }
  }, [raceId, loadRace, loadDrivers, loadLapData])

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => raceId && loadRace(parseInt(raceId))}>Réessayer</Button>
        </div>
      </div>
    )
  }

  if (!currentRace && !isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Course non trouvée</h2>
          <Button asChild>
            <Link to="/races">Retour aux courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Accueil</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/races">Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentRace?.name || 'Chargement...'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {isLoading ? (
            <Skeleton className="h-8 w-96 mb-2" />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">{currentRace?.name}</h1>
          )}
          {isLoading ? (
            <Skeleton className="h-4 w-64" />
          ) : (
            <div className="flex items-center gap-4 mt-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {currentRace?.country}
              </div>
              <Badge variant={currentRace?.status === 'completed' ? 'default' : 'secondary'}>
                {currentRace?.status === 'completed' ? 'Terminée' : 'À venir'}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/races">Retour</Link>
          </Button>
          <Button asChild>
            <Link to={`/simulations/new?raceId=${raceId}`}>Simuler la course</Link>
          </Button>
        </div>
      </div>

      {/* Race Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Saison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{currentRace?.season}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Round
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{currentRace?.round}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Pilotes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{drivers.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Circuit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">{currentRace?.circuit?.name}</p>
                <p className="text-sm text-gray-600">{currentRace?.circuit?.country}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="drivers">Pilotes</TabsTrigger>
          <TabsTrigger value="laps">Tours</TabsTrigger>
          <TabsTrigger value="pits">Arrêts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu de la course</CardTitle>
              <CardDescription>Informations générales sur la course</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-32 w-full" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Détails de la course</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Date:</strong> {currentRace && new Date(currentRace.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p><strong>Statut:</strong> {currentRace?.status === 'completed' ? 'Terminée' : 'À venir'}</p>
                      <p><strong>Données importées:</strong> {currentRace?.data_imported ? 'Oui' : 'Non'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Circuit</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nom:</strong> {currentRace?.circuit?.name}</p>
                      <p><strong>Pays:</strong> {currentRace?.circuit?.country}</p>
                      <p><strong>Longueur:</strong> {currentRace?.circuit?.length_km} km</p>
                      <p><strong>Virages:</strong> {currentRace?.circuit?.turns}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pilotes participants</CardTitle>
              <CardDescription>Liste des pilotes de cette course</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-20" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="font-mono text-sm font-bold">{driver.code}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{driver.first_name} {driver.last_name}</p>
                          <p className="text-sm text-gray-600">{driver.team}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{driver.driver_number}</Badge>
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/drivers/${driver.id}`}>Voir</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="laps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Données de tours</CardTitle>
              <CardDescription>Temps et positions par tour</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-32 w-full" />
              ) : lapData.length > 0 ? (
                <p className="text-gray-600">Données de tours disponibles pour {lapData.length} tours</p>
              ) : (
                <p className="text-gray-600">Aucune donnée de tours disponible pour cette course</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Arrêts au stand</CardTitle>
              <CardDescription>Stratégies d'arrêts des pilotes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Données d'arrêts au stand bientôt disponibles</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default RaceDetailPage
