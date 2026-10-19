# FORM — Material archive

A school-project demo for discovering materials from previous brand collaborations. All records, ownership details, passports, objects and installation images are fictional. No brand affiliation is implied.

## Development

Requires Node.js 22.12+ (tested with Node 24).

```sh
npm ci --cache /tmp/website-npm-cache
npm run dev
```

`npm run build` creates the production site in `dist`; `npm run preview` serves it locally.

## Features

- Twelve procedural wooden, metal and acrylic objects, across four brands.
- Brand and material filters, search and sorting.
- Interactive Three.js viewer: drag to rotate, scroll/pinch to zoom, automatic 360° rotation, surface inspection and reset.
- Fictional passport, ownership, location, dismantling condition, quantity, volume, properties and year.
- Placeholder project description and three procedurally rendered installation images.
- Responsive layouts and keyboard-accessible controls; Escape closes details.

The models and surface marks are simulated; real photogrammetry scans and project photographs can replace them later. There is no backend or persistent inventory editing.
