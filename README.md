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

- 97 fictional material records and procedural previews across 13 brands.
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
| Sotheby’s | sothebys | sothebys |
| Nike | nike | nike |
| Pomellato | pomellato | pomellato |
| Louis Vuitton | louisvuitton | louisvuitton |
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

`npm run test:smoke` starts its own Vite server and uses system Chromium (`CHROMIUM_PATH` may override the executable). It tests all 13 brand accounts plus administrator access, invalid credentials, scoped collections, nested years, project tabs, timelines, French Excel import, malformed CSV feedback, uploaded STL/GLB viewing, photo/PDF attachments, persistence and mobile overflow.

The **Who are we** tab contains the supplied ATHEM studio, CSR and EcoVadis description. Brand inventory is scoped to the signed-in brand; **Past projects** is a public case-study selection across all 13 collaborations, with year navigation.

## Expanded material collection

The demo now has 97 seeded materials across 13 brands, including 46 specified components across seven tailored collections. Eight additional examples per brand cover thermoformed Kairlin bio-based composite, leather-effect mineral-tinted plaster, plywood, textile netting, projection screens, adjustable metal jacks, LED lighting, and structural truss sections. Each includes a procedural 3D preview, fictional passport, quantity, volume, physical properties and usage description. The category filters and admin entry/import flow recognise the expanded material families. These are illustrative classroom samples, not measured product specifications.

The built-in Visitor login has been removed and cannot be used or recreated.

Administrators can remove objects or projects from their detail window. A confirmation is required and an immediate **Undo removal** action is available. Removals are saved locally in this browser and apply to all demo accounts here, including after a reload; they do not delete shared server data or uploaded attachment files. Brand accounts cannot invoke removal.

**Last Chance!** is a shared demo clearance gallery beside Who are we. Six fictional slightly damaged items include reduced per-unit prices, October 2026 dismantling dates, and planned recycling dates in November/December 2026. Deadlines appear in red beside grid titles and above detail titles. They are illustrative dates, not an automatic recycling or payment system.

The reuse tab now presents **Une histoire en plusieurs scènes**, the supplied Sotheby’s case study, with its original French description. The previous fictional reuse records have been removed. The building image is an illustration recreated from the screenshot, clearly captioned as such; no project year or reuse date has been invented. The case study is visible to every account, and administrators retain removal/undo controls. The Last Chance tab and heading use the same red as recycling deadlines (`#bc2525`).

Brand identities are defined in `brands.js`, in the requested menu order. Nike and Dior SVG marks are bundled from Simple Icons v8.15.0 (CC0 collection; trademarks belong to their owners). Other logo references use Wikimedia Commons with text fallbacks when assets cannot load; external logo loading could not be verified on the restricted cloud network. Inline marks follow the exact `#7c7a7a` colour and turn white on hover/selection. Chanel sign-in has been removed; browser-local imported Chanel records are reassigned to Guerlain, while their IDs and attachments are preserved. Existing seeded material IDs are retained for the original brands (Chanel becomes Guerlain); additional seeds and project IDs use disjoint ranges below the imported-record range.


Logo sizing uses individual profiles bounded by a 108px Longchamp-width cap and 36px LV-height cap. Nike and Dior fill more of the available width; Pomellato has a smaller 96px cap. Visible SVG bounds are normalized, and externally loaded images have empty margins removed for display when CORS permits pixel access. Original source assets are retained unchanged, with natural-dimension sizing as a fallback.

## Brand-specific component collections

`brand-collections.js` replaces the generic archive entries for Sotheby’s (2), Nike (3), Pomellato (5), Louis Vuitton (7), Polène (3), and Guerlain (5), using the supplied component names and material choices. Other brands retain their existing collections. The components have distinct procedural previews: inset timber frames, LED modules, red spheres and rib cages, jewellery rings/chains, metal panels and sphere assemblies, flowers/stems/tassels, and bee/honeycomb/star structures. These are fictional 3D examples rather than measured scans. The main bee frame’s material is explicitly unspecified because only its function was supplied.

