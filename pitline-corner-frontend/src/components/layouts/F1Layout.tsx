import type { ReactNode } from 'react'

interface F1LayoutProps {
  children: ReactNode
  showTrack?: boolean
}

export default function F1Layout({ children, showTrack = true }: F1LayoutProps) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#111111',
      fontFamily: 'Orbitron, sans-serif',
      color: '#e0e0e0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background F1 track - optional */}
      {showTrack && (
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
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
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
