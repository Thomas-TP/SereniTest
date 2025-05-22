import React, { useState } from 'react';
import './WellnessCenter.css';
import BreathingExercise from './BreathingExercise';
import MeditationGuide from './MeditationGuide';

interface WellnessCenterProps {
  onClose: () => void;
  directAccess?: boolean;
}

const WellnessCenter: React.FC<WellnessCenterProps> = ({ onClose, directAccess = false }) => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'meditation'>('breathing');

  return (
    <div className="wellness-center-container dark:bg-gray-900 dark:text-white">
      <div className="wellness-header">
        <h2>Centre de Bien-être</h2>
        <button className="close-btn dark:text-gray-300" onClick={onClose}>×</button>
      </div>
      
      <div className="wellness-tabs">
        <button 
          className={`tab-btn ${activeTab === 'breathing' ? 'active' : ''} dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white`}
          onClick={() => setActiveTab('breathing')}
        >
          Exercices de Respiration
        </button>
        <button 
          className={`tab-btn ${activeTab === 'meditation' ? 'active' : ''} dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white`}
          onClick={() => setActiveTab('meditation')}
        >
          Méditation Guidée
        </button>
      </div>
      
      <div className="wellness-content">
        {activeTab === 'breathing' ? (
          <BreathingExercise onClose={() => setActiveTab('meditation')} />
        ) : (
          <MeditationGuide onClose={() => setActiveTab('breathing')} />
        )}
      </div>

      {directAccess && (
        <div className="wellness-info-banner dark:bg-indigo-900 dark:text-white">
          <p>Bienvenue dans votre Centre de Bien-être ! Explorez nos exercices de respiration et méditations guidées pour améliorer votre bien-être mental.</p>
        </div>
      )}
    </div>
  );
};

export default WellnessCenter;
