declare const MathJax: {
    typesetPromise: (elements: Element[]) => Promise<void>;
    startup: {
        defaultPageReady: () => Promise<void>;
    };
};

declare const Prism: {
    highlightAll: () => void;
};

import { MiniRenderer, StyleManager, addCopyButtons } from 'mini-render';

const renderer = new MiniRenderer();
const styleManager = new StyleManager();

// Inject styles
styleManager.injectStyles();

// Theme handling
let currentTheme: 'light' | 'dark' = 'light';
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    styleManager.setTheme(currentTheme);
    themeToggle.innerHTML = currentTheme === 'light' ? '🌞 Light' : '🌙 Dark';

    // Store preference
    localStorage.setItem('theme', currentTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
if (savedTheme) {
    currentTheme = savedTheme;
    styleManager.setTheme(currentTheme);
    themeToggle.innerHTML = currentTheme === 'light' ? '🌞 Light' : '🌙 Dark';
}

themeToggle.addEventListener('click', toggleTheme);

// Function to fetch and display the list of files
async function loadFileList(): Promise<void> {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();
        const fileList = document.getElementById('file-list');
        if (!fileList) return;

        fileList.innerHTML = '';
        files.forEach((file: string) => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = file;
            link.onclick = () => renderSelectedFile(file);
            fileList.appendChild(link);
        });
    } catch (error) {
        console.error('Error loading file list:', error);
    }
}

// Function to render the selected file
async function renderSelectedFile(fileName: string): Promise<void> {
    if (!fileName) return;

    try {
        const response = await fetch(`/api/file/${fileName}`);
        const content = await response.text();
        renderContent(content);
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

// Function to render content
function renderContent(content?: string): void {
    const output = document.getElementById('output');
    if (!output) return;

    // Render the content using our package
    output.innerHTML = renderer.render(content || '');

    // Process MathJax and apply syntax highlighting
    MathJax.typesetPromise([output])
        .then(() => {
            Prism.highlightAll();
            addCopyButtons();
            console.log('Content rendered and typeset successfully');
        })
        .catch((err: Error) => console.log('MathJax error:', err));
}

// Load the file list when the page loads
window.onload = () => {
    loadFileList();
    renderContent();
}; 
