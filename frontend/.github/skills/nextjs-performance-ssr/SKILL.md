---
name: nextjs-performance-ssr
description: 'Next.js v16.x performance optimization and SSR rendering. Use for: improving Core Web Vitals (LCP, FID, CLS), optimizing Server-Side Rendering, implementing caching strategies, reducing bundle size, improving Time to Interactive (TTI), debugging performance issues.'
argument-hint: 'Specific page, component, or performance metric to optimize'
user-invocable: true
---

# Next.js v16.x Performance & SSR Rendering

## When to Use

This skill applies when:

- Optimizing Core Web Vitals (LCP, FID, CLS)
- Improving Server-Side Rendering performance
- Reducing initial load time or Time to Interactive
- Implementing caching strategies (data, edge, browser)
- Managing bundle size and code splitting
- Debugging performance bottlenecks
- Configuring ISR (Incremental Static Regeneration)
- Optimizing dynamic routes and API responses

## Key Next.js 16.x Features

### Rendering Strategies

| Strategy              | Use Case                                                          | Cache Control                           |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------- |
| **Server Components** | Default in `/app`. Heavy computation, DB queries, sensitive logic | Cacheable by default                    |
| **Client Components** | Interactive features, hooks, event handlers                       | `'use client'` required                 |
| **Static (SSG)**      | Stable content, build-time generation                             | `revalidate: false`                     |
| **ISR**               | Semi-static with revalidation period                              | `revalidate: N` (seconds)               |
| **Dynamic (SSR)**     | Per-request rendering, personalized content                       | `revalidate: 0` or route segment config |

### App Router (`/app`) vs Pages Router (`/pages`)

- **App Router** (v13.4+): Server Components by default, better streaming, Suspense
- **Pages Router**: All client-side by default, needs `getServerSideProps`/`getStaticProps`

## Performance Optimization Checklist

### 1. Image Optimization

```typescript
// Always use next/image for automatic optimization
import Image from 'next/image'

// ✅ Good: Responsive with sizes
<Image
  src={imageUrl}
  alt="description"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveFold}
  loading={isAboveFold ? 'eager' : 'lazy'}
/>

// ❌ Avoid: Missing sizes, no priority
<img src={imageUrl} alt="description" />
```

### 2. Font Optimization

```typescript
// app/layout.tsx
import { Source_Sans_3 } from 'next/font/google'

const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  preload: true,
})

// Use CSS variable
export default function RootLayout({ children }) {
  return (
    <html className={sans.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### 3. Script Optimization

```typescript
import Script from 'next/script'

// ✅ Analytics: defer loading
<Script
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive"
  onLoad={() => console.log('Analytics loaded')}
/>

// ❌ Avoid: Blocking external scripts
<script src="https://external.com/blocker.js"></script>
```

### 4. Data Fetching & Caching

**Server Components (Cache by Default)**

```typescript
// app/courses/page.tsx
async function Courses() {
  // Cached for 1 hour
  const courses = await fetch('https://api.example.com/courses', {
    next: { revalidate: 3600 }
  })
  return <CoursesGrid data={courses} />
}
```

**ISR (Incremental Static Regeneration)**

```typescript
// app/courses/[slug]/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

export async function generateStaticParams() {
  const courses = await fetch('https://api.example.com/courses')
  return courses.map(c => ({ slug: c.slug }))
}

export default async function CoursePage({ params }) {
  const course = await fetch(
    `https://api.example.com/courses/${params.slug}`,
    { next: { revalidate: 60 } }
  )
  return <CourseDetail course={course} />
}
```

**Dynamic Routes (SSR)**

```typescript
// Force dynamic rendering when needed
export const dynamic = 'force-dynamic'
// Or: 'auto' (default), 'force-static', 'error'

export default async function Page() {
  const data = await fetch('...', { cache: 'no-store' })
  return <div>{data}</div>
}
```

### 5. Code Splitting & Lazy Loading

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const QuizComponent = dynamic(
  () => import('@/components/quiz'),
  { loading: () => <LoadingSpinner /> }
)

// Route-based splitting (automatic with App Router)
// Each route chunk loaded on demand
```

