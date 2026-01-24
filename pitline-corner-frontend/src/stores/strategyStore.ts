import { create } from 'zustand'
import type { ApiResponse } from '@/types'

export interface PitStopSimulation {
  driver_id: number
  race_id: number
  scenario_name: string
  original_stop_lap: number
  alternative_stop_lap: number
  original_position_final: number
  alternative_position_final: number
  position_gain: number
  time_loss_at_stop: number
  time_gain_after_stop: number
  confidence_score: number
  recommendation: string
  detailed_analysis: {
    total_laps: number
    original_tire_strategy: string
    alternative_tire_strategy: string
    tire_degradation: {
      first_lap_time: number
      last_lap_time: number
      degradation_seconds: number
      degradation_percentage: number
    }
    competitive_context: string
  }
}

export interface OvertakeSimulation {
  driver_id: number
  race_id: number
  scenario_name: string
  best_corner: string
  position_gain: number
  confidence_score: number
  recommendation: string
  opportunities: Array<{
    corner_number: number
    corner_name: string
    drs_eligible: boolean
    speed_difference: number
    success_probability: number
  }>
}

export interface DefenseSimulation {
  driver_id: number
  race_id: number
  scenario_name: string
  defending_against_driver_id: number
  position_hold_probability: number
  recommended_tactic: string
  confidence_score: number
  recommendation: string
}

export interface WeatherSimulation {
  driver_id: number
  race_id: number
  scenario_name: string
  current_weather: string
  expected_weather: string
  position_impact: number
  recommended_adjustment: string
  confidence_score: number
  recommendation: string
}

interface StrategyState {
  // Pit Stop
  pitStopSimulation: PitStopSimulation | null

  // Overtake
  overtakeSimulation: OvertakeSimulation | null

  // Defense
  defenseSimulation: DefenseSimulation | null

  // Weather
  weatherSimulation: WeatherSimulation | null

  // Loading and error states
  isLoading: boolean
  error: string | null

  // Actions
  simulatePitStop: (raceId: number, driverId: number, alternativeStopLap: number) => Promise<void>
  simulateOvertake: (raceId: number, driverId: number, targetDriverId: number) => Promise<void>
  simulateDefense: (raceId: number, driverId: number, attackingDriverId: number) => Promise<void>
  simulateWeather: (raceId: number, driverId: number, currentWeather: string, expectedWeather: string) => Promise<void>
  clearError: () => void
  reset: () => void
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

export const useStrategyStore = create<StrategyState>((set) => ({
  pitStopSimulation: null,
  overtakeSimulation: null,
  defenseSimulation: null,
  weatherSimulation: null,
  isLoading: false,
  error: null,

  simulatePitStop: async (raceId, driverId, alternativeStopLap) => {
    set({ isLoading: true, error: null })

    try {
      const result = await apiCall<PitStopSimulation>(
        `${API_BASE_URL}/api/v1/simulations/pit-stop?race_id=${raceId}&driver_id=${driverId}&alternative_stop_lap=${alternativeStopLap}`
      )

      set({
        pitStopSimulation: result,
        isLoading: false
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erreur lors de la simulation pit stop',
        isLoading: false
      })
    }
  },

  simulateOvertake: async (raceId, driverId, targetDriverId) => {
    set({ isLoading: true, error: null })

    try {
      const result = await apiCall<OvertakeSimulation>(
        `${API_BASE_URL}/api/v1/simulations/overtake?race_id=${raceId}&driver_id=${driverId}&target_driver_id=${targetDriverId}`
      )

      set({
        overtakeSimulation: result,
        isLoading: false
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erreur lors de la simulation dépassement',
        isLoading: false
      })
    }
  },

  simulateDefense: async (raceId, driverId, attackingDriverId) => {
    set({ isLoading: true, error: null })

    try {
      const result = await apiCall<DefenseSimulation>(
        `${API_BASE_URL}/api/v1/simulations/defend?race_id=${raceId}&driver_id=${driverId}&attacking_driver_id=${attackingDriverId}`
      )

      set({
        defenseSimulation: result,
        isLoading: false
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erreur lors de la simulation défense',
        isLoading: false
      })
    }
  },

  simulateWeather: async (raceId, driverId, currentWeather, expectedWeather) => {
    set({ isLoading: true, error: null })

    try {
      const result = await apiCall<WeatherSimulation>(
        `${API_BASE_URL}/api/v1/simulations/weather?race_id=${raceId}&driver_id=${driverId}&current_weather=${currentWeather}&expected_weather=${expectedWeather}`
      )

      set({
        weatherSimulation: result,
        isLoading: false
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erreur lors de la simulation météo',
        isLoading: false
      })
    }
  },

  clearError: () => {
    set({ error: null })
  },

  reset: () => {
    set({
      pitStopSimulation: null,
      overtakeSimulation: null,
      defenseSimulation: null,
      weatherSimulation: null,
      isLoading: false,
      error: null
    })
  }
}))

// Selectors
export const selectPitStopSimulation = (state: StrategyState) => state.pitStopSimulation
export const selectOvertakeSimulation = (state: StrategyState) => state.overtakeSimulation
export const selectDefenseSimulation = (state: StrategyState) => state.defenseSimulation
export const selectWeatherSimulation = (state: StrategyState) => state.weatherSimulation
export const selectStrategyLoading = (state: StrategyState) => state.isLoading
export const selectStrategyError = (state: StrategyState) => state.error
