import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, selectUser } from '../stores/authStore'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleLogout = () => {
    // TODO: Implement logout
    navigate('/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#111111',
      fontFamily: 'Orbitron, sans-serif',
      color: '#e0e0e0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background F1 track */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(90deg, 
            transparent 48%, 
            rgba(255, 255, 255, 0.1) 49%, 
            rgba(255, 255, 255, 0.1) 51%, 
            transparent 52%),
          linear-gradient(0deg, rgba(220, 0, 0, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220, 0, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100vw 100%, 50px 50px, 50px 50px',
        animation: 'race-speed 2s linear infinite',
        zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(145deg, #2a2a2a, #000000)',
        borderBottom: '4px solid #dc0000',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <h1 style={{
            fontFamily: 'Russo One, sans-serif',
            fontSize: '2em',
            color: '#dc0000',
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.5)',
            margin: 0
          }}>
            PITLINE CORNER
          </h1>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          <span style={{
            color: '#e0e0e0',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Pilote: {user?.email || 'Chargement...'}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'linear-gradient(90deg, #a00000 0%, #dc0000 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontFamily: 'Russo One, sans-serif',
              fontSize: '14px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 0, 0, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Sortie des Pits
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Welcome Section */}
        <section style={{
          background: 'linear-gradient(145deg, rgba(42, 42, 42, 0.9), rgba(0, 0, 0, 0.9))',
          borderRadius: '15px',
          padding: '40px',
          marginBottom: '40px',
          borderLeft: '3px solid #dc0000',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{
            fontFamily: 'Russo One, sans-serif',
            fontSize: '2.5em',
            color: '#e0e0e0',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Bienvenue dans votre Garage
          </h2>
          <p style={{
            fontSize: '1.2em',
            lineHeight: '1.6',
            color: '#b0b0b0'
          }}>
            Préparez-vous pour la course ! Gérez votre équipe, analysez les performances et dominez la piste.
          </p>
        </section>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Stat Card 1 */}
          <div style={{
            background: 'linear-gradient(145deg, #2a2a2a, #000000)',
            borderRadius: '15px',
            padding: '30px',
            borderBottom: '4px solid #dc0000',
            transform: 'skewX(-5deg)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{ transform: 'skewX(5deg)' }}>
              <h3 style={{
                color: '#dc0000',
                fontSize: '1.5em',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Vitesse Max
              </h3>
              <p style={{
                fontSize: '3em',
                fontWeight: 'bold',
                color: '#e0e0e0',
                margin: '0'
              }}>
                342
                <span style={{
                  fontSize: '0.5em',
                  color: '#888'
                }}>
                  km/h
                </span>
              </p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div style={{
            background: 'linear-gradient(145deg, #2a2a2a, #000000)',
            borderRadius: '15px',
            padding: '30px',
            borderBottom: '4px solid #dc0000',
            transform: 'skewX(-5deg)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{ transform: 'skewX(5deg)' }}>
              <h3 style={{
                color: '#dc0000',
                fontSize: '1.5em',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Tours Complets
              </h3>
              <p style={{
                fontSize: '3em',
                fontWeight: 'bold',
                color: '#e0e0e0',
                margin: '0'
              }}>
                47
                <span style={{
                  fontSize: '0.5em',
                  color: '#888'
                }}>
                  / 52
                </span>
              </p>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div style={{
            background: 'linear-gradient(145deg, #2a2a2a, #000000)',
            borderRadius: '15px',
            padding: '30px',
            borderBottom: '4px solid #dc0000',
            transform: 'skewX(-5deg)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{ transform: 'skewX(5deg)' }}>
              <h3 style={{
                color: '#dc0000',
                fontSize: '1.5em',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Position
              </h3>
              <p style={{
                fontSize: '3em',
                fontWeight: 'bold',
                color: '#00ff00',
                margin: '0'
              }}>
                P3
              </p>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <section style={{
          background: 'linear-gradient(145deg, rgba(42, 42, 42, 0.9), rgba(0, 0, 0, 0.9))',
          borderRadius: '15px',
          padding: '40px',
          borderLeft: '3px solid #dc0000',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{
            fontFamily: 'Russo One, sans-serif',
            fontSize: '2em',
            color: '#e0e0e0',
            marginBottom: '30px',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Prochaine Course
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <p style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Grand Prix</p>
              <p style={{ color: '#e0e0e0', fontSize: '1.5em', fontWeight: 'bold' }}>Monaco</p>
            </div>
            <div>
              <p style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</p>
              <p style={{ color: '#e0e0e0', fontSize: '1.5em', fontWeight: 'bold' }}>28 Mai 2024</p>
            </div>
            <div>
              <p style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Heure</p>
              <p style={{ color: '#e0e0e0', fontSize: '1.5em', fontWeight: 'bold' }}>15:00 CET</p>
            </div>
          </div>
        </section>
      </main>

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
