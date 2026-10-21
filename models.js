import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
export async function loadModel(file){const extension=file.name.split('.').pop().toLowerCase();let model;if(extension==='glb'){const gltf=await new GLTFLoader().parseAsync(await file.arrayBuffer(),'');model=gltf.scene;}else if(extension==='stl'){model=new THREE.Mesh(new STLLoader().parse(await file.arrayBuffer()),new THREE.MeshStandardMaterial({color:0xbcb7ae,roughness:.6}));}else if(extension==='obj'){model=new OBJLoader().parse(await file.text());}else throw Error('Use a self-contained GLB, STL, or OBJ model.');
const box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());const dimension=Math.max(size.x,size.y,size.z);if(!Number.isFinite(dimension)||dimension<=0)throw Error('The model contains no visible geometry.');model.position.sub(center);const group=new THREE.Group();group.add(model);group.scale.setScalar(2/dimension);return group;}
// Visual reconstructions from the supplied detachable-frame and petal reference boards.
export function provisionalModel(kind,{packed=false}={}){
 const group=new THREE.Group();
 const steel=new THREE.MeshStandardMaterial({color:0xd5cfc6,metalness:.35,roughness:.47});
 const bolts=new THREE.MeshStandardMaterial({color:0x93948f,metalness:.8,roughness:.3});
 function box(width,height,depth,x,y,z,material=steel){const mesh=new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),material);mesh.position.set(x,y,z);group.add(mesh);return mesh;}
 function fastener(x,y,z){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(.024,.024,.035,6),bolts);mesh.rotation.x=Math.PI/2;mesh.position.set(x,y,z);group.add(mesh);}
 if(kind===1){
  // Square steel tubing, adjustable cross members, compression pads and clamp blocks.
  const length=2.9;
  for(const y of [-.85,.85])box(length,.065,.065,0,packed?-.42+(y+.85)*.06:y,0);
  for(let i=0;i<4;i++){
   const x=[-1.15,-.38,.38,1.15][i];
   if(packed){box(1.72,.065,.065,0,-.34+i*.09,0);box(.14,.11,.12,-.68+i*.43,-.34+i*.09,0);}
   else{box(.065,1.7,.065,x,0,0);for(const y of [-.85,.85]){box(.15,.14,.12,x,y,0);fastener(x,y,.08);}}
  }
  for(let pair=0;pair<2;pair++)for(const y of [-.3,.3]){
   const center=pair===0?-.765:.765;
   box(.88,.065,.065,packed?0:center,packed?.07+(pair*2+(y>0?1:0))*.085:y,packed?0:.015);
   if(!packed)for(const x of [center-.385,center+.385]){box(.12,.12,.12,x,y,.01);fastener(x,y,.09);}
  }
  for(const x of [-1.5,1.5])for(const y of [-.85,.85]){
   if(!packed){box(.12,.11,.11,x,y,0);box(.025,.17,.15,x+(x>0?.06:-.06),y,0,bolts);}
  }
  if(packed){const edges=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.1,.9,.24)),new THREE.LineBasicMaterial({color:0x999999,transparent:true,opacity:.35}));edges.position.y=-.05;group.add(edges);}
  group.scale.setScalar(.8);
 }else{
  // Thin folded, curled petals with an asymmetric concave profile.
  const palette=[0xe7e6df,0xcbb49c,0xa18a7e,0xeee9dc,0xe6cc8a,0xc9b7a8];
  for(let petal=0;petal<6;petal++){
   const points=[],indices=[],steps=32,across=18;
   for(let i=0;i<=steps;i++){const u=i/steps;const width=Math.pow(Math.sin(Math.PI*u),.68)*(.3+petal%2*.045);
    for(let j=0;j<=across;j++){const v=j/across*2-1;points.push(v*width,u*.9,.28*Math.sin(Math.PI*u)*(1-v*v)+.13*u*u+.11*v*u);}}
   for(let i=0;i<steps;i++)for(let j=0;j<across;j++){const a=i*(across+1)+j,b=a+across+1;indices.push(a,b,a+1,b,b+1,a+1);}
   const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));geo.setIndex(indices);geo.computeVertexNormals();
   const leaf=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:palette[petal],metalness:.18,roughness:.59,side:THREE.DoubleSide}));
   leaf.rotation.set((petal%2?-.25:.15),petal%3*.3-.3,petal*Math.PI/3+.25);leaf.position.set(0,.33,.04+petal*.008);group.add(leaf);
  }
  const stemMaterial=new THREE.MeshStandardMaterial({color:0x9a6c45,metalness:.55,roughness:.35});
  for(let i=0;i<2;i++){const start=new THREE.Vector3(-.48+i*.04,-1.3,-.03),end=new THREE.Vector3(-.02+i*.03,.38,-.015);const delta=end.clone().sub(start);const rod=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,delta.length(),12),stemMaterial);rod.position.copy(start).add(end).multiplyScalar(.5);rod.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());group.add(rod);}
  const center=new THREE.Mesh(new THREE.SphereGeometry(.065,16,12),steel);center.position.set(0,.33,.02);group.add(center);
  group.scale.setScalar(.85);
 }
 return group;
}

export function reuseModel(variant=0){
 const group=new THREE.Group();
 const palette=[0xb78b5e,0xd0ad82,0xe3d6bb,0x969b9e];
 const layouts=[
  [[1.45,.38,.9,0,-.6,0],[1.05,.4,.75,.05,-.21,0],[.68,.42,.62,-.05,.2,0],[.38,.3,.4,.02,.56,0]],
  [[.65,.55,.65,-.36,-.55,0],[.65,.55,.65,.36,-.55,0],[1.5,.2,.75,0,-.17,0],[.7,.55,.65,0,.21,0]],
  [[1.6,.3,.6,0,-.6,0],[.45,.65,.6,-.52,-.12,0],[.45,.65,.6,.52,-.12,0],[1.6,.25,.65,0,.33,0],[.55,.35,.55,0,.63,0]],
  [[1.2,.4,.9,0,-.6,0],[.9,.4,.75,.16,-.2,0],[.65,.4,.62,-.12,.2,0],[.5,.35,.5,.12,.58,0]]
 ];
 layouts[variant%layouts.length].forEach(([w,h,d,x,y,z],i)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:palette[(i+variant)%palette.length],roughness:.65,metalness:i===3?.25:0}));mesh.position.set(x,y,z);group.add(mesh);});return group;
}

export function centerModel(object){object.updateMatrixWorld(true);const center=new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3());object.position.sub(center);object.updateMatrixWorld(true);return object;}
export function frameModel(camera,object,aspect=1,controls){object.updateMatrixWorld(true);const sphere=new THREE.Box3().setFromObject(object).getBoundingSphere(new THREE.Sphere());const radius=Math.max(sphere.radius,.1);const vertical=THREE.MathUtils.degToRad(camera.fov)/2;const horizontal=Math.atan(Math.tan(vertical)*aspect);const distance=radius/Math.sin(Math.min(vertical,horizontal))*1.12;camera.aspect=aspect;camera.position.copy(new THREE.Vector3(3,2,4.6).normalize().multiplyScalar(distance));camera.near=Math.max(.001,radius/100);camera.far=Math.max(100,distance*20);camera.lookAt(0,0,0);camera.updateProjectionMatrix();if(controls){controls.target.set(0,0,0);controls.minDistance=radius*.35;controls.maxDistance=distance*4;controls.update();}return distance;}
