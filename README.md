# Brand.bz — Free Brand-Building Studio

Static, responsive website for **Brand.bz**: 8 free branding tools, original guides, a video academy, a glossary, auto-updating news, lead generation, donations, sponsorships, contests and a talent network. It is AdSense-ready (`ca-pub-6620975821265271`).

## Hosting (GitHub Pages, free)
1. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then click **Save**.
2. Custom domain: enter `brand.bz` and point DNS to GitHub Pages using these A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Then turn on **Enforce HTTPS**.

## Editing
- All pages are generated from `scripts/layout.py`, `scripts/build.py` and `scripts/articles.py`. Run `python3 scripts/build.py` after edits.
- Styles are in `assets/css/style.css`. Site logic is in `assets/js/main.js`, and the tools are in `assets/js/tools.js`.
- News updates itself daily through `.github/workflows/update-news.yml`, which writes `data/news.json`.

## Forms & privacy
Forms post through FormSubmit to the owner's address. The address is assembled at runtime and never appears in the source. **The first form submission triggers a one-time FormSubmit activation email, which must be confirmed.** Donations go through PayPal Donate.

## AdSense checklist
- `ads.txt` is at the root.
- Privacy, Terms, Cookie, Disclaimer, About and Contact pages are in place.
- Enable Auto ads and Google's certified CMP for EEA/UK.

See `BUILD-PROMPT.md` for the full phase-wise build specification.

© Brand.bz. "Brand" is used as a generic word; Brand.bz is not affiliated with any company whose name or trademark includes it.
