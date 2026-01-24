import { create } from 'zustand'
import type { PitStop, ApiResponse } from '@/types'

interface PitStopState {
  pitStops: PitStop[]
  isLoading: boolean
  error: string | null
  
  // Actions
  loadPitStops: (raceId: number, driverId?: number) => Promise<void>
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

export const usePitStopStore = create<PitStopState>((set) => ({
  pitStops: [],
  isLoading: false,
  error: null,

  loadPitStops: async (raceId: number, driverId?: number): Promise<void> => {
    set({ isLoading: true, error: null })
    
    try {
      let url = `${API_BASE_URL}/api/v1/races/${raceId}/pit-stops`
      
      // If driverId is provided, filter by driver
      if (driverId) {
        url += `?driver_id=${driverId}`
      }
      
      const result = await apiCall<{ pit_stops: PitStop[] }>(url)
      
      set({ 
        pitStops: result.pit_stops,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des arrêts au stand',
        isLoading: false 
      })
    }
  },

  clearError: (): void => {
    set({ error: null })
  },
}))

// Selectors (REQUIRED by project-context.md)
export const selectPitStops = (state: PitStopState) => state.pitStops
export const selectPitStopLoading = (state: PitStopState) => state.isLoading
export const selectPitStopError = (state: PitStopState) => state.error
