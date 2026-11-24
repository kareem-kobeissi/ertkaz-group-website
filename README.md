# ERTKAZ GROUP — Premium Landing Page

An editorial, motion-led bilingual website for ERTKAZ GROUP's corporate consulting and advisory practice. It includes English and Arabic routes, RTL support, a cinematic homepage, company-profile chapters, thirteen service pages, regional markets, verified contact details, and server-side SMTP enquiries.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS
- GSAP with ScrollTrigger and SplitText
- Lenis smooth scrolling
- Lucide React
- Source Serif 4 and Source Sans 3, locally bundled SIL Open Font License alternatives to the reference site's proprietary typefaces
- Geist for existing utility and brand elements
- Noto Sans Arabic Variable, locally bundled under the SIL Open Font License

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
├── app/                  # Localized App Router routes and global styles
├── components/
│   ├── cursor/           # Fine-pointer custom cursor
│   ├── layout/           # Shared structural components
│   ├── navigation/       # Responsive global navigation
│   ├── providers/        # Client-side runtime providers
│   ├── pages/            # Dedicated editorial page compositions
│   ├── sections/         # Art-directed homepage sections
│   └── ui/               # Shared interaction primitives
├── content/              # Typed English and Arabic profile content
└── lib/
    ├── animations/       # GSAP registration, presets, and scoped hooks
    └── i18n/             # Locale, direction, and route helpers
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
- Homepage counters use directory totals (services, service areas, markets/regions), not performance claims. Reduced-motion users see the final totals without counting.

## Hostinger Node.js deployment and enquiries

Use the existing GitHub-connected Hostinger **Node.js app**: build with `npm run build`, and run with `npm start`. Public content pages are prerendered; `/api/enquiry/` runs on the server. A static `out/` upload cannot send SMTP enquiries and is no longer the deployment target. Any old local `out/` directory is obsolete; do not upload it.

Set these **server-side** environment variables in the Hostinger app:

- `SMTP_HOST=smtp.hostinger.com`
- `SMTP_PORT=465` (implicit TLS; port `587` uses required STARTTLS)
- `SMTP_USER=info@ertkazgroup.com` (or an authenticated company mailbox)
- `SMTP_PASSWORD`: that mailbox's SMTP password

Use `.env.example` as a non-secret reference. For local development, put real values only in ignored `.env.local`. Never commit credentials or expose them through `NEXT_PUBLIC_` variables. Hostinger's [official SMTP configuration guide](https://www.hostinger.com/support/1575756-how-to-get-email-account-configuration-details-for-hostinger-email/) explains where to find the mailbox settings.

The form sends to **both** `info@ertkazgroup.com` and `ceo@ertkazgroup.com`; the visitor address is used only for Reply-To. The SMTP-authenticated mailbox is the sender. There are no draft/clipboard/mail-app steps. Success is shown only after SMTP accepts the message; partial acceptance and errors are handled explicitly. Missing SMTP configuration returns an honest unavailable response, not a simulated success.

The endpoint validates input, limits body size, checks the request origin, uses a honeypot, requires TLS, and applies bounded per-process rate limits. These limits reset on restart and are not shared across app instances; use hosting-level abuse protection if traffic requires it. Requests from the two production domain origins are accepted. Development requests also accept the development server origin.

The supplied company PDFs and internal content-review/QA files remain excluded from Git. Projects are absent because the latest supplied profile contains no identifiable case studies. The approved Dubai and Beirut office information comes from the client's explicit confirmation; older or ambiguous profile contact values are not substituted.
