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

- 124 fictional material records and procedural previews across 14 brands.
- Brand and material filters, search and sorting.
- Interactive Three.js viewer: drag to rotate, scroll/pinch to zoom, automatic 360° rotation, surface inspection and reset.
- Fictional passport, ownership, location, dismantling condition, quantity, volume, properties and year.
- Placeholder project description and three procedurally rendered installation images.
- Responsive layouts and keyboard-accessible controls; Escape closes details.

The models and surface marks are simulated; real photogrammetry scans and project photographs can replace them later. There is no backend; imported inventory is retained locally in the same browser.

## Brand identities

The monochrome collaboration menu uses locally bundled Nike and Dior marks and external Wikimedia Commons logo references for the remaining brands. Brand names remain visible as text fallbacks if the image host is unavailable. These marks belong to their respective owners and are used for this fictional school project. The current cloud network blocks Wikimedia, so external logo loading must also be checked in a normal browser.

## Classroom portal

Every visit begins at the login page. These are browser-only demonstration roles, not secure authentication or server-side access control. Do not store confidential material here.

| Role | Login | Password |
| --- | --- | --- |
| Administrator | admin | admin |
| Prospective visitor | visitor | visitor |
| Sotheby’s | sothebys | sothebys |
| Nike | nike | nike |
| Pomellato | pomellato | pomellato |
| Louis Vuitton | louisvuitton | louisvuitton |
| Yves Saint Laurent | yvessaintlaurent | yvessaintlaurent |
| Cartier | cartier | cartier |
| Van Cleef & Arpels | vancleefarpels | vancleefarpels |
| H&M | hm | hm |
| Ralph Lauren | ralphlauren | ralphlauren |
| Paco Rabanne | pacorabanne | pacorabanne |
| Longchamp | longchamp | longchamp |
| Guerlain | guerlain | guerlain |
| Polène | polene | polene |
| Dior | dior | dior |

Brand accounts see their own records with year navigation and an Athem × brand identity. Administrators see brand navigation with nested “Show all” and year options. Project tabs include the supplied Sotheby’s reuse case study, past collaborations, and interactive provisional concepts. The provisional designs reconstruct the supplied detachable steel frame and folded metal petals as illustrative, rotatable 3D studies. Each brand can explore both designs. The frame also offers a packed transport view. A recreated visual study based on the supplied boards accompanies the models; these are approximations rather than measured engineering models.

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

`npm run test:smoke` starts its own Vite server and uses system Chromium (`CHROMIUM_PATH` may override the executable). It tests all 14 brand accounts plus administrator and visitor roles, invalid credentials, scoped collections, nested years, project tabs, timelines, French Excel import, malformed CSV feedback, uploaded STL/GLB viewing, photo/PDF attachments, persistence and mobile overflow.

The **Who are we** tab contains the supplied ATHEM studio, CSR and EcoVadis description. Brand inventory is scoped to the signed-in brand; **Past projects** is a public case-study selection across all 14 collaborations, with year navigation.

## Expanded material collection

The demo now has 124 seeded materials across 14 brands (8 or 11 per brand). Eight additional examples per brand cover thermoformed Kairlin bio-based composite, leather-effect mineral-tinted plaster, plywood, textile netting, projection screens, adjustable metal jacks, LED lighting, and structural truss sections. Each includes a procedural 3D preview, fictional passport, quantity, volume, physical properties and usage description. The category filters and admin entry/import flow recognise the expanded material families. These are illustrative classroom samples, not measured product specifications.

The `visitor` demo account can browse the same brands, years and project tabs as an administrator, but cannot open or submit the Add information form.

Administrators can remove objects or projects from their detail window. A confirmation is required and an immediate **Undo removal** action is available. Removals are saved locally in this browser and apply to all demo accounts here, including after a reload; they do not delete shared server data or uploaded attachment files. Brand and visitor accounts cannot invoke removal.

**Last Chance!** is a shared demo clearance gallery beside Who are we. Six fictional slightly damaged items include reduced per-unit prices, October 2026 dismantling dates, and planned recycling dates in November/December 2026. Deadlines appear in red beside grid titles and above detail titles. They are illustrative dates, not an automatic recycling or payment system.

The reuse tab now presents **Une histoire en plusieurs scènes**, the supplied Sotheby’s case study, with its original French description. The previous fictional reuse records have been removed. The building image is an illustration recreated from the screenshot, clearly captioned as such; no project year or reuse date has been invented. The case study is visible to every account, and administrators retain removal/undo controls. The Last Chance tab and heading use the same red as recycling deadlines (`#bc2525`).

Brand identities are defined in `brands.js`, in the requested menu order. Nike and Dior SVG marks are bundled from Simple Icons v8.15.0 (CC0 collection; trademarks belong to their owners). Other logo references use Wikimedia Commons with text fallbacks when assets cannot load; external logo loading could not be verified on the restricted cloud network. Inline marks follow the exact `#7c7a7a` colour and turn white on hover/selection. Chanel sign-in has been removed; browser-local imported Chanel records are reassigned to Guerlain, while their IDs and attachments are preserved. Existing seeded material IDs are retained for the original brands (Chanel becomes Guerlain); additional seeds and project IDs use disjoint ranges below the imported-record range.

YSL now uses a locally bundled transparent monogram (`assets/ysl.png`), prepared by removing the green background from the supplied reference. It is rendered as an alpha mask in the exact navigation colour, with white hover/selection states, and does not depend on the external Wikimedia logo. Its tall silhouette receives a 40px optical height alongside the balanced wide wordmarks.
