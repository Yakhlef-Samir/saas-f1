import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function HomePage() {
  

  return (
   <h1>HomePage</h1>
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
