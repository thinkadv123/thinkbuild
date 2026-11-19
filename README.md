# Think Build — thinkbuild.net

Multi-page marketing site for **Think Build — Constructions & Contracting**, exclusive agent of Polymar EG.
Rebuilt from the legacy WordPress site with all of its content, products, services, projects, images and datasheets.

## Stack

- **Next.js 16** (App Router, fully static: every page is pre-rendered)
- **Framer Motion**: page transitions, split-text reveals, scroll parallax, pinned horizontal services scroller, animated filters, 3D tilt cards, counters
- **Lenis**: inertial smooth scrolling (disabled for reduced-motion users)
- **Tailwind CSS v4**: brand tokens in `app/globals.css` (yellow `#E4DD16` on ink `#1A191D`)
- Animated SVG export-routes map, first-visit preloader, magnetic buttons

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero slider, Polymar partnership, product categories, stats, services, global reach, projects |
| `/about` | Who we are, Polymar EG partnership, mission / vision / values, why choose us |
| `/products` | 9 categories + searchable / filterable catalogue of 59 products |
| `/products/[category]` | Category intro and products |
| `/products/[category]/[product]` | Product details, datasheet PDF, request via form or WhatsApp |
| `/services`, `/services/[slug]` | 11 services with scope of work and related projects |
| `/projects`, `/projects/[slug]` | 41 projects filterable by sector and work type |
| `/contact` | Contact details, map, enquiry form (sends via WhatsApp or email) |

Old WordPress URLs (`/who-are-we`, `/service/*`, `/lq-project/*`, `/product/*`, …) permanently redirect to the new pages (see `next.config.ts`).

## Editing content

All content lives in `lib/data/`:

- `company.ts`: phone, WhatsApp, email, address, stats, navigation
- `categories.ts`, `products.ts`: product catalogue (images in `public/images/products`, PDFs in `public/datasheets`)
- `services.ts`, `projects.ts`: services and project references

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deployment

- **GitHub Pages**: every push to `main` runs `.github/workflows/pages.yml`, which builds a static export
  (`PAGES_BASE_PATH=/thinkbuild npm run build` → `out/`) and publishes it to
  https://thinkadv123.github.io/thinkbuild/. Static hosting can't do server redirects, so the legacy-URL
  redirects only apply on a Next.js host.
- **Any Next.js host** (e.g. Vercel): `npm run build` with no `PAGES_BASE_PATH` keeps image optimization and
  the legacy WordPress redirects.
