import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import context from '../context';
import { useUser } from '../contexts/UserContext';

function AdminPanel() {
  const { ADMIN_EMAILS } = useUser();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [currencies, setCurrencies] = useState(
    context.community.supportedCurrencies.map(currency => ({
      code: currency,
      enabled: true,
      dailyLimit: 10000
    }))
  );

  // Load all users from context
  useEffect(() => {
    setUsers(context.appFeatures.users.map(user => ({
      ...user,
      status: 'active',
      trades: 0,
      successRate: '0%',
      joinDate: new Date().toISOString().split('T')[0],
      isAdmin: ADMIN_EMAILS.includes(user.email)
    })));
  }, [ADMIN_EMAILS]);

  const handleUserStatusChange = (email, newStatus) => {
    setUsers(users.map(user => 
      user.email === email ? { ...user, status: newStatus } : user
    ));
  };

  const handleUserDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.email !== email));
      // In a real app, you'd also remove from context.appFeatures.users
    }
  };

  const handleCurrencyToggle = (currencyCode) => {
    setCurrencies(currencies.map(currency =>
      currency.code === currencyCode ? { ...currency, enabled: !currency.enabled } : currency
    ));
  };

  return (
    <div className="admin-panel">
      <h1 className="admin-title">Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users Management
        </button>
        <button 
          className={`tab-button ${activeTab === 'currencies' ? 'active' : ''}`}
          onClick={() => setActiveTab('currencies')}
        >
          Currencies
        </button>
        <button 
          className={`tab-button ${activeTab === 'trades' ? 'active' : ''}`}
          onClick={() => setActiveTab('trades')}
        >
          Trade History
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          System Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="users-management">
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Login Method</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Preferred Currency</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.email}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.loginMethod || 'email'}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <span className={`role-badge ${user.isAdmin ? 'admin' : 'user'}`}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td>{user.preferredCurrency}</td>
                      <td>{user.joinDate}</td>
                      <td>
                        <div className="action-buttons">
                          {!user.isAdmin && (
                            <>
                              <button 
                                className="action-btn warn"
                                onClick={() => handleUserStatusChange(
                                  user.email, 
                                  user.status === 'active' ? 'suspended' : 'active'
                                )}
                              >
                                {user.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                              <button 
                                className="action-btn danger"
                                onClick={() => handleUserDelete(user.email)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'currencies' && (
          <div className="currencies-management">
            <div className="currency-grid">
              {currencies.map(currency => (
                <div key={currency.code} className="currency-card">
                  <div className="currency-header">
                    <h3>{currency.code}</h3>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={currency.enabled}
                        onChange={() => handleCurrencyToggle(currency.code)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="currency-body">
                    <div className="currency-setting">
                      <label>Daily Limit</label>
                      <input
                        type="number"
                        value={currency.dailyLimit}
                        onChange={(e) => {
                          setCurrencies(currencies.map(c =>
                            c.code === currency.code ? { ...c, dailyLimit: parseInt(e.target.value) } : c
                          ));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel; 