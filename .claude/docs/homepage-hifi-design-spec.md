# HOMEPAGE — HIGH-FIDELITY DESIGN SPECIFICATION

**Project:** Thousand Smile Dental Clinic
**Document Type:** Visual Design Specification (Figma-Quality Handoff)
**Version:** 1.0
**Status:** Production-Ready Design

---

## 1. GLOBAL DESIGN RULES

### 1.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `warmwhite` | `#FAFAF8` | Primary background, hero bg, cards |
| `ivory` | `#F5F3EF` | Secondary backgrounds, alternating sections |
| `stone` | `#E8E4DE` | Borders, dividers, subtle backgrounds |
| `warmgray` | `#9B9590` | Muted text, captions, secondary labels |
| `charcoal` | `#2C2926` | Body text, secondary text, dark borders |
| `nearblack` | `#1A1816` | Primary text, headlines, dark backgrounds |
| `gold` | `#B8A88A` | Accent, CTAs, single thread of luxury |
| `gold-deep` | `#8B7355` | Hover states, darker accent |
| `gold-light` | `#D4C9B5` | Subtle accents, light backgrounds |

### 1.2 Typography

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|------|--------|----------------|---------------|-------------|----------------|
| Display Hero | Playfair Display | 300 | `clamp(3.75rem, 3rem + 3.75vw, 5.5rem)` | `clamp(2.5rem, 2rem + 2.5vw, 3.5rem)` | 1.0 | -0.04em |
| Section Headline | Playfair Display | 400 | `clamp(3rem, 2.5rem + 2.5vw, 4rem)` | `clamp(2rem, 1.5rem + 2.5vw, 2.75rem)` | 1.05 | -0.02em |
| Subheadline | Playfair Display | 400 | `clamp(1.75rem, 1.55rem + 1vw, 2.25rem)` | `clamp(1.375rem, 1.25rem + 0.625vw, 1.75rem)` | 1.15 | -0.02em |
| Body Large | Inter | 400 | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | `clamp(0.9375rem, 0.9rem + 0.19vw, 1rem)` | 1.625 | 0 |
| Body | Inter | 400 | `clamp(0.9375rem, 0.9rem + 0.19vw, 1rem)` | `clamp(0.875rem, 0.85rem + 0.125vw, 0.9375rem)` | 1.625 | 0 |
| Caption | Inter | 500 | `clamp(0.8125rem, 0.78rem + 0.16vw, 0.875rem)` | `clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)` | 1.5 | 0.025em |
| Eyebrow | Inter | 500 | `clamp(0.6875rem, 0.65rem + 0.19vw, 0.8125rem)` | `0.6875rem` | 1.5 | 0.1em |

### 1.3 Container Widths

| Token | Max Width | Usage |
|-------|-----------|-------|
| `container-custom` | `80rem` (1280px) | Standard content |
| `container-narrow` | `64rem` (1024px) | Text-heavy content |
| `container-wide` | `90rem` (1440px) | Full-width content |

### 1.4 Section Vertical Rhythm

| Section Type | Padding Top | Padding Bottom |
|--------------|-------------|----------------|
| Hero | 0 | 0 |
| Major Section | `clamp(5rem, 4rem + 5vw, 8rem)` | `clamp(5rem, 4rem + 5vw, 8rem)` |
| Standard Section | `clamp(4rem, 3.5rem + 2.5vw, 6rem)` | `clamp(4rem, 3.5rem + 2.5vw, 6rem)` |

---

## 2. NAVIGATION SYSTEM

### 2.1 Desktop Navigation (≥1024px)

**Layout:** Fixed top, full-width, glass morphism background
**Z-index:** 50
**Height:** `80px` (default), `64px` (scrolled)

**Background Treatment:**
- Default: `rgba(250, 250, 248, 0.80)` with `backdrop-filter: blur(20px)`
- Dark mode: `rgba(26, 24, 22, 0.85)` with `backdrop-filter: blur(20px)`
- Bottom border: `1px solid rgba(232, 228, 222, 0.50)`

