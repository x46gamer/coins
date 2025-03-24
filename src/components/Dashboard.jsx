import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: '💱',
      title: 'New Trade',
      description: 'Create a new trade request',
      path: '/trade',
      color: 'var(--primary)'
    },
    {
      icon: '💬',
      title: 'Messages',
      description: 'Check your trade messages',
      path: '/chat',
      color: 'var(--secondary)'
    },
    {
      icon: '📊',
      title: 'Market Rates',
      description: 'View current exchange rates',
      path: '/rates',
      color: 'var(--success)'
    }
  ];

  const recentTrades = [
    {
      id: 1,
      type: 'buy',
      currency: 'USD',
      amount: 1000,
      rate: 137.5,
      status: 'completed',
      date: '2024-01-15'
    },
    // Add more trades
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <motion.div 
        className="welcome-section glass-effect"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="welcome-content">
          <h1>Welcome back, {user.name}! 👋</h1>
          <p>Here's what's happening with your trades today</p>
        </div>
        <div className="quick-stats">
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <div className="stat-info">
              <h3>Total Trades</h3>
              <p>23 trades</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <div className="stat-info">
              <h3>Rating</h3>
              <p>4.9/5</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="quick-actions-grid">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            className="action-card glass-effect"
            onClick={() => navigate(action.path)}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="action-icon" style={{ background: action.color }}>
              {action.icon}
            </span>
            <h3>{action.title}</h3>
            <p>{action.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Live Exchange Rates */}
      <motion.div 
        className="exchange-rates-section glass-effect"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2>Live Exchange Rates</h2>
        <div className="rates-slider">
          <div className="rate-card">
            <span className="currency-pair">USD/DZD</span>
            <span className="rate-value">137.50</span>
            <span className="rate-change positive">+0.5%</span>
          </div>
          {/* Add more rate cards */}
        </div>
      </motion.div>

      {/* Recent Trades */}
      <motion.div 
        className="recent-trades-section glass-effect"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2>Recent Trades</h2>
        <div className="trades-table">
          <div className="table-header">
            <span>Type</span>
            <span>Currency</span>
            <span>Amount</span>
            <span>Rate</span>
            <span>Status</span>
          </div>
          {recentTrades.map(trade => (
            <motion.div 
              key={trade.id}
              className="table-row"
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <span className={`trade-type ${trade.type}`}>
                {trade.type.toUpperCase()}
              </span>
              <span>{trade.currency}</span>
              <span>{trade.amount}</span>
              <span>{trade.rate}</span>
              <span className={`status ${trade.status}`}>
                {trade.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 