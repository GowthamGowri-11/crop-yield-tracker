import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange, onSearch, searchTerm }) => {
  const cropTypes = [
    'All', 'Rice', 'Wheat', 'Corn', 'Barley', 'Soybeans', 'Cotton', 
    'Sugarcane', 'Potatoes', 'Tomatoes', 'Onions', 'Carrots', 'Other'
  ];

  const sortOptions = [
    { value: 'harvestDate', label: 'Harvest Date' },
    { value: 'weight', label: 'Weight' },
    { value: 'cropType', label: 'Crop Type' },
    { value: 'farmerName', label: 'Farmer Name' }
  ];

  return (
    <div className="filter-bar">
      <div className="search-section">
        <div className="search-input">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by farmer name, location, or notes..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="filter-section">
        <div className="filter-group">
          <label>Crop Type:</label>
          <select
            value={filters.cropType}
            onChange={(e) => onFilterChange('cropType', e.target.value)}
          >
            {cropTypes.map(crop => (
              <option key={crop} value={crop === 'All' ? '' : crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Order:</label>
          <select
            value={filters.sortOrder}
            onChange={(e) => onFilterChange('sortOrder', e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range:</label>
          <div className="date-range">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              placeholder="Start Date"
            />
            <span>to</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              placeholder="End Date"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;