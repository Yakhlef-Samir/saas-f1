import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-container flex items-center justify-center p-grid">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Pitline Corner</h1>
          <p className="text-text-secondary">Créez votre compte</p>
        </div>
        {children}
      </div>
    </div>
  )
}
