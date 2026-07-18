const preview = document.querySelector('#preview');
const status = document.querySelector('#status');
const copyButton = document.querySelector('#copy');
const exportButton = document.querySelector('#export');
const refreshButton = document.querySelector('#refresh');
let extractedTitle = 'page';

function setStatus(message, kind = '') {
  status.textContent = message;
  status.className = `status ${kind}`.trim();
}

function setBusy(busy) {
  refreshButton.disabled = busy;
  copyButton.disabled = busy || !preview.value;
  exportButton.disabled = busy || !preview.value;
}

async function extract() {
  preview.value = '';
  setBusy(true);
  setStatus('Extracting current page…');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error('No active tab is available.');
    if (!/^https?:/i.test(tab.url || '')) {
      throw new Error('Chrome internal pages and local browser pages cannot be extracted. Open a regular web page and try again.');
    }
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => globalThis.PageToMarkdown.extractPage()
    });
    if (!result?.markdown) throw new Error('Extraction returned no Markdown.');
    preview.value = result.markdown;
    extractedTitle = result.title || 'page';
    const detail = result.usedFallback ? ' Used the cleaned page-body fallback.' : '';
    setStatus(`Ready — ${result.markdown.length.toLocaleString()} characters.${detail}`, 'success');
  } catch (error) {
    setStatus(error?.message || 'Could not extract this page.', 'error');
  } finally {
    setBusy(false);
  }
}

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.value);
    setStatus('Markdown copied to clipboard.', 'success');
  } catch {
    preview.select();
    const copied = document.execCommand('copy');
    setStatus(copied ? 'Markdown copied to clipboard.' : 'Copy failed; select the preview and copy it manually.', copied ? 'success' : 'error');
  }
});

exportButton.addEventListener('click', () => {
  const safeName = extractedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'page';
  const url = URL.createObjectURL(new Blob([preview.value], { type: 'text/markdown;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${safeName}.md`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  setStatus(`Exported ${anchor.download}.`, 'success');
});

refreshButton.addEventListener('click', extract);
extract();
