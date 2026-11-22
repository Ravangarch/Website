import {isLegacyDemoName} from './archive-records.js';
import {validateTimeline} from './timeline-fields.js';
import {withFictionalWeight} from './material-metadata.js';
import {canEditMaterial,canEditField,canReadField,notesScope} from './access.js';
let edits={};try{edits=JSON.parse(localStorage.getItem('athem-material-edits')||'{}')||{};}catch{}
export function withMaterialEdits(record,account=null){const {notes:legacyNotes,notesByScope,...shared}=edits[record.id]||{};if(record.componentModel&&isLegacyDemoName(shared.name))delete shared.name;if(record.brand==='Van Cleef & Arpels'&&['Winter 2023','Spring 2023'].includes(shared.project))shared.project=shared.project==='Winter 2023'?'Winter':'Summer';const scope=notesScope(account);return withFictionalWeight({...record,...shared,id:record.id,brand:record.brand,notes:scope&&canReadField(account,'notes')?notesByScope?.[scope]??'':''});}
export const editableFields={name:'name',passport:'passport',ownershipRights:'ownership',place:'place',condition:'condition',materialLabel:'material',type:'material',quantity:'quantity',volume:'volume',weight:'weight',properties:'properties',year:'year',season:'year',notes:'notes',project:'project',price:'price',originalPrice:'price',dismantlingDate:'timeline',recyclingDate:'timeline',useTimeline:'timeline',storageLocation:'locations',unitOverrides:'locations',description:'description'};
export function saveMaterialPatch(account,record,patch){if(!canEditMaterial(account,record))throw Error('You do not have permission to edit this material.');for(const key of Object.keys(patch))if(!editableFields[key]||!canEditField(account,editableFields[key]))throw Error('You cannot edit this information field.');if(patch.name!==undefined&&!String(patch.name).trim())throw Error('Enter a material name.');if(patch.quantity!==undefined&&(!Number.isInteger(patch.quantity)||patch.quantity<1))throw Error('Quantity must be a positive whole number.');if(patch.volume!==undefined&&(!Number.isFinite(Number(patch.volume))||Number(patch.volume)<0))throw Error('Volume must be a non-negative number.');if(patch.year!==undefined&&patch.year!==null&&(!Number.isInteger(patch.year)||patch.year<1900||patch.year>2100))throw Error('Use a year between 1900 and 2100, or leave it blank.');if(patch.weight!==undefined&&(!Number.isFinite(patch.weight)||patch.weight<0))throw Error('Weight must be a non-negative number.');if(patch.useTimeline!==undefined)patch.useTimeline=validateTimeline(patch.useTimeline);if(patch.unitOverrides!==undefined){
 const previous={...record,...edits[record.id]};
 for(const [key,unit] of Object.entries(patch.unitOverrides)){
  if(!/^[1-9]\d*$/.test(key)||!unit||typeof unit!=='object')throw Error('Invalid unit location.');
  const oldPlace=previous.unitOverrides?.[key]?.place||record.place;
  if(unit.place!==undefined&&unit.place!==oldPlace&&!canEditField(account,'place'))throw Error('You cannot edit unit status.');
  if(unit.place!==undefined&&!['In storage','With the brand','On display','Provisional design'].includes(unit.place))throw Error('Choose a valid unit status.');
  const location=unit.location;
  if(!location||!location.name?.trim()||!Number.isFinite(location.lat)||Math.abs(location.lat)>90||!Number.isFinite(location.lng)||Math.abs(location.lng)>180)throw Error('Enter valid unit location details.');
 }
}const {notes,...sharedPatch}=patch;if(patch.weight!==undefined)sharedPatch.weightFictional=patch.weight===record.weight?!!record.weightFictional:false;const updated={...edits[record.id],...sharedPatch};if(Object.hasOwn(patch,'notes')){const scope=notesScope(account);if(!scope)throw Error('This profile has no Notes workspace.');updated.notesByScope={...updated.notesByScope,[scope]:String(notes??'')};}const next={...edits,[record.id]:updated};localStorage.setItem('athem-material-edits',JSON.stringify(next));edits=next;return withMaterialEdits(record,account);}

export function saveUnitPatch(account,record,key,input){
 const index=Number(key);
 if(!Number.isInteger(index)||index<1||index>record.quantity)throw Error('Choose a valid unit.');
 if(!canEditField(account,'locations')||!canEditMaterial(account,record))throw Error('You cannot edit unit locations.');
 const current={...record,...edits[record.id]},previous=current.unitOverrides?.[key];
 if(input.place!==undefined){
  if(!canEditField(account,'place'))throw Error('You cannot edit unit status.');
  if(!['In storage','With the brand','On display','Provisional design'].includes(input.place))throw Error('Choose a valid unit status.');
 }
 const location=input.location;
 if(!location||!location.name?.trim()||!Number.isFinite(location.lat)||location.lat< -90||location.lat>90||!Number.isFinite(location.lng)||location.lng< -180||location.lng>180)throw Error('Enter a location name and valid latitude and longitude.');
 const unit={...previous,location:{name:location.name.trim(),address:String(location.address||'').trim(),lat:location.lat,lng:location.lng,custom:true},slot:String(input.slot||'').trim()};
 if(input.place!==undefined)unit.place=input.place;
 return saveMaterialPatch(account,record,{unitOverrides:{...current.unitOverrides,[key]:unit}});
}
