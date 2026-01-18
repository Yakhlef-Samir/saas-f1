import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StrategyBadge, StrategyBadgeMini } from './StrategyBadge'
import { RaceTimeline } from './RaceTimeline'
import { CircuitMap } from './CircuitMap'
import type { SimulationResult, Driver, LapData, PitStop } from '@/types'

// Mock data for demonstration
const mockSimulation: SimulationResult = {
  id: 1,
  race_id: 1,
  driver_id: 1,
  alternative_stop_lap: 23,
  alternative_tire_compound: 'MEDIUM',
  predicted_position: 3,
  predicted_gap: 2.456,
  actual_position: 5,
  actual_gap: 4.123,
  position_delta: -2,
  gap_delta: 1.667,
  simulation_metadata: {
    calculation_time_ms: 1250,
    traffic_affected: true,
    confidence_score: 0.85
  },
  created_at: '2026-01-15T10:30:00Z',
  user_id: 1
}

const mockDrivers: Driver[] = [
  { id: 1, driver_number: 1, code: 'VER', first_name: 'Max', last_name: 'Verstappen', team: 'Red Bull' },
  { id: 2, driver_number: 11, code: 'PER', first_name: 'Sergio', last_name: 'Perez', team: 'Red Bull' },
  { id: 3, driver_number: 16, code: 'LEC', first_name: 'Charles', last_name: 'Leclerc', team: 'Ferrari' },
  { id: 4, driver_number: 55, code: 'SAI', first_name: 'Carlos', last_name: 'Sainz', team: 'Ferrari' },
  { id: 5, driver_number: 44, code: 'HAM', first_name: 'Lewis', last_name: 'Hamilton', team: 'Mercedes' },
  { id: 6, driver_number: 63, code: 'RUS', first_name: 'George', last_name: 'Russell', team: 'Mercedes' }
]

const mockLapData: LapData[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  race_id: 1,
  driver_id: (i % 6) + 1,
  lap_number: Math.floor(i / 6) + 1,
  position: ((i % 6) + 1),
  lap_time_seconds: 82.456 + (i % 6) * 0.123,
  sector_times: {
    sector1: 28.123 + (i % 6) * 0.041,
    sector2: 30.234 + (i % 6) * 0.052,
    sector3: 24.099 + (i % 6) * 0.030
  },
  tire_compound: ['SOFT', 'MEDIUM', 'HARD'][i % 3] as 'SOFT' | 'MEDIUM' | 'HARD',
  tire_age: Math.floor(i / 6) * 5 + 10,
  gap_to_leader: (i % 6) * 1.234
}))

const mockPitStops: PitStop[] = [
  { id: 1, race_id: 1, driver_id: 1, stop_number: 1, lap: 15, duration_seconds: 2.8, tire_compound_after: 'MEDIUM' },
  { id: 2, race_id: 1, driver_id: 2, stop_number: 1, lap: 16, duration_seconds: 2.9, tire_compound_after: 'MEDIUM' },
  { id: 3, race_id: 1, driver_id: 3, stop_number: 1, lap: 23, duration_seconds: 2.7, tire_compound_after: 'HARD' },
  { id: 4, race_id: 1, driver_id: 4, stop_number: 1, lap: 24, duration_seconds: 2.6, tire_compound_after: 'HARD' },
  { id: 5, race_id: 1, driver_id: 5, stop_number: 1, lap: 18, duration_seconds: 3.1, tire_compound_after: 'MEDIUM' },
  { id: 6, race_id: 1, driver_id: 6, stop_number: 1, lap: 19, duration_seconds: 2.8, tire_compound_after: 'MEDIUM' }
]

export function F1ComponentsDemo() {
  const [currentLap, setCurrentLap] = useState(25)
  const [selectedDriver, setSelectedDriver] = useState<number | undefined>(1)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Composants F1 Pitline Corner</h1>
        <p className="text-text-secondary">
          Démonstration des composants spécifiques F1 avec données mock
        </p>
      </div>

      <Tabs defaultValue="strategy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategy">Strategy Badge</TabsTrigger>
          <TabsTrigger value="timeline">Race Timeline</TabsTrigger>
          <TabsTrigger value="circuit">Circuit Map</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Strategy Badge</h2>
            
            <div className="space-y-6">
              {/* Full Strategy Badge */}
              <div>
                <h3 className="text-lg font-medium mb-2">Badge complet</h3>
                <StrategyBadge simulation={mockSimulation} />
              </div>

              {/* Mini Strategy Badge */}
              <div>
                <h3 className="text-lg font-medium mb-2">Badge mini</h3>
                <div className="flex gap-2">
                  <StrategyBadgeMini simulation={mockSimulation} />
                  <Badge variant="outline" className="font-mono">
                    P{mockSimulation.actual_position} → P{mockSimulation.predicted_position}
                  </Badge>
                </div>
              </div>

              {/* Multiple scenarios */}
              <div>
                <h3 className="text-lg font-medium mb-2">Différents scénarios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { ...mockSimulation, position_delta: 3 },
                    { ...mockSimulation, position_delta: 1 },
                    { ...mockSimulation, position_delta: 0 },
                    { ...mockSimulation, position_delta: -1 },
                    { ...mockSimulation, position_delta: -3 }
                  ].map((sim, index) => (
                    <StrategyBadgeMini key={index} simulation={sim} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <RaceTimeline
            laps={mockLapData}
            pitStops={mockPitStops}
            currentLap={currentLap}
            totalLaps={50}
            onLapChange={setCurrentLap}
          />
        </TabsContent>

        <TabsContent value="circuit" className="space-y-4">
          <CircuitMap
            drivers={mockDrivers}
            lapData={mockLapData}
            currentLap={currentLap}
            selectedDriver={selectedDriver}
            onDriverSelect={setSelectedDriver}
          />
        </TabsContent>
      </Tabs>

      {/* Controls */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="lap-control" className="text-sm font-medium">
              Tour actuel:
            </label>
            <input
              id="lap-control"
              type="range"
              min="1"
              max="50"
              value={currentLap}
              onChange={(e) => setCurrentLap(Number(e.target.value))}
              className="w-32"
            />
            <Badge variant="outline">{currentLap}</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentLap(Math.max(1, currentLap - 1))}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentLap(Math.min(50, currentLap + 1))}
            >
              →
            </Button>
          </div>

          {selectedDriver && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDriver(undefined)}
            >
              Effacer sélection pilote
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
