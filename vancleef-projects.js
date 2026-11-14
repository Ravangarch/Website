import {winterModel} from './vancleef-winter-models.js';
import {springModel} from './vancleef-spring-models.js';
const part=(name,materialLabel,key,type)=>({name,materialLabel,componentModel:`vca-${key}`,type,year:2023,properties:'Clean illustrative component · no visible defects'});
const project=(project,parts)=>parts.map(part=>({...part,project}));
export const vanCleefDefinitions=[
 ...project('Winter 2023',[
 part('Large snowdrift structures','Curved plywood, moulded cellulose, recycled cardboard honeycomb panels','snowdrifts','Structure'),
 part('Snowdrift surface finish','White mineral paint, casein paint','snow-finish','Mineral coating'),
 part('Miniature houses','Plywood, solid wood, folded cardboard','houses','Wood'),
 part('House roofs','Folded paperboard, thin wood panels','roofs','Wood'),
 part('Hanging circular ornaments','Aluminium rings, steel wire','ornaments','Metal'),
 part('Snowflake decorations','Laser-cut plywood, aluminium sheet, thick paperboard','snowflakes','Wood'),
 part('Small coloured spheres','Painted wooden balls, ceramic spheres','spheres','Wood'),
 part('Decorative trees','Natural evergreen branches or reusable metal tree structures','trees','Natural fibres')]),
 ...project('Spring 2023',[
 part('Tall flower stems','Bent aluminium rods, steel wire','stems','Metal'),
 part('Branching stems','Thin steel rods, copper wire','branches','Metal'),
 part('Large flower petals','Shaped aluminium sheet, moulded cellulose, thick paper','large-petals','Bio-based composite'),
 part('Small flower petals','Paper, cellulose fibre, thin metal sheet','small-petals','Bio-based composite'),
 part('Flower centres','Painted wood, ceramic, pressed metal','centres','Wood'),
 part('Flower stamens','Metal wire, cotton thread, natural fibres','stamens','Natural fibres'),
 part('Flower buds','Carved wood, moulded paper pulp, ceramic','buds','Bio-based composite'),
 part('Turquoise leaves','Folded paperboard, shaped aluminium, thin wood veneer','leaves','Wood')])
];
export function vanCleefModel(fullKey){
 const key=fullKey.replace('vca-','');
 return ['snowdrifts','snow-finish','houses','roofs','ornaments','snowflakes','spheres','trees'].includes(key)?winterModel(key):springModel(key);
}
