import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // In production, send to error reporting service
    if (import.meta.env.PROD) {
      // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-error">
                Une erreur est survenue
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-text-secondary">
                Désolé, une erreur inattendue s'est produite. 
                L'équipe a été notifiée et travaillera à résoudre ce problème.
              </p>
              
              {import.meta.env.DEV && this.state.error && (
                <div className="text-left">
                  <p className="font-mono text-xs text-error bg-error/10 p-2 rounded">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Recharger la page
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                  className="w-full"
                >
                  Réessayer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
