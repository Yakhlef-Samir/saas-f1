import { useEffect, useCallback } from 'react'
import { useRaceStore, selectRaces, selectCurrentRace, selectDrivers, selectLapData, selectRaceLoading, selectRaceError } from '../stores/raceStore'

/**
 * Custom hook for race data management with selectors
 * Follows project-context.md rule: always use exported selectors
 */
export function useRaces() {
  const races = useRaceStore(selectRaces)
  const isLoading = useRaceStore(selectRaceLoading)
  const error = useRaceStore(selectRaceError)
  
  const loadRaces = useRaceStore((state) => state.loadRaces)

  // Load races on mount
  useEffect(() => {
    if (races.length === 0 && !isLoading) {
      loadRaces()
    }
  }, [races.length, isLoading, loadRaces])

  return {
    races,
    isLoading,
    error,
    loadRaces,
  }
}

/**
 * Custom hook for current race management
 */
export function useCurrentRace(raceId?: number) {
  const currentRace = useRaceStore(selectCurrentRace)
  const drivers = useRaceStore(selectDrivers)
  const lapData = useRaceStore(selectLapData)
  const isLoading = useRaceStore(selectRaceLoading)
  const error = useRaceStore(selectRaceError)
  
  const loadRace = useRaceStore((state) => state.loadRace)
  const loadDrivers = useRaceStore((state) => state.loadDrivers)
  const loadLapData = useRaceStore((state) => state.loadLapData)
  const setCurrentRace = useRaceStore((state) => state.setCurrentRace)

  // Load race data when raceId changes
  useEffect(() => {
    if (raceId && (!currentRace || currentRace.id !== raceId)) {
      loadRace(raceId)
    }
  }, [raceId, currentRace, loadRace])

  // Load drivers when race is loaded
  useEffect(() => {
    if (currentRace && drivers.length === 0) {
      loadDrivers(currentRace.id)
    }
  }, [currentRace, drivers.length, loadDrivers])

  // Load lap data when race is loaded
  useEffect(() => {
    if (currentRace && lapData.length === 0) {
      loadLapData(currentRace.id)
    }
  }, [currentRace, lapData.length, loadLapData])

  const getDriverById = useCallback((driverId: number) => {
    return drivers.find(driver => driver.id === driverId)
  }, [drivers])

  const getLapData = useCallback((driverId: number, lapNumber: number) => {
    return lapData.find(lap => lap.driver_id === driverId && lap.lap_number === lapNumber)
  }, [lapData])

  const getDriverLapData = useCallback((driverId: number) => {
    return lapData.filter(lap => lap.driver_id === driverId).sort((a, b) => a.lap_number - b.lap_number)
  }, [lapData])

  return {
    currentRace,
    drivers,
    lapData,
    isLoading,
    error,
    loadRace,
    loadDrivers,
    loadLapData,
    setCurrentRace,
    getDriverById,
    getLapData,
    getDriverLapData,
  }
}

/**
 * Custom hook for race filtering and searching
 */
export function useRaceFilters() {
  const races = useRaceStore(selectRaces)
  
  const getRacesBySeason = useCallback((season: number) => {
    return races.filter(race => race.season === season)
  }, [races])

  const getRaceByRound = useCallback((season: number, round: number) => {
    return races.find(race => race.season === season && race.round === round)
  }, [races])

  const searchRaces = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase()
    return races.filter(race => 
      race.name.toLowerCase().includes(lowerQuery) ||
      race.circuit_name.toLowerCase().includes(lowerQuery) ||
      race.country.toLowerCase().includes(lowerQuery)
    )
  }, [races])

  const getCompletedRaces = useCallback(() => {
    return races.filter(race => race.status === 'completed')
  }, [races])

  const getUpcomingRaces = useCallback(() => {
    return races.filter(race => race.status === 'scheduled')
  }, [races])

  return {
    getRacesBySeason,
    getRaceByRound,
    searchRaces,
    getCompletedRaces,
    getUpcomingRaces,
  }
}
