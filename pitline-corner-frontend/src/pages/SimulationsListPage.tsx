import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useSimulation } from '@/hooks/useSimulation'
import { Play, Trash2, Eye } from 'lucide-react'
import '@/styles/f1-core.css'

interface SimulationItem {
  id: string
  raceId: string
  raceName: string
  driverId: string
  driverName: string
  scenarioType: string
  confidence: number
  positionGain: number
  createdAt: string
  results?: {
    originalPosition: number
    predictedPosition: number
    recommendation: string
  }
}

export default function SimulationsListPage() {
  const navigate = useNavigate()
  const { loadUserSimulations, isLoading } = useSimulation()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadUserSimulations()
  }, [loadUserSimulations])

  // Mock data for simulations (replace with actual data from store)
  const mockSimulations: SimulationItem[] = [
    {
      id: '1',
      raceId: '1',
      raceName: 'Monaco Grand Prix',
      driverId: '1',
      driverName: 'Max Verstappen',
      scenarioType: 'Pit Stop Strategy',
      confidence: 92,
      positionGain: 2,
      createdAt: '2024-01-20',
      results: {
        originalPosition: 5,
        predictedPosition: 3,
        recommendation: 'Pit stop at lap 35 for optimal tire management'
      }
    },
    {
      id: '2',
      raceId: '2',
      raceName: 'Silverstone Circuit',
      driverId: '16',
      driverName: 'Lewis Hamilton',
      scenarioType: 'Overtaking Opportunity',
      confidence: 85,
      positionGain: 1,
      createdAt: '2024-01-19',
      results: {
        originalPosition: 4,
        predictedPosition: 3,
        recommendation: 'Attack on lap 20 when DRS is available'
      }
    },
    {
      id: '3',
      raceId: '3',
      raceName: 'Circuit of the Americas',
      driverId: '55',
      driverName: 'Carlos Sainz',
      scenarioType: 'Weather Adaptation',
      confidence: 78,
      positionGain: 0,
      createdAt: '2024-01-18',
      results: {
        originalPosition: 6,
        predictedPosition: 6,
        recommendation: 'Conservative strategy due to unpredictable conditions'
      }
    }
  ]

  const scenarios = ['all', 'Pit Stop Strategy', 'Overtaking Opportunity', 'Weather Adaptation', 'Defense Position']

  const filteredSimulations = filter === 'all'
    ? mockSimulations
    : mockSimulations.filter(sim => sim.scenarioType === filter)

  return (
    <AppLayout>
      <div className="f1-page">
        <div className="min-h-screen bg-f1-dark text-white p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-f1-red">My Simulations</h1>
            <p className="text-gray-400">Manage and review all your race strategy simulations</p>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex gap-4">
            <button
              onClick={() => navigate('/strategy/new')}
              className="bg-f1-red hover:bg-f1-red-dark text-white font-bold py-3 px-6 rounded transition"
            >
              + New Simulation
            </button>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-f1-cyan">Filter by Scenario</h2>
            <div className="flex flex-wrap gap-3">
              {scenarios.map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => setFilter(scenario)}
                  className={`px-4 py-2 rounded transition ${
                    filter === scenario
                      ? 'bg-f1-red text-white'
                      : 'bg-f1-dark-hover hover:bg-f1-dark-border text-gray-300'
                  }`}
                >
                  {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Simulations List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading simulations...</p>
              </div>
            ) : filteredSimulations.length > 0 ? (
              filteredSimulations.map((simulation) => (
                <div
                  key={simulation.id}
                  className="bg-f1-dark-hover border border-f1-dark-border rounded-lg p-6 hover:border-f1-red transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{simulation.raceName}</h3>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span>{simulation.driverName}</span>
                        <span className="text-f1-red font-semibold">{simulation.scenarioType}</span>
                        <span>{new Date(simulation.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-f1-red mb-1">
                        {simulation.positionGain > 0 ? '+' : ''}{simulation.positionGain}
                      </div>
                      <div className="text-sm text-gray-400">Position Gain</div>
                    </div>
                  </div>

                  {simulation.results && (
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="bg-f1-dark rounded p-3">
                        <div className="text-gray-400 mb-1">Current Position</div>
                        <div className="text-lg font-bold">P{simulation.results.originalPosition}</div>
                      </div>
                      <div className="bg-f1-dark rounded p-3">
                        <div className="text-gray-400 mb-1">Predicted Position</div>
                        <div className="text-lg font-bold text-f1-red">P{simulation.results.predictedPosition}</div>
                      </div>
                      <div className="bg-f1-dark rounded p-3">
                        <div className="text-gray-400 mb-1">Confidence</div>
                        <div className="text-lg font-bold text-f1-cyan">{simulation.confidence}%</div>
                      </div>
                    </div>
                  )}

                  <div className="mb-4 p-3 bg-f1-dark rounded border-l-4 border-f1-red">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-white">Recommendation: </span>
                      {simulation.results?.recommendation}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/analysis/${simulation.raceId}`)}
                      className="flex items-center gap-2 bg-f1-red hover:bg-f1-red-dark text-white px-4 py-2 rounded transition flex-1"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 bg-f1-dark-hover hover:bg-f1-dark-border text-gray-300 px-4 py-2 rounded transition">
                      <Play className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center gap-2 bg-f1-dark-hover hover:bg-red-600 text-gray-300 hover:text-white px-4 py-2 rounded transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-f1-dark-hover border border-f1-dark-border rounded">
                <p className="text-gray-400 mb-4">No simulations found</p>
                <button
                  onClick={() => navigate('/strategy/new')}
                  className="bg-f1-red hover:bg-f1-red-dark text-white px-6 py-2 rounded transition"
                >
                  Create Your First Simulation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
