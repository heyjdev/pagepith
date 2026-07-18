import { extractFromDocument } from './core.js';

globalThis.PageToMarkdown = {
  extractPage() {
    return extractFromDocument(document);
  }
};
