import * as THREE from 'three';

// Reference-based isolated components, not photogrammetry or measured fabrication drawings.
export function guerlainStructureModel(key){return key==='honeycomb'?timberHoneycomb():beeFramework();}

function woodTexture(){
 const width=256,height=64,data=new Uint8Array(width*height*4);let seed=73;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  seed=seed*16807%2147483647;
  const grain=Math.sin(y*.62+Math.sin(x*.025)*1.5)*5+Math.sin(y*2.6+x*.008)*2+(seed%100)/35;
  const i=(y*width+x)*4;data[i]=187+grain;data[i+1]=133+grain;data[i+2]=101+grain;data[i+3]=255;
 }
 const texture=new THREE.DataTexture(data,width,height,THREE.RGBAFormat);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(2,3);texture.needsUpdate=true;return texture;
}

function timberHoneycomb(){
 const group=new THREE.Group();group.name='Connected timber honeycomb frames';
 const face=new THREE.MeshStandardMaterial({color:0xe2b29a,map:woodTexture(),roughness:.83,metalness:0});
 const cells=[{x:-.3,y:1.8,r:.4}];
 const attach=(parent,angle,r)=>{const p=cells[parent],distance=(p.r+r)*Math.cos(Math.PI/6);cells.push({x:p.x+distance*Math.cos(angle),y:p.y+distance*Math.sin(angle),r});};
 attach(0,-Math.PI/6,.4);attach(1,Math.PI/6,.38);attach(0,-Math.PI/2,.45);
 attach(3,-Math.PI/6,.45);attach(3,-Math.PI/2,.5);attach(5,-Math.PI/6,.55);
 attach(5,-Math.PI/2,.6);attach(7,-5*Math.PI/6,.63);attach(7,-Math.PI/2,.67);attach(9,-Math.PI/6,.73);
 for(const [index,{x,y,r}]of cells.entries()){
  const points=radius=>Array.from({length:6},(_,i)=>new THREE.Vector2(Math.cos(i*Math.PI/3)*radius,Math.sin(i*Math.PI/3)*radius));
  const shape=new THREE.Shape(points(r));shape.closePath();
  const opening=new THREE.Path(points(r-.047/Math.cos(Math.PI/6)).reverse());opening.closePath();shape.holes.push(opening);
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:.065,steps:1,bevelEnabled:true,bevelSegments:2,bevelSize:.004,bevelThickness:.004,curveSegments:1});
  const frame=new THREE.Mesh(geometry,face);frame.position.set(x,y,0);frame.name=`Wooden hexagonal frame ${index+1}`;frame.userData.part='timber-hexagon';group.add(frame);
 }
 group.userData.reference='Connected flat wooden hexagonal frames with progressively larger lower openings';
 return group;
}

function beeFramework(){
 const group=new THREE.Group();group.name='Dismantled dark metal bee framework';
 const steel=new THREE.MeshStandardMaterial({color:0x343839,metalness:.78,roughness:.38});
 const boltMaterial=new THREE.MeshStandardMaterial({color:0x70716b,metalness:.75,roughness:.45});
 const body=new THREE.Group();body.name='Segmented ribbed body';group.add(body);
 const tube=(parent,points,radius=.014,closed=false)=>{
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),closed,'centripetal');
  const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(36,points.length*3),radius,8,closed),steel);parent.add(mesh);return mesh;
 };
 const loop=(parent,rx,ry,y,z=0)=>tube(parent,Array.from({length:32},(_,i)=>{const a=i*Math.PI/16;return [Math.cos(a)*rx,y+Math.sin(a)*ry,z];}),.014,true);
 const outline=[[0,1.18,0],[.29,.92,0],[.43,.46,0],[.41,.04,0],[.32,-.39,0],[.18,-.85,0],[0,-1.2,0]];
 for(const sign of [-1,1])for(const z of [-.055,.055])tube(body,outline.map(([x,y])=>[x*sign,y,z]));
 const ribs=[[.94,.25,.085],[.62,.37,.12],[.27,.43,.15],[-.09,.4,.14],[-.45,.3,.115],[-.78,.19,.085],[-1.03,.09,.05]];
 for(const [y,rx,depth]of ribs){
  const rib=tube(body,Array.from({length:32},(_,i)=>{const a=i*Math.PI/16;return [rx*Math.cos(a),y,depth*Math.sin(a)];}),.014,true);rib.userData.part='body-rib';
  for(const sign of [-1,1]){
   const tab=new THREE.Mesh(new THREE.BoxGeometry(.055,.038,.014),steel);tab.position.set(sign*rx,y,.07);tab.rotation.z=sign*.18;tab.userData.part='attachment-tab';body.add(tab);
   const bolt=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.02,8),boltMaterial);bolt.rotation.x=Math.PI/2;bolt.position.set(sign*rx,y,.083);body.add(bolt);
  }
 }
 const head=new THREE.Group();head.name='Open head hoops and antennae';group.add(head);
 loop(head,.19,.25,1.36);loop(head,.15,.21,1.42,.09);loop(head,.22,.25,1.32,-.07);
 for(const sign of [-1,1])tube(head,[[sign*.08,1.55,0],[sign*.12,1.75,0],[sign*.25,1.8,0],[sign*.29,1.72,0]],.01);
 for(const sign of [-1,1]){
  const wing=new THREE.Group();wing.name=sign<0?'Separate left wing frame':'Separate right wing frame';wing.userData.part='wing-frame';group.add(wing);
  const edge=(t,side)=>{const width=.51*Math.sin(Math.PI*t)**.8;return [sign*(1.18+.4*t+side*width),-.98+2.1*t+(sign<0?-.08:.03),.04*Math.sin(Math.PI*t)];};
  const perimeter=[];for(let i=0;i<=24;i++)perimeter.push(edge(i/24,-1));for(let i=23;i>0;i--)perimeter.push(edge(i/24,1));
  tube(wing,perimeter,.014,true).userData.part='wing-perimeter';
  tube(wing,[[sign*1.18,-.98+(sign<0?-.08:.03),0],[sign*1.36,.07,.08],[sign*1.58,1.12+(sign<0?-.08:.03),0]],.011);
  for(const t of [.2,.43,.68]){const a=edge(t,-1),b=edge(t,1),middle=a.map((v,i)=>(v+b[i])/2);middle[1]+=.045;middle[2]+=.08;const rib=tube(wing,[a,middle,b],.011);rib.userData.part='wing-rib';}
  for(const t of [.25,.65]){const p=edge(t,-1);const tab=new THREE.Mesh(new THREE.BoxGeometry(.05,.06,.016),steel);tab.position.set(...p);tab.position.z+=.02;tab.rotation.z=sign*.2;tab.userData.part='attachment-tab';wing.add(tab);}
 }
 group.userData.reference='Dark rounded metal ribs, tapered segmented body, open head hoops and two detached teardrop wing frames';
 return group;
}
