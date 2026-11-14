import * as THREE from 'three';

// Isolated components matching the photographed globe swags and bulb-lined gold ornaments.
export function boldBrightModel(key){
 const group=new THREE.Group();
 const gold=new THREE.MeshStandardMaterial({color:0xd5b65b,metalness:.55,roughness:.3});
 const opal=new THREE.MeshStandardMaterial({color:0xfffdf0,emissive:0xffedbc,emissiveIntensity:.55,roughness:.28});
 const bulbGeo=new THREE.SphereGeometry(1,24,16);
 const bulb=(x,y,z,r=.032)=>{const mesh=new THREE.Mesh(bulbGeo,opal);mesh.position.set(x,y,z);mesh.scale.setScalar(r);mesh.userData.part='opal-globe';group.add(mesh);};
 const tube=(points,r=.014)=>{const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,64,r,8,false),gold);group.add(mesh);mesh.userData.part='gold-support';return curve;};
 const bar=(a,b)=>tube([a,b],.026);
 if(key==='light-spheres'||key==='sphere-supports'){
  const showGlobes=key==='light-spheres';group.name=showGlobes?'White globe garlands on gold scalloped rails':'Gold linear and scalloped globe support rails';
  tube([[-1.3,.25,0],[1.3,.25,0]],.018);
  const mounts=[];
  for(let i=0;i<9;i++)mounts.push([-1.28+i*.32,.25,0,i%4===0?.14:i%2?.085:.105]);
  for(const centre of [-.64,.64]){
   const curve=tube([[centre-.64,.25,0],[centre-.5,-.15,0],[centre,-.43,0],[centre+.5,-.15,0],[centre+.64,.25,0]],.014);
   for(let i=1;i<6;i++){const p=curve.getPoint(i/6);mounts.push([p.x,p.y,p.z,.085]);}
  }
  for(const [x,y,z,r]of mounts){
   if(showGlobes)bulb(x,y,z+.055,r);
   else{const socket=new THREE.Mesh(new THREE.TorusGeometry(r*.34,.008,8,24),gold);socket.position.set(x,y,.026);socket.userData.part='globe-mount';group.add(socket);}
  }
  if(!showGlobes)for(const x of [-1.28,0,1.28]){bar([x,.25,0],[x,.25,-.18]);const bracket=new THREE.Mesh(new THREE.BoxGeometry(.07,.16,.025),gold);bracket.position.set(x,.25,-.2);bracket.userData.part='mounting-bracket';group.add(bracket);}
 }else{
  group.name='Gold open circles and tapered ornaments lined with warm bulbs';
  for(const x of [-1,1]){
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.21,.029,10,64),gold);ring.position.set(x,0,0);ring.userData.part='open-circular-frame';group.add(ring);
   for(let i=0;i<14;i++){const a=i*Math.PI/7;bulb(x+.21*Math.cos(a),.21*Math.sin(a),.034,.032);}
  }
  const disk=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.04,48),gold);disk.rotation.x=Math.PI/2;disk.userData.part='central-roundel';group.add(disk);
  bulb(0,0,.045,.034);for(let i=0;i<8;i++){const a=i*Math.PI/4;bulb(.125*Math.cos(a),.125*Math.sin(a),.045,.034);}
  for(const side of [-1,1]){
   for(const vertical of [-1,1]){
    const a=[side*.77,0,0],b=[side*.24,vertical*.17,0];const path=bar(a,b);
    for(let i=0;i<=7;i++){const p=path.getPoint(i/7);bulb(p.x,p.y,.034,.029);}
   }
   const path=bar([side*.2,0,0],[side*.6,0,0]);for(let i=0;i<5;i++){const p=path.getPoint(i/4);bulb(p.x,p.y,.034,.029);}
  }
 }
 return group;
}
