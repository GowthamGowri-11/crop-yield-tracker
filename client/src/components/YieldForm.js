import React, { useState } from 'react';
import './YieldForm.css';

const YieldForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    farmerName: '',
    cropType: '',
    weight: '',
    unit: 'kg',
    harvestDate: '',
    location: '',
    notes: ''
  });

  const cropTypes = [
    'Rice', 'Wheat', 'Corn', 'Barley', 'Soybeans', 'Cotton', 
    'Sugarcane', 'Potatoes', 'Tomatoes', 'Onions', 'Carrots', 
    'Beans', 'Peas', 'Sunflower', 'Canola', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({
        farmerName: '',
        cropType: '',
        weight: '',
        unit: 'kg',
        harvestDate: '',
        location: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="yield-form">
      <h2>📝 Record New Harvest</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Farmer Name</label>
          <input
            type="text"
            name="farmerName"
            placeholder="Enter farmer name"
            value={formData.farmerName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Crop Type</label>
          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            required
          >
            <option value="">Select Crop Type</option>
            {cropTypes.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Weight</label>
          <div className="weight-input">
            <input
              type="number"
              name="weight"
              placeholder="Enter weight"
              value={formData.weight}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="kg">kg</option>
              <option value="tons">tons</option>
              <option value="lbs">lbs</option>
              <option value="quintals">quintals</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Harvest Date</label>
          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Farm Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter farm location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea
            name="notes"
            placeholder="Additional notes about the harvest"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? '⏳ Recording...' : '📊 Record Harvest'}
        </button>
      </form>
    </div>
  );
};

export default YieldForm;