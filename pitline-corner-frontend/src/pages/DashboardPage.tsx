import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, selectUser } from '../stores/authStore'
import { AppLayout } from '@/components/layout/AppLayout'
import { StatsGrid } from '@/components/ui/stats-grid'
import { ActivityGrid } from '@/components/ui/activity-grid'
import { ChartContainer } from '@/components/ui/chart'
import '@/styles/f1-modern.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <AppLayout>
      <div className="f1-page">
        {/* Stats Section */}
        <div className="f1-stats">
          <div className="f1-container">
            <StatsGrid />
          </div>
        </div>

        {/* Simulation Graph Section */}
        <div className="f1-filters">
          <div className="f1-container">
            <h2 className="f1-section-title">Graphique des Simulations</h2>
            <div className="f1-chart-container">
              <ChartContainer />
              
              <div className="f1-chart-footer">
                <div className="f1-chart-stats">
                  <div className="f1-chart-stat">
                    <span className="f1-chart-stat-label">Moyenne Victoires:</span>
                    <span className="f1-chart-stat-value">82.6%</span>
                  </div>
                  <div className="f1-chart-stat">
                    <span className="f1-chart-stat-label">Total Simulations:</span>
                    <span className="f1-chart-stat-value">15</span>
                  </div>
                  <div className="f1-chart-stat">
                    <span className="f1-chart-stat-label">Taux de Réussite:</span>
                    <span className="f1-chart-stat-value">94.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="f1-race-grid">
          <div className="f1-container">
            <h2 className="f1-section-title">Activité Récente</h2>
            <ActivityGrid />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}