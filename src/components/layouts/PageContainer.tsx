import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn('min-h-screen bg-background', className)}>
      <div className="max-w-7xl mx-auto px-grid py-grid">{children}</div>
    </main>
  )
}
