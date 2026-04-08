@echo off
REM Crop Yield Tracker - GitHub Push Script for Windows
REM This script will push your project to GitHub

echo.
echo ========================================
echo Crop Yield Tracker - GitHub Push Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo Git initialized
) else (
    echo Git repository already initialized
)

echo.
echo Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/GowthamGowri-11/crop-yield-tracker.git
echo Remote repository added

echo.
echo Creating/switching to main branch...
git checkout -b main 2>nul
if errorlevel 1 (
    git checkout main
)

echo.
echo Adding files to Git...
git add .
echo Files added

echo.
echo Git Status:
git status --short

echo.
echo Creating commit...
git commit -m "Initial commit: Complete MERN stack Crop Yield Tracker" -m "Features:" -m "- Full MERN stack implementation" -m "- Crop yield data entry and management" -m "- Real-time statistics and analytics" -m "- Advanced filtering and search" -m "- RESTful API with comprehensive endpoints" -m "- MongoDB integration with aggregation" -m "- Responsive React frontend" -m "- Complete documentation" -m "" -m "Tech Stack:" -m "- React.js frontend with modern UI" -m "- Node.js/Express backend" -m "- MongoDB database" -m "- Axios for HTTP requests" -m "- Modular component architecture" -m "" -m "Documentation:" -m "- Complete README with setup instructions" -m "- API documentation" -m "- Installation guide" -m "- User guide" -m "- Contributing guidelines" -m "- Changelog and license"

echo Commit created

echo.
echo Pushing to GitHub...
echo You may need to enter your GitHub credentials
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Successfully pushed to GitHub!
    echo ========================================
    echo.
    echo Your project is now available at:
    echo https://github.com/GowthamGowri-11/crop-yield-tracker
    echo.
    echo Next steps:
    echo 1. Visit your repository on GitHub
    echo 2. Add a description and topics
    echo 3. Enable GitHub Pages (optional^)
    echo 4. Set up GitHub Actions (optional^)
) else (
    echo.
    echo ========================================
    echo Push failed. Please check your credentials.
    echo ========================================
    echo.
    echo If you need to authenticate:
    echo - Use GitHub Personal Access Token instead of password
    echo - Generate token at: https://github.com/settings/tokens
    echo.
    echo Manual push command:
    echo git push -u origin main
)

echo.
echo ========================================
pause