**Container:** Max-width `80rem`, horizontal padding `clamp(1.5rem, 1rem + 2.5vw, 3rem)`, content centered vertically.

**Logo Treatment:**
- Icon: Gold smile, 28px × 28px, `#B8A88A`
- Text: "Thousand Smile" Inter 600, `1.125rem`, `#1A1816`
- Text: "Dental" Inter 300, `1.125rem`, `#9B9590`
- Gap: `0.5rem`

**Navigation Links:**
- Font: Inter 400, `0.9375rem`, `#9B9590`
- Hover: `#B8A88A`
- Gap: `2.5rem`

**CTA Button:** "Book Consultation", `#B8A88A` bg, `#1A1816` text, Inter 500, `0.875rem`, height `2.75rem`, border-radius `0.375rem`

**Scroll Behavior:** Height `80px` → `64px`, bg opacity → `0.95`, shadow appears.

### 2.2 Mobile Navigation (<768px)

Hamburger trigger (32px), full-screen `nearblack` overlay, links Inter 400 `1.5rem` `warmwhite`, full-width CTA at bottom.

---

## 3. STAGE 1 — THE ARRIVAL (HERO)

### Purpose
Create immediate emotional impression of luxury, precision, and calm. Feel like entering a private gallery.

### Viewport
Height: `100vh` min, min-height `600px`, max-height `900px`.

### Background
Primary: `#FAFAF8`. Gradient `180deg` from `#FAFAF8` to `#F5F3EF`. Radial light `rgba(184, 168, 138, 0.03)` at `30% 20%`. Noise opacity `0.015`.

### Composition — Desktop (≥1024px)

Two-column grid: Left (text) `5fr`, Right (image) `7fr`, gap `4rem`, vertical alignment center.

Container: Max-width `80rem`, horizontal padding `clamp(1.5rem, 1rem + 2.5vw, 3rem)`, vertically centered in viewport.

### Typography — Hero Headline

**Text:** "Precision is not what we do. It is who we are."

**Line Breaks:**
```
Precision is not
what we do.
It is who we are.
```

- Font: Playfair Display, Weight: 300
- Size: `clamp(3.75rem, 3rem + 3.75vw, 5.5rem)` (~88px at 1280px)
- Line height: 1.0, Letter spacing: `-0.04em`
- Color: `#B8A88A` (gold), Max width: `600px`

### CTA Buttons

Position: Below headline, `3rem` gap. Layout: Horizontal, `1.5rem` gap.

**Primary:** "Book Consultation", `#B8A88A` bg, `#FAFAF8` text, Inter 500, `0.9375rem`, pill radius, height `3.25rem`, shadow `0 8px 30px -5px rgba(184, 168, 138, 0.35)`. Hover: `translateY(-2px)`, shadow increase.

**Secondary:** "Call Us", transparent, `#9B9590` text. Hover: `#B8A88A`.

### Trust Indicators

Below CTAs, `2rem` gap. Horizontal, `1.5rem` gap. Items: "5-Star Rated" • "15+ Years Experience" • "Digital Smile Design". Font Inter 400, `0.8125rem`, `#9B9590`. Separator: gold dot `4px`, `#B8A88A`.

### Hero Image

Right column, aspect ratio `3/2`, border-radius `1.5rem`, shadow `0 32px 64px -16px rgba(26, 24, 22, 0.12)`. Object-fit cover. Gradient overlay from bottom `rgba(26, 24, 22, 0.06)`. Subject: warm-lit clinic interior. Lighting: warm, soft, natural from left.

### Scroll Indicator

Bottom center, `2rem` from bottom. Line: `1px × 48px`, `#E8E4DE`, pulse animation. Text: "Scroll", Inter 500, `0.625rem`, uppercase, `letter-spacing: 0.15em`, `#9B9590`.

### Depth & Layer Order

