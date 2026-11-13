// Fit visible artwork, rather than SVG artboard dimensions, into equal optical slots.
const fit=(width,height)=>{const scale=Math.min(108/width,34/height,Math.sqrt(2200/(width*height)));return {width:width*scale,height:height*scale};};
export function sizeBrandIdentities(){
 document.querySelectorAll('aside .brand-identity').forEach(identity=>{
  const mask=identity.querySelector('.brand-mask');if(mask){const img=new Image();img.onload=()=>{const height=40;mask.style.width=`${Math.min(50,height*img.naturalWidth/img.naturalHeight)}px`;mask.style.height=`${height}px`;};img.src=mask.dataset.src;return;}
  const svg=identity.querySelector('.brand-symbol svg');
  if(svg){const bounds=svg.getBBox();if(bounds.width&&bounds.height){svg.setAttribute('viewBox',`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`);const size=fit(bounds.width,bounds.height);svg.style.width=`${size.width}px`;svg.style.height=`${size.height}px`;}return;}
  const text=identity.querySelector('.brand-wordmark');
  if(text){text.style.transform='none';const range=document.createRange();range.selectNodeContents(text);const bounds=range.getBoundingClientRect();if(bounds.width&&bounds.height){const size=fit(bounds.width,bounds.height);text.style.transform=`scale(${size.width/bounds.width})`;}}
  const img=identity.querySelector('.brand-logo');if(!img)return;
  const loaded=()=>{if(!img.naturalWidth)return;const size=fit(img.naturalWidth,img.naturalHeight);img.style.width=`${size.width}px`;img.style.height=`${size.height}px`;identity.classList.add('logo-loaded');};
  img.onload=loaded;img.onerror=()=>{identity.classList.remove('logo-loaded');img.remove();};if(img.complete&&img.naturalWidth)loaded();
 });
}
document.fonts?.ready.then(()=>sizeBrandIdentities());
