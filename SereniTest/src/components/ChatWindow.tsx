import React, { useState, useEffect, useRef } from 'react';
import './ChatStyles.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('bonjour') || lowerCaseMessage.includes('salut')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    }
    if (lowerCaseMessage.includes('aide') || lowerCaseMessage.includes('help')) {
      return "Je peux vous fournir des informations sur SereniTest ou répondre à vos questions. Que souhaitez-vous savoir ?";
    }
    if (lowerCaseMessage.includes('serenitest') || lowerCaseMessage.includes("c'est quoi")) {
      return "SereniTest est une application pour un bilan mental express, vous aidant à évaluer votre bien-être et à trouver des ressources utiles.";
    }
    if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('support')) {
        return "Pour le moment, vous pouvez ouvrir une issue sur notre dépôt GitHub si vous avez besoin d'assistance technique.";
    }
    return "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ou essayer d'autres mots-clés comme 'aide' ou 'SereniTest' ?";
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    const botResponseText = generateBotResponse(inputText);
    setInputText(''); // Clear input after sending user message

    setTimeout(() => {
      const botMessage: Message = { id: Date.now().toString() + 'b', text: botResponseText, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 800); // Simulate bot thinking delay
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>SereniTest Assistant</h3>
        <button onClick={onClose} className="close-chat-btn" aria-label="Close chat">
          &times;
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {messages.length === 0 && <p className="no-messages">Posez-moi une question pour commencer ! Par exemple: "Qu'est-ce que SereniTest ?"</p>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