### 6. Bundle Size Analysis

```bash
# Analyze bundle size
npm run build

# Use next/bundle-analyzer (install: npm i @next/bundle-analyzer)
# In next.config.ts:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Run: ANALYZE=true npm run build
```

### 7. Route Segment Config (Declare Intent Early)

```typescript
// app/courses/[slug]/page.tsx
export const dynamic = 'force-dynamic'; // SSR
export const dynamicParams = true; // Allow unknown with generateStaticParams
export const revalidate = 3600; // ISR: revalidate every hour
export const fetchCache = 'force-cache'; // Force cache all fetches
```

## Common Performance Issues & Fixes

### Issue: Slow LCP (Largest Contentful Paint)

**Symptoms**: Page appears blank for 2+ seconds

**Fixes**:

1. Preload critical images: `<Image priority={true} />`
2. Inline critical CSS or use `loading: "eager"`
3. Use Server Components for above-fold content
4. Consider edge caching for static assets
5. Reduce initial bundle size

### Issue: Slow TTFB (Time to First Byte)

**Symptoms**: API response slow, server processing slow

**Fixes**:

1. Use ISR instead of full SSR where possible
2. Implement Redis caching for DB queries
3. Use Edge Functions for API routes
4. Profile with `durationMs` logging
5. Check database query performance

### Issue: Layout Shift (CLS)

**Symptoms**: Content jumps during load

**Fixes**:

1. Reserve space for images: `width` and `height` attributes
2. Avoid inserting ads/modals mid-page
3. Use `Suspense` boundaries for dynamic content
4. Define fixed dimensions for lazy-loaded elements

### Issue: Slow Interactive (FID/INP)

**Symptoms**: Click response slow, long interaction latency

**Fixes**:

1. Move computation to Server Components
2. Use `useTransition()` for state updates
3. Split JavaScript with dynamic imports
4. Debounce/throttle event handlers
5. Profile with Chrome DevTools

## Testing & Monitoring

### Local Performance Testing

```bash
# Next.js built-in metrics (requires instrumentation.ts)
npm run dev
# Check Next.js analytics dashboard at build time

# Manual lighthouse testing
npm run build && npm run start
# Then: Chrome DevTools → Lighthouse
```

### Production Monitoring

```typescript
// app/layout.tsx - Web Vitals
import { useReportWebVitals } from 'next/web-vitals';

export function useReportWebVitals() {
  return (metric) => {
    console.log(metric); // LCP, FID, CLS, TTFB, INP
    // Send to analytics service
  };
}
```

## Configuration Checklist

**next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
    formats: ['image/webp', 'image/avif'], // Modern formats
  },

  // Compression & minification (default: on)
  compress: true,

  // Headers for caching
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000' }],
    },
  ],

  // Redirects & rewrites
  redirects: async () => [],
  rewrites: async () => [],

  // TypeScript strict mode
  typescript: { strict: true },
};

export default nextConfig;
```

## Step-by-Step Optimization Workflow

1. **Measure**: Use Lighthouse, WebPageTest, or deployment platform analytics
2. **Identify Bottleneck**: Check LCP, TTFB, FID, CLS individually
3. **Profile**: Use Chrome DevTools, Next.js Analytics, or APM tools
4. **Optimize**: Apply fixes based on metric (see Common Issues table)
5. **Verify**: Re-measure with same conditions (same device, network)
6. **Deploy**: Monitor production metrics continuously

## Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing) — Official optimization guide
- [Web Vitals](https://web.dev/vitals/) — Google Web Vitals metrics
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) — Audit tool
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image) — Image component API
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) — Server/ISR/dynamic setup

## Related Skills

Consider pairing with:

- **Testing Skill**: Validate performance improvements with E2E tests
- **DevOps Skill**: Deploy and monitor metrics in production
