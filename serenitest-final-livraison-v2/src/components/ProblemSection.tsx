import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  
  // Pour l'effet parallax avec framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transformations basées sur le défilement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const titleX = useTransform(scrollYProgress, [0, 0.5], ['-5%', '0%']);
  const textX = useTransform(scrollYProgress, [0, 0.5], ['5%', '0%']);
  
  // Animation des éléments d'illustration
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Effet GSAP pour les animations plus complexes
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animation du titre
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
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
    }
    
    // Animation du texte
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
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
    
    // Animation des illustrations
    if (illustrationRef.current) {
      const elements = illustrationRef.current.children;
      
      gsap.fromTo(elements, 
        { opacity: 0, y: 30, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
  }, []);

  // Génération des icônes d'illustration
  const illustrations = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Stress"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: "Anxiété"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Fatigue"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      label: "Surcharge"
    },
  ];

  return (
    <section 
      id="problem" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-neutral-light relative overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-primary-teal/5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDEzOCwxMzMsMjU1LDAuMDUpIi8+PC9wYXR0ZXJuPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            style={{ x: titleX }}
          >
            <motion.h2 
              ref={titleRef}
              className="text-3xl md:text-5xl font-bold text-neutral-dark mb-6 relative inline-block"
              initial={{ opacity: 0 }}
            >
              <span className="relative z-10">Le Stress et l'Anxiété :</span>
              <br />
              <span className="relative z-10">Un Défi Moderne</span>
              <motion.span 
                className="absolute -bottom-3 left-0 w-full h-4 bg-primary-purple/20 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.h2>
            
            <motion.p 
              ref={textRef}
              className="text-lg md:text-xl text-neutral-dark/90 max-w-xl"
              initial={{ opacity: 0 }}
            >
              De plus en plus de personnes ressentent du stress, de l'anxiété, de la surcharge mentale ou des baisses d'énergie sans comprendre les causes exactes. L'accès à un accompagnement psychologique reste difficile, coûteux, ou stigmatisant. Il manque un outil simple, rapide et accessible pour faire le point sur son état mental au quotidien.
            </motion.p>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.button
                className="btn btn-outline"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(79, 191, 185, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                En savoir plus
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={illustrationRef}
            className="md:w-1/2 grid grid-cols-2 gap-6"
            style={{ x: textX }}
            ref={ref}
          >
            {illustrations.map((item, index) => (
              <motion.div
                key={index}
                className="aspect-square bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-primary-teal hover:bg-primary-teal hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="w-16 h-16 mb-4">
                  {item.icon}
                </div>
                <span className="font-medium text-lg">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Statistiques animées */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <motion.div 
              className="text-4xl font-bold text-primary-purple mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              76%
            </motion.div>
            <p className="text-neutral-dark">des actifs déclarent ressentir du stress régulièrement</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <motion.div 
              className="text-4xl font-bold text-primary-teal mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              42%
            </motion.div>
            <p className="text-neutral-dark">des personnes ne consultent pas par manque d'accessibilité</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <motion.div 
              className="text-4xl font-bold text-accent-yellow mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              5min
            </motion.div>
            <p className="text-neutral-dark">suffisent pour faire un point quotidien sur sa santé mentale</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
