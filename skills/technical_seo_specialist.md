# Technical SEO Specialist — Aló Asesorías Excel

This skill defines the knowledge, standards, and implementation rules for achieving search engine visibility for **aloasesoriasexcel** from code alone. It covers everything a Technical SEO Specialist would configure: meta tags, structured data, sitemaps, robots, performance signals, and SPA-specific indexation strategies.

---

## 1. Identity & Brand Anchor

- **Brand name:** `Aló Asesorías Excel`
- **Domain (production):** to be confirmed, but all canonical URLs and sitemap entries must reference the production domain exactly once, consistently.
- **Primary language:** `es` (Spanish, Chile — use `lang="es"` on `<html>` and `hreflang="es-CL"` where applicable)
- **Business type:** Local service — online Excel tutoring and advisory (B2C, individual professionals and students)
- **Target keywords (seed):** `asesorías excel`, `clases de excel`, `excel online chile`, `aprender excel`, `consultoría excel`

---

## 2. `index.html` — Meta Tags Standard

Every page must have a complete, correct `<head>`. For a React SPA with Vite, the base lives in `index.html`. Dynamic pages must update tags at runtime via a library (see Section 6).

### 2.1 Required Tags (every page)

```html
<!-- Identity -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<html lang="es">

<!-- SEO Core -->
<title>Aló Asesorías Excel | Clases y Consultoría Excel Online</title>
<meta name="description" content="Aprende Excel con expertos. Asesorías personalizadas, clases online y consultoría para profesionales y estudiantes en Chile." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://TU_DOMINIO_AQUI/" />

<!-- Open Graph (social sharing + Google preview enrichment) -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Aló Asesorías Excel" />
<meta property="og:title" content="Aló Asesorías Excel | Clases y Consultoría Excel Online" />
<meta property="og:description" content="Asesorías personalizadas de Excel para profesionales y estudiantes. Aprende de forma práctica con expertos en Chile." />
<meta property="og:url" content="https://TU_DOMINIO_AQUI/" />
<meta property="og:image" content="https://TU_DOMINIO_AQUI/og-image.jpg" />
<meta property="og:locale" content="es_CL" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Aló Asesorías Excel" />
<meta name="twitter:description" content="Clases y asesorías de Excel online para Chile." />
<meta name="twitter:image" content="https://TU_DOMINIO_AQUI/og-image.jpg" />
```

### 2.2 Title Formula

```
[Página] | Aló Asesorías Excel
```
- Home: `Aló Asesorías Excel | Clases y Consultoría Excel Online`
- Servicios: `Nuestros Servicios | Aló Asesorías Excel`
- Contacto: `Contáctanos | Aló Asesorías Excel`
- Max 60 characters for the title. Max 155 characters for description.

### 2.3 `og:image` Requirements

- Size: **1200×630 px** minimum
- Format: `.jpg` or `.png`
- Must contain the brand logo + tagline — Google and social platforms use this as the preview thumbnail
- Store in `/public/og-image.jpg`

---

## 3. Structured Data (JSON-LD)

JSON-LD is a `<script type="application/ld+json">` block injected in the `<head>` or `<body>`. It tells Google the exact type of business, its services, ratings, and contact info — enabling **rich results** in search.

### 3.1 LocalBusiness Schema (inject in `index.html`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aló Asesorías Excel",
  "description": "Asesorías y clases de Excel online para profesionales y estudiantes en Chile.",
  "url": "https://TU_DOMINIO_AQUI",
  "logo": "https://TU_DOMINIO_AQUI/logo.png",
  "image": "https://TU_DOMINIO_AQUI/og-image.jpg",
  "telephone": "+56XXXXXXXXX",
  "email": "contacto@aloasesoriasexcel.cl",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CL",
    "addressRegion": "Región Metropolitana"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Chile"
  },
  "serviceType": ["Clases de Excel", "Asesoría Excel", "Consultoría Excel Online"],
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.instagram.com/aloasesoriasexcel",
    "https://www.linkedin.com/company/aloasesoriasexcel"
  ]
}
</script>
```

### 3.2 Service Schema (for services/products pages, inject dynamically)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Asesoría de Excel Personalizada",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Aló Asesorías Excel"
  },
  "description": "Sesiones 1 a 1 de Excel adaptadas a tus necesidades reales.",
  "areaServed": "Chile",
  "serviceType": "Consultoría Excel"
}
```

### 3.3 FAQ Schema (for any FAQ section on the site)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo funcionan las asesorías de Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las asesorías son sesiones online personalizadas donde trabajamos directamente con tus archivos o necesidades reales."
      }
    }
  ]
}
```

---

## 4. `robots.txt`

Place in `/public/robots.txt`. This file is served at `https://TU_DOMINIO/robots.txt`.

