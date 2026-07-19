# Chrome Web Store submission checklist

This checklist tracks the first PagePith submission. Official references:

- [Register a developer account](https://developer.chrome.com/docs/webstore/register)
- [Publish an extension](https://developer.chrome.com/docs/webstore/publish)
- [Supply Store images](https://developer.chrome.com/docs/webstore/images)
- [Complete listing information](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)
- [Complete privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)

## 1. Developer account — owner action

- [ ] Open the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/).
- [ ] Accept the developer agreement and policies.
- [ ] Pay Google's one-time developer registration fee.
- [ ] Set the publisher name and verify the developer contact email.

Do not share payment details, passwords, verification codes, or account recovery information with an agent.

## 2. Production package

- [x] Manifest V3.
- [x] Version `0.1.0` selected for the first candidate.
- [x] Permissions limited to `activeTab` and `scripting`.
- [x] Runtime dependencies bundled locally.
- [x] No telemetry, external requests, or remote-hosted runtime code.
- [x] Required PNG icons included in the production build.
- [x] License and third-party notices included.
- [ ] Build and preserve the final ZIP with `manifest.json` at the archive root.
- [ ] Install the exact ZIP in a clean Chrome profile and complete a final smoke test.
- [ ] Record the ZIP SHA-256 checksum and tag the matching source revision.

Candidate verification sequence:

```bash
npm ci
npm test
npm run build
npm audit --omit=dev
```

The uploaded ZIP must contain the files inside `dist/`, not the `dist/` directory itself.

## 3. Store listing

- [x] Listing name, short description, detailed description, and category drafted in [`assets/store/store-listing.md`](../assets/store/store-listing.md).
- [x] Required 128×128 PNG extension icon included in the package.
- [x] Required 440×280 promotional image prepared.
- [x] Required screenshot prepared at the preferred 1280×800 size.
- [x] Public support URL selected: <https://github.com/heyjdev/pagepith/issues>.
- [x] Public privacy-policy URL selected: <https://github.com/heyjdev/pagepith/blob/main/PRIVACY.md>.
- [ ] Enter the listing copy and upload the images in the Developer Dashboard.

Current assets:

- [`assets/store/pagepith-promo-440x280.png`](../assets/store/pagepith-promo-440x280.png)
- [`assets/store/pagepith-screenshot-1280x800.png`](../assets/store/pagepith-screenshot-1280x800.png)

## 4. Privacy practices

Use the exact claims supported by the production artifact:

- **Single purpose:** Convert the useful textual content of the active webpage into locally generated Markdown for copying or export.
- **`activeTab`:** Temporarily access the webpage explicitly selected by the user.
- **`scripting`:** Inject the packaged extraction code into that active tab after the user invokes PagePith.
- **Remote code:** None. All runtime code and dependencies are packaged with the extension.
- **Data handling:** Page content, URLs, generated Markdown, analytics, identifiers, and personal information are not collected, transmitted, sold, or retained by PagePith.

- [ ] Enter the single-purpose statement.
- [ ] Enter both permission justifications.
- [ ] Declare that the extension does not use remote code.
- [ ] Complete the data-use disclosures consistently with [`PRIVACY.md`](../PRIVACY.md).
- [ ] Certify the privacy practices.

## 5. Distribution and review

- [ ] Set the item as free with no in-app purchases.
- [ ] Select the intended regions.
- [ ] Use Trusted testers or Unlisted for the first Store-installed validation when practical.
- [ ] Confirm that no account or special credentials are needed for review.
- [ ] Submit for review with deferred publishing enabled.
- [ ] After approval, install the Store-hosted build and retest extraction, preview, copy, export, errors, and restricted-page behavior.
- [ ] Publish publicly only after the Store-hosted smoke test passes.

## Final release gate

Do not submit a different ZIP from the one that was smoke-tested and checksummed. Preserve the submitted artifact and its matching source tag for future updates.
