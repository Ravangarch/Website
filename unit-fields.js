import {escapeHTML as esc} from './storage.js';
import {unitLocations} from './locations.js';

// Stage unit changes in the parent form; nothing is persisted until its Save button is used.
export function mountUnitFields(host,{record={},getQuantity,getDefaults=()=>record,canEditPlace=true}){
 const drafts=structuredClone(record.unitOverrides||{});let selected='1';
 host.innerHTML=`<fieldset class="unit-fields"><legend>Individual unit locations</legend><p>Set the number of units in Quantity, then choose a unit below. Enable its individual location to give it its own coordinates. Other units use the default location. Changes are saved with this form.</p><label>Unit number<input data-unit-number type="number" min="1" step="1" value="1"></label><button type="button" class="action-button" data-load-unit>Load unit</button><p data-unit-count></p><label class="unit-custom-toggle"><input type="checkbox" data-unit-custom> Set an individual location for this unit</label><div data-unit-inputs class="import-fields"></div><p data-unit-error role="alert"></p><p data-unit-summary></p></fieldset>`;
 const q=s=>host.querySelector(s),count=()=>Math.max(1,Math.floor(Number(getQuantity())||1));
 const field=(key,label,value,type='text',extra='')=>`<label>${label}<input data-unit-field="${key}" type="${type}" value="${esc(value??'')}" ${extra}></label>`;
 function show(){
  const n=count();q('[data-unit-number]').max=n;q('[data-unit-count]').textContent=`Editing unit ${selected} of ${n}`;
  const defaults=getDefaults(),fallback=unitLocations({...record,...defaults,quantity:Math.max(n,Number(selected)),unitOverrides:{}});
  const initial=fallback.units.find(u=>u.key===selected)||{place:defaults.place||'In storage',location:defaults.storageLocation||fallback.location,slot:''};
  const custom=drafts[selected],unit=custom||initial,location=unit.location||initial.location;
  q('[data-unit-custom]').checked=!!custom;
  q('[data-unit-inputs]').innerHTML=(canEditPlace?`<label>Unit status<select data-unit-field="place">${['In storage','With the brand','On display','Provisional design'].map(p=>`<option value="${p}" ${p===(unit.place||initial.place)?'selected':''}>${p==='With the brand'?'In loan / With the brand':p}</option>`).join('')}</select></label>`:'')+field('name','Unit location name',location.name,'text','maxlength="160"')+field('address','Unit address',location.address,'text','maxlength="300"')+field('lat','Unit latitude',location.lat,'number','min="-90" max="90" step="any"')+field('lng','Unit longitude',location.lng,'number','min="-180" max="180" step="any"')+field('slot','Rack / shelf / position',unit.slot,'text','maxlength="160"');
  toggle();summary();
 }
 function summary(){q('[data-unit-summary]').textContent=`${Object.keys(drafts).filter(k=>Number(k)<=count()).length} units have individual locations. Unconfigured units keep the default.`;}
 function toggle(){q('[data-unit-inputs]').querySelectorAll('input,select').forEach(el=>{el.disabled=!q('[data-unit-custom]').checked;});}
 function capture(){
  if(!q('[data-unit-custom]').checked){delete drafts[selected];return;}
  const value=key=>q(`[data-unit-field="${key}"]`)?.value;
  const name=value('name').trim(),lat=value('lat'),lng=value('lng');
  if(!name||lat.trim()===''||lng.trim()===''||!Number.isFinite(Number(lat))||Math.abs(Number(lat))>90||!Number.isFinite(Number(lng))||Math.abs(Number(lng))>180)throw Error(`Unit ${selected}: enter a location name, latitude (−90 to 90) and longitude (−180 to 180).`);
  drafts[selected]={...(drafts[selected]||{}),location:{name,address:value('address').trim(),lat:Number(lat),lng:Number(lng),custom:true},slot:value('slot').trim(),...(canEditPlace?{place:value('place')}:{})};
 }
 q('[data-unit-custom]').onchange=()=>{toggle();};
 q('[data-load-unit]').onclick=()=>{try{capture();const next=Number(q('[data-unit-number]').value);if(!Number.isInteger(next)||next<1||next>count())throw Error('Choose a unit number within Quantity.');selected=String(next);q('[data-unit-error]').textContent='';show();}catch(error){q('[data-unit-error]').textContent=error.message;}};
 show();
 return {updateCount(){q('[data-unit-number]').max=count();q('[data-unit-count]').textContent=`Editing unit ${selected} of ${count()}`;},read(){capture();const n=count();if(Object.keys(drafts).some(k=>Number(k)>n))throw Error('A unit with an individual location is above the new Quantity. Clear its individual location before reducing Quantity.');return structuredClone(drafts);}};
}
