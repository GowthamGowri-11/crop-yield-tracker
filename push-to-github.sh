#!/bin/bash

# Crop Yield Tracker - GitHub Push Script
# This script will push your project to GitHub

echo "🌾 Crop Yield Tracker - GitHub Push Script"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Add remote repository
echo ""
echo "🔗 Setting up remote repository..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/GowthamGowri-11/crop-yield-tracker.git
echo "✅ Remote repository added"

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ -z "$CURRENT_BRANCH" ]; then
    echo ""
    echo "🌿 Creating main branch..."
    git checkout -b main
    echo "✅ Main branch created"
else
    echo "✅ Current branch: $CURRENT_BRANCH"
fi

# Add all files
echo ""
echo "📝 Adding files to Git..."
git add .
echo "✅ Files added"

# Show status
echo ""
echo "📊 Git Status:"
git status --short

# Commit
echo ""
echo "💾 Creating commit..."
git commit -m "Initial commit: Complete MERN stack Crop Yield Tracker

Features:
- Full MERN stack implementation
- Crop yield data entry and management
- Real-time statistics and analytics
- Advanced filtering and search
- RESTful API with comprehensive endpoints
- MongoDB integration with aggregation
- Responsive React frontend
- Complete documentation

Tech Stack:
- React.js frontend with modern UI
- Node.js/Express backend
- MongoDB database
- Axios for HTTP requests
- Modular component architecture

Documentation:
- Complete README with setup instructions
- API documentation
- Installation guide
- User guide
- Contributing guidelines
- Changelog and license"

echo "✅ Commit created"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
echo "⚠️  You may need to enter your GitHub credentials"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your project is now available at:"
    echo "   https://github.com/GowthamGowri-11/crop-yield-tracker"
    echo ""
    echo "📚 Next steps:"
    echo "   1. Visit your repository on GitHub"
    echo "   2. Add a description and topics"
    echo "   3. Enable GitHub Pages (optional)"
    echo "   4. Set up GitHub Actions (optional)"
else
    echo ""
    echo "❌ Push failed. Please check your credentials and try again."
    echo ""
    echo "💡 If you need to authenticate:"
    echo "   - Use GitHub Personal Access Token instead of password"
    echo "   - Generate token at: https://github.com/settings/tokens"
    echo ""
    echo "📝 Manual push command:"
    echo "   git push -u origin main"
fi

echo ""
echo "=========================================="