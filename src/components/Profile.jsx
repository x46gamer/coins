import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import context from '../context';

function Profile() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Active currency trader specializing in DZD/USD exchanges. Known for quick responses and secure transactions.',
    location: 'Algiers',
    preferredCurrency: user?.preferredCurrency || 'DZD',
    phone: '',
    notifications: true,
    level: 3,
    points: 82,
    pointsToNextLevel: 18,
    trades: 23,
    successRate: '98%',
    responseTime: '~2h'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', profileData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-container">
            <img 
              src={user?.photoURL || 'https://via.placeholder.com/150'} 
              alt={user?.name}
              className="profile-avatar"
            />
            <span className="level-badge">{profileData.level}</span>
          </div>
        </div>
        
        <div className="profile-info-header">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="edit-input"
                placeholder="Your name"
              />
            </div>
          ) : (
            <div className="profile-name-section">
              <h1>{profileData.name}</h1>
              <div className="profile-badges">
                <span className="badge verified-badge">
                  <i className="fas fa-check-circle"></i> Verified Trader
                </span>
              </div>
            </div>
          )}

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{profileData.trades}</span>
              <span className="stat-label">Completed Trades</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profileData.successRate}</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profileData.responseTime}</span>
              <span className="stat-label">Response Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="about-section">
          <div className="section-header">
            <h2>Trader Information</h2>
            {isEditing ? (
              <button className="save-button" onClick={handleSave}>
                <i className="fas fa-save"></i> Save Changes
              </button>
            ) : (
              <button className="edit-button" onClick={handleEdit}>
                <i className="fas fa-edit"></i> Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Preferred Currency</label>
                <select 
                  name="preferredCurrency" 
                  value={profileData.preferredCurrency}
                  onChange={handleChange}
                  className="edit-input"
                >
                  {context.community.supportedCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  className="edit-input"
                  rows="4"
                  placeholder="Describe your trading style and preferences"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Your location"
                />
              </div>

              <div className="form-group">
                <label>Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Your phone number"
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={profileData.notifications}
                    onChange={handleChange}
                  />
                  Receive trade notifications
                </label>
              </div>
            </div>
          ) : (
            <>
              <p className="bio-text">{profileData.bio}</p>
              <div className="trader-details">
                <div className="detail-item">
                  <i className="fas fa-money-bill-wave"></i>
                  <span>Preferred Currency: {profileData.preferredCurrency}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{profileData.location}</span>
                </div>
                {profileData.phone && (
                  <div className="detail-item">
                    <i className="fas fa-phone"></i>
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="level-section">
            <div className="level-info">
              <span className="level-text">
                <i className="fas fa-star"></i> Level {profileData.level}
              </span>
              <span className="points-text">
                {profileData.points} points • {profileData.pointsToNextLevel} to level up
              </span>
            </div>
            <div className="level-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${(profileData.points / (profileData.points + profileData.pointsToNextLevel)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 