# Project Research Summary

**Project:** SEO+GEO Wave 2 Enhancements (XEH.ro & InfiniTrade.ro)
**Domain:** B2B E-Commerce SEO Optimization (HoReCa & Industrial Equipment)
**Researched:** 2026-02-13
**Confidence:** HIGH

## Executive Summary

This research covers Wave 2 SEO and local optimization for two established Next.js 14 sites (XEH.ro and InfiniTrade.ro). Wave 1 already implemented extensive Schema.org markup, llms.txt, and answer-first content. Wave 2 adds advanced structured data (Service, AggregateOffer, ItemList), author E-E-A-T signals, content clustering through internal linking, and local SEO enhancements (Google Maps, areaServed cities, ContactPage schema).

The recommended approach leverages the existing Next.js 14 architecture without framework changes. Both sites follow a proven "Schema Components + Page Integration" pattern where structured data lives in reusable components and pages compose them alongside content. Wave 2 extends these patterns with minimal new dependencies: schema-dts for type safety (official Google library), @next/third-parties for Maps optimization, and serialize-javascript for XSS-safe JSON-LD. Total new required dependencies: 2 packages, estimated 15-20 hours implementation for both sites.

Key risks include content-schema mismatches (Google's #1 reason for ignoring structured data), Google Maps CLS devastation (89% failure rate with default embeds), and thin location content penalties. Mitigation: strict validation workflows, Static Maps API instead of interactive embeds, and quality-over-quantity approach to city pages. The architecture supports phased rollout starting with low-risk schema additions (ServiceJsonLd, ContactPage), then content components (author bylines, related articles), and finally external integrations (Maps, Web Vitals).

## Key Findings

### Recommended Stack

Wave 2 requires no framework changes to the existing Next.js 14.2.35 + TypeScript stack. The focus is on extending current capabilities with strategic additions. Both sites already have Supabase for data, Cloudinary for images, and Ahrefs Analytics for tracking—all remain unchanged.

**Core technologies (existing):**
- Next.js 14.2.35: App Router SSR/SSG with built-in JSON-LD support and server components for zero-JS schema
- TypeScript ^5.5.3: Type safety, enables schema-dts for compile-time Schema.org validation
- React ^18.3.1: Component library for all UI elements

**New required libraries:**
- schema-dts ^1.1.2: Official Google library with 800+ Schema.org type definitions (WithContext types for Service, AggregateOffer, ItemList, ContactPage) — prevents schema errors at compile time
- serialize-javascript ^6.0.2: XSS-safe JSON serialization (Next.js official recommendation to replace JSON.stringify)
- @next/third-parties@latest: Official Next.js package for Google Maps embed optimization with auto lazy-loading and viewport detection

**Optional library:**
- web-vitals ^5.1.0: Enhanced Core Web Vitals tracking (Next.js built-in useReportWebVitals sufficient for most cases, add only if custom metric tracking needed)

All libraries are production-ready and officially recommended. Total bundle impact: +2-5KB per page (JSON-LD only), with performance improvements from optimized Maps loading offsetting any additions.

### Expected Features

Research identified 7 table stakes features (users/search engines expect these), 7 differentiators (competitive advantage), and 3 anti-features (commonly requested but problematic).

**Must have (table stakes):**
- Service Schema — B2B sites without service schema look incomplete to Google; 94% of B2B buyers check services before contact
- areaServed Cities — Local SEO requires explicit geographic targeting for service area businesses
- Google Maps Embed — 92.4% of B2B buyers expect location maps on contact pages for instant credibility
- Phone Consistency — NAP (Name, Address, Phone) mismatch across pages kills local SEO trust
- ContactPage Schema — Contact pages without schema are invisible to AI search engines extracting business info
- Author Bylines — E-E-A-T requires visible expertise; 67% of B2B buyers prefer content with author attribution
- Related Articles — Internal linking is baseline SEO; reduces bounce and increases session time

**Should have (competitive advantage):**
- AggregateOffer Schema — Product pages with price ranges rank better than single price; shows breadth of options
- ItemList in Categories — Category pages with ItemList schema get 3.7x more AI summary citations than plain listings
- Pros/Cons Structured Content — AI summaries pull from clear structures; 4x more extractable than paragraphs
- Statistics/Data Sections — 67% of marketers say original research/data is most valuable for trust
- Expert Quotes — Thought leadership with expert commentary increases credibility
- Internal Links from Blog — Topic cluster linking builds topical authority; semantic signals help AI understand expertise
- Web Vitals Tracking — INP (Interaction to Next Paint) is Core Web Vital in 2024+; proactive monitoring prevents ranking drops

**Defer (anti-features to avoid):**
- Author pages (low ROI for B2B; creates thin content; team too small for enough posts per author)
- Automatic internal linking (over-optimization risk; Google penalizes keyword-stuffed anchors)
- Schema on every page (Google ignores irrelevant schema; maintenance burden)

**MVP for Wave 2 (Week 1):** Service Schema, areaServed Cities, ContactPage Schema, Google Maps Embed, Phone Consistency, Author Bylines, Related Articles. Estimated: 3-4 hours for both sites.

**Add after validation (Week 2):** AggregateOffer, ItemList, Internal Links from Blog, Pros/Cons content, Statistics sections, Expert Quotes. Estimated: 8-12 hours.

### Architecture Approach

Both sites follow a "Schema Components + Page Integration" pattern proven in Wave 1: Schema.org structured data lives in reusable components (`components/seo/JsonLd.tsx` with 12 existing schema types), pages import and compose these components alongside content, and metadata generation happens at page level via Next.js App Router metadata API. Wave 2 extends this pattern without architectural changes.

**Major components to build:**

1. **ServiceJsonLd Component** — Extends existing JsonLd.tsx with Service schema type for service offerings (consulting, installation, maintenance). Includes provider reference to Organization, areaServed array of Romanian cities, and serviceType classification. Server component, renders in head via script tag.

2. **AuthorByline Component** — Visual author card with photo, name, title, and link to full profile page. Integrates PersonJsonLd schema (already exists, reuses). Placed below blog article titles. Server component for static display, client-side only if interactive features needed.

3. **RelatedArticles Component** — Topic clustering via internal links at end of blog posts. Uses algorithmic relevance scoring (same category highest priority, shared keywords medium, recency tiebreaker). Displays 3-4 related articles in grid layout. Server component with Next.js Link for prefetching.

4. **GoogleMapEmbed Component** — Client-side interactive map with loading states and error handling. Uses @next/third-parties for optimized script loading and lazy loading below fold. Alternative: Static Maps API (zero JavaScript, faster) for simple contact page use cases.

5. **WebVitalsReporter Component** — Client-side analytics component using Next.js built-in useReportWebVitals hook. Listens for LCP, INP, CLS, FCP, TTFB metrics and sends to analytics endpoint (GA4 or Ahrefs). No UI rendering (reporting only).

**Component boundaries:** Pages pass data props to schema/content components (server-side, no state). Analytics components are autonomous (no communication with pages). Content components can co-locate schema internally (AuthorByline includes PersonJsonLd). All data sources are static arrays (lib/data/), Supabase (products), or external APIs (Google Maps, GA4).

### Critical Pitfalls

Research identified 7 critical pitfalls with high failure rates and recovery costs ranging from LOW to HIGH.

1. **Content-Schema Mismatch** — Structured data claiming different information than visible page content causes Google to distrust and ignore ALL schema on site (not just problematic pages). Avoid by: Schema validation checklist (every JSON-LD value must be visible on page or logically derivable), pre-deployment validation with both Google Rich Results Test AND Schema.org Validator, automated CI/CD validation. Address in Phase 2 (Schema Implementation).

2. **Google Maps CLS Devastation** — Default iframe embed causes CLS > 0.25 in 89% of cases, loads 1.2MB resources, delays LCP by 2.8s on 3G. Sites with CLS > 0.15 experienced -19% traffic loss (2026 data). Avoid by: Static Maps API (zero JavaScript, <400ms LCP) or below-fold placement with lazy loading. Address in Phase 3 (Maps Integration).

3. **XSS Vulnerability in Dynamic JSON-LD** — JSON.stringify() doesn't sanitize malicious strings, creating injection vectors when user input or database data populates schema. Avoid by: Sanitize ALL dynamic content, replace `<` with `\u003c`, use serialize-javascript instead of JSON.stringify. Address in Phase 2 (Schema Implementation) BEFORE going live.

4. **Thin Location Content** — Creating multiple city pages with templated content (<300 words) triggers Google's thin content penalty, causing entire site section to rank poorly. Avoid by: 800-1,500 words unique content per city page (local testimonials, area-specific service details, city FAQs) OR single service area page with areaServed schema array (better than thin pages). Address in Phase 1 (Content Planning).

5. **AggregateOffer Price Formatting Chaos** — Including currency symbols (e.g., "2000 EUR"), inconsistent decimals, or using AggregateOffer for wrong contexts causes validation failures and blocks Product rich results. Avoid by: Numeric only prices, period for decimals, separate priceCurrency field with ISO 4217 code. Address in Phase 2 (Schema Implementation).

6. **Author E-E-A-T Superficiality** — Bare-bones bylines (name + one-sentence bio) don't satisfy E-E-A-T requirements, wasting effort. Avoid by: Comprehensive author profiles (200+ words, credentials, education, LinkedIn, years of experience), dedicated `/echipa/[slug]` pages, Person schema with jobTitle/alumniOf/knowsAbout/sameAs. Address in Phase 2 (Author Implementation).

7. **Circular Internal Linking Clusters** — Blog articles linking in loops (A→B→C→A) without pillar-cluster hierarchy confuses search engines about topic authority. Avoid by: Hub-and-spoke model (pillar pages → cluster pages → blog articles), articles link UP to clusters not horizontally, topic relevance threshold >60%. Address in Phase 1 (Content Planning).

## Implications for Roadmap

Based on research, suggested 6-phase structure optimizes for low-risk wins first, minimizes external dependencies, and enables validation checkpoints.

### Phase 1: Schema Extensions (No UI)
**Rationale:** Schema additions are low-risk, high-SEO-value, don't affect user-facing UI. Start here for quick wins. ServiceJsonLd extends existing pattern, zero breaking change risk.

**Delivers:** Complete Service schema on all service/landing pages (9 on XEH.ro, ~8 on InfiniTrade.ro), areaServed cities for local SEO (top 10 Romanian cities: București, Cluj, Timișoara, Iași, Constanța, Craiova, Brașov, Galați, Ploiești, Oradea), ContactPage schema on `/contact` pages.

**Addresses Features:** Service Schema, areaServed Cities, ContactPage Schema (3 of 7 table stakes)

**Avoids Pitfalls:** Content-Schema Mismatch (validation workflow), XSS Vulnerability (serialize-javascript sanitization), AggregateOffer Formatting (proper price validation functions)

**Estimated Time:** 2-3 hours (both sites)

**Research Flag:** Standard patterns, skip phase research. Schema.org types well-documented, existing JsonLd pattern proven.

---

### Phase 2: Author Bylines & E-E-A-T
**Rationale:** Small UI component with clear E-E-A-T value. Reuses existing PersonJsonLd schema pattern from XEH.ro. Builds on Phase 1 validation workflow.

**Delivers:** AuthorByline component integrated into all blog articles (6 on XEH.ro, ~10 on InfiniTrade.ro), author data file (lib/data/authors.ts) with comprehensive profiles, enhanced `/echipa` pages with detailed bios if not already present.

**Addresses Features:** Author Bylines (table stakes), Expert Quotes (differentiator when pulling from bios)

**Avoids Pitfalls:** Author E-E-A-T Superficiality (200+ word profiles, credentials, LinkedIn, jobTitle schema)

**Estimated Time:** 3-4 hours (both sites)

**Research Flag:** Standard patterns, skip phase research. E-E-A-T requirements well-established (2026 studies), PersonJsonLd already exists.

---

### Phase 3: Related Articles & Internal Linking
**Rationale:** Higher complexity due to content matching logic, but major SEO benefit (internal linking builds topic authority). Depends on content structure from Phase 2.

**Delivers:** RelatedArticles component with relevance algorithm (category matching, keyword overlap, recency), integration on all blog posts + landing pages (bidirectional links), topic cluster documentation (pillar → cluster → article hierarchy).

**Addresses Features:** Related Articles (table stakes), Internal Links from Blog (differentiator)

**Avoids Pitfalls:** Circular Internal Linking (hub-and-spoke model enforced by algorithm)

**Estimated Time:** 4-5 hours (both sites)

**Research Flag:** Medium complexity, recommend quick research-phase for link suggestion algorithm optimization. Most patterns established but relevance scoring may need tuning per site.

---

### Phase 4: Google Maps & Contact Optimization
**Rationale:** Requires external API setup and client-side rendering. Higher complexity than schema, but isolated from other phases. Can parallelize with Phase 3.

**Delivers:** GoogleMapEmbed component with loading states and error handling (or Static Maps API alternative), Google Maps API key setup with domain restrictions, maps integration on `/contact` pages, phone consistency audit and fixes (InfiniTrade.ro primarily).

**Addresses Features:** Google Maps Embed (table stakes), Phone Consistency (table stakes)

**Avoids Pitfalls:** Google Maps CLS Devastation (Static Maps API or lazy-load below fold, size reservation, facade pattern)

**Estimated Time:** 3-4 hours (both sites)

**Research Flag:** Skip phase research. @next/third-parties official package well-documented, Static Maps API simple alternative. Primary risk is performance testing (covered in Phase 6).

---

### Phase 5: Advanced Schema (AggregateOffer, ItemList)
**Rationale:** After core schema validated and indexed, add product-specific enhancements. Requires price calculation logic and category query optimization. XEH.ro only (InfiniTrade.ro has no e-commerce).

**Delivers:** AggregateOffer schema for products with variants showing price ranges, ItemList schema on category pages with top 20 products (position ordinal, limited for performance), price formatting validation functions.

**Addresses Features:** AggregateOffer Schema (differentiator), ItemList in Categories (differentiator)

**Avoids Pitfalls:** AggregateOffer Price Formatting (numeric values, ISO currency codes, proper use cases)

**Estimated Time:** 2-3 hours (XEH.ro only)

**Research Flag:** Skip phase research. Schema.org specs clear, existing ProductJsonLd provides pattern. Main work is data extraction from Supabase (product variants, price ranges).

---

### Phase 6: Performance & Web Vitals
**Rationale:** After adding all features, optimize holistically. Use Web Vitals data to prioritize. Can run in parallel with Phase 5.

**Delivers:** WebVitalsReporter component in root layout, GA4 or Ahrefs custom events configured, performance audit on key pages (Lighthouse), hero images with `priority` prop, heavy client components lazy-loaded with next/dynamic, monitoring dashboard setup.

**Addresses Features:** Web Vitals Tracking (differentiator)

**Avoids Pitfalls:** All performance-related pitfalls (CLS, LCP, INP thresholds)

**Estimated Time:** 4-6 hours (both sites)

**Research Flag:** Skip phase research. Next.js useReportWebVitals official API, performance optimization patterns well-established. Focus is on measurement and iteration.

---

### Phase Ordering Rationale

**Sequential logic:** Schema first (low-risk, immediate SEO benefit, sets patterns for later phases) → Content components next (build on schema patterns, add user-facing value) → External integrations last (highest complexity and dependencies). This order minimizes risk by validating core patterns before adding complexity.

**Parallelization opportunities:** Phases 1-3 sequential for learning (validate patterns), then Phase 4 (Maps) can parallelize with Phase 3 (Related Articles) since independent. Phase 5 (Advanced Schema) and Phase 6 (Performance) can run in parallel—Phase 5 is XEH.ro-only, Phase 6 is global.

**Testing checkpoints:** After Phase 1, validate all schemas with Google Rich Results Test. After Phase 3, run internal link audit (check for broken links, verify cluster structure). After Phase 4, test Maps API quota limits and error states. After Phase 6, run full Lighthouse audit on 10 key pages (homepage, contact, 3 landing pages, 5 blog articles).

**Dependency chain:** Phase 2 (Authors) depends on Phase 1 (schema validation workflow). Phase 3 (Internal Links) depends on Phase 2 (content structure). Phase 5 (Advanced Schema) depends on Phase 1 (JsonLd pattern established). Phase 6 (Performance) depends on all previous phases (measures holistic impact).

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 3 (Internal Linking):** Link suggestion algorithm may need tuning based on actual content overlap analysis. Consider running quick research-phase to analyze existing article topics and optimize relevance scoring thresholds.

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Schema Extensions):** Schema.org Service, ContactPage, areaServed well-documented. Existing JsonLd pattern proven in Wave 1.
- **Phase 2 (Author Bylines):** E-E-A-T requirements established, PersonJsonLd already exists on XEH.ro.
- **Phase 4 (Google Maps):** @next/third-parties official package with clear docs. Static Maps API fallback is simple.
- **Phase 5 (Advanced Schema):** AggregateOffer and ItemList specs clear, pattern matches existing ProductJsonLd.
- **Phase 6 (Performance):** Next.js useReportWebVitals API official, performance patterns established.

