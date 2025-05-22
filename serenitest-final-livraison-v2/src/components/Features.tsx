import React from 'react'
import './Features.css'

const Features = () => {
  return (
    <section id="features" className="features-section section dark:bg-gray-900 dark:text-white">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="dark:text-white">Nos fonctionnalités</h2>
          <p className="dark:text-gray-300">Découvrez comment Serenitest peut vous aider à améliorer votre bien-être mental</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card dark:bg-gray-800 dark:border-gray-700">
            <div className="feature-icon">😊</div>
            <h3 className="dark:text-white">Test de bien-être complet</h3>
            <p className="dark:text-gray-300">Évaluez votre niveau de stress, d'anxiété et de bien-être général grâce à notre test scientifiquement validé.</p>
          </div>
          
          <div className="feature-card dark:bg-gray-800 dark:border-gray-700">
            <div className="feature-icon">📊</div>
            <h3 className="dark:text-white">Analyse détaillée</h3>
            <p className="dark:text-gray-300">Recevez une analyse complète de vos résultats avec des graphiques et des explications personnalisées.</p>
          </div>
          
          <div className="feature-card dark:bg-gray-800 dark:border-gray-700">
            <div className="feature-icon">🧘</div>
            <h3 className="dark:text-white">Recommandations personnalisées</h3>
            <p className="dark:text-gray-300">Obtenez des conseils adaptés à votre profil pour améliorer votre bien-être mental au quotidien.</p>
          </div>
          
          <div className="feature-card dark:bg-gray-800 dark:border-gray-700">
            <div className="feature-icon">📱</div>
            <h3 className="dark:text-white">Suivi de progression</h3>
            <p className="dark:text-gray-300">Suivez l'évolution de votre bien-être mental dans le temps et visualisez vos progrès.</p>
          </div>
          
          <div className="feature-card dark:bg-gray-800 dark:border-gray-700">
            <div className="feature-icon">🔒</div>
            <h3 className="dark:text-white">Confidentialité garantie</h3>
            <p className="dark:text-gray-300">Vos données sont sécurisées et confidentielles, nous respectons votre vie privée.</p>
          </div>
          
          <div className="feature-card dark:bg-gray-800 dark:border-gray-700">
            <div className="feature-icon">💬</div>
            <h3 className="dark:text-white">Communauté de soutien</h3>
            <p className="dark:text-gray-300">Rejoignez notre communauté pour échanger et partager vos expériences avec d'autres utilisateurs.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
