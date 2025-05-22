import React from 'react'
import './Hero.css'

interface HeroProps {
  onStartTest: () => void
}

const Hero: React.FC<HeroProps> = ({ onStartTest }) => {
  return (
    <section className="hero-section dark:bg-gray-900 dark:text-white">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="dark:text-white">Évaluez votre bien-être mental en quelques minutes</h1>
          <p className="dark:text-gray-300">Serenitest vous offre un test scientifique pour mesurer votre niveau de stress, d'anxiété et de bien-être général. Obtenez des résultats personnalisés et des recommandations adaptées à votre situation.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700" onClick={onStartTest}>Commencer le test</button>
            <a href="#features" className="btn btn-secondary dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">En savoir plus</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-emoji-container dark:bg-gray-800">
            <span className="hero-emoji">😌</span>
            <span className="hero-emoji">🧘</span>
            <span className="hero-emoji">🌱</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
