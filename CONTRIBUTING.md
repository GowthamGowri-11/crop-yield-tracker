# Contributing to Crop Yield Tracker

First off, thank you for considering contributing to Crop Yield Tracker! It's people like you that make this tool better for farmers and agricultural analysts worldwide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting bugs, include:**
- Clear and descriptive title
- Exact steps to reproduce the problem
- Expected behavior vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, MongoDB version)
- Error messages or logs

**Bug Report Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 10]
- Node Version: [e.g., 18.0.0]
- MongoDB Version: [e.g., 6.0]
- Browser: [e.g., Chrome 120]

**Additional context**
Any other relevant information.
```

### Suggesting Features

Feature suggestions are welcome! Please provide:

- Clear and descriptive title
- Detailed description of the proposed feature
- Why this feature would be useful
- Possible implementation approach
- Examples or mockups if applicable

**Feature Request Template:**
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, screenshots, or examples.
```

### Code Contributions

We love code contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js v14+
- MongoDB v4+
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/crop-yield-tracker.git
   cd crop-yield-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

### Project Structure

```
crop-yield-tracker/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── App.js       # Main app
│   │   └── App.css      # Styles
├── server.js            # Express backend
├── package.json         # Backend dependencies
└── README.md
```

## Coding Standards

### JavaScript Style Guide

We follow standard JavaScript conventions:

**General Rules:**
- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Use template literals for string interpolation
- Use async/await for asynchronous code

**Example:**
```javascript
// Good
const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Avoid
var fetchData = function() {
  axios.get('/api/data').then(function(response) {
    return response.data;
  }).catch(function(error) {
    console.log(error);
  });
};
```

### React Best Practices

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and variable names
- Add PropTypes or TypeScript for type checking
- Extract reusable logic into custom hooks

**Example:**
```javascript
// Good
const YieldCard = ({ yieldData, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(yieldData.id);
    setIsDeleting(false);
  };
  
  return (
    <div className="yield-card">
      {/* Component content */}
    </div>
  );
};
```

### CSS Guidelines

- Use meaningful class names
- Follow BEM naming convention when appropriate
- Keep styles modular and component-specific
- Use CSS variables for colors and common values
- Ensure responsive design

**Example:**
```css
/* Good */
.yield-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.yield-card__header {
  display: flex;
  justify-content: space-between;
}

.yield-card__title {
  font-size: 1.2rem;
  color: var(--primary-color);
}
```

### Backend Best Practices

- Use async/await for database operations
- Implement proper error handling
- Validate input data
- Use meaningful variable names
- Add comments for complex logic
- Follow RESTful API conventions

**Example:**
```javascript
// Good
app.get('/api/crop-yields', async (req, res) => {
  try {
    const { cropType, startDate, endDate } = req.query;
    
    // Build filter object
    const filter = {};
    if (cropType) filter.cropType = cropType;
    if (startDate) filter.harvestDate = { $gte: new Date(startDate) };
    
    const yields = await CropYield.find(filter);
    res.json(yields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(frontend): add crop comparison chart

Add interactive chart to compare multiple crops side-by-side
with filtering options and export functionality.

Closes #123
```

```bash
fix(api): correct date filtering in statistics endpoint

Fixed issue where date range filter was not properly applied
to the aggregation pipeline, causing incorrect statistics.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added detailed steps for MongoDB Atlas setup and
troubleshooting common installation issues.
```

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md** with your changes
5. **Follow coding standards**
6. **Test on multiple browsers** (if frontend changes)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

1. **Automated checks** must pass
2. **At least one maintainer** must review
3. **Address review comments**
4. **Squash commits** if requested
5. **Maintainer will merge** when approved

## Testing

### Running Tests

```bash
# Backend tests
npm test

# Frontend tests
cd client && npm test

# Database connection test
npm run test-db
```

### Writing Tests

- Write tests for new features
- Update tests for bug fixes
- Aim for good code coverage
- Test edge cases

## Documentation

### When to Update Documentation

- Adding new features
- Changing existing functionality
- Fixing bugs that affect usage
- Improving setup process

### Documentation Files

- **README.md** - Project overview
- **API_DOCUMENTATION.md** - API reference
- **USER_GUIDE.md** - User instructions
- **INSTALLATION_GUIDE.md** - Setup instructions
- **CONTRIBUTING.md** - This file

## Community

### Getting Help

- Open an issue for questions
- Join discussions in issues
- Check existing documentation

### Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

Feel free to open an issue with the label "question" if you need clarification on anything.

**Thank you for contributing! 🌾**