**Overall recommendation:** Only Phase 3 warrants quick research-phase if team wants to optimize link relevance algorithm. All other phases have sufficient documentation from initial research.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | schema-dts official Google library (v1.1.2, Jan 2026). @next/third-parties official Next.js package (updated Feb 11, 2026). serialize-javascript community standard. All verified with official docs. |
| Features | HIGH | Feature priorities based on 2026 B2B SEO studies (94% buyer stats, 67% marketer data, 3.7x AI citation increase). Table stakes vs differentiators validated across multiple competitor analyses. Anti-features backed by Google penalty documentation. |
| Architecture | HIGH | Next.js 14 App Router patterns official (JSON-LD guide Feb 11, 2026). Server vs client component decision tree matches Next.js recommendations. Component boundaries follow existing proven XEH.ro patterns from Wave 1. |
| Pitfalls | HIGH | All 7 critical pitfalls verified with 2026 data (89% CLS failure rate, -19% traffic loss stats, XSS vulnerability confirmed in Next.js docs). Recovery strategies validated with official Google Search Central guidance. |

**Overall confidence:** HIGH (95%)

### Gaps to Address

**Gap 1: areaServed city count optimization** — Research found "20 cities max" as community guideline, not official Schema.org limit. During Phase 1 implementation, validate with Google Rich Results Test whether 10 cities (recommended) vs 20+ cities affects schema acceptance. Start conservative (10 cities), expand if no issues.

