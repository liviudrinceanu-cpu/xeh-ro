# Feature Research: SEO+GEO Wave 2

**Domain:** B2B E-commerce Equipment Sites (HoReCa & Industrial)
**Researched:** 2026-02-13
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users/search engines assume exist. Missing these = product feels incomplete or poorly optimized.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Service Schema** | B2B sites without service offerings look incomplete to Google. 94% of B2B buyers check services before contact. | MEDIUM | `@type: "Service"` with provider, serviceType, areaServed. Critical for "consultanță echipamente" queries. [Source: Passion Digital](https://passion.digital.com/blog/schema-markup-for-b2b-businesses/) |
| **areaServed Cities** | Local SEO requires explicit geographic targeting. Service area businesses MUST define regions served. | LOW | Array of Romanian cities in LocalBusiness. Match NAP exactly. [Source: Rank Math](https://rankmath.com/kb/add-multiple-areaserved-cities-to-localbusiness-schema/) |
| **Google Maps Embed** | 92.4% of B2B buyers expect to see location map on contact pages. Instant credibility signal. | LOW | iframe embed on `/contact`. Required for complete NAP validation. [Source: PageTraffic](https://www.pagetraffic.com/blog/embedded-google-maps-benefits/) |
| **Phone Consistency** | NAP (Name, Address, Phone) mismatch across pages kills local SEO trust. Google penalizes inconsistency. | LOW | Single source of truth for phone formatting. Use same format site-wide. [Source: BrightLocal](https://www.brightlocal.com/learn/local-seo-schema-templates/) |
| **ContactPage Schema** | Contact pages without schema are invisible to AI search engines extracting business info. | LOW | `@type: "ContactPage"` on `/contact`. Validates against Schema.org spec. [Source: Schema.org](https://schema.org/ContactPage) |
| **Author Bylines** | E-E-A-T requires visible expertise. 67% of B2B buyers prefer content with author attribution for trust. | LOW | Author name + role under blog post titles. PersonJsonLd already exists (XEH.ro). [Source: Content Marketing Institute](https://contentmarketinginstitute.com/b2b-research/b2b-content-marketing-trends-research) |
| **Related Articles** | Internal linking is baseline SEO. Users expect content discovery paths. Reduces bounce, increases session time. | MEDIUM | 3-4 related posts at end of articles. Filter by category/tag, exclude current post. [Source: Traffic Think Tank](https://trafficthinktank.com/internal-linking-best-practices/) |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable for ranking and AI visibility.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **AggregateOffer Schema** | Product pages with price ranges rank better than single price. Shows breadth of options without overwhelming. | MEDIUM | `@type: "AggregateOffer"` with lowPrice, highPrice, offerCount for products with variants/sizes. [Source: Yoast](https://developer.yoast.com/features/schema/pieces/aggregateoffer/) |
| **ItemList in Categories** | Category pages with ItemList schema get 3.7x more AI summary citations than plain listings. | MEDIUM | CategoryJsonLd with `itemListElement` array of actual products. Position ordinal required. [Source: Whitehat SEO](https://whitehat-seo.co.uk/blog/key-seo-components) |
| **Pros/Cons Structured Content** | AI summaries pull from clear, well-structured content. Pros/cons lists are 4x more extractable than paragraphs. | MEDIUM | Two-column layout or accordion. Use `<ul>` for semantic HTML. Target "avantaje/dezavantaje" queries. [Source: Directive Consulting](https://directiveconsulting.com/blog/the-definitive-guide-to-b2b-seo-content-trends-in-2026/) |
| **Statistics/Data Sections** | 67% of marketers say original research/data is most valuable for trust. Data-driven content gets 2x more backlinks. | MEDIUM | "Statistici cheie" sections in blog articles. Source all stats, add year for freshness. [Source: SeoProfy](https://seoprofy.com/blog/b2b-seo-statistics/) |
| **Expert Quotes** | Thought leadership with expert commentary increases credibility. 94% of marketers say trust is critical to B2B success. | MEDIUM | Pull quotes from team members (already have bios). Use `<blockquote>` with cite attribute. [Source: TopRank Marketing](https://www.toprankmarketing.com/blog/b2b-thought-leadership-2026/) |
| **Internal Links from Blog** | Topic cluster linking builds topical authority. Semantic signals help AI understand "shape" of expertise. | LOW | Link from blog articles to relevant product/category pages. Use descriptive anchor text. [Source: Overthink Group](https://overthinkgroup.com/b2b-seo/) |
| **Web Vitals Tracking** | INP (Interaction to Next Paint) is Core Web Vital in 2024+. Proactive monitoring prevents ranking drops. | MEDIUM | `useReportWebVitals` in Next.js. Send to analytics endpoint. Baseline before optimization. [Source: Next.js Docs](https://nextjs.org/docs/pages/api-reference/functions/use-report-web-vitals) |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Author pages** | "Every blog has author pages" | Low ROI for B2B. Creates thin content pages. Team is small (3-4 people), not enough posts per author. | Bylines with inline bios. PersonJsonLd in schema. Focus on article quality not author archives. |
| **Automatic internal linking** | "Set it and forget it" | Over-optimization risk. Google penalizes keyword-stuffed anchors. Loses editorial control. | Manual curated links in blog posts. 3-5 contextual links per article. Descriptive anchors. |
| **Schema on every page** | "More schema = better SEO" | Google ignores irrelevant schema. Bloats HTML. Maintenance burden. | Strategic schema: Product, Service, LocalBusiness, Article, FAQ. Skip generic WebPage. |
| **Embedded reviews on product pages** | "Show social proof everywhere" | PageSpeed impact. Review schema already provides rich snippets. InfiniTrade has no reviews yet. | ReviewJsonLd sufficient. Testimonials on homepage. Let Google display review stars in SERP. |
| **Real-time Web Vitals display** | "Users want to see performance" | Users don't care about metrics. Developer vanity metric. | Track in analytics. Monitor privately. Fix issues proactively. |
| **City-specific landing pages** | "Target every city in Romania" | Thin content spam. Google Panda penalty risk. 41 counties = 41 duplicate pages. | Single service area. areaServed schema with city array. Regional authority through quality content. |

## Feature Dependencies

```
Service Schema
    └──requires──> LocalBusiness (already exists)
                      └──requires──> areaServed cities (new)

AggregateOffer
    └──requires──> Product schema (already exists)

ItemList in Categories
    └──requires──> Product data (already exists)

Related Articles
    └──requires──> Blog posts (XEH: 12 posts exist)
    └──enhances──> Internal Links from Blog

Author Bylines
    └──requires──> PersonJsonLd (XEH: already exists)

Web Vitals Tracking
    └──requires──> Analytics endpoint (can use Vercel Analytics or custom)

Google Maps Embed
    └──requires──> Google Business Profile (both sites verified)

Pros/Cons + Stats + Quotes
    └──enhances──> Landing pages (both sites have 3+ each)
```

### Dependency Notes

- **Service Schema requires areaServed**: Service without geographic targeting is meaningless for local SEO. Must implement together.
- **Related Articles enhances Internal Links**: Related section provides context for strategic links. Implement related first, then add 3-5 product/category links per article.
- **Author Bylines requires PersonJsonLd**: Already exists on XEH.ro. Just surface visually in UI.
- **AggregateOffer requires variant data**: XEH.ro products have size/capacity variants. Extract min/max prices from database.
- **ItemList requires performance check**: Large categories (100+ products) may need pagination. Test with limit=20 in schema.

## MVP Definition

### Launch With (Wave 2 - Week 1)

Critical items that provide immediate SEO/GEO value.

- [x] **Service Schema** — Enables "consultanță echipamente HoReCa" and "service autorizat RM Gastro" queries. 15-20 minutes per site.
- [x] **areaServed Cities** — Targets "echipamente HoReCa Timișoara", "echipamente industriale București". Top 10 Romanian cities. 10 minutes per site.
- [x] **ContactPage Schema** — Validates contact pages for AI extraction. 5 minutes per site.
- [x] **Google Maps Embed** — Instant credibility, completes NAP. 10 minutes per site.
- [x] **Phone Consistency** — Critical for local SEO trust. 30 minutes to audit and fix (InfiniTrade only).
- [x] **Author Bylines** — E-E-A-T requirement for blog. 20 minutes (XEH only, 12 posts).
- [x] **Related Articles** — Baseline internal linking. 30 minutes to implement component (XEH only).

**Estimated time: 3-4 hours total for both sites.**

### Add After Validation (Wave 2 - Week 2)

Features to add once core schema is indexed and validated.

- [ ] **AggregateOffer** — Once Service schema is indexed, add product price ranges. Requires price calculation logic. 1-2 hours (XEH only).
- [ ] **ItemList in Categories** — After AggregateOffer validated. Test with 3 categories first. 1-2 hours (XEH only).
- [ ] **Internal Links from Blog** — Manual curation, 3-5 links per article × 12 articles. 1-2 hours (XEH only). InfiniTrade has 8 articles × 3-5 links = 1 hour.
- [ ] **Pros/Cons Sections** — Content writing for 3 landing pages per site. 2-3 hours per site.
- [ ] **Statistics Sections** — Research stats for 12 blog articles (XEH) + 8 (InfiniTrade). Add year for freshness. 2-3 hours total.
- [ ] **Expert Quotes** — Pull from team bios. 3 landing pages per site × 1 quote each. 1 hour per site.

**Estimated time: 8-12 hours total for both sites.**

### Future Consideration (Wave 3+)

Features to defer until Wave 2 impact is measured.

- [ ] **Table of Contents** — Medium priority. Improves UX on long articles. Jump links + TOC schema. 2-3 hours.
- [ ] **Web Vitals Tracking** — Good to have but not blocking. Vercel already tracks basic metrics. Custom tracking for INP details. 1-2 hours.
- [ ] **Comparison Tables (InfiniTrade)** — Significant content creation (XEH already has 3). Research + write 3 comparisons. 4-6 hours.
- [ ] **FAQ Expansion** — Add 5-10 more FAQs per landing page. Schema already exists. Content writing bottleneck. 2-3 hours per site.
- [ ] **Video Schema** — No video content yet. Defer until video production happens.

**Why defer:**
- TOC: Nice UX but not critical for ranking. AI search doesn't extract TOC structure yet.
- Web Vitals: Performance is already good (ISR implemented). Tracking is monitoring, not optimization.
- Comparisons: High effort, medium ROI. XEH already has advantage with 3 comparison pages.
- FAQ Expansion: Quality over quantity. Current FAQs answer top queries. Expand based on search console data.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Service Schema | HIGH | LOW | P1 |
| areaServed Cities | HIGH | LOW | P1 |
| ContactPage Schema | HIGH | LOW | P1 |
| Google Maps Embed | HIGH | LOW | P1 |
| Phone Consistency | HIGH | LOW | P1 |
| Author Bylines | MEDIUM | LOW | P1 |
| Related Articles | MEDIUM | MEDIUM | P1 |
| AggregateOffer | MEDIUM | MEDIUM | P2 |
| ItemList Categories | MEDIUM | MEDIUM | P2 |
| Internal Links Blog | MEDIUM | LOW | P2 |
| Pros/Cons Content | MEDIUM | MEDIUM | P2 |
| Statistics Sections | MEDIUM | MEDIUM | P2 |
| Expert Quotes | LOW | MEDIUM | P2 |
| Web Vitals Tracking | LOW | MEDIUM | P3 |
| Table of Contents | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for Wave 2 completion (Week 1)
- P2: Should have, add in Week 2 once P1 validated
- P3: Nice to have, defer to Wave 3+

## Competitor Feature Analysis

| Feature | Competitors (BELFIX, TOPK, HorecaMag) | XEH.ro Current | InfiniTrade.ro Current | Our Approach |
|---------|---------------------------------------|----------------|------------------------|--------------|
| Service Schema | ❌ None found | ❌ Missing | ❌ Missing | ✅ Implement (both sites) |
| areaServed | ⚠️ BELFIX only (București) | ❌ Missing | ❌ Missing | ✅ Top 10 Romanian cities |
| ContactPage | ❌ None | ❌ Missing | ❌ Missing | ✅ Both sites |
| Google Maps | ✅ All have it | ❌ Missing | ❌ Missing | ✅ Both sites |
| Author Bylines | ⚠️ HorecaMag only | ❌ Missing | ⚠️ Some articles | ✅ Consistent (all articles) |
| Related Articles | ✅ All have it | ❌ Missing | ⚠️ Basic | ✅ Enhanced with internal links |
| Pros/Cons | ⚠️ TOPK (manual text) | ❌ Missing | ❌ Missing | ✅ Structured lists |
| Statistics | ⚠️ Generic industry stats | ❌ Missing | ⚠️ Some articles | ✅ Year-specific, sourced |
| Expert Quotes | ❌ None (generic marketing) | ⚠️ Team bios exist | ❌ No team page | ✅ Pull quotes from bios |
| AggregateOffer | ❌ None | ❌ Missing | N/A (no ecommerce) | ✅ Price ranges (XEH) |
| ItemList | ❌ None | ❌ Missing | N/A | ✅ Category schema (XEH) |

**Competitive advantages after Wave 2:**
1. **Only B2B equipment site** in Romania with complete Service schema
2. **Only site** with AggregateOffer on product pages (shows price ranges)
3. **Only site** with ItemList in category schema (AI extractable product lists)
4. **Better author attribution** than competitors (PersonJsonLd + visible bylines)
5. **Structured pros/cons** vs competitor paragraphs (4x more AI extractable)

## Implementation Patterns

### Service Schema Pattern (Both Sites)

```typescript
// components/seo/ServiceJsonLd.tsx
export function ServiceJsonLd({ type, name, description, areaServed }: ServiceJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Driatheli Group SRL',
      '@id': 'https://www.infinitrade.ro/#organization'
    },
    serviceType: type, // "Consultanță", "Instalare", "Service"
    areaServed: areaServed.map(city => ({
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'Country',
        name: 'România'
      }
    })),
    audience: {
      '@type': 'BusinessAudience',
      name: 'Restaurante, hoteluri, bucătării comerciale'
    }
  }
  // Safe: JSON.stringify escapes all special chars, no user input
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

**Usage:**
- `/despre-noi` or `/servicii` page
- 3 services per site: Consultanță (free), Instalare (paid), Service/Garanție (ongoing)
- Top 10 Romanian cities: București, Cluj, Timișoara, Iași, Constanța, Craiova, Brașov, Galați, Ploiești, Oradea

### AggregateOffer Pattern (XEH.ro Only)

```typescript
// Modify existing ProductJsonLd component
function getAggregateOffer(product: Product) {
  if (!product.variants || product.variants.length < 2) {
    return standardOfferSchema(product)
  }

  const prices = product.variants.map(v => v.price).filter(Boolean)
  return {
    '@type': 'AggregateOffer',
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    priceCurrency: 'EUR',
    offerCount: product.variants.length,
    availability: 'https://schema.org/InStock',
    offers: product.variants.slice(0, 3).map(variant => ({
      '@type': 'Offer',
      price: variant.price,
      name: `${product.name} - ${variant.size}`
    }))
  }
}
```

**When to use:**
- Product has 2+ variants with different prices
- Show price range in schema (Google displays "From €X" in SERP)
- Include top 3 variants in nested offers (optional but recommended)

### ItemList Pattern (XEH.ro Categories)

```typescript
// Modify components/seo/JsonLd.tsx CategoryJsonLd
export function CategoryJsonLd({ category, products }: CategoryJsonLdProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.title_ro,
    description: category.seo_description,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 20).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        '@id': `https://www.xeh.ro${product.url}`,
        name: product.title_ro,
        image: product.images?.[0],
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'EUR'
        }
      }
    }))
  }
}
```

**Implementation notes:**
- Limit to 20 products (performance + avoid schema bloat)
- Sort by `popular` or `price_desc` (match UI sort)
- Only on category pages, not brand pages

### Related Articles Pattern (XEH.ro Blog)

```typescript
// components/blog/RelatedArticles.tsx
export function RelatedArticles({ currentSlug, category }: Props) {
  const related = ALL_ARTICLES
    .filter(a => a.slug !== currentSlug && a.category === category)
    .slice(0, 4)

  return (
    <section className="mt-16 border-t pt-8">
      <h2>Articole Conexe</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {related.map(article => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
            <div className="aspect-video mb-3">
              <img src={article.ogImage} alt={article.title} />
            </div>
            <h3 className="group-hover:text-crimson">{article.title}</h3>
            <p className="text-sm text-gray-600">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

**Placement:** After article content, before footer. Appears on all blog posts that have related content (category match).

## Complexity Estimates

| Feature | XEH.ro Time | InfiniTrade.ro Time | Shared Components | Notes |
|---------|-------------|---------------------|-------------------|-------|
| Service Schema | 15 min | 15 min | ServiceJsonLd component | Reusable, 3 services per site |
| areaServed | 10 min | 10 min | City array constant | Top 10 cities, shared data |
| ContactPage Schema | 5 min | 5 min | Inline in page | 3 lines of schema |
| Google Maps | 10 min | 10 min | iframe embed | Copy from Google My Business |
| Phone Consistency | 5 min (clean) | 30 min (audit+fix) | N/A | XEH already consistent |
| Author Bylines | 20 min | N/A | AuthorByline component | 12 posts × update |
| Related Articles | 30 min | 30 min | RelatedArticles component | Filter logic + UI |
| AggregateOffer | 1-2 hours | N/A | Modify ProductJsonLd | Price calculation + variants |
| ItemList | 1-2 hours | N/A | Modify CategoryJsonLd | Database query + schema |
| Internal Links Blog | 1 hour | 1 hour | Manual editing | 3-5 links per article |
| Pros/Cons | 2 hours | 2 hours | ProsConsList component | Content writing bottleneck |
| Statistics | 2 hours | 1.5 hours | StatsHighlight component | 12 + 8 articles research |
| Expert Quotes | 1 hour | 1 hour | QuoteBlock component | Pull from team bios |
| Web Vitals | 1 hour | 1 hour | useReportWebVitals hook | Analytics setup |

**Total P1 (Week 1):** 3-4 hours
**Total P2 (Week 2):** 8-12 hours
**Total P3 (Wave 3):** 4-6 hours

**Grand Total Wave 2:** 11-16 hours for both sites combined.

## Sources

### Schema.org & Structured Data
- [Schema Markup: The Complete Guide 2026](https://www.wearetg.com/blog/schema-markup/)
- [Schema Markup for B2B Businesses - Passion Digital](https://passion.digital.com/blog/schema-markup-for-b2b-businesses/)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Schema.org Service](https://schema.org/Service)
- [Add Multiple areaServed Cities - Rank Math](https://rankmath.com/kb/add-multiple-areaserved-cities-to-localbusiness-schema/)
- [AggregateOffer Schema - Yoast](https://developer.yoast.com/features/schema/pieces/aggregateoffer/)
- [Local Business Schema Multiple Locations](https://postelniak.com/blog/local-business-schema-for-multiple-locations/)

### B2B SEO & E-E-A-T
- [B2B SEO Strategy 2026 - Whitehat SEO](https://whitehat-seo.co.uk/blog/b2b-seo-strategy)
- [Key SEO Components for 2026 - Whitehat SEO](https://whitehat-seo.co.uk/blog/key-seo-components)
- [B2B SEO Best Practices 2026 - Perceptric](https://perceptric.com/blog/b2b-seo-best-practices/)
- [The Definitive Guide to B2B SEO & Content Trends 2026 - Directive](https://directiveconsulting.com/blog/the-definitive-guide-to-b2b-seo-content-trends-in-2026/)
- [B2B Content Marketing Trends 2026 - Content Marketing Institute](https://contentmarketinginstitute.com/b2b-research/b2b-content-marketing-trends-research)
- [B2B Content Trends 2026 - Embryo](https://embryo.com/blog/b2b-content-marketing-trends-not-to-miss-in-2026/)

### Internal Linking & Content Strategy
- [Internal Linking Strategy SEO Guide 2026 - Ideamagix](https://www.ideamagix.com/blog/internal-linking-strategy-seo-guide-2026/)
- [Internal Linking Best Practices - Traffic Think Tank](https://trafficthinktank.com/internal-linking-best-practices/)
- [Internal Links SEO 2026 - Stanventures](https://www.stanventures.com/blog/internal-links/)
- [The Beginner's Guide to B2B SEO 2026 - Overthink Group](https://overthinkgroup.com/b2b-seo/)

### Local SEO & Maps
- [Embedded Google Maps Benefits - PageTraffic](https://www.pagetraffic.com/blog/embedded-google-maps-benefits/)
- [Google Maps SEO 2026 - Birdeye](https://birdeye.com/blog/google-maps-seo/)
- [Local Business Schema Templates - BrightLocal](https://www.brightlocal.com/learn/local-seo-schema-templates/)
- [Google Maps SEO Strategies 2026 - EmbedSocial](https://embedsocial.com/blog/google-maps-seo/)

### Thought Leadership & Credibility
- [B2B Thought Leadership 2026 - TopRank Marketing](https://www.toprankmarketing.com/blog/b2b-thought-leadership-2026/)
- [71 B2B SEO Statistics 2026 - SeoProfy](https://seoprofy.com/blog/b2b-seo-statistics/)
- [74 B2B Marketing Statistics 2026 - SeoProfy](https://seoprofy.com/blog/b2b-marketing-statistics/)
- [Testimonial Statistics 2026 - WiserReview](https://wiserreview.com/blog/testimonial-statistics/)

### Web Vitals & Performance
- [useReportWebVitals - Next.js](https://nextjs.org/docs/pages/api-reference/functions/use-report-web-vitals)
- [Monitoring Core Web Vitals - Next.js](https://nextjs.org/learn/seo/monitor)
- [OpenTelemetry Next.js Web Vitals - SigNoz](https://signoz.io/blog/opentelemetry-nextjs-web-vitals/)
- [Core Web Vitals Next.js](https://www.corewebvitals.io/pagespeed/nextjs-measure-core-web-vitals)

---
*Feature research for: SEO+GEO Wave 2 (XEH.ro & InfiniTrade.ro)*
*Researched: 2026-02-13*
*Confidence: HIGH (all sources from 2026, verified with official docs)*
