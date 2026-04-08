import React from 'react';
import './YieldCard.css';

const YieldCard = ({ yield_entry, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCropIcon = (cropType) => {
    const icons = {
      'Rice': '🌾',
      'Wheat': '🌾',
      'Corn': '🌽',
      'Tomatoes': '🍅',
      'Potatoes': '🥔',
      'Onions': '🧅',
      'Carrots': '🥕',
      'Cotton': '🌿',
      'Soybeans': '🫘',
      'Barley': '🌾',
      'Sugarcane': '🎋'
    };
    return icons[cropType] || '🌱';
  };

  return (
    <div className="yield-card">
      <div className="yield-header">
        <div className="crop-info">
          <span className="crop-icon">{getCropIcon(yield_entry.cropType)}</span>
          <h3>{yield_entry.cropType}</h3>
        </div>
        <div className="yield-weight">
          {yield_entry.weight} {yield_entry.unit}
        </div>
      </div>
      
      <div className="yield-details">
        <div className="detail-row">
          <span className="label">👨‍🌾 Farmer:</span>
          <span className="value">{yield_entry.farmerName}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">📍 Location:</span>
          <span className="value">{yield_entry.location}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">📅 Harvest Date:</span>
          <span className="value">{formatDate(yield_entry.harvestDate)}</span>
        </div>
        
        {yield_entry.notes && (
          <div className="detail-row notes">
            <span className="label">📝 Notes:</span>
            <span className="value">{yield_entry.notes}</span>
          </div>
        )}
      </div>
      
      <div className="yield-footer">
        <span className="entry-date">
          Recorded: {formatDate(yield_entry.createdAt)}
        </span>
        <div className="card-actions">
          <button 
            className="edit-btn" 
            onClick={() => onEdit && onEdit(yield_entry)}
            title="Edit entry"
          >
            ✏️
          </button>
          <button 
            className="delete-btn" 
            onClick={() => onDelete && onDelete(yield_entry._id)}
            title="Delete entry"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default YieldCard;