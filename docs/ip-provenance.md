# Intellectual-property provenance

This file records the origin and licensing status of PageSift's distributed code and brand assets. It is an engineering record, not a legal opinion.

## Product name and tagline

- Product name: `PageSift`
- Primary tagline: `Clean pages. Plain Markdown.`
- Secondary line: `Keep the page. Lose the noise.`

Names, titles, slogans, and short phrases are generally trademark questions rather than copyright questions in the United States. A formal trademark clearance search has not yet been completed.

## Logo and icon

The master artwork is `assets/brand/pagesift-icon.svg`.

- Created specifically for PageSift in this repository.
- Composed only of original arrangements of basic geometric shapes and project colors.
- Contains no stock artwork, third-party logos, Chrome branding, emoji, icon-font glyphs, or embedded fonts.
- A generated raster concept was used during internal exploration but is not included or distributed. The final SVG was built separately as explicit vector geometry.
- PNG files in `assets/brand/renders/` and `src/icons/` are mechanical renders of the master SVG.

## Store promotional image

The master artwork is `assets/store/pagesift-promo-440x280.svg`.

- Created specifically for PageSift.
- Uses the PageSift vector mark, original layout, product name, and project copy.
- Contains no photographs, stock assets, third-party logos, or embedded font files.
- The PNG is a mechanical render of the SVG.

Future screenshots and promotional artwork must be added to this record before release. Screenshots should avoid exposing copyrighted article text beyond what is reasonably necessary to demonstrate the extension; a purpose-made local test page is preferred.

## Runtime libraries

Distributed runtime dependencies and their license texts are recorded in `THIRD_PARTY_LICENSES.txt` and copied into the production package:

- Mozilla Readability 0.6.0: Apache-2.0
- Turndown 7.2.0: MIT
- turndown-plugin-gfm 1.0.2: MIT

Development-only dependencies are not shipped in the extension bundle:

- esbuild 0.25.6: MIT
- jsdom 26.1.0: MIT

## Project code and copy

Project-specific source code, tests, documentation, privacy copy, and store copy were created for this repository and are released under the repository's MIT license unless a file states otherwise.
