# Crop Yield Tracker - API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Get All Crop Yields (with Advanced Filtering)
**GET** `/api/crop-yields`

**Query Parameters:**
- `cropType` - Filter by crop type (e.g., Rice, Wheat, Corn)
- `sortBy` - Sort field (harvestDate, weight, cropType, farmerName) - Default: harvestDate
- `sortOrder` - Sort order (asc, desc) - Default: desc
- `startDate` - Filter by start date (YYYY-MM-DD)
- `endDate` - Filter by end date (YYYY-MM-DD)
- `search` - Search in farmer name, location, or notes
- `limit` - Number of results per page - Default: 50
- `page` - Page number - Default: 1
- `farmerName` - Filter by specific farmer
- `location` - Filter by location
- `minWeight` - Minimum weight filter
- `maxWeight` - Maximum weight filter

**Example:**
```
GET http://localhost:5000/api/crop-yields?cropType=Rice&sortBy=weight&sortOrder=desc&limit=10
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "current": 1,
    "total": 5,
    "count": 10,
    "totalRecords": 45
  }
}
```

---

### 2. Get Yield Statistics
**GET** `/api/crop-yields/stats`

**Query Parameters:**
- `startDate` - Filter by start date
- `endDate` - Filter by end date
- `cropType` - Filter by specific crop
- `location` - Filter by location

**Example:**
```
GET http://localhost:5000/api/crop-yields/stats?startDate=2024-01-01&endDate=2024-12-31
```

**Response:**
```json
{
  "cropStats": [
    {
      "_id": "Rice",
      "totalWeight": 1500.5,
      "averageWeight": 150.05,
      "count": 10,
      "maxWeight": 250,
      "minWeight": 50
    }
  ],
  "overall": {
    "totalEntries": 25,
    "totalWeight": 3500.75,
    "averageWeight": 140.03,
    "uniqueFarmers": 8,
    "uniqueLocations": 5
  }
}
```

---

### 3. Get Farmer Statistics
**GET** `/api/farmers/stats`

**Query Parameters:**
- `minYield` - Minimum total yield filter
- `cropType` - Filter by crop type

**Example:**
```
GET http://localhost:5000/api/farmers/stats?minYield=500
```

**Response:**
```json
[
  {
    "_id": "John Doe",
    "totalWeight": 1250.5,
    "averageWeight": 125.05,
    "cropCount": 10,
    "cropTypes": 3,
    "locationCount": 2,
    "lastHarvest": "2024-03-15T00:00:00.000Z"
  }
]
```

---

### 4. Get Monthly Yield Trends
**GET** `/api/crop-yields/trends`

**Query Parameters:**
- `year` - Year for trends - Default: current year
- `cropType` - Filter by specific crop

**Example:**
```
GET http://localhost:5000/api/crop-yields/trends?year=2024&cropType=Rice
```

**Response:**
```json
[
  {
    "_id": 1,
    "crops": [
      {
        "cropType": "Rice",
        "totalWeight": 450.5,
        "count": 5
      }
    ],
    "monthlyTotal": 450.5
  }
]
```

---

### 5. Add New Crop Yield
**POST** `/api/crop-yields`

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

**Response:**
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "farmerName": "John Doe",
  "cropType": "Rice",
  "weight": 150.5,
  "unit": "kg",
  "harvestDate": "2024-03-15T00:00:00.000Z",
  "location": "Farm A",
  "notes": "Good harvest season",
  "createdAt": "2024-03-15T10:30:00.000Z"
}
```

---

### 6. Update Crop Yield
**PUT** `/api/crop-yields/:id`

**Request Body:**
```json
{
  "weight": 175.5,
  "notes": "Updated harvest data"
}
```

---

### 7. Delete Crop Yield
**DELETE** `/api/crop-yields/:id`

**Response:**
```json
{
  "message": "Crop yield entry deleted successfully"
}
```

---

### 8. Get Location-based Statistics
**GET** `/api/locations/stats`

**Response:**
```json
[
  {
    "_id": "Farm A",
    "totalWeight": 850.5,
    "averageWeight": 106.31,
    "cropCount": 8,
    "uniqueFarmers": 3,
    "cropTypes": ["Rice", "Wheat"]
  }
]
```

---

### 9. Get Crop Comparison
**GET** `/api/crop-yields/compare`

**Query Parameters:**
- `crops` - Comma-separated crop types (e.g., Rice,Wheat,Corn)
- `startDate` - Start date for comparison
- `endDate` - End date for comparison

**Example:**
```
GET http://localhost:5000/api/crop-yields/compare?crops=Rice,Wheat,Corn
```

---

### 10. Get Top Performers
**GET** `/api/top-performers`

**Query Parameters:**
- `type` - Type of ranking (farmers, locations, crops) - Default: farmers
- `limit` - Number of results - Default: 10
- `period` - Time period (week, month, year, all) - Default: all

**Example:**
```
GET http://localhost:5000/api/top-performers?type=farmers&limit=5&period=month
```

---

## Error Responses

All endpoints return standard error responses:

**400 Bad Request:**
```json
{
  "message": "Invalid request parameters"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```

---

## Testing the API

You can test the API using:
- **Browser:** http://localhost:5000/api/crop-yields
- **Postman:** Import the endpoints
- **cURL:** 
```bash
curl http://localhost:5000/api/crop-yields/stats
```
- **Frontend:** Already integrated in React app