| Z-Index | Element |
|---------|---------|
| 0 | Background gradient |
| 1 | Noise texture |
| 2 | Radial light effect |
| 10 | Hero image |
| 20 | Headline, CTAs, trust indicators |
| 30 | Scroll indicator |
| 50 | Navigation |

### Responsive

**Mobile:** Stack vertically, headline `3rem`, CTAs full-width stacked, image full-width `4/3`.
**Tablet:** Two-column maintained, headline `4rem`, image `50%` width.

### Expected Response
Primary: Calm authority. Secondary: Curiosity. Tertiary: Trust.

---

## 4. STAGE 2 — THE PROMISE (PHILOSOPHY)

### Purpose
Establish philosophical foundation. Not about teeth — about art, science, and human care.

### Viewport
Height: Auto, min `80vh`. Background: `#FAFAF8`.

### Composition — Desktop

Asymmetric two-column: `5fr / 7fr` (text left, image right), gap `4rem`, center aligned.

Container: Max-width `80rem`, padding `clamp(5rem, 4rem + 5vw, 8rem)`.

### Typography

**Eyebrow:** "Our Philosophy", Inter 500, `0.6875rem`, uppercase, `letter-spacing: 0.1em`, `#9B9590`. Gold dot separator `6px × 6px`, `#B8A88A`.

**Accent Line:** `48px × 1.5px`, `#B8A88A`, between eyebrow and headline.

**Headline:** "Where precision becomes art.", Playfair Display 400, `clamp(3rem, 2.5rem + 2.5vw, 4rem)`, line-height 1.05, `#1A1816`, max-width `600px`.

**Body:** Inter 400, `0.9375rem`, line-height 1.625, `#2C2926`, max-width `45ch`, margin-top `1.5rem`.

### Image

Right column, aspect ratio `4/5`, border-radius `1.25rem`. Subject: dental artisan at work. Lighting: warm side lighting. Mood: intimate, focused.

### CTA

"Learn More About Us →", Inter 500, `0.875rem`, `#B8A88A`, underline `1px solid rgba(184, 168, 138, 0.3)`.

### Responsive
Mobile: Stack vertically, image above text. Tablet: Maintain asymmetric, gap `3rem`.

---

## 5. STAGE 3 — THE EVIDENCE (TECHNOLOGY)

### Purpose
Demonstrate technological superiority through visual evidence.

### Viewport
Height: Auto, min `100vh`. Background: `#F5F3EF`.

### Composition
Full-width section, container `80rem`, padding `clamp(5rem, 4rem + 5vw, 8rem)`.

### Section Header

Center-aligned, max-width `640px`, margin-bottom `clamp(4rem, 3.5rem + 2.5vw, 6rem)`.

- Eyebrow: "Precision Dentistry", Inter 500, `0.6875rem`, `#9B9590`
- Headline: "Technology that transforms your experience.", Playfair Display 400, `clamp(3rem, 2.5rem + 2.5vw, 4rem)`
- Description: Inter 400, `0.9375rem`, `#2C2926`, max-width `60ch`

### Featured Technology — Digital Smile Design

Two-column `1fr / 1fr`, gap `4rem`.

**Left — Before/After Slider:**
- Aspect ratio `3/2`, border-radius `1.5rem`, border `1px solid rgba(232, 228, 222, 0.50)`
- Handle: `48px` diameter, `rgba(250, 250, 248, 0.95)` bg, `blur(12px)`, shadow `0 4px 24px rgba(0, 0, 0, 0.18)`
- Line: `2px`, white/80
- Labels: "Current Smile" `nearblack/60`, "DSD Preview" `gold/90`
- Bottom bar: gradient `nearblack/70` → transparent

**Right — Story:**
- Badge: "Featured Technology", pill, `gold-light/50` bg
- Headline: "Digital Smile Design", Playfair Display, `clamp(2rem, 1.75rem + 1.25vw, 2.5rem)`
- Body: Inter 400, `0.9375rem`, `#2C2926`
- Feature highlight: Sparkles icon `20px` `#B8A88A` in `gold-light/50` circle

