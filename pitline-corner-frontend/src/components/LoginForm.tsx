import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'
import { AuthLayout } from '@/components/layouts'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

export default function LoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const clearError = useAuthStore((state) => state.clearError)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectError)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate form
  useEffect(() => {
    const errors: FormErrors = {}

    if (!formData.email) {
      errors.email = 'L\'email est requis'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Veuillez entrer un email valide'
    }

    if (!formData.password) {
      errors.password = 'Le mot de passe est requis'
    }

    setFormErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0 && formData.email && formData.password)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) {
      clearError()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    const success = await login(formData)

    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-text to-text-secondary bg-clip-text text-transparent">
            Bon retour sur Pitline Corner
          </CardTitle>
          <p className="text-center text-text-secondary text-sm">
            Connectez-vous pour accéder à votre tableau de bord
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-error/5 border border-error/20 text-error px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-text">
                Adresse email
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="exemple@email.com"
                  className={`pl-10 ${formErrors.email ? 'border-error focus:ring-error' : ''}`}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              {formErrors.email && (
                <p className="text-xs text-error mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-text">
                  Mot de passe
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={`pl-10 pr-10 ${formErrors.password ? 'border-error focus:ring-error' : ''}`}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-xs text-error mt-1">{formErrors.password}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
              />
              <Label htmlFor="remember" className="text-sm text-text-secondary">
                Se souvenir de moi
              </Label>
            </div>

            <Button 
              type="submit" 
              disabled={!isFormValid || isLoading} 
              className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-6">
          <p className="text-sm text-text-secondary text-center w-full">
            Pas encore de compte ?{' '}
            <Link
              to="/register"
              className="text-text font-medium hover:text-text/80 transition-colors underline underline-offset-4 hover:underline-offset-2"
            >
              S'inscrire
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
