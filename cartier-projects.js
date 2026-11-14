import {sohoModel} from './soho-structures.js';
import {boldBrightModel} from './bold-bright-structures.js';
import {fabulousJourneyModel} from './fabulous-journey-structures.js';
import * as THREE from 'three';
const part=(name,materialLabel,key,type='Metal')=>({name,materialLabel,componentModel:'cartier-'+key,type,properties:'Clean finish · no visible defects',place:'In storage'});
const project=(name,year,items)=>items.map(item=>({...item,project:name,year,season:year===null?'Christmas':undefined}));
export const cartierDefinitions=[
 ...project('The Fabulous Journey',2025,[
 part('Balloon outer shell','Cotton canvas, linen fabric, shaped aluminium sheets','balloon-shell','Natural fibres'),
 part('Balloon internal framework','Aluminium ribs, bamboo, lightweight timber','balloon-frame','Structure'),
 part('Balloon suspension ropes','Hemp rope, steel cables','ropes','Natural fibres'),
 part('Decorative basket','Plywood, timber, aluminium, steel','basket','Wood'),
 part('Illuminated clouds','Perforated aluminium sheets, steel mesh','clouds','Lighting'),
 part('Cartier lettering','Cut metal letters, glass neon tubing','lettering','Lighting')]),
 ...project('Bold and Bright',2026,[
 part('Illuminated spheres','Opal glass, frosted glass','light-spheres','Lighting'),
 part('Sphere supports','Brass, aluminium or steel rods','sphere-supports','Structure'),
 part('Decorative light frames','Aluminium profiles, steel wire','light-frames','Lighting')]),
 ...project('Soho',2024,[
 part('Main red façade panels','Aluminium sheets, steel sheets, plywood','red-panels','Structure'),
 part('Textured red finish','Embossed aluminium, pressed metal, natural leather','red-finish','Mineral coating'),
 part('Gold Cartier lettering','Brass, gold-anodised aluminium','gold-lettering'),
 part('Decorative gold studs','Brass, aluminium','studs'),
 part('Central circular ornament','Cast brass, spun aluminium','ornament')]),
 ...project('Christmas',null,[
 part('Panther sculptural body','Formed aluminium sheets, papier-mâché, moulded cellulose','panther','Bio-based composite'),
 part('Panther internal structure','Steel wire, aluminium ribs','panther-frame','Structure'),
 part('Panther surface finish','Mineral paint, enamelled metal','panther-finish','Mineral coating'),
 part('Illuminated outline','Glass neon tubing, metal lighting channels','outline','Lighting'),
 part('Festive garlands','Natural evergreen branches, reusable metal wire','garlands','Natural fibres'),
 part('Gift boxes','Cardboard, folded paperboard, timber','gifts','Wood'),
 part('Gift ribbons','Cotton, linen or silk','ribbons','Natural fibres')])
];
cartierDefinitions.push({...part('Small hanging jewellery box','Folded sheet panels, painted finish, metal trim','small-box','Structure'),project:'The Fabulous Journey',year:2025,inventoryId:821,properties:'Red chamfered box · fine gold border · decorative corner trim'});
for(const item of cartierDefinitions){if(item.project==='The Fabulous Journey'){const properties={'cartier-balloon-shell':'Wide flattened red airship form · horizontal panel seams','cartier-balloon-frame':'Shallow airship-shaped ribs · horizontal hoop structure','cartier-basket':'Open two-level architectural gondola · gold arches, rails and staircase','cartier-clouds':'Flat scalloped cloud silhouette · dense warm perforation lights'};if(properties[item.componentModel])item.properties=properties[item.componentModel];}}
for(const item of cartierDefinitions){if(item.project==='Bold and Bright')item.properties={'cartier-light-spheres':'White opal globes in varied sizes · straight rows and scalloped garlands','cartier-sphere-supports':'Gold linear and scalloped rails · globe sockets · wall mounting brackets','cartier-light-frames':'Gold open circular frames · central roundel · tapered rays lined with small warm bulbs'}[item.componentModel];}
for(const item of cartierDefinitions){if(item.project==='Soho'){const p={'cartier-red-panels':'Tall deep red panels · fine diagonal crosshatch texture · horizontal seam','cartier-red-finish':'Fine intersecting diagonal grain · embossed red surface','cartier-studs':'Small round domed gold studs · two straight rows bordering a seam','cartier-ornament':'Layered concentric gold clasp · smooth domed centre'};if(p[item.componentModel])item.properties=p[item.componentModel];}}
export function cartierModel(fullKey){if(['cartier-red-panels','cartier-red-finish','cartier-studs','cartier-ornament'].includes(fullKey))return sohoModel(fullKey.replace('cartier-',''));if(['cartier-light-spheres','cartier-sphere-supports','cartier-light-frames'].includes(fullKey))return boldBrightModel(fullKey.replace('cartier-',''));if(['cartier-balloon-shell','cartier-balloon-frame','cartier-basket','cartier-clouds','cartier-small-box'].includes(fullKey))return fabulousJourneyModel(fullKey.replace('cartier-',''));const key=fullKey.replace('cartier-',''),group=new THREE.Group();const mat=(color,metalness=0,roughness=.6)=>new THREE.MeshStandardMaterial({color,metalness,roughness,side:THREE.DoubleSide});const red=mat(0xb61929),cream=mat(0xe9d7b7),gold=mat(0xcfa74e,.8,.24),steel=mat(0xb8c0c5,.8,.25),wood=mat(0xb78b58),dark=mat(0x22252a,.25,.35),green=mat(0x214f36);const glow=new THREE.MeshStandardMaterial({color:0xfff1cc,emissive:0xffd58c,emissiveIntensity:1.1,roughness:.3});
const mesh=(geo,material,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,material);o.position.set(x,y,z);group.add(o);return o;};const box=(w,h,d,m,x=0,y=0,z=0)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z);const sphere=(r,m,x=0,y=0,z=0)=>mesh(new THREE.SphereGeometry(r,36,24),m,x,y,z);const ring=(r,t=.02,m=gold,x=0,y=0,z=0)=>mesh(new THREE.TorusGeometry(r,t,10,60),m,x,y,z);const rod=(a,b,r=.02,m=steel)=>{const u=new THREE.Vector3(...a),v=new THREE.Vector3(...b),d=v.clone().sub(u);const o=mesh(new THREE.CylinderGeometry(r,r,d.length(),12),m);o.position.copy(u).add(v).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;};const curve=(points,r=.014,m=gold)=>mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),40,r,8,false),m);
function panther(wire=false){const parts=[[0,.15,0,.72,.22,.21],[.68,.35,0,.24,.22,.19],[.84,.38,.02,.17,.11,.15],[-.5,-.1,.12,.15,.34,.13],[.38,-.12,.12,.13,.34,.12],[-.36,-.1,-.14,.13,.32,.12],[.45,-.12,-.14,.11,.3,.1]];for(const [x,y,z,sx,sy,sz]of parts){const o=sphere(1,wire?new THREE.MeshBasicMaterial({color:0xbbab76,wireframe:true}):gold,x,y,z);o.scale.set(sx,sy,sz);}for(const z of [-.1,.1]){const ear=mesh(new THREE.ConeGeometry(.075,.16,3),wire?steel:gold,.67,.57,z);ear.rotation.z=-.1;}curve([[-.6,.18,0],[-.95,.05,0],[-1.12,.36,.03],[-.98,.58,.03]],.035,wire?steel:gold);}
if(key==='balloon-shell'){for(let i=0;i<10;i++){const gore=mesh(new THREE.SphereGeometry(.72,40,24,i*Math.PI/5,Math.PI/5,0,Math.PI),i%2?red:cream,0,.2,0);gore.scale.y=1.22;}const neck=mesh(new THREE.CylinderGeometry(.2,.12,.22,30),cream,0,-.65,0);}
else if(key==='balloon-frame'){for(let i=0;i<10;i++){const rib=ring(.72,.014,i%2?wood:steel,0,.15,0);rib.scale.y=1.2;rib.rotation.y=i*Math.PI/10;}for(const y of [-.45,0,.45]){const r=ring(Math.sqrt(.72**2-(y/1.2)**2),.018,steel,0,y+.15,0);r.rotation.x=Math.PI/2;}}
else if(key==='ropes'){for(let i=0;i<6;i++){const x=(i-2.5)*.16;curve([[x,.95,0],[x*.7,.3,.05*Math.sin(i)],[x*.5,-.85,.03]],.014,i%2?steel:cream);}}
else if(key==='basket'){box(.9,.08,.65,wood,0,-.42,0);for(const x of [-.47,.47])box(.05,.65,.7,wood,x,-.06,0);for(const z of [-.35,.35])box(.95,.65,.04,wood,0,-.06,z);for(let i=0;i<8;i++)for(const z of [-.38,.38])rod([-.4+i*.115,-.34,z],[-.4+i*.115,.22,z],.012,cream);for(const x of [-.44,.44])for(const z of [-.32,.32])rod([x,.25,z],[x,.85,z],.018,gold);}
else if(key==='clouds'){for(const [x,y,r]of [[-.65,0,.28],[-.3,.14,.36],[.1,.2,.46],[.5,.08,.32],[.75,-.06,.2]]){const o=sphere(r,glow,x,y,0);o.scale.z=.35;}for(let i=0;i<25;i++){const a=i*.5;const dot=sphere(.012,steel,-.68+i*.055,-.1+.14*Math.sin(a),.18);}}
else if(key==='lettering'||key==='gold-lettering'){
 const c=document.createElement('canvas');c.width=1024;c.height=320;const ctx=c.getContext('2d');ctx.clearRect(0,0,1024,320);ctx.font='italic 220px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=key==='gold-lettering'?'#cdaa55':'#ffefca';ctx.fillText('Cartier',512,165,950);const texture=new THREE.CanvasTexture(c);const m=new THREE.MeshStandardMaterial({map:texture,transparent:true,alphaTest:.1,side:THREE.DoubleSide,metalness:key==='gold-lettering'?.6:0,roughness:.3,emissive:key==='gold-lettering'?0x392900:0xffba55,emissiveMap:texture,emissiveIntensity:key==='gold-lettering'?.2:.65});mesh(new THREE.PlaneGeometry(2,.625),m);}
else if(key==='light-spheres'){for(const [x,y,r]of [[0,.2,.48],[-.65,-.3,.28],[.65,-.2,.33]])sphere(r,glow,x,y,0);}
else if(key==='sphere-supports'){for(let i=0;i<3;i++){rod([(i-1)*.45,-.8,0],[(i-1)*.45,.65-(i%2)*.2,0],.025,i%2?steel:gold);const r=ring(.18,.02,gold,(i-1)*.45,.65-(i%2)*.2,0);r.rotation.x=Math.PI/2;box(.28,.035,.28,gold,(i-1)*.45,-.81,0);}}
else if(key==='light-frames'){for(let i=0;i<3;i++){const r=ring(.48+i*.14,.02,i%2?glow:gold);r.rotation.y=i*.18;r.position.z=(i-1)*.1;}}
else if(key==='red-panels'){for(let i=0;i<3;i++)box(.5,1.55,.055,red,(i-1)*.55,0,0);}
else if(key==='red-finish'){box(1.5,1.2,.055,red);for(let row=0;row<12;row++)for(let col=0;col<16;col++){const o=sphere(.025,red,-.7+col*.093,-.5+row*.09,.04);o.scale.z=.35;}}
else if(key==='studs'){box(1.5,1.1,.04,red);for(let row=0;row<4;row++)for(let col=0;col<6;col++)mesh(new THREE.ConeGeometry(.065,.065,4),gold,-.6+col*.24,-.4+row*.26,.055).rotation.x=Math.PI/2;}
else if(key==='ornament'){ring(.7,.075,gold);ring(.5,.025,gold);for(let i=0;i<16;i++){const a=i*Math.PI/8;rod([.5*Math.cos(a),.5*Math.sin(a),0],[.66*Math.cos(a),.66*Math.sin(a),0],.018,gold);}sphere(.18,gold);}
else if(key==='panther'||key==='panther-frame')panther(key==='panther-frame');
else if(key==='panther-finish'){box(1.5,1.05,.04,gold);for(let i=0;i<20;i++){const x=-.65+(i%5)*.32,y=-.4+Math.floor(i/5)*.26;const spot=ring(.065,.02,dark,x,y,.025);spot.scale.y=.7;}}
else if(key==='outline'){const points=[[-1,.05,0],[-.78,.22,0],[-.45,.35,0],[.25,.35,0],[.5,.62,0],[.72,.6,0],[.95,.4,0],[.7,.28,0],[.5,.1,0],[.44,-.4,0],[.3,-.45,0],[.22,-.05,0],[-.35,-.03,0],[-.46,-.43,0],[-.62,-.43,0],[-.65,.05,0]];for(let i=0;i<points.length-1;i++)rod(points[i],points[i+1],.018,glow);curve([[-.65,.08,0],[-1.05,-.1,0],[-1.2,.3,0],[-1,.5,0]],.018,glow);}
else if(key==='garlands'){curve([[-1,.45,0],[-.5,0,0],[0,-.2,0],[.5,0,0],[1,.45,0]],.024,steel);for(let i=0;i<35;i++){const x=-1+i*2/34,y=-.2+.65*x*x;for(const sign of [-1,1])rod([x,y,0],[x+sign*.1,y-.16,.025],.018,green);if(i%5===0)sphere(.055,red,x,y-.16,.04);}}
else if(key==='gifts'){for(const [x,y,s]of [[-.55,-.25,.65],[.25,-.15,.85],[.7,-.4,.4]]){box(s,s,s,red,x,y,0);box(s+.035,.08,s+.035,red,x,y+s/2,0);box(.065,s+.02,s+.02,gold,x,y,0);box(s+.02,s+.02,.065,gold,x,y,0);}}
else if(key==='ribbons'){for(let i=0;i<3;i++){const r=ring(.24,.035,i%2?cream:red,(i-1)*.37,.1,0);r.scale.x=.7;r.rotation.z=(i-1)*.7;}for(const sign of [-1,1]){const ribbon=box(.13,.72,.02,red,sign*.14,-.45,0);ribbon.rotation.z=sign*.2;}}
return group;}
