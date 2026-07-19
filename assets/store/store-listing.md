# Chrome Web Store listing draft

## Name

PagePith

## Tagline

Clean pages. Plain Markdown.

## Short description

Turn the useful text on the current page into clean Markdown. Copy or export it without ads, images, navigation, or tracking clutter.

## Detailed description

PagePith converts the useful text on the current webpage into clean Markdown.

Open the extension on a regular webpage, review the extracted Markdown, then copy it or save it as a `.md` file. PagePith removes common page clutter such as navigation, advertisements, cookie banners, forms, images, embeds, social widgets, and recommendation blocks.

It preserves useful structure where possible:

- headings and paragraphs
- ordered and unordered lists
- links and blockquotes
- fenced code blocks
- Markdown tables
- page title and source URL

Pages that consist mainly of maps, video players, image galleries, canvases, or other interactive artifacts are rejected instead of being exported as misleading text.

PagePith runs locally. It does not send page content, URLs, generated Markdown, analytics, or identifiers to the developer or any third party. It requests temporary access only to the active tab after you open the extension.

Some content cannot be extracted, including Chrome internal pages, login-protected content, paywalled text, closed shadow DOM, inaccessible cross-origin frames, and content that has not loaded yet.

## Category

Productivity

## Support URL

https://github.com/heyjdev/pagepith/issues

## Privacy policy URL

https://github.com/heyjdev/pagepith/blob/main/PRIVACY.md

## Permission justifications

### activeTab

PagePith needs temporary access to the webpage selected by the user so it can read that page and convert its useful text into Markdown.

### scripting

PagePith injects its packaged extraction code into the active tab after the user opens the extension. The code processes the page locally and does not modify the original page.

## Remote code declaration

No. All runtime code and third-party dependencies are packaged inside the extension.

## Privacy summary

Page content is processed locally in memory. PagePith does not collect, transmit, sell, or retain page content, browsing history, generated Markdown, personal information, analytics, or identifiers.