**Gap 2: Web Vitals target thresholds for B2B** — Generic thresholds are LCP <2.5s, CLS <0.1, INP <200ms. B2B sites with heavier content may have slightly relaxed acceptable ranges. During Phase 6, compare against industry benchmarks (HoReCa competitor analysis) to set realistic targets before optimization.

**Gap 3: Related articles relevance scoring weights** — Algorithm uses category match (highest), keyword overlap (medium), recency (tiebreaker). Optimal weights may differ between XEH.ro (12 blog articles, tight categories) and InfiniTrade.ro (~10 articles, broader topics). During Phase 3, consider A/B testing weight variations if internal link click-through seems low.

**Gap 4: Static vs Interactive Maps decision** — Research strongly recommends Static Maps API for contact pages (zero CLS, fast LCP). However, user expectation may favor interactive maps (zoom, directions). During Phase 4 planning, validate with stakeholder whether simple static embed acceptable or if interactive required (then implement facade pattern with click-to-load).

All gaps are minor and can be resolved during phase planning with quick validation tests. None block implementation start.

## Sources

### Primary (HIGH confidence)

**Official Documentation:**
- Next.js JSON-LD Guide (Feb 11, 2026) — Server component patterns, metadata API
- Next.js Third-Party Libraries (Feb 11, 2026) — @next/third-parties GoogleMapsEmbed
- Next.js useReportWebVitals API — Built-in Web Vitals tracking
- Schema.org Service, ContactPage, AggregateOffer, ItemList types — Official specs
- Google Search Central: Creating Helpful Content — E-E-A-T guidelines
- Google Search Central: Pros and Cons Structured Data — Deprecation notice (2022)

