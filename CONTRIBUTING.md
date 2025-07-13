# 🤝 Contributing to FlixGPT

First off, thank you for considering contributing to FlixGPT! 🎉

It's people like you that make FlixGPT such a great tool.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Style Guidelines](#style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FlixGPT.git
   cd FlixGPT
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ritiknagdeve/FlixGPT.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your API keys
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, browser, Node.js version)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected**
- **Explain why this enhancement would be useful**

### 🔧 Contributing Code

1. **Find an issue to work on**
   - Look for issues labeled `good first issue` or `help wanted`
   - Comment on the issue to let others know you're working on it

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/your-bugfix-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Ensure mobile responsiveness

4. **Test your changes**
   ```bash
   npm run build
   npm run preview
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

## Style Guidelines

### JavaScript/React Guidelines

- Use functional components with hooks
- Use meaningful variable and function names
- Keep components small and focused
- Use proper error handling
- Follow existing file structure

### CSS/Styling Guidelines

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use consistent spacing and sizing
- Ensure accessibility compliance

### Git Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(auth): add Google OAuth integration
fix(video): resolve autoplay issue on mobile
docs(readme): update installation instructions
style(header): improve mobile responsiveness
```

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure your changes are tested**
3. **Update the README.md** if you're adding new features
4. **Follow the pull request template**
5. **Request review** from maintainers

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] All existing tests pass
- [ ] Added new tests if applicable

## Screenshots
(if applicable)

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
```

## Recognition

Contributors will be recognized in:
- GitHub contributors section
- README.md acknowledgments
- Future release notes

## Questions?

Feel free to contact the maintainers:
- Create an issue for technical questions
- Email: ritiknagdeve@gmail.com for other inquiries

Thank you for contributing! 🚀
