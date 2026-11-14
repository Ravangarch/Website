import {escapeHTML as esc} from './storage.js';
// Original user-supplied PNGs, preserved byte-for-byte from Archive.zip.
export const diorUsagePhotos=[
 ['dior-athem-13-secondes.png','Dior façade with red-lit window silhouettes'],
 ['dior-athem-14-secondes.png','Dior façade covered by a red patterned projection'],
 ['dior-athem-15-secondes.png','Illuminated window outlines and horizontal details around the Dior logo'],
 ['dior-athem-2-secondes.png','Projected figures across the Dior façade at night'],
 ['dior-athem-1-secondes.png','Street view of Dior with window projections and foreground mannequins'],
 ['g-dior-ch-elysees-009.png','Gold radiating light projections around the Dior logo'],
 ['g-dior-champs-elysees10.png','White projected figures across the Dior façade']
];
const selections={
 'dior-window-outlines':[2,4,0],
 'dior-horizontal-lines':[2,5,1],
 'dior-ornaments':[2,5,6],
 'dior-lettering':[0,2,4],
 'dior-projection':[1,3,6]
};
export const sothebysUsagePhotos=[
 ['athem-sothebys-anotherworld_01.png','Sotheby’s corner façade with illuminated window installations'],
 ['athem-sothebys-anotherworld_02.png','Sotheby’s illuminated windows and street-level façade'],
 ['athem-sothebys-anotherworld_03.png','Sotheby’s façade and window installations viewed from across the street']
];
export const nikeUsagePhotos=[
 ['athem-nike-electricprint_01.png','Nike corner façade with red polka-dot spheres and storefront graphics'],
 ['athem-nike-electricprint_02.png','Close-up of red polka-dot spheres on the Nike façade'],
 ['athem-nike-electricprint_03.png','Low-angle view of Nike’s red polka-dot façade installation'],
 ['athem-nike-electricprint_04.png','Side view of red polka-dot spheres across the Nike façade']
];
const nikeSelections={'red-spheres':[0,1,3],'sphere-ribs':[3,0,2],'polka-dots':[1,2,3]};
export const pomellatoUsagePhotos=[
 ['athem-pomellato-02_1920x1080.png','Pomellato storefront with three suspended circular installations'],
 ['athem-pomellato-14_1600x1080.png','Pomellato circular installations and hanging chains above the storefront'],
 ['athem-pomellato-15_1600x1080.png','Close-up of Pomellato’s suspended circular frame and chain'],
 ['athem-pomellato-21_1600x1080.png','Close-up of the jewellery detail within a Pomellato circular installation']
];
const pomellatoSelections={'outer-rings':[1,0,2],'green-surface':[1,0,3],'jewellery':[3,2,1],'chains':[2,1,0],'backing-panels':[0,1,2]};
export const leDamierUsagePhotos=[
 ['Le Damier.png','Louis Vuitton Le Damier façade viewed from the street corner'],
 ['g-athem_champs_elisees_louis_vuitton_20_02_2024_001.png','Street-level view of Louis Vuitton’s Le Damier façade'],
 ['g-athem_champs_elisees_louis_vuitton_20_02_2024_018.png','Close-up of reflective patterned panels in the Le Damier installation'],
 ['g-athem_champs_elisees_louis_vuitton_20_02_2024.png','Angled close-up of Le Damier’s gold and silver façade panels'],
 ['g-athem_champs_elisees_louis_vuitton_20_02_2024_017.png','Louis Vuitton entrance framed by Le Damier’s curved panel installation']
];
const leDamierSelections={'metal-panels':[0,2,3],'panel-backing':[1,4,3]};
export const creatingInfinityUsagePhotos=[
 ['Creating Infinity.png','Louis Vuitton Creating Infinity installation viewed from the street corner at dusk'],
 ['athem-kusama-vuitton_02.png','Evening corner view of Louis Vuitton’s mirrored-sphere façade'],
 ['athem-kusama-vuitton_03.png','Close-up of mirrored spheres beside the Louis Vuitton entrance'],
 ['athem-kusama-vuitton_04.png','Front view of Louis Vuitton’s Creating Infinity façade installation']
];
const creatingInfinitySelections={'mirrored-spheres':[0,2,3],'sphere-segments':[1,3,2]};
export const leSoleilUsagePhotos=[
 ['Le Soleil.png','Close-up of Le Soleil’s central golden sphere and radiating rods'],
 ['louis-vuitton-5.png','Louis Vuitton Le Soleil façade illuminated at night'],
 ['soleil-vendome-02-t.png','Daytime street view of Louis Vuitton’s Le Soleil façade installation'],
 ['soleil-vendome-01-t.png','Angled close-up of Le Soleil’s golden sphere and radiating installation']
];
const leSoleilSelections={'central-sphere':[0,3,2],'radiating-rods':[3,0,2],'lighting':[1,0,2]};
export const fabulousJourneyUsagePhotos=[
 ['athem-01-cartier-the-fabulous-journey-champs-elysees_02.png','Cartier storefront with The Fabulous Journey balloon and illuminated façade'],
 ['athem-01-cartier-the-fabulous-journey-champs-elysees_01.png','Close view of Cartier’s balloon, suspended basket and illuminated clouds'],
 ['Screenshot 2026-11-14 at 00.09.41.png','Close-up of an illuminated cloud in The Fabulous Journey installation']
];
const fabulousJourneySelections={'cartier-balloon-shell':[1,0,2],'cartier-balloon-frame':[1,2,0],'cartier-ropes':[1,0,2],'cartier-basket':[1,2,0],'cartier-clouds':[2,1,0],'cartier-lettering':[1,0,2]};
export const boldBrightUsagePhotos=[
 ['athem-cartier-noel2022_01.png','Cartier storefront with illuminated spheres and decorative light frames at dusk'],
 ['athem-cartier-noel2022_02.png','Evening corner view of Cartier’s illuminated façade'],
 ['athem-cartier-noel2022_03.png','Close-up of Cartier’s illuminated sphere garlands and architectural light frames'],
 ['athem-cartier-noel2022_04.png','Daytime view of white sphere garlands across the Cartier façade']
];
const boldBrightSelections={'cartier-light-spheres':[3,2,0],'cartier-sphere-supports':[3,2,1],'cartier-light-frames':[2,0,1]};
export const sohoUsagePhotos=[
 ['athem-cartier-soho_01.png','Front view of Cartier Soho’s red façade, gold lettering and decorative studs'],
 ['athem-cartier-soho_02.png','Street-side view of Cartier Soho’s red façade installation']
];
const sohoSelections={'cartier-red-panels':[0,1],'cartier-red-finish':[1,0],'cartier-gold-lettering':[0,1],'cartier-studs':[0,1],'cartier-ornament':[1,0]};
export const cartierChristmasUsagePhotos=[
 ['cover2.png','Front view of Cartier’s Christmas panther, garlands and entrance display'],
 ['txt-1.png','Wide street view of Cartier’s Christmas installation at dusk'],
 ['txt-2.png','Close-up of Cartier’s Christmas panther, garlands and hanging gift decorations'],
 ['pano.png','Evening corner view of Cartier’s illuminated Christmas storefront']
];
const cartierChristmasSelections={'cartier-panther':[2,0,3],'cartier-panther-frame':[0,2,1],'cartier-panther-finish':[2,0,3],'cartier-outline':[3,1,2],'cartier-garlands':[2,0,3],'cartier-gifts':[2,0,1],'cartier-ribbons':[2,0,3]};
export const vanCleefWinterUsagePhotos=[
 ['athem-vancleef-winter2023_01.png','Van Cleef & Arpels Winter 2023 storefront with snowdrift displays and decorative trees'],
 ['athem-vancleef-winter2023_02.png','Close view of a Winter 2023 window with miniature houses and snowdrift forms'],
 ['athem-vancleef-winter2023_03.png','Detail of miniature house roofs and a small red sphere in the Winter 2023 display'],
 ['athem-vancleef-winter2023_04.png','Evening view of Van Cleef & Arpels Winter 2023 windows and hanging circular lights']
];
const vanCleefWinterSelections={'vca-snowdrifts':[1,0,3],'vca-snow-finish':[1,2,0],'vca-houses':[2,1,0],'vca-roofs':[2,1,0],'vca-ornaments':[3,1,0],'vca-snowflakes':[1,3,0],'vca-spheres':[2,1,0],'vca-trees':[0,3,1]};
export const vanCleefSpringUsagePhotos=[
 ['van-cleef-arpels-spring-flowers.png','Van Cleef & Arpels Spring 2023 window framed by tall flower stems and blossoms'],
 ['02-van-cleef-arpels-spring-2023-vendome.png','Street view of Van Cleef & Arpels’ Spring 2023 floral façade'],
 ['image003-copie.png','Spring window display with flower buds, small blossoms and turquoise leaves'],
 ['van-cleef-arpels-spring-2023-vendome.png','Close-up of a Spring 2023 flower and its decorative centre']
];
const vanCleefSpringSelections={'vca-stems':[0,1,3],'vca-branches':[0,3,2],'vca-large-petals':[3,0,2],'vca-small-petals':[2,3,0],'vca-centres':[3,2,0],'vca-stamens':[3,2,0],'vca-buds':[2,3,0],'vca-leaves':[2,0,3]};
function originalPhotos(directory,photos,selection){return `<div class="project-photos original-usage-photos${selection.length===2?' two-photos':''}" data-info-field="photos">${selection.map(index=>{const [file,caption]=photos[index],url=`${import.meta.env.BASE_URL}project-photos/${directory}/${encodeURIComponent(file)}`;return `<figure><a class="original-usage-photo" href="${esc(url)}" target="_blank" rel="noopener" aria-label="View original: ${esc(caption)}"><img src="${esc(url)}" alt="${esc(caption)}" loading="lazy" decoding="async"></a><figcaption>${esc(caption)}</figcaption></figure>`;}).join('')}</div>`;}
export function usagePhotos(record){
 if(record.brand==='Van Cleef & Arpels'&&record.project==='Spring 2023'&&vanCleefSpringSelections[record.componentModel])return originalPhotos('van-cleef-arpels/spring-2023',vanCleefSpringUsagePhotos,vanCleefSpringSelections[record.componentModel]);
 if(record.brand==='Van Cleef & Arpels'&&record.project==='Winter 2023'&&vanCleefWinterSelections[record.componentModel])return originalPhotos('van-cleef-arpels/winter-2023',vanCleefWinterUsagePhotos,vanCleefWinterSelections[record.componentModel]);
 if(record.brand==='Cartier'&&record.project==='Christmas'&&cartierChristmasSelections[record.componentModel])return originalPhotos('cartier/christmas',cartierChristmasUsagePhotos,cartierChristmasSelections[record.componentModel]);
 if(record.brand==='Cartier'&&record.project==='Soho'&&sohoSelections[record.componentModel])return originalPhotos('cartier/soho',sohoUsagePhotos,sohoSelections[record.componentModel]);
 if(record.brand==='Cartier'&&record.project==='Bold and Bright'&&boldBrightSelections[record.componentModel])return originalPhotos('cartier/bold-and-bright',boldBrightUsagePhotos,boldBrightSelections[record.componentModel]);
 if(record.brand==='Cartier'&&record.project==='The Fabulous Journey'&&fabulousJourneySelections[record.componentModel])return originalPhotos('cartier/the-fabulous-journey',fabulousJourneyUsagePhotos,fabulousJourneySelections[record.componentModel]);
 if(record.brand==='Louis Vuitton'&&record.project==='Le Soleil'&&leSoleilSelections[record.componentModel])return originalPhotos('louis-vuitton/le-soleil',leSoleilUsagePhotos,leSoleilSelections[record.componentModel]);
 if(record.brand==='Louis Vuitton'&&record.project==='Creating Infinity'&&creatingInfinitySelections[record.componentModel])return originalPhotos('louis-vuitton/creating-infinity',creatingInfinityUsagePhotos,creatingInfinitySelections[record.componentModel]);
 if(record.brand==='Louis Vuitton'&&record.project==='Le Damier'&&leDamierSelections[record.componentModel])return originalPhotos('louis-vuitton/le-damier',leDamierUsagePhotos,leDamierSelections[record.componentModel]);
 if(record.brand==='Dior'&&selections[record.componentModel])return originalPhotos('dior',diorUsagePhotos,selections[record.componentModel]);
 if(record.brand==='Pomellato'&&pomellatoSelections[record.componentModel])return originalPhotos('pomellato',pomellatoUsagePhotos,pomellatoSelections[record.componentModel]);
 if(record.brand==='Nike'&&nikeSelections[record.componentModel])return originalPhotos('nike',nikeUsagePhotos,nikeSelections[record.componentModel]);
 if(record.brand==='Sotheby’s')return originalPhotos('sothebys',sothebysUsagePhotos,record.componentModel==='led-display'?[1,0,2]:[0,2,1]);
 return `<div class="project-photos" data-info-field="photos">${[0,1,2].map(n=>`<figure><div class="project-image scene-${n}"><canvas data-scene="${n}"></canvas><span>${['EXHIBITION SETTING','DISPLAY DETAIL','INSTALLATION STUDY'][n]}</span></div><figcaption>${esc(record.brand)} — ${['Spatial installation','Material in context','Display composition'][n]}, ${record.year??record.season??'Year not specified'} · simulated image</figcaption></figure>`).join('')}</div>`;
}
