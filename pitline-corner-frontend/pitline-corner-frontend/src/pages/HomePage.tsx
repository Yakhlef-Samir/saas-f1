import { Link } from 'react-router-dom'

export default function HomePage() {
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
            rgba(255, 255, 255, 0.8) 49%, 
            rgba(255, 255, 255, 0.8) 51%, 
            transparent 52%),
          linear-gradient(0deg, rgba(220, 0, 0, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220, 0, 0, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '100vw 100%, 50px 50px, 50px 50px',
        animation: 'race-speed 0.5s linear infinite',
        zIndex: 0,
        maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)'
      }} />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
        {/* Logo/Title */}
        <div style={{
          marginBottom: '40px',
          animation: 'fadeInDown 1s ease'
        }}>
          <h1 style={{
            fontFamily: 'Russo One, sans-serif',
            fontSize: 'clamp(3em, 10vw, 6em)',
            color: '#dc0000',
            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)',
            margin: '0 0 20px 0',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            lineHeight: '1'
          }}>
            Pitline
            <br />
            Corner
          </h1>
          <p style={{
            fontSize: 'clamp(1em, 3vw, 1.5em)',
            color: '#e0e0e0',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            margin: 0,
            opacity: 0.9
          }}>
            Votre Quartier Général F1
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeInUp 1s ease 0.3s both'
        }}>
          <Link
            to="/register"
            style={{
              display: 'inline-block',
              padding: '20px 50px',
              background: 'linear-gradient(90deg, #a00000 0%, #dc0000 50%, #a00000 100%)',
              backgroundSize: '200% auto',
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'Russo One, sans-serif',
              fontSize: '1.2em',
              textTransform: 'uppercase',
              clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
              transition: 'all 0.3s ease',
              textShadow: '1px 1px 2px black',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = 'right center'
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 0 30px #dc0000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = 'left center'
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Rejoindre la Course
          </Link>
          
          <Link
            to="/login"
            style={{
              display: 'inline-block',
              padding: '20px 50px',
              background: 'transparent',
              color: '#e0e0e0',
              textDecoration: 'none',
              fontFamily: 'Russo One, sans-serif',
              fontSize: '1.2em',
              textTransform: 'uppercase',
              border: '2px solid #dc0000',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#dc0000'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 0, 0, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#e0e0e0'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Connexion Pilote
          </Link>
        </div>

        {/* Features */}
        <div style={{
          marginTop: '100px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          width: '100%',
          animation: 'fadeIn 1s ease 0.6s both'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(42, 42, 42, 0.9), rgba(0, 0, 0, 0.9))',
            padding: '30px',
            borderRadius: '15px',
            borderBottom: '3px solid #dc0000',
            transform: 'skewX(-5deg)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(-10px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{ transform: 'skewX(5deg)' }}>
              <div style={{
                fontSize: '3em',
                marginBottom: '20px'
              }}>
                🏎️
              </div>
              <h3 style={{
                color: '#dc0000',
                fontSize: '1.5em',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Gestion de Course
              </h3>
              <p style={{ color: '#b0b0b0', lineHeight: '1.6' }}>
                Suivez chaque tour, analysez les performances et prenez les décisions qui mènent à la victoire.
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(145deg, rgba(42, 42, 42, 0.9), rgba(0, 0, 0, 0.9))',
            padding: '30px',
            borderRadius: '15px',
            borderBottom: '3px solid #dc0000',
            transform: 'skewX(-5deg)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(-10px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{ transform: 'skewX(5deg)' }}>
              <div style={{
                fontSize: '3em',
                marginBottom: '20px'
              }}>
                🏁
              </div>
              <h3 style={{
                color: '#dc0000',
                fontSize: '1.5em',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Stats en Temps Réel
              </h3>
              <p style={{ color: '#b0b0b0', lineHeight: '1.6' }}>
                Accédez aux données live, aux télemétries et aux stratégies de tous les pilotes.
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(145deg, rgba(42, 42, 42, 0.9), rgba(0, 0, 0, 0.9))',
            padding: '30px',
            borderRadius: '15px',
            borderBottom: '3px solid #dc0000',
            transform: 'skewX(-5deg)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(-10px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'skewX(-5deg) translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{ transform: 'skewX(5deg)' }}>
              <div style={{
                fontSize: '3em',
                marginBottom: '20px'
              }}>
                🏆
              </div>
              <h3 style={{
                color: '#dc0000',
                fontSize: '1.5em',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Classement Mondial
              </h3>
              <p style={{ color: '#b0b0b0', lineHeight: '1.6' }}>
                Competez avec les meilleurs pilotes et dominez le championnat du monde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&family=Russo+One&display=swap" rel="stylesheet" />
      
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes race-speed {
            0% { background-position: 50% 0, 0 0, 0 0; }
            100% { background-position: 50% 0, 0 50px, 0 50px; }
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `
      }} />
    </div>
  )
}
