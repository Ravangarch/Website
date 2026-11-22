import {escapeHTML as esc} from './storage.js';
export function validateTimeline(events){
 if(!Array.isArray(events)||events.length>100)throw Error('Use at most 100 timeline milestones.');
 return events.map(event=>{const label=String(event.label||'').trim(),date=String(event.date||'');if(!label||label.length>160||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date)throw Error('Each timeline milestone needs a title and a valid date.');return {label,date};}).sort((a,b)=>a.date.localeCompare(b.date));
}
export function mountTimelineFields(host,events=[]){
 host.innerHTML='<fieldset class="timeline-fields"><legend>Timeline of use</legend><p>Add dated milestones such as installation, use, dismantling, transport, storage or reuse. Leave empty to keep the illustrative demo timeline.</p><div data-timeline-rows></div><button type="button" class="action-button" data-add-milestone>＋ Add milestone</button></fieldset>';
 const rows=host.querySelector('[data-timeline-rows]');
 function add(event={}){const row=document.createElement('div');row.className='timeline-field-row';row.innerHTML=`<label>Milestone<input data-milestone-label maxlength="160" placeholder="e.g. Installation begins" value="${esc(event.label||'')}"></label><label>Date<input data-milestone-date type="date" value="${esc(event.date||'')}"></label><button type="button" class="action-button" aria-label="Remove milestone">Remove</button>`;row.querySelector('button').onclick=()=>row.remove();rows.append(row);}
 events.forEach(add);if(!events.length)add();host.querySelector('[data-add-milestone]').onclick=()=>add();
 return {read(){return validateTimeline([...rows.children].map(row=>({label:row.querySelector('input[data-milestone-label]').value,date:row.querySelector('input[data-milestone-date]').value})).filter(event=>event.label.trim()||event.date));}};
}