Regular models have no simulated scratch geometry and all standard seeded conditions are good/no visible defects (or N/A at dismantling for items still on display). Slight-damage records are confined to Last Chance. The six existing Last Chance items are preserved separately before the brand collection replacement. Admin-imported records and files are retained.

## Cartier project hierarchy

YSL and its demo account have been removed. Cartier’s archive contains 21 clean procedural components grouped as: **2025 → The Fabulous Journey** (6), **2026 → Bold and Bright** (3), **2024 → Soho** (5), and **Christmas → Christmas** (7). Christmas has no fabricated year. Both brand and admin navigation can expand a year/season to reveal project names and filter the scans; each scan names its project in the card and detail window. The desktop sidebar is wider and scrolls vertically. Optional project names can also be supplied manually or through Excel/CSV (`Project` / `Projet`).

Thumbnail rendering copies the entire WebGL drawing buffer into each preview canvas, including on high-density displays. Run `npm run test:thumbnails` to verify all 97 seeded archive previews have visible, centred artwork with unclipped margins at 1×, 2× and 3× device pixel ratios. The main smoke suite also runs at 2× pixel density.

## Unit location maps

Each material detail now includes a schematic Paris-area map, individual unit identifiers, rack/shelf positions for stored units, and a link to an OpenStreetMap street map. Standard seeded components have several units; quantities explicitly supplied by imports are preserved. In-storage units are assigned to an illustrative Athem workplace position, while with-brand/on-display units are distributed across Paris venues for their brand. The workplace coordinate is a labelled placeholder, not a verified address, and venue coordinates/allocations are approximate demo data. Provisional designs show planned allocations rather than claiming physical inventory. Up to 50 units are listed individually, with the full count retained for larger quantities.

Each non-storage unit now has its own store allocation. Numbered map pins and unit buttons select the same location, update the displayed address and coordinates, and change the **Open in Google Maps** link. Every unit also has its own Google Maps link beneath its row. Additional example branches are explicitly labelled as demo positions; they are not a verified retail directory. Stored units continue to use the Athem workplace with distinct racks/shelves.

## Add brands and manage uploaded inventory

Administrators have **Add brand** beside **Add information**. Enter the brand name, optionally upload an SVG/PNG/JPEG/WebP logo, import its XLSX/CSV, and attach up to 30 GLB/STL/OBJ scans plus up to 8 photos. A new brand can also be created empty and populated later. Its sidebar identity uses the same grey/white styling and optical size limits, and it receives a browser-local demo login/password from its normalized name (e.g. `Atelier & Co` → `atelierco` / `atelierco`). Duplicate and reserved names are rejected.

**Add information** also supports logo uploads for the selected brand, multiple scans/photos, and optional storage name, address, latitude and longitude. Enter both coordinates; zero is supported. New-brand templates use the entered brand name. Excel/CSV may use `Scan` for exact model filenames; otherwise use one shared scan, matching material/model basenames, or one scan per row. Multiple scans without a worksheet create one record per scan. Batch photos and supporting documents are shared with the imported rows. Extra unmatched scans are rejected rather than silently discarded.

`Latitude`, `Longitude`, `Storage name`, and `Storage address` columns override form defaults per material. Coordinates drive storage pins and Google Maps links; outside-Paris coordinates use a fitted generic schematic area. Brand storage defaults are reused for subsequent imports. SVG logos render as image assets rather than injected SVG markup. Custom names are escaped in the interface.

Custom brand metadata/settings and records persist in localStorage; original files persist in IndexedDB. Logo display URLs are hydrated on each visit. These changes are local to this browser/site and are not deployed to other users or devices. Built-in seeded collections are not generated for user-created brands.

Run `npm run test:brand-admin` for creation, duplicate handling, logo persistence/update, brand-specific Excel, multiple scan/photo uploads, per-row/default coordinate validation, custom logins, empty-brand creation and mobile layout.

## Material edits, Notes and profiles

Open a material and choose **Edit information** to change its metadata, project/year, description, quantities and storage coordinates. Administrators can edit all permitted records; primary brand logins can edit their own records. **Notes** appears directly below **Year created**, saves after a short typing pause, and flushes pending edits on close. Metadata changes persist in `athem-material-edits` in this browser.

