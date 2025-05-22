import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const VisionSection: React.FC = () => {
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
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-10%']);
  
  // Animation des particules
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Effet GSAP pour les animations plus complexes
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animation du titre
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
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
    }
    
    // Animation du texte
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
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
    
    // Animation des particules
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.fromTo(particles, 
        { opacity: 0, scale: 0 },
        { 
          opacity: 0.7, 
          scale: 1, 
          duration: 2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animation continue des particules
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          rotation: `random(-180, 180)`,
          duration: `random(10, 20)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
      });
    }
    
    // Animation de l'illustration
    if (illustrationRef.current) {
      gsap.fromTo(illustrationRef.current, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animation continue de l'illustration
      gsap.to(illustrationRef.current, {
        y: 15,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
  }, []);

  // Génération des particules
  const generateParticles = (count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white opacity-0"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      );
    }
    return particles;
  };

  return (
    <section 
      id="vision" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-primary-teal to-primary-purple text-white relative overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ 
          y: backgroundY,
          opacity: backgroundOpacity
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
      </motion.div>
      
      {/* Particules animées */}
      <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden">
        {generateParticles(50)}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left"
            style={{ y: titleY }}
          >
            <motion.h2 
              ref={titleRef}
              className="text-3xl md:text-5xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0 }}
            >
              <span className="relative z-10">Vers un Avenir Mentalement Plus Sain</span>
              <motion.span 
                className="absolute -bottom-3 left-0 w-full h-4 bg-white/20 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.h2>
            
            <motion.p 
              ref={textRef}
              className="text-lg md:text-xl max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0 }}
            >
              Notre vision est de faire de SereniTest le "bilan de santé mentale" quotidien référent, un peu comme une brosse à dents pour le cerveau. Nous aspirons à ce qu'il devienne un réflexe simple et accessible pour prévenir les crises, restaurer l'énergie mentale et favoriser une société plus à l'écoute d'elle-même et du bien-être de chacun. Nous croyons en un futur où prendre soin de sa santé mentale est aussi naturel que de prendre soin de sa santé physique.
            </motion.p>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.button
                className="btn bg-white text-primary-teal hover:bg-white/90 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Rejoindre la vision
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={illustrationRef}
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Cercle principal */}
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-white/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Cercle secondaire */}
              <motion.div 
                className="absolute inset-4 rounded-full border-2 border-white/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Cercle central */}
              <motion.div 
                className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-white/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "sine.inOut" }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">2030</div>
                  <div className="text-sm">Année cible pour notre vision</div>
                </div>
              </motion.div>
              
              {/* Points sur les cercles */}
              {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                <motion.div 
                  key={index}
                  className="absolute w-4 h-4 rounded-full bg-white"
                  style={{
                    top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 120}px)`,
                    left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 120}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "sine.inOut",
                    delay: index * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Timeline */}
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/20 transform -translate-x-1/2"></div>
          
          {[
            { year: "2025", title: "Lancement", description: "Lancement de SereniTest et premières adoptions" },
            { year: "2026", title: "Expansion", description: "Développement de nouvelles fonctionnalités et partenariats" },
            { year: "2028", title: "Recherche", description: "Publication d'études sur l'impact de SereniTest" },
            { year: "2030", title: "Référence", description: "SereniTest devient la référence en santé mentale quotidienne" }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <motion.div 
                className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
              
              <motion.div 
                className="w-10 h-10 rounded-full bg-white text-primary-teal flex items-center justify-center font-bold z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: false, amount: 0.5 }}
              >
                {item.year}
              </motion.div>
              
              <div className="w-1/2"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
