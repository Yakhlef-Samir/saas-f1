import { useNavigate } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'
import { MainLayout } from '@/components/layout/MainLayout'
import { AuthForm } from '@/components/ui/auth-form'
import '@/styles/f1-core.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectError)

  const handleSubmit = async (data: { email: string; password: string; first_name?: string; last_name?: string; display_name?: string; country?: string; favorite_f1_team?: string }) => {
    console.log('Register submit:', data)
    const success = await register({
      email: data.email,
      password: data.password,
      password_confirm: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      display_name: data.display_name,
      country: data.country,
      favorite_f1_team: data.favorite_f1_team,
    })
    if (success) {
      navigate('/dashboard')
    }
  }

  console.log('RegisterPage rendering')

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
            Inscription
          </h1>
        </div>
        
        <AuthForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          submitText="S'inscrire"
          linkText="Déjà un pilote ? Connectez-vous"
          linkTo="/login"
          isRegister={true}
        />
      </div>
    </MainLayout>
  )
}
