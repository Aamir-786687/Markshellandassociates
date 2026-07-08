# Design Strategy — Markshell and Associates

## Phase 1: Research & Design Strategy

**Benchmark:** AZB Partners (quality reference only — layout, typography, interactions studied for tier-1 standard)

**Differentiation:**
- Original navy + white identity (not AZB's visual language)
- IP-specific editorial illustrations (not photography-heavy)
- Cormorant Garamond + Inter typography pairing
- Motion-first experience with Lenis smooth scroll

**Target audience:** Innovators, global brands, M&A teams, creative industries

---

## Phase 2: Design System

| Token | Value |
|-------|-------|
| Primary | `#0B1426` (Deep Navy) |
| Primary Light | `#152238` |
| Surface | `#F8FAFC` |
| Muted Text | `#64748B` |
| Border | `#E2E8F0` |
| Display Font | Cormorant Garamond |
| Body Font | Inter |
| Radius | 8px–32px scale |
| Shadow | soft / medium / strong (navy-tinted) |

**Components:** Button (pill, ripple), Card (rounded-2xl, hover lift), Accordion, Timeline, CTA Banner

---

## Phase 3: Wireframes

**Home:** Hero 50/50 → Trust Marquee → Practice Areas 3-col → Why Choose Us + Stats → Process Timeline → Industries → Testimonials Swiper → Team → Blog → FAQ → CTA → Footer

**Service Detail:** Hero → Overview → Benefits Grid → Process → FAQ → Related Services → CTA

---

## Phase 4: High Fidelity UI

Implemented in React with Tailwind CSS v4 `@theme` tokens. All pages use consistent section-padding, container-custom (max-w-7xl), and fade-in scroll animations.

---

## Phase 5: Component Architecture

```
components/
├── animations/   MotionPrimitives (FadeIn, Stagger, TextReveal, ImageReveal, Marquee)
├── layout/       Navbar, Footer, SEO, Layout
└── ui/           Button, Accordion, Cards (Service, Team, Blog, Testimonial, Timeline, CTA)
```

---

## Phase 6: Folder Structure

See `README.md` for full tree. Lazy-loaded routes with code splitting per page.

---

## Phase 7–12: Implementation Status

| Phase | Status |
|-------|--------|
| React Components | ✅ Complete |
| Framer Motion + GSAP + Lenis | ✅ Integrated |
| Responsive Design | ✅ Mobile-first |
| SEO (Helmet, Schema, OG) | ✅ Per-page |
| Performance (lazy routes, chunks) | ✅ Build verified |
| Accessibility (WCAG AA, ARIA, skip link) | ✅ Implemented |
| Loading Screen | ✅ Animated progress |
| AI Illustrations | ✅ 17+ images in public/Images |

---

## Animation Inventory

- Page transitions (AnimatePresence)
- Fade Up / Left / Right (FadeIn)
- Stagger children (StaggerContainer)
- Text reveal (word-by-word)
- Image reveal (clip-path + scale)
- Infinite marquee (trust bar)
- Floating shapes (hero)
- Scroll-triggered counters
- Accordion expand/collapse
- Mega menu fade
- Nav underline (layoutId)
- Button hover scale + ripple
- Swiper testimonials autoplay
- Loading screen progress bar
