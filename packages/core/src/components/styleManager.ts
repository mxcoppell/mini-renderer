import { StyleOptions } from './types';

export class StyleManager {
    private styleElement: HTMLStyleElement | null = null;
    private options: StyleOptions;

    constructor(options: StyleOptions = {}) {
        this.options = options;
    }

    public injectStyles(): void {
        if (typeof document === 'undefined') {
            console.warn('StyleManager: document is not defined. Styles cannot be injected.');
            return;
        }

        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
        }

        // Import all styles
        const styles = [
            require('../styles/themes.css'),
            require('../styles/base.css'),
            require('../styles/code-blocks.css'),
            require('../styles/math.css'),
            require('../styles/markdown.css')
        ].join('\n');

        this.styleElement.textContent = styles;

        if (this.options.customStyles) {
            const customStyleElement = document.createElement('style');
            customStyleElement.type = 'text/css';
            customStyleElement.textContent = this.options.customStyles;
            document.head.appendChild(customStyleElement);
        }

        // Set initial theme
        this.setTheme(this.options.theme || 'light');
    }

    public setTheme(theme: 'light' | 'dark'): void {
        if (typeof document === 'undefined') return;
        document.documentElement.setAttribute('data-theme', theme);
    }

    public cleanup(): void {
        if (this.styleElement && this.styleElement.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }
} 