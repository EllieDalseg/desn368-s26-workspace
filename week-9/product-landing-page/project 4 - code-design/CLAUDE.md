# DESN 368 — P4 Product Landing Page

## Project
SmartSprout product landing page. Single-file build: `p4-combined.html` (CSS lives in a `<style>` block in the `<head>`).

## P4 Required Structure

### Outer scaffold
```
<header id="header">
  <img id="header-img" alt="...">
  <nav id="nav-bar">
    <a class="nav-link">...</a>  ← minimum 3, we have 4
  </nav>
</header>
<main> ... </main>
<footer> ... </footer>
```

### Five sections inside `<main>` — in this exact order
| # | id | Content |
|---|---|---|
| 1 | `hero` | Headline + CTA + plant photo + proof band (folded-in section 02) |
| 2 | `video` | 16:9 iframe embed + copy |
| 3 | `features` | 6 `<article>` cards (3 benefit + 3 photo) |
| 4 | `data` | `<table id="data-table">` comparison chart |
| 5 | `contact` | Name + email form + `id="submit"` button |

## Rules to keep in mind

- Every `<img>` needs descriptive alt text (5–10 words). Never `alt=""`.
- Every form `<input>` has a paired `<label for="id">`.
- Email input: `type="email" required`.
- Submit button: `id="submit"`.
- Data table: `id="data-table"` with `<thead>` and `<tbody>`, wrapped in a `div` with `overflow-x: auto` for mobile scroll.
- Wrap all `@keyframes` / hover animations in `@media (prefers-reduced-motion: no-preference)`.
- Use `<article>` for repeating self-contained cards. Use `<section>` for thematic groupings.

## Design tokens (from Figma)
```css
--green-dark:  #2d5a3d   /* header, buttons, table header */
--green-mid:   #4a7c59   /* accents, focus rings */
--green-light: #c8d8c0   /* benefit icon backgrounds, price row */
--cream:       #f0ede4   /* page background, alternating table rows */
--white:       #ffffff   /* cards, inputs */
--ink:         #1a1a1a   /* body text, footer bg */
--ink-soft:    #4a4a4a   /* secondary text */
```

## Placeholder images to replace
All `placehold.co` URLs need to be swapped for real Figma exports:

| Location | Current src | Replace with |
|---|---|---|
| Header logo | `placehold.co/32x32` | Figma logo export (PNG/SVG) |
| Hero plant photo | `placehold.co/480x400` | Hero image export |
| Proof photo | `placehold.co/340x280` | Person-watering photo export |
| Feature card 1 | `placehold.co/300x180` (Modern Design) | Product photo |
| Feature card 2 | `placehold.co/300x180` (Real-Time Insight) | App screenshot |
| Feature card 3 | `placehold.co/300x180` (Long Battery) | Lifestyle photo |

## Video
Currently using a YouTube placeholder embed. Replace the `src` in the `<iframe>` with your actual video URL:
```html
src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
```

## What was cut / reworked from the Figma
- **Section 02 (Problem/Proof)** — folded into `#hero` as `.proof-band` below the fold (P4 allows exactly 5 sections in `<main>`)
- **Sections 03 + 04** — merged into one `id="features"` section with 6 articles
- **Section 06 "Secondary CTA"** — right side became the contact form to satisfy P4's form requirement
