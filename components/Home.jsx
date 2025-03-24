import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import context from '../context';

function Home() {
  const { user } = useUser();

  return (
    <div className="home">
      <div className="hero-section">
        <h1>{context.community.name}</h1>
        <p>{context.community.description}</p>
      </div>

      <div className="features-section">
        <h2>Supported Currencies</h2>
        <div className="currency-grid">
          {context.community.supportedCurrencies.map(currency => (
            <div key={currency} className="currency-card">
              {currency}
            </div>
          ))}
        </div>

        {!user && (
          <div className="cta-section">
            <h2>Get Started Today</h2>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home; 