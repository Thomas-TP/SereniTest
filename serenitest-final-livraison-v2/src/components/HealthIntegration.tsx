import React, { useState } from 'react';
import './HealthIntegration.css';

interface HealthIntegrationProps {
  onClose: () => void;
  userData?: any;
}

const HealthIntegration: React.FC<HealthIntegrationProps> = ({ onClose, userData }) => {
  const [activeTab, setActiveTab] = useState<'connect' | 'export'>('connect');
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'pdf'>('json');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'all'>('month');
  const [isExporting, setIsExporting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Applications de bien-être disponibles pour l'intégration
  const availableApps = [
    {
      id: 'googlefit',
      name: 'Google Fit',
      icon: '🏃',
      description: 'Synchronisez vos données de bien-être mental avec votre activité physique.',
      connected: false
    },
    {
      id: 'applehealth',
      name: 'Apple Health',
      icon: '❤️',
      description: 'Intégrez vos données de bien-être mental à votre profil de santé Apple.',
      connected: false
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      icon: '⌚',
      description: 'Combinez vos données de sommeil Fitbit avec votre bien-être mental.',
      connected: false
    },
    {
      id: 'calm',
      name: 'Calm',
      icon: '🧘',
      description: 'Complétez vos séances de méditation Calm avec vos données de bien-être.',
      connected: false
    },
    {
      id: 'headspace',
      name: 'Headspace',
      icon: '🧠',
      description: 'Enrichissez votre expérience Headspace avec vos données de bien-être mental.',
      connected: false
    }
  ];

  const handleAppToggle = (appId: string) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    } else {
      setSelectedApps([...selectedApps, appId]);
    }
  };

  const handleConnect = () => {
    if (selectedApps.length === 0) return;
    
    setIsConnecting(true);
    
    // Simulation d'une connexion API
    setTimeout(() => {
      setIsConnecting(false);
      setSuccessMessage(`Connexion établie avec ${selectedApps.length} application(s).`);
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }, 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulation d'un export de données
    setTimeout(() => {
      setIsExporting(false);
      setSuccessMessage(`Données exportées avec succès au format ${exportFormat.toUpperCase()}.`);
      
      // Création d'un exemple de données à exporter
      const exportData = {
        user: "Utilisateur SereniTest",
        dateRange: dateRange,
        wellbeingScores: [
          { date: "2023-05-15", score: 75 },
          { date: "2023-05-16", score: 78 },
          { date: "2023-05-17", score: 72 }
        ],
        stressLevels: [
          { date: "2023-05-15", level: 45 },
          { date: "2023-05-16", level: 42 },
          { date: "2023-05-17", level: 48 }
        ]
      };
      
      // Dans une implémentation réelle, nous utiliserions ces données pour créer un fichier à télécharger
      console.log("Données exportées:", exportData);
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="health-integration-container dark:bg-gray-800 dark:text-white">
      <div className="integration-header">
        <h2>Intégration avec applications de bien-être</h2>
        <button className="close-btn dark:text-gray-300" onClick={onClose}>×</button>
      </div>
      
      <div className="integration-tabs">
        <button 
          className={`tab-btn ${activeTab === 'connect' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
          onClick={() => setActiveTab('connect')}
        >
          Connecter des applications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'export' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
          onClick={() => setActiveTab('export')}
        >
          Exporter mes données
        </button>
      </div>
      
      {successMessage && (
        <div className="success-message dark:bg-green-800">
          {successMessage}
        </div>
      )}
      
      {activeTab === 'connect' ? (
        <div className="connect-section">
          <p className="section-description">
            Connectez SereniTest à vos applications de bien-être préférées pour une vision plus complète de votre santé.
          </p>
          
          <div className="apps-grid">
            {availableApps.map(app => (
              <div 
                key={app.id}
                className={`app-card ${selectedApps.includes(app.id) ? 'selected' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
                onClick={() => handleAppToggle(app.id)}
              >
                <div className="app-icon">{app.icon}</div>
                <h3>{app.name}</h3>
                <p>{app.description}</p>
                <div className="app-status">
                  {app.connected ? (
                    <span className="status-connected">Connecté</span>
                  ) : (
                    <span className="status-disconnected">Non connecté</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="connect-actions">
            <button 
              className="connect-btn dark:bg-indigo-600 dark:hover:bg-indigo-700"
              onClick={handleConnect}
              disabled={selectedApps.length === 0 || isConnecting}
            >
              {isConnecting ? 'Connexion en cours...' : 'Connecter les applications sélectionnées'}
            </button>
          </div>
          
          <div className="integration-note dark:text-gray-400">
            <p>
              <strong>Note :</strong> Dans une version réelle, cette fonctionnalité nécessiterait une authentification OAuth avec chaque service. 
              Pour cette démonstration, nous simulons simplement la connexion.
            </p>
          </div>
        </div>
      ) : (
        <div className="export-section">
          <p className="section-description">
            Exportez vos données de bien-être mental pour les utiliser dans d'autres applications ou pour vos archives personnelles.
          </p>
          
          <div className="export-options">
            <div className="option-group dark:bg-gray-700">
              <h3>Format d'exportation</h3>
              <div className="radio-options">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="format" 
                    checked={exportFormat === 'json'} 
                    onChange={() => setExportFormat('json')} 
                  />
                  <span>JSON</span>
                  <p className="option-description">Format de données structuré, idéal pour l'importation dans d'autres applications.</p>
                </label>
                
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="format" 
                    checked={exportFormat === 'csv'} 
                    onChange={() => setExportFormat('csv')} 
                  />
                  <span>CSV</span>
                  <p className="option-description">Format tabulaire compatible avec Excel et autres tableurs.</p>
                </label>
                
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="format" 
                    checked={exportFormat === 'pdf'} 
                    onChange={() => setExportFormat('pdf')} 
                  />
                  <span>PDF</span>
                  <p className="option-description">Rapport formaté facile à lire et à partager avec des professionnels.</p>
                </label>
              </div>
            </div>
            
            <div className="option-group dark:bg-gray-700">
              <h3>Période de données</h3>
              <div className="radio-options">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="period" 
                    checked={dateRange === 'week'} 
                    onChange={() => setDateRange('week')} 
                  />
                  <span>Dernière semaine</span>
                </label>
                
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="period" 
                    checked={dateRange === 'month'} 
                    onChange={() => setDateRange('month')} 
                  />
                  <span>Dernier mois</span>
                </label>
                
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="period" 
                    checked={dateRange === 'all'} 
                    onChange={() => setDateRange('all')} 
                  />
                  <span>Toutes les données</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="export-actions">
            <button 
              className="export-btn dark:bg-indigo-600 dark:hover:bg-indigo-700"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? 'Exportation en cours...' : `Exporter au format ${exportFormat.toUpperCase()}`}
            </button>
          </div>
          
          <div className="integration-note dark:text-gray-400">
            <p>
              <strong>Note :</strong> Dans une version réelle, cette fonctionnalité générerait un fichier à télécharger. 
              Pour cette démonstration, nous simulons simplement l'exportation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthIntegration;
