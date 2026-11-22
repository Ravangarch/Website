import {escapeHTML as esc} from './storage.js';
export function withFictionalWeight(record){
 if(record.weight!==null&&record.weight!==undefined&&record.weight!=='')return record;
 const seed=Math.abs(Number(record.id)||0),factor={Metal:130,Wood:220,Plastic:65,Glass:350,Textile:20}[record.type]||95;
 return {...record,weight:Number(Math.max(.15,(Number(record.volume)||.1)*factor*(.7+(seed%13)/20)).toFixed(2)),weightFictional:true};
}
export function materialTimeline(record){
 const seed=Math.abs(Number(record.id)||0),year=Number.isInteger(record.year)?record.year:2026;
 const date=offset=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,0,15+seed%20)+offset*86400000));
 const end=record.dismantlingDate?new Date(record.dismantlingDate+'T12:00:00Z'):new Date(Date.UTC(year,0,15+seed%20)+90*86400000);
 const afterEnd=offset=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(end.getTime()+offset*86400000));
 let stages,title;
 const custom=record.useTimeline?.length>0;
 if(custom){title='Timeline of use';stages=record.useTimeline.map(event=>[event.label,new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(event.date+'T12:00:00Z'))]);}else
 if(record.place==='Provisional design'){
  title='From concept to potential production';stages=[['Design study',date(0)],['Material and reuse review',date(14)],['Prototype assessment',date(28)],['Production decision','Pending project approval']];
 }else if(record.place==='On display'){
  title='From display to storage';stages=[['Installation',date(0)],['Display ends',afterEnd(0)],['Disassembly and packing',afterEnd(3)],['Transport and storage check',afterEnd(5)],['Reuse review',afterEnd(35)]];
 }else if(['With the brand','In loan','On loan'].includes(record.place)){
  title='Loan, return and reuse';stages=[['Prepared for loan',date(0)],['Loan begins',date(7)],['Return and condition check',date(97)],['Storage allocation',afterEnd(10)],['Next reuse review',afterEnd(40)]];
 }else{
  title='Storage and the next use';stages=[['Material catalogued',date(0)],['Dismantled and packed',afterEnd(0)],['Storage arrival',afterEnd(5)],['Condition and inventory check',afterEnd(10)],['Reuse review',afterEnd(40)]];
 }
 if(!custom&&record.recyclingDate)stages.push(['Planned recycling',record.recyclingDate]);
 return `<section class="dismantling"><div class="eyebrow">${custom?'MATERIAL JOURNEY · TIMELINE OF USE':'MATERIAL JOURNEY · FICTIONAL TIMELINE'}</div><h2>${title}</h2><p class="timeline-demo">${custom?'Milestones supplied for this material. Individual units may have different locations.':'Illustrative milestones for this demo, not confirmed operational dates. Individual units may have different locations.'}</p><ol>${stages.map(([label,date])=>`<li><b>${esc(label)}</b><span>${esc(date)}</span></li>`).join('')}</ol></section>`;
}
