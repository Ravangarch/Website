import * as THREE from 'three';
const gold=()=>new THREE.MeshStandardMaterial({color:0xcfa94c,metalness:.6,roughness:.32});
export function fabulousJourneyModel(key){
 const g=new THREE.Group(),metal=gold(),red=new THREE.MeshStandardMaterial({color:0x9c1235,roughness:.48}),cream=new THREE.MeshStandardMaterial({color:0xf2e1b8,metalness:.25,roughness:.5});
 const add=(geo,mat=metal,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);g.add(o);return o;};
 const rod=(a,b,r=.012,mat=metal)=>{const u=new THREE.Vector3(...a),v=new THREE.Vector3(...b),d=v.clone().sub(u);const o=add(new THREE.CylinderGeometry(r,r,d.length(),8),mat);o.position.copy(u).add(v).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;};
 const curve=(points,r=.012,mat=metal)=>add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),40,r,8,false),mat);
 if(key==='balloon-shell'||key==='balloon-frame'){
  g.name='Wide flattened red airship balloon';
  if(key==='balloon-shell'){const shell=add(new THREE.SphereGeometry(1,72,48),red);shell.scale.set(1.3,.58,.4);shell.userData.part='red-airship-shell';}
  for(const y of [-.46,-.31,-.15,.04,.23,.4]){const r=Math.sqrt(1-y*y/.58**2);const ring=add(new THREE.TorusGeometry(1,key==='balloon-frame'?.012:.007,8,80),key==='balloon-frame'?metal:new THREE.MeshStandardMaterial({color:0x70112b,roughness:.6}),0,y);ring.rotation.x=Math.PI/2;ring.scale.set(1.3*r,.4*r,1);ring.userData.part='horizontal-panel-seam';}
  if(key==='balloon-frame')for(const z of [0,.2,-.2])curve([[-1.3,0,z],[0,.58,z],[1.3,0,z]],.012);
 }else if(key==='clouds'){
  g.name='Shallow scalloped cloud panel with warm perforation lights';const shape=new THREE.Shape();shape.moveTo(-1,-.2);shape.bezierCurveTo(-1.2,-.05,-.96,.1,-.81,.08);shape.bezierCurveTo(-.8,.32,-.53,.4,-.37,.29);shape.bezierCurveTo(-.23,.66,.15,.67,.32,.35);shape.bezierCurveTo(.58,.45,.75,.26,.75,.12);shape.bezierCurveTo(1.1,.13,1.18,-.17,.94,-.23);shape.bezierCurveTo(.7,-.32,.47,-.22,.31,-.26);shape.bezierCurveTo(.1,-.34,-.09,-.27,-.2,-.25);shape.bezierCurveTo(-.5,-.32,-.66,-.22,-.78,-.25);shape.closePath();
  const cloud=add(new THREE.ExtrudeGeometry(shape,{depth:.045,bevelEnabled:true,bevelSize:.006,bevelThickness:.006,bevelSegments:1}),cream);cloud.userData.part='scalloped-cloud-panel';
  const poly=shape.getPoints(100),inside=(x,y)=>{let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)c=!c;}return c;};
  const points=[];for(let y=-.26;y<.58;y+=.033)for(let x=-1.06;x<1.08;x+=.033)if(inside(x,y))points.push([x,y,.052]);
  const lights=new THREE.InstancedMesh(new THREE.CircleGeometry(.006,6),new THREE.MeshBasicMaterial({color:0xffc55b}),points.length),d=new THREE.Object3D();points.forEach((p,i)=>{d.position.set(...p);d.updateMatrix();lights.setMatrixAt(i,d.matrix);});lights.userData.part='cloud-perforation-lights';g.add(lights);
 }else if(key==='basket'){
  g.name='Ornate two-level gold architectural gondola';
  for(const y of [-.67,-.05,.62])add(new THREE.BoxGeometry(1.04,.035,.48),metal,0,y);
  for(const x of [-.49,-.17,.17,.49])for(const z of [-.22,.22])rod([x,-.65,z],[x,.63,z],.018);
  for(const y of [-.51,.1])for(const z of [-.23,.23]){
   rod([-.5,y,z],[.5,y,z],.012);for(let i=0;i<18;i++){const x=-.47+i*.055;rod([x,y-.12,z],[x,y,z],.007);}
  }
  for(const x of [-.33,.0,.33]){curve([[x-.12,.19,.23],[x-.12,.43,.23],[x,.55,.23],[x+.12,.43,.23],[x+.12,.19,.23]],.01);for(let i=0;i<4;i++)rod([x-.09+i*.06,.19,.23],[x-.09+i*.06,.43,.23],.006);}
  for(let i=0;i<13;i++){const x=-.25+i*.035,y=.02+i*.039;add(new THREE.BoxGeometry(.13,.018,.18),metal,x,y,.02);}rod([-.3,.14,.1],[.24,.72,.1],.01);
  const bottom=new THREE.ConeGeometry(.51,.2,4);const base=add(bottom,metal,0,-.77);base.rotation.z=Math.PI;base.rotation.y=Math.PI/4;base.scale.z=.48;
  g.userData.part='architectural-gondola';
 }else{
  g.name='Small red chamfered jewellery box';const shape=new THREE.Shape();const pts=[[-.4,-.53],[.4,-.53],[.53,-.4],[.53,.4],[.4,.53],[-.4,.53],[-.53,.4],[-.53,-.4]];pts.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();add(new THREE.ExtrudeGeometry(shape,{depth:.19,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:2}),red,0,0,-.08);
  for(const scale of [.96,.89])for(let i=0;i<8;i++){const a=pts[i],b=pts[(i+1)%8];rod([a[0]*scale,a[1]*scale,.125],[b[0]*scale,b[1]*scale,.125],.006);}
  for(let i=0;i<5;i++)for(const sign of [-1,1]){const ring=add(new THREE.TorusGeometry(.045,.004,5,24),metal,-.3+i*.15,sign*.435,.13);ring.scale.y=.65;}
  g.rotation.z=-.15;g.userData.part='red-jewellery-box';
 }
 return g;
}
