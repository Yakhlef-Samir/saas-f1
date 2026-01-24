import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RaceLibraryPage from './pages/RaceLibraryPage'
import RaceDetailPage from './pages/RaceDetailPage'
import PostRaceAnalysisPage from './pages/PostRaceAnalysisPage'
import NewSimulationPage from './pages/NewSimulationPage'
import SimulationsListPage from './pages/SimulationsListPage'
import AcademyPage from './pages/AcademyPage'
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
        <Route path="/race/:raceId" element={<RaceDetailPage />} />
        <Route path="/analysis/:raceId" element={<PostRaceAnalysisPage />} />

        {/* Strategy & Simulations Routes */}
        <Route path="/strategy" element={<SimulationsListPage />} />
        <Route path="/strategy/new" element={<NewSimulationPage />} />
        <Route path="/simulations" element={<SimulationsListPage />} />
        <Route path="/simulations/new" element={<NewSimulationPage />} />

        {/* Academy Routes */}
        <Route path="/academy" element={<AcademyPage />} />

        {/* Other Routes */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
