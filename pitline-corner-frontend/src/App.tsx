import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RaceLibraryPage from './pages/RaceLibraryPage'
import RacesListPage from './pages/RacesListPage'
import RaceDetailPage from './pages/RaceDetailPage'
import DriversListPage from './pages/DriversListPage'
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
        
        {/* Races Routes */}
        <Route path="/library" element={<RaceLibraryPage />} />
        <Route path="/races" element={<RacesListPage />} />
        <Route path="/races/:raceId" element={<RaceDetailPage />} />
        <Route path="/race/:raceId" element={<RaceDetailPage />} />
        
        {/* Drivers Routes */}
        <Route path="/drivers" element={<DriversListPage />} />
        
        {/* Strategy & Simulations Routes */}
        <Route path="/strategy" element={<StrategyPage />} />
        <Route path="/simulations" element={<StrategyPage />} />
        <Route path="/simulations/new" element={<StrategyPage />} />

        {/* Other Routes */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
