const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farmer-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// Crop yield schema
const cropYieldSchema = new mongoose.Schema({
  farmerName: { type: String, required: true },
  cropType: { type: String, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true, default: 'kg' },
  harvestDate: { type: Date, required: true },
  location: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const CropYield = mongoose.model('CropYield', cropYieldSchema);

// Routes
// GET - Get yield statistics (MUST BE BEFORE /api/crop-yields/:id)
app.get('/api/crop-yields/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Build date filter
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.harvestDate = {};
      if (startDate) dateFilter.harvestDate.$gte = new Date(startDate);
      if (endDate) dateFilter.harvestDate.$lte = new Date(endDate);
    }

    const stats = await CropYield.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$cropType',
          totalWeight: { $sum: '$weight' },
          averageWeight: { $avg: '$weight' },
          count: { $sum: 1 },
          maxWeight: { $max: '$weight' },
          minWeight: { $min: '$weight' }
        }
      },
      { $sort: { totalWeight: -1 } }
    ]);

    // Overall statistics
    const overallStats = await CropYield.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          totalWeight: { $sum: '$weight' },
          averageWeight: { $avg: '$weight' },
          uniqueFarmers: { $addToSet: '$farmerName' },
          uniqueLocations: { $addToSet: '$location' }
        }
      }
    ]);

    res.json({
      cropStats: stats,
      overall: overallStats[0] ? {
        ...overallStats[0],
        uniqueFarmers: overallStats[0].uniqueFarmers.length,
        uniqueLocations: overallStats[0].uniqueLocations.length
      } : {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Get farmer statistics
app.get('/api/farmers/stats', async (req, res) => {
  try {
    const farmerStats = await CropYield.aggregate([
      {
        $group: {
          _id: '$farmerName',
          totalWeight: { $sum: '$weight' },
          averageWeight: { $avg: '$weight' },
          cropCount: { $sum: 1 },
          crops: { $addToSet: '$cropType' },
          locations: { $addToSet: '$location' },
          lastHarvest: { $max: '$harvestDate' }
        }
      },
      { $sort: { totalWeight: -1 } }
    ]);

    res.json(farmerStats.map(farmer => ({
      ...farmer,
      cropTypes: farmer.crops.length,
      locationCount: farmer.locations.length
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Get monthly yield trends
app.get('/api/crop-yields/trends', async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    const trends = await CropYield.aggregate([
      {
        $match: {
          harvestDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$harvestDate' },
            cropType: '$cropType'
          },
          totalWeight: { $sum: '$weight' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.month',
          crops: {
            $push: {
              cropType: '$_id.cropType',
              totalWeight: '$totalWeight',
              count: '$count'
            }
          },
          monthlyTotal: { $sum: '$totalWeight' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch all crop yields with filtering and sorting
app.get('/api/crop-yields', async (req, res) => {
  try {
    const { 
      cropType, 
      sortBy = 'harvestDate', 
      sortOrder = 'desc', 
      startDate, 
      endDate,
      search,
      limit = 50,
      page = 1,
      farmerName,
      location,
      minWeight,
      maxWeight
    } = req.query;

    // Build filter object
    let filter = {};
    
    if (cropType && cropType !== 'All') {
      filter.cropType = cropType;
    }
    
    if (farmerName) {
      filter.farmerName = { $regex: farmerName, $options: 'i' };
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (minWeight || maxWeight) {
      filter.weight = {};
      if (minWeight) filter.weight.$gte = parseFloat(minWeight);
      if (maxWeight) filter.weight.$lte = parseFloat(maxWeight);
    }
    
    if (startDate || endDate) {
      filter.harvestDate = {};
      if (startDate) filter.harvestDate.$gte = new Date(startDate);
      if (endDate) filter.harvestDate.$lte = new Date(endDate);
    }
    
    if (search) {
      filter.$or = [
        { farmerName: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } },
        { cropType: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const cropYields = await CropYield.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await CropYield.countDocuments(filter);

    res.json({
      data: cropYields,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: cropYields.length,
        totalRecords: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add new crop yield entry
app.post('/api/crop-yields', async (req, res) => {
  try {
    const cropYield = new CropYield(req.body);
    const savedCropYield = await cropYield.save();
    res.status(201).json(savedCropYield);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update crop yield entry
app.put('/api/crop-yields/:id', async (req, res) => {
  try {
    const updatedCropYield = await CropYield.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCropYield) {
      return res.status(404).json({ message: 'Crop yield entry not found' });
    }
    
    res.json(updatedCropYield);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete crop yield entry
app.delete('/api/crop-yields/:id', async (req, res) => {
  try {
    const deletedCropYield = await CropYield.findByIdAndDelete(req.params.id);
    
    if (!deletedCropYield) {
      return res.status(404).json({ message: 'Crop yield entry not found' });
    }
    
    res.json({ message: 'Crop yield entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// GET - Get location-based statistics
app.get('/api/locations/stats', async (req, res) => {
  try {
    const locationStats = await CropYield.aggregate([
      {
        $group: {
          _id: '$location',
          totalWeight: { $sum: '$weight' },
          averageWeight: { $avg: '$weight' },
          cropCount: { $sum: 1 },
          uniqueFarmers: { $addToSet: '$farmerName' },
          cropTypes: { $addToSet: '$cropType' }
        }
      },
      { $sort: { totalWeight: -1 } }
    ]);

    res.json(locationStats.map(loc => ({
      ...loc,
      uniqueFarmers: loc.uniqueFarmers.length,
      cropTypes: loc.cropTypes
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Compare crops
app.get('/api/crop-yields/compare', async (req, res) => {
  try {
    const { crops, startDate, endDate } = req.query;
    
    if (!crops) {
      return res.status(400).json({ message: 'Crops parameter is required' });
    }
    
    const cropList = crops.split(',').map(c => c.trim());
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.harvestDate = {};
      if (startDate) dateFilter.harvestDate.$gte = new Date(startDate);
      if (endDate) dateFilter.harvestDate.$lte = new Date(endDate);
    }
    
    const comparison = await CropYield.aggregate([
      { 
        $match: { 
          cropType: { $in: cropList },
          ...dateFilter
        } 
      },
      {
        $group: {
          _id: '$cropType',
          totalWeight: { $sum: '$weight' },
          averageWeight: { $avg: '$weight' },
          count: { $sum: 1 },
          maxWeight: { $max: '$weight' },
          minWeight: { $min: '$weight' },
          farmers: { $addToSet: '$farmerName' }
        }
      },
      { $sort: { totalWeight: -1 } }
    ]);

    res.json(comparison.map(crop => ({
      ...crop,
      farmerCount: crop.farmers.length
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Top performers
app.get('/api/top-performers', async (req, res) => {
  try {
    const { type = 'farmers', limit = 10, period = 'all' } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    if (period === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter.harvestDate = { $gte: weekAgo };
    } else if (period === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFilter.harvestDate = { $gte: monthAgo };
    } else if (period === 'year') {
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      dateFilter.harvestDate = { $gte: yearAgo };
    }
    
    let groupField = '$farmerName';
    if (type === 'locations') groupField = '$location';
    if (type === 'crops') groupField = '$cropType';
    
    const topPerformers = await CropYield.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: groupField,
          totalWeight: { $sum: '$weight' },
          averageWeight: { $avg: '$weight' },
          count: { $sum: 1 },
          lastEntry: { $max: '$harvestDate' }
        }
      },
      { $sort: { totalWeight: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json(topPerformers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});