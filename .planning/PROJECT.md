# SEO+GEO Wave 2: Critical & High Priority Optimizations

## What This Is

Second wave of SEO and GEO (Generative Engine Optimization) improvements for two B2B equipment websites: XEH.ro (HoReCa equipment, Next.js 14 TypeScript) and InfiniTrade.ro (industrial equipment, Next.js JavaScript). Both belong to Driatheli Group SRL and need enhanced structured data, content signals, and AI search visibility.

## Core Value

Maximize organic search visibility on Google Romania AND AI search engines (ChatGPT, Gemini, Perplexity, Claude) through high-impact schema, content, and local SEO improvements that directly drive B2B lead generation.

## Requirements

### Validated

<!-- Wave 1 completed: 10 commits, all pushed and deployed -->

- ✓ Schema.org: Product, Organization, LocalBusiness, BreadcrumbList, FAQ, Article, Review — Wave 1
- ✓ llms.txt on both sites (spec v1.1.0) — Wave 1
- ✓ AI crawler access (GPTBot, ClaudeBot, PerplexityBot) — Wave 1
- ✓ Answer-first content on all landing pages — Wave 1
- ✓ Comparison tables with prices (XEH.ro 3 pages) — Wave 1
- ✓ Content freshness signals on all key pages — Wave 1
- ✓ ISR on 7+ pages per site — Wave 1
- ✓ hreflang for Romanian targeting — Wave 1
- ✓ Pagination noindex (page > 1) — Wave 1
- ✓ framer-motion removed from InfiniTrade.ro (-42KB) — Wave 1
- ✓ CSP clean on both sites (no unsafe-eval) — Wave 1

### Active

<!-- Wave 2 scope: Critical + High priority items from audit -->

**Schema.org Enhancements:**
- [ ] Service schema on both sites (consultanță, instalare, service)
- [ ] areaServed with specific Romanian cities in LocalBusiness
- [ ] ContactPage schema on contact pages
- [ ] AggregateOffer for XEH.ro products with price ranges
- [ ] ItemList with actual products in CategoryJsonLd (XEH.ro)

**Content & E-E-A-T:**
- [ ] Visible author bylines on blog articles (XEH.ro)
- [ ] Related articles section at end of blog posts (XEH.ro)
- [ ] Internal links from blog articles to product/category pages (InfiniTrade.ro)
- [ ] Phone format consistency across InfiniTrade.ro

**GEO (AI Search):**
- [ ] Pros/cons lists on landing pages (both sites)
- [ ] Statistics/data sections in blog articles
- [ ] Expert quotes on landing pages

**Local SEO:**
- [ ] Google Maps embed on contact pages (both sites)

**Performance:**
- [ ] Web Vitals tracking (INP monitoring) on both sites

### Out of Scope

- TOC on blog articles — medium priority, defer to Wave 3
- Image sitemap — Next.js doesn't support, Google discovers via crawl
- Video schema — no video content yet
- Calculator/tool pages — significant dev effort, defer
- Glossary page — content creation needed, defer
- Dark mode — UX feature, not SEO
- Print stylesheet — low impact
- Bundle analysis — performance, not SEO critical
- IndexNow API — Bing/Yandex low priority for Romanian market
- Font subsetting — next/font handles automatically

## Context

- **XEH.ro**: `/Users/drinceanumac/Projects/HEXro/` — Next.js 14, TypeScript, Supabase, ~3000 products
- **InfiniTrade.ro**: `/Users/drinceanumac/Projects/infinitrade.ro/` — Next.js, JavaScript, static data
- Both deploy to Vercel via git push to main
- XEH.ro build fails locally (missing Supabase env) but TypeScript compiles fine
- InfiniTrade.ro builds clean locally
- Both use `www` canonical URLs

## Constraints

- **Tech stack**: Both are Next.js App Router — all changes must be SSR/SSG compatible
- **No breaking changes**: All modifications are additive, no URL structure changes
- **XEH.ro local build**: Cannot `npm run build` locally — verify TypeScript compilation only
- **InfiniTrade.ro**: Client components can't export `revalidate`
- **Shell quoting**: Paths with brackets need quoting: `"app/(main)/[brand]/page.tsx"`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Critical+High only | Focus on highest ROI items, ~15 requirements | — Pending |
| Both sites in parallel | Same patterns apply, maximize throughput | — Pending |
| Skip comparison pages | Significant content creation, defer to Wave 3 | — Pending |
| Skip TOC | Medium priority, can be added later | — Pending |

---
*Last updated: 2026-02-13 after project initialization*
