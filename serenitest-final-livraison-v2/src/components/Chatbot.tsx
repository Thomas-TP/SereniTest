import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ChatbotIconProps {
  onClick: () => void;
}

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-primary-teal hover:bg-secondary-dark-teal text-white p-4 rounded-full shadow-lg z-50"
      whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(79, 191, 185, 0.4)" }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: 1, duration: 0.5 }
      }}
      aria-label="Ouvrir le chatbot"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2m4-6h4m0 0l-2-2m2 2l-2 2" />
      </svg>
    </motion.button>
  );
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
}

const ChatWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const predefinedResponses: { [key: string]: string } = {
    "bonjour": "Bonjour ! En quoi puis-je vous assister ?",
    "salut": "Salut ! Comment ça va ?",
    "aide": "Je peux vous donner des informations sur SereniTest. Que souhaitez-vous savoir ? (Ex: 'Qu\'est-ce que SereniTest ?', 'Comment fonctionne le questionnaire ?', 'Quelles sont les offres ?')",
    "qu'est-ce que serenitest ?": "SereniTest est une application pour faire un check-up mental quotidien en 5 minutes, combinant IA et techniques de psychologie positive pour vous aider à améliorer votre bien-être mental.",
    "comment fonctionne le questionnaire ?": "C'est un questionnaire quotidien de 5 minutes, ludique et adaptatif. Il analyse vos réponses et les données passives pour vous fournir un tableau de bord personnalisé de votre état mental.",
    "quelles sont les offres ?": "Nous avons une offre Freemium, une offre Premium à 9,99€/mois, et des solutions pour les entreprises. Plus de détails dans la section 'Nos Offres'.",
    "merci": "De rien ! N'hésitez pas si vous avez d'autres questions.",
    "au revoir": "Au revoir et prenez soin de vous !",
  };
  
  // Effet de défilement automatique
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    // Simuler le temps de réflexion du bot
    setTimeout(() => {
      const botThinkingMessage: Message = {
        id: messages.length + 2,
        text: '...',
        sender: 'bot',
        isTyping: true
      };
      
      setMessages((prevMessages) => [...prevMessages, botThinkingMessage]);
      
      // Après un court délai, remplacer le message de réflexion par la vraie réponse
      setTimeout(() => {
        const botResponseText = predefinedResponses[inputValue.toLowerCase().trim()] || 
          "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ou demander de l'aide ?";
        
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          // Remplacer le dernier message (celui de réflexion) par la vraie réponse
          newMessages[newMessages.length - 1] = {
            id: messages.length + 2,
            text: botResponseText,
            sender: 'bot'
          };
          return newMessages;
        });
        
        setIsThinking(false);
      }, 1000);
    }, 500);
  };

  // Animation des bulles de message
  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  // Animation de l'effet de frappe
  const typingAnimation = {
    animate: {
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="fixed bottom-20 right-6 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <header className="bg-primary-teal text-white p-4 flex justify-between items-center rounded-t-lg">
        <h3 className="font-semibold text-lg">Assistant SereniTest</h3>
        <motion.button 
          onClick={onClose} 
          className="text-white hover:text-gray-200" 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Fermer le chatbot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </header>
      
      <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-neutral-light">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-primary-purple text-white' 
                    : 'bg-white shadow-md text-neutral-dark'
                }`}
              >
                {msg.isTyping ? (
                  <motion.div 
                    className="flex space-x-1 justify-center items-center h-6"
                    variants={typingAnimation}
                    animate="animate"
                  >
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </motion.div>
                ) : (
                  msg.text
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      <footer className="p-3 border-t border-neutral-medium bg-white rounded-b-lg">
        <div className="flex">
          <motion.input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Posez votre question..."
            className="flex-grow p-2 border border-neutral-medium rounded-l-md focus:ring-primary-teal focus:border-primary-teal outline-none"
            disabled={isThinking}
            whileFocus={{ boxShadow: "0 0 0 2px rgba(79, 191, 185, 0.2)" }}
          />
          <motion.button
            onClick={handleSendMessage}
            className="bg-primary-teal text-white px-4 py-2 rounded-r-md"
            whileHover={{ backgroundColor: "#3A8F8A" }}
            whileTap={{ scale: 0.95 }}
            disabled={isThinking}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </motion.button>
        </div>
        
        {/* Suggestions rapides */}
        <div className="mt-2 flex flex-wrap gap-2">
          {["Bonjour", "Aide", "Offres"].map((suggestion, index) => (
            <motion.button
              key={index}
              className="text-xs bg-neutral-light px-2 py-1 rounded-full text-neutral-dark hover:bg-neutral-medium/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setInputValue(suggestion);
                setTimeout(() => handleSendMessage(), 100);
              }}
              disabled={isThinking}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </footer>
    </motion.div>
  );
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <ChatbotIcon onClick={() => setIsOpen(true)} />
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
