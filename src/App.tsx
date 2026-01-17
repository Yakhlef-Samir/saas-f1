import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="h-24 hover:drop-shadow-lg transition-all" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-24 hover:drop-shadow-lg transition-all animate-spin-slow" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Pitline Corner</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4"
          >
            count is {count}
          </button>
          <div className="space-y-3">
            <Link
              to="/register"
              className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Créer un compte
            </Link>
            <Link
              to="/login"
              className="block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Se connecter
            </Link>
          </div>
          <p className="mt-4 text-gray-600">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="mt-8 text-gray-500 text-sm">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
