import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();

  const menuItems = [
    {
      path: '/',
      icon: '🏠',
      label: 'Home'
    },
    {
      path: '/trade',
      icon: '💱',
      label: 'Trade Center'
    },
    {
      path: '/chat',
      icon: '💬',
      label: 'Group Chat'
    },
    {
      path: '/profile',
      icon: '👤',
      label: 'Profile'
    }
  ];

  return (
    <motion.div 
      className="sidebar"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
    >
      <div className="sidebar-header">
        <img src={user.photoURL} alt={user.name} className="user-avatar" />
        <div className="user-info">
          <h3>{user.name}</h3>
          <span>{user.preferredCurrency}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {location.pathname === item.path && (
              <motion.div
                className="nav-indicator"
                layoutId="indicator"
              />
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar; 