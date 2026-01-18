import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Race } from '@/types'
import { formatDate } from '@/utils/formatting'

interface RaceCardProps {
  race: Race
  onSelect?: (race: Race) => void
  className?: string
}

export function RaceCard({ race, onSelect, className }: RaceCardProps) {
  const isCompleted = race.status === 'completed'
  const isScheduled = race.status === 'scheduled'
  
  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow duration-200', className)}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-text">{race.name}</h3>
            <p className="text-text-secondary">{race.circuit_name}</p>
            <p className="text-sm text-text-secondary">{race.country}</p>
          </div>
          
          <Badge variant={isCompleted ? 'default' : isScheduled ? 'secondary' : 'outline'}>
            {isCompleted ? 'Terminée' : isScheduled ? 'Programmée' : 'Annulée'}
          </Badge>
        </div>

        {/* Race Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Saison:</span>
            <span className="ml-2 font-medium">{race.season}</span>
          </div>
          <div>
            <span className="text-text-secondary">Manche:</span>
            <span className="ml-2 font-medium">{race.round}</span>
          </div>
          <div>
            <span className="text-text-secondary">Date:</span>
            <span className="ml-2 font-medium">{formatDate(race.date)}</span>
          </div>
          <div>
            <span className="text-text-secondary">Données:</span>
            <span className="ml-2">
              {race.data_imported ? (
                <Badge variant="default" className="text-xs">
                  ✅ Disponibles
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  ⏳ En attente
                </Badge>
              )}
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="pt-2">
          <Button 
            onClick={() => onSelect?.(race)}
            disabled={!race.data_imported}
            className="w-full"
            variant={race.data_imported ? 'default' : 'outline'}
          >
            {race.data_imported ? 'Analyser la course' : 'Bientôt disponible'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Compact version for grid layouts
export function RaceCardCompact({ race, onSelect, className }: RaceCardProps) {
  const isCompleted = race.status === 'completed'
  
  return (
    <Card className={cn('p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer', className)}
          onClick={() => onSelect?.(race)}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm truncate">{race.name}</h4>
          <Badge variant="outline" className="text-xs">
            {race.round}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{race.circuit_name}</span>
          <span>{formatDate(race.date, 'dd MMM')}</span>
        </div>
        
        {race.data_imported && (
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              Disponible
            </Badge>
            {isCompleted && (
              <Badge variant="secondary" className="text-xs">
                Terminée
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
