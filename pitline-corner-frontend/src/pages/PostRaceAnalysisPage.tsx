import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import '@/styles/f1-core.css'

interface TimelinePosition {
  lap: number
  time: string
  gap: number
  position: number
}

interface TelemetryData {
  speed: number
  drs: boolean
  throttle: number
  brake: number
  gear: number
}

export default function PostRaceAnalysisPage() {
  const [currentLap] = useState(42)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState('VER')

  // Mock data - à remplacer avec données réelles
  const mockRaceData = {
    raceName: 'São Paulo Grand Prix 2024',
    drivers: [
      { code: 'VER', name: 'Max Verstappen', team: 'Red Bull', color: '#1e3050' },
      { code: 'NOR', name: 'Lando Norris', team: 'McLaren', color: '#ff8700' },
      { code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', color: '#dc0000' },
      { code: 'PIA', name: 'Oscar Piastri', team: 'McLaren', color: '#ff8700' },
    ],
    totalLaps: 71,
  }

  const mockTelemetry: TelemetryData = {
    speed: 312,
    drs: true,
    throttle: 95,
    brake: 45,
    gear: 8,
  }

  const mockPositions: TimelinePosition[] = [
    { lap: 1, time: '00:00:00', gap: 0, position: 1 },
    { lap: 10, time: '00:09:15', gap: 1.2, position: 1 },
    { lap: 20, time: '00:18:30', gap: 0.8, position: 1 },
    { lap: 30, time: '00:27:45', gap: 1.5, position: 1 },
    { lap: 40, time: '00:37:00', gap: 2.1, position: 1 },
    { lap: 42, time: '00:39:15', gap: 2.3, position: 1 },
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-f1-dark text-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-f1-dark to-f1-dark-hover border-b border-f1-dark-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold mb-2">{mockRaceData.raceName}</h1>
            <p className="text-f1-cyan text-lg">Post-Race Analysis Dashboard</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Track Map & Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Race Timeline & Replay Control */}
              <div className="bg-f1-dark-hover border border-f1-dark-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-f1-cyan">Race Timeline & Replay Control</h2>

                {/* Track Map Placeholder */}
                <div className="bg-f1-dark rounded-lg p-8 mb-6 h-80 flex items-center justify-center border-2 border-f1-dark-border">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏁</div>
                    <p className="text-gray-400">Track Map Visualization</p>
                    <p className="text-sm text-gray-500 mt-2">Circuit Layout with Car Positions</p>
                  </div>
                </div>

                {/* Timeline Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono">LAP {currentLap} / {mockRaceData.totalLaps}</span>
                    <span className="text-sm font-mono text-f1-cyan">01:12:45.234</span>
                  </div>

                  <div className="w-full h-2 bg-f1-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-f1-red transition-all"
                      style={{ width: `${(currentLap / mockRaceData.totalLaps) * 100}%` }}
                    />
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button className="p-2 hover:bg-f1-dark-hover rounded transition">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="p-3 bg-f1-red hover:bg-f1-red-dark rounded transition"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button className="p-2 hover:bg-f1-dark-hover rounded transition">
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Timing Historical Data */}
              <div className="bg-f1-dark-hover border border-f1-dark-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-f1-cyan">Live Timing (Historical)</h2>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {mockRaceData.drivers.map((driver, idx) => (
                    <div
                      key={driver.code}
                      className="flex items-center justify-between p-3 bg-f1-dark rounded hover:bg-f1-dark-hover transition"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-8 rounded"
                          style={{ backgroundColor: driver.color }}
                        />
                        <div>
                          <p className="font-bold">{idx + 1}</p>
                        </div>
                        <div>
                          <p className="font-bold">{driver.code}</p>
                          <p className="text-sm text-gray-400">{driver.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono">
                          {driver.code === selectedDriver ? '+2.432' : '+5.109'}
                        </p>
                        <p className="text-sm text-gray-400">GAP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Telemetry & Data */}
            <div className="space-y-6">
              {/* Driver Selection */}
              <div className="bg-f1-dark-hover border border-f1-dark-border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Driver Selection</h3>
                <div className="space-y-2">
                  {mockRaceData.drivers.slice(0, 2).map((driver) => (
                    <button
                      key={driver.code}
                      onClick={() => setSelectedDriver(driver.code)}
                      className={`w-full text-left p-3 rounded transition ${
                        selectedDriver === driver.code
                          ? 'bg-f1-red text-white'
                          : 'bg-f1-dark hover:bg-f1-dark-hover'
                      }`}
                    >
                      <p className="font-bold">{driver.code}</p>
                      <p className="text-sm">{driver.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Telemetry Data */}
              <div className="bg-f1-dark-hover border border-f1-dark-border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-f1-cyan">Telemetry</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Speed</span>
                      <span className="font-mono font-bold">{mockTelemetry.speed} km/h</span>
                    </div>
                    <div className="w-full h-2 bg-f1-dark rounded overflow-hidden">
                      <div
                        className="h-full bg-f1-red"
                        style={{ width: `${(mockTelemetry.speed / 350) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Throttle</span>
                      <span className="font-mono font-bold">{mockTelemetry.throttle}%</span>
                    </div>
                    <div className="w-full h-2 bg-f1-dark rounded overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${mockTelemetry.throttle}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Brake</span>
                      <span className="font-mono font-bold">{mockTelemetry.brake}%</span>
                    </div>
                    <div className="w-full h-2 bg-f1-dark rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${mockTelemetry.brake}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-f1-dark-border">
                    <div className="flex justify-between">
                      <span>Gear</span>
                      <span className="font-mono font-bold text-f1-cyan">{mockTelemetry.gear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DRS</span>
                      <span className={`font-bold ${mockTelemetry.drs ? 'text-green-400' : 'text-red-400'}`}>
                        {mockTelemetry.drs ? 'ACTIVE' : 'CLOSED'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gap to Leader Chart */}
              <div className="bg-f1-dark-hover border border-f1-dark-border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-f1-cyan">Gap Evolution</h3>
                <div className="h-32 flex items-end gap-1">
                  {mockPositions.map((pos) => (
                    <div
                      key={pos.lap}
                      className="flex-1 bg-f1-red hover:bg-f1-red-dark rounded-t transition"
                      style={{
                        height: `${(pos.gap / Math.max(...mockPositions.map((p) => p.gap))) * 100}%`,
                      }}
                      title={`Lap ${pos.lap}: +${pos.gap}s`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Gap to Leader (seconds)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
