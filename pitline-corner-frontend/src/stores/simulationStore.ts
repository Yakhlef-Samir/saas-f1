import { create } from 'zustand'
import type { Simulation, ApiResponse } from '@/types'

// Types matching API response format (snake_case as per project-context.md)
export interface SimulationRequest {
  race_id: number
  driver_id: number
  alternative_stop_lap: number
  alternative_tire_compound: string
}

interface SimulationState {
  currentSimulation: Simulation | null
  userSimulations: Simulation[]
  raceSimulations: Simulation[]
  isSimulating: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  createSimulation: (request: SimulationRequest) => Promise<Simulation | null>
  loadUserSimulations: () => Promise<void>
  loadRaceSimulations: (raceId: number, driverId?: number) => Promise<void>
  loadSimulation: (simulationId: number) => Promise<void>
  setCurrentSimulation: (simulation: Simulation | null) => void
  clearError: () => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Helper function for API calls
const apiCall = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }
  
  const result: ApiResponse<T> = await response.json()
  return result.data
}

// Helper function for authenticated API calls
const authenticatedApiCall = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem('auth-storage')
  if (!token) {
    throw new Error('Authentication required')
  }

  const authData = JSON.parse(token)
  const accessToken = authData.state?.token

  return apiCall<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      ...options?.headers,
    },
  })
}

export const useSimulationStore = create<SimulationState>((set) => ({
  currentSimulation: null,
  userSimulations: [],
  raceSimulations: [],
  isSimulating: false,
  isLoading: false,
  error: null,

  createSimulation: async (request: SimulationRequest): Promise<Simulation | null> => {
    set({ isSimulating: true, error: null })
    
    try {
      const simulation = await authenticatedApiCall<Simulation>(
        `${API_BASE_URL}/api/v1/simulations`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      )
      
      set({ 
        currentSimulation: simulation,
        isSimulating: false 
      })
      
      return simulation
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la simulation'
      set({ 
        error: errorMessage,
        isSimulating: false 
      })
      return null
    }
  },

  loadUserSimulations: async (): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      const result = await authenticatedApiCall<{ simulations: Simulation[] }>(
        `${API_BASE_URL}/api/v1/simulations`
      )
      
      set({ 
        userSimulations: result.simulations,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des simulations',
        isLoading: false 
      })
    }
  },

  loadRaceSimulations: async (raceId: number, driverId?: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      let url = `${API_BASE_URL}/api/v1/simulations?race_id=${raceId}`
      
      if (driverId) {
        url += `&driver_id=${driverId}`
      }
      
      const result = await authenticatedApiCall<{ simulations: Simulation[] }>(url)
      
      set({ 
        raceSimulations: result.simulations,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des simulations',
        isLoading: false 
      })
    }
  },

  loadSimulation: async (simulationId: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      const simulation = await authenticatedApiCall<Simulation>(
        `${API_BASE_URL}/api/v1/simulations/${simulationId}`
      )
      
      set({ 
        currentSimulation: simulation,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement de la simulation',
        isLoading: false 
      })
    }
  },

  setCurrentSimulation: (simulation: Simulation | null): void => {
    set({ currentSimulation: simulation })
  },

  clearError: (): void => {
    set({ error: null })
  },
}))

// Selectors (REQUIRED by project-context.md)
export const selectCurrentSimulation = (state: SimulationState) => state.currentSimulation
export const selectUserSimulations = (state: SimulationState) => state.userSimulations
export const selectRaceSimulations = (state: SimulationState) => state.raceSimulations
export const selectIsSimulating = (state: SimulationState) => state.isSimulating
export const selectSimulationLoading = (state: SimulationState) => state.isLoading
export const selectSimulationError = (state: SimulationState) => state.error
