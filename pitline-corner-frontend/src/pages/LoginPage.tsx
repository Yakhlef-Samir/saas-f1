import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'

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

  
  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Memoize form validation to avoid setState in effect
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
    // const success = await login({ email: formData.email, password: formData.password })
    navigate('/dashboard')
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
            Retour aux Pits
          </h2>

          {error && (
            <div style={{
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
                  target.style.background = 'rgba(20, 0, 0, 0.8)'
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#555'
                  target.style.borderBottomColor = '#555'
                  target.style.boxShadow = 'none'
                  target.style.background = 'rgba(0, 0, 0, 0.6)'
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
                Code Stand
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
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
                  target.style.background = 'rgba(20, 0, 0, 0.8)'
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderLeftColor = '#555'
                  target.style.borderBottomColor = '#555'
                  target.style.boxShadow = 'none'
                  target.style.background = 'rgba(0, 0, 0, 0.6)'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '20px',
                background: !isFormValid || isLoading 
                  ? '#666666' 
                  : 'linear-gradient(90deg, #a00000 0%, #dc0000 50%, #a00000 100%)',
                backgroundSize: '200% auto',
                color: 'white',
                fontFamily: 'Russo One, sans-serif',
                fontSize: '1.5em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: !isFormValid || isLoading ? 'not-allowed' : 'pointer',
                clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
                transition: 'all 0.3s ease',
                textShadow: '1px 1px 2px black'
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
            >
              {isLoading ? "CHARGEMENT..." : "DEMARRAGE !"}
            </button>
          </form>

          <div style={{
            marginTop: '30px',
            textAlign: 'center'
          }}>
            <Link
              to="/register"
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
              Nouveau Pilote ?
            </Link>
          </div>
        </div>
      </div>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&family=Russo+One&display=swap" rel="stylesheet" />
      
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes race-speed {
            0% { background-position: 50% 0, 0 0, 0 0; }
            100% { background-position: 50% 0, 0 50px, 0 50px; }
          }
        `
      }} />
    </div>
  )
}
