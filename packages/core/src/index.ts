export { MiniRenderer } from './components/renderer';
export { StyleManager } from './components/styleManager';
export * from './components/types';

// Helper function to add copy buttons to code blocks
export function addCopyButtons(): void {
    if (typeof document === 'undefined') return;

    const codeBlocks = document.querySelectorAll('.code-block-container');
    codeBlocks.forEach((container) => {
        if (!container.querySelector('.copy-button')) {
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.innerHTML = '<span class="copy-icon"></span>';
            button.onclick = () => copyCodeBlock(container as HTMLElement);
            container.appendChild(button);
        }
    });
}

// Helper function to copy code block content
function copyCodeBlock(block: HTMLElement): void {
    let text: string;
    if (block.classList.contains('rendered-markdown-container')) {
        const rawMarkdown = block.querySelector('.raw-markdown');
        text = rawMarkdown ? rawMarkdown.textContent || '' : '';
    } else {
        const code = block.querySelector('code') || block;
        text = code.textContent || '';
    }

    navigator.clipboard.writeText(text).then(() => {
        console.log('Code block copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy code block: ', err);
    });
} 