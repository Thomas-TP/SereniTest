import React, { useState, useEffect } from 'react';
import './ProfessionalSearch.css';

interface Professional {
  id: string;
  name: string;
  specialty: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  website?: string;
  distance?: number;
  languages: string[];
  availability?: string;
  rating?: number;
}

interface ProfessionalSearchProps {
  isFullPage: boolean;
  onViewFullPage?: () => void;
  onClose?: () => void;
}

const ProfessionalSearch: React.FC<ProfessionalSearchProps> = ({ 
  isFullPage, 
  onViewFullPage, 
  onClose 
}) => {
  const [searchCity, setSearchCity] = useState<string>('');
  const [searchSpecialty, setSearchSpecialty] = useState<string>('all');
  const [searchRadius, setSearchRadius] = useState<number>(10);
  const [searchResults, setSearchResults] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // Liste des spécialités médicales
  const specialties = [
    { value: 'all', label: 'Toutes les spécialités' },
    { value: 'psychiatrist', label: 'Psychiatre' },
    { value: 'psychologist', label: 'Psychologue' },
    { value: 'therapist', label: 'Thérapeute' },
    { value: 'counselor', label: 'Conseiller psychologique' },
    { value: 'coach', label: 'Coach en bien-être mental' },
    { value: 'gp', label: 'Médecin généraliste' }
  ];

  // Base de données simulée de professionnels en Suisse
  const professionalDatabase: Professional[] = [
    {
      id: '1',
      name: 'Dr. Sophie Müller',
      specialty: 'psychiatrist',
      address: 'Rue du Lac 15',
      city: 'Genève',
      postalCode: '1207',
      phone: '+41 22 123 45 67',
      email: 'sophie.muller@example.ch',
      website: 'www.drmullerpsychiatrie.ch',
      languages: ['Français', 'Allemand', 'Anglais'],
      availability: 'Lundi-Vendredi, 9h-17h',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Dr. Thomas Weber',
      specialty: 'psychiatrist',
      address: 'Bahnhofstrasse 42',
      city: 'Zürich',
      postalCode: '8001',
      phone: '+41 44 987 65 43',
      email: 'thomas.weber@example.ch',
      languages: ['Allemand', 'Anglais'],
      availability: 'Lundi-Jeudi, 8h-18h',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Marie Dubois',
      specialty: 'psychologist',
      address: 'Avenue de la Gare 7',
      city: 'Lausanne',
      postalCode: '1003',
      phone: '+41 21 345 67 89',
      email: 'marie.dubois@example.ch',
      website: 'www.marieduboispsychologue.ch',
      languages: ['Français', 'Anglais'],
      availability: 'Mardi-Samedi, 10h-19h',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Marco Rossi',
      specialty: 'therapist',
      address: 'Via Nassa 5',
      city: 'Lugano',
      postalCode: '6900',
      phone: '+41 91 234 56 78',
      email: 'marco.rossi@example.ch',
      languages: ['Italien', 'Français', 'Allemand'],
      availability: 'Lundi-Vendredi, 9h-17h',
      rating: 4.7
    },
    {
      id: '5',
      name: 'Anna Schmidt',
      specialty: 'counselor',
      address: 'Marktgasse 12',
      city: 'Bern',
      postalCode: '3011',
      phone: '+41 31 876 54 32',
      email: 'anna.schmidt@example.ch',
      languages: ['Allemand', 'Français', 'Anglais'],
      availability: 'Lundi, Mercredi, Vendredi, 8h-16h',
      rating: 4.5
    },
    {
      id: '6',
      name: 'Dr. Jean Martin',
      specialty: 'gp',
      address: 'Rue de la Paix 23',
      city: 'Neuchâtel',
      postalCode: '2000',
      phone: '+41 32 765 43 21',
      email: 'jean.martin@example.ch',
      languages: ['Français', 'Allemand'],
      availability: 'Lundi-Vendredi, 8h-17h',
      rating: 4.4
    },
    {
      id: '7',
      name: 'Lukas Meier',
      specialty: 'coach',
      address: 'Seestrasse 8',
      city: 'Luzern',
      postalCode: '6002',
      phone: '+41 41 654 32 10',
      email: 'lukas.meier@example.ch',
      website: 'www.lukasmeiercoaching.ch',
      languages: ['Allemand', 'Anglais'],
      availability: 'Flexible, sur rendez-vous',
      rating: 4.9
    },
    {
      id: '8',
      name: 'Dr. Claudia Blanc',
      specialty: 'psychiatrist',
      address: 'Rue du Rhône 35',
      city: 'Genève',
      postalCode: '1204',
      phone: '+41 22 876 54 32',
      email: 'claudia.blanc@example.ch',
      website: 'www.drblanc-psy.ch',
      languages: ['Français', 'Anglais', 'Espagnol'],
      availability: 'Lundi-Vendredi, 9h-18h',
      rating: 4.7
    },
    {
      id: '9',
      name: 'Stefan Brunner',
      specialty: 'psychologist',
      address: 'Hauptstrasse 18',
      city: 'Basel',
      postalCode: '4051',
      phone: '+41 61 345 67 89',
      email: 'stefan.brunner@example.ch',
      languages: ['Allemand', 'Français', 'Anglais'],
      availability: 'Mardi-Samedi, 9h-17h',
      rating: 4.6
    },
    {
      id: '10',
      name: 'Laura Ferrari',
      specialty: 'therapist',
      address: 'Via Cattedrale 3',
      city: 'Lugano',
      postalCode: '6900',
      phone: '+41 91 987 65 43',
      email: 'laura.ferrari@example.ch',
      languages: ['Italien', 'Français'],
      availability: 'Lundi-Jeudi, 10h-18h',
      rating: 4.8
    },
    {
      id: '11',
      name: 'Dr. Michael Schneider',
      specialty: 'psychiatrist',
      address: 'Bahnhofplatz 5',
      city: 'Zürich',
      postalCode: '8001',
      phone: '+41 44 234 56 78',
      email: 'michael.schneider@example.ch',
      website: 'www.drschneider-psychiatrie.ch',
      languages: ['Allemand', 'Anglais'],
      availability: 'Lundi-Vendredi, 8h-17h',
      rating: 4.5
    },
    {
      id: '12',
      name: 'Christine Favre',
      specialty: 'counselor',
      address: 'Avenue de la Gare 12',
      city: 'Lausanne',
      postalCode: '1001',
      phone: '+41 21 876 54 32',
      email: 'christine.favre@example.ch',
      languages: ['Français', 'Anglais'],
      availability: 'Lundi, Mercredi, Vendredi, 9h-17h',
      rating: 4.7
    },
    {
      id: '13',
      name: 'Dr. Andreas Keller',
      specialty: 'gp',
      address: 'Marktplatz 7',
      city: 'Bern',
      postalCode: '3011',
      phone: '+41 31 234 56 78',
      email: 'andreas.keller@example.ch',
      languages: ['Allemand', 'Français', 'Anglais'],
      availability: 'Lundi-Vendredi, 8h-18h',
      rating: 4.6
    },
    {
      id: '14',
      name: 'Nathalie Rochat',
      specialty: 'coach',
      address: 'Rue du Midi 8',
      city: 'Genève',
      postalCode: '1207',
      phone: '+41 22 345 67 89',
      email: 'nathalie.rochat@example.ch',
      website: 'www.nathalie-coaching.ch',
      languages: ['Français', 'Anglais'],
      availability: 'Flexible, sur rendez-vous',
      rating: 4.9
    },
    {
      id: '15',
      name: 'Dr. Daniel Schmid',
      specialty: 'psychiatrist',
      address: 'Centralstrasse 10',
      city: 'Luzern',
      postalCode: '6003',
      phone: '+41 41 876 54 32',
      email: 'daniel.schmid@example.ch',
      languages: ['Allemand', 'Anglais'],
      availability: 'Lundi-Jeudi, 9h-17h',
      rating: 4.8
    }
  ];

  // Fonction pour calculer une distance simulée entre deux villes suisses
  const calculateDistance = (cityA: string, cityB: string): number => {
    // Coordonnées simplifiées de quelques villes suisses
    const cities = {
      'Genève': { lat: 46.2044, lng: 6.1432 },
      'Lausanne': { lat: 46.5197, lng: 6.6323 },
      'Zürich': { lat: 47.3769, lng: 8.5417 },
      'Bern': { lat: 46.9480, lng: 7.4474 },
      'Basel': { lat: 47.5596, lng: 7.5886 },
      'Lugano': { lat: 46.0036, lng: 8.9510 },
      'Luzern': { lat: 47.0502, lng: 8.3093 },
      'Neuchâtel': { lat: 46.9925, lng: 6.9311 }
    };

    // Si la ville n'est pas dans notre liste, retourner une distance aléatoire
    if (!cities[cityA] || !cities[cityB]) {
      return Math.floor(Math.random() * 50) + 1; // 1-50 km
    }

    // Calcul simplifié de la distance (formule de Haversine simplifiée)
    const R = 6371; // Rayon de la Terre en km
    const dLat = (cities[cityB].lat - cities[cityA].lat) * Math.PI / 180;
    const dLng = (cities[cityB].lng - cities[cityA].lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(cities[cityA].lat * Math.PI / 180) * Math.cos(cities[cityB].lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance);
  };

  // Fonction de recherche
  const handleSearch = () => {
    if (!searchCity.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simuler un délai de recherche
    setTimeout(() => {
      let results = [...professionalDatabase];
      
      // Filtrer par spécialité si nécessaire
      if (searchSpecialty !== 'all') {
        results = results.filter(prof => prof.specialty === searchSpecialty);
      }
      
      // Calculer la distance pour chaque professionnel et filtrer par rayon
      results = results.map(prof => ({
        ...prof,
        distance: calculateDistance(searchCity, prof.city)
      })).filter(prof => prof.distance <= searchRadius);
      
      // Trier par distance
      results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  // Réinitialiser la recherche
  const handleReset = () => {
    setSearchCity('');
    setSearchSpecialty('all');
    setSearchRadius(10);
    setSearchResults([]);
    setHasSearched(false);
    setSelectedProfessional(null);
  };

  // Gérer la sélection d'un professionnel
  const handleSelectProfessional = (professional: Professional) => {
    setSelectedProfessional(professional);
  };

  // Fermer les détails d'un professionnel
  const handleCloseDetails = () => {
    setSelectedProfessional(null);
  };

  return (
    <section id="professionals" className={`professional-search-section ${isFullPage ? 'full-page' : ''} dark:bg-gray-900 dark:text-white`}>
      <div className="container">
        {isFullPage && (
          <div className="section-header">
            <h2>Recherche de professionnels de santé en Suisse</h2>
            <button className="close-btn dark:text-gray-300" onClick={onClose}>×</button>
          </div>
        )}
        
        {!isFullPage && (
          <div className="section-header">
            <h2>Trouver un professionnel près de chez vous</h2>
            <p>Localisez des spécialistes de la santé mentale dans votre région</p>
          </div>
        )}
        
        <div className="search-container dark:bg-gray-800">
          <div className="search-form">
            <div className="form-group">
              <label htmlFor="city" className="dark:text-gray-300">Votre ville</label>
              <input 
                type="text" 
                id="city" 
                placeholder="Ex: Genève, Zürich, Lausanne..." 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="specialty" className="dark:text-gray-300">Spécialité</label>
              <select 
                id="specialty" 
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                {specialties.map(specialty => (
                  <option key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="radius" className="dark:text-gray-300">Rayon de recherche: {searchRadius} km</label>
              <input 
                type="range" 
                id="radius" 
                min="5" 
                max="50" 
                step="5"
                value={searchRadius}
                onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                className="dark:bg-gray-700"
              />
            </div>
            
            <div className="search-actions">
              <button 
                className="search-btn dark:bg-indigo-600 dark:hover:bg-indigo-700" 
                onClick={handleSearch}
                disabled={!searchCity.trim() || isLoading}
              >
                {isLoading ? 'Recherche en cours...' : 'Rechercher'}
              </button>
              
              <button 
                className="reset-btn dark:bg-gray-700 dark:hover:bg-gray-600" 
                onClick={handleReset}
              >
                Réinitialiser
              </button>
            </div>
          </div>
          
          {!isFullPage && hasSearched && searchResults.length > 0 && (
            <div className="view-more">
              <button 
                className="view-more-btn dark:bg-gray-700 dark:hover:bg-gray-600" 
                onClick={onViewFullPage}
              >
                Voir tous les résultats
              </button>
            </div>
          )}
        </div>
        
        {hasSearched && (
          <div className="results-container">
            {isLoading ? (
              <div className="loading-indicator dark:text-gray-300">
                <div className="spinner"></div>
                <p>Recherche des professionnels à proximité...</p>
              </div>
            ) : (
              <>
                {searchResults.length === 0 ? (
                  <div className="no-results dark:bg-gray-800">
                    <p>Aucun professionnel trouvé dans cette zone. Essayez d'élargir votre rayon de recherche ou de changer de ville.</p>
                  </div>
                ) : (
                  <div className="results-content">
                    {!selectedProfessional ? (
                      <>
                        <div className="results-header">
                          <h3>{searchResults.length} professionnel(s) trouvé(s) près de {searchCity}</h3>
                        </div>
                        
                        <div className="results-list">
                          {searchResults.slice(0, isFullPage ? searchResults.length : 3).map(professional => (
                            <div 
                              key={professional.id} 
                              className="professional-card dark:bg-gray-800 dark:hover:bg-gray-700"
                              onClick={() => handleSelectProfessional(professional)}
                            >
                              <div className="professional-info">
                                <h4>{professional.name}</h4>
                                <p className="specialty">
                                  {specialties.find(s => s.value === professional.specialty)?.label}
                                </p>
                                <p className="address">{professional.address}, {professional.postalCode} {professional.city}</p>
                                <div className="distance">
                                  <span className="distance-badge dark:bg-gray-700">
                                    {professional.distance} km
                                  </span>
                                </div>
                              </div>
                              <div className="professional-contact">
                                <p className="phone">{professional.phone}</p>
                                <p className="languages">
                                  Langues: {professional.languages.join(', ')}
                                </p>
                                {professional.rating && (
                                  <div className="rating">
                                    <span className="stars">
                                      {'★'.repeat(Math.floor(professional.rating))}
                                      {'☆'.repeat(5 - Math.floor(professional.rating))}
                                    </span>
                                    <span className="rating-value">{professional.rating.toFixed(1)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="professional-details dark:bg-gray-800">
                        <button 
                          className="back-btn dark:bg-gray-700 dark:hover:bg-gray-600" 
                          onClick={handleCloseDetails}
                        >
                          ← Retour aux résultats
                        </button>
                        
                        <div className="details-header">
                          <h3>{selectedProfessional.name}</h3>
                          <p className="specialty">
                            {specialties.find(s => s.value === selectedProfessional.specialty)?.label}
                          </p>
                        </div>
                        
                        <div className="details-content">
                          <div className="details-section">
                            <h4>Coordonnées</h4>
                            <p><strong>Adresse:</strong> {selectedProfessional.address}, {selectedProfessional.postalCode} {selectedProfessional.city}</p>
                            <p><strong>Téléphone:</strong> {selectedProfessional.phone}</p>
                            <p><strong>Email:</strong> {selectedProfessional.email}</p>
                            {selectedProfessional.website && (
                              <p><strong>Site web:</strong> <a href={`https://${selectedProfessional.website}`} target="_blank" rel="noopener noreferrer" className="website-link dark:text-indigo-400">{selectedProfessional.website}</a></p>
                            )}
                            <p><strong>Distance:</strong> {selectedProfessional.distance} km de {searchCity}</p>
                          </div>
                          
                          <div className="details-section">
                            <h4>Informations complémentaires</h4>
                            <p><strong>Langues parlées:</strong> {selectedProfessional.languages.join(', ')}</p>
                            {selectedProfessional.availability && (
                              <p><strong>Disponibilité:</strong> {selectedProfessional.availability}</p>
                            )}
                            {selectedProfessional.rating && (
                              <p>
                                <strong>Évaluation:</strong> 
                                <span className="stars">
                                  {'★'.repeat(Math.floor(selectedProfessional.rating))}
                                  {'☆'.repeat(5 - Math.floor(selectedProfessional.rating))}
                                </span>
                                <span className="rating-value">{selectedProfessional.rating.toFixed(1)}/5</span>
                              </p>
                            )}
                          </div>
                          
                          <div className="details-section">
                            <h4>Prendre rendez-vous</h4>
                            <div className="appointment-options">
                              <a href={`tel:${selectedProfessional.phone.replace(/\s/g, '')}`} className="appointment-btn phone-btn dark:bg-gray-700 dark:hover:bg-gray-600">
                                Appeler
                              </a>
                              <a href={`mailto:${selectedProfessional.email}`} className="appointment-btn email-btn dark:bg-indigo-600 dark:hover:bg-indigo-700">
                                Envoyer un email
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfessionalSearch;
