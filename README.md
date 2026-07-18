# Page to Markdown

A local-only Chrome Manifest V3 extension prototype that turns the useful text on the active web page into clean Markdown for agents, LLMs, notes, or archives.

## Features

- Extracts the primary article with Mozilla Readability.
- Falls back to a cleaned `main`/`article`/page body when Reader Mode output is too sparse.
- Removes navigation, ads, cookie/consent UI, forms, scripts, styles, images, embeds, social/recommendation clutter, and common tracking artifacts.
- Preserves headings, paragraphs, lists, blockquotes, fenced code, GFM tables, and links through Turndown + its GFM plugin.
- Includes the page title and source URL in every result.
- Provides an editable preview, one-click copy, and `.md` export.
- Makes no external requests and uses no telemetry or remote-hosted code.

## Architecture

1. `src/popup.js` requests the active tab after the user opens the extension.
2. Chrome's `scripting` API injects the locally bundled `dist/content.js` into that tab.
3. `src/core.js` clones the DOM, strips known clutter, and runs Mozilla Readability. Sparse results use a cleaned relevant-body fallback.
4. Turndown converts the selected local HTML to Markdown with the bundled GFM rules.
5. The structured result returns to the popup for preview/copy/export. The original page DOM is never modified.

The production content script is bundled by esbuild. Runtime code and pinned dependencies are packaged inside `dist/`; the extension CSP does not require remote code or `eval`.

## Privacy and permissions

**Privacy:** Page content is processed in memory, inside the active tab and extension popup. No page content, URL, Markdown, analytics, or identifiers are transmitted. There are no external network calls, telemetry endpoints, accounts, or background services.

Permissions are intentionally limited:

- `activeTab`: temporary access only to the page where the user invokes the extension.
- `scripting`: inject the packaged extraction bundle into that active tab.

No host permissions, storage permission, downloads permission, or clipboard permission are requested. Export uses a local Blob download, and copying is initiated directly by the user from the popup.

## Development

Requirements: Node.js 20+ and npm.

```bash
cd /home/r3d/projects/page-to-markdown
npm install
npm test
npm run build
```

Run the complete verification sequence with:

```bash
npm run check
```

The automated tests use noisy HTML fixtures under `test/fixtures/` and verify semantic Markdown preservation, clutter/image/ad/navigation removal, fallback behavior, metadata, and empty-page errors.

## Load the unpacked extension

1. Run `npm run build`.
2. Open `chrome://extensions` (or `chromium://extensions`).
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the absolute directory `/home/r3d/projects/page-to-markdown/dist`.
6. Open a regular `http://` or `https://` page and click **Page to Markdown** in the toolbar.

The `dist/` directory is the complete unpacked extension artifact. Rebuild and click **Reload** on the extensions page after source changes.

## Usage

Open the popup on a web page. Extraction starts automatically. Review or edit the Markdown preview, then choose **Copy Markdown** or **Export .md**. Use the refresh button to re-extract after the page changes.

A green status explains whether normal article extraction or the cleaned fallback was used. Errors are shown for unsupported/restricted browser pages and pages with no useful textual content.

## Known limitations

- Chrome blocks injection on internal pages such as `chrome://`, the Chrome Web Store, extension pages, and some privileged PDF/browser viewers.
- Content hidden behind login screens, paywalls, closed shadow DOM, inaccessible cross-origin frames, or content not yet rendered cannot be extracted.
- Heuristic cleanup can occasionally remove useful sidebars or retain unfamiliar site-specific clutter.
- Image content and image alt text are intentionally excluded.
- Very complex tables may lose spans or layout details when represented as GFM tables.
- Copy availability can depend on browser clipboard policy; the popup attempts a legacy local fallback and otherwise leaves the preview selectable.

## Key paths

- `src/manifest.json` — MV3 manifest
- `src/core.js` — cleanup, Readability selection, fallback, and Markdown conversion
- `src/content-entry.js` — injected bundle entry point
- `src/popup.{html,css,js}` — popup experience
- `test/extraction.test.js` — automated behavior tests
- `scripts/build.js` — reproducible unpacked-extension build

## License

MIT. Bundled third-party packages retain their own licenses: Mozilla Readability (Apache-2.0), Turndown (MIT), and turndown-plugin-gfm (MIT).
