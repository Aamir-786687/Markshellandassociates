# Markshel Land & Associates — Production React Website

Premium, production-ready React 19 application for an intellectual property law firm.

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP + Lenis
- React Router (code-split lazy routes)
- React Hook Form + React Query
- SwiperJS + React Helmet Async

## Quick Start

```bash
cd website
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
website/
├── public/Images/          AI-generated illustrations
├── src/
│   ├── components/
│   │   ├── animations/     Motion primitives (FadeIn, Marquee, etc.)
│   │   ├── layout/         Navbar, Footer, SEO, Layout
│   │   └── ui/             Button, Accordion, Cards
│   ├── data/               Services, content, team, blog
│   ├── hooks/              useLenis, useMagnetic
│   ├── pages/              All route pages
│   ├── types/              TypeScript interfaces
│   └── lib/                Utilities
├── DESIGN_STRATEGY.md      Phases 1–4 documentation
└── IMAGE_PROMPTS.md        AI illustration prompts
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/services` | All Services |
| `/services/:slug` | Service Detail (×10) |
| `/team` | Our Team |
| `/blog` | Blog |
| `/career` | Careers |
| `/faqs` | FAQs |
| `/contact` | Contact |

## Design

- **Palette:** White + Deep Navy `#0B1426`
- **Typography:** Cormorant Garamond + Inter
- **Benchmark:** Tier-1 quality (AZB Partners level) — entirely original design

## Images

All AI illustrations are in `public/Images/`. See `IMAGE_PROMPTS.md` for generation prompts.
