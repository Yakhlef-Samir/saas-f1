import { useNavigate } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'
import { MainLayout } from '@/components/layout/MainLayout'
import { AuthForm } from '@/components/ui/auth-form'
import '@/styles/f1-modern.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectError)

  const handleSubmit = async (data: { email: string; password: string }) => {
    const success = await login(data)
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <MainLayout>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        gap: '32px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Connexion
          </h1>
        </div>
        
        <AuthForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </MainLayout>
  )
}