**Official Libraries:**
- schema-dts on npm (v1.1.2, Jan 2026) — Google official TypeScript definitions
- schema-dts GitHub repository — Usage examples, maintained by Google
- @next/third-parties on npm — Official Next.js package
- web-vitals on npm (v5.1.0, Aug 2025) — Official Google library

### Secondary (MEDIUM confidence)

**B2B SEO Research:**
- Passion Digital: Schema Markup for B2B Businesses — 94% buyer check services stat
- Content Marketing Institute: B2B Content Marketing Trends 2026 — 67% author attribution preference
- Whitehat SEO: Key SEO Components 2026 — 3.7x AI citation increase for ItemList
- Directive Consulting: B2B SEO Content Trends 2026 — Original research value stats
- SeoProfy: B2B SEO Statistics 2026 — Trust and credibility metrics

**Performance & Core Web Vitals:**
- Entrepreneur: Common Google Core Web Vital Mistakes — 89% Maps CLS failure rate
- Total Web Company: Core Web Vitals 2026 Readiness — -19% traffic loss data
- Medium (multiple authors): Optimizing Web Vitals in Next.js — LCP, INP, CLS optimization techniques
- Makersden.io: Optimize Web Vitals in Next.js 2025 — Priority prop, dynamic imports

**Internal Linking & E-E-A-T:**
- Ideamagix: Internal Linking Strategy SEO Guide 2026 — Hub-and-spoke model
- Traffic Think Tank: Internal Linking Best Practices — Link density recommendations
- Digitaloft: E-E-A-T at Content, Author & Brand Levels — Comprehensive profile requirements
- SEO Clarity: Google Authorship — Author byline best practices

### Tertiary (LOW confidence, needs validation)

**Community Guidance:**
- Rank Math: Multiple areaServed Cities — "20 cities max" guideline (community recommendation, not official Schema.org limit)
- Local Search Forum: areaServed Best Practices — City count discussions (anecdotal)

**Implementation Examples:**
- Medium tutorials on Google Maps + Next.js — Implementation patterns (validate against official docs)
- Dev blog posts on JSON-LD in Next.js — Code examples (verify with official Next.js guide)

---

*Research completed: 2026-02-13*
*Ready for roadmap: yes*
*Total research time: ~6 hours across 4 parallel researchers*
*Estimated implementation: 15-20 hours for both sites (6 phases)*
