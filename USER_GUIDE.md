# 📖 User Guide - Crop Yield Tracker

Welcome to the Crop Yield Tracker! This guide will help you understand and use all features of the application.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Recording Harvest Data](#recording-harvest-data)
4. [Viewing and Managing Records](#viewing-and-managing-records)
5. [Using Filters and Search](#using-filters-and-search)
6. [Analytics and Reports](#analytics-and-reports)
7. [Tips and Best Practices](#tips-and-best-practices)

---

## Getting Started

### Accessing the Application

1. Open your web browser
2. Navigate to: `http://localhost:3000`
3. You'll see the main dashboard with two tabs:
   - **Dashboard** - Main data entry and viewing
   - **Analytics** - Advanced analytics and trends

---

## Dashboard Overview

### Layout

The dashboard is divided into three main sections:

#### 1. Left Panel - Data Entry Form
- Record new harvest entries
- All fields are clearly labeled
- Form validation ensures data quality

#### 2. Right Panel - Statistics Cards
- **Total Entries** - Number of harvest records
- **Total Yield** - Combined weight of all harvests
- **Unique Farmers** - Number of different farmers
- **Locations** - Number of farm locations

#### 3. Main Area - Harvest Records
- Filter bar for searching and filtering
- List of all harvest records
- Crop performance summary

---

## Recording Harvest Data

### Step-by-Step Guide

1. **Enter Farmer Name**
   - Type the farmer's full name
   - Example: "John Smith"
   - Required field

2. **Select Crop Type**
   - Click the dropdown menu
   - Choose from available crops:
     - Rice
     - Wheat
     - Corn
     - Barley
     - Soybeans
     - Cotton
     - Sugarcane
     - Potatoes
     - Tomatoes
     - Onions
     - Carrots
     - Beans
     - Peas
     - Sunflower
     - Canola
     - Other
   - Required field

3. **Enter Weight**
   - Input the harvest weight
   - Choose unit from dropdown:
     - kg (kilograms)
     - tons
     - lbs (pounds)
     - quintals
   - Example: 150.5 kg
   - Required field

4. **Select Harvest Date**
   - Click the date picker
   - Choose the harvest date
   - Cannot be in the future
   - Required field

5. **Enter Farm Location**
   - Type the farm or field name
   - Example: "North Field A" or "Farm 123"
   - Required field

6. **Add Notes (Optional)**
   - Add any additional information
   - Examples:
     - "Good weather conditions"
     - "Used organic fertilizer"
     - "Early harvest due to weather"
   - Optional field

7. **Submit the Form**
   - Click "📊 Record Harvest" button
   - Wait for success message
   - Form will clear automatically
   - New entry appears in the list

### Data Validation

The form validates:
- ✅ All required fields are filled
- ✅ Weight is a positive number
- ✅ Date is valid and not in future
- ✅ Farmer name and location are not empty

---

## Viewing and Managing Records

### Harvest Record Cards

Each harvest record displays:
- **Crop icon and name** - Visual identification
- **Weight badge** - Highlighted weight value
- **Farmer name** - Who harvested
- **Location** - Where it was harvested
- **Harvest date** - When it was harvested
- **Notes** - Additional information (if provided)
- **Record date** - When entry was created

### Card Actions

Each card has two action buttons:

#### Edit Button (✏️)
- Click to edit the entry
- Modify any field
- Save changes
- *Note: Currently shows "coming soon" message*

#### Delete Button (🗑️)
- Click to delete the entry
- Confirmation dialog appears
- Confirm to permanently delete
- Statistics update automatically

### Sorting Records

Records are automatically sorted by:
- Most recent harvest date first
- Can be changed using filter options

---

## Using Filters and Search

### Search Bar

Located at the top of the filter section:

**How to use:**
1. Click the search box
2. Type your search term
3. Results update automatically

**Searches across:**
- Farmer names
- Locations
- Notes
- Crop types

**Examples:**
- Search "John" - finds all entries by farmers named John
- Search "Farm A" - finds all entries from Farm A
- Search "organic" - finds entries with "organic" in notes

### Filter Options

#### 1. Crop Type Filter
- **Purpose**: Show only specific crops
- **Options**: All crops or select specific one
- **Example**: Select "Rice" to see only rice harvests

#### 2. Sort By Filter
- **Purpose**: Change sorting order
- **Options**:
  - Harvest Date (default)
  - Weight
  - Crop Type
  - Farmer Name
- **Example**: Sort by weight to see largest harvests first

#### 3. Order Filter
- **Purpose**: Ascending or descending order
- **Options**:
  - Newest First (default)
  - Oldest First
- **Example**: Select "Oldest First" to see historical data

#### 4. Date Range Filter
- **Purpose**: Filter by harvest date range
- **Fields**:
  - Start Date
  - End Date
- **Example**: 
  - Start: 2024-01-01
  - End: 2024-03-31
  - Shows Q1 2024 harvests

### Combining Filters

You can use multiple filters together:

**Example 1: Recent Rice Harvests**
- Crop Type: Rice
- Sort By: Harvest Date
- Order: Newest First

**Example 2: Large Wheat Harvests This Month**
- Crop Type: Wheat
- Sort By: Weight
- Order: Newest First
- Date Range: This month

**Example 3: Specific Farmer's History**
- Search: "John Smith"
- Sort By: Harvest Date
- Order: Oldest First

---

## Analytics and Reports

### Accessing Analytics

Click the "📈 Analytics" tab in the header.

### Analytics Features

#### 1. Top Performing Farmers

**What it shows:**
- Ranked list of farmers by total yield
- Individual farmer statistics
- Performance metrics

**Information displayed:**
- Farmer name
- Total weight harvested
- Number of crop types grown
- Number of locations farmed
- Last harvest date

**How to use:**
- Identify most productive farmers
- Compare farmer performance
- Track farmer activity

#### 2. Monthly Yield Trends

**What it shows:**
- Bar chart of monthly harvests
- Year-by-year comparison
- Seasonal patterns

**Features:**
- Select different years
- Hover over bars for details
- Visual trend identification

**How to use:**
- Identify peak harvest months
- Plan for seasonal variations
- Compare year-over-year performance

#### 3. Crop Distribution

**What it shows:**
- Horizontal bar chart
- Relative yield by farmer
- Visual comparison

**How to use:**
- See yield distribution
- Identify top contributors
- Compare relative performance

### Crop Performance Summary

Located at the bottom of the dashboard:

**Shows for each crop:**
- Total weight harvested
- Average weight per harvest
- Number of harvest entries
- Maximum single harvest
- Minimum single harvest

**How to use:**
- Compare crop performance
- Identify most productive crops
- Analyze crop efficiency

---

## Tips and Best Practices

### Data Entry Tips

1. **Be Consistent**
   - Use same farmer name format (e.g., "John Smith" not "J. Smith")
   - Use consistent location names
   - Standardize units (prefer kg for consistency)

2. **Add Detailed Notes**
   - Record weather conditions
   - Note fertilizer or pesticide use
   - Document any issues or successes

3. **Enter Data Promptly**
   - Record harvests on the same day
   - Don't wait until end of season
   - Fresh data is more accurate

4. **Use Meaningful Locations**
   - Be specific: "North Field A" not just "Field"
   - Include plot numbers if available
   - Consistent naming helps analysis

### Search and Filter Tips

1. **Use Partial Searches**
   - Search "Farm" finds "Farm A", "Farm B", etc.
   - Search "John" finds "John Smith", "Johnny", etc.

2. **Combine Filters**
   - Use multiple filters for precise results
   - Start broad, then narrow down

3. **Clear Filters**
   - Select "All" in crop type to reset
   - Clear date range to see all dates
   - Clear search box to see all records

### Analytics Tips

1. **Regular Review**
   - Check analytics weekly or monthly
   - Identify trends early
   - Make data-driven decisions

2. **Compare Periods**
   - Use date filters to compare seasons
   - Compare year-over-year performance
   - Identify improvement opportunities

3. **Export Data**
   - Take screenshots of analytics
   - Document trends and patterns
   - Share insights with team

### Performance Tips

1. **Regular Cleanup**
   - Delete test entries
   - Remove duplicate records
   - Keep data accurate

2. **Backup Data**
   - Regularly backup database
   - Export important records
   - Keep offline copies

---

## Common Tasks

### Task 1: Record Daily Harvest
1. Open application
2. Fill harvest form
3. Click "Record Harvest"
4. Verify entry appears in list

### Task 2: Find Specific Farmer's Records
1. Use search bar
2. Type farmer name
3. Review filtered results
4. Use date range if needed

### Task 3: Generate Monthly Report
1. Go to Analytics tab
2. Select current month in date range
3. Review statistics
4. Take screenshot or note key metrics

### Task 4: Compare Crop Performance
1. Go to Dashboard
2. Scroll to Crop Performance Summary
3. Compare total and average yields
4. Identify best performing crops

### Task 5: Delete Old Test Data
1. Find test entries in list
2. Click delete button (🗑️)
3. Confirm deletion
4. Repeat for all test entries

---

## Keyboard Shortcuts

- **Tab** - Move between form fields
- **Enter** - Submit form (when in form)
- **Esc** - Close dialogs
- **Ctrl/Cmd + F** - Focus search bar (browser default)

---

## Mobile Usage

The application is fully responsive:

### Mobile Features
- Touch-friendly buttons
- Optimized layout for small screens
- Swipe-friendly cards
- Mobile-optimized date picker

### Mobile Tips
- Use landscape mode for better view
- Pinch to zoom on analytics
- Swipe to scroll through records

---

## Getting Help

### In-App Help
- Hover over fields for tooltips
- Error messages guide corrections
- Success messages confirm actions

### Additional Resources
- [README.md](./README.md) - Project overview
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Technical details
- [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) - Setup help

---

## Frequently Asked Questions

**Q: Can I edit a harvest record?**
A: Edit functionality is coming soon. Currently, you can delete and re-enter.

**Q: How do I export data?**
A: Export feature is planned for future release. Currently, use browser print or screenshots.

**Q: Can multiple users access the system?**
A: Currently single-user. Multi-user support planned for future.

**Q: Is my data backed up?**
A: Data is stored in MongoDB. Set up regular database backups.

**Q: Can I add custom crop types?**
A: Currently limited to predefined list. Custom crops planned for future.

---

**Happy tracking! 🌾**

For technical support, refer to the main documentation or contact your system administrator.