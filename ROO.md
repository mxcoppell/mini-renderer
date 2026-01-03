# mini-renderer Project Documentation

## Project Overview

- **Name**: mini-renderer
- **Purpose**: Lightweight TypeScript package for rendering markdown with code highlighting, LaTeX math, and theme support
- **Type**: Monorepo using npm workspaces
- **Repository**: https://github.com/mxcoppell/mini-renderer.git
- **License**: MIT
- **Current Version**: 0.1.2
- **Author**: Mini-Renderer Contributors

## Monorepo Structure

The project is organized as a monorepo with three main packages:

### Root Workspace
- **Name**: `mini-renderer-workspace`
- **Type**: Private workspace container
- **Purpose**: Orchestrates build and development across all packages

### packages/core
- **Name**: `mini-renderer`
- **Version**: 0.1.2
- **Type**: Publishable npm package
- **Purpose**: Core rendering library
- **Main Entry**: `dist/index.js`
- **TypeScript Types**: `dist/index.d.ts`
- **Published Files**: `dist/`, `README.md`

### packages/demo
- **Name**: `mini-renderer-demo`
- **Version**: 0.1.0
- **Type**: Private development demo
- **Purpose**: Local development and testing using the local core package
- **Port**: 3030
- **Server**: Express with hot-reload

### packages/npmdemo
- **Name**: `mini-renderer-npmdemo`
- **Version**: 0.1.0
- **Type**: Private package validation demo
- **Purpose**: Tests the published npm package version
- **Port**: 8080
- **Uses**: Published `mini-renderer@^0.1.2` from npm

## Development Workflow

### ⚠️ CRITICAL: Branch Protection Rules

**ALL changes MUST follow this workflow:**

1. **NO Direct Commits to Main**
   - The `main` branch is protected
   - All changes MUST be made in a feature branch
   - Direct commits to `main` are strictly forbidden

2. **Branch Naming Conventions**
   - Use descriptive branch names with prefixes:
     - `feat/` - New features (e.g., `feat/add-pdf-export`)
     - `fix/` - Bug fixes (e.g., `fix/math-rendering-issue`)
     - `docs/` - Documentation updates (e.g., `docs/update-readme`)
     - `refactor/` - Code refactoring (e.g., `refactor/renderer-optimization`)
     - `test/` - Test additions or modifications (e.g., `test/add-unit-tests`)
     - `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

3. **Feature Branch Workflow**
   ```bash
   # Create and checkout a new feature branch
   git checkout -b feat/your-feature-name
   
   # Make your changes and commit
   git add .
   git commit -m "feat: description of your changes"
   
   # Push to remote
   git push origin feat/your-feature-name
   
   # Create Pull Request on GitHub
   ```

4. **Pull Request Requirements**
   - All PRs must be reviewed before merging
   - PRs should include:
     - Clear description of changes
     - Link to related issues (if applicable)
     - Test results (if applicable)
     - Updated documentation (if needed)
   - Ensure all CI checks pass
   - Get at least one approval before merging

5. **Commit Message Format**
   Follow conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style/formatting
   - `refactor:` - Code refactoring
   - `test:` - Test additions/modifications
   - `chore:` - Maintenance tasks
   - `perf:` - Performance improvements

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mxcoppell/mini-renderer.git
   cd mini-renderer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a feature branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

4. **Make changes and test locally:**
   ```bash
   npm run dev      # Run local demo (port 3030)
   npm run npmdemo  # Run npm package demo (port 8080)
   ```

5. **Build and test:**
   ```bash
   npm run build    # Build core package
   npm test         # Run tests across workspaces
   ```

## Key Features

### Markdown Rendering
- Full markdown syntax support (headings, lists, links, tables, blockquotes)
- Nested markdown rendering in code blocks
- Standard markdown parsing with proper escaping

### Code Syntax Highlighting
- Multi-language syntax highlighting via Prism.js
- Automatic language detection
- Copy-to-clipboard functionality
- Language label display
- Proper quote and character escaping

### LaTeX Math Support
- Inline math with single dollar signs: `$E = mc^2$`
- Display math with double dollar signs or `\[...\]`
- Matrix environments with proper row delimiter handling
- Common math symbols and environments
- Configurable MathJax settings

### Theme Support
- Light and dark theme switching
- Customizable styling
- CSS variable-based theming
- Theme persistence

### TypeScript Support
- Full type definitions included
- Type-safe API
- IntelliSense support
- Strict typing throughout

## Dependencies

### Core Dependencies (packages/core)
```json
{
  "marked": "^9.1.5",      // Markdown parsing
  "prismjs": "^1.29.0"     // Code syntax highlighting
}
```

### Peer Dependencies
```json
{
  "mathjax": "^3.2.2"      // Math equation rendering
}
```

### Development Dependencies
- `typescript`: "^5.2.2"
- `@types/marked`: "^5.0.1"
- `@types/prismjs`: "^1.26.1"
- `@types/node`: "^20.8.7"

### Demo Package Dependencies (packages/demo)
- `express`: "^4.21.2" - Local development server
- `concurrently`: "^8.2.0" - Parallel script execution
- `ts-node-dev`: "^2.0.0" - TypeScript hot-reload
- `webpack`: "^5.88.2" - Module bundler

### NPM Demo Dependencies (packages/npmdemo)
- `webpack-dev-server`: "^4.15.1" - Development server
- `html-webpack-plugin`: "^5.5.3" - HTML generation

## Security Policy

### Dependency Audits
- Regular security audits are required
- Run `npm audit` before submitting PRs
- Address all high and critical vulnerabilities

### Vulnerability Response Process
1. **Detection**: Run `npm audit` to identify vulnerabilities
2. **Assessment**: Evaluate severity and impact
3. **Action**: Update dependencies or apply patches
4. **Testing**: Verify fixes don't break functionality
5. **Documentation**: Document changes in commit messages

### Security Contact
For security issues, please:
- DO NOT open public issues
- Contact maintainers directly via GitHub
- Provide detailed vulnerability information
- Allow time for fixes before public disclosure

### Best Practices
- Keep dependencies up to date
- Review dependency changes in PRs
- Use exact versions for critical dependencies
- Monitor security advisories

## Build & Development Commands

### Root Level Commands
```bash
# Build core package
npm run build

