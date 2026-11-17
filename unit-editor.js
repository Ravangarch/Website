import {escapeHTML as esc} from './storage.js';
import {canEditField,canEditMaterial} from './access.js';
import {saveUnitPatch} from './material-state.js';
import {unitLocations} from './locations.js';

export function openUnitEditor(account,record,key,{onSaved}){
 if(!canEditField(account,'locations')||!canEditMaterial(account,record))return;
 const unit=unitLocations(record).units.find(u=>u.key===key);if(!unit)return;
 const dialog=document.createElement('dialog');dialog.id='unit-editor';dialog.setAttribute('aria-labelledby','unit-editor-title');
 const field=(name,label,value,type='text',extra='')=>`<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" ${extra}></label>`;
 dialog.innerHTML=`<div class="detail-top"><span>INDIVIDUAL UNIT LOCATION</span><button type="button" aria-label="Close unit editor">✕</button></div><form class="profiles-body"><h2 id="unit-editor-title">Edit unit ${key}</h2><p>${esc(unit.id)}</p><p>Changes apply only to this unit. Other units keep their current locations.</p><div class="import-fields">${canEditField(account,'place')?`<label>Unit status<select name="place">${['In storage','With the brand','On display','Provisional design'].map(place=>`<option value="${place}" ${unit.place===place?'selected':''}>${place==='With the brand'?'In loan / With the brand':place}</option>`).join('')}</select></label>`:''}${field('locationName','Location name',unit.location.name,'text','required maxlength="160"')}${field('address','Address',unit.location.address,'text','maxlength="300"')}${field('lat','Latitude',unit.location.lat,'number','required min="-90" max="90" step="any"')}${field('lng','Longitude',unit.location.lng,'number','required min="-180" max="180" step="any"')}${field('slot','Rack / shelf / position',unit.slot,'text','maxlength="160"')}</div><p class="unit-save-error" role="alert"></p><button type="submit" class="primary">Save this unit</button></form>`;
 document.body.append(dialog);dialog.querySelector('.detail-top button').onclick=()=>dialog.close();dialog.onclose=()=>dialog.remove();
 dialog.querySelector('form').onsubmit=e=>{e.preventDefault();try{const data=new FormData(e.currentTarget),patch={location:{name:String(data.get('locationName')),address:String(data.get('address')),lat:Number(data.get('lat')),lng:Number(data.get('lng'))},slot:String(data.get('slot'))};if(data.has('place'))patch.place=String(data.get('place'));const updated=saveUnitPatch(account,record,key,patch);dialog.close();onSaved(updated,key);}catch(error){dialog.querySelector('.unit-save-error').textContent=error.message;}};
 dialog.showModal();
}
