import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { extractFromDocument } from '../src/core.js';

async function fixture(name, url = `https://example.com/${name}`) {
  const html = await readFile(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');
  return new JSDOM(html, { url }).window.document;
}

test('extracts semantic article Markdown and removes clutter', async () => {
  const document = await fixture('noisy-article.html', 'https://example.com/articles/agents?ref=test');
  const result = extractFromDocument(document);

  assert.equal(result.title, 'Building Reliable Agents');
  assert.equal(result.sourceUrl, 'https://example.com/articles/agents?ref=test');
  assert.match(result.markdown, /^# Building Reliable Agents\n\nSource: <https:\/\/example\.com\/articles\/agents\?ref=test>/);
  assert.match(result.markdown, /## Core practices/);
  assert.match(result.markdown, /\* Validate inputs/);
  assert.match(result.markdown, /> Trust, but verify\./);
  assert.match(result.markdown, /```(?:js)?\nconst result = await agent\.run\(task\);/);
  assert.match(result.markdown, /\| Signal \| Meaning \|/);
  assert.match(result.markdown, /\[complete guide\]\(https:\/\/example\.com\/guide\)/);

  for (const noise of ['Accept all cookies', 'Buy miracle widgets', 'Sponsored stories', 'Subscribe', 'window.tracker', 'hero.jpg', 'tracker.gif', '![]']) {
    assert.doesNotMatch(result.markdown, new RegExp(noise.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
  assert.equal(result.usedFallback, false);
});

test('uses cleaned relevant-body fallback when Readability output is sparse', async () => {
  const document = await fixture('sparse-page.html');
  const result = extractFromDocument(document);

  assert.equal(result.usedFallback, true);
  assert.match(result.markdown, /# Tiny Reference/);
  assert.match(result.markdown, /API Status/);
  assert.match(result.markdown, /All systems operational\./);
  assert.match(result.markdown, /Region/);
  assert.doesNotMatch(result.markdown, /Home Docs Account|cookies|pixel\.gif|Legal Privacy/i);
});

test('rejects interactive map shells instead of extracting surrounding promotional boilerplate', async () => {
  const document = await fixture('interactive-map.html', 'https://example.com/map/');
  assert.throws(() => extractFromDocument(document), /No useful textual content/i);
});

for (const [name, markup] of [
  ['image gallery', '<main><picture><img src="hero.jpg" alt="Gallery image"></picture><img src="second.jpg"></main>'],
  ['video player', '<main><video controls src="movie.mp4"></video><button>Play video</button></main>'],
  ['canvas dashboard', '<main role="main"><div role="application"><canvas></canvas><button>Zoom in</button></div></main>']
]) {
  test(`rejects an artifact-only ${name}`, () => {
    const document = new JSDOM(`<html><head><title>Artifact</title></head><body>${markup}</body></html>`, { url: `https://example.com/${name.replace(' ', '-')}` }).window.document;
    assert.throws(() => extractFromDocument(document), /No useful textual content/i);
  });
}

test('returns a useful error for pages without extractable text', () => {
  const document = new JSDOM('<html><head><title>Empty</title></head><body><nav>Menu</nav><img src="x"></body></html>', { url: 'https://example.com/empty' }).window.document;
  assert.throws(() => extractFromDocument(document), /No useful textual content/i);
});
