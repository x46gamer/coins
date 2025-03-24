import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import context from '../context';

function SignUp() {
  const navigate = useNavigate();
  const { login, googleSignIn } = useUser();
  const [name, setName] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('DZD');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, preferredCurrency };

    console.log('Form submitted:', userData);

    try {
      await context.appFeatures.signUp(userData);
      login(userData);
      console.log('User signed up successfully');
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currency" className="form-label">Preferred Currency</label>
          <select
            className="form-select"
            id="currency"
            value={preferredCurrency}
            onChange={(e) => setPreferredCurrency(e.target.value)}
          >
            <option value="DZD">DZD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="RMB">RMB</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <button onClick={handleGoogleSignIn} className="btn btn-danger mt-3">Sign Up with Google</button>
    </div>
  );
}

export default SignUp; 