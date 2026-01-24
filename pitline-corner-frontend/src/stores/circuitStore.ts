import { create } from 'zustand'
import type { Circuit, ApiResponse } from '@/types'

interface CircuitState {
  circuits: Circuit[]
  currentCircuit: Circuit | null
  isLoading: boolean
  error: string | null
  
  // Actions
  loadCircuits: () => Promise<void>
  loadCircuit: (circuitId: number) => Promise<void>
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

export const useCircuitStore = create<CircuitState>((set) => ({
  circuits: [],
  currentCircuit: null,
  isLoading: false,
  error: null,

  loadCircuits: async (): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      // Note: Backend doesn't have a circuits endpoint yet, but we can get them from races
      const result = await apiCall<{ races: any[] }>(`${API_BASE_URL}/api/v1/races`)
      
      // Extract unique circuits from races
      const uniqueCircuits = new Map()
      result.races.forEach(race => {
        if (race.circuit && !uniqueCircuits.has(race.circuit.id)) {
          uniqueCircuits.set(race.circuit.id, race.circuit)
        }
      })
      
      set({ 
        circuits: Array.from(uniqueCircuits.values()),
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des circuits',
        isLoading: false 
      })
    }
  },

  loadCircuit: async (circuitId: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      // Find circuit from races since no direct circuit endpoint
      const result = await apiCall<{ races: any[] }>(`${API_BASE_URL}/api/v1/races`)
      
      const circuit = result.races
        .find(race => race.circuit?.id === circuitId)?.circuit || null
      
      set({ 
        currentCircuit: circuit,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement du circuit',
        isLoading: false 
      })
    }
  },

  clearError: (): void => {
    set({ error: null })
  },
}))

// Selectors (REQUIRED by project-context.md)
export const selectCircuits = (state: CircuitState) => state.circuits
export const selectCurrentCircuit = (state: CircuitState) => state.currentCircuit
export const selectCircuitLoading = (state: CircuitState) => state.isLoading
export const selectCircuitError = (state: CircuitState) => state.error
