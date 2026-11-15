import * as THREE from 'three';
export const iconiqueKeys=['large-discs','gold-discs','silver-discs','dark-discs','disc-perforations','disc-cutouts','interlocking','reflective-finishes'];
// Photo-informed reconstructions of the perforated metal-disc installation.
export function iconiqueModel(key){
 const group=new THREE.Group(),pixels=new Uint8Array(128*64*4);
 for(let y=0;y<64;y++)for(let x=0;x<128;x++){const bright=x>14&&x<39||x>81&&x<103,v=bright?240:65+Math.round(55*Math.sin(y*Math.PI/64));pixels.set([v,v,Math.min(255,v+(bright?0:18)),255],(y*128+x)*4);}
 const env=new THREE.DataTexture(pixels,128,64);env.mapping=THREE.EquirectangularReflectionMapping;env.colorSpace=THREE.SRGBColorSpace;env.needsUpdate=true;
 const metal=color=>new THREE.MeshStandardMaterial({color,metalness:1,roughness:.12,envMap:env,envMapIntensity:1.15,side:THREE.DoubleSide});
 const silver=metal(0xe0e8f4),gold=metal(0xe4c96c),dark=metal(0x495048),metals=[silver,gold,dark];
 const add=(geometry,material,parent=group)=>{const mesh=new THREE.Mesh(geometry,material);parent.add(mesh);return mesh;};
 const groove=(material,parent)=>{
  const points=[];for(let i=0;i<=12;i++)points.push(new THREE.Vector3(-.064,.48-i*.078,.025));
  for(let i=0;i<=18;i++){const a=Math.PI+i*Math.PI/18;points.push(new THREE.Vector3(Math.cos(a)*.064,-.456+Math.sin(a)*.064,.025));}
  for(let i=0;i<=12;i++)points.push(new THREE.Vector3(.064,-.456+i*.078,.025));
  const m=material.clone();m.roughness=.38;m.color.multiplyScalar(.66);add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),72,.004,6,false),m,parent);
 };
 const disc=(x,y,z,scale,material)=>{
  const parent=new THREE.Group();parent.position.set(x,y,z);parent.scale.setScalar(scale);group.add(parent);
  const s=new THREE.Shape();s.absarc(0,0,.74,0,Math.PI*2,false);const holes=[[-.36,.28,.13],[.36,.28,.13],[-.36,-.28,.13],[.36,-.28,.13],[0,.53,.098]];
  for(const [hx,hy,r]of holes){const hole=new THREE.Path();hole.absarc(hx,hy,r,0,Math.PI*2,true);s.holes.push(hole);}
  const face=add(new THREE.ExtrudeGeometry(s,{depth:.018,bevelEnabled:true,bevelSize:.003,bevelThickness:.003,bevelSegments:2,curveSegments:40}),material,parent);face.userData.component='five-hole-disc';
  for(const [hx,hy,r]of holes.slice(0,4)){const rim=add(new THREE.TorusGeometry(r+.008,.004,6,48),material,parent);rim.position.set(hx,hy,.023);}
  groove(material,parent);return parent;
 };
 const link=(x,y,z,scale=1)=>{
  const s=new THREE.Shape();s.absellipse(0,0,.26,.075,0,Math.PI*2,false);const h=new THREE.Path();h.absellipse(0,0,.23,.046,0,Math.PI*2,true);s.holes.push(h);
  const m=add(new THREE.ExtrudeGeometry(s,{depth:.016,bevelEnabled:true,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:32}),silver);m.position.set(x,y,z);m.scale.setScalar(scale);m.rotation.x=.35;m.userData.component='curved-connector';return m;
 };
 if(key==='disc-perforations')disc(0,0,0,1,silver);
 else if(key==='disc-cutouts'){for(let i=0;i<3;i++){const m=link((i-1)*.65,(i%2)*.13,0,1.1);m.rotation.z=(i-1)*.12;}}
 else if(key==='interlocking'){
  const size=.51,step=.70;for(let row=0;row<3;row++)for(let col=0;col<3;col++){const x=(col-1)*step,y=(row-1)*step;disc(x,y,(row%2)*.025,size,metals[(col+row)%3]);if(col<2)for(const sign of [-1,1])link(x+step/2,y+sign*.28*size,.075,size*1.35);}
 }else if(key==='large-discs'){
  for(const [x,y,s,i]of [[-.68,.48,.6,1],[.05,.48,.6,0],[.78,.48,.6,2],[-.35,-.34,.6,2],[.4,-.34,.6,1]])disc(x,y,.01*i,s,metals[i]);
 }else{
  const material=key==='gold-discs'?gold:key==='dark-discs'?dark:silver;
  for(let i=0;i<3;i++){const m=disc((i-1)*.73,(i%2)*.18,0,.55,key==='reflective-finishes'?metals[i]:material);m.rotation.y=(i-1)*.12;}
 }
 return group;
}
