// context.js

// This is where we define all key information related to the app's functionality.
const context = {

  // Section 1: General Community Information
  community: {
    // Name and description of the community
    name: "Currency Exchange Community",
    description: "A community where users can buy, sell, and trade different currencies securely and efficiently.",

    // List of supported currencies. The community deals with these currencies only.
    supportedCurrencies: ['DZD', 'USD', 'EUR', 'GBP', 'RMB'],

    // Community rules that govern transactions and user privacy
    rules: {
      // Whether to hide user phone numbers until the trade is accepted
      anonymity: true,

      // Whether all transactions must be secure (no scams or fraud)
      transactionSecurity: true,

      // No user verification is required for new users (for simplicity)
      userValidation: false,

      // When a trade is completed, the user can share their phone numbers
      tradeCompletion: 'Upon agreement', // Phone number exchange happens only after both parties agree to the trade
    }
  },

  // Section 2: User Behavior and Interaction
  userBehavior: {
    // Allow small variations in the way users respond. This helps accommodate typos or synonyms.
    allowedResponseVariations: true,

    // Questions we ask the new users. Each question has a structure and validation for their answers.
    userQuestions: [
      {
        question: "What is your preferred currency for trading?",
        type: "multiple-choice", // The answer should be selected from the given options.
        options: ['DZD', 'USD', 'EUR', 'GBP', 'RMB'], // The possible answers (currencies) for this question.
        expectedAnswer: (answer) => context.community.supportedCurrencies.includes(answer) // Validates the answer based on the supported currencies.
      },
      {
        question: "Please specify if you're interested in buying or selling.",
        type: "open-ended", // Open-ended answer (no restrictions on response style).
        expectedAnswer: (answer) => answer.toLowerCase().includes('buy') || answer.toLowerCase().includes('sell') // Validates that the response contains "buy" or "sell".
      }
    ],
  },

  // Section 3: Trade Management
  tradeManagement: {
    // This function allows users to post announcements about their buying/selling intentions.
    postAnnouncement: function (user, announcement) {
      // Logic to post an announcement from a user to the community chat.
      // In a real system, this would save to a database and notify others.
      console.log(`${user} posted: ${announcement}`);
    },

    // This function handles sending private messages between users.
    sendMessage: function (sender, receiver, message) {
      // Logic to send messages to another user.
      // This would save to a real-time chat service, such as Firebase or WebSockets.
      console.log(`${sender} sent a message to ${receiver}: ${message}`);
    },

    // This function is called when two users agree to a deal and need to share contact details.
    sharePhoneNumber: function (buyer, seller) {
      // Logic to share phone numbers only after both users have agreed to proceed with the trade.
      // This prevents unnecessary exposure of personal information.
      console.log(`Sharing phone number between ${buyer} and ${seller}`);
    },
  },

  // Section 4: Application Features (such as sign-up and group chat)
  appFeatures: {
    // In-memory user store
    users: [],

    // Add the specified user directly
    initializeUsers: function() {
      this.users.push({
        name: 'Soufiane',
        email: 'soufian3hm@gmail.com',
        password: 'Soufian3.hm',
        preferredCurrency: 'DZD'
      });
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
          // Add user to the in-memory store
          this.users.push(userData);
          resolve();
        }, 1000);
      });
    },

    // This function handles user login (using their credentials, such as email).
    logIn: function (userCredentials) {
      const user = this.users.find(user => user.email === userCredentials.email && user.password === userCredentials.password);
      if (user) {
        console.log(`User logged in: ${userCredentials.email}`);
        return user; // Return user data if login is successful
      } else {
        console.log('Login failed: Invalid credentials');
        throw new Error('Invalid credentials');
      }
    },

    // This function allows users to join a group chat based on their preferences (buying or selling).
    joinGroupChat: function (user, group) {
      // Logic to allow users to join a specific group chat for either buying or selling.
      // The group name could be based on the currency or trade type.
      console.log(`${user} joined the ${group} group chat.`);
    }
  },

  // Section 5: Language Processing for User Responses
  languageProcessing: {
    // This function processes user answers, ensuring minor variations are accepted (e.g., synonyms or typos).
    processAnswer: function (answer) {
      // Example: If the user types "buying" instead of "buy," we map it to the expected word "buy".
      const synonyms = {
        'buy': ['purchase', 'buying', 'buy'],
        'sell': ['offer', 'selling', 'sell']
      };

      // Loop through each synonym set and check if the user's answer matches any of the alternatives
      for (let key in synonyms) {
        if (synonyms[key].includes(answer.toLowerCase())) {
          return key; // Return the normalized word (either "buy" or "sell").
        }
      }
      
      return answer; // If no match, return the original answer.
    }
  }
};

// Exporting the context to be used in other parts of the application
module.exports = context;
