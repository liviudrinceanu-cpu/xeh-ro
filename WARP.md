# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling & Commands

### Stack
- **Framework:** Next.js 14 (App Router) with TypeScript
- **Location:** Application code is under `src/`
- **Styling:** Tailwind CSS with custom utility classes defined in `src/app/globals.css`
- **Path alias:** `@/*` resolves to `./src/*` (see `tsconfig.json`)

### Package scripts (npm)
Commands below use `npm`. If you use another package manager, adapt the commands accordingly.

- **Install dependencies**
  ```bash
  npm install
  ```

- **Run development server (Next.js)**
  ```bash
  npm run dev
  ```

- **Build production bundle**
  ```bash
  npm run build
  ```

- **Run production server (after build)**
  ```bash
  npm run start
  ```

- **Run linting (ESLint via `next lint`)**
  ```bash
  npm run lint
  ```

### Tests
There is currently **no test script configured** in `package.json` and no test runner present in the repository. If you add tests (e.g. Jest, Playwright, Cypress), expose them via `npm` scripts and update this section with commands for running the full suite and individual tests.

## Project Architecture

### Overview
This is a statically-driven marketing/catalog site for **HoReCa equipment** built on the **Next.js App Router**. The core concepts are:

- **Pages & routing** under `src/app` (file-system based routing)
- **Shared UI components** under `src/components`
- **Static data layer** under `src/data`
- **Shared TypeScript models** under `src/types`
- **SEO / metadata & structured data** implemented via Next.js `metadata` exports and JSON-LD

### Routing & layout (`src/app`)

- **Root layout:** `src/app/layout.tsx`
  - Defines global `<html>`/`<body>` structure and imports `Header`, `Footer`, `WhatsAppButton`, and `globals.css`.
  - Central place for **site-wide SEO**:
    - `export const metadata` configures metadataBase, title template, description, keywords, Open Graph, Twitter card, robots, and Google verification.
    - Injects an `Organization` JSON-LD object (`organizationJsonLd`) via a `<script type="application/ld+json">` in `<head>`.

- **Top-level routes:**
  - `src/app/page.tsx` – Home page, shows hero, feature highlights, category grid (from `categories`), and a featured-products grid.
  - `src/app/categorii/page.tsx` – Lists all categories from `categories`, with metadata specific to the category index.
  - `src/app/categorii/[slug]/page.tsx` – Dynamic category detail page.
    - Uses `generateStaticParams` + `getAllCategories()` for static generation.
    - Uses `generateMetadata` to create per-category metadata (title/description/Open Graph image) from the `Category` data.
    - Renders category header and product grid (via `getProductsByCategory`), plus SEO-oriented JSON-LD of type `CollectionPage` with an embedded `ItemList` of products.
  - `src/app/produse/[slug]/page.tsx` – Dynamic product detail page.
    - Uses `generateStaticParams` + `getAllProducts()` for static generation.
    - `generateMetadata` builds product-specific metadata (title, description, Open Graph images) from the `Product` data.
    - Renders product details, specifications, features, CTAs, and a related-products grid filtered by `categorySlug`.
    - Emits a `Product` JSON-LD object with brand, sku/mpn, category, and Offer information.
  - `src/app/cerere-oferta/page.tsx` – Quote request page (server component) that:
    - Sets page metadata for quote requests.
    - Provides marketing/benefit cards and wraps the `QuoteForm` client component in `<Suspense>`.
  - `src/app/contact/page.tsx` – Contact page (server component) that:
    - Defines metadata for contact.
    - Shows contact method cards, a `ContactForm` client component, a map placeholder, business hours, and a quick-call CTA.
  - `src/app/despre-noi/page.tsx` – "About us" page with stats, story, values, services, and CTAs.
  - `src/app/not-found.tsx` – Custom 404 page with navigation links back to home and categories.

