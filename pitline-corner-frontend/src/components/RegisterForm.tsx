import { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'
import { MainLayout } from '@/components/layout/MainLayout'
import '@/styles/f1-modern.css'

interface FormData {
  email: string
  password: string
  password_confirm: string
  first_name?: string
  last_name?: string
  display_name?: string
  country?: string
  favorite_f1_team?: string
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const clearError = useAuthStore((state) => state.clearError)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectError)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    display_name: '',
    country: '',
    favorite_f1_team: '',
  })

  const [isFormValid, setIsFormValid] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showOptionalFields, setShowOptionalFields] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const formValidation = useMemo(() => {
    let isValid = true
    if (!validateEmail(formData.email)) isValid = false
    if (formData.password.length < 8) isValid = false
    if (formData.password !== formData.password_confirm) isValid = false

    const passwordStrength = calculatePasswordStrength(formData.password)
    const isFormValid = Boolean(isValid && formData.email && formData.password && formData.password_confirm)

    return { passwordStrength, isFormValid }
  }, [formData.email, formData.password, formData.password_confirm])

  useEffect(() => {
    setPasswordStrength(formValidation.passwordStrength)
    setIsFormValid(formValidation.isFormValid)
  }, [formValidation])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) void clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    const success = await register(formData)
    if (success) {
      setShowSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    }
  }

  const getPasswordStrengthClass = () => {
    if (passwordStrength <= 2) return 'weak'
    if (passwordStrength === 3) return 'medium'
    return 'strong'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Code faible'
    if (passwordStrength === 3) return 'Code moyen'
    return 'Code fort'
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'weak'
    if (passwordStrength === 3) return 'medium'
    return 'strong'
  }

  return (
    <MainLayout>
      <div className="f1-page">
        <div className="f1-register-page">
          {/* Register Form Card */}
          <div className={`f1-register-card ${showOptionalFields ? 'expanded' : ''}`}>
            {/* Form Content */}
            <div className="f1-register-content">
              <h2 className="f1-register-title">
                Grille de Départ
              </h2>

              {error && (
                <div className="f1-login-error" role="alert" aria-live="polite">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="f1-login-form">
                {/* Main Fields */}
                {!showOptionalFields && (
                  <>
                    <div className="f1-form-group">
                      <label className="f1-form-label">Email du Pilote</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        minLength={5}
                        placeholder="votre@ecurie.com"
                        className="f1-form-input"
                        aria-label="Email du pilote"
                        aria-invalid={!!error}
                        autoComplete="email"
                      />
                    </div>

                    <div className="f1-form-group">
                      <label className="f1-form-label">Mot de passe (Code Stand)</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        placeholder="••••••••"
                        className="f1-form-input"
                        aria-label="Mot de passe"
                        autoComplete="new-password"
                      />
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="f1-password-strength">
                          <div className="f1-password-strength-bars">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`f1-password-strength-bar ${level <= passwordStrength ? getPasswordStrengthClass() : ''}`}
                              />
                            ))}
                          </div>
                          <p className={`f1-password-strength-text ${getPasswordStrengthColor()}`}>
                            {getPasswordStrengthText()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="f1-form-group">
                      <label className="f1-form-label">Confirmation du Code</label>
                      <input
                        type="password"
                        name="password_confirm"
                        value={formData.password_confirm}
                        onChange={handleChange}
                        required
                        minLength={8}
                        placeholder="••••••••"
                        className="f1-form-input"
                        aria-label="Confirmation du mot de passe"
                        autoComplete="new-password"
                      />
                    </div>
                  </>
                )}

                {/* Optional Fields Section */}
                <div className="f1-register-optional-section">
                  <div className="f1-register-optional-header">
                    <h3 className="f1-register-optional-title">
                      Profil du Pilote (Optionnel)
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowOptionalFields(!showOptionalFields)}
                      className="f1-register-toggle-btn"
                    >
                      {showOptionalFields ? 'Masquer' : 'Afficher'}
                    </button>
                  </div>

                  {showOptionalFields && (
                    <div className="f1-register-optional-fields">
                      <div>
                        <label className="f1-form-label">Prénom du Pilote</label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="Votre prénom"
                          className="f1-form-input"
                        />
                      </div>

                      <div>
                        <label className="f1-form-label">Nom du Pilote</label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          className="f1-form-input"
                        />
                      </div>

                      <div>
                        <label className="f1-form-label">Pseudo Course</label>
                        <input
                          type="text"
                          name="display_name"
                          value={formData.display_name}
                          onChange={handleChange}
                          placeholder="Votre pseudo"
                          className="f1-form-input"
                        />
                      </div>

                      <div>
                        <label className="f1-form-label">Nationalité</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="f1-form-select"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="Maroc">Maroc</option>
                          <option value="France">France</option>
                          <option value="Belgium">Belgique</option>
                          <option value="Switzerland">Suisse</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Canada">Canada</option>
                          <option value="USA">États-Unis</option>
                          <option value="UK">Royaume-Uni</option>
                          <option value="Germany">Allemagne</option>
                          <option value="Italy">Italie</option>
                          <option value="Spain">Espagne</option>
                          <option value="Netherlands">Pays-Bas</option>
                          <option value="Japan">Japon</option>
                          <option value="Australia">Australie</option>
                          <option value="Brazil">Brésil</option>
                          <option value="Mexico">Mexique</option>
                          <option value="Other">Autre</option>
                        </select>
                      </div>

                      <div className="md-col-span-2">
                        <label className="f1-form-label">Écurie F1 Préférée</label>
                        <select
                          name="favorite_f1_team"
                          value={formData.favorite_f1_team}
                          onChange={handleChange}
                          className="f1-form-select"
                        >
                          <option value="">Sélectionner une écurie...</option>
                          <option value="Mercedes">Mercedes</option>
                          <option value="Red Bull Racing">Red Bull Racing</option>
                          <option value="Ferrari">Ferrari</option>
                          <option value="McLaren">McLaren</option>
                          <option value="Alpine">Alpine</option>
                          <option value="Aston Martin">Aston Martin</option>
                          <option value="Williams">Williams</option>
                          <option value="RB">RB</option>
                          <option value="Haas">Haas</option>
                          <option value="Sauber">Sauber</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="f1-login-btn"
                  aria-label="S'inscrire à Pitline Corner"
                >
                  {isLoading ? (
                    <span className="f1-login-loading">CHARGEMENT...</span>
                  ) : (
                    "GO ! GO ! GO !"
                  )}
                </button>
              </form>

              <div className="f1-login-footer">
                <Link to="/login" className="f1-login-link">
                  Déjà sur la grille ?
                </Link>
              </div>
            </div>
          </div>

          {/* Success Overlay */}
          {showSuccess && (
            <div className="f1-register-success-overlay">
              <div className="f1-register-success-content">
                <div className="f1-register-success-icon">🏁</div>
                <h2 className="f1-register-success-title">Victoire !</h2>
                <p className="f1-register-success-message">Bienvenue sur la grille de départ</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
