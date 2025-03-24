const context = {
  community: {
    name: "Currency Exchange Community",
    description: "A community where users can buy, sell, and trade different currencies securely and efficiently.",
    supportedCurrencies: ['DZD', 'USD', 'EUR', 'GBP', 'RMB'],
    rules: {
      anonymity: true,
      transactionSecurity: true,
      userValidation: false,
      tradeCompletion: 'Upon agreement',
    }
  },
  // Add other sections as needed

  // Section 4: Application Features
  appFeatures: {
    users: [],

    // Initialize with default user
    initialize() {
      if (this.users.length === 0) {
        this.users.push({
          name: 'Soufiane',
          email: 'soufian3hm@gmail.com',
          password: 'Soufian3.hm',
          preferredCurrency: 'DZD'
        });
      }
    },

    // This function is called when a new user signs up.
    signUp: async function (userData) {
      console.log(`User signed up: ${userData.name}, ${userData.email}`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const existingUser = this.users.find(user => user.email === userData.email);
          if (existingUser) {
            return reject(new Error('User already exists'));
          }
          this.users.push(userData);
          resolve();
        }, 1000);
      });
    },

    // ... rest of the appFeatures code ...
  },
};

// Initialize the context when it's created
context.appFeatures.initialize();

export default context; 