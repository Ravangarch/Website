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

The five Dior material details use the seven original PNG photographs supplied in `Archive.zip` for their pictures-of-use galleries. Three images are selected per component, with all seven used across the collection. Originals are kept byte-for-byte at `public/project-photos/dior/` with their original filenames, including the 2952 × 1969 gold-light photograph. Gallery previews fill their frames with a centered crop; each photograph links to its complete original file. Mobile galleries stack all three images. Dior usage galleries contain no simulated scene renders; the interactive component models remain illustrative. Other brand galleries and the Photos visibility permission are preserved.

Run `node dior-photos-check.mjs` to verify the galleries, served image bytes, original links, mobile layout, visibility permissions and other-brand fallback.

### Original Sotheby’s photographs

The two Sotheby’s material galleries use all three original PNGs from `Sotheby.zip`, with their order varied by component. The reuse-project page also uses the original corner-façade photograph in place of the recreated illustration. Original filenames and bytes are preserved in `public/project-photos/sothebys/`; photo previews link to complete originals in the galleries, and all three remain visible in the stacked mobile layout. The reuse-page photograph and material galleries respect the Photos visibility setting. Dior’s original-photo galleries and other-brand fallback are retained. Run `node sothebys-photos-check.mjs` and `node dior-photos-check.mjs` to validate these behaviours.

### Original Nike photographs

Nike’s three archive materials use four original PNGs from `Nike 2.zip`, preserved with their original filenames and unchanged bytes in `public/project-photos/nike/`. Each component shows three photographs in a tailored order, with all four used across the collection. Complete image frames are displayed and link to the full originals; mobile galleries retain all three photos. The Photos visibility permission is preserved. Dior and Sotheby’s original-photo galleries remain intact. Run `node nike-photos-check.mjs`, `node dior-photos-check.mjs` and `node sothebys-photos-check.mjs` to validate image loading, original bytes and links, layout, visibility and the other-brand fallback.

### Original Pomellato photographs

Pomellato’s five material galleries use the four original PNGs supplied in `Pomelatto.zip`. The files keep their original names and bytes at `public/project-photos/pomellato/`. Three photos are selected per component, with all four used across the collection. Photo previews link to complete originals, mobile galleries show all three, and Photos visibility permissions are retained. Run `node pomellato-photos-check.mjs` to validate all five galleries, served bytes, original links, mobile layout and visibility permissions.

### Original Louis Vuitton Le Damier photographs

The two **Louis Vuitton → 2021 → Le Damier** material galleries use the five original PNGs from `Le Damier.zip`. Original filenames and bytes, including the 3256 × 2171 façade image, are preserved in `public/project-photos/louis-vuitton/le-damier/`. Three photos are selected per component, with all five used across the project. Photo previews link to complete originals, including the URL-encoded filename `Le Damier.png`. Photos visibility permissions and mobile layout are preserved. Creating Infinity and Le Soleil keep their existing galleries, and project years are unchanged. Run `node le-damier-photos-check.mjs` to validate these behaviours and original served bytes.

### Original Louis Vuitton Creating Infinity photographs

The two **Louis Vuitton → 2021 → Creating Infinity** material galleries use four original PNGs from `Creating Infinity.zip`. Original filenames and bytes are preserved at `public/project-photos/louis-vuitton/creating-infinity/`. Three images are selected per component, with all four used across the project. The complete photos link to the originals and remain visible in the stacked mobile layout. Photo visibility permissions are preserved; Le Damier’s original galleries and Le Soleil’s existing galleries remain intact. Run `node creating-infinity-photos-check.mjs` and `node le-damier-photos-check.mjs` to verify project isolation, image bytes and links, mobile layout and visibility permissions.

### Original Louis Vuitton Le Soleil photographs

The three **Louis Vuitton → 2022 → Le Soleil** material galleries use all four original PNGs from `Le Soleil.zip`, preserved byte-for-byte with their original names at `public/project-photos/louis-vuitton/le-soleil/`. Each component shows three photographs; the lighting component leads with the illuminated night view. Full-frame images link to the original files and remain visible in the mobile stack. Photos visibility permissions, Le Damier and Creating Infinity galleries are preserved. Run `node le-soleil-photos-check.mjs` and `node creating-infinity-photos-check.mjs` to validate project isolation, original image bytes, links, mobile layout and permissions.

