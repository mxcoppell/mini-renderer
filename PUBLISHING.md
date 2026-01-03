# Publishing Guide for mini-renderer

This document provides step-by-step instructions for publishing new versions of the `mini-renderer` package to npmjs.com.

## Prerequisites

### Required Accounts and Access

1. **npm Account**
   - Create an account at [npmjs.com](https://www.npmjs.com/signup)
   - Must have publishing rights to the `mini-renderer` package
   - Contact package maintainer if you need to be added as a collaborator

2. **GitHub Repository Access**
   - Write access to [mxcoppell/mini-renderer](https://github.com/mxcoppell/mini-renderer)
   - Ability to create tags and releases

3. **npm Authentication**
   - Log in to npm from your terminal:
     ```bash
     npm login
     ```
   - Verify authentication:
     ```bash
     npm whoami
     ```

### Required Tools

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **git**: Latest stable version

Verify installations:
```bash
node --version
npm --version
git --version
```

## Pre-Publishing Checklist

Before publishing a new version, complete the following checks:

### 1. Verify All Tests Pass

```bash
# Run all workspace tests
npm test
```

### 2. Security Audit

Check for security vulnerabilities:
```bash
# From root directory
npm audit

# Check the core package specifically
cd packages/core
npm audit
cd ../..
```

Fix any critical or high-severity issues before publishing.

### 3. Documentation Review

- [ ] README.md is up to date with latest features
- [ ] Code examples are accurate and tested
- [ ] API documentation reflects current implementation
- [ ] CHANGELOG.md is prepared (see Version Bump section)

### 4. Verify package.json Metadata

Review [`packages/core/package.json`](packages/core/package.json):
- [ ] `name`: "mini-renderer"
- [ ] `version`: Current version is `0.1.2` (update as needed)
- [ ] `description`: Accurate and concise
- [ ] `keywords`: Relevant and up-to-date
- [ ] `repository.url`: Points to correct GitHub repo
- [ ] `license`: "MIT"
- [ ] `files`: Includes ["dist", "README.md"]
- [ ] `main` and `types`: Point to correct build outputs

### 5. Clean Build Test

Ensure a clean build works:
```bash
# Remove any existing build artifacts
rm -rf packages/core/dist

# Run full build
npm run build

# Verify dist directory structure
ls -la packages/core/dist
```

Expected structure:
```
packages/core/dist/
├── index.js
├── index.d.ts
├── components/
├── styles/
└── utils/
```

## Version Bump Process

### Semantic Versioning Guidelines

Follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR version** (x.0.0): Breaking changes, incompatible API changes
- **MINOR version** (0.x.0): New features, backward-compatible
- **PATCH version** (0.0.x): Bug fixes, backward-compatible

**Current version**: `0.1.2`

### Examples

- Bug fix: `0.1.2` → `0.1.3`
- New feature: `0.1.2` → `0.2.0`
- Breaking change: `0.1.2` → `1.0.0`

### Update Version Number

Edit [`packages/core/package.json`](packages/core/package.json:3):

```json
{
  "name": "mini-renderer",
  "version": "0.1.3",  // Update this line
  "description": "..."
}
```

Or use npm version command:
```bash
cd packages/core

# For patch (0.1.2 -> 0.1.3)
npm version patch

# For minor (0.1.2 -> 0.2.0)
npm version minor

# For major (0.1.2 -> 1.0.0)
npm version major

cd ../..
```

**Note**: Using `npm version` automatically creates a git commit and tag.

### Update CHANGELOG.md

Add new version entry to [`README.md`](README.md) (Changelog section):

```markdown
### v0.1.3 (YYYY-MM-DD)
- Fixed: [describe bug fix]
- Added: [describe new feature]
- Changed: [describe modification]
- Deprecated: [describe deprecation]
- Removed: [describe removal]
- Security: [describe security fix]
```

## Build and Test

### 1. Clean Build

From the repository root:

```bash
# Clean previous build
rm -rf packages/core/dist

# Build the package
npm run build
```

This runs [`tsc`](packages/core/package.json:12) and copies CSS files to the dist directory.

### 2. Verify Build Output

Check the [`packages/core/dist/`](packages/core) directory:

```bash
ls -la packages/core/dist
```

Required files:
- `index.js` - Main entry point
- `index.d.ts` - TypeScript definitions
- `components/` - Component modules
- `styles/` - CSS files
- `utils/` - Utility modules

### 3. Test Build Locally

Before publishing, test the built package:

```bash
# Run the npmdemo to test the published package behavior
npm run npmdemo
```

Open [http://localhost:8080](http://localhost:8080) and verify:
- Markdown renders correctly
- Code highlighting works
- LaTeX math displays properly
- Theme switching functions
- No console errors

### 4. Dry Run

Test the publishing process without actually publishing:

```bash
cd packages/core
npm publish --dry-run
cd ../..
```

Review the output to ensure:
- Correct files are included
- Package size is reasonable (< 1MB recommended)
- No unexpected files are bundled

## Publishing Steps

### Step-by-Step Publishing Process

1. **Navigate to Core Package**
   ```bash
   cd packages/core
   ```

2. **Final Verification**
   ```bash
   # Verify you're logged in
   npm whoami
   
   # Verify package.json version
   cat package.json | grep version
   
   # Verify you're in the correct directory
   pwd  # Should end in /packages/core
   ```

3. **Run prepublishOnly Hook**
   
   This is automatically run by npm, but you can test it manually:
   ```bash
   npm run prepublishOnly
   ```
   
   This script:
   - Runs TypeScript compilation
   - Copies CSS files to dist/

4. **Publish to npm**
   
   For your first time or to verify:
   ```bash
   npm publish --dry-run
   ```
   
   When ready to publish:
   ```bash
   npm publish
   ```
   
   **For pre-release versions** (alpha, beta, rc):
   ```bash
   npm publish --tag beta
   ```

5. **Verify Publication**
   
   Check the package page:
   ```
   https://www.npmjs.com/package/mini-renderer
   ```
   
   Verify:
   - Version number is correct
   - README displays properly
   - Files are included correctly
   - Installation works: `npm info mini-renderer`

6. **Return to Root**
   ```bash
   cd ../..
   ```

## Post-Publishing

### 1. Create Git Tag

If you didn't use `npm version`, create a tag manually:

```bash
# Create annotated tag
git tag -a v0.1.3 -m "Release version 0.1.3"

# Push tag to GitHub
git push origin v0.1.3

# Or push all tags
git push --tags
```

### 2. Commit Changes

If version was updated manually:

```bash
git add packages/core/package.json README.md
git commit -m "chore: bump version to 0.1.3"
git push origin main
```

### 3. Create GitHub Release

1. Go to [Releases page](https://github.com/mxcoppell/mini-renderer/releases)
2. Click "Create a new release"
3. Select the tag (v0.1.3)
4. Title: "v0.1.3"
5. Description: Copy changelog entry
6. Click "Publish release"

### 4. Update npmdemo

Test that the new version works in the npmdemo:

```bash
# Update mini-renderer version in npmdemo
cd packages/npmdemo
npm install mini-renderer@latest
cd ../..

# Test the demo
npm run npmdemo
```

### 5. Update Root Dependency

Update the root [`package.json`](package.json:14):

```json
{
  "dependencies": {
    "mini-renderer": "^0.1.3"
  }
}
```

Then run:
```bash
npm install
```

### 6. Announce Release

Consider announcing the release:
- GitHub Discussions (if enabled)
- Twitter/Social media
- Project blog or website
- Relevant communities

## Troubleshooting

### Authentication Issues

**Problem**: `npm ERR! need auth`

**Solution**:
```bash
npm logout
npm login
```

Re-enter your credentials.

**Problem**: `npm ERR! 403 Forbidden`

**Solution**: You don't have publish rights. Contact package maintainer to be added as a collaborator.

### Build Failures

**Problem**: TypeScript compilation errors

**Solution**:
```bash
# Check TypeScript version
npm list typescript

# Clean and rebuild
rm -rf packages/core/dist packages/core/node_modules
cd packages/core
npm install
npm run build
```

**Problem**: Missing CSS files in dist/

**Solution**: Verify the build script in [`packages/core/package.json`](packages/core/package.json:12):
```json
"build": "tsc && cp src/styles/*.css dist/styles/"
```

### Version Conflicts

**Problem**: `npm ERR! You cannot publish over the previously published versions`

**Solution**: The version already exists on npm. Increment the version number:
```bash
cd packages/core
npm version patch
npm publish
```

**Problem**: Git tag already exists

**Solution**:
```bash
# Delete local tag
git tag -d v0.1.3

# Delete remote tag (use with caution!)
git push origin :refs/tags/v0.1.3

# Create new tag
git tag -a v0.1.3 -m "Release version 0.1.3"
git push origin v0.1.3
```

### Package Size Issues

**Problem**: Package size is too large

**Solution**: 
1. Check what's being included:
   ```bash
   npm pack --dry-run
   ```

2. Review the [`files`](packages/core/package.json:7-10) field in package.json
3. Add patterns to [`.gitignore`](.gitignore) or [`.npmignore`](packages/core/.npmignore)
4. Verify large files aren't accidentally included

### Test Failures

**Problem**: Tests fail before publishing

**Solution**:
```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests for specific package
npm test --workspace=packages/core
```

Fix all failing tests before publishing.

## Rolling Back a Release

If you published a version with critical issues:

### Option 1: Deprecate Version (Recommended)

Deprecate the problematic version and publish a fix:

```bash
cd packages/core

# Deprecate the bad version
npm deprecate mini-renderer@0.1.3 "Critical bug - please upgrade to 0.1.4"

# Fix the issue, bump version, and publish
npm version patch
npm publish

cd ../..
```

**Note**: Deprecated versions can still be installed but users will see a warning.

### Option 2: Unpublish (Use with Extreme Caution)

**Warning**: Only use within 72 hours of publishing and if no one has used it yet.

```bash
# Unpublish specific version
npm unpublish mini-renderer@0.1.3

# Or unpublish entire package (very destructive!)
npm unpublish mini-renderer --force
```

**Important**: Unpublishing is discouraged by npm. See [npm unpublish policy](https://docs.npmjs.com/policies/unpublish).

### Best Practice for Critical Issues

1. Deprecate the bad version
2. Fix the issue immediately
3. Publish a new patch version
4. Update GitHub release with a notice
5. Notify users through appropriate channels

## Checklist Summary

Use this checklist for each release:

- [ ] All tests pass
- [ ] Security audit clean
- [ ] Documentation updated
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Clean build successful
- [ ] Local testing complete (npmdemo)
- [ ] Dry run successful
- [ ] Published to npm
- [ ] Git tag created and pushed
- [ ] GitHub release created
- [ ] Dependencies updated
- [ ] Release announced

## Additional Resources

- [npm Publishing Documentation](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [npm Version Command](https://docs.npmjs.com/cli/v9/commands/npm-version)
- [Creating a GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

---

**Last Updated**: 2026-01-03  
**Current Version**: 0.1.2  
**Next Version**: TBD