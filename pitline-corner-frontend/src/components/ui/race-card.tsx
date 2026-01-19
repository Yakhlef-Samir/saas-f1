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
    <Card className={cn('card-f1 group cursor-pointer', className)} onClick={() => onSelect?.(race)}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
              {race.name}
            </h3>
            <p className="text-sm text-gray-600 font-medium">{race.circuit_name}</p>
            <p className="text-sm text-gray-500">{race.country}</p>
          </div>
          
          <Badge variant={isCompleted ? 'default' : isScheduled ? 'secondary' : 'outline'}
                 className={cn(
                   'badge-f1',
                   isCompleted && 'badge-f1-green',
                   isScheduled && 'badge-f1-yellow',
                   !isCompleted && !isScheduled && 'badge-f1-gray'
                 )}>
            {isCompleted ? 'Terminée' : isScheduled ? 'Programmée' : 'Annulée'}
          </Badge>
        </div>

        {/* Race Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-600">Saison:</span>
            <span className="font-bold text-gray-900">{race.season}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span className="text-gray-600">Manche:</span>
            <span className="font-bold text-gray-900">{race.round}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">Date:</span>
            <span className="font-medium text-gray-900">{formatDate(race.date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">Données:</span>
            <span>
              {race.data_imported ? (
                <Badge variant="default" className="badge-f1-green text-xs">
                  ✅ Disponibles
                </Badge>
              ) : (
                <Badge variant="outline" className="badge-f1-gray text-xs">
                  ⏳ En attente
                </Badge>
              )}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation()
              onSelect?.(race)
            }}
            disabled={!race.data_imported}
            className={cn(
              'w-full transition-all duration-200',
              race.data_imported 
                ? 'btn-f1-primary shadow-f1 hover:shadow-f1-hover' 
                : 'btn-f1-outline opacity-50 cursor-not-allowed'
            )}
          >
            {race.data_imported ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyser la course
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bientôt disponible
              </>
            )}
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
    <Card className={cn('card-f1 group cursor-pointer p-4', className)} onClick={() => onSelect?.(race)}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-gray-900 truncate group-hover:text-primary transition-colors">
              {race.name}
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 truncate">{race.circuit_name}</p>
          </div>
          <Badge variant="outline" className="badge-f1-red text-xs flex-shrink-0">
            R{race.round}
          </Badge>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(race.date, 'dd MMM')}</span>
          </div>
          
          {race.data_imported && (
            <div className="flex items-center gap-1">
              {isCompleted && (
                <Badge variant="secondary" className="badge-f1-green text-xs">
                  ✓
                </Badge>
              )}
              <Badge variant="default" className="badge-f1-red text-xs">
                Dispo
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
