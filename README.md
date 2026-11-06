# Brand.bz — Free Brand-Building Studio

Static, responsive website for **Brand.bz**: 8 free branding tools, 7 original guides, a video academy, a 45-term glossary, live auto-updating news, lead generation (free brand audit), donations, sponsorships, contests and a talent network. It is AdSense-ready (`ca-pub-6620975821265271`).

## How it's hosted
GitHub Pages builds this repo with **Jekyll** automatically (free plan, `main` branch, root). No build step is needed.
- `_layouts/default.html` holds the `<head>` (AdSense, SEO, OG), the top banner and the page shell.
- `_includes/header.html` and `_includes/footer.html` hold the navigation, footer, cookie banner, sticky CTA and Starter Kit modal.
- Each `*.html` page is front matter (title, description, canonical, tools flag) plus its body inside `{% raw %}`.

**One-time setup:** go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then click **Save**.

**Custom domain:** add `brand.bz` under Pages → Custom domain. At the registrar, set these A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus a CNAME record `www` → `webworksa1.github.io`. Then tick **Enforce HTTPS**.

## Editing
- To edit a page, edit its `.html` file. To change the nav or footer on every page, edit `_includes/`.
- Styles are in `assets/css/style.css`, site logic in `assets/js/main.js` and the tools in `assets/js/tools.js`.
- Content dates are written directly in each page.

## Self-updating content
- **News** loads live in the browser (Google News RSS via rss2json) and falls back to `data/news.json`.
- **Tip of the day** rotates daily.
- **Optional daily server-side refresh:** copy `scripts/github-workflow-update-news.yml` to `.github/workflows/update-news.yml` (Add file → Create new file). It runs `scripts/update_news.py` daily to refresh `data/news.json`.

## Forms & privacy
All forms post through FormSubmit to the owner's address. The address is assembled at runtime and never appears in the source or on the page. **The first form submission triggers a one-time FormSubmit activation email, which must be confirmed.** Donations go through PayPal Donate.

## AdSense checklist
- `ads.txt` is at the root.
- Privacy, Terms, Cookie, Trademark/Disclaimer, About and Contact pages are in place.
- After approval, enable Auto ads and Google's certified CMP (Privacy & messaging) for EEA/UK visitors.
- Optional: add a 1200×630 `assets/img/og.png` and an `og:image` tag to `_layouts/default.html` for richer social previews.

See `BUILD-PROMPT.md` for the full phase-wise build specification.

© Brand.bz. "Brand" is used as a generic word; Brand.bz is not affiliated with any company whose name or trademark includes it.
