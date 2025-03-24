import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signUp, googleSignIn } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    preferredCurrency: 'DZD'
  });

  return (
    <div className="auth-page">
      <div className="auth-container glass-effect">
        <motion.div 
          className="auth-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="auth-header">
            <h1>Welcome to CurrencyX</h1>
            <p>The next generation of currency exchange</p>
          </div>

          <div className="auth-tabs">
            <button 
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form className="auth-form">
            {!isLogin && (
              <motion.div 
                className="form-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <label>Full Name</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </motion.div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {!isLogin && (
              <motion.div 
                className="form-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <label>Preferred Currency</label>
                <select 
                  className="form-input"
                  value={formData.preferredCurrency}
                  onChange={(e) => setFormData({...formData, preferredCurrency: e.target.value})}
                >
                  <option value="DZD">DZD</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="RMB">RMB</option>
                </select>
              </motion.div>
            )}

            <button className="auth-button primary">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <div className="divider">or</div>

            <button 
              className="auth-button google"
              onClick={googleSignIn}
            >
              <img src="/google-icon.svg" alt="Google" />
              Continue with Google
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth; 