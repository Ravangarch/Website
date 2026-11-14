import * as THREE from 'three';

// Reference-based sun components: a textured gold centre and a shallow radial array.
function goldSurface(lit=false){
 const size=128,data=new Uint8Array(size*size*4);let seed=247;
 for(let i=0;i<size*size;i++){seed=seed*16807%2147483647;const value=65+seed%170;data.set([value,value,value,255],i*4);}
 const texture=new THREE.DataTexture(data,size,size);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(1.5,1);texture.needsUpdate=true;
 return new THREE.MeshStandardMaterial({color:0xe5b64e,metalness:.62,roughness:.32,bumpMap:texture,bumpScale:.055,emissive:lit?0xffb51b:0x2c1700,emissiveIntensity:lit?.75:.12});
}
function centre(group,radius,lit=false){
 const sphere=new THREE.Mesh(new THREE.SphereGeometry(radius,80,56),goldSurface(lit));sphere.scale.z=.66;sphere.name='Textured convex gold sun centre';sphere.userData.part='textured-gold-centre';group.add(sphere);
}
function rays(group,{count=192,inner=.43,outer=1.65,lit=false}={}){
 const material=new THREE.MeshStandardMaterial({color:lit?0xffd367:0xc99b36,metalness:lit?.35:.72,roughness:.28,emissive:lit?0xffb62d:0x000000,emissiveIntensity:lit?1:0});
 const mesh=new THREE.InstancedMesh(new THREE.CylinderGeometry(.005,.005,1,8),material,count),dummy=new THREE.Object3D(),up=new THREE.Vector3(0,1,0);
 for(let i=0;i<count;i++){
  const a=i/count*Math.PI*2,direction=new THREE.Vector3(Math.cos(a),Math.sin(a),0);
  const end=outer*(.86+.14*(.5+.5*Math.sin(i*2.399)));const start=inner+(i%3)*.014;
  dummy.position.copy(direction).multiplyScalar((start+end)/2);dummy.position.z=-.065+(i%3)*.018;dummy.quaternion.setFromUnitVectors(up,direction);dummy.scale.set(1,end-start,1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
 }
 mesh.instanceMatrix.needsUpdate=true;mesh.name=lit?'Warm radial light elements':'Dense gold radial tubes';mesh.userData.part=lit?'radial-light-array':'radial-tube-array';group.add(mesh);
}
export function leSoleilModel(key){
 const group=new THREE.Group();
 if(key==='central-sphere'){group.name='Le Soleil textured golden centre';centre(group,.8);}
 else if(key==='radiating-rods'){group.name='Le Soleil planar sunburst tubes';centre(group,.4);rays(group);}
 else{
  group.name='Le Soleil warm illuminated sun';centre(group,.44,true);rays(group,{count:144,inner:.46,outer:1.35,lit:true});
  const halo=new THREE.Mesh(new THREE.TorusGeometry(.447,.012,10,128),new THREE.MeshStandardMaterial({color:0xffe6a2,emissive:0xffca45,emissiveIntensity:2}));halo.userData.part='warm-perimeter-light';group.add(halo);
 }
 return group;
}
