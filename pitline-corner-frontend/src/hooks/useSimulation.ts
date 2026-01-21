import { useCallback } from 'react'
import { useSimulationStore, selectCurrentSimulation, selectUserSimulations, selectIsSimulating, selectSimulationLoading, selectSimulationError } from '../stores/simulationStore'
import type { SimulationRequest } from '../types'

/**
 * Custom hook for simulation management with selectors
 * Follows project-context.md rule: always use exported selectors
 */
export function useSimulation() {
  const currentSimulation = useSimulationStore(selectCurrentSimulation)
  const userSimulations = useSimulationStore(selectUserSimulations)
  const isSimulating = useSimulationStore(selectIsSimulating)
  const isLoading = useSimulationStore(selectSimulationLoading)
  const error = useSimulationStore(selectSimulationError)
  
  const runSimulation = useSimulationStore((state) => state.runSimulation)
  const loadUserSimulations = useSimulationStore((state) => state.loadUserSimulations)
  const setCurrentSimulation = useSimulationStore((state) => state.setCurrentSimulation)
  const clearError = useSimulationStore((state) => state.clearError)

  const runNewSimulation = useCallback(async (request: SimulationRequest) => {
    const result = await runSimulation(request)
    return result
  }, [runSimulation])

  const getPositionDelta = useCallback(() => {
    if (!currentSimulation) return 0
    return currentSimulation.position_delta
  }, [currentSimulation])

  const getGapDelta = useCallback(() => {
    if (!currentSimulation) return 0
    return currentSimulation.gap_delta
  }, [currentSimulation])

  const getResultMessage = useCallback(() => {
    if (!currentSimulation) return ''
    
    const { position_delta } = currentSimulation
    
    if (position_delta > 0) {
      return `✅ Votre intuition était correcte : +${position_delta} position${position_delta > 1 ? 's' : ''} gagnée${position_delta > 1 ? 's' : ''}`
    } else if (position_delta < 0) {
      return `❌ Résultat surprenant : ${position_delta} position${position_delta < -1 ? 's' : ''} perdue${position_delta < -1 ? 's' : ''}`
    } else {
      return `↔️ Même résultat : l'équipe avait raison`
    }
  }, [currentSimulation])

  const getResultType = useCallback(() => {
    if (!currentSimulation) return 'neutral'
    
    const delta = currentSimulation.position_delta
    if (delta > 0) return 'success'
    if (delta < 0) return 'error'
    return 'neutral'
  }, [currentSimulation])

  const getSimulationById = useCallback((simulationId: number) => {
    return userSimulations.find(sim => sim.id === simulationId)
  }, [userSimulations])

  const getSimulationsByRace = useCallback((raceId: number) => {
    return userSimulations.filter(sim => sim.race_id === raceId)
  }, [userSimulations])

  const getSimulationsByDriver = useCallback((driverId: number) => {
    return userSimulations.filter(sim => sim.driver_id === driverId)
  }, [userSimulations])

  return {
    // State
    currentSimulation,
    userSimulations,
    isSimulating,
    isLoading,
    error,
    
    // Actions
    runSimulation: runNewSimulation,
    loadUserSimulations,
    setCurrentSimulation,
    clearError,
    
    // Computed
    getPositionDelta,
    getGapDelta,
    getResultMessage,
    getResultType,
    
    // Utilities
    getSimulationById,
    getSimulationsByRace,
    getSimulationsByDriver,
  }
}
