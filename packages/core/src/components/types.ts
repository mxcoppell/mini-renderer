export interface RendererOptions {
    mathJaxConfig?: MathJaxConfig;
    prismConfig?: PrismConfig;
    styleOptions?: StyleOptions;
}

export interface MathJaxConfig {
    inlineMath?: Array<[string, string]>;
    displayMath?: Array<[string, string]>;
    scale?: number;
}

export interface PrismConfig {
    theme?: string;
    languages?: string[];
}

export interface StyleOptions {
    injectStyles?: boolean;
    customStyles?: string;
}

export interface CodeBlock {
    id: string;
    content: string;
    lang: string;
}

export interface ProcessedContent {
    content: string;
    blocks: CodeBlock[];
} 