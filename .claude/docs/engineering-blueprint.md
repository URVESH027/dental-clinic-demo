# ENGINEERING BLUEPRINT — PRODUCTION SPECIFICATION

**Project:** Thousand Smile Dental Clinic
**Document Type:** Implementation Engineering Specification
**Version:** 1.0
**Status:** Production-Ready Engineering Guide

---

## TABLE OF CONTENTS

1. [Motion System](#1-motion-system)
2. [Interaction System](#2-interaction-system)
3. [Component Architecture](#3-component-architecture)
4. [Next.js Architecture](#4-nextjs-architecture)
5. [Framer Motion Strategy](#5-framer-motion-strategy)
6. [Performance Budget](#6-performance-budget)
7. [Accessibility](#7-accessibility)
8. [Responsive Implementation](#8-responsive-implementation)
9. [Design Tokens to Code](#9-design-tokens-to-code)
10. [Quality Assurance](#10-quality-assurance)

---

## 1. MOTION SYSTEM

### 1.1 Animation Principles

1. **Silence Over Spectacle** — Animation should be felt, not seen. Every animation must justify its existence.
2. **Confident Pacing** — Slow, deliberate movements convey luxury. Fast animations feel cheap.
3. **One Thread** — Gold accent is the only element that draws attention through motion.
4. **Breathing Room** — Staggered reveals create rhythm. Never animate everything at once.
5. **Graceful Degradation** — Every animation must have a reduced-motion fallback that preserves the experience.

### 1.2 Animation Hierarchy

| Tier | Usage | Duration | Easing |
|------|-------|----------|--------|
| **Tier 1 — Cinematic** | Hero entrance, page load | 1.5–2.0s | `EASE_SMOOTH` |
| **Tier 1 — Section** | Section reveals, major content | 1.0–1.2s | `EASE_SMOOTH` |
| **Tier 2 — Element** | Card reveals, typography | 0.7–1.0s | `EASE_SMOOTH` |
| **Tier 3 — Interaction** | Hover, focus, tap | 0.3–0.5s | `EASE_SMOOTH` |
| **Tier 4 — Feedback** | Loading, validation, transitions | 0.3–0.5s | `EASE_OUT` |

### 1.3 Easing Curves

All easing curves are defined in `src/lib/animations.ts`:

| Token | Value | Usage |
|-------|-------|-------|
| `EASE_SMOOTH` | `[0.25, 0.1, 0.25, 1]` | Primary curve for all content animations |
| `EASE_SPRING` | `[0.34, 1.2, 0.64, 1]` | Scale-in effects, modal entrances |
| `EASE_OUT` | `[0, 0, 0.2, 1]` | Fast exits, dismissals |
| `EASE_IN_OUT` | `[0.4, 0, 0.2, 1]` | Morphing, layout transitions |

### 1.4 Duration Scale

All durations are defined in `src/lib/animations.ts` as `DUR`:

| Token | Seconds | Usage |
|-------|---------|-------|
| `DUR.instant` | 0.3s | Micro-interactions, opacity changes |
| `DUR.fast` | 0.5s | Hover states, focus transitions |
| `DUR.default` | 0.7s | Standard element animations |
| `DUR.moderate` | 1.0s | Section reveals, complex animations |
| `DUR.slow` | 1.2s | Hero entrance, major reveals |
| `DUR.slower` | 1.5s | Cinematic transitions |
| `DUR.cinematic` | 2.0s | Page load, hero headline |

### 1.5 Stagger Configuration

| Context | Delay Increment | Max Delay |
|---------|-----------------|-----------|
| Navigation links | 50ms | 250ms |
| Card grid items | 80ms | 400ms |
| Timeline steps | 100ms | 600ms |
| Form fields | 60ms | 300ms |
| Trust indicators | 100ms | 300ms |
| Footer links | 40ms | 200ms |

### 1.6 Scroll Choreography

**Viewport Detection:**
- Use `whileInView` with `viewport={{ once: true, margin: "-120px" }}`
- Elements animate once when 120px into viewport
- Never re-trigger on scroll back up

**Reveal Pattern:**
```
1. Background fades in (opacity 0→1, 0.5s)
2. Content slides up (translateY 16→0, 1.0s, delayed 0.1s)
3. Children stagger (0.15s increment)
```

**Parallax:**
- Hero image: `useScroll` + `useTransform`, range ±20px
- Philosophy image: Static (no parallax)
- Testimonial portraits: Static (no parallax)
- Parallax speed: 0.5× scroll speed

### 1.7 Hero Entrance Sequence

| Step | Element | Animation | Duration | Delay |
|------|---------|-----------|----------|-------|
| 1 | Background | Fade in | 0.8s | 0ms |
| 2 | Headline | Fade up + blur remove | 1.5s | 200ms |
| 3 | CTA buttons | Fade up | 1.0s | 600ms |
| 4 | Trust indicators | Fade up | 0.8s | 800ms |
| 5 | Hero image | Scale in + fade | 1.2s | 400ms |
| 6 | Scroll indicator | Fade in | 0.6s | 1200ms |

**Total hero entrance:** ~2.0s (all elements visible)

### 1.8 Section Reveal Sequence

Every section follows this pattern:

| Step | Element | Animation | Duration | Delay |
|------|---------|-----------|----------|-------|
| 1 | Eyebrow | Fade up | 0.6s | 0ms |
| 2 | Headline | Fade up + blur | 0.9s | 150ms |
| 3 | Description | Fade up | 0.7s | 300ms |
| 4 | Content | Fade up | 0.8s | 400ms |
| 5 | Children | Stagger fade up | 0.6s each | 150ms increment |

### 1.9 Image Reveal

- **Desktop images:** Fade in + subtle scale (0.95→1.0), 1.0s
- **Mobile images:** Fade in only, 0.8s
- **Parallax images:** Transform based on scroll position, continuous
- **Before/after slider:** No entrance animation, interactive only

### 1.10 Typography Reveal

- **Headlines:** Fade up + blur remove (`blur(8px)→blur(0px)`), 0.9–1.5s
- **Body text:** Fade up only, 0.7s
- **Captions:** Fade in only, 0.5s
- **Eyebrows:** Fade up, 0.6s

### 1.11 Hover Animations

| Element | Transform | Duration | Easing |
|---------|-----------|----------|--------|
| Primary button | `translateY(-2px)` | 0.5s | `EASE_SMOOTH` |
| Card | `translateY(-4px)` | 0.5s | `EASE_SMOOTH` |
| Link | Color change | 0.3s | `EASE_SMOOTH` |
| Image | `scale(1.02)` | 0.7s | `EASE_SMOOTH` |
| Icon | `scale(1.05)` | 0.3s | `EASE_SPRING` |
| Timeline node | Border color | 0.3s | `EASE_SMOOTH` |

### 1.12 CTA Animations

- **Primary CTA:** `translateY(-2px)` + shadow elevation increase
- **Ghost CTA:** Color transition only
- **Arrow icon:** `translateX(4px)` on parent hover
- **CTA pulse:** Not used (too aggressive for luxury)

### 1.13 Form Interactions

- **Focus ring:** `outline: 2px solid gold`, offset `3px`, 100ms
- **Field border:** `stone→gold` transition, 300ms
- **Error shake:** Not used (too aggressive). Use border color change only.
- **Success state:** Border `stone→success`, 300ms
- **Submit button:** Loading spinner replaces text, 300ms transition

### 1.14 Loading States

- **Skeleton shimmer:** Gradient animation `stone→ivory→stone`, 3s infinite
- **Page transition:** Not used (SPA feel). Content loads in place.
- **Image loading:** Blur-up placeholder, 0.5s transition

### 1.15 Reduced Motion Strategy

**Hook:** `usePrefersReducedMotion()` returns `boolean | null`

**Implementation pattern:**
```typescript
const prefersReducedMotion = usePrefersReducedMotion();
const reduced = !!prefersReducedMotion;
```

**When reduced is true:**
- All entrance animations: instant (0.01ms)
- All hover transforms: disabled
- All parallax: disabled
- All blur effects: disabled
- All stagger: disabled
- Content remains fully visible (no hidden states)
- Scroll behavior: `auto` (no smooth scroll)

**CSS fallback:** `@media (prefers-reduced-motion: reduce)` in globals.css forces `animation-duration: 0.01ms`.

---

## 2. INTERACTION SYSTEM

### 2.1 Buttons

**Primary Button:**
- Hover: `translateY(-2px)`, shadow elevation increase
- Active/Press: `scale(0.99)`, shadow decrease
- Focus: `outline: 2px solid gold`, offset `3px`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none`
- Keyboard: Enter/Space triggers click

**Ghost Button:**
- Hover: Color transition `warmgray→gold`
- Active: No transform
- Focus: Same as primary
- Disabled: Same as primary

**Icon Button:**
- Hover: `scale(1.05)`, background opacity change
- Active: `scale(0.95)`
- Focus: Same as primary

### 2.2 Cards

**Service/Doctor/Testimonial Cards:**
- Hover: `translateY(-4px)`, border `stone→gold-light/60`, shadow elevation increase
- Active: No transform (cards are not clickable unless wrapped in `<a>`)
- Focus: Gold outline on interactive children only
- Keyboard: Tab through card children

**Card children hierarchy:**
1. Card container (no focus)
2. Title (no focus unless link)
3. CTA link (focusable)
4. Image (no focus)

### 2.3 Navigation

**Desktop Nav:**
- Scroll: Height `80px→64px`, bg opacity `0.80→0.95`, shadow appears
- Link hover: Color `warmgray→gold`, underline appears from left
- Link active: Color `gold`, underline visible
- CTA hover: `translateY(-2px)`, shadow increase

**Mobile Nav:**
- Hamburger tap: Full-screen overlay slides in from right
- Overlay: `nearblack` bg, links stacked vertically
- Link tap: Color change, close menu
- Close: X button or tap outside
- Escape key: Closes menu
- Focus trap: When open, focus stays within menu

### 2.4 Forms

**Input Fields:**
- Focus: Border `stone→gold`, shadow `rgba(184, 168, 138, 0.15)`
- Blur: Border returns to `stone`
- Error: Border `stone→error`, shadow `rgba(155, 107, 107, 0.15)`
- Success: Border `stone→success`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`

**Select Fields:**
- Same as input
- Custom dropdown arrow (SVG data URI)
- Keyboard: Arrow keys navigate options, Enter selects, Escape closes

**Checkbox/Radio:**
- Custom styled (not native)
- Checked: Gold fill
- Focus: Gold outline
- Keyboard: Space toggles checkbox, Arrow keys navigate radio group

### 2.5 Links

**Inline Links:**
- Hover: Color `charcoal→gold-deep`
- Underline: `1px solid` with `text-underline-offset: 4px`
- Focus: Gold outline

**Navigation Links:**
- Hover: Color `warmgray→gold`
- Underline: Appear from left (width transition)
- Focus: Gold outline

**CTA Links (styled as buttons):**
- Same as button behavior

### 2.6 Images

**Parallax Images (Hero):**
- Transform: `translateY` based on scroll position
- Range: ±20px
- Speed: 0.5× scroll speed
- No interaction

**Before/After Slider:**
- Pointer down: Start drag
- Pointer move: Update slider position
- Pointer up: Stop drag
- Keyboard: Arrow keys move slider, Home/End jump to extremes
- Touch: Same as pointer events
- Focus: Gold outline on container
- Auto-hint: First view animates slider 35%→65%→50%

**Image Hover:**
- `scale(1.02)` on hover (non-interactive images only)
- Duration: 700ms
- Easing: `EASE_SMOOTH`

### 2.7 Timelines

**Desktop Horizontal Timeline:**
- Step nodes: Hover border `stone→gold`
- Step nodes: Click/Enter triggers content reveal
- Progress line: Animates left→right on scroll

**Mobile Vertical Timeline:**
- Same behavior as desktop
- Progress line: Animates top→bottom on scroll

### 2.8 Testimonials

**Testimonial Cards:**
- Hover: `translateY(-4px)`, shadow increase
- Star rating: Static (no animation)
- Quote: Static (no animation)
- Author info: Static

**Portrait Grid:**
- Hover: `scale(1.02)` with overflow hidden
- No click interaction (decorative)

### 2.9 Accordions (FAQ)

**Accordion Item:**
- Trigger: Click or Enter/Space
- Content: Height animation `0→auto`, 500ms
- Chevron: Rotate 180° on open, 500ms
- Only one item open at a time
- Focus: Gold outline on trigger
- Keyboard: Arrow keys navigate triggers, Enter/Space toggles

### 2.10 Keyboard Behavior

**Global:**
- Tab: Navigate through interactive elements
- Shift+Tab: Navigate backwards
- Enter/Space: Activate buttons and links
- Escape: Close modals, menus, dropdowns
- Arrow keys: Navigate within groups (radio, tabs, timeline)

**Focus Order:**
1. Skip link (hidden until focused)
2. Navigation links (left to right)
3. CTA button
4. Hero content (top to bottom)
5. Section content (top to bottom, left to right)
6. Footer links

**Focus Trap:**
- Mobile menu: Focus trapped within menu when open
- Modal: Focus trapped within modal when open
- Escape exits trap

### 2.11 Touch Behavior

**Touch Targets:**
- Minimum: 44px × 44px (WCAG 2.2)
- Navigation links: Height 44px (padded)
- Form fields: Height 44px minimum
- Buttons: Height 44px minimum
- Floating buttons: 56px diameter

**Touch Interactions:**
- Tap: Same as click
- Long press: No special behavior
- Swipe: Before/after slider only
- Pinch: No zoom allowed

---

## 3. COMPONENT ARCHITECTURE

### 3.1 Folder Structure

```
src/
├── app/                          # App Router pages
│   ├── layout.tsx               # Root layout (fonts, providers, nav, footer)
│   ├── page.tsx                 # Homepage (metadata + HomeClient)
│   ├── HomeClient.tsx           # Homepage client orchestrator
│   ├── globals.css              # Design tokens, base styles
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── api/                     # API routes
│   │   ├── appointment/route.ts
│   │   └── contact/route.ts
│   ├── accessibility/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── ui/                      # Reusable primitives (shadcn-based)
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── container.tsx
│   │   ├── eyebrow.tsx
│   │   ├── glass-panel.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── premium-button.tsx
│   │   ├── premium-card.tsx
│   │   ├── radio-group.tsx
│   │   ├── scroll-area.tsx
│   │   ├── section.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   ├── common/                  # Shared composed components
│   │   ├── AnimatedCounter.tsx
│   │   ├── DoctorCard.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── StickyCTA.tsx
│   │   ├── SuccessModal.tsx
│   │   └── TrustBar.tsx
│   ├── sections/                # Page section components
│   │   ├── Hero.tsx
│   │   ├── Philosophy.tsx
│   │   ├── Technology.tsx
│   │   ├── Doctors.tsx
│   │   ├── JourneyTimeline.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Services.tsx
│   │   ├── FAQ.tsx
│   │   ├── Certifications.tsx
│   │   ├── BeforeAfter.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── AppointmentForm.tsx
│   │   └── Skeletons.tsx
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingButtons.tsx
│   │   └── ScrollProgress.tsx
│   └── providers/               # Context providers
│       └── ThemeProvider.tsx
├── data/                        # Static data
│   ├── doctors.ts
│   ├── faq.ts
│   ├── navigation.ts
│   ├── services.ts
│   ├── stats.ts
│   ├── technology.ts
│   └── testimonials.ts
├── hooks/                       # Custom hooks
│   └── usePrefersReducedMotion.ts
├── lib/                         # Utilities
│   ├── animations.ts            # Motion system
│   ├── config.ts                # Site configuration
│   └── utils.ts                 # cn() utility
└── types/                       # TypeScript interfaces
    └── index.ts
```

### 3.2 Component Hierarchy

```
RootLayout
├── ThemeProvider
│   ├── ScrollProgress
│   ├── Navbar
│   ├── main
│   │   ├── Hero
│   │   ├── Philosophy
│   │   ├── Technology
│   │   ├── Doctors
│   │   ├── JourneyTimeline
│   │   ├── Testimonials
│   │   ├── Contact
│   │   ├── FinalCTA
│   │   ├── Services
│   │   ├── FAQ
│   │   ├── Certifications
│   │   ├── BeforeAfter
│   │   ├── WhyChooseUs
│   │   └── AppointmentForm
│   ├── Footer
│   ├── FloatingButtons
│   └── StickyCTA
```

### 3.3 Server vs Client Components

**Server Components (default):**
- `layout.tsx` — Root layout
- `page.tsx` — Homepage (metadata)
- `globals.css` — Styles
- `data/*.ts` — Static data
- `lib/config.ts` — Configuration
- `components/ui/container.tsx` — Layout primitive
- `components/ui/separator.tsx` — Visual separator
- `components/ui/section.tsx` — Section wrapper

**Client Components (`"use client"`):**
- `HomeClient.tsx` — Orchestrator (uses `dynamic()`)
- All section components (use Framer Motion, hooks)
- All layout components (use scroll, state)
- All interactive components (forms, modals, accordions)
- `components/ui/button.tsx` — Interactive
- `components/ui/input.tsx` — Interactive
- `components/ui/accordion.tsx` — Interactive

### 3.4 Lazy Loading Strategy

**`HomeClient.tsx` uses `dynamic()` for all sections:**

```typescript
const Hero = dynamic(() => import("@/components/sections/Hero"));
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"));
const Technology = dynamic(() => import("@/components/sections/Technology"));
// ... etc
```

**Why:** Each section is a large component. Dynamic import allows:
- Parallel loading
- Independent chunks
- Better caching
- Reduced initial bundle

**Suspense boundaries:** Each dynamic import wrapped in `<Suspense fallback={<SectionSkeleton />}>`.

### 3.5 State Boundaries

**Local State (within components):**
- Form inputs (controlled components)
- Accordion open/close state
- Mobile menu open/close
- Before/after slider position
- Scroll position (for parallax)
- Theme preference

**Shared State (via context):**
- Theme (via `next-themes`)
- No other shared state needed

**No global state management required.** Each section is self-contained.

### 3.6 Props Philosophy

- Use TypeScript interfaces for all props
- Destructure props in function signature
- Use `className` for style overrides (via `cn()` utility)
- Use `children` for composition
- Avoid prop drilling (use composition instead)
- Boolean props preferred over enums
- Callback props named `on*` (e.g., `onClose`, `onSubmit`)

### 3.7 Composition Philosophy

- **Sections are self-contained** — Each section manages its own animations, layout, and data
- **Cards are composable** — `ServiceCard`, `DoctorCard` accept data props
- **Layout components are wrappers** — `container`, `section` provide spacing
- **UI primitives are atomic** — `button`, `input`, `badge` are building blocks

---

## 4. NEXT.JS ARCHITECTURE

### 4.1 App Router Structure

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage (prerendered) |
| `/accessibility` | Static | Accessibility statement |
| `/privacy` | Static | Privacy policy |
| `/terms` | Static | Terms of service |
| `/sitemap.xml` | Dynamic | Generated sitemap |
| `/api/appointment` | Dynamic | Appointment form handler |
| `/api/contact` | Dynamic | Contact form handler |

### 4.2 Root Layout (`layout.tsx`)

**Responsibilities:**
1. Load fonts (Inter, Playfair Display, JetBrains Mono)
2. Set viewport metadata (theme colors)
3. Wrap in `ThemeProvider`
4. Render `ScrollProgress`
5. Render `Navbar`
6. Render `<main>` with children
7. Render `Footer`
8. Render `FloatingButtons`
9. Render `StickyCTA`

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: {
    default: "Thousand Smile Dental Clinic",
    template: "%s | Thousand Smile Dental",
  },
  description: "...",
  openGraph: { ... },
  twitter: { ... },
  robots: { ... },
};
```

### 4.3 Image Optimization

**Configuration (next.config.ts):**
- Formats: AVIF, WebP
- Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384
- Cache TTL: 30 days

**Usage:**
- Hero image: `priority={false}` (below fold on mobile), `sizes="(max-width: 1024px) 100vw, 55vw"`
- Above-fold images: `priority={true}`, `sizes` matching layout
- Below-fold images: Default loading (lazy)
- Placeholder: `blur` with `placeholder="blur"` for critical images

**Image directory:** `public/images/`

### 4.4 Font Strategy

**Fonts:**
- Inter: Body text, UI elements
- Playfair Display: Headlines, editorial text
- JetBrains Mono: Code (if needed)

**Loading:**
- Use `next/font/google` for optimal loading
- `display: swap` for all fonts
- Preconnect to Google Fonts
- Font size adjustment via CSS variables

### 4.5 Streaming & Suspense

**Streaming boundaries:**
- Each section wrapped in `<Suspense>` with skeleton fallback
- Skeletons match section dimensions
- Streaming allows progressive rendering

**Error boundaries:**
- `error.tsx` catches runtime errors
- `not-found.tsx` handles 404s
- Each section can have local error boundaries if needed

### 4.6 Caching Strategy

**Static pages:** Prerendered at build time
**API routes:** No caching (form submissions)
**Images:** 30-day cache TTL
**Fonts:** Cached by browser
**CSS/JS:** Next.js automatic content hashing

### 4.7 Server Actions

**Form submissions use API routes (not Server Actions):**
- `POST /api/appointment` — Appointment form
- `POST /api/contact` — Contact form

**Why API routes:**
- Better error handling
- Consistent with existing codebase
- More control over response format

### 4.8 SEO Strategy

**Metadata per page:**
- Title (with template)
- Description
- Open Graph (title, description, image, type)
- Twitter card
- Canonical URL
- Robots directive

**Structured data:**
- LocalBusiness schema on homepage
- Service schema for each service
- FAQ schema for FAQ section

**Technical SEO:**
- Sitemap generation (`sitemap.ts`)
- Robots.txt
- Semantic HTML (heading hierarchy, landmarks)
- Image alt text
- Internal linking

---

## 5. FRAMER MOTION STRATEGY

### 5.1 Where Animation IS Required

| Component | Animation Type | Implementation |
|-----------|---------------|----------------|
| Hero entrance | Staggered fade-in | `motion.div` with variants |
| Section reveals | Fade-up on scroll | `whileInView` |
| Typography reveals | Blur + fade | `motion.h2` with filter |
| Image parallax | Scroll transform | `useScroll` + `useTransform` |
| Card hovers | Transform + shadow | `whileHover` + `whileTap` |
| Before/after slider | Draggable position | `useMotionValue` + `animate` |
| Accordion expand | Height animation | `AnimatePresence` |
| Modal entrance | Scale + fade | `AnimatePresence` |
| Mobile menu | Slide from right | `AnimatePresence` |
| Scroll progress | Width animation | `useScroll` + `useTransform` |
| Timeline progress | Width/height fill | `useScroll` + `useTransform` |

### 5.2 Where Animation Should NOT Be Used

- **Navigation links** — CSS transitions only (color change)
- **Form field focus** — CSS transitions only (border, shadow)
- **Button hover** — CSS transitions only (transform, shadow)
- **Page transitions** — Not used (SPA feel)
- **Loading spinners** — CSS animations only
- **Skeleton shimmer** — CSS animations only
- **Scrollbar** — Native only
- **Selection highlight** — Native only

### 5.3 Shared Variants

All variants defined in `src/lib/animations.ts`:

```typescript
// Fade variants
fadeVariants: { hidden: { opacity: 0 }, visible: { opacity: 1 } }

// Fade up variants
fadeUpVariants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

// Fade blur variants
fadeBlurVariants: { hidden: { opacity: 0, filter: "blur(8px)", y: 12 }, visible: { opacity: 1, filter: "blur(0px)", y: 0 } }

// Scale variants
scaleVariants: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }
```

### 5.4 Motion Primitives

**Reusable motion components:**

| Component | Purpose | Props |
|-----------|---------|-------|
| `FadeIn` | Simple fade entrance | `delay`, `duration`, `children` |
| `FadeUp` | Fade + slide up | `delay`, `y`, `children` |
| `FadeBlur` | Fade + blur entrance | `delay`, `children` |
| `ScaleIn` | Scale entrance | `delay`, `children` |
| `StaggerContainer` | Stagger parent | `delay`, `children` |
| `ParallaxImage` | Scroll parallax | `range`, `speed`, `children` |

### 5.5 Scroll Triggers

**Viewport config:**
```typescript
viewportOnce = { once: true, margin: "-120px" }
viewportOnceTight = { once: true, margin: "-60px" }
```

**Usage:**
- Hero content: `viewportOnceTight` (animate quickly)
- Section headers: `viewportOnce` (standard reveal)
- Section content: `viewportOnce` with stagger
- Below-fold content: `viewportOnce` (standard)

### 5.6 Parallax Implementation

**Hero image parallax:**
```typescript
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],
});
const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);
```

**Rules:**
- Only hero image has parallax
- Range: ±20px
- Speed: 0.5× scroll speed
- Disabled when `reduced === true`

### 5.7 Performance Considerations

- **GPU-composited only:** Animate `transform` and `opacity` only
- **No layout thrashing:** Never animate `width`, `height`, `padding`, `margin`
- **No box-shadow animation:** Use `filter: drop-shadow()` or static shadows
- **No backdrop-filter animation:** Use static values
- **Will-change:** Apply only to elements being animated, remove after
- **Contain:** Use `contain: layout style paint` for isolated components
- **Batch updates:** Use `useMotionValue` for high-frequency updates (slider)

---

## 6. PERFORMANCE BUDGET

### 6.1 Core Web Vitals

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **INP** | < 200ms | Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **FCP** | < 1.8s | First Contentful Paint |
| **TTFB** | < 800ms | Time to First Byte |

### 6.2 Bundle Size

| Category | Budget | Current Estimate |
|----------|--------|------------------|
| **Total JS** | < 250KB gzipped | ~200KB |
| **Framework** | ~90KB | Next.js + React |
| **Framer Motion** | ~40KB | Tree-shaken |
| **Lucide React** | ~15KB | Tree-shaken |
| **Application** | ~55KB | All components |
| **CSS** | < 30KB gzipped | Tailwind (purged) |

### 6.3 Image Budget

| Image | Format | Max Size | Dimensions |
|-------|--------|----------|------------|
| Hero | AVIF/WebP | 150KB | 1920×1280 |
| Philosophy | AVIF/WebP | 120KB | 800×1000 |
| Doctor portrait | AVIF/WebP | 100KB | 600×800 |
| Before/after | AVIF/WebP | 100KB each | 1200×800 |
| Technology | AVIF/WebP | 80KB each | 800×600 |
| Testimonial | AVIF/WebP | 60KB each | 400×300 |

### 6.4 Font Budget

| Font | Weight | Size | Loading |
|------|--------|------|---------|
| Inter | 400, 500, 600, 700 | ~80KB | `next/font` swap |
| Playfair Display | 300, 400, 400 italic | ~60KB | `next/font` swap |

### 6.5 Animation Budget

- **Maximum concurrent animations:** 5
- **Maximum total animated elements per section:** 10
- **Parallax elements:** 1 (hero image only)
- **Stagger maximum:** 8 children
- **No animation on:** Below-the-fold content until in viewport

### 6.6 JavaScript Budget

| Category | Budget |
|----------|--------|
| React + Next.js | ~90KB |
| Framer Motion | ~40KB |
| Lucide React | ~15KB |
| Form handling | ~10KB |
| Theme provider | ~5KB |
| Application code | ~40KB |
| **Total** | **~200KB** |

---

## 7. ACCESSIBILITY

### 7.1 Keyboard Navigation

**Tab Order:**
1. Skip link (visible on focus)
2. Navigation links (left to right)
3. CTA button
4. Hero content (top to bottom)
5. Section content (top to bottom, left to right)
6. Footer links

**Key Bindings:**
| Key | Action |
|-----|--------|
| Tab | Next interactive element |
| Shift+Tab | Previous interactive element |
| Enter | Activate link/button |
| Space | Activate button/checkbox |
| Escape | Close menu/modal/accordion |
| Arrow Down | Next accordion item/tab |
| Arrow Up | Previous accordion item/tab |
| Arrow Left | Previous timeline step |
| Arrow Right | Next timeline step |
| Home | First item in group |
| End | Last item in group |

### 7.2 Focus Management

**Focus Styles:**
- All interactive elements: `outline: 2px solid var(--color-gold)`, `outline-offset: 3px`
- High contrast mode: `2px solid Highlight`
- No `outline: none` without replacement

**Focus Traps:**
- Mobile menu: When open, Tab cycles through menu items only
- Modal: When open, Tab cycles through modal content only
- Escape exits both traps

**Focus Restoration:**
- Mobile menu close: Focus returns to hamburger button
- Modal close: Focus returns to trigger button
- Accordion close: Focus stays on trigger

### 7.3 ARIA Usage

**Landmarks:**
- `<header>` — Navigation
- `<main>` — Main content
- `<footer>` — Footer
- `<nav>` — Navigation links
- `<aside>` — Related content (if any)

**ARIA Labels:**
| Element | ARIA Label |
|---------|------------|
| Skip link | "Skip to main content" |
| Hamburger | "Open navigation menu" / "Close navigation menu" |
| Before/after slider | "Digital Smile Preview — compare current smile with designed result" |
| Phone FAB | "Call us" |
| WhatsApp FAB | "Contact via WhatsApp" |
| Social links | "[Platform] page" |

**ARIA Roles:**
| Element | Role |
|---------|------|
| Accordion trigger | `role="button"`, `aria-expanded` |
| Accordion panel | `role="region"` |
| Before/after slider | `role="slider"` |
| Timeline | `role="list"`, steps `role="listitem"` |
| Step indicator | `role="progressbar"` or `aria-current` |

**ARIA States:**
| Element | State |
|---------|-------|
| Accordion | `aria-expanded="true/false"` |
| Mobile menu | `aria-expanded="true/false"` |
| Before/after slider | `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` |
| Form errors | `aria-invalid="true"`, `aria-describedby="[error-id]"` |
| Loading | `aria-busy="true"` |

### 7.4 Semantic HTML

**Heading Hierarchy:**
- `h1` — Hero headline (only one per page)
- `h2` — Section headlines
- `h3` — Sub-section headlines
- `h4` — Card titles
- `h5` — Minor headings
- `h6` — Labels (styled uppercase)

**HTML Elements:**
- `<header>` — Site header
- `<main>` — Main content
- `<footer>` — Site footer
- `<nav>` — Navigation
- `<section>` — Content sections with `aria-labelledby`
- `<article>` — Independent content (cards)
- `<aside>` — Supplementary content
- `<figure>` + `<figcaption>` — Images with captions
- `<blockquote>` — Testimonial quotes
- `<time>` — Date/time values
- `<address>` — Contact information

### 7.5 Color Contrast

| Element | Foreground | Background | Ratio | WCAG |
|---------|------------|------------|-------|------|
| Body text | `#2C2926` | `#FAFAF8` | 10.5:1 | AAA |
| Headlines | `#1A1816` | `#FAFAF8` | 14.8:1 | AAA |
| Gold accent | `#B8A88A` | `#FAFAF8` | 2.6:1 | AA (large text) |
| Muted text | `#9B9590` | `#FAFAF8` | 3.4:1 | AA (large text) |
| White on gold | `#FAFAF8` | `#B8A88A` | 2.6:1 | AA (large text) |
| White on nearblack | `#FAFAF8` | `#1A1816` | 14.8:1 | AAA |

**Note:** Gold on white fails AA for normal text. Use only for large text (≥18px bold or ≥24px) or decorative elements.

### 7.6 Reduced Motion

**CSS fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**JavaScript fallback:**
- `usePrefersReducedMotion()` hook returns `boolean | null`
- All motion components check `reduced` prop
- When `true`: Skip all entrance animations, disable parallax, disable hover transforms
- Content remains fully visible (no hidden states)

### 7.7 Screen Reader Support

**Hidden content:**
- `.sr-only` class for screen-reader-only text
- `aria-hidden="true"` for decorative elements
- `alt` text for all meaningful images
- Empty `alt=""` for decorative images

**Live regions:**
- Form validation errors: `role="alert"` or `aria-live="polite"`
- Loading states: `aria-busy="true"`
- Dynamic content: `aria-live="polite"` for non-urgent updates

**Announcements:**
- Page title changes: Announced by screen readers
- Form submission success: `role="alert"` with success message
- Menu open/close: `aria-expanded` state change

### 7.8 Forms

**Label association:**
- Every input has associated `<label>` via `htmlFor`/`id`
- Required fields: `aria-required="true"`
- Optional fields: No indicator (all optional by default)

**Error handling:**
- Error message linked via `aria-describedby`
- Error icon with `aria-hidden="true"`
- Error text: `role="alert"` for immediate announcement
- Focus moves to first error on submit

**Fieldsets:**
- Related fields grouped in `<fieldset>` with `<legend>`
- Radio groups: `<fieldset>` with `<legend>`
- Checkbox groups: `<fieldset>` with `<legend>`

### 7.9 Touch Targets

**Minimum size:** 44px × 44px (WCAG 2.2)

| Element | Size | Padding |
|---------|------|---------|
| Navigation link | 44px height | `0 12px` |
| Button | 44px height | Default |
| Form input | 44px height | Default |
| FAB | 56px diameter | None |
| Checkbox | 44px × 44px | `10px` |
| Radio | 44px × 44px | `10px` |
| Accordion trigger | 44px height | Default |
| Hamburger | 44px × 44px | `10px` |

---

## 8. RESPONSIVE IMPLEMENTATION

### 8.1 Breakpoints

| Name | Min Width | Max Width | Tailwind |
|------|-----------|-----------|----------|
| Mobile | 0 | 767px | `sm:` (default) |
| Tablet | 768px | 1023px | `md:` |
| Desktop | 1024px | 1279px | `lg:` |
| Wide | 1280px | 1535px | `xl:` |
| Ultra-wide | 1536px | — | `2xl:` |

### 8.2 Mobile Strategy (0–767px)

**Philosophy:** Redesign, don't stack. Every section must feel intentional on mobile.

**Layout changes:**
- Two-column grids → Single column
- Headlines: Reduce size, maintain impact
- CTAs: Stack vertically, full-width
- Images: Full-width, maintain aspect ratio
- Navigation: Hamburger menu
- Padding: Reduce from `3rem` to `1.5rem`
- Section gaps: Reduce from `4rem` to `2rem`

**Typography scaling:**
| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero headline | 5.5rem | 3rem |
| Section headline | 4rem | 2.5rem |
| Body | 1rem | 0.9375rem |

**Specific sections:**
- **Hero:** Text above, image below. CTAs stacked.
- **Philosophy:** Image above text. Full-width.
- **Technology:** Slider full-width. Cards stacked.
- **Doctors:** Portrait full-width, story below.
- **Timeline:** Vertical, single column.
- **Testimonials:** Cards stacked.
- **Contact:** Form full-width.
- **Footer:** Single column, sections stacked.

### 8.3 Tablet Strategy (768px–1023px)

**Philosophy:** Tighter two-column layouts. Maintain asymmetric where possible.

**Layout changes:**
- Maintain two-column where possible
- Reduce gaps from `4rem` to `3rem`
- Adjust typography proportionally
- Touch targets: Minimum 44px

**Specific sections:**
- **Hero:** Two-column maintained, image 50% width
- **Philosophy:** Asymmetric maintained, gap reduced
- **Technology:** Two-column maintained
- **Doctors:** Two-column maintained
- **Timeline:** Horizontal maintained
- **Testimonials:** Grid maintained

### 8.4 Desktop Strategy (1024px–1279px)

**Standard layout.** All two-column grids active. Full typography scale. Full padding.

### 8.5 Wide Strategy (1280px–1535px)

**Container:** `80rem` (1280px) centered. No layout changes from desktop.

### 8.6 Ultra-wide Strategy (1536px+)

**Container:** `80rem` (1280px) centered. Content remains constrained. No full-width expansion.

### 8.7 Orientation Changes

- **Portrait → Landscape:** Reveal two-column layouts on tablet
- **Landscape → Portrait:** Stack to single column on tablet
- **Desktop:** No orientation change (always landscape)

### 8.8 Small Phones (<375px)

- Further reduce typography
- Increase padding to `1rem`
- Ensure minimum touch targets
- Test on iPhone SE, iPhone 13 mini

---

## 9. DESIGN TOKENS TO CODE

### 9.1 Color Tokens

Already defined in `globals.css` `@theme` block:

```css
/* Warm Whites & Neutrals */
--color-warmwhite: #FAFAF8;
--color-ivory: #F5F3EF;
--color-stone: #E8E4DE;
--color-warmgray: #9B9590;
--color-charcoal: #2C2926;
--color-nearblack: #1A1816;

/* Gold */
--color-gold: #B8A88A;
--color-gold-deep: #8B7355;
--color-gold-light: #D4C9B5;

/* Functional */
--color-success: #5A7A65;
--color-error: #9B6B6B;
--color-info: #7A8A95;
```

### 9.2 Spacing Tokens

```css
/* 8px grid scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### 9.3 Typography Tokens

```css
/* Fluid type scale */
--text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);
--text-sm: clamp(0.8125rem, 0.78rem + 0.16vw, 0.875rem);
--text-base: clamp(0.9375rem, 0.9rem + 0.19vw, 1rem);
--text-lg: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-xl: clamp(1.125rem, 1.05rem + 0.375vw, 1.375rem);
--text-2xl: clamp(1.375rem, 1.25rem + 0.625vw, 1.75rem);
--text-3xl: clamp(1.75rem, 1.55rem + 1vw, 2.25rem);
--text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3rem);
--text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);
--text-6xl: clamp(3.75rem, 3rem + 3.75vw, 5.5rem);
--text-7xl: clamp(4.5rem, 3.5rem + 5vw, 7rem);
--text-8xl: clamp(5.5rem, 4rem + 7.5vw, 9rem);
```

### 9.4 Radius Tokens

```css
--radius-xs: 0.25rem;
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.5rem;
--radius-3xl: 2rem;
--radius-card: 1.25rem;
--radius-modal: 1.5rem;
--radius-pill: 9999px;
```

### 9.5 Shadow Tokens

```css
/* Warm tone shadows */
--shadow-xs: 0 1px 2px 0 rgb(44 41 38 / 0.03);
--shadow-sm: 0 1px 3px 0 rgb(44 41 38 / 0.05), 0 1px 2px -1px rgb(44 41 38 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(44 41 38 / 0.06), 0 2px 4px -2px rgb(44 41 38 / 0.06);
--shadow-lg: 0 10px 15px -3px rgb(44 41 38 / 0.07), 0 4px 6px -4px rgb(44 41 38 / 0.07);
--shadow-xl: 0 20px 25px -5px rgb(44 41 38 / 0.08), 0 8px 10px -6px rgb(44 41 38 / 0.08);
--shadow-2xl: 0 25px 50px -12px rgb(44 41 38 / 0.12);
--shadow-floating: 0 32px 64px -16px rgb(44 41 38 / 0.14), 0 16px 32px -8px rgb(44 41 38 / 0.08);
```

### 9.6 Blur Tokens

```css
--glass-blur: blur(20px);
--glass-blur-lg: blur(30px);
```

### 9.7 Motion Tokens

```css
/* Duration */
--duration-instant: 0ms;
--duration-fast: 300ms;
--duration-default: 500ms;
--duration-moderate: 700ms;
--duration-slow: 1000ms;
--duration-slower: 1200ms;
--duration-slowest: 1500ms;

/* Easing */
--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.2, 0.64, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### 9.8 Breakpoint Tokens

```css
/* Tailwind v4 handles breakpoints via @theme */
/* Mobile-first: default = 0px */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px */
```

### 9.9 Container Tokens

```css
--container-max: 80rem;      /* 1280px */
--container-narrow: 64rem;   /* 1024px */
--container-wide: 90rem;     /* 1440px */
```

### 9.10 Z-Index Tokens

```css
/* Already in use */
z-index: 0;    /* Backgrounds */
z-index: 10;   /* Images */
z-index: 20;   /* Content */
z-index: 30;   /* Scroll indicator */
z-index: 40;   /* FABs, floating elements */
z-index: 50;   /* Navigation */
z-index: 100;  /* Modals, overlays */
z-index: 10000;/* Skip link */
```

---

## 10. QUALITY ASSURANCE

### 10.1 Visual QA Checklist

- [ ] Hero headline renders at correct size on all breakpoints
- [ ] Gold accent appears in every section
- [ ] All shadows use warm tones (no blue/cool shadows)
- [ ] All border-radii match spec (cards: 1.25rem, buttons: pill)
- [ ] Section padding is consistent
- [ ] Container widths match spec
- [ ] Typography hierarchy is clear (3-4x size difference)
- [ ] Body text never exceeds 65ch width
- [ ] Images load in AVIF/WebP format
- [ ] Dark mode renders correctly
- [ ] Selection color is gold
- [ ] Scrollbar is styled correctly

### 10.2 Motion QA Checklist

- [ ] Hero entrance sequence plays correctly
- [ ] Section reveals trigger at correct viewport position
- [ ] Stagger delays are consistent
- [ ] Hover transforms are smooth
- [ ] Parallax works on hero image
- [ ] Before/after slider is responsive
- [ ] Accordion expands/collapses smoothly
- [ ] Modal entrance is smooth
- [ ] Mobile menu slides in correctly
- [ ] Scroll progress bar updates correctly
- [ ] Reduced motion disables all animations
- [ ] No animation jank (60fps)

### 10.3 Accessibility QA Checklist

- [ ] Skip link visible on focus
- [ ] All images have alt text
- [ ] All buttons have accessible labels
- [ ] Form fields have associated labels
- [ ] Focus order is logical
- [ ] Focus styles are visible (gold outline)
- [ ] ARIA attributes are correct
- [ ] Keyboard navigation works throughout
- [ ] Mobile menu focus trap works
- [ ] Modal focus trap works
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion is respected
- [ ] Screen reader announces dynamic content
- [ ] Touch targets are 44px minimum
- [ ] Heading hierarchy is correct (h1 → h2 → h3)

### 10.4 Performance QA Checklist

- [ ] LCP < 2.5s on 3G
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Total JS < 250KB gzipped
- [ ] Total CSS < 30KB gzipped
- [ ] All images optimized (AVIF/WebP)
- [ ] Fonts load with `display: swap`
- [ ] No layout shifts from images
- [ ] No layout shifts from fonts
- [ ] Lazy loading works for below-fold images
- [ ] Dynamic imports work correctly
- [ ] No unused JavaScript

### 10.5 Responsive QA Checklist

- [ ] Mobile (375px): All content readable, touch targets 44px
- [ ] Mobile (390px): iPhone 14 renders correctly
- [ ] Tablet (768px): Two-column layouts active
- [ ] Tablet (1024px): Full desktop layout
- [ ] Desktop (1280px): Container max-width respected
- [ ] Ultra-wide (1920px): Content centered, not stretched
- [ ] Orientation change: Layout adapts correctly
- [ ] No horizontal scroll on any breakpoint
- [ ] No content overflow on any breakpoint

### 10.6 SEO QA Checklist

- [ ] Title tag is unique per page
- [ ] Meta description is present
- [ ] Open Graph tags are present
- [ ] Twitter card tags are present
- [ ] Canonical URL is set
- [ ] Sitemap generates correctly
- [ ] robots.txt is present
- [ ] Heading hierarchy is correct
- [ ] All images have alt text
- [ ] Internal links work
- [ ] Schema.org structured data is valid
- [ ] Page loads without JavaScript (SSR/SSG)

### 10.7 Cross-Browser QA Checklist

- [ ] Chrome (latest): Full functionality
- [ ] Firefox (latest): Full functionality
- [ ] Safari (latest): Full functionality
- [ ] Edge (latest): Full functionality
- [ ] Safari iOS: Touch interactions work
- [ ] Chrome Android: Touch interactions work
- [ ] Samsung Internet: Basic functionality
- [ ] No CSS layout issues
- [ ] No JavaScript errors
- [ ] Fonts render correctly
- [ ] Images load correctly

### 10.8 Form QA Checklist

- [ ] All fields validate correctly
- [ ] Error messages display correctly
- [ ] Error messages are accessible
- [ ] Success state displays correctly
- [ ] Loading state displays correctly
- [ ] Form submits to correct API endpoint
- [ ] Form resets after successful submission
- [ ] Keyboard navigation works
- [ ] Screen reader announces errors
- [ ] Touch targets are 44px

---

## IMPLEMENTATION ORDER

### Phase 1: Foundation (Days 1-2)
1. Set up design tokens in globals.css (verify all tokens)
2. Create motion system primitives in animations.ts
3. Verify font loading and optimization
4. Set up image pipeline and optimization

### Phase 2: Core Components (Days 3-5)
1. Build/update UI primitives (button, input, card, etc.)
2. Build common components (SectionHeader, DoctorCard, etc.)
3. Build layout components (Navbar, Footer, etc.)

### Phase 3: Sections (Days 6-10)
1. Hero section (highest priority, most complex)
2. Philosophy section
3. Technology section
4. Doctors section
5. JourneyTimeline section
6. Testimonials section
7. Contact section
8. FinalCTA section
9. Remaining sections (Services, FAQ, Certifications, etc.)

### Phase 4: Integration (Days 11-12)
1. Wire up HomeClient with dynamic imports
2. Add Suspense boundaries and skeletons
3. Test all sections together

### Phase 5: Polish (Days 13-14)
1. Accessibility audit and fixes
2. Performance optimization
3. Cross-browser testing
4. Responsive testing
5. SEO verification

### Phase 6: QA (Day 15)
1. Run all QA checklists
2. Fix any issues found
3. Final performance audit
4. Deploy to staging
