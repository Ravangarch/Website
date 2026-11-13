import * as THREE from 'three';
import {materialModel} from './materials.js';
import {provisionalModel} from './models.js';
import {cartierDefinitions,cartierModel} from './cartier-projects.js';
const entry=(name,label,key,type='Metal',properties='Clean finish · no visible defects')=>({name,materialLabel:label,componentModel:key,type,properties});
export const brandCollections={
 'Sotheby’s':[
 entry('Openings and inset frames','Timber and cut sheet panels','inset-frame','Wood','Clean timber frame · cut sheet panels · inset opening'),
 entry('LED display modules','LED display modules','led-display','Lighting','Clean modular display · illuminated LED surface')],
 Nike:[
 entry('Large red spheres','Papier-mâché, moulded cellulose fibre, cork composite','red-spheres','Bio-based composite','Clean moulded spherical surfaces · red finish'),
 entry('Internal sphere structure','Bamboo ribs, thin timber battens, aluminium hoops','sphere-ribs','Structure','Clean internal rib structure · lightweight circular hoops'),
 entry('Black polka dots','Mineral-pigment paint, casein paint','polka-dots','Mineral coating','Clean painted dots · matte black finish')],
 Pomellato:[
 entry('Circular outer frames','Aluminium or stainless steel','outer-rings'),
 entry('Green decorative surface','Natural stone veneer (malachite), mineral pigments on wood','green-surface','Mineral coating'),
 entry('Central jewellery details','Polished stainless steel, aluminium, glass crystals','jewellery'),
 entry('Suspension oversized chains','Stainless steel or galvanised steel','chains','Structure'),
 entry('Circular backing panels','Thin aluminium sheet, plywood or lightweight timber composite with natural binder','backing-panels','Structure')],
 'Louis Vuitton':[
 {...entry('Gold and silver panels','Aluminium sheets, anodised aluminium, stainless steel','metal-panels'),year:2021,project:'Le Damier'},
 {...entry('Panel backing','Aluminium honeycomb with metal bonding or folded sheet-metal cassettes','panel-backing','Structure'),year:2021,project:'Le Damier'},
 {...entry('Mirrored spheres','Polished stainless steel, mirror-finished aluminium','mirrored-spheres'),year:2021,project:'Creating Infinity'},
 {...entry('Sphere segments','Pressed or spun sheet metal','sphere-segments'),year:2021,project:'Creating Infinity'},
 {...entry('Central sphere','Polished brass, aluminium or stainless steel','central-sphere'),year:2022,project:'Le Soleil'},
 {...entry('Radiating rods','Aluminium tubes, steel rods, brass rods','radiating-rods','Structure'),year:2022,project:'Le Soleil'},
 {...entry('Lighting','LED lighting with glass and metal fixtures','lighting','Lighting'),year:2022,project:'Le Soleil'}],
 'Polène':[
 entry('Folded metal petal composition','Metal petals and thermoformed Kairlin bio-based composite','petal-composition','Bio-based composite'),
 entry('Flower stems','Wood, bamboo or hollow metal tubing','flower-stems','Structure'),
 entry('Flower centres / tassels','Cotton, linen, hemp or natural leather cords','tassels','Natural fibres')],
 Guerlain:[
 entry('Main geometric bee structure','Material specification not supplied','geometric-bee','Structure','Creates the three-dimensional bee silhouette · clean geometric framework'),
 entry("Bee’s illuminated outlines",'LED lighting in glass or metal channels','illuminated-bee','Lighting'),
 entry('Honeycomb structures','Brass, aluminium or steel rods','honeycomb','Structure'),
 entry('Decorative flowers and foliage','Pressed metal, paper, dried natural foliage','foliage','Natural fibres'),
 entry('Illuminated stars','Metal wire frames, glass diffusers','stars','Lighting')]
};
brandCollections.Cartier=cartierDefinitions;
const recordId=(brand,index,i)=>(brand==='Cartier'?800:700+index*10)+i;
export function createBrandRecords(){return Object.entries(brandCollections).flatMap(([brand,items],index)=>items.map((item,i)=>({...item,id:recordId(brand,index,i),brand,year:item.year===null?null:item.year??2025+i%2,shape:4,quantity:3+i%4,volume:(.02+i*.015).toFixed(3),place:item.place||(i%3===0?'On display':'In storage'),condition:!item.place&&i%3===0?'N/A — currently on display':'Good · no visible defects',passport:`DMP–${item.year===null?'CHRISTMAS':item.year??2025+i%2}–${recordId(brand,index,i)}`,description:`${item.name} from the ${brand} collection.${item.project?` Project: ${item.project}${item.year?` (${item.year})`:''}.`:''} Material selection: ${item.materialLabel}. Clean, undamaged classroom 3D example; inventory quantities, dates and passport are fictional.`})));}

