import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {componentModel} from './brand-collections.js';
import {centerModel,frameModel} from './models.js';
import {createViewerRenderLoop} from './viewer-render-loop.js';
import {escapeHTML as esc} from './storage.js';
import {poleneUsagePhotos,soundWaveUsagePhotos,pacoIconiqueUsagePhotos,vanCleefSpringUsagePhotos,creatingInfinityUsagePhotos} from './usage-photos.js';
const definitions=[
 ['Polène','Blossoming Lether',2025,'polene/blossoming-lether',poleneUsagePhotos[1],'support-polene','polene-kairlin-petals','polene-plaster-petals'],
 ['H&M','Sound Wave',2024,'hm/sound-wave',soundWaveUsagePhotos[0],'support-wave','hm-wave-shell','hm-sculptures'],
 ['Paco Rabanne','Iconique 1969',2025,'paco-rabanne/iconique-1969',pacoIconiqueUsagePhotos[0],'support-discs','f25-gold-discs','f25-silver-discs'],
 ['Van Cleef & Arpels','Summer',2023,'van-cleef-arpels/spring-2023',vanCleefSpringUsagePhotos[0],'support-spring','vca-stems','vca-large-petals'],
 ['Louis Vuitton','Creating Infinity',2021,'louis-vuitton/creating-infinity',creatingInfinityUsagePhotos[0],'support-spheres','mirrored-spheres','sphere-segments']
];
export const pastProjectCases=definitions.map(([brand,name,year,directory,photo,...models],i)=>({id:5000+i,brand,name,project:name,year,directory,photo,models,category:'past',type:'Structure',place:'With the brand',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}));
function rotatingModel(host,record){
 const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(0xffffff,0x8b8073,2.5));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(3,4,5);scene.add(light);
 const model=centerModel(componentModel(record.componentModel,record.brand));scene.add(model);
 let renderer,controls,loop,resize;const camera=new THREE.PerspectiveCamera(35,1,.01,100);
 try{
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;host.append(renderer.domElement);
  controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enableZoom=false;controls.enablePan=false;controls.autoRotate=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.autoRotateSpeed=1.3;
  const size=()=>{const width=host.clientWidth,height=host.clientHeight;renderer.setSize(width,height);frameModel(camera,model,width/height,controls);loop?.requestRender();};
  size();loop=createViewerRenderLoop({host,controls,render:()=>renderer.render(scene,camera)});resize=new ResizeObserver(size);resize.observe(host);
 }catch{host.textContent='3D preview unavailable in this browser. Open material details to inspect this component.';}
 return ()=>{loop?.dispose();resize?.disconnect();controls?.dispose();const materials=new Set(),textures=new Set();model.traverse(o=>{o.geometry?.dispose();for(const m of [].concat(o.material||[]))materials.add(m);});for(const m of materials){for(const value of Object.values(m))if(value?.isTexture)textures.add(value);m.dispose();}for(const texture of textures)texture.dispose();renderer?.dispose();renderer?.forceContextLoss();host.replaceChildren();};
}
export function createPastProjects(host,{onOpen}){
 let activeId=null,cleanups=[];
 const dispose=()=>{cleanups.forEach(cleanup=>cleanup());cleanups=[];};
 function render({cases,records,fields}){
  dispose();
  host.innerHTML=`<div class="past-intro"><div class="eyebrow">ATHEM / SELECTED WORK</div><h1>Past projects</h1><p>Five installations. Explore the photographs, then discover the structures and elements behind each project.</p></div><div class="past-gallery">${cases.map(project=>{const expanded=activeId===project.id;return `<article class="past-case ${expanded?'expanded':''}" data-case="${project.id}"><div class="past-case-top"><button class="past-photo" type="button" aria-expanded="${expanded}" aria-controls="past-details-${project.id}" aria-label="${expanded?'Collapse':'Explore'} ${esc(project.brand)} — ${esc(project.name)}">${fields.includes('photos')?`<img src="${import.meta.env.BASE_URL}project-photos/${project.directory}/${encodeURIComponent(project.photo[0])}" alt="${esc(project.photo[1])}" loading="lazy" decoding="async">`:'<span class="past-photo-restricted">Project photograph unavailable for this profile</span>'}<span class="past-photo-caption"><span>${esc(project.brand)} / ${project.year}</span><strong>${esc(project.name)}</strong><span class="past-expand-symbol">${expanded?'−':'＋'}</span></span></button><div class="past-information" id="past-details-${project.id}" ${expanded?'':'hidden'}><div class="eyebrow">THE PROJECT / ${project.year}</div><h2>${esc(project.name)}</h2><p>${fields.includes('description')?esc(project.description):'Project description unavailable for this profile.'}</p><p class="past-model-note">The supporting structure is a provisional design study suited to this installation. Models are visual reconstructions, not measured scans or engineering specifications.</p><button type="button" class="action-button past-collapse">Close project ↑</button></div></div>${expanded?`<section class="past-components"><div class="past-components-heading"><h3>Behind the installation</h3><p>Supporting structure first, followed by two emblematic elements. Drag a model to inspect it.</p></div><div class="past-model-grid">${project.models.map((key,i)=>{const record=records.find(r=>r.brand===project.brand&&r.componentModel===key);if(!record)return '';return `<figure><div class="past-model-host" data-model="${esc(key)}">${fields.includes('model')?'':'3D preview unavailable for this profile'}</div><figcaption><span>${i===0?'01 / PROVISIONAL SUPPORT':`0${i+1} / PROJECT ELEMENT`}</span><h4>${esc(record.name)}</h4>${i===0?'<p>Detachable · modular assembly</p>':''}<button type="button" class="action-button past-inspect" data-record="${record.id}">View material details ↗</button></figcaption></figure>`;}).join('')}</div></section>`:''}</article>`;}).join('')||'<p class="empty">No selected projects for this brand or year.</p>'}</div>`;
  host.querySelectorAll('.past-case').forEach(article=>{const id=Number(article.dataset.case);const toggle=()=>{activeId=activeId===id?null:id;render({cases,records,fields});if(activeId!==null)host.querySelector(`[data-case="${id}"]`)?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};article.querySelector('.past-photo').onclick=toggle;article.querySelector('.past-collapse')?.addEventListener('click',toggle);});
  host.querySelectorAll('.past-inspect').forEach(button=>button.onclick=()=>onOpen(records.find(r=>r.id===Number(button.dataset.record))));
  if(fields.includes('model'))host.querySelectorAll('.past-model-host[data-model]').forEach(modelHost=>{const article=modelHost.closest('[data-case]'),project=cases.find(p=>p.id===Number(article.dataset.case)),record=records.find(r=>r.brand===project.brand&&r.componentModel===modelHost.dataset.model);if(record)cleanups.push(rotatingModel(modelHost,record));});
 }
 return {render,dispose};
}
