import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDYBQxVlY1jqrBH6WQeGRoX5AJkVZXQBYo",
  authDomain: "currency-exchange-community.firebaseapp.com",
  projectId: "currency-exchange-community",
  storageBucket: "currency-exchange-community.appspot.com",
  messagingSenderId: "1098342071540",
  appId: "1:1098342071540:web:b0c0e1c9c9b9b9b9b9b9b9",
  databaseURL: "https://currency-exchange-community-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);

// Initialize the database with some default structure
const initializeDatabase = async () => {
  const { ref, set, get } = await import('firebase/database');
  try {
    // Check if messages node exists
    const messagesSnapshot = await get(ref(database, 'messages'));
    if (!messagesSnapshot.exists()) {
      await set(ref(database, 'messages'), {});
    }

    // Check if online-users node exists
    const onlineUsersSnapshot = await get(ref(database, 'online-users'));
    if (!onlineUsersSnapshot.exists()) {
      await set(ref(database, 'online-users'), {});
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initializeDatabase(); 
