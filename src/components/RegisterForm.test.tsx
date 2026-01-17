import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { useAuthStore } from '../stores/authStore'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Helper to render with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

// Reset store before each test
beforeEach(() => {
  useAuthStore.setState({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  })
  mockNavigate.mockClear()
})

describe('RegisterForm', () => {
  it('should render registration form with all fields', () => {
    renderWithRouter(<RegisterForm />)

    expect(screen.getByText('Créer un compte')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmer le mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "S'inscrire" })).toBeInTheDocument()
  })

  it('should render login link', () => {
    renderWithRouter(<RegisterForm />)

    const loginLink = screen.getByText('Se connecter')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('should update form fields on user input', () => {
    renderWithRouter(<RegisterForm />)

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const passwordInput = screen.getByLabelText('Mot de passe') as HTMLInputElement
    const confirmInput = screen.getByLabelText(
      'Confirmer le mot de passe'
    ) as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
    expect(confirmInput.value).toBe('password123')
  })

  it('should have required attributes on form fields', () => {
    renderWithRouter(<RegisterForm />)

    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Mot de passe')).toBeRequired()
    expect(screen.getByLabelText('Confirmer le mot de passe')).toBeRequired()
  })

  it('should have minLength attribute on password fields', () => {
    renderWithRouter(<RegisterForm />)

    const passwordInput = screen.getByLabelText('Mot de passe')
    const confirmInput = screen.getByLabelText('Confirmer le mot de passe')

    expect(passwordInput).toHaveAttribute('minLength', '8')
    expect(confirmInput).toHaveAttribute('minLength', '8')
  })

  it('should display error message when error state is set', () => {
    useAuthStore.setState({ error: 'Cet email est déjà utilisé' })
    renderWithRouter(<RegisterForm />)

    expect(screen.getByText('Cet email est déjà utilisé')).toBeInTheDocument()
  })

  it('should disable submit button when loading', () => {
    useAuthStore.setState({ isLoading: true })
    renderWithRouter(<RegisterForm />)

    const button = screen.getByRole('button', { name: 'Inscription...' })
    expect(button).toBeDisabled()
  })

  it('should show loading text when submitting', () => {
    useAuthStore.setState({ isLoading: true })
    renderWithRouter(<RegisterForm />)

    expect(screen.getByText('Inscription...')).toBeInTheDocument()
  })

  it('should clear error when user starts typing', async () => {
    useAuthStore.setState({ error: 'Some error' })
    renderWithRouter(<RegisterForm />)

    expect(screen.getByText('Some error')).toBeInTheDocument()

    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 't' } })

    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Some error')).not.toBeInTheDocument()
    })
  })
})

describe('RegisterForm integration', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should call register and navigate on successful submission', async () => {
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

    renderWithRouter(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire" }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })

    // Check store was updated
    const state = useAuthStore.getState()
    expect(state.token).toBe('test-token')
    expect(state.user?.email).toBe('test@example.com')
  })

  it('should display error on EMAIL_EXISTS response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: { code: 'EMAIL_EXISTS', message: 'Cet email est déjà utilisé' },
      }),
    } as Response)

    renderWithRouter(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'existing@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire" }))

    await waitFor(() => {
      expect(screen.getByText('Cet email est déjà utilisé')).toBeInTheDocument()
    })

    // Navigation should not occur
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should display error on PASSWORD_MISMATCH response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: {
          code: 'PASSWORD_MISMATCH',
          message: 'Les mots de passe ne correspondent pas',
        },
      }),
    } as Response)

    renderWithRouter(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'different' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire" }))

    await waitFor(() => {
      expect(
        screen.getByText('Les mots de passe ne correspondent pas')
      ).toBeInTheDocument()
    })
  })

  it('should display network error message on fetch failure', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    renderWithRouter(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire" }))

    await waitFor(() => {
      expect(
        screen.getByText('Erreur de connexion au serveur')
      ).toBeInTheDocument()
    })
  })
})
