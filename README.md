# ExpressNet AI Product Suite — Website

Production-ready static marketing site for the ExpressNet Inc. AI product family.
No build step, no dependencies — pure HTML, CSS, and vanilla JS.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home / suite overview, stats, portfolio, FAQ |
| `products.html` | Five products + shared platform layer |
| `industries.html` | Industry → product-fit → value table |
| `demo.html` | Demo package and suggested workflow |
| `partners.html` | Licensing, white-label, pilots, acquisition |
| `contact.html` | Demo-request form and company details |
| `404.html` | Custom not-found page |

## What's included

- Responsive design with mobile hamburger menu
- SEO: per-page titles/descriptions, canonical URLs, `sitemap.xml`, `robots.txt`
- Social sharing: Open Graph + Twitter cards, `assets/og-image.svg`
- Structured data (JSON-LD Organization) on the home page
- Scroll-reveal animations, sticky nav, accessible focus states, skip link
- SVG favicon and brand mark
- Vercel config with clean URLs, caching, and security headers

## Deploy to Vercel

**Option A — Git (recommended)**

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework preset: **Other**. Build command: *(none)*. Output dir: `./`.
4. Deploy. `vercel.json` handles clean URLs, caching, and headers.

**Option B — CLI**

```bash
npm i -g vercel
cd ExpressNetAI
vercel          # preview deploy
vercel --prod   # production deploy
```

## Custom domain

1. Vercel → Project → **Settings → Domains** → add `expressnet.ca` / `www.expressnet.ca`.
2. Point DNS as instructed (A/ALIAS or CNAME). HTTPS is automatic.

## Before you publish (checklist)

- [ ] Replace `www.expressnet.ca` canonical/OG URLs if the final domain differs
      (they appear in each page's `<head>` and in `sitemap.xml` / `robots.txt`).
- [ ] Confirm the contact email (`info@expressnet.ca`).
- [ ] Wire the contact form to a backend (email, CRM, or Azure Functions) — see `assets/js/main.js`.
- [ ] Add final pricing, product screenshots, privacy policy, and terms.
- [ ] Optionally export `assets/og-image.svg` to PNG for maximum social-preview compatibility.
