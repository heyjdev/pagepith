import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const CLUTTER_SELECTORS = [
  'script', 'style', 'noscript', 'template', 'canvas', 'svg', 'img', 'picture',
  'video', 'audio', 'iframe', 'object', 'embed', 'form', 'input', 'button',
  'select', 'textarea', 'nav', 'header', 'footer', 'aside', '[role="navigation"]',
  '[role="banner"]', '[role="complementary"]', '[role="dialog"]',
  '[aria-modal="true"]', '[hidden]', '[aria-hidden="true"]',
  '.advertisement', '.advertisements', '.advert', '.ads', '.ad', '.sponsored',
  '.cookie-banner', '.cookie-consent', '.newsletter', '.popup', '.modal',
  '.social-share', '.share-buttons', '.related', '.recommendations',
  '[id*="cookie" i]', '[class*="cookie" i]', '[id*="consent" i]',
  '[class*="consent" i]', '[id^="ad-" i]', '[class^="ad-" i]',
  '[class*=" ad-" i]', '[id*="advert" i]', '[class*="advert" i]',
  '[data-ad]', '[data-ad-slot]', '[data-testid*="ad-" i]'
];

function removeClutter(root) {
  for (const element of root.querySelectorAll(CLUTTER_SELECTORS.join(','))) element.remove();
  for (const anchor of root.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href')?.trim().toLowerCase() ?? '';
    if (href.startsWith('javascript:') || href.startsWith('data:')) anchor.removeAttribute('href');
  }
  return root;
}

function visibleTextLength(root) {
  return (root?.textContent ?? '').replace(/\s+/g, ' ').trim().length;
}

function cleanedFallback(document) {
  const clone = document.cloneNode(true);
  removeClutter(clone);
  return clone.querySelector('main, article, [role="main"]') || clone.body;
}

function markdownFromHtml(html, document, title) {
  const container = document.createElement('div');
  container.innerHTML = html;
  removeClutter(container);

  const firstHeading = container.querySelector('h1, h2');
  if (firstHeading?.textContent.trim().toLowerCase() === title.trim().toLowerCase()) {
    firstHeading.remove();
  }

  const turndown = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '*',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '_',
    strongDelimiter: '**'
  });
  turndown.use(gfm);
  turndown.remove(['img', 'picture', 'svg', 'form', 'button', 'input']);
  return turndown.turndown(container)
    .replace(/^([*+-])\s{2,}/gm, '$1 ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function extractFromDocument(document) {
  if (!document?.documentElement) throw new Error('The page document is unavailable.');

  const sourceUrl = document.location?.href || '';
  const readabilityClone = document.cloneNode(true);
  removeClutter(readabilityClone);
  const article = new Readability(readabilityClone, { charThreshold: 120 }).parse();

  let usedFallback = !article || visibleTextLength({ textContent: article.textContent }) < 200;
  let contentHtml;
  if (usedFallback) {
    const fallback = cleanedFallback(document);
    if (!fallback || visibleTextLength(fallback) < 10) {
      throw new Error('No useful textual content was found on this page.');
    }
    contentHtml = fallback.innerHTML;
  } else {
    contentHtml = article.content;
  }

  const pageHeading = document.querySelector('article h1, main h1, [role="main"] h1, h1')?.textContent;
  const preferredTitle = usedFallback ? document.title : pageHeading;
  const title = (preferredTitle || article?.title || pageHeading || document.title || 'Untitled page').replace(/\s+/g, ' ').trim();
  const bodyMarkdown = markdownFromHtml(contentHtml, document, title);
  if (bodyMarkdown.replace(/[#*_>`|\[\]()\-]/g, '').trim().length < 5) {
    throw new Error('No useful textual content was found on this page.');
  }

  const sourceLine = sourceUrl ? `Source: <${sourceUrl}>` : 'Source: unavailable';
  return {
    title,
    sourceUrl,
    usedFallback,
    markdown: `# ${title}\n\n${sourceLine}\n\n${bodyMarkdown}\n`
  };
}
