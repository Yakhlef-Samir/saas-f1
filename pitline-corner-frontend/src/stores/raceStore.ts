import { create } from 'zustand'
import type { Race, Driver, LapData } from '@/types'
import { mockRaces, mockDrivers, generateMockLapData } from '@/hooks/useMockData'

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
  loadDrivers: (raceId: number) => Promise<void>
  loadLapData: (raceId: number) => Promise<void>
  setCurrentRace: (race: Race | null) => void
  clearError: () => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500))
      
      set({ 
        races: mockRaces,
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
      const response = await fetch(`${API_BASE_URL}/api/v1/races/${raceId}`)
      
      if (!response.ok) {
        throw new Error('Failed to load race')
      }
      
      const result = await response.json()
      set({ 
        currentRace: result.data,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement de la course',
        isLoading: false 
      })
    }
  },

  loadDrivers: async (_raceId: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 300))
      
      set({ 
        drivers: mockDrivers,
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
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 400))
      
      // Generate mock lap data for the race
      const race = mockRaces.find(r => r.id === raceId)
      const totalLaps = race ? 50 : 50 // Default to 50 laps
      const lapData = generateMockLapData(raceId, totalLaps)
      
      set({ 
        lapData,
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
