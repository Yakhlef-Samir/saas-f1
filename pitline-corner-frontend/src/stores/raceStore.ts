import { create } from 'zustand'

// Types matching API response format (snake_case as per project-context.md)
export interface Race {
  id: number
  season: number
  round: number
  name: string
  circuit_name: string
  country: string
  date: string
  status: string
  data_imported: boolean
  imported_at?: string
}

export interface Circuit {
  id: number
  name: string
  country: string
  length_km: number
  turns: number
  track_map_data?: string
}

export interface Driver {
  id: number
  driver_number: number
  code: string
  first_name: string
  last_name: string
  team: string
}

export interface LapData {
  race_id: number
  driver_id: number
  lap_number: number
  position: number
  lap_time_seconds: number
  sector_times: {
    sector1: number
    sector2: number
    sector3: number
  }
  tire_compound: string
  tire_age: number
  gap_to_leader: number
}

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
      const response = await fetch(`${API_BASE_URL}/api/v1/races`)
      
      if (!response.ok) {
        throw new Error('Failed to load races')
      }
      
      const result = await response.json()
      set({ 
        races: result.data,
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

  loadDrivers: async (raceId: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/races/${raceId}/drivers`)
      
      if (!response.ok) {
        throw new Error('Failed to load drivers')
      }
      
      const result = await response.json()
      set({ 
        drivers: result.data,
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
      const response = await fetch(`${API_BASE_URL}/api/v1/races/${raceId}/laps`)
      
      if (!response.ok) {
        throw new Error('Failed to load lap data')
      }
      
      const result = await response.json()
      set({ 
        lapData: result.data,
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
