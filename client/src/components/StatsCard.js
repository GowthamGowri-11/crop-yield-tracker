import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, color = '#4caf50' }) => {
  return (
    <div className="stats-card" style={{ '--accent-color': color }}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;