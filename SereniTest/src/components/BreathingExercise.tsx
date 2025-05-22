import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BreathingExercise.css';
import AudioPlayer from './AudioPlayer';
import { ambientSounds, breathingGuides } from '../utils/audioAssets';

interface BreathingExerciseProps {
  onClose: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [exerciseType, setExerciseType] = useState<'box' | 'relaxation' | '478'>('box');
  const [guidanceVolume, setGuidanceVolume] = useState(50);
  const [backgroundSound, setBackgroundSound] = useState<'none' | 'nature' | 'whitenoise'>('none');
  const [currentVoiceGuide, setCurrentVoiceGuide] = useState<string>('');
  const [playIntro, setPlayIntro] = useState(false);
  const [playComplete, setPlayComplete] = useState(false);
  
  const exerciseConfigs = {
    box: {
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
      totalCycles: 5,
      name: "Respiration carrée",
      description: "Une technique simple et efficace pour calmer l'esprit et réduire l'anxiété."
    },
    relaxation: {
      inhale: 4,
      hold1: 0,
      exhale: 6,
      hold2: 0,
      totalCycles: 10,
      name: "Relaxation profonde",
      description: "Favorise la détente complète du corps et de l'esprit."
    },
    '478': {
      inhale: 4,
      hold1: 7,
      exhale: 8,
      hold2: 0,
      totalCycles: 4,
      name: "Technique 4-7-8",
      description: "Méthode puissante pour induire le calme et faciliter l'endormissement."
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      const config = exerciseConfigs[exerciseType];
      
      timer = setInterval(() => {
        setCount(prevCount => {
          const newCount = prevCount + 1;
          
          // Logique pour changer de phase selon le type d'exercice
          if (phase === 'inhale' && newCount >= config.inhale) {
            if (config.hold1 > 0) {
              setPhase('hold');
              setCurrentVoiceGuide(breathingGuides[exerciseType]?.hold || breathingGuides[exerciseType].inhale);
            } else {
              setPhase('exhale');
              setCurrentVoiceGuide(breathingGuides[exerciseType].exhale);
            }
            return 0;
          } else if (phase === 'hold' && newCount >= config.hold1) {
            setPhase('exhale');
            setCurrentVoiceGuide(breathingGuides[exerciseType].exhale);
            return 0;
          } else if (phase === 'exhale' && newCount >= config.exhale) {
            if (config.hold2 > 0) {
              setPhase('rest');
              setCurrentVoiceGuide(breathingGuides[exerciseType]?.rest || breathingGuides[exerciseType].exhale);
              return 0;
            } else {
              // Fin d'un cycle
              setCycles(prevCycles => {
                const newCycles = prevCycles + 1;
                if (newCycles >= config.totalCycles) {
                  setIsActive(false);
                  setPlayComplete(true);
                  return 0;
                }
                setPhase('inhale');
                setCurrentVoiceGuide(breathingGuides[exerciseType].inhale);
                return newCycles;
              });
              return 0;
            }
          } else if (phase === 'rest' && newCount >= config.hold2) {
            // Fin d'un cycle
            setCycles(prevCycles => {
              const newCycles = prevCycles + 1;
              if (newCycles >= config.totalCycles) {
                setIsActive(false);
                setPlayComplete(true);
                return 0;
              }
              setPhase('inhale');
              setCurrentVoiceGuide(breathingGuides[exerciseType].inhale);
              return newCycles;
            });
            return 0;
          }
          
          return newCount;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [isActive, phase, exerciseType]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(0);
    setCycles(0);
    setPlayIntro(true);
    setCurrentVoiceGuide(breathingGuides[exerciseType].intro);
  };

  const handleStop = () => {
    setIsActive(false);
    setCurrentVoiceGuide('');
  };

  const handleExerciseChange = (type: 'box' | 'relaxation' | '478') => {
    if (!isActive) {
      setExerciseType(type);
    }
  };

  const handleIntroEnd = () => {
    setPlayIntro(false);
    setCurrentVoiceGuide(breathingGuides[exerciseType].inhale);
  };

  const handleCompleteEnd = () => {
    setPlayComplete(false);
    setCurrentVoiceGuide('');
  };

  const config = exerciseConfigs[exerciseType];
  const progress = isActive ? (count / (phase === 'inhale' ? config.inhale : 
                                        phase === 'hold' ? config.hold1 : 
                                        phase === 'exhale' ? config.exhale : config.hold2)) * 100 : 0;

  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: config.inhale, ease: "easeInOut" }
    },
    hold: {
      scale: 1.5,
      transition: { duration: config.hold1, ease: "linear" }
    },
    exhale: {
      scale: 1,
      transition: { duration: config.exhale, ease: "easeInOut" }
    },
    rest: {
      scale: 1,
      transition: { duration: config.hold2, ease: "linear" }
    }
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return "Inspirez lentement...";
      case 'hold': return "Retenez votre souffle...";
      case 'exhale': return "Expirez doucement...";
      case 'rest': return "Pause...";
      default: return "";
    }
  };

  // Déterminer la source audio pour le son d'ambiance
  const ambientSoundSrc = backgroundSound !== 'none' ? ambientSounds[backgroundSound] : '';

  return (
    <div className="breathing-exercise-container dark:bg-gray-800 dark:text-white">
      <div className="breathing-header">
        <h2>Exercice de respiration guidée</h2>
        <button className="close-btn dark:text-gray-300" onClick={onClose}>×</button>
      </div>
      
      <div className="exercise-selection">
        <h3>Choisissez votre technique</h3>
        <div className="exercise-options">
          {Object.entries(exerciseConfigs).map(([key, value]) => (
            <div 
              key={key} 
              className={`exercise-option ${exerciseType === key ? 'selected' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => handleExerciseChange(key as 'box' | 'relaxation' | '478')}
            >
              <h4>{value.name}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="exercise-settings">
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
      
      <div className="breathing-visualization">
        <motion.div 
          className="breathing-circle dark:bg-indigo-600"
          variants={circleVariants}
          animate={isActive ? phase : "rest"}
        />
        
        {isActive && (
          <div className="breathing-instructions">
            <h3>{getInstructions()}</h3>
            <div className="progress-bar">
              <div className="progress-fill dark:bg-indigo-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p>Cycle {cycles + 1} sur {config.totalCycles}</p>
          </div>
        )}
      </div>
      
      <div className="breathing-controls">
        {!isActive ? (
          <button 
            className="start-btn dark:bg-indigo-600 dark:hover:bg-indigo-700" 
            onClick={handleStart}
          >
            Commencer
          </button>
        ) : (
          <button 
            className="stop-btn dark:bg-red-600 dark:hover:bg-red-700" 
            onClick={handleStop}
          >
            Arrêter
          </button>
        )}
      </div>
      
      <div className="breathing-benefits">
        <h3>Bienfaits de la respiration contrôlée</h3>
        <ul>
          <li>Réduit le stress et l'anxiété</li>
          <li>Améliore la concentration</li>
          <li>Favorise un meilleur sommeil</li>
          <li>Renforce le système immunitaire</li>
          <li>Augmente l'énergie et la vitalité</li>
        </ul>
      </div>

      {/* Lecteurs audio */}
      {backgroundSound !== 'none' && (
        <AudioPlayer 
          audioSrc={ambientSoundSrc}
          volume={guidanceVolume}
          isPlaying={isActive || playIntro || playComplete}
          loop={true}
        />
      )}

      {playIntro && (
        <AudioPlayer 
          audioSrc={breathingGuides[exerciseType].intro}
          volume={guidanceVolume}
          isPlaying={playIntro}
          loop={false}
          onEnded={handleIntroEnd}
        />
      )}

      {isActive && currentVoiceGuide && !playIntro && (
        <AudioPlayer 
          audioSrc={currentVoiceGuide}
          volume={guidanceVolume}
          isPlaying={isActive && !playIntro}
          loop={false}
          onEnded={() => {}}
        />
      )}

      {playComplete && (
        <AudioPlayer 
          audioSrc={breathingGuides[exerciseType].complete}
          volume={guidanceVolume}
          isPlaying={playComplete}
          loop={false}
          onEnded={handleCompleteEnd}
        />
      )}
    </div>
  );
};

export default BreathingExercise;
