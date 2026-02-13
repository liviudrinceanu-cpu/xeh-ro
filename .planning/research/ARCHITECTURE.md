# Architecture Research: SEO+GEO Wave 2 Integration

**Domain:** Next.js 14 SEO Enhancement (Service Schema, Author Bylines, Related Articles, Google Maps, Web Vitals)
**Researched:** 2026-02-13
**Confidence:** HIGH

## Executive Summary

SEO+GEO Wave 2 enhances existing Next.js 14 sites (XEH.ro and InfiniTrade.ro) with advanced SEO features. The architecture leverages **existing patterns** already proven in both codebases: centralized Schema.org components, server-side metadata generation, and component-based page structure. No fundamental architectural changes required—Wave 2 extends current patterns.

**Key Architectural Insight:** Both sites follow a **"Schema Components + Page Integration"** pattern where:
1. Schema.org structured data lives in reusable components (`components/seo/JsonLd.tsx`)
2. Pages import and compose these components alongside content
3. Metadata generation happens at the page level via Next.js App Router metadata API

Wave 2 adds **new schema types** (Service, author Person), **content components** (author bylines, related articles), and **external integrations** (Google Maps embed, Web Vitals monitoring) following these same architectural patterns.

---

## Standard Architecture (Current State)

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER LAYER                       │
├──────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Blog Pages      │  │ Category Pages   │  │ About/Contact   │  │
│  │ [slug]/page.tsx │  │ [...slug]/page   │  │ Static Pages    │  │
│  └────────┬────────┘  └────────┬─────────┘  └────────┬────────┘  │
│           │                    │                     │            │
│           ├──── metadata: Metadata (title, OG, etc) ─┤            │
│           │                    │                     │            │
├───────────┴────────────────────┴─────────────────────┴────────────┤
│                    SEO COMPONENTS LAYER                           │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐    │
│  │         components/seo/JsonLd.tsx (12 schemas)           │    │
│  │  • ProductJsonLd      • OrganizationJsonLd               │    │
│  │  • ArticleJsonLd      • LocalBusinessJsonLd              │    │
│  │  • BreadcrumbJsonLd   • FAQJsonLd                        │    │
│  │  • PersonJsonLd       • ReviewJsonLd                     │    │
│  │  • HowToJsonLd        • AboutPageJsonLd                  │    │
│  │  • CategoryJsonLd     • WebSiteJsonLd                    │    │
│  └──────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│                     CONTENT LAYER                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Static Data  │  │ Supabase DB  │  │ Markdown     │           │
│  │ (arrays)     │  │ (products)   │  │ (blog body)  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└──────────────────────────────────────────────────────────────────┘
```

### Current Component Responsibilities

| Component | Responsibility | Implementation Pattern |
|-----------|----------------|------------------------|
| **Page Components** | Metadata generation, schema composition, content rendering | Server Components with `export const metadata: Metadata` |
| **JsonLd Components** | Generate JSON-LD script tags with Schema.org markup | Pure functions returning script elements with structured data |
| **Layout Components** | Site-wide schema (Organization, WebSite) | Root layout.tsx includes global schemas |
| **Content Components** | UI elements (cards, lists, breadcrumbs) | Server/Client Components based on interactivity needs |

---

## Wave 2 Architecture Additions

### New Components to Build

```
components/seo/
├── JsonLd.tsx                    [EXTEND] Add ServiceJsonLd
│
components/content/
├── AuthorByline.tsx              [NEW] Author info + schema for blog posts
├── RelatedArticles.tsx           [NEW] Internal link cards with analytics
├── GoogleMapEmbed.tsx            [NEW] Interactive map with loading states
│
components/analytics/
├── WebVitalsReporter.tsx         [NEW] Client component for vitals tracking
│
lib/seo/
├── relatedContent.ts             [NEW] Link suggestion algorithm
└── webVitals.ts                  [NEW] Vitals reporting to analytics
```

---

## Integration Architecture by Feature

### 1. Service Schema Integration

**Architecture:** Schema.org Service type for each service offering (e.g., "Echipamente Pizzerie", "Industrial Pumps").

#### Component Structure
```typescript
// components/seo/JsonLd.tsx (EXTEND)
export function ServiceJsonLd({ service }: ServiceJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${service.url}#service`,
    name: service.name,
    description: service.description,
    provider: { '@id': 'https://www.xeh.ro/#organization' },
    areaServed: [
      { '@type': 'Country', name: 'România' },
      { '@type': 'City', name: 'București' },
      { '@type': 'City', name: 'Cluj-Napoca' },
      // ... all major cities
    ],
    serviceType: service.category,
    offers: {
      '@type': 'Offer',
      url: service.url,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
```

**Note:** The dangerouslySetInnerHTML usage here is safe because JSON.stringify produces valid JSON (no XSS risk when data is from controlled sources).

#### Data Flow
```
Service Landing Page (e.g., /cuptoare-profesionale)
    ↓
Metadata + ServiceJsonLd component
    ↓
Schema in <head> + Content in <body>
```

#### Implementation Points
- **XEH.ro:** Add to 9 existing landing pages (`/cuptoare-profesionale`, `/frigidere-industriale`, etc.)
- **InfiniTrade.ro:** Add to category pages (`/pompe`, `/robineti`, `/motoare-electrice`, etc.)
- **areaServed:** List all major Romanian cities (București, Cluj, Timișoara, Iași, Constanța, etc.) for local SEO
- **Integration:** Import ServiceJsonLd in page.tsx, render alongside existing FAQJsonLd

**Sources:**
- [Schema.org Service Type](https://schema.org/Service)
- [areaServed Property](https://schema.org/areaServed)
- [Service Schema Markup Guide](https://www.schemaapp.com/schema-markup/services-schema-markup-schema-org-services/)

---

### 2. Author Bylines Integration

**Architecture:** Person schema + visual byline component for blog articles to improve E-E-A-T signals.

#### Component Structure
```typescript
// components/content/AuthorByline.tsx (NEW)
interface AuthorBylineProps {
  author: {
    name: string
    slug: string
    title: string
    bio: string
    avatar?: string
    linkedIn?: string
  }
  publishDate: string
  readTime?: string
  includeSchema?: boolean
}

export function AuthorByline({ author, publishDate, readTime, includeSchema = true }: AuthorBylineProps) {
  return (
    <>
      {includeSchema && <PersonJsonLd person={...} />}
      <div className="flex items-center gap-4 py-4 border-y">
        {author.avatar && <img src={author.avatar} className="w-12 h-12 rounded-full" />}
        <div>
          <Link href={`/echipa#${author.slug}`} className="font-semibold hover:underline">
            {author.name}
          </Link>
          <p className="text-sm text-gray-600">{author.title}</p>
          <div className="text-sm text-gray-500">
            {publishDate} • {readTime}
          </div>
        </div>
      </div>
    </>
  )
}
```

#### Data Flow
```
Blog Article Page
    ↓
Import AuthorByline + author data (from static array)
    ↓
Render below title, above content
    ↓
PersonJsonLd schema in <head> + Visual byline in <body>
```

#### Implementation Points
- **XEH.ro:** Add to all 6 blog articles in `app/(main)/blog/[slug]/page.tsx`
- **InfiniTrade.ro:** Add to all blog articles in `src/app/blog/[slug]/page.js`
- **Author Data:** Create `lib/data/authors.ts` with author profiles (name, title, bio, expertise, LinkedIn)
- **E-E-A-T Signals:** Link byline to `/echipa` page showing full author bios and credentials
- **Schema Integration:** PersonJsonLd already exists in XEH.ro, reuse for bylines

**Sources:**
- [E-E-A-T Author Best Practices](https://www.seoclarity.net/blog/google-authorship)
- [Author Bylines SEO Guide](https://medium.com/@jenniferwhitfield_41106/bylines-explained-for-seo-3a10091c6143)
- [Google's People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

---

### 3. Related Articles Integration

**Architecture:** Topic clustering via related content links at the end of blog posts and category pages.

#### Component Structure
```typescript
// components/content/RelatedArticles.tsx (NEW)
interface RelatedArticlesProps {
  articles: Array<{
    title: string
    slug: string
    excerpt: string
    category: string
    readTime: string
  }>
  title?: string
}

export function RelatedArticles({ articles, title = "Articole Similare" }: RelatedArticlesProps) {
  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map(article => (
          <Link
            href={`/blog/${article.slug}`}
            className="group p-4 border rounded-lg hover:shadow-lg transition"
            data-related-article={article.slug}
          >
            <span className="text-xs text-crimson font-semibold uppercase">
              {article.category}
            </span>
            <h3 className="font-semibold mt-2 group-hover:text-crimson transition">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{article.excerpt}</p>
            <div className="text-xs text-gray-500 mt-2">{article.readTime}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

#### Linking Strategy (Topic Clustering)
```
// lib/seo/relatedContent.ts (NEW)
export function getRelatedArticles(currentSlug: string, allArticles: Article[]): Article[] {
  // Algorithm:
  // 1. Same category → highest priority
  // 2. Shared keywords → medium priority
  // 3. Recent articles → tiebreaker
  // Return 3-4 most relevant articles

  return allArticles
    .filter(a => a.slug !== currentSlug)
    .map(a => ({
      ...a,
      score: calculateRelevanceScore(current, a)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
```

#### Data Flow
```
Blog Article Page
    ↓
getRelatedArticles(currentSlug) → returns top 3 matches
    ↓
Render <RelatedArticles articles={related} />
    ↓
3-4 internal links with proper anchor text
```

#### Implementation Points
- **Pillar-Cluster Model:** Each landing page (`/cuptoare-profesionale`) = pillar, blog articles = clusters
- **Bidirectional Links:** Landing pages link to blog articles, articles link back to landing pages
- **Link Density:** 3-4 related links per article (optimal per research)
- **XEH.ro:** Already has "Related Content" on landing pages—add RelatedArticles to blog posts
- **InfiniTrade.ro:** Add to both blog posts and category pages

**Sources:**
- [Internal Linking Strategy 2026](https://www.ideamagix.com/blog/internal-linking-strategy-seo-guide-2026/)
- [Topic Clustering Guide](https://topicalmap.ai/blog/auto/internal-linking-strategy-guide-2026)
- [Pillar-Cluster SEO](https://trafficthinktank.com/internal-linking-best-practices/)

---

### 4. Google Maps Integration

**Architecture:** Client-side map embed with loading states and API key management.

#### Component Structure
```typescript
// components/content/GoogleMapEmbed.tsx (NEW)
'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface GoogleMapEmbedProps {
  center: { lat: number; lng: number }
  zoom?: number
  markerTitle: string
  height?: string
}

export function GoogleMapEmbed({ center, zoom = 15, markerTitle, height = "400px" }: GoogleMapEmbedProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
    })

    loader.load().then(() => {
      if (!mapRef.current) return

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
      })

      new google.maps.Marker({
        position: center,
        map,
        title: markerTitle,
      })

      setIsLoading(false)
    }).catch(err => {
      setError('Eroare la încărcarea hărții')
      setIsLoading(false)
    })
  }, [center, zoom, markerTitle])

  return (
    <div className="relative rounded-lg overflow-hidden" style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Se încarcă harta...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-red-50 flex items-center justify-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
```

#### Data Flow
```
Contact/About Page
    ↓
Import GoogleMapEmbed (client component)
    ↓
Pass coordinates from LocalBusinessJsonLd (already exist)
    ↓
Render interactive map with marker
```

#### Implementation Points
- **XEH.ro:** Add to `/contact` page (coordinates: 45.7833, 21.2833 already in LocalBusinessJsonLd)
- **InfiniTrade.ro:** Add to `/contact` page (same coordinates)
- **API Key:** Store in `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- **Loading Strategy:** Use `@googlemaps/js-api-loader` for async script loading
- **Fallback:** Show loading skeleton + error state if Maps API fails
- **Performance:** Lazy load map (only on `/contact` page, not homepage)

**Sources:**
- [Next.js Google Maps Integration](https://medium.com/@saraanofficial/google-maps-integration-in-next-14-13-and-react-load-display-step-by-step-guide-ab2f6ed7b3c0)
- [Google Maps API Loader](https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps)
- [Next.js Client Components Guide](https://github.com/vercel/next.js/discussions/37611)

---

### 5. Core Web Vitals Integration

**Architecture:** Client-side reporting component using Next.js built-in `useReportWebVitals` hook.

#### Component Structure
```typescript
// components/analytics/WebVitalsReporter.tsx (NEW)
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Send to analytics (e.g., Google Analytics 4)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Also log to console in dev
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value)
    }
  })

  return null // No UI, just reporting
}
```

#### Data Flow
```
Page Load
    ↓
WebVitalsReporter listens for events (LCP, FID, CLS, etc.)
    ↓
Metrics collected via useReportWebVitals
    ↓
Send to Google Analytics 4 via gtag
    ↓
View reports in GA4 under Events → Web Vitals
```

#### Optimization Techniques to Implement
- **LCP:** Add `priority` prop to hero images on landing pages
- **FID (now INP):** Use `next/dynamic` for heavy client components (cart drawer, modals)
- **CLS:** All images have explicit `width` and `height` (both sites already do this)
- **Font Optimization:** Use `display: 'swap'` for Google Fonts (InfiniTrade.ro already does this)
- **Script Loading:** Ahrefs Analytics uses `strategy="afterInteractive"` (XEH.ro already does this)

#### Implementation Points
- **XEH.ro:** Add WebVitalsReporter to root `app/layout.tsx`
- **InfiniTrade.ro:** Add to root `src/app/layout.js`
- **Analytics Integration:** Both sites already use Ahrefs Analytics; Web Vitals can also go there
- **Monitoring:** Set up GA4 custom events for LCP, INP, CLS tracking
- **Alerts:** Configure alerts if any metric exceeds thresholds (LCP > 2.5s, CLS > 0.1, INP > 200ms)

**Sources:**
- [Next.js Core Web Vitals Guide](https://nextjs.org/learn/seo/web-performance)
- [Optimizing Web Vitals in Next.js](https://medium.com/@lakshaykapoor08/optimizing-core-web-vitals-in-a-next-js-application-673ad6c0ef4c)
- [2026 Web Vitals Optimization](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025)
- [Next.js useReportWebVitals API](https://nextjs.org/docs/pages/api-reference/functions/use-report-web-vitals)

---

## Data Flow Patterns

### Schema Components Pattern (Existing)
```
Page Component
  ↓
Import JsonLd component(s)
  ↓
Pass data props
  ↓
JsonLd component generates <script> tag
  ↓
Next.js renders in <head>
  ↓
Google crawls and indexes structured data
```

### Content Components Pattern (New for Wave 2)
```
Page Component
  ↓
Import content component (AuthorByline, RelatedArticles, GoogleMapEmbed)
  ↓
Pass data props (from static data or query)
  ↓
Component renders UI + optional schema
  ↓
User sees enhanced content
```

### Analytics Components Pattern (New for Wave 2)
```
Root Layout
  ↓
Import analytics component (WebVitalsReporter)
  ↓
Component listens for browser events
  ↓
Sends data to external service (GA4, Ahrefs)
  ↓
No UI rendered (reporting only)
```

---

## Component Boundaries and Communication

### Clear Boundaries

| Boundary | Communication Method | Notes |
|----------|---------------------|-------|
| **Page ↔ Schema Components** | Props (data objects) | Server-side, no state needed |
| **Page ↔ Content Components** | Props (data objects) | Server-side when static, client when interactive |
| **Page ↔ Analytics Components** | No communication | Analytics components are autonomous |
| **Content ↔ Schema** | Co-location | AuthorByline includes PersonJsonLd internally |
| **Layout ↔ Global Schema** | Direct import | OrganizationJsonLd, WebSiteJsonLd in root layout |

### Data Sources

```
Static Data (lib/data/)
  ↓
  ├─→ authors.ts        → AuthorByline
  ├─→ relatedContent.ts → RelatedArticles
  └─→ services.ts       → ServiceJsonLd

Database (Supabase)
  ↓
  └─→ Products → ProductJsonLd (no changes needed)

External APIs
  ↓
  ├─→ Google Maps API → GoogleMapEmbed
  └─→ GA4 Events API   → WebVitalsReporter
```

---

## Recommended Build Order

### Phase 1: Schema Extensions (No UI)
**Complexity:** Low | **Dependencies:** None

1. Add `ServiceJsonLd` to `components/seo/JsonLd.tsx`
2. Create `lib/data/services.ts` with service definitions
3. Integrate ServiceJsonLd into existing landing pages
4. Test with Google Rich Results Test

**Rationale:** Schema is low-risk, high-SEO-value, and doesn't affect user-facing UI. Start here to get quick wins.

**Estimated Time:** 2-3 hours
**Risk:** Very Low (additive, doesn't break existing schemas)

---

### Phase 2: Author Bylines
**Complexity:** Low-Medium | **Dependencies:** Phase 1 (reuses PersonJsonLd pattern)

1. Create `lib/data/authors.ts` with author profiles
2. Build `components/content/AuthorByline.tsx`
3. Integrate into blog article pages (XEH.ro: 6 articles, InfiniTrade.ro: ~10 articles)
4. Update `/echipa` pages with detailed author bios if not already present

**Rationale:** Small UI component with clear value (E-E-A-T). Reuses existing PersonJsonLd schema pattern.

**Estimated Time:** 3-4 hours
**Risk:** Low (isolated component, doesn't affect other pages)

---

### Phase 3: Related Articles
**Complexity:** Medium | **Dependencies:** Phase 2 (relies on content structure)

1. Create `lib/seo/relatedContent.ts` with link suggestion algorithm
2. Build `components/content/RelatedArticles.tsx`
3. Add data-tracking attributes for analytics
4. Integrate into all blog posts + landing pages
5. Test link relevance and user engagement

**Rationale:** Higher complexity due to content matching logic, but major SEO benefit (internal linking).

**Estimated Time:** 4-5 hours
**Risk:** Medium (logic complexity, but no external dependencies)

---

### Phase 4: Google Maps Embed
**Complexity:** Medium-High | **Dependencies:** None (isolated)

1. Set up Google Maps API key (requires Google Cloud account)
2. Install `@googlemaps/js-api-loader`
3. Build `components/content/GoogleMapEmbed.tsx` with loading states
4. Add to `/contact` pages on both sites
5. Test error handling and loading performance

**Rationale:** Requires external API setup and client-side rendering. Higher complexity, lower SEO impact (but improves UX).

**Estimated Time:** 3-4 hours
**Risk:** Medium (external dependency, API quotas, requires env setup)

---

### Phase 5: Web Vitals Reporting
**Complexity:** Low | **Dependencies:** None (parallel to all phases)

1. Build `components/analytics/WebVitalsReporter.tsx`
2. Integrate into root layout
3. Configure GA4 custom events
4. Set up monitoring dashboard

**Rationale:** Simple component, but requires analytics setup. Can be done in parallel with other phases.

**Estimated Time:** 2-3 hours
**Risk:** Low (reporting only, doesn't affect site functionality)

---

### Phase 6: Performance Optimization Sweep
**Complexity:** Medium | **Dependencies:** All previous phases

1. Audit all hero images and add `priority` prop
2. Identify heavy client components and add `next/dynamic` imports
3. Review font loading strategies
4. Run Lighthouse audits on key pages
5. Iterate on performance improvements based on Web Vitals data

**Rationale:** After adding new features, optimize holistically. Use Web Vitals data from Phase 5 to prioritize.

**Estimated Time:** 4-6 hours
**Risk:** Low (performance improvements, not new features)

---

## Build Order Rationale

**Sequential Logic:**
1. **Schema First:** Low-risk, immediate SEO benefit, sets patterns for later phases
2. **Content Components Next:** Build on schema patterns, add user-facing value
3. **External Integrations Last:** Highest complexity and external dependencies

**Parallelization Opportunities:**
- Phases 1-3 can be done sequentially on one site, then replicated to the second site
- Phase 4 (Maps) can be done in parallel with Phase 3 (Related Articles) since they're independent
- Phase 5 (Web Vitals) can start in parallel with Phase 4 since it's global

**Testing Checkpoints:**
- After Phase 1: Validate all schemas with Google Rich Results Test
- After Phase 3: Run internal link audit (check for broken links)
- After Phase 4: Test Maps API quota limits and error states
- After Phase 6: Run full Lighthouse audit on 10 key pages

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Mixing Schema Generation with Business Logic

**What people do:** Put schema generation logic inside page components or API routes
**Why it's wrong:** Makes schema hard to test, reuse, and maintain. Violates separation of concerns.
**Do this instead:** Keep all schema generation in `components/seo/JsonLd.tsx`. Pages only pass data.

---

### Anti-Pattern 2: Loading Google Maps on Every Page

**What people do:** Import GoogleMapEmbed globally or render on homepage
**Why it's wrong:** Maps API is heavy (~300KB), hurts LCP on pages that don't need it. Wastes API quota.
**Do this instead:** Only load on `/contact` page. Use lazy loading with `next/dynamic` if needed elsewhere.

---

### Anti-Pattern 3: Hardcoding Related Article Slugs

**What people do:** Manually list related article slugs in each blog post
**Why it's wrong:** Unmaintainable as content grows. Easy to create broken links or stale references.
**Do this instead:** Use algorithmic link suggestion based on categories and keywords.

---

### Anti-Pattern 4: Client Components for Static Content

**What people do:** Mark AuthorByline or RelatedArticles as `'use client'` when they don't need interactivity
**Why it's wrong:** Sends unnecessary JavaScript to browser, hurts INP and LCP. Disables SSR benefits.
**Do this instead:** Default to Server Components. Only use `'use client'` for truly interactive components (Maps, Analytics).

**Server vs Client Decision Tree:**
```
Does it need browser APIs (DOM, window)?
  ↓ YES → 'use client'
  ↓ NO  → Server Component (default)

Does it have onClick/onChange handlers?
  ↓ YES → 'use client'
  ↓ NO  → Server Component (default)
```

**Wave 2 Components:**
- `ServiceJsonLd` → Server Component (static schema)
- `AuthorByline` → Server Component (static display)
- `RelatedArticles` → Server Component (static links)
- `GoogleMapEmbed` → **Client Component** (interactive map)
- `WebVitalsReporter` → **Client Component** (browser APIs)

---

## Scaling Considerations

| Concern | At Launch (100 pages) | At 1K pages | At 10K+ pages |
|---------|----------------------|-------------|---------------|
| **Schema Generation** | In-memory arrays, fine | Consider database for services/authors | Database required for dynamic content |
| **Related Articles** | Static algorithm O(n²), acceptable | Cache results in ISR | Use vector embeddings for semantic matching |
| **Google Maps API** | ~1K loads/month, free tier OK | Monitor quota | Consider self-hosting tiles |
| **Web Vitals Data** | GA4 events, fine | Consider dedicated analytics DB | Use aggregation service |
| **Build Time** | <5 min for both sites | Pre-generate popular pages only | Incremental Static Regeneration required |

---

## Sources

### Schema.org and SEO
- [Service Schema Markup Guide](https://www.schemaapp.com/schema-markup/services-schema-markup-schema-org-services/)
- [Schema.org Service Type](https://schema.org/Service)
- [areaServed Property Documentation](https://schema.org/areaServed)
- [areaServed Best Practices Forum](https://localsearchforum.com/threads/best-practices-for-areaserved-schema-markup.57014/)

### Author Bylines and E-E-A-T
- [Google Authorship and SEO](https://www.seoclarity.net/blog/google-authorship)
- [E-E-A-T Content Breakdown](https://digitaloft.co.uk/eeat-at-the-content-author-and-brand-levels/)
- [SEO-Friendly Author Bios](https://www.sangfroidwebdesign.com/website-quality/seo-friendly-professional-author-bio-eat/)
- [Google's Helpful Content Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Bylines Explained for SEO](https://medium.com/@jenniferwhitfield_41106/bylines-explained-for-seo-3a10091c6143)

### Internal Linking
- [Internal Linking Strategy 2026](https://www.ideamagix.com/blog/internal-linking-strategy-seo-guide-2026/)
- [7 Internal Linking Best Practices](https://trafficthinktank.com/internal-linking-best-practices/)
- [Topic Clustering Architecture Guide](https://topicalmap.ai/blog/auto/internal-linking-strategy-guide-2026)
- [Internal Links SEO Benefits](https://www.clickrank.ai/internal-links-in-seo/)

### Google Maps Integration
- [Google Maps in Next.js 14 Guide](https://medium.com/@saraanofficial/google-maps-integration-in-next-14-13-and-react-load-display-step-by-step-guide-ab2f6ed7b3c0)
- [Interactive Maps with Next.js](https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps)
- [Next.js Google Maps Discussion](https://github.com/vercel/next.js/discussions/37611)

### Core Web Vitals
- [Next.js Web Performance Guide](https://nextjs.org/learn/seo/web-performance)
- [Optimizing Web Vitals in Next.js](https://medium.com/@lakshaykapoor08/optimizing-core-web-vitals-in-a-next-js-application-673ad6c0ef4c)
- [2026 Web Vitals Optimization](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025)
- [useReportWebVitals API](https://nextjs.org/docs/pages/api-reference/functions/use-report-web-vitals)
- [Next.js Rendering Strategies](https://www.thisdot.co/blog/next-js-rendering-strategies-and-how-they-affect-core-web-vitals)

---

*Architecture research for SEO+GEO Wave 2 integration with Next.js 14 App Router*
*Researched: 2026-02-13*
*Confidence: HIGH (validated with official docs and 2026 sources)*
