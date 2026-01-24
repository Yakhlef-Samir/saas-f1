import { ReactNode } from 'react'
import { SidebarNavigation } from './SidebarNavigation'
import { useAuth } from '@/hooks/useAuth'
import '@/styles/navigation.css'

interface AppLayoutProps {
  children: ReactNode
  showSidebar?: boolean
}

export function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  const { isAuthenticated } = useAuth()

  // Ne pas afficher la sidebar sur les pages publiques
  if (!isAuthenticated || !showSidebar) {
    return <>{children}</>
  }

  return (
    <div className="f1-main-layout">
      <SidebarNavigation />
      <div className="content">
        <main className="main bg-f1-dark text-white min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