# Run local development demo (port 3030)
npm run dev

# Run npm package demo (port 8080)
npm run npmdemo

# Run tests across all workspaces
npm test
```

### Core Package Commands (packages/core)
```bash
# Build the package
npm run build

# Run tests
npm test

# Prepare for publishing (runs automatically)
npm run prepublishOnly
```

### Demo Package Commands (packages/demo)
```bash
# Run development server with hot-reload
npm run dev

# Run server only
npm run dev:server

# Run client build only
npm run dev:client

# Production build
npm run build

# Start production server
npm start
```

### NPM Demo Commands (packages/npmdemo)
```bash
# Build the demo
npm run build

# Start development server
npm run start

# Run demo server
npm run npmdemo
```

## Version Management

### Current Version
- **mini-renderer**: 0.1.2
- **demo**: 0.1.0 (private)
- **npmdemo**: 0.1.0 (private)

### Versioning Strategy
The project follows [Semantic Versioning (SemVer)](https://semver.org/):

- **MAJOR** version (X.0.0): Breaking changes
- **MINOR** version (0.X.0): New features (backward compatible)
- **PATCH** version (0.0.X): Bug fixes (backward compatible)

### Version History

#### v0.1.2 (Current)
- Added README.md to npm package
- Fixed documentation visibility on npm registry
- Added sample image to package documentation

#### v0.1.1
- Fixed code block escaping for quotes
- Fixed LaTeX matrix row delimiter handling
- Moved content preprocessing to core package
- Improved demo server configuration
- Added npmdemo package for testing npm distribution
- Updated documentation and examples

#### v0.1.0
- Initial release
- Basic markdown rendering
- Code syntax highlighting
- LaTeX math support
- Theme switching

### Publishing Process
1. **Update version in [`packages/core/package.json`](packages/core/package.json)**
2. **Update changelog in [`README.md`](README.md)**
3. **Build the package**: `npm run build`
4. **Test locally**: `npm run dev` and `npm run npmdemo`
5. **Create feature branch**: `git checkout -b chore/release-vX.X.X`
6. **Commit changes**: `git commit -m "chore: release vX.X.X"`
7. **Push and create PR**: Review and merge
8. **After merge to main**: Publish to npm from main branch
9. **Create GitHub release** with version tag

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please ensure you follow the development workflow outlined above:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request
5. Wait for review and approval
6. Merge only after approval

## Project Keywords
- markdown
- renderer
- syntax-highlighting
- latex
- math
- code-blocks
- themes
- typescript

---

*Last Updated: 2026-01-03*