# Mini-Render Demo Application

This is a demo application showcasing the features of the Mini-Render package. It provides a web interface to test various markdown rendering capabilities including code blocks, math equations, and theme switching.

## Features

- File browser interface
- Live markdown rendering
- Theme switching (Light/Dark)
- Sample content demonstrating various features:
  - Code syntax highlighting
  - Math equation rendering
  - Nested markdown in code blocks
  - Copy to clipboard functionality

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. From the root directory, install dependencies:
```bash
npm install
```

2. Build the core package:
```bash
npm run build
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3003
```

## Development

### Project Structure

```
demo/
├── src/
│   ├── client/           # Client-side code
│   │   ├── app.ts       # Main application logic
│   │   └── index.html   # HTML template
│   ├── server.ts        # Express server
│   └── data/            # Sample markdown files
└── package.json
```

### Adding Sample Content

To add new sample content:

1. Create a new markdown file in `src/data/`
2. The file will automatically appear in the file list
3. Files support:
   - Standard markdown syntax
   - Code blocks with language specification
   - Math equations using LaTeX syntax
   - Nested markdown in code blocks

### Local Development

For development with hot reloading:

```bash
npm run dev
```

For production build:

```bash
npm run build
npm start
```

## Contributing

Feel free to submit issues and enhancement requests. 