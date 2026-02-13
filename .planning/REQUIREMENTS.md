# Requirements: SEO+GEO Wave 2

**Defined:** 2026-02-13
**Core Value:** Maximize organic search and AI search visibility through high-impact schema, content, and local SEO improvements on both XEH.ro and InfiniTrade.ro.

## v1 Requirements

Requirements for this wave. Each maps to roadmap phases.

### Schema Enhancements

- [ ] **SCHEMA-01**: Both sites render ServiceJsonLd with consultanță, instalare, service offerings linked to Organization @id
- [ ] **SCHEMA-02**: LocalBusiness schema on both sites includes areaServed with 10+ Romanian cities (Timișoara, București, Cluj, Brașov, Iași, Constanța, etc.)
- [ ] **SCHEMA-03**: Contact pages on both sites render ContactPageJsonLd linked to Organization @id
- [ ] **SCHEMA-04**: XEH.ro products with price ranges use AggregateOffer instead of single Offer
- [ ] **SCHEMA-05**: XEH.ro CategoryJsonLd includes ItemList with top 10 actual products per category

### Content & E-E-A-T

- [ ] **EEAT-01**: XEH.ro blog articles show visible author byline with name, role, photo, and link to /echipa
- [ ] **EEAT-02**: XEH.ro blog articles include "Articole Similare" section with 3 related articles at bottom
- [ ] **EEAT-03**: InfiniTrade.ro blog articles include internal links to relevant category/brand pages within article content
- [ ] **EEAT-04**: InfiniTrade.ro phone number format is consistent (+40 371 232 404) across all pages

### GEO (AI Search)

- [ ] **GEO-01**: Both sites have pros/cons lists on at least 3 landing pages each (structured with Avantaje/Dezavantaje headings)
- [ ] **GEO-02**: Both sites have expert quotes or testimonial snippets on landing pages (from team or clients)

### Local SEO

- [ ] **LOCAL-01**: Both sites have Google Maps embed on contact page showing business location (lazy-loaded to prevent CLS)

### Performance

- [ ] **PERF-01**: Both sites report Core Web Vitals (INP, LCP, CLS) via useReportWebVitals to analytics

## v2 Requirements

Deferred to future wave. Tracked but not in current roadmap.

### Content Depth
- **V2-01**: Table of Contents on blog articles >1500 words
- **V2-02**: Dedicated comparison pages (e.g., Grundfos vs Wilo)
- **V2-03**: Glossary page with DefinedTerm schema
- **V2-04**: Calculator/tool pages (pump sizing, ROI)
- **V2-05**: Case studies page with real implementations

### Advanced Schema
- **V2-06**: Review schema on testimonials page (InfiniTrade.ro)
- **V2-07**: Video schema when video content is added
- **V2-08**: Course/HowTo schema expansion

## Out of Scope

| Feature | Reason |
|---------|--------|
| Image sitemap | Next.js doesn't support, Google discovers via crawl |
| IndexNow API | Bing/Yandex low priority for Romanian market |
| Dark mode | UX feature, not SEO related |
| Print stylesheet | Low impact on search rankings |
| Font subsetting | next/font handles automatically |
| Bundle analysis | Performance optimization, separate concern |
| City-specific landing pages | Need 800+ words unique content per city — too much content creation for this wave |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCHEMA-01 | Phase ? | Pending |
| SCHEMA-02 | Phase ? | Pending |
| SCHEMA-03 | Phase ? | Pending |
| SCHEMA-04 | Phase ? | Pending |
| SCHEMA-05 | Phase ? | Pending |
| EEAT-01 | Phase ? | Pending |
| EEAT-02 | Phase ? | Pending |
| EEAT-03 | Phase ? | Pending |
| EEAT-04 | Phase ? | Pending |
| GEO-01 | Phase ? | Pending |
| GEO-02 | Phase ? | Pending |
| LOCAL-01 | Phase ? | Pending |
| PERF-01 | Phase ? | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 0
- Unmapped: 13 ⚠️

---
*Requirements defined: 2026-02-13*
*Last updated: 2026-02-13 after initial definition*
