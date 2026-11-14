import * as THREE from 'three';

// Procedural reflection lighting and isolated forms based on the supplied facade references.
let reflectionTexture;
export function chrome(){
 if(reflectionTexture)return new THREE.MeshPhongMaterial({color:0xf5f7fa,specular:0xffffff,shininess:180,reflectivity:1,envMap:reflectionTexture,combine:THREE.MixOperation,side:THREE.DoubleSide});
 const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1024;const ctx=canvas.getContext('2d');
 const sky=ctx.createLinearGradient(0,0,0,1024);sky.addColorStop(0,'#578cc7');sky.addColorStop(.43,'#dcecf7');sky.addColorStop(.55,'#b6a99b');sky.addColorStop(1,'#34363b');ctx.fillStyle=sky;ctx.fillRect(0,0,2048,1024);
 for(let i=0;i<24;i++){
  const x=i*86,top=330+(i%4)*19,h=285+(i%3)*20;ctx.fillStyle=['#c1ac8b','#b9b3a6','#dfc7a2','#8f877b'][i%4];ctx.fillRect(x,top,84,h);
  ctx.fillStyle='#48474a';ctx.fillRect(x,top-8,84,9);
  for(let row=0;row<4;row++)for(let col=0;col<3;col++){ctx.fillStyle=row===3&&col===1?'#edb858':'#333e4c';ctx.fillRect(x+8+col*25,top+20+row*59,15,31);ctx.fillStyle='#e2d4bb';ctx.fillRect(x+6+col*25,top+52+row*59,19,3);}
  for(let y=top+10;y<top+h;y+=14){ctx.fillStyle='rgba(80,69,53,.15)';ctx.fillRect(x,y,84,1);}
 }
 ctx.fillStyle='#747477';ctx.fillRect(0,680,2048,28);ctx.fillStyle='#e9d6a3';ctx.fillRect(0,784,2048,5);
 const small=document.createElement('canvas');small.width=512;small.height=256;small.getContext('2d').drawImage(canvas,0,0,512,256);
 const texture=new THREE.CanvasTexture(small);reflectionTexture=texture;texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;
 return new THREE.MeshPhongMaterial({color:0xf5f7fa,specular:0xffffff,shininess:180,reflectivity:1,envMap:texture,combine:THREE.MixOperation,side:THREE.DoubleSide});
}
export function creatingInfinityModel(key){
 const group=new THREE.Group(),material=chrome();
 if(key==='mirrored-spheres'){
  group.name='Creating Infinity polished oval mirror forms';
  for(const [x,y,z,r,sx,sy]of [[0,.12,0,.72,1,1.22],[-1,.69,-.08,.35,1,1.1],[.99,.68,-.12,.28,1,1.19],[-.97,-.64,-.02,.27,1.12,1],[.96,-.65,0,.4,1,1.12]]){
   const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,80,56),material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,.78);mesh.userData.part='mirrored-oval';group.add(mesh);
  }
 }else{
  group.name='Convex polished mirror shell segments';
  for(const [x,y,r,angle]of [[-.7,.38,.52,-.18],[.57,.36,.43,.25],[0,-.69,.34,.55]]){
   const shell=new THREE.Group();shell.position.set(x,y,0);shell.rotation.y=angle;shell.rotation.x=-.1;group.add(shell);
   const dome=new THREE.Mesh(new THREE.SphereGeometry(r,72,40,0,Math.PI*2,0,Math.PI/2),material);dome.rotation.x=Math.PI/2;dome.scale.set(1, .72,1.14);dome.userData.part='convex-shell';shell.add(dome);
   const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.009,8,72),material);rim.scale.y=1.14;rim.userData.part='shell-rim';shell.add(rim);
  }
 }
 return group;
}
