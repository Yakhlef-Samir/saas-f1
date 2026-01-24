// Central export point for all stores
export { useAuthStore, selectUser, selectToken, selectIsAuthenticated, selectIsLoading, selectError } from './authStore'
export { useRaceStore, selectCurrentRace, selectRaces, selectDrivers, selectLapData, selectRaceLoading, selectRaceError } from './raceStore'
export { useSimulationStore, selectCurrentSimulation, selectUserSimulations, selectRaceSimulations, selectIsSimulating, selectSimulationLoading, selectSimulationError } from './simulationStore'
export { usePitStopStore, selectPitStops, selectPitStopLoading, selectPitStopError } from './pitStopStore'
export { useCircuitStore, selectCircuits, selectCurrentCircuit, selectCircuitLoading, selectCircuitError } from './circuitStore'
export { useStrategyStore, selectPitStopSimulation, selectOvertakeSimulation, selectDefenseSimulation, selectWeatherSimulation, selectStrategyLoading, selectStrategyError } from './strategyStore'
export { useUIStore } from './uiStore'

// Re-export types for convenience
export type { User, Race, Driver, LapData, PitStop, Simulation, Circuit, ApiResponse } from '@/types'
export type { SimulationRequest } from './simulationStore'
export type { PitStopSimulation, OvertakeSimulation, DefenseSimulation, WeatherSimulation } from './strategyStore'
