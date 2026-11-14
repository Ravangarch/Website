import * as THREE from 'three';

function redSurface(){
 const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d');ctx.fillStyle='#951a29';ctx.fillRect(0,0,512,512);
 for(const sign of [-1,1])for(let offset=-512;offset<1024;offset+=10){ctx.beginPath();ctx.moveTo(offset,0);ctx.lineTo(offset+sign*512,512);ctx.strokeStyle=sign===1?'#b03a46':'#6c1421';ctx.lineWidth=2;ctx.stroke();}
 let seed=93;for(let i=0;i<12000;i++){seed=seed*16807%2147483647;const x=seed%512;seed=seed*16807%2147483647;const y=seed%512;ctx.fillStyle=i%2?'rgba(241,158,151,.12)':'rgba(44,0,8,.16)';ctx.fillRect(x,y,1,1);}
 const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=4;
 return new THREE.MeshStandardMaterial({map,bumpMap:map,bumpScale:.009,roughness:.62,metalness:.08});
}
export function sohoModel(key){
 const group=new THREE.Group(),red=redSurface(),gold=new THREE.MeshStandardMaterial({color:0xe2c36a,metalness:.65,roughness:.26});
 const add=(geo,mat,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const panel=(w,h)=>add(new THREE.BoxGeometry(w,h,.045),red);
 const seam=(w,y)=>add(new THREE.BoxGeometry(w,.016,.009),new THREE.MeshStandardMaterial({color:0x53101a,roughness:.8}),0,y,.027);
 if(key==='red-panels'){
  group.name='Soho tall red crosshatched facade panel';panel(1.6,2.1);seam(1.6,.53);group.userData.part='textured-red-panel';
 }else if(key==='red-finish'){
  group.name='Deep red finely crosshatched embossed surface';panel(1.6,1.2);group.userData.part='crosshatched-red-finish';
 }else if(key==='studs'){
  group.name='Two straight rows of round gold studs along a red seam';panel(2.1,.7);seam(2.1,0);
  for(const y of [-.095,.095])for(let i=0;i<23;i++){const stud=add(new THREE.SphereGeometry(.021,16,10),gold,-1+i/11,y,.035);stud.scale.z=.45;stud.userData.part='round-gold-stud';}
 }else{
  group.name='Layered circular gold clasp';
  const back=add(new THREE.CylinderGeometry(.5,.5,.055,80),gold,0,0,-.035);back.rotation.x=Math.PI/2;
  for(const [r,t,z]of [[.46,.032,.015],[.37,.022,.045],[.31,.016,.075]]){const rim=add(new THREE.TorusGeometry(r,t,12,80),gold,0,0,z);rim.userData.part='concentric-clasp-rim';}
  const cap=add(new THREE.SphereGeometry(.3,48,32),gold,0,0,.06);cap.scale.z=.32;cap.userData.part='domed-clasp-centre';
 }
 return group;
}
