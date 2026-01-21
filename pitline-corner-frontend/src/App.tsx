import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
// import DemoPage from './pages/DemoPage'
import RaceLibraryPage from './pages/RaceLibraryPage'
import StrategyPage from './pages/StrategyPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/demo" element={<DemoPage />} /> */}
        <Route path="/library" element={<RaceLibraryPage />} />
        <Route path="/race/:raceId" element={<RaceLibraryPage />} />
        <Route path="/strategy" element={<StrategyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
