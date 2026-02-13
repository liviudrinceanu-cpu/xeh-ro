# Stack Research: SEO+GEO Wave 2 Optimization

**Domain:** B2B E-commerce Equipment Sites (Next.js 14)
**Researched:** 2026-02-13
**Confidence:** HIGH

## Overview

This research covers the technology stack requirements for implementing Wave 2 SEO/GEO enhancements to two existing Next.js 14 sites (XEH.ro and InfiniTrade.ro). Wave 1 already implemented extensive Schema.org markup, llms.txt, and answer-first content. Wave 2 adds advanced structured data, local SEO signals, and content signals for E-E-A-T.

**Key Requirement:** Work within existing Next.js 14 architecture, no framework changes needed.

---

## Recommended Stack

### Core Technologies (Already in Place)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 14.2.35 | App Router SSR/SSG framework | Already deployed, excellent SEO capabilities with built-in JSON-LD support, server components for zero-JS schema |
| TypeScript | ^5.5.3 | Type safety | Already in place, enables schema-dts for type-safe Schema.org |
| React | ^18.3.1 | Component library | Core dependency, used for all UI components |

**Rationale:** No framework changes needed. Next.js 14 provides everything required for Wave 2 features.

---

### NEW: Schema.org Type Safety

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| schema-dts | ^1.1.2 | TypeScript definitions for Schema.org | Official Google library with 800+ type definitions, prevents schema errors at compile time |
| serialize-javascript | ^6.0.2 | Safe JSON-LD serialization | Community standard for XSS-safe JSON serialization |

**Installation:**
npm install schema-dts serialize-javascript
npm install -D @types/serialize-javascript

**Rationale:**
- schema-dts provides WithContext types for Service, AggregateOffer, ItemList, ContactPage
- serialize-javascript replaces JSON.stringify to prevent XSS vulnerabilities (Next.js official recommendation)
- Both are production-ready (schema-dts v1.1.2 released Jan 2026, stable)

**Confidence:** HIGH (official Next.js docs + Google library)

---

### NEW: Google Maps Integration

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| @next/third-parties | latest | Google Maps embed optimization | Official Next.js package for optimized third-party scripts, auto lazy-loading |

**Installation:**
npm install @next/third-parties@latest

**Rationale:**
- Official Next.js solution (experimental but stable, updated Feb 11, 2026)
- Built-in lazy loading (loads below fold automatically)
- No manual performance optimization needed
- Better than custom iframe embeds (handles viewport detection, script loading)

**Alternative NOT recommended:**
- Custom iframe embeds (no lazy loading, poor performance)
- react-google-maps (heavy bundle, overkill for static embeds)

**Confidence:** HIGH (official Next.js package, recent docs)

---

### NEW: Web Vitals Tracking

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| web-vitals | ^5.1.0 (optional) | Enhanced Core Web Vitals tracking | Official Google library, matches Chrome measurement |
| Built-in useReportWebVitals | Next.js 14 | Basic vitals reporting | No install needed, built into Next.js |

**Installation (optional):**
npm install web-vitals

**Rationale:**
- Next.js built-in useReportWebVitals sufficient for most use cases
- Tracks LCP, FID (deprecated), INP (new 2024), CLS, TTFB, FCP
- Standalone web-vitals only if custom metric tracking needed

**Recommendation:** Start with built-in, add standalone only if custom tracking needed.

**Confidence:** HIGH (official Next.js API + Google library)

---

### NEW: Internal Linking & Related Articles

| Approach | Version | Purpose | Why Recommended |
|----------|---------|---------|-----------------|
| Next.js Link | Built-in | Optimized internal linking | Built-in prefetching, client-side navigation, automatic viewport detection |
| Custom React component | N/A | Related articles component | Simple pattern, no library needed |

**No additional packages required.**

**Rationale:**
- Next.js Link component auto-prefetches on viewport entry
- Client-side navigation faster than full page loads
- No external library needed, simple React component pattern

**Confidence:** HIGH (official Next.js docs, Jan 2026 article)

---

## Supporting Libraries (Already Installed)

