# Plovdiv React POC — shared brief (READ FULLY before writing code)

One-page React app (Vite) for **Hostel Old Plovdiv**: a free redesign concept by Likwiid for a warm client. It must look like a modern boutique-hotel site (think Design Hotels / Ace Hotel editorial quality), fully responsive, with the booking flow EMBEDDED as an in-page section (`#book`).

## Hard rules
- Import ALL copy/images/prices from `src/data/content.js`. Do NOT invent reviews, discounts, policies, or prices.
- Use ONLY design tokens from `src/styles/tokens.css` (`var(--maroon-700)` etc). No hardcoded hex.
- NO em-dashes and NO en-dashes in any string. Write "10 to 15" not ranges with dashes.
- No external UI libraries (no MUI/tailwind/etc). Plain CSS files per component, imported by the component. Google Fonts "Fraunces" + "Inter" are already loaded in index.html.
- Every component is a default export at the exact path named in your prompt. Props contracts in App.jsx are fixed; match them exactly.
- Images come from the client's own site (URLs in content.js). Always set `alt`, `loading="lazy"` (except hero), and give image containers a fixed aspect-ratio so layout never jumps.
- Mobile-first: flawless at 375px, great at 768px and 1280px. No horizontal overflow, ever.
- Accessibility: real buttons for actions, focus-visible styles, aria-labels on icon-only controls, color contrast at least 4.5:1 for text.
- The client is genuinely rated #1 in Plovdiv; tone is confident, warm, unexaggerated.

## Design direction ("way better looking" is the assignment)
- Editorial boutique aesthetic: generous whitespace, cream background (--cream-100), deep maroon ink headings (--maroon-900), gold used SPARINGLY as accent (eyebrows, lines, hover states).
- Display serif (--font-display) for headings with tight leading and slight negative letter-spacing; --font-body for everything else.
- Section rhythm: eyebrow (small caps, gold, letterspaced) then big serif heading then one short lede. Consistent across ALL sections.
- Subtle motion only: fade/slide-in on scroll via IntersectionObserver (respect prefers-reduced-motion), gentle hover lifts with --shadow-lift, --t-med transitions with --ease.
- Cards: --radius-md or --radius-lg, --shadow-card, cream-50 surfaces on cream-100 background, 1px --cream-300 borders.
- Photography is the client's real (dated) photos; treat them well: consistent aspect ratios, slight rounded corners, occasional gold border-offset frame effect on feature images.