export function componentModel(key){
 if(key.startsWith('cartier-'))return cartierModel(key);
 if(key==='petal-composition')return provisionalModel(2);
 if(key==='lighting')return materialModel('led');
 const group=new THREE.Group();
 const material=(color,metalness=0,roughness=.65)=>new THREE.MeshStandardMaterial({color,metalness,roughness,side:THREE.DoubleSide});
 const timber=material(0xb38b5d),bamboo=material(0xd8c79f),silver=material(0xc5c8cc,.85,.2),gold=material(0xc8a252,.85,.25),red=material(0xc71922),black=material(0x171717),ivory=material(0xe6dfcb);
 const light=new THREE.MeshStandardMaterial({color:0xffefb7,emissive:0xffcf67,emissiveIntensity:1.3,roughness:.35});
 const add=(geometry,mat,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const box=(w,h,d,mat,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),mat,x,y,z);
 const sphere=(radius,mat,x=0,y=0,z=0)=>add(new THREE.SphereGeometry(radius,40,28),mat,x,y,z);
 const rod=(a,b,r=.025,mat=silver)=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);const mesh=add(new THREE.CylinderGeometry(r,r,delta.length(),12),mat);mesh.position.copy(start).add(end).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh;};
 const ring=(r,t=.025,mat=silver,x=0,y=0,z=0)=>add(new THREE.TorusGeometry(r,t,12,64),mat,x,y,z);
 const hex=(cx,cy,r=.28,depth=.14,mat=gold)=>{for(let i=0;i<6;i++){const a=i*Math.PI/3,b=(i+1)*Math.PI/3;for(const z of [-depth/2,depth/2])rod([cx+r*Math.cos(a),cy+r*Math.sin(a),z],[cx+r*Math.cos(b),cy+r*Math.sin(b),z],.014,mat);rod([cx+r*Math.cos(a),cy+r*Math.sin(a),-depth/2],[cx+r*Math.cos(a),cy+r*Math.sin(a),depth/2],.014,mat);}};
 const ellipse=(x,y,rx,ry,angle,mat)=>{const mesh=ring(1,.016,mat,x,y,0);mesh.scale.set(rx,ry,1);mesh.rotation.z=angle;return mesh;};
 if(key==='inset-frame'){
  const panel=new THREE.Shape();panel.moveTo(-.8,-1);panel.lineTo(.8,-1);panel.lineTo(.8,1);panel.lineTo(-.8,1);panel.closePath();const hole=new THREE.Path();hole.moveTo(-.52,-.72);hole.lineTo(-.52,.3);hole.absarc(0,.3,.52,Math.PI,0,true);hole.lineTo(.52,-.72);hole.closePath();panel.holes.push(hole);add(new THREE.ExtrudeGeometry(panel,{depth:.09,bevelEnabled:false}),timber);
  for(const x of [-.69,.69])box(.09,1.9,.16,material(0xd2b58a),x,0,.08);for(const y of [-.88,.88])box(1.42,.09,.16,material(0xd2b58a),0,y,.08);
 }else if(key==='led-display'){
  box(1.8,1.15,.15,black);const colours=[0xffa235,0xd8ecf0,0xc42d65,0x4a6b9a];for(let row=0;row<10;row++)for(let col=0;col<16;col++){const c=colours[(Math.floor(col/4)+Math.floor(row/3))%4];const mat=new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:.65});box(.092,.09,.012,mat,-.78+col*.104,-.46+row*.102,.083);}
 }else if(key==='red-spheres'){sphere(.7,red,0,.18,0);sphere(.35,red,-.8,-.45,.15);sphere(.26,red,.75,-.3,-.05);}
 else if(key==='sphere-ribs'){for(let i=0;i<10;i++){const rib=ring(.8,.017,i%2?bamboo:timber);rib.rotation.y=i*Math.PI/10;}for(const y of [-.42,0,.42]){const hoop=ring(Math.sqrt(.8*.8-y*y),.018,silver,0,y,0);hoop.rotation.x=Math.PI/2;}}
 else if(key==='polka-dots'){box(1.7,1.15,.04,red);for(let row=0;row<3;row++)for(let col=0;col<4;col++){const dot=add(new THREE.CircleGeometry(.09,32),black,-.59+col*.39,-.35+row*.35,.024);}}
 else if(key==='outer-rings'){ring(.8,.05,silver);ring(.62,.025,silver,0,0,.045);}
 else if(key==='green-surface'){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#165e42';ctx.fillRect(0,0,128,128);for(let i=0;i<22;i++){ctx.strokeStyle=i%2?'#389675':'#0e392b';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(52,60,8+i*4,5+i*3,.3,0,Math.PI*2);ctx.stroke();}const tex=new THREE.CanvasTexture(c);add(new THREE.RingGeometry(.29,.8,64),new THREE.MeshStandardMaterial({map:tex,roughness:.45,side:THREE.DoubleSide}));ring(.81,.02,silver);}
 else if(key==='jewellery'){ring(.5,.045,silver);ring(.23,.025,silver,0,0,.07);for(let i=0;i<9;i++){const a=i*Math.PI*2/9;const crystal=add(new THREE.OctahedronGeometry(i%2?.12:.16),new THREE.MeshStandardMaterial({color:0xe0eced,metalness:.2,roughness:.08,transparent:true,opacity:.75}),.5*Math.cos(a),.5*Math.sin(a),.09);crystal.rotation.z=a;}}
 else if(key==='chains'){for(let i=0;i<6;i++){const link=ring(.23,.035,silver,0,(i-2.5)*.3,0);link.scale.y=1.45;link.rotation.y=i%2?Math.PI/2:0;}}
 else if(key==='backing-panels'){for(let i=0;i<3;i++){const disc=add(new THREE.CylinderGeometry(.7,.7,.035,64),i===1?timber:silver,(i-1)*.16,(i-1)*.06,(i-1)*.15);disc.rotation.x=Math.PI/2;}}
 else if(key==='metal-panels'){for(let row=0;row<2;row++)for(let col=0;col<3;col++){const p=box(.48,.7,.035,(col+row)%2?gold:silver,(col-1)*.53,(row-.5)*.76,0);p.rotation.y=(col-1)*.1;}}
 else if(key==='panel-backing'){for(let row=0;row<4;row++)for(let col=0;col<6;col++)hex((col-2.5)*.26+(row%2)*.13,(row-1.5)*.23,.15,.15,silver);}
 else if(key==='mirrored-spheres'){sphere(.57,material(0xe0e5e9,1,.07),0,.18,0);sphere(.3,material(0xced3d8,1,.06),-.7,-.4,.12);sphere(.23,material(0xe4e7ea,1,.06),.65,-.3,.1);}
 else if(key==='sphere-segments'){for(let i=0;i<3;i++){const segment=add(new THREE.SphereGeometry(.43,40,24,0,Math.PI*2,0,Math.PI*.55),silver,(i-1)*.56,0,0);segment.rotation.x=-.6;segment.rotation.z=(i-1)*.3;}}
 else if(key==='central-sphere')sphere(.75,gold);
 else if(key==='radiating-rods'){sphere(.2,gold);for(let i=0;i<44;i++){const y=1-2*(i+.5)/44,a=i*2.399963,r=Math.sqrt(1-y*y),v=new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r);rod(v.clone().multiplyScalar(.2).toArray(),v.multiplyScalar(.95).toArray(),.018,i%3?gold:silver);}}
 else if(key==='flower-stems'){for(let i=0;i<3;i++)rod([-.3+i*.3,-.95,0],[-.2+i*.32,.95,(i-1)*.12],.035,[timber,bamboo,silver][i]);}
 else if(key==='tassels'){ring(.18,.025,timber,0,.65,0);const colours=[0xe2d0ad,0xc4a173,0xb6a286,0x8b6543];for(let i=0;i<15;i++){const x=(i-7)*.035;const path=new THREE.CatmullRomCurve3([new THREE.Vector3(x,.54,0),new THREE.Vector3(x*.6,.05,.09*Math.sin(i)),new THREE.Vector3(x*1.8,-.7-.08*Math.sin(i),.05*Math.cos(i))]);add(new THREE.TubeGeometry(path,24,.012,7,false),material(colours[i%4]));}}
 else if(key==='geometric-bee'||key==='illuminated-bee'){
  const glow=key==='illuminated-bee';const wire=glow?light:gold;for(const [y,r,sy] of [[-.32,.36,1.4],[.23,.27,1],[.62,.2,1]]){const geo=new THREE.IcosahedronGeometry(r,0);const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:glow?0xffdc75:0xb89c61}));edges.position.y=y;edges.scale.y=sy;group.add(edges);}
  for(const sign of [-1,1]){ellipse(sign*.48,.15,.28,.57,-sign*.65,wire);for(let i=0;i<3;i++)rod([sign*.15,.1-i*.18,0],[sign*(.55+i*.05),-.25-i*.25,0],.014,wire);rod([sign*.08,.78,0],[sign*.25,1,0],.012,wire);}
 }else if(key==='honeycomb'){for(const [x,y]of [[0,0],[.48,0],[-.48,0],[.24,.42],[-.24,.42],[.24,-.42],[-.24,-.42]])hex(x,y,.28,.14,gold);}
 else if(key==='foliage'){for(let i=0;i<3;i++){const x=(i-1)*.55;rod([x,-.85,0],[x,.45+i*.1,0],.018,timber);for(let j=0;j<5;j++){const a=j*Math.PI*2/5;const leaf=add(new THREE.SphereGeometry(.22,16,12),[gold,ivory,material(0x9e936b)][i],x+Math.cos(a)*.22,.48+i*.1+Math.sin(a)*.22,0);leaf.scale.set(.6,1,.08);leaf.rotation.z=a-.7;}for(const sign of [-1,1]){const leaf=add(new THREE.SphereGeometry(.18,16,12),material(0xa39369),x+sign*.12,-.1,.01);leaf.scale.set(.4,1,.07);leaf.rotation.z=-sign*.7;}}}
 else if(key==='stars'){for(let i=0;i<3;i++){const r=i===1?.48:.32,cx=(i-1)*.6,cy=i===1?.15:-.1;const points=[];for(let j=0;j<=10;j++){const a=j*Math.PI/5+Math.PI/2,rad=j%2?r*.43:r;points.push([cx+Math.cos(a)*rad,cy+Math.sin(a)*rad,0]);}for(let j=0;j<10;j++)rod(points[j],points[j+1],.016,silver);const shape=new THREE.Shape(points.slice(0,10).map(p=>new THREE.Vector2(p[0],p[1])));add(new THREE.ShapeGeometry(shape),new THREE.MeshStandardMaterial({color:0xfff4c9,emissive:0xffd77b,emissiveIntensity:.7,transparent:true,opacity:.75,side:THREE.DoubleSide}));}}
 return group;
}
