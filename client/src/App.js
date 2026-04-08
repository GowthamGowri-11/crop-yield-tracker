import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YieldForm from './components/YieldForm';
import StatsCard from './components/StatsCard';
import YieldCard from './components/YieldCard';
import FilterBar from './components/FilterBar';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const [cropYields, setCropYields] = useState([]);
  const [stats, setStats] = useState({ cropStats: [], overall: {} });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({
    cropType: '',
    sortBy: 'harvestDate',
    sortOrder: 'desc',
    startDate: '',
    endDate: ''
  });

  const API_URL = 'http://localhost:5000/api/crop-yields';

  // Fetch crop yields data
  useEffect(() => {
    fetchCropYields();
    fetchStats();
  }, [filters, searchTerm]);

  const fetchCropYields = async () => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        search: searchTerm
      };
      
      const response = await axios.get(API_URL, { params });
      setCropYields(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching crop yields:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      await axios.post(API_URL, formData);
      fetchCropYields();
      fetchStats();
      alert('Crop yield recorded successfully!');
    } catch (error) {
      console.error('Error saving crop yield:', error);
      alert('Error saving data. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCropYields();
        fetchStats();
        alert('Entry deleted successfully!');
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Error deleting entry. Please try again.');
      }
    }
  };

  const handleEdit = (yieldEntry) => {
    // For now, just show an alert. You can implement edit functionality later
    alert('Edit functionality coming soon!');
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getTotalYield = () => {
    return cropYields.reduce((total, crop) => total + crop.weight, 0).toFixed(2);
  };

  const getUniqueLocations = () => {
    const locations = new Set(cropYields.map(crop => crop.location));
    return locations.size;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌾 Crop Yield Tracker</h1>
        <p>Track and manage your harvest data efficiently</p>
        <div className="nav-tabs">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>
      </header>
      
      {activeTab === 'dashboard' ? (
        <div className="container">
          <div className="form-section">
            <YieldForm onSubmit={handleFormSubmit} loading={loading} />
          </div>

          <div className="data-section">
            <div className="stats-section">
              <h2>📈 Dashboard Overview</h2>
              <div className="stats-grid">
                <StatsCard
                  title="Total Entries"
                  value={stats.overall.totalEntries || cropYields.length}
                  icon="📊"
                  color="#4caf50"
                />
                <StatsCard
                  title="Total Yield"
                  value={`${stats.overall.totalWeight?.toFixed(2) || getTotalYield()} kg`}
                  icon="⚖️"
                  color="#ff9800"
                />
                <StatsCard
                  title="Unique Farmers"
                  value={stats.overall.uniqueFarmers || 0}
                  icon="👨‍🌾"
                  color="#2196f3"
                />
                <StatsCard
                  title="Locations"
                  value={stats.overall.uniqueLocations || getUniqueLocations()}
                  icon="📍"
                  color="#9c27b0"
                />
              </div>
            </div>

            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              searchTerm={searchTerm}
            />

            <div className="yields-section">
              <h2>🌾 Harvest Records ({cropYields.length})</h2>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <div className="yields-list">
                  {cropYields.map((yieldEntry) => (
                    <YieldCard
                      key={yieldEntry._id}
                      yield_entry={yieldEntry}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                  {cropYields.length === 0 && (
                    <div className="no-data">
                      <p>No harvest records found. Add your first entry above!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {stats.cropStats && stats.cropStats.length > 0 && (
              <div className="crop-stats">
                <h2>📊 Crop Performance Summary</h2>
                <div className="crop-stats-list">
                  {stats.cropStats.map((stat) => (
                    <div key={stat._id} className="crop-stat-card">
                      <h4>{stat._id}</h4>
                      <div className="stat-details">
                        <p><strong>Total:</strong> {stat.totalWeight.toFixed(2)} kg</p>
                        <p><strong>Average:</strong> {stat.averageWeight.toFixed(2)} kg</p>
                        <p><strong>Entries:</strong> {stat.count}</p>
                        <p><strong>Max:</strong> {stat.maxWeight?.toFixed(2)} kg</p>
                        <p><strong>Min:</strong> {stat.minWeight?.toFixed(2)} kg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="analytics-container">
          <Analytics />
        </div>
      )}
    </div>
  );
}

export default App;
