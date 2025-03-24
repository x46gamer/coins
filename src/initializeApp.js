import context from './context';

export const initializeApp = () => {
  try {
    // Initialize users
    if (context && context.appFeatures) {
      context.appFeatures.initializeUsers();
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}; 