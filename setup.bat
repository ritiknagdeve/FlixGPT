@echo off
REM 🚀 FlixGPT Quick Setup Script for Windows
REM This script helps you set up FlixGPT locally in minutes!

echo 🎬 Welcome to FlixGPT Setup!
echo ================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    echo 📥 Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Create environment file if it doesn't exist
if not exist ".env.local" (
    echo 📝 Creating environment file...
    copy .env.example .env.local
    echo ⚠️  Please edit .env.local with your API keys:
    echo    - Firebase API keys
    echo    - TMDB API key
    echo    - Google AI API key
    echo.
    echo 📚 See README.md for detailed setup instructions
) else (
    echo ✅ Environment file already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo 🚀 To start development:
echo    npm run dev
echo.
echo 📖 Next steps:
echo    1. Edit .env.local with your API keys
echo    2. Run 'npm run dev' to start development server
echo    3. Open http://localhost:5173 in your browser
echo.
echo 📚 Need help? Check out the README.md file
echo 🐛 Found issues? Report them on GitHub
echo.
echo Happy coding! 🎬✨
pause