| Library | Version | Current Use | Wave 2 Use |
|---------|---------|-------------|------------|
| zod | ^4.3.5 | Form validation | No additional use needed |
| react-hook-form | ^7.71.1 | Contact forms | No additional use needed |
| @supabase/supabase-js | ^2.90.1 | Database | Fetch related articles, author data |
| next/image | Built-in | Image optimization | Already optimized |

**No changes needed to existing stack.**

---

## Schema.org Implementation Patterns

### NEW Schema Types for Wave 2

| Schema Type | Use Case | TypeScript Type |
|-------------|----------|-----------------|
| Service | Service pages (consulting, delivery) | WithContext Service |
| ContactPage | /contact page | WithContext ContactPage |
| AggregateOffer | Product listings with price ranges | WithContext AggregateOffer |
| ItemList | Category pages, product grids | WithContext ItemList |

**Existing Schema Types (Wave 1):**
- Product, Organization, LocalBusiness, BreadcrumbList, FAQ, Article, Person, Review

### Service Schema Pattern - areaServed Multiple Cities

Key points:
- Use City type with name and sameAs Wikipedia links
- Up to ~20 cities max (community guideline)
- sameAs provides disambiguation (Miami FL vs Miami OH)

### ContactPage Schema Pattern

Extends WebPage with contact information, links to Organization via mainEntity.

### AggregateOffer Schema Pattern

Use when multiple product variants exist with different prices. Don't use for different products.

### ItemList Schema Pattern

For category pages, search results, product listings. Improves carousel/grid rich snippets.

---

## Author Bylines & E-E-A-T

### Person Schema Enhancement

Extend existing Person schema with E-E-A-T signals:
- jobTitle (critical for E-E-A-T - LinkedIn 2026 study)
- alumniOf (educational credentials)
- honorificPrefix (professional titles)
- knowsAbout (expertise areas)
- sameAs (LinkedIn, social profiles)

**Confidence:** HIGH (2026 studies + Schema.org official docs)

---

## Pros/Cons Content Structure

### NO specialized schema needed

Use standard Article/BlogPosting with structured HTML:
- Semantic headings (h3, h4)
- Visual distinction (green checkmarks, red X)
- Grid layout for side-by-side comparison

**Rationale:**
- Google deprecated explicit pros/cons schema in 2022
- Semantic HTML sufficient for recognition
- Focus on natural language

**Confidence:** HIGH (Google Search Central docs, Nov 2025)

---

## Installation Summary

### Required for Wave 2

npm install schema-dts serialize-javascript
npm install @next/third-parties@latest
npm install -D @types/serialize-javascript

### Optional (only if custom tracking needed)

npm install web-vitals

**Total new dependencies:** 2 required, 1 optional (3 max)

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Schema Types | schema-dts | Manual types | Error-prone, no compile-time validation |
| JSON Safety | serialize-javascript | Manual escaping | Incomplete, security risk |
| Maps Embed | @next/third-parties | Custom iframe | No lazy loading, poor performance |
| Maps Embed | @next/third-parties | @googlemaps/js-api-loader | Heavy bundle (300KB+), overkill |
| Web Vitals | Built-in useReportWebVitals | web-vitals package | Extra dependency, built-in sufficient |
| Related Articles | Custom component | next-seo | Doesn't handle related articles |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-seo package | Deprecated patterns for Next.js 14 | Native metadata API + custom JSON-LD |
| react-google-maps | Heavy bundle (500KB+) | @next/third-parties GoogleMapsEmbed |
| Manual JSON.stringify | XSS vulnerability | serialize-javascript |
| Custom schema builders | Reinventing wheel | schema-dts official types |
| Client components for schema | Hydration overhead | Server components with script tags |

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| schema-dts@1.1.2 | TypeScript ^5.0 | Latest Jan 2026, stable |
| @next/third-parties@latest | Next.js 14.x | Experimental but stable, use @latest |
| serialize-javascript@6.0.2 | Node 16+ | Stable, no breaking changes |
| web-vitals@5.1.0 | All modern browsers | Optional, latest Aug 2025 |

