// Function to fetch and display the list of files
async function loadFileList() {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';
        files.forEach(file => {
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
async function renderSelectedFile(fileName) {
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
function renderContent(content) {
    if (!content) {
        document.getElementById('output').innerHTML = '<p>Please select a file to view its content.</p>';
        return;
    }

    // Step 1: Protect code blocks
    const { content: protected, blocks } = preprocessContent(content);

    // Step 2: Parse markdown
    let rendered = marked.parse(protected);

    // Step 3: Restore code blocks and add copy buttons
    rendered = restoreContent(rendered, blocks);

    // Step 4: Update DOM
    document.getElementById('output').innerHTML = rendered;

    // Step 5: Process MathJax and apply syntax highlighting
    MathJax.typesetPromise([document.getElementById('output')])
        .then(() => {
            Prism.highlightAll(); // Apply syntax highlighting
            addCopyButtons(); // Add copy buttons to code blocks
            console.log('Content rendered and typeset successfully');
        })
        .catch((err) => console.log('MathJax error:', err));
}

// Function to protect code blocks and math
function preprocessContent(content) {
    let blocks = [];
    let counter = 0;

    // Helper function to store and replace content
    function store(match, lang, code) {
        const id = `BLOCK_${counter++}`;
        blocks.push({ id, content: code, lang: lang });
        return id;
    }

    // Protect code blocks and preserve language specifier
    // Use negative lookbehind to avoid matching escaped backslashes
    content = content.replace(/(?<!\\)```(\w*)\n([\s\S]*?)(?<!\\)```/g, store);

    return { content, blocks };
}

// Function to render markdown within code blocks
function renderMarkdownInCodeBlock(content) {
    return marked.parse(content);
}

// Function to restore protected content
function restoreContent(content, blocks) {
    blocks.forEach(({ id, content: originalContent, lang }) => {
        const languageLabel = `<span class="language-label">${lang || 'text'}</span>`;
        if (lang === 'markdown') {
            const renderedMarkdown = renderMarkdownInCodeBlock(originalContent);
            content = content.replace(id, `<div class="code-block-container"><div class="rendered-markdown-container"><div class="rendered-markdown">${renderedMarkdown}</div><div class="raw-markdown" style="display:none;">${originalContent}</div></div>${languageLabel}</div>`);
        } else {
            content = content.replace(id, `<div class="code-block-container"><pre><code class="language-${lang}">${originalContent}</code></pre>${languageLabel}</div>`);
        }
    });
    return content;
}

// Function to add copy buttons to code blocks
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block-container');
    codeBlocks.forEach((container) => {
        if (!container.querySelector('.copy-button')) {
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.innerHTML = '<span class="copy-icon"></span>';
            button.onclick = () => copyCodeBlock(container);
            container.appendChild(button);
        }
    });
}

// Function to copy code block content
function copyCodeBlock(block) {
    let text;
    if (block.classList.contains('rendered-markdown-container')) {
        const rawMarkdown = block.querySelector('.raw-markdown');
        text = rawMarkdown ? rawMarkdown.textContent : '';
    } else {
        const code = block.querySelector('code') || block;
        text = code.innerText;
    }

    navigator.clipboard.writeText(text).then(() => {
        console.log('Code block copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy code block: ', err);
    });
}

// Load the file list when the page loads
window.onload = () => {
    loadFileList();
    renderContent(); // This will display the initial message
};
