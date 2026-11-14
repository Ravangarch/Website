import * as THREE from 'three';

// Illustrative reconstructions of the circular cut-sheet façade and strip samples.
const pixels=new Uint8Array(128*64*4);
for(let y=0;y<64;y++)for(let x=0;x<128;x++){
 const value=(x>12&&x<34)||(x>72&&x<103)?245:Math.round(55+85*Math.sin(y*Math.PI/64));
 const i=(y*128+x)*4;pixels.set([value,value,Math.min(255,value+5),255],i);
}
const reflection=new THREE.DataTexture(pixels,128,64);reflection.mapping=THREE.EquirectangularReflectionMapping;reflection.colorSpace=THREE.SRGBColorSpace;reflection.needsUpdate=true;

export function rabanneSequinModel(key){
 const group=new THREE.Group(),facade=key==='sequin-facade';
 const silver=new THREE.MeshStandardMaterial({color:0xe6ebef,metalness:1,roughness:.12,envMap:reflection,envMapIntensity:1.15,side:THREE.DoubleSide});
 const steel=new THREE.MeshStandardMaterial({color:0x8b969f,metalness:.8,roughness:.32});
 const cols=facade?28:6,rows=facade?24:9,r=facade?.041:.080,spacing=r*2.08;
 const geometry=new THREE.CylinderGeometry(r,r,.003,32);geometry.rotateX(Math.PI/2);
 const discs=new THREE.InstancedMesh(geometry,silver,cols*rows);discs.userData.component='circular-sequins';
 const carrier=new THREE.InstancedMesh(new THREE.BoxGeometry(.009,(rows-1)*spacing+2*r,.005),steel,cols);carrier.userData.component='vertical-carriers';
 const bridges=new THREE.InstancedMesh(new THREE.BoxGeometry(r*.35,.009,.003),silver,cols*rows);bridges.userData.component='cut-sheet-tabs';
 const dummy=new THREE.Object3D();
 const position=(col,y)=>{const u=(col-(cols-1)/2)*spacing;if(!facade)return new THREE.Vector3(u,y,.015*Math.sin(col*1.7));const theta=u/1.8;return new THREE.Vector3(1.8*Math.sin(theta),y,1.8*(Math.cos(theta)-1));};
 for(let col=0;col<cols;col++){
  const theta=facade?(col-(cols-1)/2)*spacing/1.8:0;
  const rail=position(col,0);rail.x+=r*.92*Math.cos(theta);rail.z-=r*.92*Math.sin(theta)+.009;
  dummy.position.copy(rail);dummy.rotation.set(0,theta,0);dummy.updateMatrix();carrier.setMatrixAt(col,dummy.matrix);
  for(let row=0;row<rows;row++){
   const i=col*rows+row,y=(row-(rows-1)/2)*spacing+(col%2)*spacing*.18;
   dummy.position.copy(position(col,y));dummy.rotation.set(.11*Math.sin(col*2.3+row*.7),theta+.20*Math.sin(col*.9+row*1.8),.025*Math.sin(row+col));dummy.updateMatrix();discs.setMatrixAt(i,dummy.matrix);
   const shade=.78+.22*(.5+.5*Math.sin(col*1.67+row*2.4));discs.setColorAt(i,new THREE.Color(shade,shade,shade));
   dummy.position.copy(position(col,y));dummy.position.x+=r*.83*Math.cos(theta);dummy.position.z-=r*.83*Math.sin(theta)+.004;dummy.rotation.set(0,theta,0);dummy.updateMatrix();bridges.setMatrixAt(i,dummy.matrix);
  }
 }
 group.add(discs,carrier,bridges);
 if(facade){
  // A shallow reusable rear frame remains visible when the sample is rotated.
  const bar=(w,h,d,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),steel);m.position.set(x,y,z);group.add(m);};
  const width=2*1.8*Math.sin((cols-1)*spacing/3.6),height=rows*spacing;
  for(const y of [-height/2,height/2])bar(width,.022,.025,0,y,-.42);
  for(const x of [-width/2,0,width/2])bar(.022,height,.025,x,0,-.42);
  if(typeof document!=='undefined'){
   const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1024;const ctx=canvas.getContext('2d');
   ctx.fillStyle='#cbbb80';ctx.textAlign='center';ctx.font='bold 140px Arial';ctx.fillText('rabanne',512,430);ctx.font='italic bold 200px Arial';ctx.fillText('H&M',512,670);
   const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
   const surface=new THREE.PlaneGeometry(width*.82,height*.82,48,1),p=surface.attributes.position;
   for(let i=0;i<p.count;i++){const u=p.getX(i);p.setX(i,1.8*Math.sin(u/1.8));p.setZ(i,1.8*(Math.cos(u/1.8)-1)+.055);}surface.computeVertexNormals();
   group.add(new THREE.Mesh(surface,new THREE.MeshStandardMaterial({map:texture,transparent:true,alphaTest:.15,metalness:.45,roughness:.3,side:THREE.DoubleSide,envMap:reflection})));
  }
 }
 return group;
}