### Journey Timeline

Horizontal (desktop), Vertical (mobile). Step circles `48px`, `#FAFAF8` bg, `#E8E4DE` border. Connecting line `1.5px`. Icons `20px`, `#9B9590` default, `#B8A88A` hover.

### Precision Toolkit — 3-Column Grid

Gap `1.5rem`. Cards: `#FAFAF8` bg, border `1px solid rgba(232, 228, 222, 0.60)`, border-radius `1.25rem`, padding `2rem`. Icon container `44px × 44px`, `gold-light/30` bg. Stat: Playfair Display, `1.5-1.875rem`.

### Patient Benefits — Dark Banner

4-column grid. Background `#1A1816`, border-radius `1.25rem`, padding `3rem`. Icons in `rgba(184, 168, 138, 0.10)` circles. Labels Inter 600, `0.875rem`, `#FAFAF8`.

### CTA

"Experience Precision Dentistry", `#B8A88A` bg, pill, shadow `0 4px 24px rgba(184, 168, 138, 0.25)`.

---

## 6. STAGE 4 — THE PEOPLE (DOCTORS)

### Purpose
Humanize the brand through portrait and credentials.

### Viewport
Height: Auto, min `80vh`. Background: `#FAFAF8`.

### Composition

Asymmetric `1fr / 1.15fr` (portrait left, story right), gap `5rem`, center aligned.

### Portrait — Left Column

Container height `560px`, border-radius `2rem`. Gold rim: `-3px` inset, gradient `gold-light/20` → `gold/10`. Image aspect `3/4`, shadow `0 32px 64px -16px rgba(26, 24, 22, 0.15)`. Light leak: `gold/[0.03]` from top-right. Bottom blend: `warmwhite/20`.

### Story — Right Column

- Eyebrow: "Featured Specialist"
- Headline: "Meet Dr. [Name]", name in `#B8A88A`
- Role: Inter 500, `1rem`, `#B8A88A`
- Quote: left border `2px solid rgba(184, 168, 138, 0.60)`, Playfair italic, `1.125-1.375rem`
- Credentials: horizontal, `2.5rem` gap, values Inter 700 `1.5-1.875rem`
- CTA: same as hero

---

## 7. STAGE 5 — THE RITUAL (JOURNEY TIMELINE)

### Purpose
Make patient journey feel ceremonial, not clinical.

### Viewport
Height: Auto, min `80vh`. Background: gradient `#FAFAF8` → `#F5F3EF`.

### Composition

Vertical timeline, container `64rem`, padding `clamp(5rem, 4rem + 5vw, 8rem)`.

### Timeline

Line: `1.5px`, `#E8E4DE`, progress fill `#B8A88A`. Nodes: `48px`, `#FAFAF8` bg, `#E8E4DE` border (default), `#B8A88A` (completed). Alternating left/right content.

### Steps

| Step | Title | Description |
|------|-------|-------------|
| 1 | Initial Consultation | Thorough assessment of oral health and aesthetic goals |
| 2 | Digital Scanning | Precise 3D mapping without messy impressions |
| 3 | Smile Design | AI-assisted design tailored to unique features |
| 4 | Preview & Approval | See new smile before any treatment |
| 5 | Treatment | Precision execution with verified outcomes |
| 6 | Reveal | Transformed smile, exactly as designed |

---

## 8. STAGE 6 — THE RECOGNITION (TESTIMONIALS)

### Purpose
Build trust through authentic patient stories.

### Viewport
Height: Auto, min `80vh`. Background: `#F5F3EF`.

### Composition

Asymmetric portrait grid (one large `3/4`, two small `4/3`). Container `80rem`.

### Testimonial Cards

