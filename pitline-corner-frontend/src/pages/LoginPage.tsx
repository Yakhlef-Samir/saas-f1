import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'
import { MainLayout } from '@/components/layout/MainLayout'
import '@/styles/f1-modern.css'

interface FormData {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const clearError = useAuthStore((state) => state.clearError)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectError)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isFormValid = useMemo(() => {
    return formData.email && validateEmail(formData.email) && formData.password.length > 0
  }, [formData.email, formData.password])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) {
      void clearError()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    // TODO: Implémenter la vraie fonction login
    navigate('/dashboard')
  }

  return (
    <MainLayout>
      <div className="f1-page">
        <div className="f1-login-page">
          {/* Login Form Card */}
          <div className="f1-login-card">
            {/* Form Content */}
            <div className="f1-login-content">
              <h2 className="f1-login-title">
                Retour aux Pits
              </h2>

              {error && (
                <div className="f1-login-error" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="f1-login-form">
                <div className="f1-form-group">
                  <label className="f1-form-label">
                    Email du Pilote
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@ecurie.com"
                    className="f1-form-input"
                    autoComplete="email"
                  />
                </div>

                <div className="f1-form-group">
                  <label className="f1-form-label">
                    Code Stand
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="f1-form-input"
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="f1-login-btn"
                >
                  {isLoading ? (
                    <span className="f1-login-loading">CHARGEMENT...</span>
                  ) : (
                    "DEMARRAGE !"
                  )}
                </button>
              </form>

              <div className="f1-login-footer">
                <Link to="/register" className="f1-login-link">
                  Nouveau Pilote ?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
