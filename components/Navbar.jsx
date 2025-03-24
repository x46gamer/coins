import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Currency Exchange</Link>
      </div>
      
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/trade">Trade Center</Link>
            <Link to="/group-chat">Group Chat</Link>
            <span className="user-info">
              {user.name} ({user.preferredCurrency})
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 