Background `#FAFAF8`, border `1px solid rgba(232, 228, 222, 0.50)`, border-radius `1.25rem`, padding `2rem`. Stars `#B8A88A` `16px`. Quote: Playfair 400, `1.125rem`. Author: Inter 600 `0.875rem`. Verified badge: `#5A7A65`.

---

## 9. STAGE 7 — THE INVITATION (CONTACT/BOOKING)

### Purpose
Convert interest into action. Effortless booking.

### Viewport
Height: Auto, min `80vh`. Background: `#FAFAF8`.

### Composition

Centered single column, container `48rem`.

### Form

Step indicator: 3 steps, active `#B8A88A`, completed `#5A7A65`, inactive `#E8E4DE`.

Fields: `#FAFAF8` bg, `#E8E4DE` border, border-radius `0.375rem`, height `2.75rem`. Focus: border `#B8A88A`, shadow `rgba(184, 168, 138, 0.15)`. Error: `#9B6B6B`.

Submit: Full-width, `#B8A88A` bg, Inter 600, height `3.25rem`, shadow `rgba(184, 168, 138, 0.25)`.

---

## 10. STAGE 8 — THE WELCOME (FINAL CTA/FOOTER)

### Purpose
Lasting impression. Warm farewell, not sales pitch.

### Final CTA

Background `#1A1816`, gradient to `gold-deep/20`. Padding `clamp(6rem, 5rem + 5vw, 10rem)`.

Headline: "Your smile awaits.", Playfair 400, `clamp(3rem, 2.5rem + 2.5vw, 4rem)`, `#FAFAF8`, centered.

Body: Inter 400, `1.125rem`, `#9B9590`, centered, max-width `480px`.

CTAs: "Book Consultation" (gold) + "Call (555) 123-4567" (ghost).

### Footer

Background `#1A1816`, border-top `1px solid rgba(184, 168, 138, 0.15)`.

4-column grid: Logo+tagline, Services, Company, Contact.

Headings: Inter 600, `0.875rem`, `#FAFAF8`, uppercase. Links: Inter 400, `0.875rem`, `#9B9590`, hover `#B8A88A`. Social icons `20px`, hover `#B8A88A`.

Copyright: Inter 400, `0.75rem`, `#9B9590`, centered bottom.

---

## 11. COMPONENT SPECIFICATIONS

### 11.1 Button — Primary

| Property | Value |
|----------|-------|
| Background | `#B8A88A` |
| Text | `#FAFAF8` |
| Font | Inter 500, `0.9375rem` |
| Padding | `1rem 2rem` |
| Height | `3.25rem` |
| Border-radius | `9999px` |
| Shadow | `0 8px 30px -5px rgba(184, 168, 138, 0.35)` |
| Hover | `translateY(-2px)`, shadow increase |
| Focus | `outline: 2px solid #B8A88A`, offset `3px` |
| Transition | `all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)` |

### 11.2 Button — Ghost

Background transparent, text `#9B9590`, hover `#B8A88A`, no border, height `3.25rem`.

### 11.3 Card — Service

Background `#FAFAF8`, border `1px solid rgba(232, 228, 222, 0.60)`, border-radius `1.25rem`, padding `1.75rem`. Hover: border `gold-light/60`, shadow increase, `translateY(-4px)`.

### 11.4 Eyebrow

Inter 500, `0.6875rem`, `#9B9590`, uppercase, `letter-spacing: 0.1em`. Gold dot separator `6px × 6px`.

### 11.5 Section Header

Max-width `640px`, centered. Accent line `48px × 1.5px`, `#B8A88A`.

---

## 12. IMAGE DIRECTION

### Hero Image
Aspect `3/2`, warm-lit clinic interior, soft natural light from left, warm desaturated grading, AVIF/WebP, 85% quality.

### Philosophy Image
Aspect `4/5`, dental artisan at work, warm side lighting, intimate mood.

### Technology Images
Before/after `3/2`, consistent lighting. Equipment clean, well-lit.

### Doctor Portrait
Aspect `3/4`, warm smile, soft natural lighting, neutral blurred background.