### Original Cartier The Fabulous Journey photographs

The six **Cartier → 2025 → The Fabulous Journey** material galleries use the three original PNGs from `The Fabulous Journey.zip`, including the supplied cloud close-up screenshot. Original filenames and bytes are preserved in `public/project-photos/cartier/the-fabulous-journey/`. Each gallery includes all three images in an order tailored to its component; the cloud component leads with the close-up. Photo previews link to complete originals, mobile galleries keep all three images, and Photos visibility permissions remain active. Bold and Bright, Soho and Christmas retain their existing galleries. Run `node fabulous-journey-photos-check.mjs` to verify the six galleries, served image bytes, links, mobile layout, permissions and other Cartier projects.

### Original Cartier Bold and Bright photographs

The three **Cartier → 2026 → Bold and Bright** material galleries use four original PNGs from `Bold & Bright.zip`, kept byte-for-byte with original names in `public/project-photos/cartier/bold-and-bright/`. Each component shows three photos in a tailored order, using all four across the project. Photo previews link to complete originals, all three images remain visible on mobile, and Photos permissions are respected. The existing project year is unchanged. The Fabulous Journey retains its original galleries; Soho and Christmas retain their existing galleries. Run `node bold-bright-photos-check.mjs` and `node fabulous-journey-photos-check.mjs` to verify these behaviours and original image bytes.

### Original Cartier Soho photographs

The five **Cartier → 2024 → Soho** material galleries use both original PNGs from `Soho.zip`, preserved byte-for-byte with their original filenames in `public/project-photos/cartier/soho/`. Each gallery displays the two unique photos without duplicating a third image. A two-column desktop layout stacks on mobile, full frames link to originals, and Photos visibility permissions remain active. The Fabulous Journey, Bold and Bright and Christmas retain their existing galleries. Run `node soho-photos-check.mjs` and `node bold-bright-photos-check.mjs` to validate these behaviours and served image bytes.

### Original Cartier Christmas photographs

The seven **Cartier → Christmas** material galleries use the four original PNGs from `Christmas.zip`, preserved byte-for-byte with original filenames in `public/project-photos/cartier/christmas/`. Three photos are selected per component, with all four used across the project. Complete frames link to the original files, mobile galleries retain all three photos, and Photos visibility permissions are respected. The seasonal Christmas grouping remains without an invented year. The Fabulous Journey, Bold and Bright and Soho retain their existing original-photo galleries. Run `node cartier-christmas-photos-check.mjs` and `node soho-photos-check.mjs` to verify the seven galleries, original image bytes, links, layout, permissions and project isolation.

### Original Van Cleef & Arpels Winter 2023 photographs

The eight **Van Cleef & Arpels → 2023 → Winter 2023** material galleries use four original PNGs from `Winter 2023.zip`, kept byte-for-byte with their original names in `public/project-photos/van-cleef-arpels/winter-2023/`. Three photos are selected per component, with all four used across the collection. Photo previews link to complete originals, mobile galleries retain all three images, and Photos permissions are respected. Spring 2023 keeps its existing galleries. Run `node vancleef-winter-photos-check.mjs` to validate the eight galleries, served image bytes, links, mobile layout, permissions, admin navigation and project isolation.

### Original Van Cleef & Arpels Spring 2023 photographs

The eight **Van Cleef & Arpels → 2023 → Spring 2023** material galleries use four original PNGs from `Spring 2023.zip`, preserved byte-for-byte with their original filenames in `public/project-photos/van-cleef-arpels/spring-2023/`. Three photos are selected per component, with all four used across the collection, including the original window-display close-up. Photo previews link to complete originals; mobile galleries retain all three images, and Photos visibility permissions are respected. Winter 2023’s original-photo galleries remain intact. Run `node vancleef-spring-photos-check.mjs` and `node vancleef-winter-photos-check.mjs` to validate both projects, served image bytes, links, mobile layout, permissions and admin navigation.

### Original H&M Sound Wave photographs