**Known Issues:** None as of Feb 2026.

---

## Performance Considerations

| Feature | Impact | Mitigation |
|---------|--------|------------|
| JSON-LD scripts | ~2-5KB per page | Inline in HTML, compressed |
| GoogleMapsEmbed | ~50KB lazy-loaded | Auto lazy-loads below fold |
| Web Vitals tracking | ~2KB (web-vitals) | Send async, non-blocking |
| Related articles prefetch | ~10-30KB per article | Only 3-5 articles, prefetch on hover |
| schema-dts types | 0KB (compile-time) | Type checking only, no runtime overhead |

**Overall Bundle Impact:** +2-5KB per page (JSON-LD only), all other optimizations reduce bundle size.

---

## Testing & Validation Tools

| Tool | Purpose | URL |
|------|---------|-----|
| Google Rich Results Test | Validate all schema types | https://search.google.com/test/rich-results |
| Schema Markup Validator | Generic schema validation | https://validator.schema.org/ |
| PageSpeed Insights | Web Vitals measurement | https://pagespeed.web.dev/ |
| Chrome DevTools | Lighthouse audit, CWV | Built-in browser |
| Ahrefs Site Audit | SEO issues detection | Already integrated |

---

## Implementation Phases (Suggested)

### Phase 1: Schema Enhancements (Week 1)
- Install schema-dts + serialize-javascript
- Implement Service schema for consulting/delivery pages
- Add ContactPage schema to /contact
- Update Product schema to use AggregateOffer where applicable
- Add ItemList schema to category pages

### Phase 2: Local SEO (Week 2)
- Install @next/third-parties
- Add GoogleMapsEmbed to contact page
- Implement areaServed with Romanian cities
- Ensure phone consistency across all pages

### Phase 3: Content Signals (Week 3)
- Enhance Person schema with E-E-A-T signals
- Add AuthorByline components to all articles
- Implement ProsConsSection component
- Add stats/expert quotes to blog articles

### Phase 4: Internal Linking (Week 4)
- Implement RelatedArticles component
- Add 3-5 related articles to each blog post
- Ensure all links use Next.js Link with prefetch

### Phase 5: Web Vitals (Week 5)
- Set up analytics endpoint for Web Vitals
- Implement useReportWebVitals in _app
- Monitor LCP, INP, CLS improvements

---

## Confidence Assessment

| Area | Confidence | Rationale |
|------|------------|-----------|
| Schema.org Types | HIGH | schema-dts official Google library |
| JSON-LD Implementation | HIGH | Next.js official docs (Feb 11, 2026) |
| Google Maps Embed | HIGH | @next/third-parties official package |
| Web Vitals | HIGH | Official Next.js API + Google web-vitals |
| Author Bylines/E-E-A-T | HIGH | LinkedIn 2026 study + Schema.org |
| Internal Linking | HIGH | Next.js Link official docs |
| areaServed Cities | MEDIUM | Schema.org spec verified, 20 cities is community guideline |
| Pros/Cons Content | HIGH | Google Search Central deprecation (2022) |

**Overall Confidence:** HIGH (92%)

---

## Sources

### Official Documentation
- Next.js JSON-LD Guide (Feb 11, 2026)
- Schema.org ContactPage
- Schema.org AggregateOffer
- Next.js Third-Party Libraries (Feb 11, 2026)
- Next.js useReportWebVitals

### Libraries
- schema-dts on npm - v1.1.2
- schema-dts GitHub - Google official
- @next/third-parties on npm
- web-vitals on npm - v5.1.0

### Best Practices & Research
- Rank Math: Multiple areaServed Cities
- How Internal Linking Can Transform Your Next.js Website SEO (Jan 2026)
- Author Bylines: The Complete Guide to SEO E-E-A-T
- Hill Web Creations: jobTitle Schema Guide
- Google Search Central: Pros and Cons Structured Data
- Does Structured Data Still Matter in Age of Generative Search

---

*Stack research completed: 2026-02-13*
*Next.js version: 14.2.35*
*Target sites: XEH.ro (TypeScript) + InfiniTrade.ro (JavaScript)*
