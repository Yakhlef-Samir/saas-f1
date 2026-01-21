import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { SimulationResult } from '@/types'

interface StrategyBadgeProps {
  simulation: SimulationResult
  className?: string
}

export function StrategyBadge({ simulation, className }: StrategyBadgeProps) {
  const { position_delta, simulation_metadata } = simulation
  
  // Determine badge type and color based on position delta
  let variant: 'default' | 'secondary' | 'destructive' | 'outline'
  let label: string
  let description: string
  
  if (position_delta > 2) {
    variant = 'default'
    label = 'Génial'
    description = `Undercut parfait : +${position_delta} positions`
  } else if (position_delta > 0) {
    variant = 'default'
    label = 'Bon'
    description = `Stratégie efficace : +${position_delta} position${position_delta > 1 ? 's' : ''}`
  } else if (position_delta === 0) {
    variant = 'secondary'
    label = 'Correct'
    description = 'Timing optimal'
  } else if (position_delta > -2) {
    variant = 'outline'
    label = 'Risqué'
    description = `Arrêt trop tardif : ${position_delta} position${position_delta < -1 ? 's' : ''}`
  } else {
    variant = 'destructive'
    label = 'Erreur'
    description = `Mauvais timing : ${position_delta} positions perdues`
  }

  // Add confidence indicator
  const confidence = simulation_metadata.confidence_score
  const confidenceLabel = confidence > 0.8 ? 'Haute' : confidence > 0.6 ? 'Moyenne' : 'Faible'

  return (
    <div className={cn('space-y-2', className)}>
      <Badge variant={variant} className="text-sm px-3 py-1">
        {label}
      </Badge>
      
      <div className="text-xs text-text-secondary space-y-1">
        <p>{description}</p>
        
        {simulation_metadata.traffic_affected && (
          <p className="text-warning">
            ⚠️ Trafic affecté
          </p>
        )}
        
        <p className="text-xs">
          Confiance: {confidenceLabel} ({Math.round(confidence * 100)}%)
        </p>
      </div>
    </div>
  )
}

// Simplified version for inline use
export function StrategyBadgeMini({ simulation, className }: StrategyBadgeProps) {
  const { position_delta } = simulation
  
  let variant: 'default' | 'secondary' | 'destructive' | 'outline'
  let label: string
  
  if (position_delta > 0) {
    variant = 'default'
    label = `+${position_delta}`
  } else if (position_delta === 0) {
    variant = 'secondary'
    label = '0'
  } else {
    variant = 'destructive'
    label = position_delta.toString()
  }
  
  return (
    <Badge variant={variant} className={cn('font-mono', className)}>
      {label}
    </Badge>
  )
}
