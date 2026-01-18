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

    expect(screen.getByText('Grille de Départ')).toBeInTheDocument()
    expect(screen.getByLabelText('Email du pilote')).toBeInTheDocument()
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmation du mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "S'inscrire à Pitline Corner" })).toBeInTheDocument()
  })

  it('should render login link', () => {
    renderWithRouter(<RegisterForm />)

    const loginLink = screen.getByText('Déjà sur la grille ?')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('should update form fields on user input', () => {
    renderWithRouter(<RegisterForm />)

    const emailInput = screen.getByLabelText('Email du pilote') as HTMLInputElement
    const passwordInput = screen.getByLabelText('Mot de passe') as HTMLInputElement
    const confirmInput = screen.getByLabelText('Confirmation du mot de passe') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
    expect(confirmInput.value).toBe('password123')
  })

  it('should have required attributes on form fields', () => {
    renderWithRouter(<RegisterForm />)

    expect(screen.getByLabelText('Email du pilote')).toBeRequired()
    expect(screen.getByLabelText('Mot de passe')).toBeRequired()
    expect(screen.getByLabelText('Confirmation du mot de passe')).toBeRequired()
  })

  it('should have minLength attribute on password fields', () => {
    renderWithRouter(<RegisterForm />)

    const passwordInput = screen.getByLabelText('Mot de passe')
    const confirmInput = screen.getByLabelText('Confirmation du mot de passe')

    expect(passwordInput).toHaveAttribute('minLength', '8')
    expect(confirmInput).toHaveAttribute('minLength', '8')
  })

  it('should display error message when error state is set', () => {
    useAuthStore.setState({ error: 'Cet email est déjà utilisé' })
    renderWithRouter(<RegisterForm />)

    const errorElement = document.getElementById('email-field-error')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement?.textContent).toBe('Cet email est déjà utilisé')
  })

  it('should disable submit button when loading', () => {
    useAuthStore.setState({ isLoading: true })
    renderWithRouter(<RegisterForm />)

    const button = screen.getByRole('button', { name: "S'inscrire à Pitline Corner" })
    expect(button).toBeDisabled()
  })

  it('should show loading text when submitting', () => {
    useAuthStore.setState({ isLoading: true })
    renderWithRouter(<RegisterForm />)

    expect(screen.getByText('CHARGEMENT...')).toBeInTheDocument()
  })

  it('should clear error when user starts typing', async () => {
    useAuthStore.setState({ error: 'Some error' })
    renderWithRouter(<RegisterForm />)

    const errorElement = document.getElementById('email-field-error')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement?.textContent).toBe('Some error')

    const emailInput = screen.getByLabelText('Email du pilote')
    fireEvent.change(emailInput, { target: { value: 't' } })

    // Error should be cleared
    await waitFor(() => {
      expect(document.getElementById('email-field-error')).not.toBeInTheDocument()
    })
  })
})

describe('RegisterForm integration', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    // Mock the register function
    useAuthStore.setState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should call register and navigate on successful submission', async () => {
    // Mock the register function to return true
    const mockRegister = vi.fn().mockResolvedValue(true)
    useAuthStore.setState({ register: mockRegister })

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

    fireEvent.change(screen.getByLabelText('Email du pilote'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmation du mot de passe'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire à Pitline Corner" }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        password_confirm: 'password123',
        first_name: '',
        last_name: '',
        display_name: '',
        country: '',
        favorite_f1_team: '',
      })
    })
  })

  it('should display error on EMAIL_EXISTS response', async () => {
    // Mock the register function to return false
    const mockRegister = vi.fn().mockResolvedValue(false)
    useAuthStore.setState({ register: mockRegister })

    renderWithRouter(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Email du pilote'), {
      target: { value: 'existing@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmation du mot de passe'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire à Pitline Corner" }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'existing@example.com',
        password: 'password123',
        password_confirm: 'password123',
        first_name: '',
        last_name: '',
        display_name: '',
        country: '',
        favorite_f1_team: '',
      })
    })

    // Navigation should not occur
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should display error on PASSWORD_MISMATCH response', async () => {
    // Mock the register function to return false
    const mockRegister = vi.fn().mockResolvedValue(false)
    useAuthStore.setState({ register: mockRegister })

    renderWithRouter(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Email du pilote'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmation du mot de passe'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire à Pitline Corner" }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        password_confirm: 'password123',
        first_name: '',
        last_name: '',
        display_name: '',
        country: '',
        favorite_f1_team: '',
      })
    })
  })

  it('should display network error message on fetch failure', async () => {
    // Mock the register function to return false
    const mockRegister = vi.fn().mockResolvedValue(false)
    useAuthStore.setState({ register: mockRegister })

    renderWithRouter(<RegisterForm />)

    fireEvent.change(screen.getByLabelText('Email du pilote'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Confirmation du mot de passe'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: "S'inscrire à Pitline Corner" }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        password_confirm: 'password123',
        first_name: '',
        last_name: '',
        display_name: '',
        country: '',
        favorite_f1_team: '',
      })
    })
  })
})
