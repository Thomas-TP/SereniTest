import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import './TrendsAnalysis.css';

interface TrendsAnalysisProps {
  onClose: () => void;
  initialData?: any;
}

// Données fictives pour la démonstration
const generateMockData = () => {
  const today = new Date();
  const data = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Générer des valeurs qui montrent une tendance d'amélioration
    const wellbeingBase = 50 + (i < 15 ? i : 15) + Math.random() * 10;
    const stressBase = 100 - wellbeingBase + Math.random() * 5;
    const anxietyBase = Math.max(30, stressBase - 10 - Math.random() * 15);
    const sleepBase = wellbeingBase - 10 + Math.random() * 20;
    const energyBase = wellbeingBase - 5 + Math.random() * 15;
    
    data.push({
      date: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
      timestamp: date.getTime(),
      wellbeing: Math.round(wellbeingBase),
      stress: Math.round(stressBase),
      anxiety: Math.round(anxietyBase),
      sleep: Math.round(sleepBase),
      energy: Math.round(energyBase),
      satisfaction: Math.round(wellbeingBase + Math.random() * 10)
    });
  }
  
  return data;
};

const TrendsAnalysis: React.FC<TrendsAnalysisProps> = ({ onClose, initialData }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');
  const [focusMetric, setFocusMetric] = useState<'wellbeing' | 'stress' | 'anxiety' | 'sleep' | 'energy' | 'satisfaction'>('wellbeing');
  
  // Utiliser les données initiales ou générer des données fictives
  const allData = initialData || generateMockData();
  
  // Filtrer les données selon la plage de temps sélectionnée
  const getFilteredData = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (timeRange === 'week') {
      return allData.filter(item => (now - item.timestamp) <= 7 * oneDay);
    } else if (timeRange === 'month') {
      return allData.filter(item => (now - item.timestamp) <= 30 * oneDay);
    }
    return allData;
  };
  
  const data = getFilteredData();
  
  // Calculer les statistiques
  const calculateStats = () => {
    if (data.length === 0) return { avg: 0, min: 0, max: 0, trend: 'stable' };
    
    const values = data.map(item => item[focusMetric]);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Calculer la tendance (en comparant la première et la dernière moitié des données)
    const midpoint = Math.floor(values.length / 2);
    const firstHalf = values.slice(0, midpoint);
    const secondHalf = values.slice(midpoint);
    
    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    let trend = 'stable';
    const threshold = 5;
    
    if (secondAvg - firstAvg > threshold) {
      trend = 'improving';
    } else if (firstAvg - secondAvg > threshold) {
      trend = 'declining';
    }
    
    return { avg: Math.round(avg), min, max, trend };
  };
  
  const stats = calculateStats();
  
  // Données pour le graphique en camembert des facteurs
  const pieData = [
    { name: 'Bien-être', value: data.length > 0 ? data[data.length - 1].wellbeing : 0, color: '#4FBFB9' },
    { name: 'Stress', value: data.length > 0 ? data[data.length - 1].stress : 0, color: '#FF6B6B' },
    { name: 'Anxiété', value: data.length > 0 ? data[data.length - 1].anxiety : 0, color: '#FFD166' },
    { name: 'Sommeil', value: data.length > 0 ? data[data.length - 1].sleep : 0, color: '#8A85FF' },
    { name: 'Énergie', value: data.length > 0 ? data[data.length - 1].energy : 0, color: '#6BCB77' }
  ];
  
  // Obtenir des recommandations basées sur les tendances
  const getRecommendations = () => {
    const latestData = data.length > 0 ? data[data.length - 1] : null;
    if (!latestData) return [];
    
    const recommendations = [];
    
    if (stats.trend === 'improving') {
      recommendations.push("Continuez vos bonnes pratiques actuelles, elles portent leurs fruits !");
    } else if (stats.trend === 'declining') {
      recommendations.push("Votre bien-être semble diminuer. Essayez d'identifier ce qui a changé récemment.");
    }
    
    if (latestData.sleep < 60) {
      recommendations.push("Votre qualité de sommeil pourrait être améliorée. Essayez notre exercice de respiration 4-7-8 avant de vous coucher.");
    }
    
    if (latestData.stress > 60) {
      recommendations.push("Votre niveau de stress est élevé. Prenez 10 minutes par jour pour pratiquer la méditation de pleine conscience.");
    }
    
    if (latestData.energy < 50) {
      recommendations.push("Votre niveau d'énergie est bas. Essayez de faire une courte marche quotidienne et de maintenir une hydratation adéquate.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Votre bien-être mental semble équilibré. Continuez à prendre soin de vous !");
    }
    
    return recommendations;
  };
  
  const recommendations = getRecommendations();
  
  // Couleurs pour les différentes métriques
  const metricColors = {
    wellbeing: '#4FBFB9',
    stress: '#FF6B6B',
    anxiety: '#FFD166',
    sleep: '#8A85FF',
    energy: '#6BCB77',
    satisfaction: '#F86624'
  };
  
  // Noms d'affichage pour les métriques
  const metricNames = {
    wellbeing: 'Bien-être',
    stress: 'Stress',
    anxiety: 'Anxiété',
    sleep: 'Sommeil',
    energy: 'Énergie',
    satisfaction: 'Satisfaction'
  };
  
  // Rendu du graphique selon le type sélectionné
  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`color${focusMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricColors[focusMetric]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={metricColors[focusMetric]} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 32, 44, 0.8)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey={focusMetric} 
                stroke={metricColors[focusMetric]} 
                fillOpacity={1} 
                fill={`url(#color${focusMetric})`} 
                name={metricNames[focusMetric]}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 32, 44, 0.8)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }} 
              />
              <Bar 
                dataKey={focusMetric} 
                fill={metricColors[focusMetric]} 
                name={metricNames[focusMetric]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default: // 'line'
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 32, 44, 0.8)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey={focusMetric} 
                stroke={metricColors[focusMetric]} 
                strokeWidth={2}
                dot={{ r: 4, fill: metricColors[focusMetric] }}
                activeDot={{ r: 6 }}
                name={metricNames[focusMetric]}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };
  
  return (
    <div className="trends-analysis-container dark:bg-gray-800 dark:text-white">
      <div className="trends-header">
        <h2>Analyse des Tendances</h2>
        <button className="close-btn dark:text-gray-300" onClick={onClose}>×</button>
      </div>
      
      <div className="trends-controls">
        <div className="control-group">
          <label>Période</label>
          <div className="button-group">
            <button 
              className={`control-btn ${timeRange === 'week' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => setTimeRange('week')}
            >
              Semaine
            </button>
            <button 
              className={`control-btn ${timeRange === 'month' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => setTimeRange('month')}
            >
              Mois
            </button>
            <button 
              className={`control-btn ${timeRange === 'all' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => setTimeRange('all')}
            >
              Tout
            </button>
          </div>
        </div>
        
        <div className="control-group">
          <label>Type de graphique</label>
          <div className="button-group">
            <button 
              className={`control-btn ${chartType === 'line' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => setChartType('line')}
            >
              Ligne
            </button>
            <button 
              className={`control-btn ${chartType === 'area' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => setChartType('area')}
            >
              Aire
            </button>
            <button 
              className={`control-btn ${chartType === 'bar' ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => setChartType('bar')}
            >
              Barres
            </button>
          </div>
        </div>
        
        <div className="control-group">
          <label>Métrique</label>
          <div className="button-group metrics">
            {Object.entries(metricNames).map(([key, name]) => (
              <button 
                key={key}
                className={`control-btn metric-btn ${focusMetric === key ? 'active' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
                onClick={() => setFocusMetric(key as any)}
                style={{ 
                  borderColor: focusMetric === key ? metricColors[key as keyof typeof metricColors] : 'transparent',
                  color: focusMetric === key ? metricColors[key as keyof typeof metricColors] : 'inherit'
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="chart-container dark:bg-gray-900">
        {renderChart()}
      </div>
      
      <div className="trends-stats">
        <div className="stat-card dark:bg-gray-700">
          <h3>Moyenne</h3>
          <div className="stat-value">{stats.avg}%</div>
          <p>Moyenne de {metricNames[focusMetric].toLowerCase()} sur la période</p>
        </div>
        
        <div className="stat-card dark:bg-gray-700">
          <h3>Min / Max</h3>
          <div className="stat-value">{stats.min}% / {stats.max}%</div>
          <p>Valeurs minimale et maximale sur la période</p>
        </div>
        
        <div className="stat-card dark:bg-gray-700">
          <h3>Tendance</h3>
          <div className={`stat-value trend-${stats.trend}`}>
            {stats.trend === 'improving' ? '↗️ En amélioration' : 
             stats.trend === 'declining' ? '↘️ En déclin' : '→ Stable'}
          </div>
          <p>Évolution générale sur la période</p>
        </div>
      </div>
      
      <div className="trends-insights">
        <div className="insights-section dark:bg-gray-900">
          <h3>Répartition actuelle des facteurs</h3>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 32, 44, 0.8)', 
                    border: 'none',
                    borderRadius: '8px',
                    color: '#E2E8F0'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="insights-section dark:bg-gray-900">
          <h3>Recommandations personnalisées</h3>
          <ul className="recommendations-list">
            {recommendations.map((rec, index) => (
              <li key={index} className="recommendation-item dark:bg-gray-700">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="trends-footer">
        <p className="trends-note dark:text-gray-400">
          Note: Ces analyses sont basées sur vos résultats de tests précédents. Plus vous utilisez l'application régulièrement, plus les analyses seront précises.
        </p>
      </div>
    </div>
  );
};

export default TrendsAnalysis;