**Add profile** creates a named login with an editable generated password. **Profiles & access** lists configured logins by brand, allows access/password changes and disabling, and removes delegated profiles. Primary accounts remain available for management and cannot be deleted. The list describes enabled accounts, not live online sessions. Password changes store salted PBKDF2 hashes; existing passwords are not displayed.

Administrators choose brands, tabs, visible metadata fields, and add/edit/profile-management rights. Brand managers can delegate only their own brand and permissions; they can grant editing but cannot grant adding information. Delegated access is intersected with its granting profile, so disabling/removing a parent also invalidates its descendants. Location display requires Quantity and Passport access because unit lists expose these values. Supporting-document access exposes complete uploaded files, while raw spreadsheet fields are displayed only with full metadata access.

Profiles and permissions are browser-local classroom controls, not server-enforced authentication. Public seed assets remain accessible, and edits/profiles do not sync across browsers or devices. Run `npm run test:profiles` for editing, autosave, profile creation, generated/editable passwords, scoped brands/tabs/fields, permission updates and deletion.

### Field editing and built-in login removal

Profiles have independent visible and editable field selections. Editing requires field visibility and an editable-field grant inherited from the managing profile. Existing profiles retain their previous editable visible fields when no explicit selection was saved. Digital Material Passport can only be edited by admin. Weight (kg per unit) supports non-negative values and has independent visibility/edit permissions; unspecified weights remain blank. Notes autosave follows its own edit grant.

Admin can remove built-in brand logins from either profile screen. Removal persists as a disabled login, revokes dependent profiles, and retains the brand inventory and saved material edits. Admin and the current profile cannot be removed. These remain browser-local demo controls, not server-side security.

Validation: `node permissions-check.mjs`, `node permissions-browser-check.mjs`, `npm run test:profiles`, and `npm run build -- --base=/Website/`.

### Notes workspaces

Notes are private to the admin workspace or to a single brand workspace. Single-brand profiles share that brand’s notes; admin and multi-brand admin-delegated profiles share admin notes. Admin cannot view brand notes in the portal. Notes in the detail view and material editor use the same workspace, including after reload. Older shared notes have no author/workspace metadata: they are retained in local storage but hidden from all workspaces rather than assigned to an unverified owner. Notes permissions still govern reading and editing. This separation is within the browser-local demo; it does not provide server-side privacy against access to browser storage.

### Brand editing limits

Brand accounts and single-brand delegated profiles can edit only Current place, Unit locations/coordinates, and their own brand Notes. Existing broader field grants no longer allow other material edits. Brand managers can delegate these three fields within their own effective permissions. Admin editing and the separate Notes workspaces remain unchanged.

### Van Cleef & Arpels — 2023

The archive contains 16 specified components for Van Cleef & Arpels, replacing its eight generic samples. Under **2023**, **Winter 2023** contains eight snowdrift, house, ornament, snowflake, sphere and tree components; **Spring 2023** contains eight stem, petal, centre, stamen, bud and leaf components. Each uses the supplied material description and a dedicated procedural 3D preview. These are illustrative classroom models, not measured scans. Record IDs 900–915 keep this collection separate from existing components. The archive now contains 105 seeded materials.

Run `node vancleef-check.mjs` to verify the 16 records, labels, years, projects, geometry, thumbnails, detail controls, admin navigation and mobile layout.

### H&M and Paco Rabanne façade components

H&M now has 34 specified components: seven in **2025**, eighteen in **2024** (eleven in **Sound Wave** plus seven reflective-disc components), and nine in **2023**. The seven reflective-disc components are also listed for Paco Rabanne in **2024**, with the same names and material descriptions and separate stable inventory IDs. No project name is invented for the unnamed groups. The perforated background is explicitly **perforated Lycra fabric**; the glossy red finish is **vitreous enamel on suitable metal panels**.

The generic H&M/Paco archive records are replaced by these components. IDs 1000–1033 and 1100–1106 avoid other collections. Matching procedural previews illustrate the components; they are not measured scans. The archive contains 127 seeded materials. Run `node hm-check.mjs` to check years, Sound Wave, shared components, material labels, geometry, thumbnails, detail views, mobile layout and admin navigation.

