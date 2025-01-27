import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const PORT = 3030;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

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
        res.send(content);
    } catch (error) {
        res.status(404).json({ error: 'File not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 
