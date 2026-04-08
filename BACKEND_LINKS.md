# 🌾 Crop Yield Tracker - Backend API Links

## 🚀 Backend Server
**Base URL:** `http://localhost:5000`

---

## 📊 Quick Access Links

### Main Endpoints (Click to Test in Browser)

1. **Get All Crop Yields**
   - http://localhost:5000/api/crop-yields
   - With filters: http://localhost:5000/api/crop-yields?cropType=Rice&sortBy=weight&sortOrder=desc

2. **Get Statistics**
   - http://localhost:5000/api/crop-yields/stats
   - With date filter: http://localhost:5000/api/crop-yields/stats?startDate=2024-01-01

3. **Get Farmer Statistics**
   - http://localhost:5000/api/farmers/stats

4. **Get Monthly Trends**
   - http://localhost:5000/api/crop-yields/trends
   - Specific year: http://localhost:5000/api/crop-yields/trends?year=2024

5. **Get Location Statistics**
   - http://localhost:5000/api/locations/stats

6. **Compare Crops**
   - http://localhost:5000/api/crop-yields/compare?crops=Rice,Wheat,Corn

7. **Get Top Performers**
   - Top Farmers: http://localhost:5000/api/top-performers?type=farmers&limit=5
   - Top Locations: http://localhost:5000/api/top-performers?type=locations&limit=5
   - Top Crops: http://localhost:5000/api/top-performers?type=crops&limit=5
   - This Month: http://localhost:5000/api/top-performers?type=farmers&period=month

---

## 🧪 Testing Tools

### 1. Browser Testing
Open any GET endpoint directly in your browser:
```
http://localhost:5000/api/crop-yields/stats
```

### 2. Interactive API Tester
Open the test file in your browser:
```
file:///[YOUR_PATH]/test-api.html
```

### 3. cURL Commands

**Get all yields:**
```bash
curl http://localhost:5000/api/crop-yields
```

**Get statistics:**
```bash
curl http://localhost:5000/api/crop-yields/stats
```

**Add new yield (POST):**
```bash
curl -X POST http://localhost:5000/api/crop-yields \
  -H "Content-Type: application/json" \
  -d '{
    "farmerName": "John Doe",
    "cropType": "Rice",
    "weight": 150.5,
    "unit": "kg",
    "harvestDate": "2024-03-15",
    "location": "Farm A",
    "notes": "Good harvest"
  }'
```

---

## 🔍 Advanced Filtering Examples

### Filter by Crop Type
```
http://localhost:5000/api/crop-yields?cropType=Rice
```

### Filter by Date Range
```
http://localhost:5000/api/crop-yields?startDate=2024-01-01&endDate=2024-12-31
```

### Search Across Fields
```
http://localhost:5000/api/crop-yields?search=John
```

### Filter by Weight Range
```
http://localhost:5000/api/crop-yields?minWeight=100&maxWeight=500
```

### Combined Filters
```
http://localhost:5000/api/crop-yields?cropType=Rice&minWeight=100&sortBy=weight&sortOrder=desc&limit=10
```

### Filter by Farmer
```
http://localhost:5000/api/crop-yields?farmerName=John
```

### Filter by Location
```
http://localhost:5000/api/crop-yields?location=Farm
```

---

## 📈 Analytics Endpoints

### Crop Comparison
```
http://localhost:5000/api/crop-yields/compare?crops=Rice,Wheat,Corn,Barley
```

### Top Performers (This Week)
```
http://localhost:5000/api/top-performers?type=farmers&period=week&limit=10
```

### Top Performers (This Month)
```
http://localhost:5000/api/top-performers?type=farmers&period=month&limit=10
```

### Top Performers (This Year)
```
http://localhost:5000/api/top-performers?type=farmers&period=year&limit=10
```

### Location Performance
```
http://localhost:5000/api/locations/stats
```

---

## 🎯 Frontend Integration

The React frontend is already integrated and running on:
```
http://localhost:3000
```

All API calls are automatically made from the frontend to the backend.

---

## ✅ Server Status Check

To verify the backend is running:
```
http://localhost:5000/api/crop-yields/stats
```

If you see JSON data, the server is working correctly!

---

## 📝 Notes

- All GET endpoints can be tested directly in the browser
- POST, PUT, DELETE endpoints require tools like Postman or cURL
- The frontend React app handles all CRUD operations automatically
- MongoDB must be running for the backend to work
- Default port: 5000 (can be changed in .env file)

---

## 🐛 Troubleshooting

**If you get "Cannot GET /":**
- The backend is running but you're accessing the root URL
- Use the specific API endpoints listed above

**If you get connection errors:**
- Make sure the backend server is running: `npm run server`
- Check if MongoDB is running
- Verify the port is 5000

**If you get empty data:**
- Add some crop yield entries through the frontend first
- Or use the POST endpoint to add test data