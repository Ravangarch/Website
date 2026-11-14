import * as THREE from 'three';

// Procedural visual interpretation of the supplied installation photographs.
function spottedSurface(){
 const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1024;const ctx=canvas.getContext('2d');
 ctx.fillStyle='#f50928';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#10191d';
 let seed=891;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
 for(let row=0;row<14;row++)for(let col=0;col<24;col++){
  const x=(col+.5+(random()-.5)*.65)*canvas.width/24,y=(row+.5+(random()-.5)*.65)*canvas.height/14;
  const radius=8+random()**1.3*33,aspect=.6+random()*.85,angle=random()*Math.PI;
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(1,aspect);ctx.beginPath();
  const points=Array.from({length:12},(_,i)=>{const a=i*Math.PI/6,r=radius*(.8+random()*.3);return [Math.cos(a)*r,Math.sin(a)*r];});
  for(let i=0;i<=12;i++){const a=points[i%12],b=points[(i+1)%12],mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];if(i===0)ctx.moveTo(...mid);else ctx.quadraticCurveTo(...a,...mid);}
  ctx.closePath();ctx.fill();ctx.restore();
 }
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=THREE.RepeatWrapping;texture.anisotropy=4;
 return new THREE.MeshStandardMaterial({map:texture,roughness:.68,metalness:0});
}
export function nikeReferenceModel(key){
 const group=new THREE.Group(),surface=spottedSurface();
 if(key==='red-spheres'){
  group.name='Red spotted rounded facade forms';
  for(const [x,y,z,r,sx,sy]of [[0,.1,0,.8,1.05,1.12],[-1,-.55,-.16,.4,1,1.1],[.95,.65,-.22,.33,1.12,1]]){
   const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,80,56),surface);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,.91);mesh.rotation.y=x*.7;mesh.userData.part='spotted-rounded-form';group.add(mesh);
  }
 }else{
  group.name='Red facade surface with irregular black painted spots';
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(2.1,1.65,.045),surface);mesh.userData.part='spotted-surface';group.add(mesh);
 }
 return group;
}
