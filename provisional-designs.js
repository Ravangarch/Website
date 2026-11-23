import {structuralDesigns,nuancedStructuralModel} from './nuanced-structural-designs.js';
import * as THREE from 'three';
export const additionalDesigns=[
 structuralDesigns[1],
 {concept:4,name:'Folded freestanding screen',type:'Bio-based composite',materialLabel:'Pressed cellulose panels · reusable hinge pins',description:'An articulated screen with six alternating folds. The lightweight panels can be separated for transport or rearranged around a display.',facts:['Six folding panels','Freestanding zigzag layout','Replaceable hinge pins'],volume:'.240'},
 structuralDesigns[2],
 structuralDesigns[3]
];
export function additionalProvisionalModel(kind){
 if(kind>=7)return nuancedStructuralModel(kind);
 const group=new THREE.Group();const mat=(color,metalness=0)=>new THREE.MeshStandardMaterial({color,metalness,roughness:.6,side:THREE.DoubleSide});
 const ivory=mat(0xe5ddcb),wood=mat(0xb5956f),steel=mat(0x8a9293,.7),bronze=mat(0xb69b73,.45),blue=mat(0x567c85);
 const add=(geo,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);group.add(o);return o;};
 const box=(w,h,d,m,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const rod=(a,b,r=.012,m=steel)=>{const u=new THREE.Vector3(...a),d=new THREE.Vector3(...b).sub(u),o=add(new THREE.CylinderGeometry(r,r,d.length(),8),m);o.position.copy(u).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());};
 if(kind===3){
  for(const [w,h,d,x,y]of [[1.5,.6,.9,0,-.48],[1.05,.5,.7,-.2,.07],[.6,.4,.55,-.35,.52]]){box(w,.04,d,wood,x,y+h/2,0);for(const dx of [-w/2,w/2])box(.04,h,d,ivory,x+dx,y,0);box(w,h,.035,wood,x,y,-d/2);for(const dx of [-w/2+.07,w/2-.07])box(.09,.09,.10,steel,x+dx,y-h/2+.04,.15);}
 }else if(kind===4){
  for(let i=0;i<6;i++){const panel=box(.39,1.65,.025,i%2?ivory:wood,(i-2.5)*.30,0,(i%2)*.22);panel.rotation.y=i%2?-.62:.62;for(const y of [-.55,0,.55])add(new THREE.CylinderGeometry(.017,.017,.08,10),bronze,(i-2.5)*.30-.15,y,.11);}
 }else if(kind===5){
  box(1.6,.045,.09,steel,0,1,0);for(let i=0;i<3;i++){const r=.28+i*.19,z=(i-1)*.08;add(new THREE.TorusGeometry(r,.018,12,64),i%2?bronze:steel,0,0,z);for(const sign of [-1,1])rod([sign*r*.6,r*.8,z],[sign*r*.6,1,z],.004);box(r*1.3,.025,.20,ivory,0,-r*.60,z);}
 }else if(kind===6){
  for(const x of [-.7,.7]){box(.045,1.75,.045,steel,x,0,0);box(.16,.06,.65,steel,x,-.9,0);}for(const y of [-.85,.85])box(1.45,.045,.045,steel,0,y,0);
  for(let i=0;i<16;i++){const x=-.65+i*.087;rod([x,-.82,0],[x,.82,0],.003);}
  for(let i=0;i<20;i++){const y=-.8+i*.084;rod([-.68,y,0],[.68,y,0],.003);}
  for(const [x,y,w]of [[-.2,-.45,.8],[.2,.03,.7],[-.15,.50,.8]]){box(w,.025,.30,blue,x,y,.14);for(const dx of [-w*.35,w*.35])box(.025,.12,.1,steel,x+dx,y-.04,.04);}
 }
 return group;
}
