import React, { useState, useEffect, useRef } from 'react';
import './MeditationGuide.css';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';
import { ambientSounds, meditationGuides } from '../utils/audioAssets';

interface MeditationGuideProps {
  onClose: () => void;
}

const MeditationGuide: React.FC<MeditationGuideProps> = ({ onClose }) => {
  const [selectedMeditation, setSelectedMeditation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5); // durée en minutes
  const [progress, setProgress] = useState(0);
  const [backgroundSound, setBackgroundSound] = useState<'none' | 'nature' | 'whitenoise'>('none');
  const [guidanceVolume, setGuidanceVolume] = useState(50);
  
  // Référence pour stocker l'intervalle de progression
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const meditations = [
    {
      id: 'mindfulness',
      title: 'Pleine conscience',
      description: 'Concentrez-vous sur le moment présent et observez vos pensées sans jugement.',
      benefits: ['Réduit l\'anxiété', 'Améliore la concentration', 'Développe la conscience de soi']
    },
    {
      id: 'bodyscan',
      title: 'Scan corporel',
      description: 'Portez progressivement votre attention sur chaque partie de votre corps pour une relaxation profonde.',
      benefits: ['Soulage les tensions physiques', 'Améliore la conscience corporelle', 'Favorise le sommeil']
    },
    {
      id: 'loving',
      title: 'Bienveillance aimante',
      description: 'Cultivez des sentiments de compassion et d\'amour envers vous-même et les autres.',
      benefits: ['Développe l\'empathie', 'Réduit les émotions négatives', 'Améliore les relations']
    },
    {
      id: 'visualization',
      title: 'Visualisation positive',
      description: 'Imaginez un lieu ou une situation paisible pour calmer l\'esprit et réduire le stress.',
      benefits: ['Réduit le stress', 'Stimule la créativité', 'Renforce la confiance en soi']
    }
  ];

  // Nettoyer l'intervalle lors du démontage du composant
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    if (!selectedMeditation) return;
    
    setIsPlaying(true);
    setProgress(0);
    
    // Simuler la progression
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration * 60));
        if (newProgress >= 100) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          setIsPlaying(false);
          return 100;
        }
        return newProgress;
      });
    }, 1000);
  };

  const handleStop = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setIsPlaying(false);
    setProgress(0);
  };

  const getSelectedMeditation = () => {
    return meditations.find(m => m.id === selectedMeditation);
  };

  // Déterminer la source audio pour le son d'ambiance
  const ambientSoundSrc = backgroundSound !== 'none' ? ambientSounds[backgroundSound] : '';
  
  // Déterminer la source audio pour le guide de méditation
  const meditationGuideSrc = selectedMeditation ? meditationGuides[selectedMeditation as keyof typeof meditationGuides] : '';

  return (
    <div className="meditation-guide-container dark:bg-gray-800 dark:text-white">
      <div className="meditation-header">
        <h2>Guide de Méditation</h2>
        <button className="close-btn dark:text-gray-300" onClick={onClose}>×</button>
      </div>
      
      {!isPlaying ? (
        <>
          <div className="meditation-selection">
            <h3>Choisissez votre type de méditation</h3>
            <div className="meditation-options">
              {meditations.map(meditation => (
                <div 
                  key={meditation.id}
                  className={`meditation-option ${selectedMeditation === meditation.id ? 'selected' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
                  onClick={() => setSelectedMeditation(meditation.id)}
                >
                  <h4>{meditation.title}</h4>
                  <p>{meditation.description}</p>
                  <div className="benefits">
                    {meditation.benefits.map((benefit, index) => (
                      <span key={index} className="benefit-tag dark:bg-indigo-900 dark:text-indigo-200">{benefit}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="meditation-settings">
            <div className="setting">
              <label>Durée (minutes)</label>
              <div className="duration-selector">
                {[5, 10, 15, 20, 30].map(min => (
                  <button 
                    key={min}
                    className={`duration-btn ${duration === min ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
                    onClick={() => setDuration(min)}
                  >
                    {min}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="setting">
              <label>Volume du guide vocal</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={guidanceVolume} 
                onChange={(e) => setGuidanceVolume(parseInt(e.target.value))}
                className="dark:bg-gray-700"
              />
              <div className="volume-indicator">
                <span className={guidanceVolume === 0 ? 'active' : ''}>🔇</span>
                <span className={guidanceVolume > 0 && guidanceVolume < 50 ? 'active' : ''}>🔉</span>
                <span className={guidanceVolume >= 50 ? 'active' : ''}>🔊</span>
              </div>
            </div>
            
            <div className="setting">
              <label>Son d'ambiance</label>
              <select 
                value={backgroundSound}
                onChange={(e) => setBackgroundSound(e.target.value as 'none' | 'nature' | 'whitenoise')}
                className="dark:bg-gray-700 dark:text-white"
              >
                <option value="none">Aucun</option>
                <option value="nature">Sons de la nature</option>
                <option value="whitenoise">Bruit blanc</option>
              </select>
            </div>
          </div>
          
          <div className="meditation-start">
            <button 
              className="start-btn dark:bg-indigo-600 dark:hover:bg-indigo-700"
              onClick={handleStart}
              disabled={!selectedMeditation}
            >
              Commencer la méditation
            </button>
          </div>
          
          <div className="meditation-tips">
            <h3>Conseils pour une méditation efficace</h3>
            <ul>
              <li>Trouvez un endroit calme et confortable</li>
              <li>Adoptez une posture détendue mais alerte</li>
              <li>Concentrez-vous sur votre respiration</li>
              <li>Accueillez vos pensées sans jugement</li>
              <li>Soyez patient et bienveillant envers vous-même</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="meditation-session">
          <h3>{getSelectedMeditation()?.title}</h3>
          
          <div className="meditation-animation">
            <motion.div 
              className="meditation-circle dark:bg-indigo-600"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="meditation-progress">
            <div className="progress-bar">
              <div className="progress-fill dark:bg-indigo-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p>Temps restant: {Math.ceil((duration * 60) * (1 - progress / 100))} secondes</p>
          </div>
          
          <div className="meditation-controls">
            <button 
              className="stop-btn dark:bg-red-600 dark:hover:bg-red-700"
              onClick={handleStop}
            >
              Terminer la méditation
            </button>
          </div>
          
          <div className="meditation-guidance">
            <p className="guidance-text">
              {selectedMeditation === 'mindfulness' && "Respirez profondément. Observez vos pensées comme des nuages qui passent dans le ciel."}
              {selectedMeditation === 'bodyscan' && "Portez votre attention sur chaque partie de votre corps, en commençant par vos orteils."}
              {selectedMeditation === 'loving' && "Répétez mentalement: 'Que je sois heureux, en bonne santé et en paix.'"}
              {selectedMeditation === 'visualization' && "Imaginez un lieu paisible où vous vous sentez en sécurité et détendu."}
            </p>
          </div>
        </div>
      )}

      {/* Lecteurs audio */}
      {backgroundSound !== 'none' && (
        <AudioPlayer 
          audioSrc={ambientSoundSrc}
          volume={guidanceVolume}
          isPlaying={isPlaying}
          loop={true}
        />
      )}

      {isPlaying && selectedMeditation && (
        <AudioPlayer 
          audioSrc={meditationGuideSrc}
          volume={guidanceVolume}
          isPlaying={isPlaying}
          loop={false}
          onEnded={() => {
            // Arrêter automatiquement à la fin du guide vocal
            setTimeout(() => {
              handleStop();
            }, 2000);
          }}
        />
      )}
    </div>
  );
};

export default MeditationGuide;
