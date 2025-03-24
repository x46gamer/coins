import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Login() {
  const navigate = useNavigate();
  const { login, googleSignIn } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/');
    } catch (err) {
      setError('Google sign-in failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
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
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleGoogleSignIn}
                  >
                    <i className="fab fa-google me-2"></i>
                    Sign in with Google
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{' '}
                  <span
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 