import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore, selectIsLoading, selectError } from '../stores/authStore'

interface FormData {
  email: string
  password: string
  password_confirm: string
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const clearError = useAuthStore((state) => state.clearError)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectError)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    password_confirm: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) {
      clearError()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await register(formData)

    if (success) {
      // Redirect to home after successful registration
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Créer un compte
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Minimum 8 caractères"
            />
          </div>

          <div>
            <label
              htmlFor="password_confirm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="password_confirm"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirmez votre mot de passe"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            {isLoading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