```
User-agent: *
Allow: /

Sitemap: https://TU_DOMINIO_AQUI/sitemap.xml
```

Rules:
- Never `Disallow: /` on the whole site in production.
- `Disallow` only truly private paths that must not be indexed (e.g., `/admin`, `/dashboard`, `/checkout`).
- Always include the `Sitemap:` directive pointing to the sitemap URL.

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /checkout/

Sitemap: https://TU_DOMINIO_AQUI/sitemap.xml
```

---

## 5. `sitemap.xml`

Place in `/public/sitemap.xml`. For a small SPA, a static sitemap is sufficient. For dynamic content (products, courses), generate it at build time or via a Vercel Function.

### 5.1 Static Sitemap Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://TU_DOMINIO_AQUI/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://TU_DOMINIO_AQUI/servicios</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://TU_DOMINIO_AQUI/contacto</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

### 5.2 Priority Scale

| Page type         | Priority |
|-------------------|----------|
| Home              | 1.0      |
| Core service pages| 0.9      |
| About / Contact   | 0.7      |
| Blog / FAQs       | 0.6      |
| Legal (TyC)       | 0.3      |

---

## 6. SPA Indexation Strategy (React + Vite)

Google can index SPAs, but it takes longer and is less reliable than server-rendered pages. The following rules minimize indexation risk.

### 6.1 Use `react-helmet-async` for Dynamic Meta Tags

Install: `npm install react-helmet-async`

Wrap `App.jsx` with `HelmetProvider`:
```jsx
import { HelmetProvider } from 'react-helmet-async';

<HelmetProvider>
  <App />
</HelmetProvider>
```

Use `Helmet` inside each page component:
```jsx
import { Helmet } from 'react-helmet-async';

function ServiciosPage() {
  return (
    <>
      <Helmet>
        <title>Nuestros Servicios | Aló Asesorías Excel</title>
        <meta name="description" content="Conoce todas las asesorías y cursos de Excel que ofrecemos." />
        <link rel="canonical" href="https://TU_DOMINIO_AQUI/servicios" />
      </Helmet>
      {/* page content */}
    </>
  );
}
```

### 6.2 Pre-rendering (Recommended for Key Pages)

For the most critical SEO pages (Home, Servicios, Contacto), add **pre-rendering** so Googlebot receives real HTML instead of a blank JS shell.

Use `vite-plugin-prerender` or Vercel's Edge middleware to serve pre-rendered snapshots.

### 6.3 Performance Signals (Core Web Vitals)

Google uses Core Web Vitals as a ranking factor. For this Vite SPA:

- **LCP (Largest Contentful Paint):** Add `loading="eager"` and `fetchpriority="high"` to the hero image. Preload the hero image in `<head>`:
  ```html
  <link rel="preload" as="image" href="/hero.jpg" fetchpriority="high" />
  ```
- **CLS (Cumulative Layout Shift):** Always set explicit `width` and `height` on all `<img>` elements to prevent layout shifts.
- **FID/INP:** Keep JS bundle small via Vite's code splitting. Use `React.lazy()` + `Suspense` for heavy pages (Admin, Dashboard).
- **TTFB:** Served via Vercel CDN — this is already optimal.

---

## 7. Google Search Console Setup (Non-Code, Required)

After deploying, these steps must be completed to activate Google indexation:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property → Domain or URL prefix
3. Verify ownership via: HTML file in `/public/` (e.g., `google123abc.html`) or DNS TXT record
4. Submit `sitemap.xml` URL
5. Request indexation of the Home URL manually via "URL Inspection" tool

---

## 8. Checklist Before Launch

- [ ] `<title>` and `<meta name="description">` set in `index.html`
- [ ] `lang="es"` on `<html>`
- [ ] Canonical URL set and matches production domain
- [ ] Open Graph tags complete with valid `og:image` (1200×630px)
- [ ] JSON-LD `LocalBusiness` schema injected in `index.html`
- [ ] `robots.txt` present in `/public/` and accessible at root
- [ ] `sitemap.xml` present in `/public/` and listed in `robots.txt`
- [ ] `react-helmet-async` installed and each page has unique `<title>` + `<meta description>`
- [ ] Hero image preloaded with `fetchpriority="high"`
- [ ] All `<img>` tags have `width` and `height` attributes
- [ ] Google Search Console property created and sitemap submitted
- [ ] Site tested with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Site tested with [PageSpeed Insights](https://pagespeed.web.dev/)
