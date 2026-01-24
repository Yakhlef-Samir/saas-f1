import { create } from 'zustand'
import type { Race, Driver, LapData, ApiResponse } from '@/types'

interface RaceState {
  currentRace: Race | null
  races: Race[]
  drivers: Driver[]
  lapData: LapData[]
  isLoading: boolean
  error: string | null
  
  // Actions
  loadRaces: () => Promise<void>
  loadRace: (raceId: number) => Promise<void>
  loadDrivers: (raceId?: number) => Promise<void>
  loadLapData: (raceId: number) => Promise<void>
  setCurrentRace: (race: Race | null) => void
  clearError: () => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Helper function for API calls
const apiCall = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }
  
  const result: ApiResponse<T> = await response.json()
  return result.data
}

export const useRaceStore = create<RaceState>((set) => ({
  currentRace: null,
  races: [],
  drivers: [],
  lapData: [],
  isLoading: false,
  error: null,

  loadRaces: async (): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      const result = await apiCall<{ races: Race[] }>(`${API_BASE_URL}/api/v1/races`)
      
      set({ 
        races: result.races,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des courses',
        isLoading: false 
      })
    }
  },

  loadRace: async (raceId: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      const race = await apiCall<Race>(`${API_BASE_URL}/api/v1/races/${raceId}`)
      
      set({ 
        currentRace: race,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement de la course',
        isLoading: false 
      })
    }
  },

  loadDrivers: async (raceId?: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      let url = `${API_BASE_URL}/api/v1/drivers`
      
      // If raceId is provided, get drivers for that specific race
      if (raceId) {
        url = `${API_BASE_URL}/api/v1/races/${raceId}/drivers`
      }
      
      const result = await apiCall<{ drivers: Driver[] }>(url)
      
      set({ 
        drivers: result.drivers,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des pilotes',
        isLoading: false 
      })
    }
  },

  loadLapData: async (raceId: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      const result = await apiCall<{ lap_data: LapData[] }>(`${API_BASE_URL}/api/v1/races/${raceId}/laps`)
      
      set({ 
        lapData: result.lap_data,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des données de tours',
        isLoading: false 
      })
    }
  },

  setCurrentRace: (race: Race | null): void => {
    set({ currentRace: race })
  },

  clearError: (): void => {
    set({ error: null })
  },
}))

// Selectors (REQUIRED by project-context.md)
export const selectCurrentRace = (state: RaceState) => state.currentRace
export const selectRaces = (state: RaceState) => state.races
export const selectDrivers = (state: RaceState) => state.drivers
export const selectLapData = (state: RaceState) => state.lapData
export const selectRaceLoading = (state: RaceState) => state.isLoading
export const selectRaceError = (state: RaceState) => state.error
