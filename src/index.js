import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import context from './context';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from './firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize database structure
const initializeDatabase = async () => {
  const { ref, set } = await import('firebase/database');
  try {
    const messagesRef = ref(database, 'messages');
    const usersRef = ref(database, 'online-users');
    
    // Only set if empty
    const messagesSnapshot = await get(messagesRef);
    const usersSnapshot = await get(usersRef);
    
    if (!messagesSnapshot.exists()) {
      await set(messagesRef, {});
    }
    if (!usersSnapshot.exists()) {
      await set(usersRef, {});
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Initialize the database
initializeDatabase();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Initialize users
context.appFeatures.initializeUsers(); 