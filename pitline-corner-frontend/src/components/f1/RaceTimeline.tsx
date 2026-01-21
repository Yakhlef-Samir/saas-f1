import { useState, useCallback, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { LapData, PitStop } from '@/types'
import { formatLapTime, formatTireCompound, getTireCompoundColor } from '@/utils/formatting'

interface RaceTimelineProps {
  laps: LapData[]
  pitStops: PitStop[]
  currentLap: number
  totalLaps: number
  onLapChange: (lap: number) => void
  className?: string
}

interface TimelineMarker {
  lap: number
  type: 'pit_stop' | 'start' | 'finish'
  driverId?: number
  driverName?: string
  tireCompound?: string
}

export function RaceTimeline({ 
  laps, 
  pitStops, 
  currentLap, 
  totalLaps, 
  onLapChange,
  className 
}: RaceTimelineProps) {
  const [isDragging, setIsDragging] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [hoveredLap, setHoveredLap] = useState<number | null>(null)

  // Create timeline markers for pit stops
  const createMarkers = useCallback((): TimelineMarker[] => {
    const markers: TimelineMarker[] = [
      { lap: 1, type: 'start' },
      { lap: totalLaps, type: 'finish' }
    ]

    pitStops.forEach(pitStop => {
      markers.push({
        lap: pitStop.lap,
        type: 'pit_stop',
        driverId: pitStop.driver_id,
        driverName: `Driver ${pitStop.driver_id}`, // Would be replaced with actual driver name
        tireCompound: pitStop.tire_compound_after
      })
    })

    return markers.sort((a, b) => a.lap - b.lap)
  }, [pitStops, totalLaps])

  const markers = createMarkers()

  // Handle timeline scrubbing
  const handleTimelineClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return

    const rect = timelineRef.current.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    const lap = Math.round(1 + percentage * (totalLaps - 1))
    
    onLapChange(lap)
  }, [onLapChange, totalLaps])

  // Handle mouse drag for scrubbing
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    handleTimelineClick(event)
  }, [handleTimelineClick])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return

    const rect = timelineRef.current.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, mouseX / rect.width))
    const lap = Math.round(1 + percentage * (totalLaps - 1))
    
    setHoveredLap(lap)
    
    if (isDragging) {
      onLapChange(lap)
    }
  }, [isDragging, onLapChange, totalLaps])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Global mouse up listener
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp)
      return () => document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseUp])

  // Get lap data for specific lap
  const getLapData = useCallback((lap: number) => {
    return laps.filter(lapData => lapData.lap_number === lap)
  }, [laps])

  // Calculate position percentage
  const getLapPosition = useCallback((lap: number) => {
    return ((lap - 1) / (totalLaps - 1)) * 100
  }, [totalLaps])

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Timeline de Course</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Tour {currentLap} / {totalLaps}
            </Badge>
            <Badge variant="secondary">
              {pitStops.length} arrêts
            </Badge>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {/* Main timeline bar */}
          <div
            ref={timelineRef}
            className="relative h-12 bg-container rounded-lg cursor-pointer border border-border"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredLap(null)}
          >
            {/* Progress indicator */}
            <div
              className="absolute left-0 top-0 h-full bg-primary rounded-lg transition-all duration-100"
              style={{ width: `${getLapPosition(currentLap)}%` }}
            />

            {/* Current position indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-lg transition-all duration-100"
              style={{ left: `${getLapPosition(currentLap)}%` }}
            />

            {/* Pit stop markers */}
            {markers.map((marker) => {
              if (marker.type === 'pit_stop') {
                return (
                  <div
                    key={`pit-${marker.lap}-${marker.driverId}`}
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-warning border-2 border-white rounded-full shadow-md"
                    style={{ left: `${getLapPosition(marker.lap)}%` }}
                    title={`${marker.driverName} - Arrêt au tour ${marker.lap}`}
                  />
                )
              }
              return null
            })}

            {/* Hover indicator */}
            {hoveredLap && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 border-2 border-white rounded-full opacity-50"
                style={{ left: `${getLapPosition(hoveredLap)}%` }}
              />
            )}
          </div>

          {/* Lap labels */}
          <div className="relative h-6">
            <div className="absolute left-0 text-xs text-text-secondary">1</div>
            <div className="absolute right-0 text-xs text-text-secondary">{totalLaps}</div>
            <div className="absolute left-1/2 -translate-x-1/2 text-xs text-text-secondary">
              {Math.round(totalLaps / 2)}
            </div>
          </div>
        </div>

        {/* Current lap details */}
        {hoveredLap && (
          <div className="border-t border-border pt-4">
            <div className="text-sm font-medium mb-2">
              Détails du tour {hoveredLap}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {getLapData(hoveredLap).map((lapData) => (
                <div
                  key={lapData.driver_id}
                  className="flex items-center justify-between p-2 bg-background rounded border"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      P{lapData.position}
                    </span>
                    <span className="text-sm">
                      Driver {lapData.driver_id}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">
                      {formatLapTime(lapData.lap_time_seconds)}
                    </div>
                    <div className={cn('text-xs', getTireCompoundColor(lapData.tire_compound))}>
                      {formatTireCompound(lapData.tire_compound)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pit stops summary */}
        {pitStops.length > 0 && (
          <div className="border-t border-border pt-4">
            <div className="text-sm font-medium mb-2">Arrêts aux stands</div>
            <div className="flex flex-wrap gap-2">
              {pitStops.map((pitStop) => (
                <Button
                  key={pitStop.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onLapChange(pitStop.lap)}
                  className="text-xs"
                >
                  Tour {pitStop.lap}
                  <span className={cn('ml-1', getTireCompoundColor(pitStop.tire_compound_after))}>
                    {pitStop.tire_compound_after[0]}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLapChange(Math.max(1, currentLap - 1))}
            disabled={currentLap <= 1}
          >
            ← Tour précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLapChange(Math.min(totalLaps, currentLap + 1))}
            disabled={currentLap >= totalLaps}
          >
            Tour suivant →
          </Button>
        </div>
      </div>
    </Card>
  )
}
