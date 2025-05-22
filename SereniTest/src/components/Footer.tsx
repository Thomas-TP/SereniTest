import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer dark:bg-gray-800 dark:text-white">
      <div className="container footer-container">
        <div className="footer-logo">
          <span className="footer-logo-icon">🧠</span>
          <h2 className="dark:text-white">Serenitest</h2>
        </div>
        
        <div className="footer-links">
          <div className="footer-links-column">
            <h3 className="dark:text-white">Navigation</h3>
            <ul>
              <li><a href="#features" className="dark:text-gray-300 dark:hover:text-white">Fonctionnalités</a></li>
              <li><a href="#testimonials" className="dark:text-gray-300 dark:hover:text-white">Témoignages</a></li>
              <li><a href="#contact" className="dark:text-gray-300 dark:hover:text-white">Contact</a></li>
              <li><a href="#professionals" className="dark:text-gray-300 dark:hover:text-white">Professionnels</a></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h3 className="dark:text-white">Légal</h3>
            <ul>
              <li><a href="#" className="dark:text-gray-300 dark:hover:text-white">Conditions d'utilisation</a></li>
              <li><a href="#" className="dark:text-gray-300 dark:hover:text-white">Politique de confidentialité</a></li>
              <li><a href="#" className="dark:text-gray-300 dark:hover:text-white">Mentions légales</a></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h3 className="dark:text-white">Suivez-nous</h3>
            <div className="social-links">
              <a href="#" className="social-link dark:bg-gray-700 dark:hover:bg-gray-600">📱</a>
              <a href="#" className="social-link dark:bg-gray-700 dark:hover:bg-gray-600">💻</a>
              <a href="#" className="social-link dark:bg-gray-700 dark:hover:bg-gray-600">📷</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom dark:bg-gray-900">
        <div className="container">
          <p className="dark:text-gray-400">&copy; {new Date().getFullYear()} Serenitest. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
