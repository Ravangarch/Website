import * as THREE from 'three';
import {provisionalModel} from './models.js';
export const projectSupports=[
 {brand:'Polène',project:'Blossoming Lether',year:2025,key:'support-polene',name:'Detachable flower façade support',properties:'Detachable · adjustable clamp blocks · sliding crossbars · square-tube ladder modules · bolted connections · packs into separate rails'},
 {brand:'H&M',project:'Sound Wave',year:2024,key:'support-wave',name:'Detachable curved façade subframe',properties:'Detachable · curved ribs follow the red shell · bolted horizontal stringers · stand-off brackets · modular transport sections'},
 {brand:'Paco Rabanne',project:'Iconique 1969',year:2025,key:'support-discs',name:'Detachable disc suspension frame',properties:'Detachable · modular metal grid · tensioned suspension cables · bolted stand-off brackets · mounting points for linked discs'},
 {brand:'Van Cleef & Arpels',project:'Spring 2023',year:2023,key:'support-spring',name:'Detachable floral stem mounting rails',properties:'Detachable · slim ladder rails · removable stem sockets · adjustable clamps · stand-off wall brackets'},
 {brand:'Louis Vuitton',project:'Creating Infinity',year:2021,key:'support-spheres',name:'Detachable sphere mounting lattice',properties:'Detachable · bolted structural grid · adjustable stand-off arms · circular attachment cradles · sectional assembly'}
];
export function projectSupportModel(key){
 if(key==='support-polene'){const model=provisionalModel(1);model.userData.kind=key;return model;}
 const group=new THREE.Group();group.userData.kind=key;
 const steel=new THREE.MeshStandardMaterial({color:0xccc8be,metalness:.65,roughness:.37}),joint=new THREE.MeshStandardMaterial({color:0x777a7d,metalness:.8,roughness:.3});
 const box=(w,h,d,x,y,z,mat=steel)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const rod=(a,b,r=.018,mat=steel)=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),direction=end.clone().sub(start),mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,direction.length(),8),mat);mesh.position.copy(start).add(end).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());group.add(mesh);return mesh;};
 const clamp=(x,y,z)=>{box(.13,.12,.13,x,y,z,joint);const bolt=rod([x,y,z+.06],[x,y,z+.11],.027,joint);bolt.userData.part='removable fastener';};
 if(key==='support-wave'){
  for(const z of [-.65,0,.65]){for(let i=0;i<16;i++){const a=i/16*Math.PI,b=(i+1)/16*Math.PI;rod([Math.cos(a)*1.3,Math.sin(a)*1.3-.6,z],[Math.cos(b)*1.3,Math.sin(b)*1.3-.6,z],.035);}}
  for(let i=0;i<7;i++){const a=i/6*Math.PI,x=Math.cos(a)*1.3,y=Math.sin(a)*1.3-.6;rod([x,y,-.65],[x,y,.65],.028);clamp(x,y,0);}for(const x of [-1.3,1.3])box(.1,.1,1.55,x,-.66,0);
 }else{
  const spring=key==='support-spring';const width=spring?1.5:2.8,height=2.1;
  for(const y of [-height/2,0,height/2])box(width,.065,.065,0,y,0);
  for(const x of [-width/2,-width/6,width/6,width/2]){box(.065,height,.065,x,0,0);for(const y of [-height/2,height/2]){clamp(x,y,0);box(.055,.055,.36,x,y,-.17);box(.2,.14,.04,x,y,-.36,joint);}}
  if(key==='support-discs'){for(let i=0;i<7;i++){const x=-1.25+i*.42;rod([x,1.04,.1],[x,-1.03,.1],.007,joint);for(const y of [-.7,0,.7]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.055,.009,6,20),joint);ring.position.set(x,y,.1);group.add(ring);}}}
  if(spring){for(const x of [-.5,0,.5])for(const y of [-.75,.25,.8]){rod([x,y,0],[x,y,.25],.02);const socket=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.15,10,1,true),joint);socket.position.set(x,y,.25);group.add(socket);}}
  if(key==='support-spheres'){for(const x of [-.95,0,.95])for(const y of [-.65,.45]){rod([x,y,0],[x,y,.45],.03);const ring=new THREE.Mesh(new THREE.TorusGeometry(.19,.018,8,30),steel);ring.position.set(x,y,.46);group.add(ring);rod([x-.19,y,.46],[x,y-.23,0],.012,joint);}}
 }
 return group;
}
