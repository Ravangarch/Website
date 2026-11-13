import * as THREE from 'three';
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
export function vanCleefModel(fullKey){const key=fullKey.replace('vca-',''),group=new THREE.Group();
 const material=(color,metalness=0)=>new THREE.MeshStandardMaterial({color,metalness,roughness:metalness?.3:.72,side:THREE.DoubleSide});
 const white=material(0xf1eee6),wood=material(0xc4a079),silver=material(0xc5d0d2,.75),copper=material(0xac7756,.6),green=material(0x28594b),turquoise=material(0x49b8b6),pink=material(0xe6a9b5),yellow=material(0xe9c05d),blue=material(0x7999bb);
 const add=(geo,mat,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const sphere=(r,mat,x=0,y=0,z=0)=>add(new THREE.SphereGeometry(r,28,20),mat,x,y,z);
 const rod=(a,b,r=.016,mat=silver)=>{const start=new THREE.Vector3(...a),delta=new THREE.Vector3(...b).sub(start);const mesh=add(new THREE.CylinderGeometry(r,r,delta.length(),10),mat);mesh.position.copy(start).addScaledVector(delta,.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh;};
 const curve=(points,r=.018,mat=silver)=>add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),32,r,8,false),mat);
 const petal=(x,y,z,angle,size,mat)=>{const shape=new THREE.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-size*.5,size*.4,-size*.42,size,0,size);shape.bezierCurveTo(size*.42,size,size*.5,size*.4,0,0);const mesh=add(new THREE.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.012,bevelThickness:.008}),mat,x,y,z);mesh.rotation.z=angle;mesh.rotation.x=.12*Math.sin(angle);return mesh;};
 const roof=(x,y,z,w=.65)=>{for(const sign of [-1,1]){const mesh=add(new THREE.BoxGeometry(w*.72,.045,w*.85),pink,x+sign*w*.23,y,z);mesh.rotation.z=-sign*Math.PI/4;}};
 if(key==='snowdrifts'||key==='snow-finish'){
  for(let i=0;i<3;i++){const geo=new THREE.PlaneGeometry(1.7,.7,36,18),pos=geo.attributes.position;for(let j=0;j<pos.count;j++){const x=pos.getX(j),y=pos.getY(j);pos.setY(j,y+.15*Math.cos(x*3+i));pos.setZ(j,.1*Math.sin(x*2)+.07*Math.cos(y*4));}geo.computeVertexNormals();add(geo,key==='snow-finish'?white:i===1?wood:white,(i-1)*.1,(i-1)*.24,(i-1)*.23);}
 }else if(key==='houses'){
  for(let i=0;i<3;i++){const x=(i-1)*.66,y=i===1?.12:0;add(new THREE.BoxGeometry(.5,.65,.4),i%2?white:wood,x,y,0);roof(x,y+.48,0,.6);add(new THREE.BoxGeometry(.13,.23,.018),blue,x,y-.2,.21);for(const dx of [-.14,.14])add(new THREE.BoxGeometry(.09,.1,.018),yellow,x+dx,y+.09,.21);}
 }else if(key==='roofs'){for(let i=0;i<3;i++)roof((i-1)*.65,(i%2)*.15,0,.65);}
 else if(key==='ornaments'){for(let i=0;i<3;i++){const x=(i-1)*.58,y=i===1?.18:-.08;add(new THREE.TorusGeometry(.26+i*.035,.015,10,56),silver,x,y,0);rod([x,y+.28+i*.035,0],[x,1,0],.006,silver);}}
 else if(key==='snowflakes'){for(const [cx,cy,r]of [[-.55,.15,.38],[.4,-.1,.5]])for(let i=0;i<6;i++){const a=i*Math.PI/3,dx=Math.cos(a),dy=Math.sin(a);rod([cx,cy,0],[cx+dx*r,cy+dy*r,0],.014,white);for(const sign of [-1,1]){const b=a+sign*.8;rod([cx+dx*r*.6,cy+dy*r*.6,0],[cx+dx*r*.6+Math.cos(b)*r*.28,cy+dy*r*.6+Math.sin(b)*r*.28,0],.01,silver);}}}
 else if(key==='spheres'){for(let i=0;i<7;i++){const a=i*2.4;sphere(.16+i%3*.03,[pink,blue,turquoise,yellow][i%4],Math.cos(a)*.55,Math.sin(a)*.48,(i%2)*.15);}}
 else if(key==='trees'){for(let i=0;i<3;i++){const x=(i-1)*.63,h=i===1?1.3:1;rod([x,-.65,0],[x,h*.5,0],.025,wood);for(let j=0;j<4;j++){const cone=add(new THREE.ConeGeometry(.35-j*.065,.4,12),green,x,-.3+j*.22+(h-1)*.3,0);}}}
 else if(key==='stems'){for(let i=0;i<4;i++){const x=(i-1.5)*.26;curve([[x,-.95,0],[x+.12,-.2,.05],[x-.12,.5,-.04],[x+.05,.95,0]],.018,i%2?green:silver);}}
 else if(key==='branches'){for(let i=0;i<3;i++){const x=(i-1)*.5;curve([[x,-.9,0],[x-.06,0,.04],[x+.06,.85,0]],.016,i%2?copper:silver);for(let j=0;j<3;j++)for(const sign of [-1,1])curve([[x,-.25+j*.25,0],[x+sign*.13,.02+j*.25,.04],[x+sign*.26,.18+j*.25,0]],.01,copper);}}
 else if(key==='large-petals'||key==='small-petals'){const n=key==='large-petals'?6:9,size=key==='large-petals'?.8:.48;for(let i=0;i<n;i++)petal(0,0,(i%2)*.035,i*Math.PI*2/n,size,i%2?pink:white);}
 else if(key==='centres'){for(let i=0;i<5;i++){const disk=add(new THREE.CylinderGeometry(.19,.19,.08,32),[yellow,pink,turquoise][i%3],(i%3-1)*.5,Math.floor(i/3)*.5-.2,0);disk.rotation.x=Math.PI/2;for(let j=0;j<9;j++){const a=j*2.4;sphere(.025,white,(i%3-1)*.5+Math.cos(a)*.11,Math.floor(i/3)*.5-.2+Math.sin(a)*.11,.07);}}}
 else if(key==='stamens'){for(let i=0;i<15;i++){const a=i*2.4,x=Math.cos(a)*.4,y=.35+Math.sin(a)*.3;curve([[0,-.65,0],[x*.5,-.1,.04],[x,y,.08]],.009,i%2?copper:white);const tip=sphere(.055,yellow,x,y,.08);tip.scale.y=1.5;}}
 else if(key==='buds'){for(let i=0;i<5;i++){const x=(i-2)*.32,y=(i%2)*.25;rod([x,-.7,0],[x,y,0],.012,green);const bud=sphere(.15,i%2?pink:white,x,y+.16,0);bud.scale.set(.8,1.45,.8);petal(x,y,0,-.4,.2,green);}}
 else if(key==='leaves'){for(let i=0;i<5;i++){const x=(i-2)*.31,y=i%2*.25-.2;petal(x,y,0,(i-2)*.32,.65,turquoise);rod([x,y,.035],[x-Math.sin((i-2)*.32)*.57,y+Math.cos((i-2)*.32)*.57,.035],.008,silver);}}
 return group;
}
