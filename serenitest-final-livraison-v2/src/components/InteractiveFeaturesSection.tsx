import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import sereniTestLogo from '../assets/serenitest-logo-simple.png';
import dashboardIllustration from '../assets/serenitest-dashboard-illustration.png';
import personasIllustration from '../assets/serenitest-personas-illustration.png';
import featuresIllustration from '../assets/serenitest-features-illustration.png';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Composant pour le dashboard interactif
const InteractiveDashboard: React.FC = () => {
  const [wellBeingScore, setWellBeingScore] = useState(76);
  const [showDetails, setShowDetails] = useState(false);
  
  // Animation du score de bien-être
  useEffect(() => {
    const interval = setInterval(() => {
      setWellBeingScore(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 à +2
        const newScore = Math.max(0, Math.min(100, prev + change));
        return newScore;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-neutral-dark mb-4">Tableau de bord SereniTest</h3>
          <p className="text-neutral-dark/80 mb-4">
            Visualisez votre bien-être mental en temps réel et recevez des recommandations personnalisées pour améliorer votre quotidien.
          </p>
          <motion.button
            className="btn btn-primary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(79, 191, 185, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Masquer les détails" : "Explorer le dashboard"}
          </motion.button>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <motion.img 
            src={dashboardIllustration} 
            alt="Dashboard SereniTest" 
            className="w-full max-w-md rounded-lg shadow-md"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-neutral-dark mb-2">Score de bien-être</h4>
                <div className="relative h-40 flex items-center justify-center">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#E1E5EB" 
                      strokeWidth="10" 
                    />
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#4FBFB9" 
                      strokeWidth="10" 
                      strokeDasharray="283"
                      strokeDashoffset={283 - (wellBeingScore / 100) * 283}
                      transition={{ duration: 1 }}
                    />
                  </svg>
                  <motion.div 
                    className="absolute text-3xl font-bold text-primary-teal"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {wellBeingScore}%
                  </motion.div>
                </div>
              </div>
              
              <div className="bg-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-neutral-dark mb-2">Tendance hebdomadaire</h4>
                <div className="h-40 flex items-end justify-between px-2">
                  {[65, 70, 60, 75, 68, 72, wellBeingScore].map((value, index) => (
                    <motion.div 
                      key={index}
                      className="w-3 bg-primary-purple rounded-t"
                      style={{ height: `${value * 0.4}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${value * 0.4}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-neutral-dark mb-2">Recommandations</h4>
                <div className="h-40 overflow-y-auto">
                  {[
                    "Méditation guidée (5 min)",
                    "Pause déconnexion",
                    "Exercice de respiration",
                    "Journal de gratitude",
                    wellBeingScore < 70 ? "Consultation avec un expert" : "Partager vos progrès"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-teal mr-2"></div>
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary-teal/10 rounded-lg">
              <h4 className="font-medium text-neutral-dark mb-2">Analyse personnalisée</h4>
              <p className="text-neutral-dark/80">
                Votre niveau de bien-être est {wellBeingScore >= 75 ? "excellent" : wellBeingScore >= 60 ? "bon" : "à surveiller"}. 
                {wellBeingScore >= 75 
                  ? " Continuez vos bonnes pratiques quotidiennes et n'hésitez pas à partager vos techniques avec votre entourage." 
                  : wellBeingScore >= 60 
                    ? " Nous vous recommandons de prendre quelques minutes chaque jour pour pratiquer la pleine conscience." 
                    : " Nous vous suggérons de prendre du temps pour vous et d'essayer nos exercices de respiration guidée."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Composant pour l'onboarding interactif
const OnboardingDemo: React.FC = () => {
  const [step, setStep] = useState(1);
  const maxSteps = 3;
  
  const nextStep = () => {
    if (step < maxSteps) {
      setStep(step + 1);
    } else {
      setStep(1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setStep(maxSteps);
    }
  };
  
  const steps = [
    {
      title: "Bienvenue sur SereniTest",
      description: "Votre partenaire quotidien pour un esprit sain et équilibré.",
      image: sereniTestLogo
    },
    {
      title: "Questionnaire adaptatif",
      description: "5 minutes par jour pour évaluer votre état mental et suivre votre progression.",
      image: featuresIllustration
    },
    {
      title: "Recommandations personnalisées",
      description: "Recevez des conseils sur mesure pour améliorer votre bien-être mental au quotidien.",
      image: dashboardIllustration
    }
  ];
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-neutral-dark mb-6 text-center">Découvrez SereniTest</h3>
      
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.img 
              src={steps[step-1].image} 
              alt={steps[step-1].title} 
              className="w-64 h-64 object-contain mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <h4 className="text-xl font-semibold text-neutral-dark mb-2 text-center">{steps[step-1].title}</h4>
            <p className="text-neutral-dark/80 text-center max-w-md mb-8">{steps[step-1].description}</p>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-between items-center mt-4">
          <motion.button
            onClick={prevStep}
            className="p-2 rounded-full bg-neutral-light text-neutral-dark hover:bg-primary-teal hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <div className="flex space-x-2">
            {Array.from({ length: maxSteps }).map((_, i) => (
              <motion.div 
                key={i}
                className={`w-3 h-3 rounded-full ${i+1 === step ? 'bg-primary-teal' : 'bg-neutral-medium'}`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setStep(i+1)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextStep}
            className="p-2 rounded-full bg-neutral-light text-neutral-dark hover:bg-primary-teal hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <motion.button
          className="btn btn-primary"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(79, 191, 185, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Commencer l'expérience
        </motion.button>
      </div>
    </motion.div>
  );
};

// Composant pour la FAQ interactive
const InteractiveFAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqs = [
    {
      question: "Comment fonctionne SereniTest au quotidien ?",
      answer: "SereniTest vous propose un questionnaire quotidien de 5 minutes, adaptatif et ludique. L'application analyse vos réponses et les données passives (sommeil, activité physique, temps d'écran) pour vous fournir un tableau de bord personnalisé de votre état mental, avec des recommandations concrètes pour améliorer votre bien-être."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Absolument. Chez SereniTest, nous prenons la confidentialité très au sérieux. Toutes vos données sont chiffrées et nous respectons les normes RGPD les plus strictes. Vous gardez le contrôle total sur vos informations et pouvez les supprimer à tout moment."
    },
    {
      question: "Comment l'IA personnalise-t-elle les recommandations ?",
      answer: "Notre IA analyse les tendances de vos données sur plusieurs jours et identifie les facteurs qui influencent positivement ou négativement votre bien-être mental. Elle croise ces informations avec des techniques validées scientifiquement pour vous proposer des recommandations adaptées à votre profil et à votre situation actuelle."
    },
    {
      question: "Puis-je utiliser SereniTest sans abonnement ?",
      answer: "Oui, SereniTest propose une version Freemium qui vous donne accès au questionnaire quotidien de base, à un tableau de bord simplifié et à des suggestions génériques. Pour bénéficier des fonctionnalités avancées comme l'IA Coach et les statistiques détaillées, vous pouvez opter pour notre offre Premium."
    },
    {
      question: "SereniTest remplace-t-il un professionnel de santé mentale ?",
      answer: "Non, SereniTest est un outil complémentaire qui vous aide à suivre et améliorer votre bien-être mental au quotidien, mais ne remplace pas l'avis ou le suivi d'un professionnel de santé. Si vous rencontrez des difficultés importantes, nous vous encourageons à consulter un spécialiste."
    }
  ];
  
  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-neutral-dark mb-8 text-center">Questions fréquentes</h3>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div 
              className="p-4 cursor-pointer bg-neutral-light hover:bg-neutral-medium/30 transition-colors duration-300 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
              whileHover={{ backgroundColor: "rgba(225, 229, 235, 0.5)" }}
            >
              <h4 className="font-medium text-neutral-dark">{faq.question}</h4>
              <motion.svg 
                className="w-5 h-5 text-primary-teal" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.div>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div 
                  className="p-4 bg-white"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-neutral-dark/80">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-neutral-dark/80 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
        <motion.button
          className="btn btn-outline"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(79, 191, 185, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Contactez-nous
        </motion.button>
      </div>
    </motion.div>
  );
};

// Composant pour la section de fonctionnalités interactives
const InteractiveFeaturesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-neutral-light relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-neutral-dark mb-6 relative inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <span className="relative z-10">Explorez SereniTest</span>
            <motion.span 
              className="absolute -bottom-3 left-0 w-full h-4 bg-primary-teal/20 -z-10"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-neutral-dark/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Découvrez nos fonctionnalités interactives et voyez comment SereniTest peut transformer votre approche du bien-être mental au quotidien.
          </motion.p>
        </div>
        
        <div className="space-y-20">
          {/* Dashboard interactif */}
          <div>
            <motion.h3 
              className="text-2xl font-bold text-neutral-dark mb-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Tableau de bord personnalisé
            </motion.h3>
            <InteractiveDashboard />
          </div>
          
          {/* Onboarding interactif */}
          <div>
            <motion.h3 
              className="text-2xl font-bold text-neutral-dark mb-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Découvrez l'expérience SereniTest
            </motion.h3>
            <OnboardingDemo />
          </div>
          
          {/* FAQ interactive */}
          <div>
            <motion.h3 
              className="text-2xl font-bold text-neutral-dark mb-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Vos questions, nos réponses
            </motion.h3>
            <InteractiveFAQ />
          </div>
          
          {/* Illustration des fonctionnalités */}
          <div className="text-center">
            <motion.h3 
              className="text-2xl font-bold text-neutral-dark mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Nos fonctionnalités clés
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex justify-center"
            >
              <motion.img 
                src={featuresIllustration} 
                alt="Fonctionnalités SereniTest" 
                className="max-w-full md:max-w-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
          
          {/* Personas */}
          <div className="text-center">
            <motion.h3 
              className="text-2xl font-bold text-neutral-dark mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Conçu pour tous les profils
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex justify-center"
            >
              <motion.img 
                src={personasIllustration} 
                alt="Personas SereniTest" 
                className="max-w-full md:max-w-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <motion.button
            className="btn btn-primary text-lg px-8 py-4"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(79, 191, 185, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Essayer SereniTest gratuitement
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeaturesSection;