The eleven **H&M → 2024 → Sound Wave** material galleries use four original PNGs from `The Red Sound Wave.zip`, preserved byte-for-byte with original filenames in `public/project-photos/hm/sound-wave/`. Three images are selected per component, with all four used across the project. Full-frame images link to the original files; mobile galleries keep all three images and Photos visibility permissions remain active. The existing project name and year are preserved. H&M’s 2023 and 2025 collections and the separate 2024 reflective-disc components keep their existing galleries. Run `node sound-wave-photos-check.mjs` to validate all eleven galleries, image bytes, links, layout, permissions, admin access and project isolation.

### Original shared H&M x RABANNE photographs

Both **H&M → 2023 → H&M x RABANNE** and **Paco Rabanne → 2023 → H&M x RABANNE** list the same two specified components: Reflective sequin façade and Reflective hanging decorative elements, each described as Aluminium sheets. The two Paco listings are added at IDs 1115–1116; H&M’s existing IDs 1034–1035 and all earlier Paco IDs are retained. Each component gallery uses all three original PNGs from `H&M Rabanne.zip`, preserved byte-for-byte at `public/project-photos/hm-rabanne/`, with edge-to-edge previews, original links, mobile stacking and Photos permissions. The other collections retain their existing records and galleries. Paco Rabanne now has 17 seeded records and the archive contains 132 seeded materials. Run `node hm-rabanne-photos-check.mjs`, `node sound-wave-photos-check.mjs` and `node hm-check.mjs` to validate both brands, unique IDs, original bytes, layout, permissions and retained collections.

### Original H&M 2023 layered-panel photographs

The four original PNGs from `H&M 2023.zip` are used for H&M’s nine previously specified 2023 layered-panel components: rectangular, semi-translucent, gold and white panels, printed typography, H&M logo, supporting structure, mounts and lighting. These unnamed 2023 components are restored with their original IDs 1025–1033, separate from **H&M x RABANNE** (IDs 1034–1035), whose records and photographs remain intact under both brands. Existing H&M records retain their IDs and ordering. Original photo bytes and filenames, including the 5750 × 2906 street panorama, are kept in `public/project-photos/hm/2023-panels/`. Three images per component link to originals, preserve complete frames, stack on mobile and respect Photos visibility. H&M has 36 seeded materials, with eleven under 2023 including the two Rabanne components; the archive contains 141 materials. Run `node hm-2023-photos-check.mjs`, `node hm-rabanne-photos-check.mjs` and `node hm-check.mjs` for gallery, metadata, ID, layout, permission and collection-isolation checks.

### Original H&M 2025 floral-façade photographs

The seven **H&M → 2025** material galleries use the three original PNGs from `H&M 2025.zip`, preserved byte-for-byte with original filenames in `public/project-photos/hm/2025-floral/`. Each component includes all three images in a tailored order, with the illuminated perimeter leading with the evening view. Photo previews link to complete original files, mobile galleries retain all three images, and Photos visibility permissions are respected. The existing collection year and material specifications, including perforated Lycra fabric, are unchanged. The 2023 panels, H&M x RABANNE, Sound Wave and shared-disc groups retain their existing galleries. Run `node hm-2025-photos-check.mjs` and `node sound-wave-photos-check.mjs` to verify all seven galleries, original bytes, links, mobile layout, permissions and project isolation.

### Original Ralph Lauren Monumental RL 888 photographs

The ten **Ralph Lauren → 2025 → Monumental RL 888** material galleries use all three original PNGs from `Ralph Lauren.zip`, preserved byte-for-byte with their original filenames, including `Ralpj.png`, in `public/project-photos/ralph-lauren/monumental-rl-888/`. Each gallery includes the three original photos in a component-specific order, links to original files, stacks on mobile and respects Photos visibility permissions. Record names, specifications, year and IDs remain unchanged. Run `node ralph-lauren-photos-check.mjs` to validate all ten galleries, served image bytes, original links, mobile layout, permissions and the other-brand fallback.

### Original Paco Rabanne Iconique 1969 photographs

The eight **Paco Rabanne → 2025 → Iconique 1969** material galleries use four original PNGs from `Paco Rabanne.zip`, preserved byte-for-byte with original filenames in `public/project-photos/paco-rabanne/iconique-1969/`. Three photos are selected per component, with all four used across the project. Photo previews link to complete original files, mobile galleries retain all three photos, and Photos visibility permissions remain active. The existing project name and year are unchanged. H&M x RABANNE keeps its existing images under both brands; the separate 2024 reflective-disc records are unchanged. Run `node paco-iconique-photos-check.mjs` and `node hm-rabanne-photos-check.mjs` for original byte, layout, link, permission and project-isolation checks.

