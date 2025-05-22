import React, { useState, useEffect } from 'react'
import './Header.css'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  onStartTest: () => void
  onGoHome: () => void
  onOpenWellnessCenter: () => void
}

const Header: React.FC<HeaderProps> = ({ onStartTest, onGoHome, onOpenWellnessCenter }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gestion du scroll pour l'effet visuel de la barre de navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fermer le menu mobile lors du clic sur un lien
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header dark:bg-gray-900 dark:text-white transition-colors duration-300 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo-menu-container">
          <div 
            className="logo" 
            onClick={onGoHome} 
            role="button" 
            tabIndex={0} 
            aria-label="Retour à l'accueil"
          >
            <span className="logo-icon">🧠</span>
            <h1>Serenitest</h1>
          </div>
          
          {/* Bouton hamburger pour mobile */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <a 
                href="#features" 
                className="dark:text-gray-200 dark:hover:text-white"
                onClick={handleLinkClick}
              >
                Fonctionnalités
              </a>
            </li>
            <li>
              <a 
                href="#testimonials" 
                className="dark:text-gray-200 dark:hover:text-white"
                onClick={handleLinkClick}
              >
                Témoignages
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="dark:text-gray-200 dark:hover:text-white"
                onClick={handleLinkClick}
              >
                Contact
              </a>
            </li>
            <li>
              <a 
                href="#professionals" 
                className="dark:text-gray-200 dark:hover:text-white"
                onClick={handleLinkClick}
              >
                Professionnels
              </a>
            </li>
            <li>
              <button 
                className="btn nav-btn dark:bg-indigo-600 dark:hover:bg-indigo-700" 
                onClick={() => {
                  onOpenWellnessCenter();
                  handleLinkClick();
                }}
              >
                Le centre
              </button>
            </li>
            <li className="theme-toggle-container">
              <ThemeToggle />
            </li>
            <li className="start-test-container">
              <button 
                className="btn nav-btn dark:bg-indigo-600 dark:hover:bg-indigo-700" 
                onClick={() => {
                  onStartTest();
                  handleLinkClick();
                }}
              >
                Commencer le test
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}

export default Header
