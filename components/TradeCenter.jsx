import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import context from '../context';

function TradeCenter() {
  const { user } = useUser();
  const [announcement, setAnnouncement] = useState('');
  const [trades, setTrades] = useState([]);

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (announcement.trim()) {
      const tradePost = {
        id: Date.now(),
        user: user.name,
        currency: user.preferredCurrency,
        content: announcement,
        timestamp: new Date().toISOString(),
        type: user.tradeType
      };
      
      context.tradeManagement.postAnnouncement(user.name, announcement);
      setTrades(prev => [tradePost, ...prev]);
      setAnnouncement('');
    }
  };

  return (
    <div className="trade-center">
      <div className="announcements-section">
        <h2>Post Trade Announcement</h2>
        <form onSubmit={handlePostAnnouncement}>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder={`What ${user?.tradeType === 'buy' ? 'currency are you looking to buy?' : 'are you offering to sell?'}`}
          />
          <button type="submit">Post Announcement</button>
        </form>
      </div>

      <div className="trades-list">
        <h2>Recent Trade Posts</h2>
        {trades.map(trade => (
          <div key={trade.id} className="trade-post">
            <div className="trade-header">
              <span className="trader-name">{trade.user}</span>
              <span className="trade-type">{trade.type.toUpperCase()}</span>
              <span className="trade-currency">{trade.currency}</span>
            </div>
            <p className="trade-content">{trade.content}</p>
            <span className="trade-timestamp">
              {new Date(trade.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TradeCenter; 