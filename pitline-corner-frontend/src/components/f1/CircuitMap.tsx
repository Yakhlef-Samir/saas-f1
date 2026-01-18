import { useRef, useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Driver, LapData } from '@/types'
import { formatPosition, getTireCompoundColor, formatTireCompound } from '@/utils/formatting'

interface CircuitMapProps {
  drivers: Driver[]
  lapData: LapData[]
  currentLap: number
  selectedDriver?: number
  onDriverSelect?: (driverId: number) => void
  className?: string
}

interface DriverPosition {
  driverId: number
  x: number
  y: number
  position: number
  driverName: string
  tireCompound: string
  team: string
}

// Simplified circuit layouts for major F1 circuits
const CIRCUIT_LAYOUTS = {
  monaco: {
    name: 'Circuit de Monaco',
    width: 800,
    height: 400,
    track: [
      // Simplified Monaco track points
      { x: 100, y: 200 }, { x: 150, y: 180 }, { x: 200, y: 160 },
      { x: 250, y: 150 }, { x: 300, y: 145 }, { x: 350, y: 150 },
      { x: 400, y: 160 }, { x: 450, y: 180 }, { x: 500, y: 200 },
      { x: 550, y: 220 }, { x: 600, y: 250 }, { x: 650, y: 280 },
      { x: 700, y: 300 }, { x: 750, y: 320 }, { x: 780, y: 340 },
      { x: 800, y: 360 }, { x: 800, y: 380 }, { x: 780, y: 390 },
      { x: 700, y: 395 }, { x: 600, y: 390 }, { x: 500, y: 380 },
      { x: 400, y: 360 }, { x: 300, y: 340 }, { x: 200, y: 320 },
      { x: 150, y: 300 }, { x: 100, y: 280 }, { x: 80, y: 260 },
      { x: 70, y: 240 }, { x: 80, y: 220 }, { x: 100, y: 200 }
    ]
  },
  silverstone: {
    name: 'Silverstone Circuit',
    width: 800,
    height: 600,
    track: [
      // Simplified Silverstone track points
      { x: 400, y: 100 }, { x: 500, y: 120 }, { x: 600, y: 150 },
      { x: 700, y: 200 }, { x: 750, y: 250 }, { x: 780, y: 300 },
      { x: 800, y: 350 }, { x: 800, y: 400 }, { x: 780, y: 450 },
      { x: 750, y: 500 }, { x: 700, y: 540 }, { x: 600, y: 570 },
      { x: 500, y: 580 }, { x: 400, y: 580 }, { x: 300, y: 570 },
      { x: 200, y: 540 }, { x: 100, y: 500 }, { x: 50, y: 450 },
      { x: 20, y: 400 }, { x: 20, y: 350 }, { x: 50, y: 300 },
      { x: 100, y: 250 }, { x: 200, y: 200 }, { x: 300, y: 150 },
      { x: 400, y: 100 }
    ]
  }
}

