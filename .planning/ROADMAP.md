# Roadmap: SEO+GEO Wave 2

## Overview

This roadmap delivers critical and high-priority SEO optimizations across two B2B equipment sites (XEH.ro and InfiniTrade.ro). The journey progresses from low-risk schema enhancements to user-facing content improvements, culminating in performance optimization. Phases are structured for parallel execution where possible, with schema work and content work running simultaneously on both sites, followed by site-specific advanced features and global performance monitoring.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Schema Extensions** - Service, areaServed, ContactPage schema on both sites
- [ ] **Phase 2: E-E-A-T Content** - Author bylines, expert signals, phone consistency
- [ ] **Phase 3: Content Clustering** - Related articles, internal linking, GEO content
- [ ] **Phase 4: Local SEO** - Google Maps embeds, location optimization
- [ ] **Phase 5: Performance & Monitoring** - Web Vitals tracking, optimization

## Phase Details

### Phase 1: Schema Extensions
**Goal**: Enhance structured data with Service, areaServed cities, and ContactPage schema for both sites
**Depends on**: Nothing (first phase)
**Requirements**: SCHEMA-01, SCHEMA-02, SCHEMA-03
**Success Criteria** (what must be TRUE):
  1. Service schema validates in Google Rich Results Test with consultanță, instalare, service offerings
  2. LocalBusiness schema on both sites shows areaServed with 10+ Romanian cities (București, Cluj, Timișoara, Iași, Constanța, Craiova, Brașov, Galați, Ploiești, Oradea)
  3. Contact pages on both sites render ContactPageJsonLd linked to Organization schema
  4. XSS vulnerability testing passes for all dynamic JSON-LD content
**Plans**: TBD

Plans:
- [ ] 01-01: [To be planned]

### Phase 2: E-E-A-T Content
**Goal**: Implement author bylines, expert quotes, and phone consistency for E-E-A-T signals
**Depends on**: Phase 1 (validation workflow established)
**Requirements**: EEAT-01, EEAT-02, EEAT-04, GEO-02
**Success Criteria** (what must be TRUE):
  1. XEH.ro blog articles show visible author byline with photo, name, role, and link to /echipa
  2. XEH.ro blog articles include "Articole Similare" section with 3 related articles at bottom
  3. Phone number format is consistent across all InfiniTrade.ro pages (+40 371 232 404)
  4. Landing pages on both sites include expert quotes or testimonial snippets (3+ pages per site)
**Plans**: TBD

Plans:
- [ ] 02-01: [To be planned]

### Phase 3: Content Clustering
**Goal**: Build internal linking structure and add GEO-optimized content for AI search visibility
**Depends on**: Phase 2 (content structure in place)
**Requirements**: EEAT-03, GEO-01
**Success Criteria** (what must be TRUE):
  1. InfiniTrade.ro blog articles include internal links to relevant category/brand pages (minimum 3 links per article)
  2. Both sites have pros/cons lists (Avantaje/Dezavantaje) on at least 3 landing pages each
  3. Related articles algorithm produces relevant suggestions (same category highest priority, keyword overlap secondary)
  4. No circular linking clusters detected (hub-and-spoke model validated)
**Plans**: TBD

Plans:
- [ ] 03-01: [To be planned]

### Phase 4: Local SEO
**Goal**: Integrate Google Maps and optimize local search signals
**Depends on**: Phase 1 (schema foundation ready)
**Requirements**: LOCAL-01
**Success Criteria** (what must be TRUE):
  1. Both sites have Google Maps embed on contact page showing business location
  2. Maps implementation passes CLS threshold (<0.1) via lazy loading or static fallback
  3. Google Maps API key configured with domain restrictions and quota monitoring
**Plans**: TBD

Plans:
- [ ] 04-01: [To be planned]

### Phase 5: Performance & Monitoring
**Goal**: Implement Web Vitals tracking and optimize site performance holistically
**Depends on**: Phase 4 (all features in place)
**Requirements**: PERF-01, SCHEMA-04, SCHEMA-05
**Success Criteria** (what must be TRUE):
  1. Both sites report Core Web Vitals (INP, LCP, CLS) to analytics
  2. XEH.ro products with price ranges use AggregateOffer schema (validates in Rich Results Test)
  3. XEH.ro category pages include ItemList schema with top products (position ordinals correct)
  4. Lighthouse audit scores improve or maintain on 10 key pages (homepage, contact, landing pages, blog articles)
  5. Web Vitals monitoring dashboard configured with alert thresholds
**Plans**: TBD

Plans:
- [ ] 05-01: [To be planned]

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

**Parallelization Opportunities:**
- Phase 1: Both sites can receive schema updates in parallel
- Phase 2: Author components and phone fixes can run in parallel
- Phase 3: Can partially overlap with Phase 4 (content work vs Maps integration)
- Phase 4: Single phase, but both sites in parallel
- Phase 5: XEH.ro advanced schema + global performance work can parallelize

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Schema Extensions | 0/TBD | Not started | - |
| 2. E-E-A-T Content | 0/TBD | Not started | - |
| 3. Content Clustering | 0/TBD | Not started | - |
| 4. Local SEO | 0/TBD | Not started | - |
| 5. Performance & Monitoring | 0/TBD | Not started | - |

---
*Roadmap created: 2026-02-13*
*Total v1 requirements: 13*
*Depth setting: quick (5 phases)*
*Parallelization: enabled*
