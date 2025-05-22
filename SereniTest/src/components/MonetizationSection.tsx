import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface PlanCardProps {
  title: string;
  price?: string;
  features: string[];
  actionText: string;
  actionLink?: string;
  isPopular?: boolean;
  index: number;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, features, actionText, actionLink = '#', isPopular, index }) => {
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
      className={`border rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden ${isPopular ? 'border-primary-purple border-2' : 'border-gray-200'}`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Élément décoratif */}
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-primary-teal/10 z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-primary-purple/10 z-0"></div>
      
      {isPopular && (
        <motion.div 
          className="absolute top-0 right-0 bg-primary-purple text-white text-xs font-semibold px-3 py-1 rounded-bl-lg"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5, type: "spring" }}
        >
          POPULAIRE
        </motion.div>
      )}
      
      <div className="relative z-10">
        <motion.h3 
          className="text-2xl font-semibold text-neutral-dark mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h3>
        
        {price && (
          <motion.p 
            className="text-4xl font-bold text-center mb-6 text-primary-purple"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.5, type: "spring" }}
          >
            {price}
          </motion.p>
        )}
        
        <motion.ul 
          className="space-y-3 mb-6 text-sm text-neutral-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
        >
          {features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.5 + (i * 0.1), duration: 0.3 }}
            >
              <motion.svg 
                className="w-5 h-5 text-primary-teal mr-2 shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 15, 0] }}
                transition={{ delay: index * 0.15 + 0.5 + (i * 0.1), duration: 0.5 }}
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </motion.svg>
              {feature}
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.a 
          href={actionLink} 
          className={`w-full block text-center py-3 px-4 rounded-md font-semibold transition-all duration-300 ${
            isPopular 
              ? 'bg-primary-purple text-white hover:bg-secondary-dark-purple' 
              : 'bg-neutral-light text-neutral-dark hover:bg-neutral-medium'
          }`}
          whileHover={{ 
            scale: 1.05,
            boxShadow: isPopular 
              ? "0 5px 15px rgba(138, 133, 255, 0.4)" 
              : "0 5px 15px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
        >
          {actionText}
        </motion.a>
      </div>
    </motion.div>
  );
};