export function CircuitMap({ 
  drivers, 
  lapData, 
  currentLap, 
  selectedDriver, 
  onDriverSelect,
  className 
}: CircuitMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredDriver, setHoveredDriver] = useState<number | null>(null)
  const [circuitKey] = useState<'monaco' | 'silverstone'>('monaco')
  const [driverPositions, setDriverPositions] = useState<DriverPosition[]>([])

  const circuit = CIRCUIT_LAYOUTS[circuitKey]

  // Calculate driver positions on track
  const calculateDriverPositions = useCallback(() => {
    const currentLapData = lapData.filter(lap => lap.lap_number === currentLap)
    
    const positions: DriverPosition[] = currentLapData.map((lap) => {
      const driver = drivers.find(d => d.id === lap.driver_id)
      if (!driver) return null

      // Simplified position calculation based on position number
      // In real implementation, this would use actual GPS coordinates
      const trackIndex = (lap.position - 1) % circuit.track.length
      const trackPoint = circuit.track[trackIndex]
      
      // Add some variation based on position to avoid overlap
      const offset = (lap.position % 3 - 1) * 15
      
      return {
        driverId: lap.driver_id,
        x: trackPoint.x + offset,
        y: trackPoint.y + offset,
        position: lap.position,
        driverName: `${driver.first_name} ${driver.last_name}`,
        tireCompound: lap.tire_compound,
        team: driver.team
      }
    }).filter(Boolean) as DriverPosition[]

    setDriverPositions(positions)
  }, [drivers, lapData, currentLap, circuit.track])

  // Draw circuit and drivers
  const drawCircuit = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw track
    ctx.strokeStyle = '#9e9e9e'
    ctx.lineWidth = 20
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    circuit.track.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Draw track center line
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.stroke()
    ctx.setLineDash([])

    // Draw start/finish line
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    const startPoint = circuit.track[0]
    ctx.beginPath()
    ctx.moveTo(startPoint.x - 20, startPoint.y - 20)
    ctx.lineTo(startPoint.x + 20, startPoint.y + 20)
    ctx.stroke()

    // Draw drivers
    driverPositions.forEach((driverPos) => {
      const isSelected = driverPos.driverId === selectedDriver
      const isHovered = driverPos.driverId === hoveredDriver

      // Driver circle
      ctx.beginPath()
      ctx.arc(driverPos.x, driverPos.y, isSelected ? 12 : 8, 0, 2 * Math.PI)
      
      // Fill with team color (simplified)
      const teamColors: Record<string, string> = {
        'Mercedes': '#00D2BE',
        'Red Bull': '#1E41FF',
        'Ferrari': '#DC0000',
        'McLaren': '#FF8700',
        'Alpine': '#0090FF',
        'Aston Martin': '#006F62',
        'Williams': '#005AFF',
        'AlphaTauri': '#2B4562',
        'Alfa Romeo': '#900000',
        'Haas': '#FFFFFF'
      }
      
      ctx.fillStyle = teamColors[driverPos.team] || '#666666'
      ctx.fill()

      // Border
      ctx.strokeStyle = isSelected ? '#FFD700' : isHovered ? '#FFFFFF' : '#000000'
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.stroke()

      // Position number
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(driverPos.position.toString(), driverPos.x, driverPos.y)
    })
  }, [circuit, driverPositions, selectedDriver, hoveredDriver])

  // Handle canvas click
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Find clicked driver
    const clickedDriver = driverPositions.find((driverPos) => {
      const distance = Math.sqrt(Math.pow(x - driverPos.x, 2) + Math.pow(y - driverPos.y, 2))
      return distance <= 12
    })

    if (clickedDriver && onDriverSelect) {
      onDriverSelect(clickedDriver.driverId)
    }
  }, [driverPositions, onDriverSelect])

  // Handle canvas mouse move
  const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Find hovered driver
    const hoveredDriverPos = driverPositions.find((driverPos) => {
      const distance = Math.sqrt(Math.pow(x - driverPos.x, 2) + Math.pow(y - driverPos.y, 2))
      return distance <= 12
    })

    setHoveredDriver(hoveredDriverPos?.driverId || null)
  }, [driverPositions])

  // Update positions when lap changes
  useEffect(() => {
    calculateDriverPositions()
  }, [calculateDriverPositions])

  // Redraw when positions change
  useEffect(() => {
    drawCircuit()
  }, [drawCircuit])

  const selectedDriverData = driverPositions.find(d => d.driverId === selectedDriver)
  const hoveredDriverData = driverPositions.find(d => d.driverId === hoveredDriver)

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Circuit - {circuit.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Tour {currentLap}
            </Badge>
            <Badge variant="secondary">
              {driverPositions.length} pilotes
            </Badge>
          </div>
        </div>

        {/* Circuit Canvas */}
        <div className="relative bg-container rounded-lg p-4">
          <canvas
            ref={canvasRef}
            width={circuit.width}
            height={circuit.height}
            className="w-full h-auto cursor-pointer"
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setHoveredDriver(null)}
          />

          {/* Driver info tooltip */}
          {(selectedDriverData || hoveredDriverData) && (
            <div className="absolute top-4 right-4 bg-background border border-border rounded-lg p-3 shadow-lg">
              <div className="space-y-2">
                <div className="font-medium">
                  {(selectedDriverData || hoveredDriverData)?.driverName}
                </div>
                <div className="text-sm text-text-secondary">
                  Position: {formatPosition((selectedDriverData || hoveredDriverData)?.position || 0)}
                </div>
                <div className={cn('text-sm', getTireCompoundColor((selectedDriverData || hoveredDriverData)?.tireCompound || 'HARD'))}>
                  {formatTireCompound((selectedDriverData || hoveredDriverData)?.tireCompound || 'HARD')}
                </div>
                <div className="text-sm text-text-secondary">
                  {(selectedDriverData || hoveredDriverData)?.team}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Driver list */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Classement du tour</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {driverPositions
              .sort((a, b) => a.position - b.position)
              .map((driverPos) => (
                <Button
                  key={driverPos.driverId}
                  variant={selectedDriver === driverPos.driverId ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onDriverSelect?.(driverPos.driverId)}
                  className="justify-start text-xs"
                >
                  <span className="font-mono mr-2">
                    P{driverPos.position}
                  </span>
                  <span className="flex-1 text-left">
                    {driverPos.driverName}
                  </span>
                  <span className={cn('ml-1', getTireCompoundColor(driverPos.tireCompound))}>
                    {driverPos.tireCompound[0]}
                  </span>
                </Button>
              ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHoveredDriver(null)}
          >
            Effacer sélection
          </Button>
        </div>
      </div>
    </Card>
  )
}
