import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';

const Analytics = () => {
  const [farmerStats, setFarmerStats] = useState([]);
  const [trends, setTrends] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchFarmerStats();
    fetchTrends();
  }, [selectedYear]);

  const fetchFarmerStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/farmers/stats');
      setFarmerStats(response.data);
    } catch (error) {
      console.error('Error fetching farmer stats:', error);
    }
  };

  const fetchTrends = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/crop-yields/trends?year=${selectedYear}`);
      setTrends(response.data);
    } catch (error) {
      console.error('Error fetching trends:', error);
    }
  };

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>📊 Advanced Analytics</h2>
        <div className="year-selector">
          <label>Year:</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {[2024, 2023, 2022, 2021, 2020].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="farmer-performance">
          <h3>👨‍🌾 Top Performing Farmers</h3>
          <div className="farmer-list">
            {farmerStats.slice(0, 5).map((farmer, index) => (
              <div key={farmer._id} className="farmer-item">
                <div className="farmer-rank">#{index + 1}</div>
                <div className="farmer-details">
                  <h4>{farmer._id}</h4>
                  <p>Total Yield: {farmer.totalWeight.toFixed(2)} kg</p>
                  <p>Crops: {farmer.cropTypes} types</p>
                  <p>Locations: {farmer.locationCount}</p>
                  <p>Last Harvest: {new Date(farmer.lastHarvest).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="monthly-trends">
          <h3>📈 Monthly Yield Trends ({selectedYear})</h3>
          <div className="trends-chart">
            {monthNames.map((month, index) => {
              const monthData = trends.find(t => t._id === index + 1);
              const height = monthData ? Math.min((monthData.monthlyTotal / 1000) * 100, 200) : 0;
              
              return (
                <div key={month} className="trend-bar">
                  <div 
                    className="bar" 
                    style={{ height: `${height}px` }}
                    title={`${month}: ${monthData?.monthlyTotal?.toFixed(2) || 0} kg`}
                  ></div>
                  <span className="month-label">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="yield-distribution">
          <h3>🥧 Crop Distribution</h3>
          <div className="distribution-list">
            {farmerStats.slice(0, 8).map((farmer) => (
              <div key={farmer._id} className="distribution-item">
                <span className="farmer-name">{farmer._id}</span>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ 
                      width: `${(farmer.totalWeight / Math.max(...farmerStats.map(f => f.totalWeight))) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="weight">{farmer.totalWeight.toFixed(0)} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;