### Testimonial Portraits
Large `3/4`, small `4/3`, candid, natural, authentic.

---

## 13. TYPOGRAPHY COMPOSITION

### Headline Line Breaks

**Hero:**
```
Precision is not
what we do.
It is who we are.
```

**Philosophy:**
```
Where precision
becomes art.
```

**Technology:**
```
Technology that
transforms your
experience.
```

### Paragraph Width

| Context | Max Width | Characters |
|---------|-----------|------------|
| Hero body | `480px` | ~60ch |
| Section body | `520px` | ~65ch |
| Card body | `320px` | ~45ch |

### Vertical Rhythm

| Element | Margin Bottom |
|---------|---------------|
| Headline | `1rem` |
| Subheadline | `0.75rem` |
| Body paragraph | `1.5rem` |
| CTA group | `2rem` |

---

## 14. RESPONSIVE SPECIFICATIONS

### Breakpoints

| Name | Min | Max |
|------|-----|-----|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | 1279px |
| Wide | 1280px | 1535px |

### Mobile Layout Philosophy

Do NOT simply stack desktop. Redesign every stage:
- Maintain luxury through generous whitespace
- Reduce headline size, keep impact
- Stack CTAs vertically, full-width
- Maintain image quality and aspect ratios
- Preserve editorial rhythm

### Mobile Typography

| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero headline | 5.5rem | 3rem |
| Section headline | 4rem | 2.5rem |
| Body | 1rem | 0.9375rem |

### Mobile Spacing

| Context | Desktop | Mobile |
|---------|---------|--------|
| Section padding | 8rem | 4rem |
| Container padding | 3rem | 1.5rem |
| Card padding | 2rem | 1.25rem |

---

## 15. MICRO INTERACTIONS

### Hover States

**Buttons:** `translateY(-2px)`, shadow increase, 500ms.
**Cards:** `translateY(-4px)`, border `gold-light/60`, shadow increase, 500ms.
**Links:** Color `#B8A88A`, underline from left, 300ms.

### Focus States

All interactive: `outline: 2px solid #B8A88A`, offset `3px`, 100ms.

### Scroll Reveals

Fade in + slide up `30px`, 1000ms, easing `cubic-bezier(0.25, 0.1, 0.25, 1)`. Viewport margin `-120px`. Stagger `150ms`.

### Image Behavior

Parallax: `20px` range, 0.5x speed. Hover: `scale(1.02)`, 700ms.

### Navigation

Scroll: height `80px` → `64px`, opacity → `0.95`, shadow appears, 300ms.

---

## 16. DESIGN QA

### Visual Hierarchy
- [ ] Hero headline is first thing seen
- [ ] Gold accent in every section
- [ ] Headlines 3-4x larger than body
- [ ] Body text ≤65ch width
- [ ] CTAs visually distinct

### Consistency
- [ ] All buttons pill radius
- [ ] All cards `1.25rem` radius
- [ ] Warm shadows only
- [ ] Hover duration 500ms everywhere
- [ ] Gold focus outline everywhere

### Luxury Perception
- [ ] Generous whitespace
- [ ] Restrained gold usage
- [ ] Editorial serif headlines
- [ ] Slow confident animations
- [ ] High-quality imagery
- [ ] Minimal visual noise

### Accessibility
- [ ] All images have alt text
- [ ] All buttons have labels
- [ ] Form fields have labels
- [ ] Skip link present
- [ ] Reduced motion respected
- [ ] Keyboard navigation works

### Memorability
- [ ] Hero headline is quotable
- [ ] Gold accent is distinctive
- [ ] Typography is editorial quality
- [ ] Feel is "private gallery"
- [ ] Nothing feels like typical dental website

### Award-Level Quality
- [ ] Visual storytelling is continuous
- [ ] Every section feels unique
- [ ] Micro-interactions refined
- [ ] Typography composition editorial
- [ ] Image direction consistent
- [ ] Responsive maintains luxury
