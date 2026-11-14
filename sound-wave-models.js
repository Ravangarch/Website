import * as THREE from 'three';

// A neutral studio reflection makes polished metal legible in both archive viewers.
const reflectionPixels=new Uint8Array(128*64*4);
for(let y=0;y<64;y++)for(let x=0;x<128;x++){
 const value=(x>15&&x<32)||(x>70&&x<102)?245:Math.round(55+90*Math.sin(y*Math.PI/64));
 const i=(y*128+x)*4;reflectionPixels.set([value,value,value,255],i);
}
const studioReflection=new THREE.DataTexture(reflectionPixels,128,64);
studioReflection.mapping=THREE.EquirectangularReflectionMapping;
studioReflection.colorSpace=THREE.SRGBColorSpace;studioReflection.needsUpdate=true;

// Photo-informed component reconstructions; concealed structure is illustrative.
export const soundWaveKeys=['wave-shell','wave-ribs','wave-panels','wave-finish','window-frames','backdrop','sculptures','sculpture-supports','wave-framework','wave-connections'];
export function soundWaveModel(key){
 const group=new THREE.Group();
 const red=new THREE.MeshPhysicalMaterial({color:0xf5090a,metalness:.25,roughness:.16,clearcoat:1,clearcoatRoughness:.06,envMap:studioReflection,envMapIntensity:.8});
 const steel=new THREE.MeshStandardMaterial({color:0xa5adb4,metalness:.85,roughness:.26});
 const chrome=new THREE.MeshStandardMaterial({color:0xe8edf0,metalness:1,roughness:.08,envMap:studioReflection,envMapIntensity:1.2});
 const black=new THREE.MeshStandardMaterial({color:0x111215,roughness:.8});
 const pearl=new THREE.MeshStandardMaterial({color:0xd8c6c1,metalness:.22,roughness:.45,side:THREE.DoubleSide,flatShading:true});
 const add=(geo,mat,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const box=(w,h,d,mat,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),mat,x,y,z);
 const rod=(a,b,r=.013,mat=steel)=>{const start=new THREE.Vector3(...a),delta=new THREE.Vector3(...b).sub(start),m=add(new THREE.CylinderGeometry(r,r,delta.length(),10),mat);m.position.copy(start).addScaledVector(delta,.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;};
 const rounded=(w,h,r)=>{const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);s.closePath();return s;};
 const extrude=(s,depth,mat,x=0,y=0,z=0,bevel=.012)=>add(new THREE.ExtrudeGeometry(s,{depth,steps:1,curveSegments:24,bevelEnabled:true,bevelSize:bevel,bevelThickness:bevel,bevelSegments:3}),mat,x,y,z);
 const frame=(x,y,z,w,h)=>{const s=rounded(w,h,.16);s.holes.push(new THREE.Path(rounded(w-.13,h-.13,.115).getPoints(32).reverse()));const mesh=extrude(s,.16,red,x,y,z);mesh.userData.component='rounded-red-frame';return mesh;};
 const arc=(r,thickness,mat,z=0)=>{const s=new THREE.Shape();s.absarc(0,-.58,r,0,Math.PI,false);s.lineTo(-r+thickness,-.58);s.absarc(0,-.58,r-thickness,Math.PI,0,true);s.closePath();return extrude(s,.06,mat,0,0,z,.006);};
 const bolt=(x,y,z)=>{const m=add(new THREE.CylinderGeometry(.028,.028,.024,6),steel,x,y,z);m.rotation.x=Math.PI/2;};
 if(key==='wave-shell'){
  const s=new THREE.Shape();s.moveTo(-1.25,-.58);s.absarc(0,-.58,1.25,Math.PI,0,true);s.closePath();extrude(s,.09,red,0,0,-.14);
  for(let i=0;i<4;i++)arc(1.25-i*.24,.065,red,.01+i*.022);
  for(const y of [-.23,.13,.49]){const half=Math.sqrt(1.25**2-(y+.58)**2);rod([-half,y,-.031],[half,y,-.031],.002,black);}
 }else if(key==='wave-ribs'){
  for(let i=0;i<5;i++)arc(1.25-i*.22,.025,steel,(i%2)*.03);for(const x of [-1.2,0,1.2])rod([x,-.58,-.1],[x,-.58,.15],.015);
 }else if(key==='wave-panels'||key==='wave-finish'){
  const cols=key==='wave-finish'?1:4,rows=key==='wave-finish'?1:3;
  for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
   const geo=new THREE.BoxGeometry(1.9/cols-.009,1.45/rows-.009,.025,20,1,1),p=geo.attributes.position;
   const x=(col-(cols-1)/2)*1.9/cols,y=(row-(rows-1)/2)*1.45/rows;
   for(let i=0;i<p.count;i++){const gx=p.getX(i)+x;p.setZ(i,p.getZ(i)+.20*Math.cos(gx*1.6));}geo.computeVertexNormals();add(geo,red,x,y,0);
  }
 }else if(key==='window-frames'){
  frame(-.67,0,0,.65,1.55);frame(.4,0,0,1.24,1.1);
 }else if(key==='backdrop'){
  box(1.65,1.8,.035,pearl,0,0,-.08);
  for(let row=0;row<9;row++)for(let col=0;col<6;col++){
   const x=-.825+col*.275,y=-.9+row*.2,w=.275,h=.2;
   const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([x,y,0,x+w,y,0,x+w,y+h,0,x,y+h,0,x+w*.46,y+h*.52,.13],3));geo.setIndex([0,1,4,1,2,4,2,3,4,3,0,4]);geo.computeVertexNormals();const m=add(geo,pearl);m.userData.component='faceted-backdrop-tile';
  }
 }else if(key==='sculptures'){
  // Rounded chrome housings surround recessed dark speaker-like circles.
  for(const [x,y]of [[0,.66],[-.48,.42],[.48,.42],[-.92,-.08],[.92,-.08],[-.47,-.32],[.47,-.32],[-.47,-.81],[.47,-.81],[0,-1.02]]){
   const s=rounded(.48,.45,.18);s.holes.push(new THREE.Path().absarc(0,0,.145,0,Math.PI*2,true));const m=extrude(s,.10,chrome,x,y,0,.035);m.userData.component='chrome-speaker-housing';
   add(new THREE.TorusGeometry(.155,.023,12,48),chrome,x,y,.13);const cone=add(new THREE.CylinderGeometry(.133,.115,.045,40),black,x,y,.045);cone.rotation.x=Math.PI/2;
  }
 }else if(key==='sculpture-supports'){
  for(const x of [-.75,0,.75]){rod([x,-.95,-.08],[x,.95,-.08],.014);for(const y of [-.65,0,.65]){rod([x,y,-.08],[x,y,.1],.012);box(.18,.045,.025,steel,x,y,.1);bolt(x,y,.124);}}
 }else if(key==='wave-framework'){
  for(const z of [0,-.26]){for(const x of [-1,-.5,0,.5,1])box(.025,1.5,.025,steel,x,0,z);for(const y of [-.75,0,.75])box(2.025,.025,.025,steel,0,y,z);}
  for(const x of [-1,0,1])for(const y of [-.75,.75])rod([x,y,0],[x,y,-.26],.012);
  rod([-1,-.75,-.26],[0,.75,-.26]);rod([0,.75,-.26],[1,-.75,-.26]);
 }else if(key==='wave-connections'){
  for(let i=0;i<4;i++){const x=(i%2-.5)*.85,y=(Math.floor(i/2)-.5)*.7;box(.28,.12,.025,steel,x,y,0);box(.025,.12,.16,steel,x-.127,y,.065);for(const dx of [-.065,.065])bolt(x+dx,y,.025);}
 }
 return group;
}
