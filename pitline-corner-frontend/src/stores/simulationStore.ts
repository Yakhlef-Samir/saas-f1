import { create } from 'zustand'

// Types matching API response format (snake_case as per project-context.md)
export interface SimulationRequest {
  race_id: number
  driver_id: number
  alternative_stop_lap: number
  alternative_tire_compound: string
}

export interface SimulationResult {
  id: number
  race_id: number
  driver_id: number
  alternative_stop_lap: number
  alternative_tire_compound: string
  predicted_position: number
  predicted_gap: number
  actual_position: number
  actual_gap: number
  position_delta: number
  gap_delta: number
  simulation_metadata: {
    calculation_time_ms: number
    traffic_affected: boolean
    confidence_score: number
  }
  created_at: string
  user_id: number
}

export interface Simulation {
  id: number
  race_id: number
  driver_id: number
  alternative_stop_lap: number
  alternative_tire_compound: string
  predicted_position: number
  predicted_gap: number
  actual_position: number
  actual_gap: number
  position_delta: number
  gap_delta: number
  created_at: string
}

interface SimulationState {
  currentSimulation: SimulationResult | null
  userSimulations: Simulation[]
  isSimulating: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  runSimulation: (request: SimulationRequest) => Promise<SimulationResult | null>
  loadUserSimulations: () => Promise<void>
  setCurrentSimulation: (simulation: SimulationResult | null) => void
  clearError: () => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSimulationStore = create<SimulationState>((set) => ({
  currentSimulation: null,
  userSimulations: [],
  isSimulating: false,
  isLoading: false,
  error: null,

  runSimulation: async (request: SimulationRequest): Promise<SimulationResult | null> => {
    set({ isSimulating: true, error: null })
    
    try {
      const token = localStorage.getItem('auth-storage')
      if (!token) {
        throw new Error('Authentication required')
      }

      const authData = JSON.parse(token)
      const accessToken = authData.state?.token

      const response = await fetch(`${API_BASE_URL}/api/v1/simulations/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(request),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Simulation failed')
      }
      
      const result = await response.json()
      const simulation = result.data
      
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
      const token = localStorage.getItem('auth-storage')
      if (!token) {
        throw new Error('Authentication required')
      }

      const authData = JSON.parse(token)
      const accessToken = authData.state?.token

      const response = await fetch(`${API_BASE_URL}/api/v1/simulations/user`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to load simulations')
      }
      
      const result = await response.json()
      set({ 
        userSimulations: result.data,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des simulations',
        isLoading: false 
      })
    }
  },

  setCurrentSimulation: (simulation: SimulationResult | null): void => {
    set({ currentSimulation: simulation })
  },

  clearError: (): void => {
    set({ error: null })
  },
}))

// Selectors (REQUIRED by project-context.md)
export const selectCurrentSimulation = (state: SimulationState) => state.currentSimulation
export const selectUserSimulations = (state: SimulationState) => state.userSimulations
export const selectIsSimulating = (state: SimulationState) => state.isSimulating
export const selectSimulationLoading = (state: SimulationState) => state.isLoading
export const selectSimulationError = (state: SimulationState) => state.error
