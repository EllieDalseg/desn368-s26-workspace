# SmartSprout — Product Landing Page
**DESN 368 · P4 Code/Design · Ellie Dalseg**

---

## Project Description

SmartSprout is a smart plant sensor that monitors soil moisture, sunlight exposure, and room temperature in real time, sending care alerts directly to your phone. This project is a single-page product landing page built from scratch in HTML and CSS, designed to match a Figma prototype I created earlier in the course.

The page includes a hero section with floating data badges, a problem/proof section, a benefits section, a photo feature card section, a pricing comparison table, an embedded video, and a contact form. It also features a custom animated loading screen with a growing flower built entirely in CSS.

---

## CSS Transform

I implemented `translateY(-4px)` as a hover lift effect applied to buttons and feature cards. When a user hovers over the "Shop Now" or "Learn More" buttons, they lift slightly upward, giving tactile feedback. The same transform is applied to feature cards on hover, making them feel interactive and clickable.

I also used `scale()` transforms on the benefit icon circles (they scale up and rotate on hover) and on the loading screen flower petals (which bloom outward using `scaleY()` from their base).

---

## CSS Animation

I implemented several `@keyframes` animations, all wrapped in `@media (prefers-reduced-motion: no-preference)` for accessibility:

- **`fadeInUp`** — the hero headline and supporting text fade upward into view when the page loads, creating a smooth entrance effect
- **`badgeFloat`** — the three data badges (Temp, Sunlight, Moisture) floating beside the hero plant image continuously bob up and down at slightly different speeds, making the page feel alive
- **`ctaPulse`** — the primary "Shop Now" button emits a soft ripple glow that pulses outward every few seconds, drawing attention to the main call to action
- **Loading screen animations** — a full sequence of `@keyframes` animates the soil appearing, the stem growing, leaves unfurling, petals blooming one by one, and the flower center popping into place before the screen fades out

---

## Table Content Type

I chose a **pricing comparison table**, contrasting three product tiers: SmartSprout Base ($29), SmartSprout Plus ($39), and SmartSprout Pro ($59). Each column shows which features are included — moisture sensor, light sensor, temperature tracking, and battery life — making it easy for a customer to choose the right plan.

---

## Challenges Encountered & Solutions

**Separating the benefits and feature card sections**
The Figma design showed the benefit icons and the photo cards as two distinct sections, but my initial code had them merged into one. I had to restructure the HTML to split them into `#features` and `#feature-cards`, each with their own background color and layout, without breaking the shared `.features-grid` CSS class.

**CSS specificity bug with icon sizes**
When trying to increase the size of the stat icons in the proof section, nothing was visually changing. The issue turned out to be a specificity conflict — `.stat span { font-size: .8rem }` was overriding `.stat-icon` because it targeted a more specific selector. I fixed this by changing the selector to `.stat .stat-icon` to increase its specificity.

**Full-width section backgrounds**
Early on, section backgrounds were only applying to the max-width content container rather than the full viewport width, leaving white bars on the sides. The fix was to separate the background color from the max-width wrapper by adding a full-width outer element (`.proof-section`) that holds the background, while the inner `.proof-band` handles the max-width constraint.

**Video embedding**
Getting a video to display locally was tricky — YouTube and Pexels iframes are blocked by browsers when a page is opened as a `file://` URL due to security restrictions. The solution was to use `youtube-nocookie.com` with proper `allow` attributes, and to understand that the embed will work correctly once deployed to GitHub Pages.

**Loading screen flower animation**
Building the flower animation in pure CSS was the most complex part of the project. Getting the petals to bloom outward from the center required careful use of `transform-origin`, nested elements (`.petal-wrap` for rotation, `.petal` for the scaleY bloom), and precise positioning math to make each petal rotate around a shared center point. The stem also initially rendered on top of the flower head, which required adding `z-index` to the flower head and adjusting the stem height.

---

## Key Learnings

- **Semantic HTML matters** — understanding when to use `<section>` vs `<article>` vs `<div>` made the code cleaner and more accessible, and I now think about document structure differently
- **CSS custom properties (design tokens)** — defining colors as variables in `:root` made it easy to stay consistent with the Figma color palette and update the whole site by changing one value
- **CSS specificity** — specificity conflicts are one of the most common sources of bugs in CSS, and learning to read the cascade more carefully saved a lot of debugging time
- **Responsive design with Grid and Flexbox** — using CSS Grid for two-column layouts that collapse to single-column on mobile became second nature by the end of this project
- **Working from a design file** — constantly referencing the Figma as a source of truth kept the code aligned with the intended design and taught me how to translate visual decisions into CSS values
- **Accessibility as a baseline** — adding `:focus-visible` states, descriptive `alt` text, proper label associations, and wrapping animations in `prefers-reduced-motion` are small details that make a big difference for real users
