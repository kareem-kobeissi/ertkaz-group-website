# ERTKAZ GROUP — Premium Landing Page

An editorial, motion-led landing page for ERTKAZ GROUP's corporate consulting and advisory practice. The current implementation includes the project foundation, navigation, cinematic hero, custom cursor, About scroll story, and interactive Services showcase. Later page chapters remain intentionally out of scope.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS
- GSAP with ScrollTrigger and SplitText
- Lenis smooth scrolling
- Lucide React
- Geist, a freely licensed Swiss-style sans-serif

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Project structure

```text
src/
├── app/                  # App Router entry points and global styles
├── components/
│   ├── cursor/           # Fine-pointer custom cursor
│   ├── layout/           # Shared structural components
│   ├── navigation/       # Responsive global navigation
│   ├── providers/        # Client-side runtime providers
│   └── sections/         # Art-directed page sections
└── lib/
    └── animations/       # GSAP registration, presets, and scoped hooks
```

## Design foundation

The palette is sampled and interpreted from the supplied `references/Ertkaz Group.com.pdf`: deep corporate navy, supporting blue, cyan accent, cool ice, and a soft off-white canvas. Responsive typography, page gutters, section spacing, motion easing, selection colors, and reduced-motion behavior are defined in `src/app/globals.css`.

The supplied PDF remains reference material only. No third-party or Cuberto assets are included.

## Animation notes

- `SmoothScrollProvider` owns Lenis and synchronizes it with the GSAP ticker and ScrollTrigger.
- GSAP plugins are registered once in `src/lib/animations/gsap.ts`.
- `useGsapContext` scopes animations and automatically reverts them during cleanup.
- Motion presets live separately so section-level animation modules can share timings and eases.
- Reduced-motion users receive native scrolling and near-instant CSS motion.
