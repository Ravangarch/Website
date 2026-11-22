const demoNames=new Set(['reclaimed oak display','brushed aluminium stand','brusehd aluminium stand','amber acrylic panel']);
export const isLegacyDemoName=name=>demoNames.has(String(name||'').trim().toLowerCase());
// Old imports could reuse seeded IDs and also persist copies of the seeded archive.
// Keep the canonical material, discard only its duplicate demo/sample copies,
// and allocate a fresh identity for genuine imported records that collide.
export function reconcileImportedRecords(seeds,reserved,rows){
 const seedById=new Map(seeds.map(record=>[record.id,record])),used=new Set(reserved);
 let next=Math.max(1000,...reserved,...rows.map(r=>Number(r.id)||0))+1;const imported=[];
 for(const input of rows){
  if(!input||typeof input!=='object'||input.brand==='Yves Saint Laurent')continue;
  const record={...input,brand:input.brand==='Chanel'?'Guerlain':input.brand},seed=seedById.get(Number(record.id));
  if(seed&&(record.componentModel===seed.componentModel&&record.brand===seed.brand||isLegacyDemoName(record.name)))continue;
  let id=Number(record.id);
  if(!Number.isInteger(id)||id<0||used.has(id)){while(used.has(next))next++;id=next++;record.passport=`DMP–${record.year||2026}–${id}`;}
  record.id=id;used.add(id);imported.push(record);
 }
 return imported;
}
