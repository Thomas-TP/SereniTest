import React, { useState, useEffect } from 'react'
import './MentalTest.css'
import { motion, AnimatePresence } from 'framer-motion'

interface MentalTestProps {
  onComplete: (results: any) => void
}

interface Question {
  id: number;
  text: string;
  category: 'general' | 'stress' | 'anxiety' | 'sleep' | 'energy' | 'satisfaction';
  options: { value: number; text: string }[];
  condition?: {
    questionId: number;
    values: number[];
  };
}

const MentalTest: React.FC<MentalTestProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<'general' | 'stress' | 'anxiety' | 'sleep'>('general')
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([])
  const [testStarted, setTestStarted] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)

  // Base de questions étendue avec catégories et conditions
  const allQuestions: Question[] = [
    // Questions générales (toujours posées)
    {
      id: 1,
      category: 'general',
      text: "À quelle fréquence vous sentez-vous dépassé(e) par vos responsabilités quotidiennes ?",
      options: [
        { value: 1, text: "Jamais" },
        { value: 2, text: "Rarement" },
        { value: 3, text: "Parfois" },
        { value: 4, text: "Souvent" },
        { value: 5, text: "Très souvent" }
      ]
    },
    {
      id: 2,
      category: 'sleep',
      text: "Comment évalueriez-vous votre qualité de sommeil au cours du dernier mois ?",
      options: [
        { value: 5, text: "Très mauvaise" },
        { value: 4, text: "Mauvaise" },
        { value: 3, text: "Moyenne" },
        { value: 2, text: "Bonne" },
        { value: 1, text: "Très bonne" }
      ]
    },
    {
      id: 3,
      category: 'anxiety',
      text: "À quelle fréquence ressentez-vous de l'anxiété ou de l'inquiétude ?",
      options: [
        { value: 1, text: "Jamais" },
        { value: 2, text: "Rarement" },
        { value: 3, text: "Parfois" },
        { value: 4, text: "Souvent" },
        { value: 5, text: "Très souvent" }
      ]
    },
    
    // Questions de base (toujours posées)
    {
      id: 4,
      category: 'stress',
      text: "Dans quelle mesure vous sentez-vous capable de gérer votre stress ?",
      options: [
        { value: 1, text: "Très capable" },
        { value: 2, text: "Capable" },
        { value: 3, text: "Moyennement capable" },
        { value: 4, text: "Peu capable" },
        { value: 5, text: "Pas du tout capable" }
      ]
    },
    
    // Questions conditionnelles pour le stress
    {
      id: 5,
      category: 'stress',
      text: "Quelles situations déclenchent le plus souvent votre stress ?",
      condition: { questionId: 4, values: [3, 4, 5] },
      options: [
        { value: 3, text: "Situations professionnelles" },
        { value: 3, text: "Relations personnelles" },
        { value: 3, text: "Finances" },
        { value: 3, text: "Santé" },
        { value: 3, text: "Autre" }
      ]
    },
    {
      id: 6,
      category: 'stress',
      text: "Comment votre corps réagit-il au stress ? (Symptôme principal)",
      condition: { questionId: 4, values: [3, 4, 5] },
      options: [
        { value: 3, text: "Tensions musculaires" },
        { value: 4, text: "Maux de tête" },
        { value: 4, text: "Problèmes digestifs" },
        { value: 5, text: "Palpitations cardiaques" },
        { value: 3, text: "Fatigue extrême" }
      ]
    },
    
    // Questions conditionnelles pour l'anxiété
    {
      id: 7,
      category: 'anxiety',
      text: "Votre anxiété est-elle liée à des situations spécifiques ou généralisée ?",
      condition: { questionId: 3, values: [3, 4, 5] },
      options: [
        { value: 2, text: "Situations très spécifiques uniquement" },
        { value: 3, text: "Quelques situations spécifiques" },
        { value: 4, text: "Plusieurs domaines de ma vie" },
        { value: 5, text: "Généralisée à la plupart des situations" }
      ]
    },
    {
      id: 8,
      category: 'anxiety',
      text: "Avez-vous déjà eu des attaques de panique ?",
      condition: { questionId: 3, values: [3, 4, 5] },
      options: [
        { value: 1, text: "Jamais" },
        { value: 3, text: "Une ou deux fois dans ma vie" },
        { value: 4, text: "Occasionnellement" },
        { value: 5, text: "Régulièrement" }
      ]
    },
    
    // Questions conditionnelles pour le sommeil
    {
      id: 9,
      category: 'sleep',
      text: "Quel est votre principal problème de sommeil ?",
      condition: { questionId: 2, values: [3, 4, 5] },
      options: [
        { value: 3, text: "Difficulté à s'endormir" },
        { value: 4, text: "Réveils nocturnes fréquents" },
        { value: 3, text: "Réveil trop matinal" },
        { value: 5, text: "Sommeil non réparateur" },
        { value: 2, text: "Horaires de sommeil irréguliers" }
      ]
    },
    {
      id: 10,
      category: 'sleep',
      text: "Utilisez-vous des écrans (téléphone, ordinateur, TV) dans l'heure précédant le coucher ?",
      condition: { questionId: 2, values: [3, 4, 5] },
      options: [
        { value: 1, text: "Jamais" },
        { value: 2, text: "Rarement" },
        { value: 3, text: "Parfois" },
        { value: 4, text: "Souvent" },
        { value: 5, text: "Systématiquement" }
      ]
    },
    
    // Questions générales (toujours posées)
    {
      id: 11,
      category: 'energy',
      text: "Comment évalueriez-vous votre niveau d'énergie général ?",
      options: [
        { value: 1, text: "Très élevé" },
        { value: 2, text: "Élevé" },
        { value: 3, text: "Moyen" },
        { value: 4, text: "Bas" },
        { value: 5, text: "Très bas" }
      ]
    },
    {
      id: 12,
      category: 'general',
      text: "À quelle fréquence vous sentez-vous irritable ou de mauvaise humeur ?",
      options: [
        { value: 1, text: "Jamais" },
        { value: 2, text: "Rarement" },
        { value: 3, text: "Parfois" },
        { value: 4, text: "Souvent" },
        { value: 5, text: "Très souvent" }
      ]
    },
    {
      id: 13,
      category: 'satisfaction',
      text: "Dans quelle mesure vous sentez-vous satisfait(e) de votre vie actuelle ?",
      options: [
        { value: 1, text: "Très satisfait(e)" },
        { value: 2, text: "Satisfait(e)" },
        { value: 3, text: "Ni satisfait(e) ni insatisfait(e)" },
        { value: 4, text: "Insatisfait(e)" },
        { value: 5, text: "Très insatisfait(e)" }
      ]
    },
    
    // Questions conditionnelles pour l'énergie
    {
      id: 14,
      category: 'energy',
      text: "Votre fatigue s'améliore-t-elle après une bonne nuit de sommeil ?",
      condition: { questionId: 11, values: [3, 4, 5] },
      options: [
        { value: 1, text: "Oui, complètement" },
        { value: 2, text: "Oui, partiellement" },
        { value: 3, text: "Pas vraiment" },
        { value: 5, text: "Pas du tout" }
      ]
    },
    {
      id: 15,
      category: 'energy',
      text: "Avez-vous remarqué une baisse de motivation pour des activités que vous aimiez auparavant ?",
      condition: { questionId: 11, values: [3, 4, 5] },
      options: [
        { value: 1, text: "Pas du tout" },
        { value: 2, text: "Légèrement" },
        { value: 3, text: "Modérément" },
        { value: 4, text: "Considérablement" },
        { value: 5, text: "Complètement" }
      ]
    }
  ];

  // Profils prédéfinis pour le questionnaire
  const profiles = [
    {
      id: 'general',
      name: 'Évaluation générale',
      description: 'Une évaluation complète de votre bien-être mental global.',
      icon: '🧠'
    },
    {
      id: 'stress',
      name: 'Gestion du stress',
      description: 'Concentré sur votre niveau de stress et vos mécanismes d\'adaptation.',
      icon: '😓'
    },
    {
      id: 'anxiety',
      name: 'Anxiété',
      description: 'Évalue spécifiquement vos niveaux d\'anxiété et leurs impacts.',
      icon: '😰'
    },
    {
      id: 'sleep',
      name: 'Qualité du sommeil',
      description: 'Analyse vos habitudes de sommeil et leur influence sur votre bien-être.',
      icon: '😴'
    }
  ];

  // Déterminer les questions actives en fonction des réponses précédentes
  useEffect(() => {
    if (!testStarted) return;
    
    let questions: Question[] = [];
    
    // Ajouter les questions de base selon le profil sélectionné
    if (userProfile === 'general') {
      // Pour le profil général, inclure toutes les questions de base
      questions = allQuestions.filter(q => !q.condition);
    } else {
      // Pour les profils spécifiques, inclure les questions générales et celles de la catégorie
      questions = allQuestions.filter(q => 
        !q.condition && (q.category === 'general' || q.category === userProfile)
      );
    }
    
    // Ajouter les questions conditionnelles si les conditions sont remplies
    allQuestions.forEach(question => {
      if (question.condition) {
        const { questionId, values } = question.condition;
        if (
          answers[questionId] !== undefined && 
          values.includes(answers[questionId]) &&
          (userProfile === 'general' || question.category === userProfile)
        ) {
          questions.push(question);
        }
      }
    });
    
    // Trier les questions par ID pour maintenir l'ordre
    questions.sort((a, b) => a.id - b.id);
    
    setActiveQuestions(questions);
  }, [answers, userProfile, testStarted]);

  const handleProfileSelect = (profileId) => {
    setSelectedProfile(profileId);
  };

  const startTest = () => {
    if (!selectedProfile) return;
    
    setUserProfile(selectedProfile as any);
    setTestStarted(true);
    setCurrentStep(1);
    setAnswers({});
  };

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleNext = () => {
    if (currentStep < activeQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculer les résultats
      setLoading(true);
      setTimeout(() => {
        // Calculer le score total en fonction des réponses
        const answerValues = Object.values(answers) as number[];
        const totalScore = answerValues.reduce((sum, val) => sum + val, 0);
        const maxScore = activeQuestions.length * 5;
        
        const stressScore = Math.round((totalScore / maxScore) * 100);
        const wellbeingScore = 100 - stressScore;
        
        // Calculer des scores spécifiques pour chaque catégorie
        const calculateCategoryScore = (category) => {
          const categoryQuestions = activeQuestions.filter(q => q.category === category);
          if (categoryQuestions.length === 0) return 50; // Valeur par défaut
          
          let categoryScore = 0;
          let questionCount = 0;
          
          categoryQuestions.forEach(q => {
            if (answers[q.id] !== undefined) {
              categoryScore += answers[q.id];
              questionCount++;
            }
          });
          
          return questionCount > 0 
            ? Math.round((categoryScore / (questionCount * 5)) * 100) 
            : 50;
        };
        
        const results = {
          stress: calculateCategoryScore('stress'),
          wellbeing: wellbeingScore,
          anxiety: calculateCategoryScore('anxiety'),
          sleep: calculateCategoryScore('sleep'),
          energy: calculateCategoryScore('energy'),
          satisfaction: calculateCategoryScore('satisfaction'),
          profile: userProfile,
          recommendations: getRecommendations(stressScore, userProfile)
        };
        
        setLoading(false);
        onComplete(results);
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendations = (stressScore, profile) => {
    // Recommandations de base selon le niveau de stress
    let baseRecommendations = [];
    
    if (stressScore >= 80) {
      baseRecommendations = [
        "Consultez un professionnel de la santé mentale dès que possible",
        "Pratiquez des exercices de respiration profonde quotidiennement",
        "Réduisez votre charge de travail si possible",
        "Accordez-vous des moments de détente chaque jour"
      ];
    } else if (stressScore >= 60) {
      baseRecommendations = [
        "Intégrez une pratique régulière de méditation",
        "Améliorez votre hygiène de sommeil",
        "Pratiquez une activité physique modérée 3 fois par semaine",
        "Limitez votre consommation de caféine et d'alcool"
      ];
    } else if (stressScore >= 40) {
      baseRecommendations = [
        "Maintenez une activité physique régulière",
        "Pratiquez la pleine conscience au quotidien",
        "Entretenez vos relations sociales positives",
        "Adoptez une alimentation équilibrée"
      ];
    } else {
      baseRecommendations = [
        "Continuez vos bonnes pratiques de gestion du stress",
        "Partagez vos stratégies avec votre entourage",
        "Restez attentif à votre équilibre vie professionnelle/personnelle",
        "Célébrez vos réussites et votre bien-être"
      ];
    }
    
    // Recommandations spécifiques selon le profil
    let profileRecommendations = [];
    
    switch (profile) {
      case 'stress':
        profileRecommendations = [
          "Essayez la technique de respiration 4-7-8 pour calmer rapidement votre système nerveux",
          "Identifiez vos déclencheurs de stress et élaborez des stratégies spécifiques",
          "Pratiquez des activités qui vous procurent de la joie régulièrement"
        ];
        break;
      case 'anxiety':
        profileRecommendations = [
          "Tenez un journal d'anxiété pour identifier les schémas et déclencheurs",
          "Pratiquez des exercices de respiration abdominale lors des moments d'anxiété",
          "Essayez la méditation guidée spécifique à l'anxiété dans notre Centre de Bien-être"
        ];
        break;
      case 'sleep':
        profileRecommendations = [
          "Établissez une routine de sommeil régulière, même les week-ends",
          "Évitez les écrans au moins une heure avant le coucher",
          "Créez un environnement de sommeil optimal : frais, sombre et calme",
          "Essayez notre exercice de relaxation progressive avant de vous coucher"
        ];
        break;
      default:
        profileRecommendations = [
          "Équilibrez votre temps entre travail, relations sociales et loisirs",
          "Pratiquez la gratitude quotidiennement",
          "Explorez différentes techniques de bien-être dans notre Centre de Bien-être"
        ];
    }
    
    // Combiner les recommandations
    return [...baseRecommendations, ...profileRecommendations];
  };

  // Si le test n'a pas encore commencé, afficher la sélection de profil
  if (!testStarted) {
    return (
      <section className="mental-test-section section dark:bg-gray-900 dark:text-white">
        <div className="container">
          <div className="mental-test-header">
            <h2>Test de bien-être mental personnalisé</h2>
            <p>Choisissez le type d'évaluation qui correspond le mieux à vos besoins actuels.</p>
          </div>
          
          <div className="profile-selection">
            {profiles.map(profile => (
              <div 
                key={profile.id}
                className={`profile-card ${selectedProfile === profile.id ? 'selected' : ''} dark:bg-gray-800 dark:hover:bg-gray-700`}
                onClick={() => handleProfileSelect(profile.id)}
              >
                <div className="profile-icon">{profile.icon}</div>
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
              </div>
            ))}
          </div>
          
          <div className="test-start-action">
            <button 
              className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700"
              onClick={startTest}
              disabled={!selectedProfile}
            >
              Commencer le test
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Si le test est en cours
  const currentQuestion = activeQuestions[currentStep - 1];
  const isAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;

  return (
    <section className="mental-test-section section dark:bg-gray-900 dark:text-white">
      <div className="container">
        <div className="mental-test-header">
          <h2>Test de bien-être mental</h2>
          <p>Répondez honnêtement aux questions suivantes pour évaluer votre niveau de bien-être mental.</p>
        </div>
        
        {loading ? (
          <div className="loading-container dark:bg-gray-800">
            <div className="loading-spinner"></div>
            <p>Analyse de vos réponses en cours...</p>
          </div>
        ) : (
          <div className="test-container dark:bg-gray-800">
            <div className="progress-container">
              <div className="progress-bar dark:bg-gray-700">
                <div 
                  className="progress-fill dark:bg-indigo-600" 
                  style={{ width: `${(currentStep / activeQuestions.length) * 100}%` }}
                ></div>
              </div>
              <p className="progress-text">Question {currentStep} sur {activeQuestions.length}</p>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                className="question-container"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Question {currentStep}</h3>
                <p className="question-text">{currentQuestion?.text}</p>
                
                <div className="options-container">
                  {currentQuestion?.options.map((option) => (
                    <div 
                      key={option.value}
                      className={`option ${answers[currentQuestion.id] === option.value ? 'selected' : ''} dark:bg-gray-700 dark:hover:bg-gray-600`}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    >
                      {option.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="test-navigation">
              {currentStep > 1 && (
                <button 
                  className="btn btn-secondary dark:bg-gray-700 dark:hover:bg-gray-600" 
                  onClick={handlePrevious}
                >
                  Précédent
                </button>
              )}
              <button 
                className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700" 
                onClick={handleNext}
                disabled={!isAnswered}
              >
                {currentStep === activeQuestions.length ? 'Terminer le test' : 'Suivant'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MentalTest;
