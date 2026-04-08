# 🌾 Crop Yield Tracker

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for tracking and analyzing crop harvest data. This application helps farmers and agricultural analysts record, manage, and visualize crop yield information with advanced filtering and analytics capabilities.

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-green)
![React](https://img.shields.io/badge/react-18.x-blue)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- 📝 **Crop Yield Recording** - Add, edit, and delete harvest records
- 📊 **Real-time Statistics** - View comprehensive yield analytics
- 🔍 **Advanced Filtering** - Filter by crop type, date range, farmer, location, weight
- 📈 **Analytics Dashboard** - Visualize trends and performance metrics
- 👨‍🌾 **Farmer Management** - Track individual farmer performance
- 📍 **Location Tracking** - Monitor yields by farm location
- 🌾 **Crop Comparison** - Compare multiple crops side-by-side
- 🏆 **Top Performers** - Identify best performing farmers, locations, and crops

### Technical Features
- ✅ RESTful API with comprehensive endpoints
- ✅ MongoDB aggregation pipelines for analytics
- ✅ Responsive design for mobile and desktop
- ✅ Real-time data updates
- ✅ Pagination and sorting
- ✅ Search functionality across multiple fields
- ✅ Error handling and validation
- ✅ Clean and modular component architecture

## 🛠 Tech Stack

### Frontend
- **React.js** (v18.x) - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with modern features
- **React Hooks** - State management

### Backend
- **Node.js** (v14+) - Runtime environment
- **Express.js** (v4.x) - Web framework
- **MongoDB** (v4+) - NoSQL database
- **Mongoose** (v7.x) - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Development Tools
- **Nodemon** - Auto-restart server
- **Concurrently** - Run multiple commands
- **Create React App** - React boilerplate

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version`

- **MongoDB** (v4.0 or higher)
  - Download: https://www.mongodb.com/try/download/community
  - Verify: `mongod --version`

- **npm** (comes with Node.js)
  - Verify: `npm --version`

- **Git** (optional, for cloning)
  - Download: https://git-scm.com/

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/crop-yield-tracker.git
cd crop-yield-tracker
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Set Up MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud database):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/farmer-app

# Server Configuration
PORT=5000

# Optional: MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farmer-app
```

### Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/farmer-app` |
| `PORT` | Backend server port | `5000` |

## 🏃 Running the Application

### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Option 3: Production Build
```bash
cd client
npm run build
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Main Endpoints

#### 1. Get All Crop Yields
```http
GET /api/crop-yields
```

**Query Parameters:**
- `cropType` - Filter by crop type
- `farmerName` - Filter by farmer name
- `location` - Filter by location
- `minWeight` - Minimum weight filter
- `maxWeight` - Maximum weight filter
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `search` - Search across fields
- `sortBy` - Sort field (default: harvestDate)
- `sortOrder` - asc or desc (default: desc)
- `limit` - Results per page (default: 50)
- `page` - Page number (default: 1)

**Example:**
```bash
curl http://localhost:5000/api/crop-yields?cropType=Rice&limit=10
```

#### 2. Get Statistics
```http
GET /api/crop-yields/stats
```

**Query Parameters:**
- `startDate` - Filter start date
- `endDate` - Filter end date
- `cropType` - Filter by crop
- `location` - Filter by location

#### 3. Add New Crop Yield
```http
POST /api/crop-yields
```

**Request Body:**
```json
{
  "farmerName": "John Doe",
  "cropType": "Rice",
  "weight": 150.5,
  "unit": "kg",
  "harvestDate": "2024-03-15",
  "location": "Farm A",
  "notes": "Good harvest season"
}
```

#### 4. Update Crop Yield
```http
PUT /api/crop-yields/:id
```

#### 5. Delete Crop Yield
```http
DELETE /api/crop-yields/:id
```

#### 6. Get Farmer Statistics
```http
GET /api/farmers/stats
```

#### 7. Get Location Statistics
```http
GET /api/locations/stats
```

#### 8. Compare Crops
```http
GET /api/crop-yields/compare?crops=Rice,Wheat,Corn
```

#### 9. Get Top Performers
```http
GET /api/top-performers?type=farmers&limit=5&period=month
```

**Parameters:**
- `type` - farmers, locations, or crops
- `limit` - Number of results
- `period` - week, month, year, or all

#### 10. Get Monthly Trends
```http
GET /api/crop-yields/trends?year=2024
```

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 📁 Project Structure

```
crop-yield-tracker/
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── YieldForm.js
│   │   │   ├── YieldForm.css
│   │   │   ├── YieldCard.js
│   │   │   ├── YieldCard.css
│   │   │   ├── StatsCard.js
│   │   │   ├── StatsCard.css
│   │   │   ├── FilterBar.js
│   │   │   ├── FilterBar.css
│   │   │   ├── Analytics.js
│   │   │   └── Analytics.css
│   │   ├── App.js              # Main app component
│   │   ├── App.css             # Main styles
│   │   └── index.js            # Entry point
│   └── package.json
├── server.js                    # Express server
├── package.json                 # Backend dependencies
├── .env                         # Environment variables
├── .gitignore
├── README.md                    # This file
├── API_DOCUMENTATION.md         # Complete API docs
├── BACKEND_LINKS.md            # Quick reference links
├── test-api.html               # API testing tool
└── test-db.js                  # Database connection test

```

## 📖 Usage Guide

### Adding a New Harvest Record

1. Navigate to http://localhost:3000
2. Fill in the form on the left:
   - Farmer Name
   - Crop Type (select from dropdown)
   - Weight and Unit
   - Harvest Date
   - Farm Location
   - Optional Notes
3. Click "Record Harvest"

### Viewing Statistics

The dashboard shows:
- Total entries
- Total yield
- Number of unique farmers
- Number of locations

### Filtering Data

Use the filter bar to:
- Search by farmer name, location, or notes
- Filter by crop type
- Sort by different fields
- Filter by date range

### Viewing Analytics

Click the "Analytics" tab to see:
- Top performing farmers
- Monthly yield trends
- Yield distribution charts

### Deleting Records

Click the delete button (🗑️) on any harvest card to remove it.

## 🖼 Screenshots

### Dashboard View
The main dashboard displays statistics, filters, and harvest records.

### Analytics View
Comprehensive analytics with charts and performance metrics.

### Mobile Responsive
Fully responsive design works on all devices.

## 🧪 Testing

### Test Database Connection
```bash
npm run test-db
```

### Test API Endpoints
Open `test-api.html` in your browser to interactively test all endpoints.

### Manual Testing with cURL
```bash
# Get all yields
curl http://localhost:5000/api/crop-yields

# Get statistics
curl http://localhost:5000/api/crop-yields/stats

# Add new yield
curl -X POST http://localhost:5000/api/crop-yields \
  -H "Content-Type: application/json" \
  -d '{"farmerName":"Test","cropType":"Rice","weight":100,"unit":"kg","harvestDate":"2024-03-15","location":"Test Farm"}'
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod

# Or on Linux/Mac
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in .env file
PORT=5001
```

### Frontend Not Loading
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS Issues
Make sure the backend has CORS enabled (already configured in server.js)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- MongoDB for the database
- React team for the amazing framework
- Express.js for the backend framework
- All contributors and users

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Export data to CSV/Excel
- [ ] Advanced data visualization with charts
- [ ] Weather integration
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Backup and restore functionality

## 📊 Database Schema

### CropYield Collection
```javascript
{
  farmerName: String (required),
  cropType: String (required),
  weight: Number (required),
  unit: String (required, default: 'kg'),
  harvestDate: Date (required),
  location: String (required),
  notes: String (optional),
  createdAt: Date (auto-generated)
}
```

## 🌐 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Deploy to Vercel (Frontend)
```bash
cd client
vercel
```

### MongoDB Atlas (Production Database)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in production environment

---

**Made with ❤️ for farmers and agricultural analysts**