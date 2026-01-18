import type { ReactNode } from 'react'

interface F1ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  href?: string
}

export default function F1Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'medium',
  href
}: F1ButtonProps) {
  const baseStyles = {
    fontFamily: 'Russo One, sans-serif',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center' as const
  }

  const variants = {
    primary: {
      background: disabled 
        ? '#666666' 
        : 'linear-gradient(90deg, #a00000 0%, #dc0000 50%, #a00000 100%)',
      backgroundSize: '200% auto',
      color: 'white',
      clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
      textShadow: '1px 1px 2px black'
    },
    secondary: {
      background: 'transparent',
      color: '#e0e0e0',
      border: '2px solid #dc0000'
    }
  }

  const sizes = {
    small: {
      padding: '10px 20px',
      fontSize: '14px'
    },
    medium: {
      padding: '15px 30px',
      fontSize: '16px'
    },
    large: {
      padding: '20px 50px',
      fontSize: '18px'
    }
  }

  const style: React.CSSProperties = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size]
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return
    
    const target = e.currentTarget
    if (variant === 'primary') {
      target.style.backgroundPosition = 'right center'
      target.style.transform = 'scale(1.05)'
      target.style.boxShadow = '0 0 30px #dc0000'
    } else {
      target.style.background = '#dc0000'
      target.style.color = 'white'
      target.style.boxShadow = '0 0 20px rgba(220, 0, 0, 0.5)'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return
    
    const target = e.currentTarget
    if (variant === 'primary') {
      target.style.backgroundPosition = 'left center'
      target.style.transform = 'scale(1)'
      target.style.boxShadow = 'none'
    } else {
      target.style.background = 'transparent'
      target.style.color = '#e0e0e0'
      target.style.boxShadow = 'none'
    }
  }

  if (href) {
    return (
      <a
        href={href}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
