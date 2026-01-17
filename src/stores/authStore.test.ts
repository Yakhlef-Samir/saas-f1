import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  useAuthStore,
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
} from './authStore'

describe('authStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    })
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('initial state', () => {
    it('should have null user and token initially', () => {
      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })
  })

  describe('selectors', () => {
    it('selectUser should return user from state', () => {
      const mockUser = { id: 1, email: 'test@example.com', tier: 'freemium' }
      useAuthStore.setState({ user: mockUser })
      expect(selectUser(useAuthStore.getState())).toEqual(mockUser)
    })

    it('selectToken should return token from state', () => {
      useAuthStore.setState({ token: 'test-token' })
      expect(selectToken(useAuthStore.getState())).toBe('test-token')
    })

    it('selectIsAuthenticated should return true when token exists', () => {
      useAuthStore.setState({ token: 'test-token' })
      expect(selectIsAuthenticated(useAuthStore.getState())).toBe(true)
    })

    it('selectIsAuthenticated should return false when token is null', () => {
      useAuthStore.setState({ token: null })
      expect(selectIsAuthenticated(useAuthStore.getState())).toBe(false)
    })

    it('selectIsLoading should return loading state', () => {
      useAuthStore.setState({ isLoading: true })
      expect(selectIsLoading(useAuthStore.getState())).toBe(true)
    })

    it('selectError should return error from state', () => {
      useAuthStore.setState({ error: 'Some error' })
      expect(selectError(useAuthStore.getState())).toBe('Some error')
    })
  })

  describe('register action', () => {
    it('should set user and token on successful registration', async () => {
      const mockResponse = {
        data: {
          access_token: 'test-token',
          token_type: 'bearer',
          user: { id: 1, email: 'test@example.com', tier: 'freemium' },
        },
        meta: { timestamp: '2026-01-17T12:00:00Z' },
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await useAuthStore.getState().register({
        email: 'test@example.com',
        password: 'password123',
        password_confirm: 'password123',
      })

      expect(result).toBe(true)
      expect(useAuthStore.getState().token).toBe('test-token')
      expect(useAuthStore.getState().user).toEqual({
        id: 1,
        email: 'test@example.com',
        tier: 'freemium',
      })
      expect(useAuthStore.getState().error).toBeNull()
    })

    it('should set error on EMAIL_EXISTS response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: { code: 'EMAIL_EXISTS', message: 'Cet email est déjà utilisé' },
        }),
      } as Response)

      const result = await useAuthStore.getState().register({
        email: 'existing@example.com',
        password: 'password123',
        password_confirm: 'password123',
      })

      expect(result).toBe(false)
      expect(useAuthStore.getState().error).toBe('Cet email est déjà utilisé')
      expect(useAuthStore.getState().token).toBeNull()
    })

    it('should set error on PASSWORD_MISMATCH response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: {
            code: 'PASSWORD_MISMATCH',
            message: 'Les mots de passe ne correspondent pas',
          },
        }),
      } as Response)

      const result = await useAuthStore.getState().register({
        email: 'test@example.com',
        password: 'password123',
        password_confirm: 'different',
      })

      expect(result).toBe(false)
      expect(useAuthStore.getState().error).toBe(
        'Les mots de passe ne correspondent pas'
      )
    })

    it('should set error on network failure', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await useAuthStore.getState().register({
        email: 'test@example.com',
        password: 'password123',
        password_confirm: 'password123',
      })

      expect(result).toBe(false)
      expect(useAuthStore.getState().error).toBe(
        'Erreur de connexion au serveur'
      )
    })

    it('should set isLoading during registration', async () => {
      let resolvePromise: (value: Response) => void
      const pendingPromise = new Promise<Response>((resolve) => {
        resolvePromise = resolve
      })

      vi.mocked(fetch).mockReturnValueOnce(pendingPromise)

      const registerPromise = useAuthStore.getState().register({
        email: 'test@example.com',
        password: 'password123',
        password_confirm: 'password123',
      })

      // Should be loading while request is pending
      expect(useAuthStore.getState().isLoading).toBe(true)

      // Resolve the promise
      resolvePromise!({
        ok: true,
        json: async () => ({
          data: {
            access_token: 'token',
            token_type: 'bearer',
            user: { id: 1, email: 'test@example.com', tier: 'freemium' },
          },
          meta: { timestamp: '2026-01-17T12:00:00Z' },
        }),
      } as Response)

      await registerPromise

      // Should not be loading after request completes
      expect(useAuthStore.getState().isLoading).toBe(false)
    })
  })

  describe('logout action', () => {
    it('should clear user and token on logout', () => {
      // Set initial authenticated state
      useAuthStore.setState({
        user: { id: 1, email: 'test@example.com', tier: 'freemium' },
        token: 'test-token',
      })

      // Logout
      useAuthStore.getState().logout()

      // Should be cleared
      expect(useAuthStore.getState().user).toBeNull()
      expect(useAuthStore.getState().token).toBeNull()
      expect(useAuthStore.getState().error).toBeNull()
    })
  })

  describe('clearError action', () => {
    it('should clear error state', () => {
      useAuthStore.setState({ error: 'Some error' })
      expect(useAuthStore.getState().error).toBe('Some error')

      useAuthStore.getState().clearError()

      expect(useAuthStore.getState().error).toBeNull()
    })
  })
})
