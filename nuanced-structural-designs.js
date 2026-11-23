import * as THREE from 'three';
export const structuralDesigns=[
 {concept:7,designRole:'structural',name:'Adjustable façade cassette system',type:'Metal',materialLabel:'Anodised aluminium rails · steel clamp plates · elastomer pads',properties:'Detachable · telescopic standoffs · sliding carriers · replaceable compression pads · bolted cassette mounts',description:'A two-depth façade system with telescopic wall standoffs, sliding panel carriers and bolted cassette rails. Replaceable pads separate the frame from the existing surface, while slotted plates allow each attachment to be adjusted independently.',facts:['Telescopic wall standoffs','Sliding panel carriers','Slotted connection plates','Replaceable contact pads'],volume:'.285'},
 {concept:8,designRole:'structural',name:'Counterweighted cantilever gantry',type:'Metal',materialLabel:'Bolted steel sections · removable ballast blocks · plywood trays',properties:'Detachable · triangulated cantilever arms · removable ballast · threaded levelling feet · sliding suspension points',description:'A freestanding gantry for projecting or suspended scenography. Twin braced cantilever arms are balanced by removable ballast trays; threaded feet, corner gussets and adjustable suspension carriages make the assembly adaptable to uneven floors and changing displays.',facts:['Removable ballast trays','Triangulated cantilever arms','Levelling feet','Adjustable suspension carriages'],volume:'.540'},
 {concept:9,designRole:'structural',name:'Articulated radial suspension rig',type:'Metal',materialLabel:'Aluminium radial arms · steel pivot joints · tensioned support cables',properties:'Detachable · articulated radial arms · bolted hub · tensioned guy wires · turnbuckles · hanging attachment loops',description:'A radial support rig for clustered flowers, spheres or lightweight display elements. Eight articulated arms connect to a central bolted hub, with tensioned guy wires, visible turnbuckles and independent drop points for positioning elements at different heights.',facts:['Eight articulated radial arms','Central bolted hub','Tensioned guy wires','Independent hanging points'],volume:'.220'},
 {concept:10,designRole:'structural',name:'Segmented curved rib framework',type:'Metal',materialLabel:'Rolled aluminium ribs · bolted spine rails · steel base plates',properties:'Detachable · sectional curved ribs · removable spine rails · adjustable mounting tabs · diagonal tension braces · replaceable base shoes',description:'A curved support skeleton for wrapping printed skins, floral panels or lightweight shells around an installation. Sectional ribs are linked by removable spine rails; bolted joint collars, staggered mounting tabs and diagonal ties allow local adjustment without rebuilding the complete frame.',facts:['Sectional curved ribs','Removable spine rails','Staggered mounting tabs','Diagonal tension braces'],volume:'.410'}
];
export function nuancedStructuralModel(kind){
 const group=new THREE.Group();group.name=structuralDesigns.find(d=>d.concept===kind)?.name||'Structural concept';
 const alloy=new THREE.MeshStandardMaterial({color:0xc8c7bf,metalness:.64,roughness:.34}),steel=new THREE.MeshStandardMaterial({color:0x626d72,metalness:.72,roughness:.34}),bronze=new THREE.MeshStandardMaterial({color:0xb79966,metalness:.65,roughness:.4}),pad=new THREE.MeshStandardMaterial({color:0x353c3b,roughness:.9}),wood=new THREE.MeshStandardMaterial({color:0xbda385,roughness:.8});
 const add=(geometry,material,x=0,y=0,z=0,part='member')=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.userData.part=part;group.add(mesh);return mesh;};
 const box=(w,h,d,x,y,z,material=alloy,part='rail')=>add(new THREE.BoxGeometry(w,h,d),material,x,y,z,part);
 const rod=(a,b,r=.018,material=steel,part='brace')=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start),mesh=add(new THREE.CylinderGeometry(r,r,delta.length(),10),material,0,0,0,part);mesh.position.copy(start).add(end).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh;};
 const bolt=(x,y,z,axis='z')=>{const mesh=add(new THREE.CylinderGeometry(.018,.018,.025,6),bronze,x,y,z,'removable bolt');if(axis==='z')mesh.rotation.x=Math.PI/2;else if(axis==='x')mesh.rotation.z=Math.PI/2;};
 const plate=(x,y,z,w=.18,h=.14)=>{box(w,h,.025,x,y,z,steel,'slotted connector plate');for(const dx of [-w*.28,w*.28])bolt(x+dx,y,z+.022);};
 const ring=(radius,x,y,z,part='attachment loop')=>add(new THREE.TorusGeometry(radius,.012,8,32),bronze,x,y,z,part);
 const gusset=(x,y,z,flip=1)=>{const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(.24*flip,0);shape.lineTo(0,.24);shape.closePath();add(new THREE.ExtrudeGeometry(shape,{depth:.018,bevelEnabled:false}),steel,x,y,z,'triangular gusset');};
 if(kind===7){
  for(const x of [-1.12,0,1.12])for(const y of [-.78,.78]){
   box(.23,.26,.04,x,y,-.31,steel,'wall anchor plate');box(.24,.27,.025,x,y,-.345,pad,'replaceable contact pad');
   box(.075,.075,.25,x,y,-.19,alloy,'outer telescopic sleeve');box(.045,.045,.29,x,y,.025,steel,'inner telescopic standoff');box(.11,.11,.06,x,y,-.08,bronze,'locking collar');bolt(x,y+.065,-.08,'y');plate(x,y,.17);
  }
  for(const y of [-.78,.78])box(2.65,.075,.075,0,y,.15);
  for(const x of [-1.05,-.35,.35,1.05]){box(.055,1.85,.055,x,0,.22);for(const y of [-.48,.12,.55]){box(.15,.10,.12,x,y,.23,steel,'sliding carrier');bolt(x,y,.305);box(.23,.04,.10,x,y,.33,alloy,'cassette hook');}}
  for(const x of [-.70,.70])for(const y of [-.32,.38]){box(.66,.035,.045,x,y,.31,alloy,'detachable cassette crossbar');plate(x-.25,y,.34,.10,.09);plate(x+.25,y,.34,.10,.09);}
 }else if(kind===8){
  for(const x of [-.9,.9]){
   box(.12,.10,1.55,x,-1,.04,steel,'base skid');for(const z of [-.62,.67]){rod([x,-1.02,z],[x,-1.18,z],.022,steel,'threaded levelling foot');add(new THREE.CylinderGeometry(.09,.09,.035,18),pad,x,-1.20,z,'levelling pad');}
   box(.105,2.05,.105,x,.04,-.18);box(.105,.105,1.16,x,1.04,.34,alloy,'cantilever arm');rod([x,.32,-.18],[x,1.04,.87],.035,steel,'cantilever compression brace');gusset(x,1.04,-.2);plate(x,1.04,.02);for(const z of [.32,.73]){box(.18,.14,.15,x,1.04,z,bronze,'sliding suspension carriage');bolt(x,1.14,z,'y');rod([x,.95,z],[x,.56,z],.007,steel,'suspension drop');ring(.052,x,.52,z);}
   box(.65,.045,.52,x,-.9,-.36,wood,'removable ballast tray');for(const z of [-.54,-.23]){box(.50,.18,.23,x,-.79,z,steel,'removable ballast block');ring(.045,x,-.68,z,'ballast lifting eye');}
   rod([x,-.94,.61],[x,.1,-.18],.025,steel,'rear stabilising brace');
  }
  for(const y of [-.95,1.04])box(1.9,.08,.08,0,y,-.18);rod([-.9,-.92,-.24],[.9,1.04,-.24],.012,steel,'diagonal tension tie');
 }else if(kind===9){
  add(new THREE.CylinderGeometry(.19,.19,.22,8),steel,0,.55,0,'bolted central hub');rod([0,.56,0],[0,1.2,0],.055,alloy,'central mast');ring(.09,0,1.25,0,'upper suspension eye');
  for(let i=0;i<8;i++){const a=i*Math.PI/4,dir=new THREE.Vector3(Math.cos(a),0,Math.sin(a)),joint=dir.clone().multiplyScalar(.54),end=dir.clone().multiplyScalar(1.08);joint.y=.48;end.y=.32;
   rod([dir.x*.12,.55,dir.z*.12],joint.toArray(),.025,alloy,'inner radial arm');rod(joint.toArray(),end.toArray(),.022,alloy,'articulated outer arm');add(new THREE.CylinderGeometry(.065,.065,.07,12),bronze,joint.x,joint.y,joint.z,'pivot joint');bolt(joint.x,joint.y+.055,joint.z,'y');
   rod([0,1.08,0],end.toArray(),.006,steel,'tensioned guy wire');const middle=end.clone().lerp(new THREE.Vector3(0,1.08,0),.32);rod([middle.x-.015,middle.y-.035,middle.z],[middle.x+.015,middle.y+.035,middle.z],.017,bronze,'turnbuckle');
   const low=.32-(.36+(i%3)*.14);rod(end.toArray(),[end.x,low,end.z],.006,steel,'independent suspension drop');ring(.055,end.x,low-.055,end.z);
  }
  const hoop=ring(.57,0,.45,0,'removable stabilising hoop');hoop.rotation.x=Math.PI/2;
 }else if(kind===10){
  const profile=y=>.11+.39*Math.sin((y+1.05)/2.2*Math.PI);
  for(const x of [-1.05,-.35,.35,1.05]){
   for(const [lo,hi]of [[-1.05,-.35],[-.35,.4],[.4,1.15]]){const points=Array.from({length:13},(_,i)=>{const y=lo+(hi-lo)*i/12;return new THREE.Vector3(x,y,profile(y));});add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),18,.028,8,false),alloy,0,0,0,'sectional curved rib');}
   for(const y of [-.35,.4]){box(.12,.13,.12,x,y,profile(y),steel,'bolted rib collar');bolt(x,y,profile(y)+.075);}
   box(.32,.04,.54,x,-1.11,.24,steel,'replaceable base shoe');for(const dx of [-.1,.1])bolt(x+dx,-1.075,.24,'y');
   for(const y of [-.75,.05,.8]){const z=profile(y);box(.16,.09,.025,x,y,z+.06,bronze,'adjustable skin mounting tab');bolt(x,y,z+.085);}
  }
  for(const y of [-1.04,-.35,.4,1.1]){const z=profile(y)-.045;box(2.35,.045,.045,0,y,z,alloy,'removable spine rail');for(const x of [-.7,.7])plate(x,y,z+.035,.12,.09);}
  rod([-1.05,-1.04,.12],[1.05,1.1,.12],.007,steel,'diagonal tension brace');rod([1.05,-1.04,.12],[-1.05,1.1,.12],.007,steel,'diagonal tension brace');
 }
 return group;
}
