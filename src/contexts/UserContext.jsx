import React, { createContext, useContext, useState, useEffect } from 'react';
import context from '../context';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const UserContext = createContext();

// List of admin emails
const ADMIN_EMAILS = ['soufian3hm@gmail.com'];

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check localStorage for saved user data
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Check if user's email is in admin list
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  // Persist user data in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const userData = await context.appFeatures.logIn(credentials);
      const isAdminUser = ADMIN_EMAILS.includes(credentials.email);
      setUser({ 
        ...userData, 
        role: isAdminUser ? 'admin' : 'user',
        loginMethod: 'email'
      });
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        preferredCurrency: 'DZD',
        loginMethod: 'google',
        role: ADMIN_EMAILS.includes(result.user.email) ? 'admin' : 'user',
        lastLogin: new Date().toISOString()
      };

      // Add user to context if they don't exist
      try {
        await context.appFeatures.signUp(userData);
      } catch (error) {
        // User already exists, that's fine
        console.log('User already exists in system');
      }

      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Google Sign-In error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    if (auth.currentUser) {
      auth.signOut();
    }
  };

  const signUp = async (userData) => {
    try {
      await context.appFeatures.signUp(userData);
      setUser({ ...userData, role: userData.email === 'soufian3hm@gmail.com' ? 'admin' : 'user' });
      return userData;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signUp, 
      googleSignIn, 
      isAdmin,
      ADMIN_EMAILS // Export this so other components can use it
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
} 