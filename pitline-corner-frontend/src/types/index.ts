// Common types used across the application

// API Response wrapper (matching project-context.md specification)
export interface ApiResponse<T> {
  data: T
  meta: {
    timestamp: string
  }
}

export interface ApiError {
  error: {
    code: string
    message: string
    detail?: string
  }
}

// User & Authentication types
export interface User {
  id: number
  email: string
  tier: 'freemium' | 'pro' | 'elite'
  first_name?: string
  last_name?: string
  display_name?: string
  country?: string
  favorite_f1_team?: string
  created_at?: string
  updated_at?: string
}

export interface AuthTokens {
  access_token: string
  token_type: string
  expires_in?: number
}

// Race & Circuit types
export interface Race {
  id: number
  season: number
  round: number
  name: string
  circuit_name: string
  country: string
  date: string
  status: 'scheduled' | 'completed' | 'cancelled'
  data_imported: boolean
  imported_at?: string
  created_at?: string
  updated_at?: string
}

export interface Circuit {
  id: number
  name: string
  country: string
  length_km: number
  turns: number
  track_map_data?: string
  created_at?: string
  updated_at?: string
}

// Driver & Team types
export interface Driver {
  id: number
  driver_number: number
  code: string
  first_name: string
  last_name: string
  team: string
  country?: string
  created_at?: string
  updated_at?: string
}

// Race data types
export interface LapData {
  id: number
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
  tire_compound: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET'
  tire_age: number
  gap_to_leader: number
  created_at?: string
  updated_at?: string
}

export interface PitStop {
  id: number
  race_id: number
  driver_id: number
  stop_number: number
  lap: number
  duration_seconds: number
  tire_compound_after: string
  created_at?: string
  updated_at?: string
}

// Simulation types
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

// UI State types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface Modal {
  id: string
  type: 'upgrade' | 'error' | 'confirm' | 'info'
  title: string
  message?: string
  data?: Record<string, unknown>
}

// Component Props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LoadingProps extends BaseComponentProps {
  isLoading?: boolean
  loadingText?: string
}

export interface ErrorProps extends BaseComponentProps {
  error?: string | null
  onRetry?: () => void
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>

// F1 specific constants
export const TIRE_COMPOUNDS = {
  SOFT: 'SOFT',
  MEDIUM: 'MEDIUM', 
  HARD: 'HARD',
  INTERMEDIATE: 'INTERMEDIATE',
  WET: 'WET'
} as const

export const USER_TIERS = {
  FREEMIUM: 'freemium',
  PRO: 'pro',
  ELITE: 'elite'
} as const

export const RACE_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export type TireCompound = typeof TIRE_COMPOUNDS[keyof typeof TIRE_COMPOUNDS]
export type UserTier = typeof USER_TIERS[keyof typeof USER_TIERS]
export type RaceStatus = typeof RACE_STATUS[keyof typeof RACE_STATUS]
