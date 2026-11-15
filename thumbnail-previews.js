import manifest from './thumbnail-manifest.json';
import {thumbnailKey} from './thumbnail-key.js';

// Grid cards use prepared images. Interactive models are created only on demand.
export function showSavedPreview(canvas,record,onMissing){
 const file=manifest[thumbnailKey(record)];if(!file)return false;
 const image=new Image(420,320);image.className='model-thumbnail';image.alt='';image.loading='lazy';image.decoding='async';
 image.onerror=()=>{if(!image.isConnected)return;image.replaceWith(canvas);onMissing();};
 image.src=`${import.meta.env.BASE_URL}model-thumbnails/${file}`;canvas.replaceWith(image);return true;
}
const pending=[];let scheduled=false;
function drain(){scheduled=false;let job;while((job=pending.shift())){if(!job.canvas.isConnected)continue;job.run();break;}if(pending.length)schedule();}
function schedule(){if(scheduled)return;scheduled=true;if('requestIdleCallback'in window)requestIdleCallback(drain,{timeout:250});else setTimeout(drain,16);}
const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);const job=entry.target._previewJob;delete entry.target._previewJob;if(job){pending.push(job);schedule();}}},{rootMargin:'180px'});
export function scheduleLivePreview(canvas,run){const job={canvas,run};if(observer){canvas._previewJob=job;observer.observe(canvas);}else{pending.push(job);schedule();}}
export function clearPendingPreviews(){observer?.disconnect();pending.length=0;}