### Original Guerlain photographs

Guerlain’s five archive material galleries use the four original PNGs from `Guerlain.zip`, preserved byte-for-byte with original filenames in `public/project-photos/guerlain/`. Three photos are selected per component, with all four used across the bee, illuminated outlines, honeycomb, foliage and star records. Photo previews link to complete originals, mobile galleries keep all three images, and Photos visibility permissions remain active. Existing material names, years, IDs and other collections are unchanged. Run `node guerlain-photos-check.mjs` and `node dior-photos-check.mjs` to verify gallery loading, served bytes, original links, layout, permissions and the other-brand fallback.

### Original Polène photographs and border-free gallery previews

The two **Polène → 2025 → Blossoming Lether** material galleries use all four original PNGs from `Polene.zip`, preserved byte-for-byte with original filenames in `public/project-photos/polene/blossoming-lether/`. Three photos are selected per component and link to the complete original files.

All original-photo material galleries now use border-free, edge-to-edge previews with centered `object-fit: cover`, replacing the dark letterbox background and `contain` display. This creates a mild display crop where aspect ratios differ; source files remain unchanged, and original links retain the complete image. Mobile stacking, two-photo desktop layouts and Photos visibility permissions are preserved. Run `node polene-photos-check.mjs`, `node vancleef-spring-photos-check.mjs` and `node hm-2023-photos-check.mjs` to validate the new photos and layout across normal, portrait and panoramic image proportions.

### One year for single-project brand archives

Sotheby’s, Nike, Pomellato and Guerlain no longer alternate their archive components between the placeholder years 2025 and 2026: all their scans are grouped under **2025**, matching the first and predominant year already used. Polène, Ralph Lauren and Longchamp already use 2025; Dior remains in 2026. Explicit multi-project dates for Louis Vuitton, Cartier, Van Cleef & Arpels, H&M and Paco Rabanne remain unchanged, including Cartier’s year-free Christmas season. IDs, passports, photo assignments and material specifications are preserved. The generator now uses a consistent 2025 fallback when a component has no supplied year. Run `node collection-years-check.mjs` to verify all eight single-project brands, brand/admin navigation, detail years and retained multi-project dates.

Guerlain reference structures: `guerlain-structures.js` supplies connected, open timber hexagonal frames and a dark metal bee cage with body hoops, detached ribbed wings and attachment tabs. These are procedural visual approximations of the supplied workshop references, not measured scans. The two records’ material descriptions reflect the visible construction; usage photographs and other Guerlain models remain unchanged. Run `node guerlain-structures-check.mjs` for geometry and viewer regression checks.

Nike reference surfaces: `nike-structures.js` gives the rounded red façade forms and painted surface sample a deterministic irregular black-spot pattern, with varied sizes and elongated contours based on the supplied installation references. Internal ribs and original usage photographs are preserved. Run `node nike-structures-check.mjs` for viewer checks.

Le Damier reference panels: `le-damier-structures.js` replaces the plain rectangular samples with a gently bowed diamond checkerboard of gold panels bearing repeated oval surface relief and reflective silver panels. This is a procedural visual approximation of the installation references. The hidden backing, project dates, IDs and original photographs remain unchanged. Run `node le-damier-structures-check.mjs` for viewer and close-up checks.

Creating Infinity reference forms: `creating-infinity-structures.js` supplies smooth polished oval mirror forms in varied sizes and convex shell segments with thin rims. A shared, low-resolution procedural street-and-sky reflection texture gives readable chrome reflections without heavy environment prefiltering. These are visual approximations, not measured scans; original project photographs, dates and IDs remain unchanged. Run `node creating-infinity-structures-check.mjs` for viewer, rotation, zoom and close checks.

Le Soleil reference components: `le-soleil-structures.js` supplies a textured convex gold centre, 192 slender gold tubes in a shallow radial array, and a warm illuminated interpretation with perimeter lighting. The repeated tubes use instanced geometry. These are procedural visual approximations of the supplied day/night references; original photographs, dates and IDs remain unchanged. Run `node le-soleil-structures-check.mjs` for all three viewers and their rotation/zoom controls.
