# Rangoli Properties — Website

A single-page marketing website for **Rangoli Properties**, a real estate consultancy serving Mathura, Vrindavan, Barsana, Govardhan and Nandgaon.

Built as plain HTML, CSS and JavaScript — no framework, no build step, no npm install. Open it and it works.

## File structure

```
.
├── index.html      # all markup and content
├── styles.css       # all styling
├── script.js        # all interactivity
└── README.md
```

Keep all three files in the same folder — `index.html` loads the other two by relative path (`<link href="styles.css">` and `<script src="script.js">`).

## Features

- Hero section with an animated, hand-drawn rangoli/mandala motif (SVG, generated and animated in JS)
- "The Braj Circuit" — a horizontally-scrolling carousel covering all five service towns plus commercial corridors
- About section with mission/vision and live count-up stats
- Service catalogue organised into five filterable tabs (Residential, Commercial, Land, Consulting, Special)
- "Why Rangoli Properties" bento-style grid of seven trust points
- Four-step "How We Work" process timeline
- Reviews section linking out to the real Google and Justdial profiles (no fabricated testimonials)
- Contact section with an embedded Google Map and a form that opens a pre-filled WhatsApp message — no backend or server required
- Fully responsive, including a slide-in mobile navigation drawer
- Scroll-reveal animations with a built-in safety net so content can never get stuck invisible

## Running it locally

No build tools are required. Either:

1. Double-click `index.html` to open it directly in a browser, or
2. Serve it with any static server for a closer-to-production experience (recommended, since some browsers restrict local-file behavior):

   ```bash
   # Python
   python3 -m http.server 5500

   # Node (if you have it)
   npx serve .
   ```

   Then visit `http://localhost:5500`.

If you're using the VS Code "Live Server" extension, just right-click `index.html` → **Open with Live Server**.

## Deploying

This is a static site, so any static host works:

- **GitHub Pages** — push this folder to a repo, then enable Pages on the `main` branch (root folder).
- **Netlify / Vercel** — drag-and-drop the folder onto their dashboard, or connect the GitHub repo. No build command is needed; the output directory is the project root.

## Customizing

**Colours, fonts, spacing** — all design tokens live at the top of `styles.css` inside `:root { ... }`. Change a value once there and it updates everywhere.

**Business details** — phone number, WhatsApp number, and address appear in a few places in `index.html` (header, hero, contact section, footer) and once in `script.js` (the WhatsApp form redirect uses `91XXXXXXXXXX`). Search for `9528268564` to find every occurrence.

**Content** — section text, service lists, and town descriptions are plain text inside `index.html`; edit directly.

**Map** — the embedded map in the contact section is a Google Maps iframe built from the business address, no API key required. Replace the `q=` query in its `src` if the address changes.

## Notes & limitations

- The contact form has no backend. Submitting it opens WhatsApp in a new tab with the visitor's details pre-filled as a message — nothing is stored or emailed automatically. Wire it up to a real form service (Formspree, Netlify Forms, etc.) if you want submissions captured elsewhere too.
- The Google Map and Google Fonts require an internet connection to load; they will not appear when previewed in a fully offline environment.
- Tested across common phone widths (320px–428px), tablet, and desktop breakpoints.

## License

Built for Rangoli Properties. All business content, copy, and branding belong to Rangoli Properties.


