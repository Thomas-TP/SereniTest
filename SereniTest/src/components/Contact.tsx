import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    }, 1000)
  }

  return (
    <section id="contact" className="contact-section section dark:bg-gray-900 dark:text-white">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="dark:text-white">Contactez-nous</h2>
          <p className="dark:text-gray-300">Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter.</p>
        </div>
        
        <div className="contact-container">
          <div className="contact-info dark:bg-gray-800 dark:border-gray-700">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3 className="dark:text-white">Email</h3>
                <p className="dark:text-gray-300">contact@serenitest.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <h3 className="dark:text-white">Téléphone</h3>
                <p className="dark:text-gray-300">+33 1 23 45 67 89</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🏢</div>
              <div>
                <h3 className="dark:text-white">Adresse</h3>
                <p className="dark:text-gray-300">123 Avenue de la Sérénité<br />75001 Paris, France</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container dark:bg-gray-800 dark:border-gray-700">
            {submitted ? (
              <div className="success-message dark:bg-gray-800">
                <div className="success-icon">✅</div>
                <h3 className="dark:text-white">Message envoyé avec succès !</h3>
                <p className="dark:text-gray-300">Nous vous répondrons dans les plus brefs délais.</p>
                <button className="btn dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white" onClick={() => setSubmitted(false)}>Envoyer un autre message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="dark:text-gray-300">Nom</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="dark:text-gray-300">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="dark:text-gray-300">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white">Envoyer</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
