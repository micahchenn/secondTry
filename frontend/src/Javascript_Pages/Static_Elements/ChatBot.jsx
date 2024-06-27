// Static_Elements/ChatBot.jsx
import React, { useState } from 'react';
import '../../Styling_Pages/Static_Elements/ChatBot.css'; // Ensure you create a corresponding CSS file for styling
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleChatBot = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="chatbot-container">
        <div className={`chatbot-button ${isOpen ? 'hidden' : ''}`} onClick={toggleChatBot}>
          <div className="breathing-circle"></div>
          <div className="circle-text">Quantara</div>
        </div>
        {isOpen && (
          <div className="chatbot-content">
            <button className="close-button" onClick={toggleChatBot}>Close</button>
            {/* Your chatbot implementation goes here */}
            <h2>Chat Bot</h2>
            <div className="chatbot-messages">
              {/* Messages will be displayed here */}
            </div>
            <input type="text" placeholder="Type a message..." />
          </div>
        )}
      </div>
    );
  };
  
  export default ChatBot;