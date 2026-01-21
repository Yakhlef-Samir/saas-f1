"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Chrome, Apple } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  display_name: z.string().optional(),
  country: z.string().optional(),
  favorite_f1_team: z.string().optional(),
})

interface AuthFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isLoading?: boolean
  error?: string | null
  submitText?: string
  linkText?: string
  linkTo?: string
  isRegister?: boolean
}

export function AuthForm({
  onSubmit,
  isLoading = false,
  error = null,
  submitText = "Connexion",
  linkText = "Nouveau Pilote ?",
  linkTo = "/register",
  isRegister = false,
}: AuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      display_name: "",
      country: "",
      favorite_f1_team: "",
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Use React Hook Form's handleSubmit
    const onSubmitHandler = form.handleSubmit(async (values) => {
      onSubmit(values)
    })
    
    await onSubmitHandler(e)
  }

  const f1Teams2026 = [
  "Red Bull Racing",
  "Ferrari",
  "Mercedes",
  "McLaren",
  "Alpine",
  "Aston Martin",
  "Williams",
  "RB (AlphaTauri)",
  "Haas",
  "Sauber",
  "Alfa Romeo",
  "Audi"
]

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    width: '100%',
    fontSize: '16px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    outline: 'none',
  }

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
    padding: '12px 16px',
    borderRadius: '8px',
    width: '100%',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      {error && (
        <div 
          style={{
            marginBottom: '24px',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            backdropFilter: 'blur(10px)',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#FCA5A5'
          }}
        >
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <input
            {...form.register("email", {
              onChange: (e) => {
                console.log('Email changed:', e.target.value)
              }
            })}
            placeholder="votre@ecurie.com"
            type="email"
            autoComplete="email"
            style={inputStyle}
          />
          {form.formState.errors.email && (
            <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '4px' }}>
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        
        <div>
          <input
            {...form.register("password", {
              onChange: (e) => {
                console.log('Password changed:', e.target.value)
              }
            })}
            placeholder="•••••••••••"
            type="password"
            autoComplete="current-password"
            style={inputStyle}
          />
          {form.formState.errors.password && (
            <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '4px' }}>
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {isRegister && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <input
                {...form.register("first_name", {
                  onChange: (e) => {
                    console.log('First name changed:', e.target.value)
                  }
                })}
                placeholder="Prénom"
                type="text"
                autoComplete="given-name"
                style={inputStyle}
              />
              {form.formState.errors.first_name && (
                <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '4px' }}>
                  {form.formState.errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...form.register("last_name", {
                  onChange: (e) => {
                    console.log('Last name changed:', e.target.value)
                  }
                })}
                placeholder="Nom"
                type="text"
                autoComplete="family-name"
                style={inputStyle}
              />
              {form.formState.errors.last_name && (
                <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '4px' }}>
                  {form.formState.errors.last_name.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...form.register("display_name", {
                  onChange: (e) => {
                    console.log('Display name changed:', e.target.value)
                  }
                })}
                placeholder="Nom d'affichage"
                type="text"
                autoComplete="nickname"
                style={inputStyle}
              />
              {form.formState.errors.display_name && (
                <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '4px' }}>
                  {form.formState.errors.display_name.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...form.register("country", {
                  onChange: (e) => {
                    console.log('Country changed:', e.target.value)
                  }
                })}
                placeholder="Pays"
                type="text"
                autoComplete="country-name"
                style={inputStyle}
              />
              {form.formState.errors.country && (
                <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '4px' }}>
                  {form.formState.errors.country.message}
                </p>
              )}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <select
                {...form.register("favorite_f1_team", {
                  onChange: (e) => {
                    console.log('F1 team changed:', e.target.value)
                  }
                })}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat`,
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px'
                }}
              >
                <option value="" style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white' 
                }}>Sélectionner une équipe F1</option>
                {f1Teams2026.map((team) => (
                  <option key={team} value={team} style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    color: 'white' 
                  }}>
                    {team}
                  </option>
                ))}
              </select>
              {form.formState.errors.favorite_f1_team && (
                <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '4px' }}>
                  {form.formState.errors.favorite_f1_team.message}
                </p>
              )}
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          style={{
            ...buttonStyle,
            opacity: isLoading ? 0.5 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          onMouseOver={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
            }
          }}
          onMouseOut={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'white'
            }
          }}
          onClick={() => {
            console.log('Button clicked, isLoading:', isLoading)
            console.log('Form values:', form.getValues())
            console.log('Form errors:', form.formState.errors)
            console.log('Form isValid:', form.formState.isValid)
          }}
        >
          {isLoading ? 'CHARGEMENT...' : `${submitText}`}
        </button>
      </form>

      <div style={{ marginTop: '24px' }}>
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <div style={{ 
              width: '100%', 
              borderTop: '1px solid rgba(255, 255, 255, 0.2)' 
            }}></div>
          </div>
          <div style={{ 
            position: 'relative', 
            display: 'flex', 
            justifyContent: 'center', 
            fontSize: '14px' 
          }}>
            <span style={{ 
              padding: '0 8px', 
              background: 'transparent', 
              color: 'rgba(255, 255, 255, 0.6)' 
            }}>
              Ou continuer avec
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type="button"
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }}
            onClick={() => {
              console.log('Google auth')
            }}
          >
            <Chrome style={{ width: '16px', height: '16px' }} />
            Google
          </button>
          
          <button
            type="button"
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'black'
            }}
            onClick={() => {
              console.log('Apple auth')
            }}
          >
            <Apple style={{ width: '16px', height: '16px' }} />
            Apple
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '32px', 
        textAlign: 'center', 
        fontSize: '14px', 
        color: 'rgba(255, 255, 255, 0.6)' 
      }}>
        En cliquant sur continuer, vous acceptez nos{' '}
        <Link 
          to="/terms" 
          style={{ 
            textDecoration: 'underline', 
            color: 'white' 
          }}
        >
          Conditions d'utilisation
        </Link>{' '}
        et{' '}
        <Link 
          to="/privacy" 
          style={{ 
            textDecoration: 'underline', 
            color: 'white' 
          }}
        >
          Politique de confidentialité
        </Link>
        .
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Link 
          to={linkTo} 
          style={{ 
            fontWeight: '500', 
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'white'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
          }}
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
}
