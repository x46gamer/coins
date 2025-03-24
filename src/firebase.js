import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBTcLxKnK7C-oqGXr2VFgqHJVJGBolQgBU",
  authDomain: "coins-58449.firebaseapp.com",
  projectId: "coins-58449",
  storageBucket: "coins-58449.firebasestorage.app",
  messagingSenderId: "654033252445",
  appId: "1:654033252445:web:3a6de5d2f77306cfb0ddb4",
  databaseURL: "https://coins-58449-default-rtdb.europe-west1.firebasedatabase.app"
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
