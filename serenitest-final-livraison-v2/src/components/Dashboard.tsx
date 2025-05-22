import React, { useState } from 'react'
import './Dashboard.css'
import TrendsAnalysis from './TrendsAnalysis'

interface DashboardProps {
  results: any
  onClose: () => void
  onOpenWellnessCenter: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ results, onClose, onOpenWellnessCenter }) => {
  const { stress, wellbeing, anxiety, sleep, energy, satisfaction, recommendations } = results
  const [showTrends, setShowTrends] = useState(false);

  const getStatusColor = (value) => {
    if (value >= 80) return '#28a745' // Vert - Très bon
    if (value >= 60) return '#8fb3ff' // Bleu clair - Bon
    if (value >= 40) return '#ffc107' // Jaune - Moyen
    if (value >= 20) return '#ff9800' // Orange - Préoccupant
    return '#dc3545' // Rouge - Critique
  }

  const getStressStatusColor = (value) => {
    if (value <= 20) return '#28a745' // Vert - Très bon
    if (value <= 40) return '#8fb3ff' // Bleu clair - Bon
    if (value <= 60) return '#ffc107' // Jaune - Moyen
    if (value <= 80) return '#ff9800' // Orange - Préoccupant
    return '#dc3545' // Rouge - Critique
  }

  const getStatusEmoji = (value, isStress = false) => {
    if (isStress) {
      if (value <= 20) return '😌'
      if (value <= 40) return '🙂'
      if (value <= 60) return '😐'
      if (value <= 80) return '😟'
      return '😰'
    } else {
      if (value >= 80) return '😌'
      if (value >= 60) return '🙂'
      if (value >= 40) return '😐'
      if (value >= 20) return '😟'
      return '😰'
    }
  }

  const getStatusText = (value, isStress = false) => {
    if (isStress) {
      if (value <= 20) return 'Très faible'
      if (value <= 40) return 'Faible'
      if (value <= 60) return 'Modéré'
      if (value <= 80) return 'Élevé'
      return 'Très élevé'
    } else {
      if (value >= 80) return 'Excellent'
      if (value >= 60) return 'Bon'
      if (value >= 40) return 'Moyen'
      if (value >= 20) return 'Faible'
      return 'Très faible'
    }
  }

  return (
    <section className="dashboard-section section dark:bg-gray-900 dark:text-white">
      <div className="container">
        {showTrends ? (
          <TrendsAnalysis onClose={() => setShowTrends(false)} initialData={null} />
        ) : (
          <>
            <div className="dashboard-header">
              <h2>Résultats de votre test de bien-être mental</h2>
              <p>Voici l'analyse détaillée de vos réponses et des recommandations personnalisées.</p>
            </div>
            
            <div className="dashboard-container dark:bg-gray-800">
              <div className="dashboard-main-metrics">
                <div className="metric-card main-metric dark:bg-gray-700">
                  <div className="metric-header">
                    <h3>Niveau de bien-être</h3>
                    <div className="metric-emoji">{getStatusEmoji(wellbeing)}</div>
                  </div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar-custom" 
                      style={{ 
                        width: `${wellbeing}%`,
                        backgroundColor: getStatusColor(wellbeing)
                      }}
                    ></div>
                  </div>
                  <div className="metric-value">
                    <span>{wellbeing}%</span>
                    <span className="metric-status">{getStatusText(wellbeing)}</span>
                  </div>
                </div>
                
                <div className="metric-card main-metric dark:bg-gray-700">
                  <div className="metric-header">
                    <h3>Niveau de stress</h3>
                    <div className="metric-emoji">{getStatusEmoji(stress, true)}</div>
                  </div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar-custom" 
                      style={{ 
                        width: `${stress}%`,
                        backgroundColor: getStressStatusColor(stress)
                      }}
                    ></div>
                  </div>
                  <div className="metric-value">
                    <span>{stress}%</span>
                    <span className="metric-status">{getStatusText(stress, true)}</span>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-secondary-metrics">
                <div className="metric-card dark:bg-gray-700">
                  <h3>Anxiété</h3>
                  <div className="metric-emoji">{getStatusEmoji(100 - anxiety)}</div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar-custom" 
                      style={{ 
                        width: `${100 - anxiety}%`,
                        backgroundColor: getStatusColor(100 - anxiety)
                      }}
                    ></div>
                  </div>
                  <div className="metric-value">
                    <span>{100 - anxiety}%</span>
                  </div>
                </div>
                
                <div className="metric-card dark:bg-gray-700">
                  <h3>Qualité du sommeil</h3>
                  <div className="metric-emoji">{getStatusEmoji(100 - sleep)}</div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar-custom" 
                      style={{ 
                        width: `${100 - sleep}%`,
                        backgroundColor: getStatusColor(100 - sleep)
                      }}
                    ></div>
                  </div>
                  <div className="metric-value">
                    <span>{100 - sleep}%</span>
                  </div>
                </div>
                
                <div className="metric-card dark:bg-gray-700">
                  <h3>Niveau d'énergie</h3>
                  <div className="metric-emoji">{getStatusEmoji(100 - energy)}</div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar-custom" 
                      style={{ 
                        width: `${100 - energy}%`,
                        backgroundColor: getStatusColor(100 - energy)
                      }}
                    ></div>
                  </div>
                  <div className="metric-value">
                    <span>{100 - energy}%</span>
                  </div>
                </div>
                
                <div className="metric-card dark:bg-gray-700">
                  <h3>Satisfaction de vie</h3>
                  <div className="metric-emoji">{getStatusEmoji(100 - satisfaction)}</div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar-custom" 
                      style={{ 
                        width: `${100 - satisfaction}%`,
                        backgroundColor: getStatusColor(100 - satisfaction)
                      }}
                    ></div>
                  </div>
                  <div className="metric-value">
                    <span>{100 - satisfaction}%</span>
                  </div>
                </div>
              </div>
              
              <div className="recommendations-section dark:bg-gray-700">
                <h3>Recommandations personnalisées</h3>
                <div className="recommendations-list">
                  {recommendations.map((recommendation, index) => (
                    <div key={index} className="recommendation-item dark:bg-gray-600">
                      <div className="recommendation-icon">✅</div>
                      <p>{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="dashboard-actions">
                <button 
                  className="btn btn-secondary dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  onClick={() => setShowTrends(true)}
                >
                  Voir mes tendances
                </button>
                <button 
                  className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white"
                  onClick={onOpenWellnessCenter}
                >
                  Accéder au Centre de bien-être
                </button>
                <button 
                  className="btn btn-outline dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Dashboard
