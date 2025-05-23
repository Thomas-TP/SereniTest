import React from 'react';
import './ChatStyles.css';

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  return (
    <button className="chat-bubble" onClick={onClick} aria-label="Open chat">
      {/* Using a simple emoji as a placeholder for an icon */}
      💬
    </button>
  );
};

export default ChatBubble;
