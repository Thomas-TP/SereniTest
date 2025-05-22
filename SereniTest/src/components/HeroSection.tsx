import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import sereniTestLogo from '../assets/serenitest-logo.png';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Pour l'effet parallax avec framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Transformations basées sur le défilement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  
  // Animations de particules
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Effet GSAP pour les animations plus complexes
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animation du titre
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
        }
      );
    }
    
    // Animation du sous-titre
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
    
    // Animation de la description
    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.6,
          ease: "power2.out",
        }
      );
    }
    
    // Animation du logo
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.8, rotation: -10 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 1.5, 
          delay: 0.2,
          ease: "elastic.out(1, 0.5)",
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
    
    // Animation du bouton
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          delay: 1,
          ease: "back.out(1.7)",
        }
      );
      
      // Animation de pulsation du bouton
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
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
    
  }, []);

  // Génération des particules
  const generateParticles = (count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(
        <div 
          key={i}
          className="absolute rounded-full bg-primary-teal opacity-0"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
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
      id="hero" 
      ref={sectionRef}
      className="relative bg-gradient-to-r from-bg-gradient-start to-bg-gradient-end text-neutral-dark min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ 
          y: backgroundY,
          opacity: backgroundOpacity
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-teal/10 to-primary-purple/10 z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSg3OSwxOTEsMTg1LDAuMDUpIi8+PC9wYXR0ZXJuPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
      </motion.div>
      
      {/* Particules animées */}
      <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden">
        {generateParticles(30)}
      </div>
      
      {/* Logo animé */}
      <motion.div 
        className="absolute top-10 right-10 z-20 hidden md:block"
        style={{ 
          rotate: logoRotate,
          scale: logoScale
        }}
      >
        <motion.img 
          ref={logoRef}
          src={sereniTestLogo} 
          alt="SereniTest Logo" 
          className="w-32 h-32 object-contain"
          initial={{ opacity: 0 }}
        />
      </motion.div>
      
      {/* Contenu principal avec animation au scroll */}
      <motion.div 
        className="container mx-auto px-6 text-center relative z-10"
        style={{ 
          opacity: textOpacity,
          y: textY
        }}
      >
        <motion.h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0 }}
        >
          Sereni<span className="text-primary-purple">Test</span>
        </motion.h1>
        
        <motion.p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-8 text-neutral-dark"
          initial={{ opacity: 0 }}
        >
          Votre check-up mental quotidien en 5 minutes pour un esprit sain.
        </motion.p>
        
        <motion.p 
          ref={descriptionRef}
          className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-neutral-dark"
          initial={{ opacity: 0 }}
        >
          SereniTest est une application mobile intelligente qui permet aux utilisateurs de faire un véritable check-up mental quotidien en seulement cinq minutes. En combinant intelligence artificielle, techniques de psychologie positive et données passives, elle fournit un tableau de bord personnel de l'état psychologique de l'utilisateur, avec des recommandations concrètes pour se sentir mieux, jour après jour.
        </motion.p>
        
        <motion.a
          ref={buttonRef}
          href="#solution"
          className="btn btn-primary inline-block"
          initial={{ opacity: 0 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(79, 191, 185, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Découvrez comment
        </motion.a>
      </motion.div>
      
      {/* Indicateur de défilement */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-primary-teal rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-primary-teal rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
