# 📦 Installation Guide - Crop Yield Tracker

This guide will walk you through the complete installation process for the Crop Yield Tracker application.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installing Prerequisites](#installing-prerequisites)
3. [Project Setup](#project-setup)
4. [Database Configuration](#database-configuration)
5. [Running the Application](#running-the-application)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements
- **OS**: Windows 10, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Internet**: Required for initial setup

### Software Requirements
- Node.js v14.0.0 or higher
- MongoDB v4.0 or higher
- npm v6.0.0 or higher
- Git (optional)

---

## Installing Prerequisites

### 1. Install Node.js

#### Windows
1. Download installer from https://nodejs.org/
2. Run the installer (.msi file)
3. Follow installation wizard
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS
Using Homebrew:
```bash
brew install node
```

Or download from https://nodejs.org/

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install MongoDB

#### Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer (.msi file)
3. Choose "Complete" installation
4. Install MongoDB as a service
5. Verify installation:
   ```bash
   mongod --version
   ```

#### macOS
Using Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 3. Install Git (Optional)
Download from https://git-scm.com/ or use package manager.

---

## Project Setup

### Step 1: Get the Project

#### Option A: Clone from Git
```bash
git clone https://github.com/yourusername/crop-yield-tracker.git
cd crop-yield-tracker
```

#### Option B: Download ZIP
1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal/command prompt in the extracted folder

### Step 2: Install Backend Dependencies

```bash
# In the root directory
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- nodemon
- concurrently

**Expected output:**
```
added 153 packages in 20s
```

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

This will install:
- react
- react-dom
- axios
- react-scripts

**Expected output:**
```
added 1313 packages in 2m
```

---

## Database Configuration

### Option 1: Local MongoDB (Recommended for Development)

1. **Start MongoDB Service**

   **Windows:**
   ```bash
   # MongoDB should start automatically if installed as service
   # Or manually start:
   mongod
   ```

   **macOS:**
   ```bash
   brew services start mongodb-community
   ```

   **Linux:**
   ```bash
   sudo systemctl start mongod
   ```

2. **Create Environment File**

   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/farmer-app
   PORT=5000
   ```

3. **Test Connection**
   ```bash
   npm run test-db
   ```

   **Expected output:**
   ```
   ✅ Database connection successful!
   Database: farmer-app
   Host: localhost
   Port: 27017
   ```

### Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new cluster (free tier available)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update .env File**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farmer-app
   PORT=5000
   ```

   Replace:
   - `username` with your MongoDB username
   - `password` with your password
   - `cluster` with your cluster name

4. **Whitelist IP Address**
   - In Atlas, go to Network Access
   - Add your IP address or allow access from anywhere (0.0.0.0/0)

---

## Running the Application

### Method 1: Run Both Servers Together (Recommended)

```bash
npm run dev
```

This command will:
- Start backend server on http://localhost:5000
- Start frontend React app on http://localhost:3000
- Auto-restart on file changes

**Expected output:**
```
[0] Server running on port 5000
[0] ✅ Connected to MongoDB
[1] Compiled successfully!
[1] You can now view client in the browser.
[1] Local: http://localhost:3000
```

### Method 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Method 3: Production Build

```bash
# Build frontend
cd client
npm run build

# Serve production build
# (requires additional server configuration)
```

---

## Verification

### 1. Check Backend Server

Open browser and navigate to:
```
http://localhost:5000/api/crop-yields/stats
```

**Expected response:**
```json
{
  "cropStats": [],
  "overall": {}
}
```

### 2. Check Frontend Application

Open browser and navigate to:
```
http://localhost:3000
```

You should see:
- Green header with "Crop Yield Tracker"
- Form on the left side
- Dashboard on the right side

### 3. Test Adding Data

1. Fill out the form:
   - Farmer Name: "Test Farmer"
   - Crop Type: Select "Rice"
   - Weight: 100
   - Unit: kg
   - Harvest Date: Select today's date
   - Location: "Test Farm"
   - Notes: "Test entry"

2. Click "Record Harvest"

3. You should see:
   - Success message
   - New entry appears in the harvest records
   - Statistics update

---

## Troubleshooting

### Issue: MongoDB Connection Failed

**Error:**
```
❌ MongoDB connection error: connect ECONNREFUSED
```

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   tasklist | findstr mongod
   
   # macOS/Linux
   ps aux | grep mongod
   ```

2. Start MongoDB:
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. Check MongoDB URI in `.env` file

### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
1. Kill process on port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```

2. Or change port in `.env`:
   ```env
   PORT=5001
   ```

### Issue: npm install Fails

**Error:**
```
npm ERR! code EACCES
```

**Solutions:**
1. Run with administrator/sudo:
   ```bash
   # Windows (Run as Administrator)
   npm install
   
   # macOS/Linux
   sudo npm install
   ```

2. Fix npm permissions:
   ```bash
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   ```

### Issue: React App Won't Start

**Error:**
```
Error: ENOSPC: System limit for number of file watchers reached
```

**Solution (Linux):**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Issue: Cannot Find Module

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS Error in Browser

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Ensure backend server is running
- Check that CORS is enabled in server.js (already configured)
- Clear browser cache

---

## Next Steps

After successful installation:

1. **Read the User Guide**: See how to use all features
2. **Explore API Documentation**: Learn about available endpoints
3. **Add Sample Data**: Test with real crop yield data
4. **Customize**: Modify crop types, units, or add new fields

---

## Getting Help

If you encounter issues not covered here:

1. Check the main [README.md](./README.md)
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. Open an issue on GitHub
4. Contact support

---

## Quick Reference Commands

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Start development servers
npm run dev

# Start backend only
npm run server

# Start frontend only
cd client && npm start

# Test database connection
npm run test-db

# Build for production
cd client && npm run build
```

---

**Installation complete! 🎉**

You're now ready to start tracking crop yields!