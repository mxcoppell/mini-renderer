# Mini-Renderer

A lightweight TypeScript package for rendering markdown content with support for:
- Code syntax highlighting
- LaTeX math equations
- Nested markdown in code blocks
- Copy to clipboard functionality
- Light/Dark theme support

<div align="center">
  <img src="docs/render-sample.png" alt="Mini-Renderer Sample" style="width: 100%; max-width: 800px;">
  <p><em>Sample output of Mini-Renderer showing code highlighting, math rendering, and theme support</em></p>
</div>

## Installation

```bash
npm install mini-renderer
```

## Usage

### Basic Usage

```typescript
import { MiniRenderer, StyleManager } from 'mini-renderer';

// Initialize renderer and style manager
const renderer = new MiniRenderer();
const styleManager = new StyleManager();

// Inject styles (required once)
styleManager.injectStyles();

// Render content
const content = `
# Example
Here's some code:
\`\`\`python
def hello(name):
    return f"Hello, {name}!"
\`\`\`

And some math: $E = mc^2$
`;

const outputElement = document.getElementById('output');
if (outputElement) {
    outputElement.innerHTML = renderer.render(content);
}
```

### Theme Support

```typescript
// Switch theme
styleManager.setTheme('dark'); // or 'light'

// With theme toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    styleManager.setTheme(newTheme);
}
```

### Configuration Options

```typescript
const renderer = new MiniRenderer({
    mathJaxConfig: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
        scale: 1.2
    },
    styleOptions: {
        theme: 'light',
        customStyles: '/* Your custom CSS */'
    }
});
```

## Features

### Code Block Support
- Syntax highlighting for multiple languages
- Copy to clipboard functionality
- Language label display
- Dark theme support

### Math Support
- Inline math with `$...$`
- Block math with `$$...$$`
- LaTeX syntax support

### Markdown Support
- Standard markdown syntax
- Nested markdown rendering in code blocks
- Customizable styling

## Demo Application

A demo web application is included to showcase the package functionality.

### Running the Demo

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mini-renderer.git
cd mini-renderer
```

2. Install dependencies:
```bash
npm install
```

3. Build the core package:
```bash
npm run build
```

4. Start the demo server:
```bash
npm run dev
```

5. Open http://localhost:3003 in your browser

### Demo Features
- File selection interface
- Theme toggle (Light/Dark)
- Sample content with various markdown features
- Live rendering preview

## Project Structure

```
mini-renderer/
├── packages/
│   ├── core/               # Main package
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   └── demo/              # Demo application
│       ├── src/
│       │   ├── client/
│       │   ├── server.ts
│       │   └── data/
│       └── package.json
└── package.json
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- marked: Markdown parsing
- prismjs: Code syntax highlighting
- mathjax: Math equation rendering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
