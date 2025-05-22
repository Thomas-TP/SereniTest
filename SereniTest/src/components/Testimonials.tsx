import React from 'react'
import './Testimonials.css'

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section section dark:bg-gray-900 dark:text-white">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="dark:text-white">Témoignages</h2>
          <p className="dark:text-gray-300">Découvrez ce que nos utilisateurs disent de Serenitest</p>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card dark:bg-gray-800 dark:border-gray-700">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text dark:text-gray-300">"Serenitest m'a aidé à prendre conscience de mon niveau de stress et m'a fourni des conseils précieux pour améliorer mon bien-être au quotidien."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">👩</div>
              <div className="testimonial-info">
                <h4 className="dark:text-white">Sophie Martin</h4>
                <p className="dark:text-gray-400">Enseignante, 34 ans</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card dark:bg-gray-800 dark:border-gray-700">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text dark:text-gray-300">"Le test est simple à réaliser et les résultats sont très détaillés. J'apprécie particulièrement les recommandations personnalisées qui sont vraiment adaptées à ma situation."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">👨</div>
              <div className="testimonial-info">
                <h4 className="dark:text-white">Thomas Dubois</h4>
                <p className="dark:text-gray-400">Ingénieur, 29 ans</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card dark:bg-gray-800 dark:border-gray-700">
            <div className="testimonial-rating">⭐⭐⭐⭐</div>
            <p className="testimonial-text dark:text-gray-300">"J'utilise Serenitest régulièrement pour suivre l'évolution de mon bien-être mental. C'est devenu un outil indispensable dans ma routine de self-care."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">👩</div>
              <div className="testimonial-info">
                <h4 className="dark:text-white">Emma Petit</h4>
                <p className="dark:text-gray-400">Graphiste, 27 ans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
