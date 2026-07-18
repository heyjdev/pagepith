# PageSift preliminary name-clearance report

**Search date:** 2026-07-18  
**Product:** Local Chrome extension that extracts useful webpage text and exports clean Markdown  
**Scope:** Broad practical U.S.-focused trademark and common-law screening, not a legal opinion or attorney clearance search

## Executive conclusion

**Recommendation: do not launch under `PageSift`. Rename while the cost is still low.**

No exact `PAGESIFT` federal trademark record or exact Chrome Web Store listing was found. However, the common-law search found an earlier public project using the exact name for a Chrome extension that extracts webpage data, an active software service at `pagesift.app`, and several close names in closely related extraction/content-filtering software. Those are material marketplace-confusion concerns even without a federal registration.

## Material findings

### 1. Exact-name Chrome extension project: PageSift

- **Name:** PageSift
- **URL:** https://github.com/alec-kr/pagesift
- **Description:** “AI-Powered Chrome Extension for Product Scraping”
- **Function:** Extracts structured product data from webpages and exports CSV
- **Created:** 2025-06-04
- **Last code push observed:** 2025-06-08
- **Risk:** **High.** Exact name, same distribution format, and substantially overlapping webpage-extraction behavior. Its small footprint and lack of a visible Store listing reduce commercial weight, but not the likelihood of confusion or prior-use concern.

### 2. Active exact-name software service: pagesift.app

- **Name:** pagesift
- **URL:** https://pagesift.app/
- **Description:** Reads invoices, bills, and bank statements and exports checked accounting data
- **Domain registration observed:** 2026-07-01
- **Status:** Active website offering demos and pricing inquiries
- **Risk:** **High.** Exact name and related document/data-extraction software. The source documents and output differ, but both products “sift” documents into structured useful data.

### 3. PageSieve Firefox extension

- **Name:** PageSieve
- **URL:** https://addons.mozilla.org/en-US/firefox/addon/pagesieve/
- **Description:** Browser extension for extracting structured data from webpages and exporting it in multiple formats
- **Version/status observed:** Version 1.5.0, updated 2026-06-15, one listed user
- **Risk:** **Moderate to high.** Different word, but very similar sound, metaphor, product type, and function.

### 4. Current Chrome extension named Sift

- **Name:** Sift
- **URL:** https://chromewebstore.google.com/detail/sift/haamihpgoekfknbdeigbjjibkibajlgd
- **Description:** Performs local semantic search over webpage text and identifies relevant passages
- **Status observed:** Current Chrome Web Store listing, updated 2026-03-03
- **Risk:** **Moderate.** The name is only the shared `Sift` component, but the channel and webpage-text filtering function overlap directly.

### 5. PageSifter iOS application

- **Name:** PageSifter
- **URL:** https://apps.apple.com/us/app/pagesifter/id6761118497
- **Description:** Human-curated technology-news aggregator that sifts the daily flood of information
- **Status observed:** Current App Store listing in 2026
- **Risk:** **Moderate.** Close name and related content-filtering concept, although it is a news app rather than a browser extension.

### 6. oncall-page-sift

- **Name:** oncall-page-sift
- **URL:** https://github.com/iwaheedsattar/oncall-page-sift
- **Description:** Local CLI and desktop app that converts noisy on-call pages into Markdown triage briefs
- **Created:** 2026-06-09
- **Risk:** **Moderate.** Longer compound name, but the local “noisy pages to Markdown” function is unusually close.

### 7. Older Facebook Page Sifter project

- **Name:** Facebook Page Sifter
- **URL:** https://github.com/ankitbahl/facebook-page-sifter
- **Description:** Java app that filters Facebook page/group posts and exports matching content
- **Last code push observed:** 2017-11-16
- **Risk:** **Low.** Old and apparently inactive, but another data point showing crowded use of “page” plus “sift/sifter.”

## Federal trademark search

Official USPTO Trademark Search was checked using the Wordmark search mode.

- `PageSift`: no results
- `PageSift*`: no results
- `PageSifter`: no results
- `SiftPage`: no results

A broader `SIFT` search returned numerous live or pending marks, including software in Classes 9 and 42. Examples observed include marks owned by Sift Science, Sift Enterprises, Sift Media, Sift Stack, All Turtles, and others.

These `SIFT` marks do not automatically block `PageSift`; many cover unrelated fraud, enterprise, observability, media, storage, or news products. They do show that `SIFT` is crowded in software and that exclusivity would likely be narrow.

Official search: https://tmsearch.uspto.gov/search/search-information

## Marketplace and registry checks

### Browser-extension stores

- Chrome Web Store: no exact `PageSift` listing
  - https://chromewebstore.google.com/search/PageSift
- Microsoft Edge Add-ons: no exact `PageSift` listing; three fuzzy unrelated results
  - https://microsoftedge.microsoft.com/addons/search/PageSift
- Firefox Add-ons: no exact `PageSift` listing; the materially similar `PageSieve` listing was found
- Google Play: no exact result
- Apple App Store: no exact `PageSift`, but `PageSifter` was found

### Code and package registries

- GitHub: two exact-name repositories found
  - Material: https://github.com/alec-kr/pagesift
  - Empty 2019 repository: https://github.com/AAdi8055/Pagesift
- npm exact `pagesift`: no package
- PyPI exact `pagesift`: HTTP 404 / no project
- RubyGems exact `pagesift`: HTTP 404 / no gem
- crates.io exact check was blocked with HTTP 403 and could not be confirmed

### Domains

- `pagesift.com`: registered since 2023; resolved to an address but HTTPS timed out, consistent with inactive or parked use
- `pagesift.app`: registered and serving an active software-service website
- `pagesift.dev`: registered according to RDAP but did not resolve during the check
- `getpagesift.com`: no RDAP registration or DNS response observed

## Risk classification

| Factor | Result |
|---|---|
| Exact federal mark | None found |
| Exact Chrome Store listing | None found |
| Exact prior Chrome-extension use | **Found** |
| Exact active software-service use | **Found** |
| Similar active browser-extension name/function | **Found** |
| Similar app/content-filtering use | **Found** |
| Overall practical risk | **High enough to rename** |

## Recommendation

Do not spend money trying to clear or defend `PageSift` for a simple extension. The exact prior Chrome-extension use and active `pagesift.app` service are the two decisive findings. Rename now, preserve the underlying icon/filter concept where possible, and run the same screen on the replacement before changing the repository again.

## Limitations

- This was not an attorney-supervised comprehensive clearance search.
- Search-engine results were noisy and sometimes affected by bot defenses.
- State trademark databases, every national trademark office, paid company databases, and unindexed private commercial use were not exhaustively searched.
- No accounts were created and no owners were contacted.
- Absence from a registry is not proof of absence from commerce.
