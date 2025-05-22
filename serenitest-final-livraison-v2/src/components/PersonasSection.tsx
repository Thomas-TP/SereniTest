import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface PersonaCardProps {
  name: string;
  description: string;
  image?: string;
  index: number;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ name, description, image, index }) => {
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

  // Génération d'un avatar si aucune image n'est fournie
  const generateAvatar = () => {
    const colors = ['#4FBFB9', '#8A85FF', '#FFD166', '#06D6A0'];
    const color = colors[index % colors.length];
    
    return (
      <div 
        className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </div>
    );
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
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5, type: "spring" }}
        >
          {image ? (
            <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mb-4" />
          ) : (
            generateAvatar()
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-neutral-dark mb-2 relative inline-block">
            {name}
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-primary-purple/30 w-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: index * 0.15 + 0.6, duration: 0.5 }}
            />
          </h3>
          <p className="text-neutral-dark/80">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PersonasSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Pour l'effet parallax avec framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transformations basées sur le défilement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-10%']);
  
  // Génération des formes décoratives
  const generateShapes = (count: number) => {
    const shapes = [];
    const shapeTypes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < count; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.random() * 40 + 10;
      
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
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15],
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
  
  const personas = [
    {
      name: "Jeunes Actifs & Télétravailleurs",
      description: "Conciliez vie pro et perso avec sérénité grâce à un suivi mental adapté à votre rythme.",
      // image: "/path/to/jeune-actif.jpg" // Placeholder
    },
    {
      name: "Étudiants Stressés",
      description: "Gérez la pression des examens et la charge de travail avec des outils pour rester concentré et apaisé.",
      // image: "/path/to/etudiant.jpg"
    },
    {
      name: "Cadres & Dirigeants",
      description: "Prévenez la surcharge cognitive et maintenez votre performance en prenant soin de votre équilibre mental.",
      // image: "/path/to/cadre.jpg"
    },
    {
      name: "Personnes en Transition",
      description: "Traversez les périodes de changement (reconversion, burn-out latent) avec un soutien quotidien.",
      // image: "/path/to/transition.jpg"
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
    
  }, []);

  // Témoignages interactifs
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      text: "SereniTest m'a aidé à mieux comprendre mes pics de stress et à agir avant qu'ils ne deviennent problématiques.",
      author: "Marie L., 28 ans, Développeuse web",
      rating: 5
    },
    {
      text: "Grâce aux recommandations quotidiennes, j'ai pu améliorer significativement mon bien-être pendant mes examens.",
      author: "Thomas D., 22 ans, Étudiant en médecine",
      rating: 4
    },
    {
      text: "Un outil indispensable pour gérer mon équilibre mental en tant que dirigeante d'entreprise.",
      author: "Sophie M., 42 ans, CEO",
      rating: 5
    }
  ];
  
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="personas" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-neutral-light relative overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-primary-purple/5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoNzksMTkxLDE4NSwwLjEpIi8+PC9wYXR0ZXJuPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
      </motion.div>
      
      {/* Formes décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        {generateShapes(20)}
      </div>
      
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
            <span className="relative z-10">Conçu Pour Vous Aider à Prospérer</span>
            <motion.span 
              className="absolute -bottom-3 left-0 w-full h-4 bg-accent-yellow/30 -z-10"
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
            SereniTest s'adresse à toute personne souhaitant améliorer son bien-être mental, et plus particulièrement à ceux qui font face à des défis spécifiques.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {personas.map((persona, index) => (
            <PersonaCard 
              key={index} 
              name={persona.name} 
              description={persona.description} 
              image={persona.image}
              index={index}
            />
          ))}
        </div>
        
        {/* Témoignages */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-neutral-dark mb-8 text-center">Ce qu'ils en disent</h3>
            
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span 
                        key={i}
                        className={`text-2xl ${i < testimonials[activeTestimonial].rating ? 'text-accent-yellow' : 'text-neutral-medium'}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  
                  <p className="text-lg italic mb-4">"{testimonials[activeTestimonial].text}"</p>
                  <p className="font-medium text-primary-teal">{testimonials[activeTestimonial].author}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-neutral-light text-neutral-dark hover:bg-primary-teal hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                
                <motion.button
                  onClick={nextTestimonial}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonasSection;
