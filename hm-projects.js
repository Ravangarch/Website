import * as THREE from 'three';
import {soundWaveKeys,soundWaveModel} from './sound-wave-models.js';
const part=(name,materialLabel,key,type='Metal')=>({name,materialLabel,componentModel:`hm-${key}`,type,properties:'Clean illustrative component · no visible defects'});
const dated=(year,items,project)=>items.map(item=>({...item,year,...project?{project}:{}}));
export const reflectiveDiscDefinitions=dated(2024,[
 part('Small reflective circular discs','polished aluminium','discs'),
 part('Disc suspension connections','stainless-steel wire, metal rings','disc-connections'),
 part('Flexible reflective façade surface','interconnected metal discs','disc-surface'),
 part('Supporting mesh','stainless-steel wire mesh','mesh','Netting'),
 part('Main supporting framework','aluminium or steel profiles','disc-framework','Structure'),
 part('Large brand lettering','cut aluminium or brass sheets','brand-lettering'),
 part('Façade fixing elements','steel brackets, bolts and tension cables','disc-fixings')]);
export const hmDefinitions=[
 ...dated(2025,[
 part('Large floral façade covering','printed natural-fibre textile (cotton or linen), or printed paper panels','floral-covering','Natural fibres'),
 part('Red floral graphics','mineral-pigment inks or water-based, plastic-free printing inks','floral-graphics','Mineral coating'),
 part('Perforated background','perforated Lycra fabric','perforated-background','Netting'),
 part('Large H&M lettering','cut aluminium sheets or painted plywood','hm-lettering'),
 part('Supporting framework','steel or aluminium profiles','floral-framework','Structure'),
 part('Façade attachment system','steel brackets, clamps and bolts','floral-attachments'),
 part('Illuminated perimeter','reusable metal light fittings with glass diffusers','perimeter','Lighting')]),
 ...dated(2024,[
 part('Large curved red façade shell','formed aluminium sheets','wave-shell'),
 part('Curved structural ribs','steel or aluminium profiles','wave-ribs','Structure'),
 part('Red exterior panels','folded or rolled aluminium sheet with mechanically fixed joints','wave-panels'),
 part('Glossy red finish','vitreous enamel on suitable metal panels','wave-finish','Mineral coating'),
 part('Window display frames','formed aluminium profiles','window-frames'),
 part('Interior display backdrop','aluminium sheets or painted plywood','backdrop','Wood'),
 part('Reflective circular sculptures','polished stainless steel or mirror-finished aluminium','sculptures'),
 part('Circular sculpture supports','steel rods and brackets','sculpture-supports','Structure'),
 part('Decorative lettering','cut metal or painted timber','decorative-lettering'),
 part('Supporting framework','reusable steel profiles','wave-framework','Structure'),
 part('Mounting connections','steel bolts, brackets and clamps','wave-connections')],'Sound Wave'),
 ...reflectiveDiscDefinitions,
 ...dated(2023,[
 {...part('Reflective sequin façade','Aluminium sheets','sequin-facade'),inventoryId:1034},
 {...part('Reflective hanging decorative elements','Aluminium sheets','hanging-sequins'),inventoryId:1035}] ,'H&M x RABANNE'),
 ...dated(2023,[
 {...part('Large rectangular panels','aluminium sheets, plywood or recycled paper honeycomb panels','rectangular-panels','Structure'),inventoryId:1025},
 {...part('Semi-translucent panels','frosted glass or thin natural-fibre paper','translucent-panels','Screens'),inventoryId:1026},
 {...part('Gold reflective panels','anodised aluminium or brass sheet','gold-panels'),inventoryId:1027},
 {...part('White matte panels','mineral-painted plywood or enamelled aluminium','white-panels','Wood'),inventoryId:1028},
 {...part('Printed typography','mineral-pigment ink on paper or direct printing on metal','typography','Mineral coating'),inventoryId:1029},
 {...part('Large H&M logo','cut aluminium or plywood','hm-logo'),inventoryId:1030},
 {...part('Layered panel supporting structure','reusable steel or aluminium profiles','layered-framework','Structure'),inventoryId:1031},
 {...part('Panel mounting system','mechanical clips, bolts and brackets','panel-mounts'),inventoryId:1032},
 {...part('Integrated lighting','replaceable light fixtures with metal housings and glass diffusers','integrated-lighting','Lighting'),inventoryId:1033}])
];
export function hmModel(fullKey,brand='H&M'){const key=fullKey.replace('hm-',''),group=new THREE.Group();
 if(soundWaveKeys.includes(key))return soundWaveModel(key);
 const mat=(color,metalness=0,roughness=.6)=>new THREE.MeshStandardMaterial({color,metalness,roughness,side:THREE.DoubleSide});
 const steel=mat(0xa8afb4,.8,.3),silver=mat(0xdce0e4,1,.08),red=mat(0xc51e31,.65,.2),gloss=mat(0xb70d24,.7,.08),white=mat(0xf2eee6),gold=mat(0xc9a75b,.9,.15),dark=mat(0x333a3d,.65,.4),wood=mat(0xc1a17b);
 const light=new THREE.MeshStandardMaterial({color:0xffedc9,emissive:0xffcf80,emissiveIntensity:1,roughness:.25});
 const add=(geo,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);group.add(o);return o;};
 const box=(w,h,d,m,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const rod=(a,b,r=.015,m=steel)=>{const u=new THREE.Vector3(...a),d=new THREE.Vector3(...b).sub(u),o=add(new THREE.CylinderGeometry(r,r,d.length(),10),m);o.position.copy(u).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;};
 const ring=(r,t,m,x=0,y=0,z=0)=>add(new THREE.TorusGeometry(r,t,8,36),m,x,y,z);
 const frame=(w=1.5,h=1.5,z=0,m=steel)=>{for(const x of [-w/2,w/2])box(.04,h,.045,m,x,0,z);for(const y of [-h/2,h/2])box(w,.04,.045,m,0,y,z);};
 const curved=(m,z=0,lines=false)=>{const geo=new THREE.PlaneGeometry(1.8,1.5,48,16),pos=geo.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i);pos.setZ(i,.22*Math.cos(x*2.5)+z);}geo.computeVertexNormals();add(geo,m);if(lines)for(let i=0;i<5;i++)rod([-.84+i*.42,-.75,.22*Math.cos((-.84+i*.42)*2.5)+z+.015],[-.84+i*.42,.75,.22*Math.cos((-.84+i*.42)*2.5)+z+.015],.008,steel);};
 const lettering=(text,color=0xc51e31)=>{const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d');ctx.clearRect(0,0,1024,256);ctx.font=`bold ${text.length>8?110:190}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#'+color.toString(16).padStart(6,'0');ctx.fillText(text,512,135,980);const texture=new THREE.CanvasTexture(c);add(new THREE.PlaneGeometry(2,.5),new THREE.MeshStandardMaterial({map:texture,transparent:true,alphaTest:.1,side:THREE.DoubleSide,roughness:.4}));};
 const bolt=(x,y,z=0)=>{const o=add(new THREE.CylinderGeometry(.045,.045,.04,6),steel,x,y,z+.025);o.rotation.x=Math.PI/2;ring(.052,.006,dark,x,y,z+.05);};
 const brackets=()=>{for(let i=0;i<4;i++){const x=(i%2-.5)*.9,y=(Math.floor(i/2)-.5)*.7;box(.3,.1,.035,steel,x,y,0);box(.035,.1,.2,steel,x-.13,y,.08);bolt(x+.06,y,.03);}};
 const disc=(x,y,z=0,r=.12)=>{const o=add(new THREE.CylinderGeometry(r,r,.012,32),silver,x,y,z);o.rotation.x=Math.PI/2;o.rotation.y=.1*Math.sin(x*9+y*4);return o;};
 const panels=(m,translucent=false)=>{for(let i=0;i<3;i++){const o=box(.68,1.25,.035,m,(i-1)*.48,(i-1)*.12,(i-1)*.12);o.rotation.y=(i-1)*.08;}if(translucent)frame(1.6,1.5,-.2,dark);};
 if(key==='sequin-facade'){for(let row=0;row<8;row++)for(let col=0;col<10;col++){const x=(col-4.5)*.17,y=(row-3.5)*.17;const tile=box(.15,.15,.012,silver,x,y,.06*Math.sin(col*.7));tile.rotation.y=.1*Math.sin(row+col);tile.rotation.z=.08*Math.sin(col);if(row<7)ring(.018,.004,steel,x,y+.085,.02);}}
 else if(key==='hanging-sequins'){for(let col=0;col<7;col++){const x=(col-3)*.23;rod([x,-.65,0],[x,.8,0],.004);for(let row=0;row<5;row++){const tile=box(.17,.2,.01,silver,x,.62-row*.28,.03*Math.sin(col+row));tile.rotation.y=.3*Math.sin(col+row);ring(.023,.004,steel,x,.74-row*.28,0);}}}
 else if(key==='floral-covering'||key==='floral-graphics'){
  const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d');ctx.fillStyle='#ede6d4';ctx.fillRect(0,0,512,512);for(let i=0;i<12;i++){const x=60+i%4*130,y=65+Math.floor(i/4)*180;ctx.strokeStyle='#7c7663';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y+80);ctx.quadraticCurveTo(x-20,y+30,x,y);ctx.stroke();for(let j=0;j<6;j++){const a=j*Math.PI/3;ctx.fillStyle=j%2?'#be203a':'#e14a5a';ctx.beginPath();ctx.ellipse(x+Math.cos(a)*23,y+Math.sin(a)*23,26,13,a,0,Math.PI*2);ctx.fill();}ctx.fillStyle='#e7be68';ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill();}const tex=new THREE.CanvasTexture(c);const m=new THREE.MeshStandardMaterial({map:tex,roughness:.85,side:THREE.DoubleSide});if(key==='floral-covering')curved(m);else box(1.6,1.6,.02,m);
 }else if(key==='perforated-background'){const shape=new THREE.Shape();shape.moveTo(-.8,-.7);shape.lineTo(.8,-.7);shape.lineTo(.8,.7);shape.lineTo(-.8,.7);shape.closePath();for(let row=0;row<9;row++)for(let col=0;col<11;col++){const hole=new THREE.Path();hole.absarc(-.7+col*.14,-.58+row*.14,.035,0,Math.PI*2,true);shape.holes.push(hole);}const mesh=add(new THREE.ShapeGeometry(shape),mat(0xd4c6b0));mesh.rotation.y=.12;}
 else if(key==='hm-lettering'||key==='hm-logo')lettering('H&M');
 else if(key==='brand-lettering')lettering(brand==='Paco Rabanne'?'paco rabanne':'H&M',0xbba161);
 else if(key==='decorative-lettering')lettering('H2',0x121212);
 else if(key==='typography')lettering('H&M  COLLECTION',0x262626);
 else if(key.endsWith('framework')){frame();frame(1.5,1.5,-.3);for(const x of [-.75,.75])for(const y of [-.75,.75])rod([x,y,0],[x,y,-.3],.025);if(key==='layered-framework')for(let i=0;i<3;i++){const x=(i-1)*.5;box(.035,1.5,.035,steel,x,0,i*.12);}else{rod([-.75,-.75,0],[.75,.75,0],.015);rod([-.75,.75,-.3],[.75,-.75,-.3],.015);}}
 else if(key==='floral-attachments'||key==='wave-connections'||key==='panel-mounts')brackets();
 else if(key==='disc-fixings'){brackets();for(const x of [-.7,.7])rod([x,-.8,0],[-x,.8,0],.008,dark);}
 else if(key==='perimeter'){frame(1.5,1.5,0,dark);frame(1.42,1.42,.035,light);}
 else if(key==='integrated-lighting'){for(let i=0;i<3;i++){box(1.5,.11,.12,steel,0,(i-1)*.4,0);box(1.4,.075,.015,light,0,(i-1)*.4,.07);}}
 else if(key==='discs'){for(let i=0;i<9;i++)disc((i%3-1)*.4,(Math.floor(i/3)-1)*.4,(i%2)*.04,.16);}
 else if(key==='disc-connections'){for(let i=0;i<4;i++){const x=(i-1.5)*.35;rod([x,-.7,0],[x,.7,0],.006);for(const y of [-.45,0,.45])ring(.065,.007,steel,x,y,.01);}}
 else if(key==='disc-surface'){for(let row=0;row<9;row++)for(let col=0;col<11;col++){const x=(col-5)*.145,y=(row-4)*.145,z=.12*Math.sin(col*.7);disc(x,y,z,.07);if(row<8)ring(.025,.005,steel,x,y+.075,z);}}
 else if(key==='mesh'){for(let i=0;i<15;i++){const p=(i-7)*.1;rod([p,-.7,0],[p,.7,0],.004);rod([-.7,p,.005],[.7,p,.005],.004);}}
 else if(key==='rectangular-panels')panels(wood);
 else if(key==='gold-panels')panels(gold);
 else if(key==='white-panels')panels(white);
 else if(key==='translucent-panels'){const m=mat(0xe1e8df);m.transparent=true;m.opacity=.5;panels(m,true);}
 return group;
}
