import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { ref, push, onValue, set, off } from 'firebase/database';
import { database } from '../firebase';

function GroupChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Reference to messages in Firebase
      const messagesRef = ref(database, 'messages');
      const usersRef = ref(database, 'online-users');

      // Listen for new messages
      onValue(messagesRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const messageList = Object.values(data);
            setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
          } else {
            setMessages([]);
          }
          setLoading(false);
        } catch (err) {
          console.error('Error processing messages:', err);
          setError('Error loading messages');
          setLoading(false);
        }
      }, (error) => {
        console.error('Error loading messages:', error);
        setError('Error loading messages');
        setLoading(false);
      });

      // Update online status
      const userStatusRef = ref(database, `online-users/${user.email.replace('.', ',')}`);
      set(userStatusRef, {
        name: user.name,
        timestamp: Date.now(),
        photoURL: user.photoURL
      });

      // Listen for online users
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val() || {};
        setOnlineUsers(data);
      });

      // Cleanup function
      return () => {
        // Remove user from online list when component unmounts
        set(userStatusRef, null);
        // Detach listeners
        off(messagesRef);
        off(usersRef);
      };
    } catch (err) {
      console.error('Error setting up chat:', err);
      setError('Error setting up chat');
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      const messageData = {
        id: Date.now(),
        text: newMessage,
        sender: user.name,
        senderEmail: user.email,
        timestamp: Date.now(),
        avatar: user.photoURL || 'https://via.placeholder.com/40',
      };

      const messagesRef = ref(database, 'messages');
      await push(messagesRef, messageData);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error sending message');
    }
  };

  if (loading) {
    return (
      <div className="chat-container">
        <div className="loading-spinner">Loading chat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat-container">
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header glass-effect">
        <div className="chat-info">
          <h2>Currency Exchange Group</h2>
          <span className="online-count">
            {Object.keys(onlineUsers).length} online
          </span>
        </div>
        <div className="online-users">
          {Object.values(onlineUsers).map((onlineUser, index) => (
            <motion.div
              key={index}
              className="online-user"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="online-indicator"></span>
              {onlineUser.name}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            No messages yet. Be the first to say hello!
          </div>
        ) : (
          messages.map((message) => (
            <motion.div 
              key={message.id} 
              className={`message-wrapper ${message.senderEmail === user.email ? 'sent' : 'received'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="message-avatar">
                <img src={message.avatar} alt={message.sender} />
              </div>
              <div className="message-content">
                <div className="message-sender">{message.sender}</div>
                <div className="message-bubble">
                  {message.text}
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="message-input-container glass-effect">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <motion.button 
          type="submit" 
          className="send-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-paper-plane"></i>
        </motion.button>
      </form>
    </div>
  );
}

export default GroupChat; 