const MonetizationSection: React.FC = () => {
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
  
  const plans = [
    {
      title: "Freemium",
      features: [
        "Accès au questionnaire quotidien de base",
        "Tableau de bord simplifié",
        "Suggestions génériques",
        "Historique limité à 7 jours"
      ],
      actionText: "S'inscrire Gratuitement",
    },
    {
      title: "Premium",
      price: "9.99€/mois",
      features: [
        "Toutes les fonctionnalités Freemium",
        "Statistiques avancées et historiques détaillés",
        "IA Coach avec recommandations personnalisées",
        "Accès prioritaire aux nouveaux contenus",
        "Support premium 24/7"
      ],
      actionText: "Découvrir Premium",
      isPopular: true,
    },
    {
      title: "Offre Entreprise",
      features: [
        "Tableaux de bord anonymisés pour RH et QVT",
        "Accompagnement personnalisé pour vos équipes",
        "Ateliers et formations sur le bien-être mental",
        "Rapports analytiques mensuels",
        "Tarification sur mesure"
      ],
      actionText: "Nous Contacter",
    },
    {
      title: "Marketplace Bien-être",
      features: [
        "Contenus exclusifs (méditations, articles)",
        "Séances audio guidées par des experts",
        "Accompagnement thérapeutique optionnel",
        "Communauté de soutien",
        "Bientôt disponible !"
      ],
      actionText: "Être Informé(e)",
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

  // Comparaison interactive des plans
  const [showComparison, setShowComparison] = useState(false);
  
  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  // Tableau de comparaison des fonctionnalités
  const comparisonFeatures = [
    { name: "Questionnaire quotidien", freemium: true, premium: true, enterprise: true },
    { name: "Tableau de bord", freemium: "Basique", premium: "Avancé", enterprise: "Personnalisé" },
    { name: "Historique des données", freemium: "7 jours", premium: "Illimité", enterprise: "Illimité" },
    { name: "IA Coach personnalisé", freemium: false, premium: true, enterprise: true },
    { name: "Recommandations", freemium: "Génériques", premium: "Personnalisées", enterprise: "Sur mesure" },
    { name: "Analyses avancées", freemium: false, premium: true, enterprise: true },
    { name: "Support client", freemium: "Email", premium: "24/7", enterprise: "Dédié" },
    { name: "Rapports analytiques", freemium: false, premium: "Mensuels", enterprise: "Hebdomadaires" },
    { name: "Ateliers bien-être", freemium: false, premium: false, enterprise: true },
  ];

  return (
    <section 
      id="monetization" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-light to-white"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgwKSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSg3OSwxOTEsMTg1LDAuMDUpIi8+PC9wYXR0ZXJuPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
      </motion.div>
      
      {/* Formes décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        {generateShapes(15)}
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
            <span className="relative z-10">Choisissez l'Accompagnement Qui Vous Convient</span>
            <motion.span 
              className="absolute -bottom-3 left-0 w-full h-4 bg-primary-purple/20 -z-10"
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
            Découvrez nos différentes formules pensées pour s'adapter à vos besoins et à ceux de votre organisation.
          </motion.p>
          
          {/* Bouton de comparaison */}
          <motion.button
            className="mt-8 btn btn-outline"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(79, 191, 185, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleComparison}
          >
            {showComparison ? "Masquer la comparaison" : "Comparer les offres"}
          </motion.button>
        </motion.div>
        
        {/* Tableau de comparaison */}
        <AnimatePresence>
          {showComparison && (
            <motion.div 
              className="mb-16 overflow-x-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="min-w-full bg-white rounded-xl shadow-xl overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-medium">
                  <thead className="bg-neutral-light">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-dark">Fonctionnalité</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-neutral-dark">Freemium</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-primary-purple">Premium</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-neutral-dark">Entreprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-medium">
                    {comparisonFeatures.map((feature, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-light/30'}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-neutral-dark">{feature.name}</td>
                        <td className="px-6 py-4 text-center text-sm text-neutral-dark">
                          {typeof feature.freemium === 'boolean' ? (
                            feature.freemium ? (
                              <motion.svg 
                                className="w-5 h-5 text-accent-green mx-auto" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                              >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </motion.svg>
                            ) : (
                              <motion.svg 
                                className="w-5 h-5 text-neutral-medium mx-auto" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                              >
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                              </motion.svg>
                            )
                          ) : (
                            feature.freemium
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-primary-purple font-medium">
                          {typeof feature.premium === 'boolean' ? (
                            feature.premium ? (
                              <motion.svg 
                                className="w-5 h-5 text-accent-green mx-auto" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
                              >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </motion.svg>
                            ) : (
                              <motion.svg 
                                className="w-5 h-5 text-neutral-medium mx-auto" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
                              >
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                              </motion.svg>
                            )
                          ) : (
                            feature.premium
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-neutral-dark">
                          {typeof feature.enterprise === 'boolean' ? (
                            feature.enterprise ? (
                              <motion.svg 
                                className="w-5 h-5 text-accent-green mx-auto" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.4, duration: 0.3 }}
                              >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </motion.svg>
                            ) : (
                              <motion.svg 
                                className="w-5 h-5 text-neutral-medium mx-auto" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.4, duration: 0.3 }}
                              >
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                              </motion.svg>
                            )
                          ) : (
                            feature.enterprise
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              title={plan.title} 
              price={plan.price} 
              features={plan.features} 
              actionText={plan.actionText} 
              isPopular={plan.isPopular}
              index={index}
            />
          ))}
        </div>
        
        {/* FAQ */}
        <motion.div 
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-neutral-dark mb-8 text-center">Questions fréquentes</h3>
          
          {[
            { 
              question: "Puis-je changer d'offre à tout moment ?", 
              answer: "Oui, vous pouvez passer d'une offre à l'autre à tout moment. Votre facturation sera ajustée au prorata de votre utilisation." 
            },
            { 
              question: "Comment fonctionne la période d'essai ?", 
              answer: "Nous proposons une période d'essai de 14 jours pour l'offre Premium, sans engagement. Vous pouvez annuler à tout moment pendant cette période." 
            },
            { 
              question: "Les données sont-elles sécurisées ?", 
              answer: "Absolument. Chez SereniTest, nous prenons la confidentialité très au sérieux. Toutes vos données sont chiffrées et nous respectons les normes RGPD les plus strictes." 
            },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div 
                className="p-4 cursor-pointer bg-neutral-light hover:bg-neutral-medium/30 transition-colors duration-300 flex justify-between items-center"
                whileHover={{ backgroundColor: "rgba(225, 229, 235, 0.5)" }}
              >
                <h4 className="font-medium text-neutral-dark">{item.question}</h4>
                <svg className="w-5 h-5 text-primary-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
              <div className="p-4 bg-white">
                <p className="text-neutral-dark/80">{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MonetizationSection;
