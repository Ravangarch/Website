import * as THREE from 'three';
import {chrome} from './creating-infinity-structures.js';
function stone(){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');for(let y=0;y<256;y++){const v=Math.sin(y*.17+Math.sin(y*.033)*3)+Math.sin(y*.67)*.25;x.fillStyle=`rgb(${28+v*12},${94+v*27},${64+v*17})`;x.fillRect(0,y,512,1);}const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.center.set(.5,.5);map.rotation=Math.PI/2;return new THREE.MeshStandardMaterial({map,roughness:.28,metalness:.12});}
export function pomellatoModel(key){
 const g=new THREE.Group(),silver=chrome();silver.color.set(0xdfd8cd);
 const add=(geo,mat=silver,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);g.add(m);return m;};
 const rim=(r=.86,t=.05,z=0)=>add(new THREE.TorusGeometry(r,t,14,96),silver,0,0,z);
 const disc=(r,mat,z=0)=>{const m=add(new THREE.CylinderGeometry(r,r,.055,96),mat,0,0,z);m.rotation.x=Math.PI/2;return m;};
 if(key==='outer-rings'){rim(.85,.065);rim(.79,.012,.04);rim(.85,.035,-.065);g.name='Broad polished circular medallion rim';}
 else if(key==='green-surface'){
  disc(.8,stone());rim(.83,.04);for(const x of [-.36,.36]){const mount=add(new THREE.CircleGeometry(.15,48),silver,x,0,.034);const ring=add(new THREE.TorusGeometry(.15,.012,8,48),silver,x,0,.044);}g.name='Banded green circular surface with two inset mounts';
 }else if(key==='jewellery'){
  const path=new THREE.CatmullRomCurve3([new THREE.Vector3(-.6,0,0),new THREE.Vector3(-.4,.035,.22),new THREE.Vector3(0,.05,.28),new THREE.Vector3(.4,.035,.22),new THREE.Vector3(.6,0,0)]);add(new THREE.TubeGeometry(path,64,.13,24,false));
  for(const x of [-.6,.6]){add(new THREE.TorusGeometry(.19,.025,12,48),silver,x,0,-.025);const mount=add(new THREE.CylinderGeometry(.18,.18,.045,48),silver,x,0,-.035);mount.rotation.x=Math.PI/2;}
  for(let i=0;i<7;i++){
   const x=-.48+i*.16,z=.22+.06*(1-(x/.6)**2);
   const geo=new THREE.CircleGeometry(.071,12).toNonIndexed(),pos=geo.attributes.position,colors=[];
   for(let j=0;j<pos.count;j+=3){const shade=[.95,.65,.83,.48,.9,.72,.98,.57,.8,.68,.93,.6][(j/3+i)%12];for(let k=0;k<3;k++)colors.push(shade,shade,Math.min(1,shade+.04));}geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));add(geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.24,metalness:.25}),x,.025,z+.14);
   for(const y of [-.085,.13]){const bead=add(new THREE.SphereGeometry(.034,16,12),silver,x+.04,y,z+.08);bead.scale.z=.55;}
  }g.name='Curved polished handle with circular faceted stones and raised studs';
 }else if(key==='chains'){
  for(let i=0;i<7;i++){const link=add(new THREE.TorusGeometry(.19,.025,12,48),silver,0,(i-3)*.29);link.scale.y=1.32;link.rotation.y=i%2?Math.PI/2:0;link.userData.part='oval-chain-link';}g.name='Oversized interlocking oval suspension links';
 }else{disc(.8,new THREE.MeshStandardMaterial({color:0xf2f0e9,roughness:.27}));rim(.83,.035);g.name='Round shallow pearl-white backing panel';}
 return g;
}
