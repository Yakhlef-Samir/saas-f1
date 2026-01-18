import { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'

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

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Password strength calculator
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    
    return strength
  }

  // Memoize form validation to avoid setState in effect
  const formValidation = useMemo(() => {
    let isValid = true

    if (!validateEmail(formData.email)) {
      isValid = false
    }

    if (formData.password.length < 8) {
      isValid = false
    }

    if (formData.password !== formData.password_confirm) {
      isValid = false
    }

    const passwordStrength = calculatePasswordStrength(formData.password)
    const isFormValid = Boolean(isValid && formData.email && formData.password && formData.password_confirm)

    return { passwordStrength, isFormValid }
  }, [formData.email, formData.password, formData.password_confirm])

  // Update state when validation changes
  useEffect(() => {
    setPasswordStrength(formValidation.passwordStrength)
    setIsFormValid(formValidation.isFormValid)
  }, [formValidation])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) {
      void clearError()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    const success = await register(formData)

    if (success) {
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  return (
    <div style={{
      margin: 0,
      padding: 0,
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#111111',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Orbitron, sans-serif',
      perspective: '1000px',
      position: 'relative'
    }}>
      {/* L'effet de piste en 3D qui défile */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200vw',
        height: '200vh',
        transform: 'translate(-50%, -50%) rotateX(80deg)',
        background: `
          linear-gradient(90deg, 
            transparent 48%, 
            rgba(255, 255, 255, 0.8) 49%, 
            rgba(255, 255, 255, 0.8) 51%, 
            transparent 52%),
          linear-gradient(0deg, rgba(220, 0, 0, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220, 0, 0, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '100vw 100%, 50px 50px, 50px 50px',
        animation: 'race-speed 0.5s linear infinite',
        zIndex: -1,
        maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)'
      }} />

      {/* Ligne d'horizon */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: 0,
        width: '100%',
        height: '5px',
        background: '#dc0000',
        boxShadow: '0 0 50px 20px #dc0000',
        zIndex: -2
      }} />

      {/* Conteneur du Formulaire Style F1 */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(145deg, #2a2a2a, #000000)',
        padding: '40px',
        borderRadius: '15px',
        borderBottom: '8px solid #dc0000',
        transform: 'skewX(-10deg)',
        boxShadow: `
          20px 20px 60px #000000, 
          -20px -20px 60px #1c1c1c,
          0 0 20px rgba(220, 0, 0, 0.3)
        `,
        borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
        borderTop: '2px solid rgba(255, 255, 255, 0.2)',
        width: '100%',
        maxWidth: '450px'
      }}>
        {/* Texture fibre de carbone */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `
            radial-gradient(#111111 30%, transparent 31%),
            radial-gradient(#111111 30%, transparent 31%)
          `,
          backgroundSize: '4px 4px',
          backgroundPosition: '0 0, 2px 2px',
          opacity: 0.2,
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* Le contenu doit être "dé-incliné" pour être lisible */}
        <div style={{
          transform: 'skewX(10deg)',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontFamily: 'Russo One, sans-serif',
            textAlign: 'center',
            color: '#e0e0e0',
            textTransform: 'uppercase',
            fontSize: '2em',
            marginBottom: '30px',
            textShadow: '3px 3px 0px #dc0000',
            letterSpacing: '2px'
          }}>
            Grille de Départ
          </h2>

          {error && (
            <div id="email-error" role="alert" aria-live="polite" style={{
              backgroundColor: 'rgba(220, 0, 0, 0.2)',
              border: '1px solid #dc0000',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '20px',
              textAlign: 'center',
              fontFamily: 'Orbitron, sans-serif'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#dc0000',
                fontWeight: 'bold',
                fontSize: '0.9em',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Email du Pilote
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@ecurie.com"
                aria-label="Email du pilote"
                aria-describedby="email-error"
                aria-invalid={!!error}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: 'none',
                  borderLeft: '5px solid #555',
                  borderBottom: '2px solid #555',
                  color: '#e0e0e0',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.1em',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#dc0000'
                  target.style.borderBottomColor = '#dc0000'
                  target.style.boxShadow = '0 0 15px rgba(220, 0, 0, 0.5)'
                  target.style.backgroundColor = 'rgba(20, 0, 0, 0.8)'
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#555'
                  target.style.borderBottomColor = '#555'
                  target.style.boxShadow = 'none'
                  target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#dc0000',
                fontWeight: 'bold',
                fontSize: '0.9em',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Mot de passe (Code Stand)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                aria-label="Mot de passe"
                aria-describedby="password-strength"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: 'none',
                  borderLeft: '5px solid #555',
                  borderBottom: '2px solid #555',
                  color: '#e0e0e0',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.1em',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#dc0000'
                  target.style.borderBottomColor = '#dc0000'
                  target.style.boxShadow = '0 0 15px rgba(220, 0, 0, 0.5)'
                  target.style.backgroundColor = 'rgba(20, 0, 0, 0.8)'
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#555'
                  target.style.borderBottomColor = '#555'
                  target.style.boxShadow = 'none'
                  target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
                }}
              />
              
              {/* Password strength indicator */}
              {formData.password && (
                <div id="password-strength" style={{ marginTop: '8px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '4px'
                  }}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        style={{
                          flex: 1,
                          height: '4px',
                          backgroundColor: level <= passwordStrength 
                            ? passwordStrength <= 2 ? '#dc0000' 
                            : passwordStrength === 3 ? '#ffa500' 
                            : '#00ff00'
                            : '#333',
                          transition: 'background-color 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                  <p style={{
                    color: passwordStrength <= 2 ? '#dc0000' : passwordStrength === 3 ? '#ffa500' : '#00ff00',
                    fontSize: '11px',
                    fontFamily: 'Orbitron, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {passwordStrength <= 2 ? 'Code faible' : passwordStrength === 3 ? 'Code moyen' : 'Code fort'}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#dc0000',
                fontWeight: 'bold',
                fontSize: '0.9em',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Confirmation du Code
              </label>
              <input
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                placeholder="••••••••"
                aria-label="Confirmation du mot de passe"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: 'none',
                  borderLeft: '5px solid #555',
                  borderBottom: '2px solid #555',
                  color: '#e0e0e0',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.1em',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#dc0000'
                  target.style.borderBottomColor = '#dc0000'
                  target.style.boxShadow = '0 0 15px rgba(220, 0, 0, 0.5)'
                  target.style.backgroundColor = 'rgba(20, 0, 0, 0.8)'
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#555'
                  target.style.borderBottomColor = '#555'
                  target.style.boxShadow = 'none'
                  target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
                }}
              />
            </div>

            {/* Section optionnelle - Profil du Pilote */}
            <div style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              border: '1px solid rgba(220, 0, 0, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  color: '#dc0000',
                  fontSize: '1.1em',
                  fontFamily: 'Russo One, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Profil du Pilote (Optionnel)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  style={{
                    background: 'none',
                    border: '1px solid #dc0000',
                    color: '#dc0000',
                    padding: '5px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.9em',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {showOptionalFields ? 'Masquer' : 'Afficher'}
                </button>
              </div>

              {showOptionalFields && (
                <>
                  <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{
                        display: 'block',
                        color: '#888',
                        fontSize: '0.85em',
                        marginBottom: '5px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || ''}
                        onChange={handleChange}
                        placeholder="Lewis"
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid #444',
                          borderBottom: '2px solid #666',
                          color: '#fff',
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '1em',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          const target = e.target as HTMLInputElement
                          target.style.borderLeftColor = '#dc0000'
                          target.style.borderBottomColor = '#dc0000'
                          target.style.boxShadow = '0 0 15px rgba(220, 0, 0, 0.5)'
                          target.style.backgroundColor = 'rgba(20, 0, 0, 0.8)'
                        }}
                        onBlur={(e) => {
                          const target = e.target as HTMLInputElement
                          target.style.borderLeftColor = '#555'
                          target.style.borderBottomColor = '#555'
                          target.style.boxShadow = 'none'
                          target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{
                        display: 'block',
                        color: '#888',
                        fontSize: '0.85em',
                        marginBottom: '5px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Nom
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || ''}
                        onChange={handleChange}
                        placeholder="Hamilton"
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid #444',
                          borderBottom: '2px solid #666',
                          color: '#fff',
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '1em',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          const target = e.target as HTMLInputElement
                          target.style.borderLeftColor = '#dc0000'
                          target.style.borderBottomColor = '#dc0000'
                          target.style.boxShadow = '0 0 15px rgba(220, 0, 0, 0.5)'
                          target.style.backgroundColor = 'rgba(20, 0, 0, 0.8)'
                        }}
                        onBlur={(e) => {
                          const target = e.target as HTMLInputElement
                          target.style.borderLeftColor = '#555'
                          target.style.borderBottomColor = '#555'
                          target.style.boxShadow = 'none'
                          target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      color: '#888',
                      fontSize: '0.85em',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Nom d'affichage (pour les classements)
                    </label>
                    <input
                      type="text"
                      name="display_name"
                      value={formData.display_name || ''}
                      onChange={handleChange}
                      placeholder="LH44"
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid #444',
                        borderBottom: '2px solid #666',
                        color: '#fff',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '1em',
                        transition: 'all 0.3s ease',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        const target = e.target as HTMLInputElement
                        target.style.borderLeftColor = '#dc0000'
                        target.style.borderBottomColor = '#dc0000'
                        target.style.boxShadow = '0 0 15px rgba(220, 0, 0, 0.5)'
                        target.style.backgroundColor = 'rgba(20, 0, 0, 0.8)'
                      }}
                      onBlur={(e) => {
                        const target = e.target as HTMLInputElement
                        target.style.borderLeftColor = '#555'
                        target.style.borderBottomColor = '#555'
                        target.style.boxShadow = 'none'
                        target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{
                        display: 'block',
                        color: '#888',
                        fontSize: '0.85em',
                        marginBottom: '5px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Pays
                      </label>
                      <select
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid #444',
                          borderBottom: '2px solid #666',
                          color: '#fff',
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '1em',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="France">🇫🇷 France</option>
                        <option value="UK">🇬🇧 UK</option>
                        <option value="Germany">🇩🇪 Allemagne</option>
                        <option value="Italy">🇮🇹 Italie</option>
                        <option value="Spain">🇪🇸 Espagne</option>
                        <option value="Belgium">🇧🇪 Belgique</option>
                        <option value="Netherlands">🇳🇱 Pays-Bas</option>
                        <option value="Monaco">🇲🇨 Monaco</option>
                        <option value="Switzerland">🇨🇭 Suisse</option>
                        <option value="USA">🇺🇸 USA</option>
                        <option value="Canada">🇨🇦 Canada</option>
                        <option value="Australia">🇦🇺 Australie</option>
                        <option value="Japan">🇯🇵 Japon</option>
                        <option value="Brazil">🇧🇷 Brésil</option>
                        <option value="Mexico">🇲🇽 Mexique</option>
                        <option value="Other">Autre</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{
                        display: 'block',
                        color: '#888',
                        fontSize: '0.85em',
                        marginBottom: '5px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Écurie Préférée
                      </label>
                      <select
                        name="favorite_f1_team"
                        value={formData.favorite_f1_team || ''}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid #444',
                          borderBottom: '2px solid #666',
                          color: '#fff',
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '1em',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="McLaren">McLaren</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Red Bull Racing">Red Bull Racing</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="Williams">Williams</option>
                        <option value="Racing Bulls">Racing Bulls</option>
                        <option value="Aston Martin">Aston Martin</option>
                        <option value="Haas">Haas</option>
                        <option value="Audi">Audi</option>
                        <option value="Alpine">Alpine</option>
                        <option value="Cadillac">Cadillac</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              aria-label="S'inscrire à Pitline Corner"
              aria-describedby="email-error"
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '20px',
                backgroundColor: !isFormValid || isLoading 
                  ? '#666666' 
                  : '#dc0000',
                backgroundImage: !isFormValid || isLoading 
                  ? 'none'
                  : 'linear-gradient(90deg, #a00000 0%, #dc0000 50%, #a00000 100%)',
                backgroundSize: '200% auto',
                backgroundPosition: 'left center',
                color: 'white',
                fontFamily: 'Russo One, sans-serif',
                fontSize: '1.5em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: !isFormValid || isLoading ? 'not-allowed' : 'pointer',
                clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
                transition: 'all 0.3s ease',
                textShadow: '1px 1px 2px black',
                transform: !isFormValid || isLoading ? 'scale(1)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement
                if (isFormValid && !isLoading) {
                  target.style.backgroundPosition = 'right center'
                  target.style.transform = 'scale(1.05)'
                  target.style.boxShadow = '0 0 30px #dc0000'
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement
                if (isFormValid && !isLoading) {
                  target.style.backgroundPosition = 'left center'
                  target.style.transform = 'scale(1)'
                  target.style.boxShadow = 'none'
                }
              }}
              onMouseDown={(e) => {
                const target = e.target as HTMLButtonElement
                if (isFormValid && !isLoading) {
                  target.style.transform = 'scale(0.98)'
                }
              }}
              onMouseUp={(e) => {
                const target = e.target as HTMLButtonElement
                if (isFormValid && !isLoading) {
                  target.style.transform = 'scale(1.05)'
                }
              }}
            >
              {isLoading ? "CHARGEMENT..." : "GO ! GO ! GO !"}
            </button>
          </form>

          <div style={{
            marginTop: '30px',
            textAlign: 'center'
          }}>
            <Link
              to="/login"
              style={{
                color: '#e0e0e0',
                fontSize: '14px',
                textDecoration: 'none',
                fontFamily: 'Orbitron, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#dc0000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#e0e0e0'
              }}
            >
              Déjà sur la grille ?
            </Link>
          </div>
        </div>
      </div>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&family=Russo+One&display=swap" rel="stylesheet" />
      
      {/* Success Animation */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#00ff00',
            fontFamily: 'Russo One, sans-serif'
          }}>
            <div style={{
              fontSize: '4em',
              marginBottom: '20px',
              animation: 'pulse 1s ease infinite'
            }}>
              🏁
            </div>
            <h2 style={{
              fontSize: '2.5em',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '0 0 20px #00ff00'
            }}>
              Victoire !
            </h2>
            <p style={{
              fontSize: '1.2em',
              marginTop: '10px',
              color: '#ffffff'
            }}>
              Bienvenue sur la grille de départ
            </p>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes race-speed {
            0% { background-position: 50% 0, 0 0, 0 0; }
            100% { background-position: 50% 0, 0 50px, 0 50px; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `
      }} />
    </div>
  )
}
