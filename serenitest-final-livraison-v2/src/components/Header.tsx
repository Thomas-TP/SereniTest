import React from 'react'
import './Header.css'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  onStartTest: () => void
  onGoHome: () => void
  onOpenWellnessCenter: () => void
}

const Header: React.FC<HeaderProps> = ({ onStartTest, onGoHome, onOpenWellnessCenter }) => {
  return (
    <header className="header dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container header-container">
        <div className="logo" onClick={onGoHome} role="button" tabIndex={0} aria-label="Retour à l'accueil">
          <span className="logo-icon">🧠</span>
          <h1>Serenitest</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#features" className="dark:text-gray-200 dark:hover:text-white">Fonctionnalités</a></li>
            <li><a href="#testimonials" className="dark:text-gray-200 dark:hover:text-white">Témoignages</a></li>
            <li><a href="#contact" className="dark:text-gray-200 dark:hover:text-white">Contact</a></li>
            <li><a href="#professionals" className="dark:text-gray-200 dark:hover:text-white">Professionnels</a></li>
            <li><button className="wellness-btn dark:bg-teal-600 dark:hover:bg-teal-700" onClick={onOpenWellnessCenter}>Centre de Bien-être</button></li>
            <li><ThemeToggle /></li>
            <li><button className="btn nav-btn dark:bg-indigo-600 dark:hover:bg-indigo-700" onClick={onStartTest}>Commencer le test</button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
