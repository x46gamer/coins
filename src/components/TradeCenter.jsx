import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import context from '../context';

const TradeCenter = () => {
  const { user } = useUser();
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');

  const trades = [
    {
      id: 1,
      user: 'Ahmed',
      type: 'sell',
      currency: 'DZD',
      amount: 15000,
      rate: 1.2,
      status: 'active'
    },
    // Add more mock trades
  ];

  return (
    <div className="trade-center">
      <motion.div 
        className="trade-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Trade Center</h1>
        <div className="currency-stats">
          <div className="stat-card">
            <span className="stat-label">DZD/USD</span>
            <span className="stat-value">137.25</span>
            <span className="stat-change positive">+0.5%</span>
          </div>
          {/* Add more currency pairs */}
        </div>
      </motion.div>

      <div className="trade-content">
        <motion.div 
          className="trade-form-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="trade-form glass-effect">
            <h2>Create Trade Request</h2>
            <div className="form-group">
              <label>Trade Type</label>
              <div className="trade-type-toggle">
                <button 
                  className={`toggle-btn ${tradeType === 'buy' ? 'active' : ''}`}
                  onClick={() => setTradeType('buy')}
                >
                  Buy
                </button>
                <button 
                  className={`toggle-btn ${tradeType === 'sell' ? 'active' : ''}`}
                  onClick={() => setTradeType('sell')}
                >
                  Sell
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Currency</label>
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="form-input"
              >
                <option value="">Select Currency</option>
                {context.community.supportedCurrencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                placeholder="Enter amount"
              />
            </div>

            <button className="submit-btn">
              Create Trade Request
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="active-trades"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Active Trades</h2>
          <div className="trades-list">
            {trades.map(trade => (
              <motion.div 
                key={trade.id}
                className="trade-card glass-effect"
                whileHover={{ scale: 1.02 }}
              >
                <div className="trade-card-header">
                  <span className={`trade-type ${trade.type}`}>
                    {trade.type.toUpperCase()}
                  </span>
                  <span className="trade-amount">
                    {trade.amount} {trade.currency}
                  </span>
                </div>
                <div className="trade-card-content">
                  <div className="trade-info">
                    <span>Rate: {trade.rate}</span>
                    <span>User: {trade.user}</span>
                  </div>
                  <button className="trade-action-btn">
                    Contact Trader
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TradeCenter; 