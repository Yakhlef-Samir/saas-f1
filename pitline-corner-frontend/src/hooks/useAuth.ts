import { useCallback } from 'react'
import { useAuthStore, selectUser, selectIsAuthenticated, selectToken, selectIsLoading, selectError } from '../stores/authStore'

/**
 * Custom hook for authentication with selectors
 * Follows project-context.md rule: always use exported selectors
 */
export function useAuth() {
  const user = useAuthStore(selectUser)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const token = useAuthStore(selectToken)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectError)
  
  const register = useAuthStore((state) => state.register)
  const logout = useAuthStore((state) => state.logout)
  const clearError = useAuthStore((state) => state.clearError)

  const hasTier = useCallback((tier: 'freemium' | 'pro' | 'elite') => {
    return user?.tier === tier
  }, [user])

  const canAccessFeature = useCallback((requiredTier: 'freemium' | 'pro' | 'elite') => {
    if (!user) return false
    
    const tierHierarchy = { freemium: 0, pro: 1, elite: 2 }
    const userLevel = tierHierarchy[user.tier as keyof typeof tierHierarchy]
    const requiredLevel = tierHierarchy[requiredTier]
    
    return userLevel >= requiredLevel
  }, [user])

  return {
    // State
    user,
    isAuthenticated,
    token,
    isLoading,
    error,
    
    // Actions
    register,
    logout,
    clearError,
    
    // Computed
    hasTier,
    canAccessFeature,
    
    // Convenience getters
    isPro: user?.tier === 'pro',
    isElite: user?.tier === 'elite',
    isFreemium: user?.tier === 'freemium',
    displayName: user?.display_name || user?.email,
  }
}
