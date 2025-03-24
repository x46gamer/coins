import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Navbar() {
  const { user, logout, isAdmin } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Don't show navbar for non-authenticated users
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Currency Exchange
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/trade' ? 'active' : ''}`}
                to="/trade"
              >
                Trade Center
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/group-chat' ? 'active' : ''}`}
                to="/group-chat"
              >
                Group Chat
              </Link>
            </li>
          </ul>

          <div className="navbar-nav ms-auto">
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`nav-link admin ${location.pathname === '/admin' ? 'active' : ''}`}
              >
                <i className="fas fa-shield-alt"></i>
                Admin Panel
              </Link>
            )}

            <div className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <img 
                  src={user.photoURL || 'https://via.placeholder.com/32'} 
                  alt={user.name}
                  className="rounded-circle me-2"
                  style={{ width: '32px', height: '32px' }}
                />
                {user.name}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">Profile</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 