- **SEO utilities:**
  - `src/app/robots.ts` – Returns Next.js `MetadataRoute.Robots` configuration allowing all crawling except `/api/` and `/admin/`, and points to the sitemap URL.
  - `src/app/sitemap.ts` – Implements `MetadataRoute.Sitemap` using:
    - A fixed `baseUrl`.
    - A set of **static pages** (home, `/categorii`, `/despre-noi`, `/contact`, etc.) with frequencies and priorities.
    - Dynamic entries derived from `getAllCategories()` and `getAllProducts()` so category and product URLs are reflected in the sitemap.

### Data & domain models

- **Types:** `src/types/index.ts`
  - `Category` – Core fields for category pages (`slug`, `name`, `description`, `image`, `productCount`).
  - `Product` – Detailed product model including `shortDescription`, `categorySlug`/`categoryName`, `images`, `specifications`, `features`, and optional `brand`, `model`, `sku` fields.
  - `ProductSpecification` – Simple label/value pair used by the product specs sections.
  - Form-related types (`ContactFormData`, `QuoteRequestFormData`) defining the shape of data expected by contact and quote forms.
  - `BreadcrumbItem` – Shared type used by the `Breadcrumbs` component and breadcrumb arrays in pages.

- **Category data & helpers:** `src/data/categories.ts`
  - Exports a static `categories: Category[]` array representing all high-level equipment categories.
  - Each entry includes a `slug` used in routing (`/categorii/[slug]`), human-readable `name`, `description`, `image` path, and `productCount` used in UI.
  - Helper functions:
    - `getCategoryBySlug(slug)` – Lookup used by category and product pages.
    - `getAllCategories()` – Used for static generation and sitemap.

- **Product data & helpers:** `src/data/products.ts`
  - Exports a static `products: Product[]` array with detailed catalog entries.
  - Helper functions:
    - `getProductBySlug(slug)` – Used by product detail pages, quote form prefill, etc.
    - `getProductsByCategory(categorySlug)` – Drives category detail product grids and related-products sections.
    - `getAllProducts()` – Used for static generation and sitemap.
    - `getFeaturedProducts(count)` – Used by the home page to show a subset of highlighted products.

The **data layer is entirely static** (no remote API); pages derive their content, metadata, and JSON-LD solely from these arrays and their helpers.

### Shared UI & styling

- **Components (`src/components`)**
  - `Header.tsx` / `Footer.tsx` – Global layout chrome imported by `RootLayout`, handling site-wide navigation and footer content.
  - `Breadcrumbs.tsx` – Renders breadcrumb navigation based on `BreadcrumbItem[]` inputs; used across `categorii`, `produse`, `contact`, `despre-noi`, etc.
  - `WhatsAppButton.tsx` – Floating action button component for initiating WhatsApp contact; rendered at the root layout level.

- **Styling (`src/app/globals.css`)**
  - Integrates Tailwind base styles and defines project-specific utility classes used heavily across pages (e.g. `btn-primary`, `btn-accent`, `btn-outline`, `section-title`, `section-subtitle`, `card`).
  - When editing or creating components, prefer composing these existing utilities rather than redefining styles inline.

### Forms & client components

- **Quote form:** `src/app/cerere-oferta/QuoteForm.tsx`
  - Marked as `'use client'` and uses React state hooks.
  - Reads the `produs` query parameter via `useSearchParams` and, if present, uses `getProductBySlug` to prefill `category` and `productName` in form state.
  - Form fields include contact info plus desired product/category, quantity, and a free-text message.
  - `handleSubmit` currently **simulates** submission with a `setTimeout`, toggling `isSubmitting` and `submitted` flags; there is **no backend/API integration yet**.
  - After successful submission, shows a confirmation panel; user can reset to send a new request.

- **Contact form:** `src/app/contact/ContactForm.tsx`
  - Also a `'use client'` component with simple local state.
  - Captures basic contact fields and a message, then simulates async submission in `handleSubmit` (no API call).
  - On success, shows a success message and option to send another message.

To wire these forms to a real backend, add API routes or external service calls and replace the simulated `setTimeout` with the actual async request logic, handling success and error states appropriately.
