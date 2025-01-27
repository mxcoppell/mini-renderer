# Mini-Renderer

A lightweight TypeScript package for rendering markdown with code highlighting, LaTeX math, and theme support.

## Features
- Markdown rendering with code syntax highlighting
- LaTeX math support (inline and display mode)
- Light/Dark theme switching
- Code block copy buttons
- Proper escaping for code blocks and LaTeX content

## Installation

```bash
npm install mini-renderer
```

## Usage Example

```typescript
import { MiniRenderer, StyleManager } from 'mini-renderer';

// Initialize renderer and style manager
const renderer = new MiniRenderer();
const styleManager = new StyleManager();

// Inject required styles
styleManager.injectStyles();

// Render content
const content = `
# Example
Here's some code:
\`\`\`typescript
const x = "Hello World";
\`\`\`

And some math: $E = mc^2$

Matrix:
$$
\\begin{bmatrix}
1 & 2 \\\\
3 & 4
\\end{bmatrix}
$$
`;

const output = renderer.render(content);
document.getElementById('output').innerHTML = output;

// Optional: Enable dark theme
styleManager.setTheme('dark');
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/mxcoppell/mini-renderer.git
cd mini-renderer
```

2. Install dependencies:
```bash
npm install
```

3. Run the demo:
```bash
npm run dev      # Runs the local version demo
npm run npmdemo  # Runs the npm package version demo
```

## Project Structure

```
mini-renderer/
├── packages/
│   ├── core/       # Main package source
│   ├── demo/       # Demo using local source
│   └── npmdemo/    # Demo using npm package
```

## Changelog

### v0.1.1
- Fixed code block escaping for quotes
- Fixed LaTeX matrix row delimiter handling
- Moved content preprocessing to core package
- Improved demo server configuration

### v0.1.0
- Initial release
- Basic markdown rendering
- Code syntax highlighting
- LaTeX math support
- Theme switching

## License

MIT
