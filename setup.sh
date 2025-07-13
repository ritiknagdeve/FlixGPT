#!/bin/bash

# 🚀 FlixGPT Quick Setup Script
# This script helps you set up FlixGPT locally in minutes!

echo "🎬 Welcome to FlixGPT Setup!"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "📥 Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 16+."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your API keys:"
    echo "   - Firebase API keys"
    echo "   - TMDB API key"
    echo "   - Google AI API key"
    echo ""
    echo "📚 See README.md for detailed setup instructions"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "📖 Next steps:"
echo "   1. Edit .env.local with your API keys"
echo "   2. Run 'npm run dev' to start development server"
echo "   3. Open http://localhost:5173 in your browser"
echo ""
echo "📚 Need help? Check out the README.md file"
echo "🐛 Found issues? Report them on GitHub"
echo ""
echo "Happy coding! 🎬✨"
