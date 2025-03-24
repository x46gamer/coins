import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import context from '../context';

function SignUp() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    preferredCurrency: '',
    tradeType: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, this would make an API call
      await context.appFeatures.signUp(formData);
      login(formData);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Join Currency Exchange Community</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <select
          value={formData.preferredCurrency}
          onChange={(e) => setFormData({...formData, preferredCurrency: e.target.value})}
        >
          <option value="">Select Preferred Currency</option>
          {context.community.supportedCurrencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select
          value={formData.tradeType}
          onChange={(e) => setFormData({...formData, tradeType: e.target.value})}
        >
          <option value="">Select Trade Type</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp; 