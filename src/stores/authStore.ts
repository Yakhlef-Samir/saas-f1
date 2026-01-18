import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types matching API response format (snake_case as per project-context.md)
export interface User {
  id: number
  email: string
  tier: string
  first_name?: string
  last_name?: string
  display_name?: string
  country?: string
  favorite_f1_team?: string
}

interface RegisterData {
  email: string
  password: string
  password_confirm: string
  first_name?: string
  last_name?: string
  display_name?: string
  country?: string
  favorite_f1_team?: string
}

interface AuthResponse {
  data: {
    access_token: string
    token_type: string
    user: User
  }
  meta: {
    timestamp: string
  }
}

interface ApiError {
  error: {
    code: string
    message?: string
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  clearError: () => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      register: async (data: RegisterData): Promise<boolean> => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            const errorData: ApiError = await response.json()
            const errorCode = errorData.error?.code
            const errorMessage = errorData.error?.message

            let displayMessage = 'Erreur lors de l\'inscription'
            if (errorCode === 'EMAIL_EXISTS') {
              displayMessage = errorMessage || 'Cet email est déjà utilisé'
            } else if (errorCode === 'PASSWORD_MISMATCH') {
              displayMessage = errorMessage || 'Les mots de passe ne correspondent pas'
            }

            set({ isLoading: false, error: displayMessage })
            return false
          }

          const authResponse: AuthResponse = await response.json()
          const { access_token, user } = authResponse.data

          set({
            user,
            token: access_token,
            isLoading: false,
            error: null,
          })

          return true
        } catch {
          set({
            isLoading: false,
            error: 'Erreur de connexion au serveur',
          })
          return false
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)

// Selectors (REQUIRED by project-context.md)
export const selectUser = (state: AuthState) => state.user
export const selectToken = (state: AuthState) => state.token
export const selectIsAuthenticated = (state: AuthState) => !!state.token
export const selectIsLoading = (state: AuthState) => state.isLoading
export const selectError = (state: AuthState) => state.error
