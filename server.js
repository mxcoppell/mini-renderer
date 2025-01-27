const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3003;

// Serve static files from the current directory
app.use(express.static('.'));

// Function to escape special characters
function escapeSpecialCharacters(str) {
    return str
        .replace(/\$\$([\s\S]*?)\$\$/g, preserveLatexContent)
        .replace(/\\\[([\s\S]*?)\\\]/g, preserveLatexContent)
        .replace(/\\(?!begin|end|cdot|quad|frac|sqrt|sum|int|lim|infty|partial|nabla|times|div|bmatrix|\\\\|\\)/g, '\\\\') // Escape single backslashes except for specific LaTeX commands and \\ or \\\\
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');
}

function preserveLatexContent(match, p1) {
    // Preserve LaTeX commands and row separators within delimiters
    return match.charAt(0) + match.charAt(1) + p1.replace(/\\(?!(begin|end|cdot|quad|frac|sqrt|sum|int|lim|infty|partial|nabla|times|div|bmatrix|\\))/g, '\\\\') + match.slice(-2);
}

// Function to process content, preserving code blocks and inline code
function processContent(content) {
    const codeBlocks = [];
    let processedContent = content.replace(/```[\s\S]*?```|`[^`\n]+`/g, (match) => {
        // Unescape quotes within code blocks and inline code
        const unescapedMatch = match.replace(/\\(['"])/g, '$1');
        const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
        codeBlocks.push(unescapedMatch);
        return placeholder;
    });

    processedContent = escapeSpecialCharacters(processedContent);

    // Restore code blocks and inline code
    codeBlocks.forEach((block, index) => {
        processedContent = processedContent.replace(`__CODE_BLOCK_${index}__`, block);
    });

    return processedContent;
}

// API endpoint to get the list of files in the data folder
app.get('/api/files', async (req, res) => {
    try {
        const files = await fs.readdir('./data');
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Error reading directory' });
    }
});

// API endpoint to get the content of a specific file
app.get('/api/file/:filename', async (req, res) => {
    try {
        const filePath = path.join('./data', req.params.filename);
        const content = await fs.readFile(filePath, 'utf-8');
        const processedContent = processContent(content);
        res.send(processedContent);
    } catch (error) {
        res.status(404).json({ error: 'File not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
