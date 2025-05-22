import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import sereniTestLogo from '../assets/serenitest-logo.png';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Élément décoratif */}
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-primary-teal/10 z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-primary-purple/10 z-0"></div>
      
      <div className="relative z-10">
        {icon && (
          <motion.div 
            className="text-primary-teal mb-4 text-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.5, type: "spring" }}
          >
            {icon}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-neutral-dark mb-2 relative inline-block">
            {title}
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-primary-teal/30 w-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: index * 0.15 + 0.6, duration: 0.5 }}
            />
          </h3>
          <p className="text-neutral-dark/80 text-sm">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SolutionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Pour l'effet parallax avec framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transformations basées sur le défilement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-10%']);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1]);
  
  // Génération des formes décoratives
  const generateShapes = (count: number) => {
    const shapes = [];
    const shapeTypes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < count; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.random() * 60 + 20;
      
      let shapeElement;
      if (type === 'circle') {
        shapeElement = <div className="rounded-full bg-primary-teal/5" style={{ width: size, height: size }}></div>;
      } else if (type === 'square') {
        shapeElement = <div className="rounded-md bg-primary-purple/5" style={{ width: size, height: size }}></div>;
      } else {
        shapeElement = (
          <div className="bg-accent-yellow/5" style={{ 
            width: size, 
            height: size, 
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' 
          }}></div>
        );
      }
      
      shapes.push(
        <motion.div 
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.7,
            zIndex: 0
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            rotate: [0, Math.random() * 180 - 90]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {shapeElement}
        </motion.div>
      );
    }
    
    return shapes;
  };
  
  const features = [
    { 
      title: "Questionnaire Quotidien", 
      description: "Un questionnaire de 5 minutes, ludique et adaptatif pour évaluer votre état mental.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Analyse de Données Passives",
      description: "Intégration de données comme le sommeil, l'activité physique, et le temps d'écran.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "IA Coach Personnalisé",
      description: "Une IA qui détecte les évolutions de votre état mental (stress, fatigue, charge cognitive).",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Tableau de Bord Intuitif",
      description: "Un score de bien-être clair et des indicateurs-clés pour suivre vos progrès.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      title: "Suggestions Concrètes",
      description: "Des actions ciblées : respiration guidée, pause créative, micro-déconnexion, journaling.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Accès aux Professionnels",
      description: "Option de contact avec des psychologues partenaires certifiés pour un soutien approfondi.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  // Effet GSAP pour les animations plus complexes
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    
    // Animation du titre
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animation du sous-titre
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Animation du logo
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.5 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animation continue du logo
      gsap.to(logoRef.current, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
  }, []);

  // Démonstration interactive
  const [activeDemo, setActiveDemo] = useState(false);
  
  const toggleDemo = () => {
    setActiveDemo(!activeDemo);
  };

  return (
    <section 
      id="solution" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-bg-gradient-start to-bg-gradient-end relative overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiIGZpbGw9InJnYmEoNzksMTkxLDE4NSwwLjEpIi8+PC9wYXR0ZXJuPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
      </motion.div>
      
      {/* Formes décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        {generateShapes(15)}
      </div>
      
      {/* Logo animé */}
      <motion.div 
        ref={logoRef}
        className="absolute top-10 left-10 z-20 hidden lg:block"
        style={{ 
          rotate: logoRotate,
          scale: logoScale
        }}
      >
        <motion.img 
          src={sereniTestLogo} 
          alt="SereniTest Logo" 
          className="w-20 h-20 object-contain"
          initial={{ opacity: 0 }}
        />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ y: titleY }}
        >
          <motion.h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-neutral-dark mb-6 relative inline-block"
            initial={{ opacity: 0 }}
          >
            <span className="relative z-10">Notre Solution Innovante</span>
            <motion.span 
              className="absolute -bottom-3 left-0 w-full h-4 bg-primary-teal/20 -z-10"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          
          <motion.p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-neutral-dark/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
          >
            SereniTest vous offre une panoplie d'outils pour comprendre et améliorer activement votre santé mentale au quotidien.
          </motion.p>
          
          {/* Bouton de démonstration */}
          <motion.button
            className="mt-8 btn btn-secondary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(138, 133, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDemo}
          >
            {activeDemo ? "Masquer la démo" : "Voir la démonstration"}
          </motion.button>
        </motion.div>
        
        {/* Démo interactive */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div 
              className="mb-16 max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 50, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-neutral-dark">Tableau de bord SereniTest</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accent-red"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
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
                          strokeDashoffset="70"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 70 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <motion.div 
                        className="absolute text-3xl font-bold text-primary-teal"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        75%
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-light p-4 rounded-lg">
                    <h4 className="font-medium text-neutral-dark mb-2">Tendance hebdomadaire</h4>
                    <div className="h-40 flex items-end justify-between px-2">
                      {[65, 70, 60, 75, 68, 72, 75].map((value, index) => (
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
                      {["Méditation guidée (5 min)", "Pause déconnexion", "Exercice de respiration", "Journal de gratitude"].map((item, index) => (
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              title={feature.title} 
              description={feature.description} 
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
