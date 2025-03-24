import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import context from '../context';

function Home() {
  const { user } = useUser();

  return (
    <div className="container mt-5">
      <div className="hero-section text-center">
        <h1>{context.community.name}</h1>
        <p>{context.community.description}</p>
      </div>

      <div className="row mt-4">
        <h2>Supported Currencies</h2>
        {context.community.supportedCurrencies.map(currency => (
          <div className="col-md-2" key={currency}>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">{currency}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!user && (
        <div className="text-center mt-4">
          <h2>Get Started Today</h2>
          <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
          <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Home; 