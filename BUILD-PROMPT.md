# Brand.bz — Phase-Wise Build Prompt

**Concept:** *Brand.bz — the free brand-building studio.* A free, browser-based toolkit plus original guides that helps founders, creators and small businesses name, design, position and launch a brand. It makes money from AdSense on high-intent marketing traffic, lead generation (free brand audits that turn into paid branding work and talent-network referrals), sponsorships, donations and contests.

**Why this idea wins for "brand":**
- **Search demand is evergreen and transactional.** "Business name generator", "brand name generator", "slogan generator" and "color palette generator" are tool-intent searches with high volume all year. US searches for "AI name generator" and close variants alone pass 12k a month.
- **Marketing and business niches pay well for AdSense.** Advertisers include registrars, website builders, design SaaS and print services.
- **The tools earn repeat visits and links.** The guides give AdSense crawlers the original, substantial content they need before approving a site.
- **The lead magnet fits the traffic.** Someone naming a business today needs a logo, website and launch help tomorrow, so a free audit converts that visitor into a paid client.

Paste each phase below into an AI coding assistant in order. Each phase must be complete and tested before the next one starts.

---

## Phase 1 — Foundation, layout & compliance
> Build a static, responsive, accessible website for the domain **Brand.bz**. Use plain HTML, CSS and vanilla JS only, with no frameworks. It must be hostable on GitHub Pages' free plan from the `main` branch root, and every path must be relative.
> - Design: modern, with a violet→pink gradient brand, Inter + Space Grotesk fonts, light and dark mode (saved in localStorage), a sticky glass header, dropdown navigation, a mobile burger menu, scroll-reveal animations and print styles.
> - On **every page**, add a top tagline reading "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership". The tagline itself is the link to the contact page; never show the linked domain as visible text anywhere on the site.
> - In the `<head>` of every page, add the AdSense script `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>` and `<meta name="google-adsense-account" content="ca-pub-6620975821265271">`.
> - Create `ads.txt` containing `google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`, plus robots.txt, sitemap.xml, a web manifest, a favicon, an OG image, canonical tags, Open Graph tags and JSON-LD (WebSite, Organization, Article, FAQPage).
> - Pages: About, Contact, Privacy Policy (including Google's required AdSense cookie language and opt-out links), Terms, Cookie Policy, a Trademark & Copyright Disclosure (stating that "brand" is used only as a generic word, with no affiliation to any "brand"-named company and all third-party marks belonging to their owners) and a 404 page.
> - Add a cookie consent banner and a footer with the copyright and trademark disclosure.
> - Use Jekyll (built into GitHub Pages): one `_layouts/default.html` plus `_includes/` header and footer, so every page shares identical chrome with no build step.

## Phase 2 — Free tools (the traffic engine)
> Build 8 client-side tools. Each one gets its own SEO page with 150–300 words of original explanatory content and an audit CTA.
> 1. **Brand Name Generator.** Keywords, vibe and style feed suffix, prefix, blend, compound and invented-word algorithms to produce 30 names. Each name links to domain search (.com/.bz), social handles, and the USPTO, CIPO and WIPO trademark databases. Favourites are saved in localStorage. A `?kw=` URL parameter lets the homepage search feed it.
> 2. **Slogan/Tagline Generator** built from templates (name, category, benefit, audience), with copy buttons.
> 3. **Brand Color Palette** with 5 harmony modes, a base color, lockable swatches, spacebar shuffle, WCAG contrast labels and CSS-variable export. The palette is saved for the brand guide.
> 4. **Font Pairing Studio** with 20 Google Fonts pairs, live preview of the user's name and tagline, a mood filter and copyable CSS.
> 5. **Name Strength Checker.** Scores length, syllables, consonant clusters, hyphens and digits, runs a radio test, and links to conflict searches.
> 6. **Positioning Statement Builder** that updates live, including an "onliness" statement.
> 7. **Brand Strength Score.** A 12-question quiz scored out of 100 with focus areas, linking to the audit with the score pre-filled.
> 8. **Brand Guide Builder.** A live one-page guide (mission, audience, voice, palette, fonts, logo rules) that can be printed or saved as PDF.

## Phase 3 — Content hub (AdSense approval and SEO)
> Write at least 7 original long-form guides (700–1,200 words each, with H2 structure, tables, internal links to the tools and an Article schema). Topics: what a brand is, how to name a business, brand color psychology, positioning statements, brand voice, trademark basics (labelled as general information) and a 40-point launch checklist.
> Also build a 45-term A–Z glossary, a curated resources directory, and a Video Academy that embeds verified YouTube videos through privacy-enhanced, click-to-load embeds, plus YouTube topic search links.
> Add a home page "tip of the day" that rotates daily.

## Phase 4 — Lead generation (the revenue engine)
> - **/audit.html**: a 3-step form with a progress bar (business info, then goals with needs chips, budget and timeline, then contact details with consent). It has a sticky placement, a "what you get" value stack, an FAQ with schema, and it captures the quiz score.
> - A quick audit form on the homepage, a sticky "Free Brand Audit" button on every page, CTA boxes in every article and tool page, and an exit-intent / 45-second "Brand Starter Kit" email-capture modal.
> - **All forms** post through the FormSubmit AJAX endpoint with a honeypot field and success or error messages. The only recipient is the owner's address, which is **assembled at runtime from an obfuscated string**. It must never appear in the HTML, the JS as plain text, or the rendered page. Contact links open mail through JS behind link text.

## Phase 5 — Monetization & community
> - **Support / Donate**: preset and custom amounts, a choice of purpose (operations, new tools, promotion, hiring, prizes), a monthly toggle and a PayPal Donate redirect, with the recipient also assembled at runtime.
> - **Sponsor & Advertise**: 3 tiers (featured listing, tool sponsor, contest partner) and an inquiry form. All sponsored placements are clearly labelled.
> - **Contests**: a monthly Name & Tagline Challenge with a brief, prizes funded by sponsors and supporters, a rules summary ("no purchase necessary", void where prohibited, 18+) and an entry form.
> - **Careers / Talent network**: 6 roles and an application form.

## Phase 6 — Automation & self-updating
> - The news section fetches live Google News RSS headlines in the browser (via rss2json, headlines and links only) and falls back to `data/news.json`. It shows a "last updated" stamp.
> - Optional: `scripts/update_news.py` plus a daily GitHub Action (template in `scripts/github-workflow-update-news.yml`) refresh `data/news.json` server-side and commit to `main`, which redeploys Pages automatically.
> - The tip of the day rotates by date.

## Phase 7 — QA, deploy & AdSense application
> Test every tool in a headless browser, check for JS errors, broken internal links and email exposure (grep), and check the mobile and desktop layouts. Then:
> 1. Push to `github.com/WEBWORKSA1/brand-bz`, branch `main`.
> 2. Go to Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
> 3. Custom domain: add `brand.bz` in Pages settings. At the registrar, set A records to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a CNAME record `www` → `webworksa1.github.io`. Then enable "Enforce HTTPS".
> 4. In Search Console, submit `https://brand.bz/sitemap.xml`.
> 5. In AdSense: add the site, verify ads.txt, enable Auto ads, and turn on the Google-certified CMP (Privacy & messaging) for EEA/UK visitors before applying.
> 6. Send the first test form so FormSubmit can deliver its one-time activation email.

## Phase 8 — Growth roadmap
> Planned next: affiliate links (registrars, logo makers, website builders) disclosed in an affiliate notice; a monthly newsletter; programmatic SEO pages ("brand names for [industry]", e.g. 50 industries); a paid "done-for-you" brand-kit service; a logo sketcher tool; a domain-name marketplace page fed by the owner's portfolio; translated versions (FR/ES/HI); and a public contest gallery.
