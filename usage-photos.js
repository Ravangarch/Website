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
export function usagePhotos(record){
 if(record.brand==='Dior'&&selections[record.componentModel])return `<div class="project-photos original-usage-photos" data-info-field="photos">${selections[record.componentModel].map(index=>{const [file,caption]=diorUsagePhotos[index],url=`${import.meta.env.BASE_URL}project-photos/dior/${file}`;return `<figure><a class="original-usage-photo" href="${esc(url)}" target="_blank" rel="noopener" aria-label="View original: ${esc(caption)}"><img src="${esc(url)}" alt="${esc(caption)}" loading="lazy" decoding="async"></a><figcaption>${esc(caption)}</figcaption></figure>`;}).join('')}</div>`;
 return `<div class="project-photos" data-info-field="photos">${[0,1,2].map(n=>`<figure><div class="project-image scene-${n}"><canvas data-scene="${n}"></canvas><span>${['EXHIBITION SETTING','DISPLAY DETAIL','INSTALLATION STUDY'][n]}</span></div><figcaption>${esc(record.brand)} — ${['Spatial installation','Material in context','Display composition'][n]}, ${record.year??record.season??'Year not specified'} · simulated image</figcaption></figure>`).join('')}</div>`;
}
