import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, selectUser } from '../stores/authStore'
import { AppLayout } from '@/components/layout/AppLayout'
import '@/styles/f1-modern.css'

export default function ProfilePage() {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = () => {
    // TODO: Implement logout
    navigate('/login')
  }

  const tabs = [
    { id: 'overview', name: 'Aperçu', icon: '👤' },
    { id: 'stats', name: 'Statistiques', icon: '📊' },
    { id: 'settings', name: 'Paramètres', icon: '⚙️' },
    { id: 'achievements', name: 'Succès', icon: '🏆' }
  ]

  const achievements = [
    { id: 1, name: 'Première Victoire', description: 'Gagnez votre première course', icon: '🏁', unlocked: true },
    { id: 2, name: 'Stratège en Chef', description: 'Réalisez 10 simulations parfaites', icon: '🧠', unlocked: true },
    { id: 3, name: 'Pilote Régulier', description: 'Participez à 20 courses', icon: '📅', unlocked: false },
    { id: 4, name: 'Maître du DRS', description: 'Dépassez 50 pilotes au DRS', icon: '🚀', unlocked: false }
  ]

  const stats = [
    { label: 'Courses Participées', value: '12', change: '+2', positive: true },
    { label: 'Victoires', value: '3', change: '+1', positive: true },
    { label: 'Podiums', value: '8', change: '+3', positive: true },
    { label: 'Meilleur Tour', value: '1:23.456', change: '-0.234', positive: true },
    { label: 'Points au Championnat', value: '156', change: '+25', positive: true },
    { label: 'Taux de Réussite', value: '67%', change: '+5%', positive: true }
  ]

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <AppLayout>
      <div className="f1-page">
        <div className="f1-profile-page">
          {/* Profile Header */}
          <section className="f1-profile-header">
            <div className="f1-profile-container">
              <div className="f1-profile-header-content">
                {/* Avatar Section */}
                <div className="f1-profile-avatar-section">
                  <div className="f1-profile-avatar">
                    <div className="f1-profile-avatar-placeholder">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <button className="f1-profile-avatar-edit">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="f1-profile-level">
                    <div className="f1-profile-level-badge">
                      Niveau 12
                    </div>
                    <div className="f1-profile-level-progress">
                      <div className="f1-profile-level-bar" style={{ width: '65%' }}></div>
                    </div>
                    <span className="f1-profile-level-text">650 / 1000 XP</span>
                  </div>
                </div>

                {/* User Info */}
                <div className="f1-profile-info">
                  <div className="f1-profile-info-header">
                    <h1 className="f1-profile-name">
                      {user.email.split('@')[0]}
                    </h1>
                    <div className="f1-profile-badges">
                      <span className="f1-profile-badge premium">Premium</span>
                      <span className="f1-profile-badge veteran">Vétéran</span>
                    </div>
                  </div>
                  
                  <div className="f1-profile-details">
                    <div className="f1-profile-detail">
                      <span className="f1-profile-detail-label">Email:</span>
                      <span className="f1-profile-detail-value">{user.email}</span>
                    </div>
                    <div className="f1-profile-detail">
                      <span className="f1-profile-detail-label">Écurie:</span>
                      <span className="f1-profile-detail-value">Red Bull Racing</span>
                    </div>
                    <div className="f1-profile-detail">
                      <span className="f1-profile-detail-label">Membre depuis:</span>
                      <span className="f1-profile-detail-value">Janvier 2024</span>
                    </div>
                  </div>

                  <div className="f1-profile-actions">
                    <button 
                      className="f1-profile-btn f1-profile-btn-primary"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Sauvegarder' : 'Modifier le Profil'}
                    </button>
                    <button 
                      className="f1-profile-btn f1-profile-btn-outline"
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Profile Tabs */}
          <section className="f1-profile-tabs">
            <div className="f1-profile-container">
              <div className="f1-profile-tabs-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`f1-profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="f1-profile-tab-icon">{tab.icon}</span>
                    <span className="f1-profile-tab-text">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tab Content */}
          <section className="f1-profile-content">
            <div className="f1-profile-container">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="f1-profile-overview">
                  <div className="f1-profile-overview-grid">
                    <div className="f1-profile-overview-card">
                      <h3 className="f1-profile-card-title">Performance Récente</h3>
                      <div className="f1-profile-performance-chart">
                        <div className="f1-profile-chart-bars">
                          {[65, 78, 82, 71, 89, 94, 88, 92].map((value, index) => (
                            <div key={index} className="f1-profile-chart-bar">
                              <div 
                                className="f1-profile-chart-fill" 
                                style={{ height: `${value}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                        <div className="f1-profile-chart-labels">
                          <span>J</span><span>F</span><span>M</span><span>A</span><span>M</span><span>J</span><span>J</span><span>A</span>
                        </div>
                      </div>
                    </div>

                    <div className="f1-profile-overview-card">
                      <h3 className="f1-profile-card-title">Courses à Venir</h3>
                      <div className="f1-profile-upcoming-races">
                        <div className="f1-profile-race-item">
                          <div className="f1-profile-race-info">
                            <span className="f1-profile-race-name">Grand Prix de Monaco</span>
                            <span className="f1-profile-race-date">28 Mai 2024</span>
                          </div>
                          <span className="f1-profile-race-status">Inscrit</span>
                        </div>
                        <div className="f1-profile-race-item">
                          <div className="f1-profile-race-info">
                            <span className="f1-profile-race-name">Grand Prix du Canada</span>
                            <span className="f1-profile-race-date">9 Juin 2024</span>
                          </div>
                          <span className="f1-profile-race-status">Inscrit</span>
                        </div>
                        <div className="f1-profile-race-item">
                          <div className="f1-profile-race-info">
                            <span className="f1-profile-race-name">Grand Prix d'Espagne</span>
                            <span className="f1-profile-race-date">23 Juin 2024</span>
                          </div>
                          <span className="f1-profile-race-status pending">En attente</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 'stats' && (
                <div className="f1-profile-stats">
                  <div className="f1-profile-stats-grid">
                    {stats.map((stat, index) => (
                      <div key={index} className="f1-profile-stat-card">
                        <div className="f1-profile-stat-header">
                          <span className="f1-profile-stat-label">{stat.label}</span>
                          <span className={`f1-profile-stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                            {stat.change}
                          </span>
                        </div>
                        <div className="f1-profile-stat-value">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="f1-profile-settings">
                  <div className="f1-profile-settings-grid">
                    <div className="f1-profile-settings-card">
                      <h3 className="f1-profile-card-title">Préférences de Course</h3>
                      <div className="f1-profile-settings-list">
                        <div className="f1-profile-setting-item">
                          <label className="f1-profile-setting-label">Unités de vitesse</label>
                          <select className="f1-profile-setting-select">
                            <option>km/h</option>
                            <option>mph</option>
                          </select>
                        </div>
                        <div className="f1-profile-setting-item">
                          <label className="f1-profile-setting-label">Format de temps</label>
                          <select className="f1-profile-setting-select">
                            <option>MM:SS.mmm</option>
                            <option>SS.mmm</option>
                          </select>
                        </div>
                        <div className="f1-profile-setting-item">
                          <label className="f1-profile-setting-label">Notifications</label>
                          <div className="f1-profile-setting-toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="f1-profile-toggle-slider"></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="f1-profile-settings-card">
                      <h3 className="f1-profile-card-title">Sécurité</h3>
                      <div className="f1-profile-settings-list">
                        <div className="f1-profile-setting-item">
                          <label className="f1-profile-setting-label">Mot de passe</label>
                          <button className="f1-profile-setting-btn">Changer</button>
                        </div>
                        <div className="f1-profile-setting-item">
                          <label className="f1-profile-setting-label">Authentification à deux facteurs</label>
                          <div className="f1-profile-setting-toggle">
                            <input type="checkbox" />
                            <span className="f1-profile-toggle-slider"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="f1-profile-achievements">
                  <div className="f1-profile-achievements-grid">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`f1-profile-achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                      >
                        <div className="f1-profile-achievement-icon">
                          {achievement.icon}
                        </div>
                        <div className="f1-profile-achievement-content">
                          <h3 className="f1-profile-achievement-title">{achievement.name}</h3>
                          <p className="f1-profile-achievement-description">
                            {achievement.description}
                          </p>
                        </div>
                        <div className="f1-profile-achievement-status">
                          {achievement.unlocked ? '✅' : '🔒'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}
