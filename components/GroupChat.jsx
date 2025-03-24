import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import context from '../context';

function GroupChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');

  useEffect(() => {
    if (user && user.tradeType) {
      const groupName = `${user.preferredCurrency}-${user.tradeType}`;
      setCurrentGroup(groupName);
      context.appFeatures.joinGroupChat(user.name, groupName);
    }
  }, [user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageObj = {
        sender: user.name,
        content: newMessage,
        timestamp: new Date().toISOString(),
        group: currentGroup
      };
      setMessages(prev => [...prev, messageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="group-chat">
      <div className="chat-header">
        <h2>{currentGroup} Group Chat</h2>
      </div>
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === user.name ? 'own-message' : ''}`}
          >
            <span className="sender">{msg.sender}</span>
            <p className="content">{msg.content}</p>
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <form className="message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default GroupChat; 