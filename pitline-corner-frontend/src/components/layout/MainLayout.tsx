import type { ReactNode } from 'react'
import { NavigationF1 } from './NavigationF1'
import { FooterF1 } from './FooterF1'

interface MainLayoutProps {
  children: ReactNode
  showFooter?: boolean
  className?: string
}

export function MainLayout({ children, showFooter = true, className = '' }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationF1 />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      {showFooter && <FooterF1 />}
    </div>
  )
}