### Ralph Lauren, Paco Rabanne and Longchamp — 2025

- **Ralph Lauren → 2025 → Monumental RL 888:** ten leather-effect panel, strap, stitching, rivet and RL logo components.
- **Paco Rabanne → 2025 → Iconique 1969:** eight decorative disc, perforation, cut-out, connection and surface-finish components. Its seven shared reflective-disc components remain under **2024**, retaining their IDs.
- **Longchamp → 2025 → Longchamp x ToiletPaper:** twelve façade graphic, cloud, horse, banana, pipe, baguette, tiger, surreal object, signage, surround and backdrop components.

Material descriptions reproduce the supplied specifications, including EPS, GRP, polyurethane foam, vinyl and aluminium composite where specified. Every component has an illustrative procedural preview, not a measured scan. Ralph Lauren IDs 1200–1209 and Longchamp IDs 1300–1311 replace their generic archive examples; the new Paco records append at 1107–1114. The archive has 141 seeded materials. Run `node facade-2025-check.mjs` to verify the new collections, geometry, detail descriptions, navigation, mobile layout and preserved Paco 2024 records.

### Dior — 2026

Dior’s five specified lighting components are grouped under **2026 → Dior-Champs=Elyssess**, preserving the supplied project spelling. They cover window outlines, horizontal architectural lines, circular ornaments, illuminated DIOR lettering and projection/backlighting around the logo, using the supplied material descriptions. Dedicated emissive procedural previews illustrate the components rather than measured scans. Dior IDs 1400–1404 replace its generic archive examples; the archive now contains 138 seeded materials. Run `node dior-check.mjs` to verify descriptions, project/year filters, illuminated geometry, rendered thumbnails, model controls, mobile layout and admin navigation.

### Polène and H&M x RABANNE adjustments

Polène’s archive is **2025 → Blossoming Lether**, retaining the existing main year and supplied project spelling. Its two components are **Sculptural flower petals — Thermoformed Kairlin (bio-based composite)** and **Leather-effect petal surfaces — Mineral mass tinted plaster coating, imitating leather texture**, with dedicated curved-petal and textured coating previews. These replace the earlier metal-petal/stem/tassel examples.

H&M’s former nine unnamed 2023 examples are replaced by **2023 → H&M x RABANNE**, containing **Reflective sequin façade** and **Reflective hanging decorative elements**, both specified as **Aluminium sheets**. Reflective tile and suspended-element previews illustrate these components. H&M’s 2024/2025 collections and Paco Rabanne’s collections remain unchanged. New H&M IDs 1034–1035 and Polène IDs 1500–1501 avoid inheriting unrelated edits or notes from replaced records. The archive now contains 130 seeded materials. Run `node polene-hm-check.mjs` and `node hm-check.mjs` to validate the revised collections and retained groups.

### Original Dior photographs

The five Dior material details use the seven original PNG photographs supplied in `Archive.zip` for their pictures-of-use galleries. Three images are selected per component, with all seven used across the collection. Originals are kept byte-for-byte at `public/project-photos/dior/` with their original filenames, including the 2952 × 1969 gold-light photograph. CSS displays the full frame without cropping; each photograph links to its original file. Mobile galleries stack all three images. Dior usage galleries contain no simulated scene renders; the interactive component models remain illustrative. Other brand galleries and the Photos visibility permission are preserved.

Run `node dior-photos-check.mjs` to verify the galleries, served image bytes, original links, mobile layout, visibility permissions and other-brand fallback.

### Original Sotheby’s photographs

The two Sotheby’s material galleries use all three original PNGs from `Sotheby.zip`, with their order varied by component. The reuse-project page also uses the original corner-façade photograph in place of the recreated illustration. Original filenames and bytes are preserved in `public/project-photos/sothebys/`; full-frame images link to originals in the galleries, and all three remain visible in the stacked mobile layout. The reuse-page photograph and material galleries respect the Photos visibility setting. Dior’s original-photo galleries and other-brand fallback are retained. Run `node sothebys-photos-check.mjs` and `node dior-photos-check.mjs` to validate these behaviours.
