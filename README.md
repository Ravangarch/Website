# ATHEM — Material archive

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

The models and surface marks are simulated; real photogrammetry scans and project photographs can replace them later. There is no backend; imported inventory is retained locally in the same browser.

## Brand identities

The monochrome collaboration tiles reference brand logo images hosted by Wikimedia Commons (Chanel, H&M, Louis Vuitton, and Sotheby’s). Brand names remain visible as text fallbacks if the image host is unavailable. These marks belong to their respective owners and are used for this fictional school project. The current cloud network blocks Wikimedia, so external logo loading must also be checked in a normal browser.

## Classroom portal

Every visit begins at the login page. These are browser-only demonstration roles, not secure authentication or server-side access control. Do not store confidential material here.

| Role | Login | Password |
| --- | --- | --- |
| Administrator | admin | admin |
| Chanel | chanel | chanel |
| Louis Vuitton | louisvuitton | louisvuitton |
| H&M | hm | hm |
| Sotheby’s | sothebys | sothebys |

Brand accounts see their own records with year navigation and an Athem × brand identity. Administrators see brand navigation with nested “Show all” and year options. Project tabs include reuse history (original/reuse years and partner), past collaborations, and interactive provisional concepts. The two requested design reference photographs were not included in the conversation; the concepts are illustrative placeholders.

On-display materials include fictional December 2026 dismantling, transport and destination-storage schedules.

### Import demonstration

1. Sign in as `admin`, then select **Add information**.
2. Download the sample Excel and demo STL directly from the import dialog, or use your own files.
3. Upload the 3D model and optional JPEG/PNG/WebP photo or Photoshop PSD source.
4. Import XLSX or CSV and review the parsed rows, or enter a material manually. Upload PDF/DOC/DOCX/PSD as a supporting attachment; these documents are downloadable and do not automatically populate fields.
5. Select **Add to archive**, then open the new material to rotate and inspect its model. Uploaded photos appear in the card and details; all original spreadsheet columns remain accessible in the details.

Excel/CSV headers include `Name`, `Brand`, `Year`, `Material`, `Quantity`, `Volume`, `Location`. French headers include `NOM COMMERCIAL`, `Marque`, `Année`, `Famille`, `Quantité`, `Volume`, `Lieu` and `DATE SAISIE`. Title rows above the header are supported. The first worksheet is imported, with at most 200 records per batch and 40 MB per file. Missing values use the visible defaults. Supported model files are self-contained GLB, STL, and OBJ geometry (OBJ external materials/textures are not loaded). A single uploaded model/photo/document is linked to all records in its batch.

Imported record metadata is saved to localStorage and attachments to IndexedDB. They persist through reloads on the same browser and site, but are not shared across devices or browsers. Clearing site data removes them. Brand accounts can see imported records assigned to them in that same browser.

### Validation

`npm run test:smoke` starts its own Vite server and uses system Chromium (`CHROMIUM_PATH` may override the executable). It tests all five roles, invalid credentials, scoped collections, nested years, project tabs, timelines, French Excel import, malformed CSV feedback, uploaded STL/GLB viewing, photo/PDF attachments, persistence and mobile overflow.
