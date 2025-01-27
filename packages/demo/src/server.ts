import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const PORT = 3003;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Function to escape special characters
function escapeSpecialCharacters(str: string): string {
    return str
        .replace(/\$\$([\s\S]*?)\$\$/g, preserveLatexContent)
        .replace(/\\\[([\s\S]*?)\\\]/g, preserveLatexContent)
        .replace(/\\(?!begin|end|cdot|quad|frac|sqrt|sum|int|lim|infty|partial|nabla|times|div|bmatrix|\\\\|\\)/g, '\\\\')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');
}

function preserveLatexContent(match: string, p1: string): string {
    return match.charAt(0) + match.charAt(1) + p1.replace(/\\(?!(begin|end|cdot|quad|frac|sqrt|sum|int|lim|infty|partial|nabla|times|div|bmatrix|\\))/g, '\\\\') + match.slice(-2);
}

// Function to process content, preserving code blocks and inline code
function processContent(content: string): string {
    const codeBlocks: string[] = [];
    let processedContent = content.replace(/```[\s\S]*?```|`[^`\n]+`/g, (match) => {
        const unescapedMatch = match.replace(/\\(['"])/g, '$1');
        const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
        codeBlocks.push(unescapedMatch);
        return placeholder;
    });

    processedContent = escapeSpecialCharacters(processedContent);

    codeBlocks.forEach((block, index) => {
        processedContent = processedContent.replace(`__CODE_BLOCK_${index}__`, block);
    });

    return processedContent;
}

// API endpoint to get the list of files in the data folder
app.get('/api/files', async (req, res) => {
    try {
        const files = await fs.readdir(path.join(__dirname, '../data'));
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Error reading directory' });
    }
});

// API endpoint to get the content of a specific file
app.get('/api/file/:filename', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data', req.params.filename);
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
