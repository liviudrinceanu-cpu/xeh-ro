# Requirements: SEO+GEO Wave 2

**Defined:** 2026-02-13
**Core Value:** Maximize organic search and AI search visibility through high-impact schema, content, and local SEO improvements on both XEH.ro and InfiniTrade.ro.

## v1 Requirements

Requirements for this wave. Each maps to roadmap phases.

### Schema Enhancements

- [x] **SCHEMA-01**: Both sites render ServiceJsonLd with consultanță, instalare, service offerings linked to Organization @id
- [x] **SCHEMA-02**: LocalBusiness schema on both sites includes areaServed with 10+ Romanian cities (Timișoara, București, Cluj, Brașov, Iași, Constanța, etc.)
- [x] **SCHEMA-03**: Contact pages on both sites render ContactPageJsonLd linked to Organization @id
- [ ] **SCHEMA-04**: XEH.ro products with price ranges use AggregateOffer instead of single Offer
- [ ] **SCHEMA-05**: XEH.ro CategoryJsonLd includes ItemList with top 10 actual products per category

### Content & E-E-A-T

- [x] **EEAT-01**: XEH.ro blog articles show visible author byline with name, role, photo, and link to /echipa
- [x] **EEAT-02**: XEH.ro blog articles include "Articole Similare" section with 3 related articles at bottom
- [x] **EEAT-03**: InfiniTrade.ro blog articles include internal links to relevant category/brand pages within article content
- [x] **EEAT-04**: InfiniTrade.ro phone number format is consistent (+40 371 232 404) across all pages

### GEO (AI Search)

- [x] **GEO-01**: Both sites have pros/cons lists on at least 3 landing pages each (structured with Avantaje/Dezavantaje headings)
- [x] **GEO-02**: Both sites have expert quotes or testimonial snippets on landing pages (from team or clients)

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
| SCHEMA-01 | Phase 1 | ✅ Done |
| SCHEMA-02 | Phase 1 | ✅ Done |
| SCHEMA-03 | Phase 1 | ✅ Done |
| SCHEMA-04 | Phase 5 | Pending |
| SCHEMA-05 | Phase 5 | Pending |
| EEAT-01 | Phase 2 | ✅ Done (pre-existing) |
| EEAT-02 | Phase 2 | ✅ Done (pre-existing) |
| EEAT-03 | Phase 3 | ✅ Done |
| EEAT-04 | Phase 2 | ✅ Done |
| GEO-01 | Phase 3 | ✅ Done |
| GEO-02 | Phase 2 | ✅ Done |
| LOCAL-01 | Phase 4 | Pending |
| PERF-01 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

**Phase Distribution:**
- Phase 1 (Schema Extensions): 3 requirements
- Phase 2 (E-E-A-T Content): 4 requirements
- Phase 3 (Content Clustering): 2 requirements
- Phase 4 (Local SEO): 1 requirement
- Phase 5 (Performance & Monitoring): 3 requirements

---
*Requirements defined: 2026-02-13*
*Last updated: 2026-02-13 after roadmap creation - 100% coverage achieved*
