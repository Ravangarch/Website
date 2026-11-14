import * as THREE from 'three';

export const floral2025Keys=['floral-covering','floral-graphics','perforated-background','hm-lettering','floral-framework','floral-attachments','perimeter'];
// Photo-informed reconstructions; support details are illustrative.
export function floral2025Model(key){
 const group=new THREE.Group();
 const white=new THREE.MeshStandardMaterial({color:0xfaf8f4,roughness:.72,side:THREE.DoubleSide});
 const steel=new THREE.MeshStandardMaterial({color:0x9aa4aa,metalness:.65,roughness:.35});
 const red=new THREE.MeshStandardMaterial({color:0xde2946,roughness:.85,side:THREE.DoubleSide});
 const light=new THREE.MeshStandardMaterial({color:0xfff2cc,emissive:0xffda7d,emissiveIntensity:1.4});
 const add=(g,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);group.add(o);return o;};
 const box=(w,h,d,m,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const rod=(a,b,r=.012)=>{const u=new THREE.Vector3(...a),d=new THREE.Vector3(...b).sub(u),m=add(new THREE.CylinderGeometry(r,r,d.length(),8),steel);m.position.copy(u).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());};
 const texture=(draw)=>{if(typeof document==='undefined')return null;const c=document.createElement('canvas');c.width=c.height=1024;draw(c.getContext('2d'));const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;return tex;};
 const bloom=(ctx,x,y,r,angle=0)=>{
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);
  // Broad scalloped petals and nested red/pink linework imitate the printed motif.
  for(let layer=0;layer<3;layer++)for(let i=0;i<7;i++){
   ctx.save();ctx.rotate(i*Math.PI*2/7+layer*.22);ctx.beginPath();ctx.moveTo(0,0);const len=r*(1-layer*.20);
   ctx.bezierCurveTo(-len*.45,-len*.30,-len*.50,-len*.76,-len*.27,-len*.91);ctx.bezierCurveTo(-len*.15,-len*1.08,len*.02,-len*.93,len*.08,-len*.95);ctx.bezierCurveTo(len*.50,-len*.95,len*.42,-len*.34,0,0);
   ctx.fillStyle=['#e12d48','#bd2442','#ed5268'][layer];ctx.strokeStyle=layer?'#a92b42':'#fff4ed';ctx.lineWidth=layer?2:9;ctx.stroke();ctx.fill();
   ctx.strokeStyle=layer===2?'#b92c48':'#e85c6c';ctx.lineWidth=2;
   for(let j=-2;j<=2;j++){ctx.beginPath();ctx.moveTo(0,-len*.12);ctx.quadraticCurveTo(j*len*.10,-len*.50,j*len*.08,-len*.78);ctx.stroke();}ctx.restore();
  }
  for(let i=0;i<5;i++){ctx.save();ctx.rotate(i*.44-.8);ctx.beginPath();ctx.moveTo(0,r*.15);ctx.bezierCurveTo(r*.18,r*.6,r*.42,r*.64,r*.53,r*.76);ctx.bezierCurveTo(r*.16,r*.90,-r*.03,r*.53,0,r*.15);ctx.fillStyle='#c32b47';ctx.strokeStyle='#fff4ed';ctx.lineWidth=7;ctx.stroke();ctx.fill();ctx.restore();}
  ctx.restore();
 };
 const meshTexture=(flowers)=>texture(ctx=>{
  ctx.fillStyle='#f4f1ef';ctx.fillRect(0,0,1024,1024);ctx.globalCompositeOperation='destination-out';
  for(let row=0;row<76;row++)for(let col=0;col<73;col++){ctx.beginPath();ctx.ellipse(col*14+(row%2)*7,row*14,5.4,6,0,0,Math.PI*2);ctx.fill();}ctx.globalCompositeOperation='source-over';
  if(flowers)for(const [x,y,r,a]of [[70,100,310,.5],[910,60,310,-.5],[50,920,290,1],[940,900,320,-.5]])bloom(ctx,x,y,r,a);
 });
 if(key==='floral-covering'||key==='perforated-background'){
  const s=new THREE.Shape();s.moveTo(-1.2,-.9);s.lineTo(1.2,-.9);s.lineTo(1.2,.9);s.lineTo(-1.2,.9);s.closePath();
  for(const [x,y]of [[-.62,.39],[.62,.40],[-.48,-.4],[.64,-.42]]){const hole=new THREE.Path();hole.absellipse(x,y,.16,.23,0,Math.PI*2,true);s.holes.push(hole);}
  const geo=new THREE.ShapeGeometry(s,32),p=geo.attributes.position,uv=geo.attributes.uv;
  for(let i=0;i<p.count;i++){uv.setXY(i,(p.getX(i)+1.2)/2.4,(p.getY(i)+.9)/1.8);p.setZ(i,.07*Math.cos(p.getX(i)*2));}geo.computeVertexNormals();
  const mat=white.clone();mat.map=meshTexture(key==='floral-covering');mat.transparent=true;mat.alphaTest=.45;const surface=add(geo,mat);surface.userData.component='perforated-wrap';
 }else if(key==='floral-graphics'){
  const s=new THREE.Shape();for(let i=0;i<=160;i++){const a=i/160*Math.PI*2,r=.65+.10*Math.cos(a*7)+.025*Math.cos(a*21);const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y);}s.closePath();
  const geo=new THREE.ShapeGeometry(s,40),p=geo.attributes.position,uv=geo.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+.82)/1.64,(p.getY(i)+.82)/1.64);
  const mat=red.clone();mat.color.set(0xffffff);mat.map=texture(ctx=>bloom(ctx,512,512,490));mat.transparent=true;mat.alphaTest=.4;if(!mat.map)mat.color.set(0xde2946);add(geo,mat);
 }else if(key==='hm-lettering'){
  const mat=white.clone();mat.map=texture(ctx=>{ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.font='italic bold 390px Arial';ctx.fillText('H&M',512,640);});mat.transparent=true;mat.alphaTest=.1;add(new THREE.PlaneGeometry(1.7,1.1),mat);
 }else if(key==='floral-framework'){
  for(const z of [0,-.28]){for(const x of [-1,0,1])box(.025,1.5,.025,steel,x,0,z);for(const y of [-.75,0,.75])box(2,.025,.025,steel,0,y,z);}
  for(const x of [-1,1])for(const y of [-.75,.75])rod([x,y,0],[x,y,-.28]);rod([-1,-.75,-.28],[0,.75,-.28]);rod([0,.75,-.28],[1,-.75,-.28]);
 }else if(key==='floral-attachments'){
  for(let i=0;i<4;i++){const x=(i%2-.5)*.85,y=(Math.floor(i/2)-.5)*.7;box(.25,.11,.022,steel,x,y,0);box(.022,.11,.16,steel,x-.11,y,.07);for(const dx of [-.06,.06]){const bolt=add(new THREE.CylinderGeometry(.023,.023,.025,6),steel,x+dx,y,.026);bolt.rotation.x=Math.PI/2;}}
 }else if(key==='perimeter'){
  // Long parallel strips along an angled canopy edge, rather than a window frame.
  const arm=new THREE.Group();for(let i=0;i<3;i++){box(1.8,.035,.025,steel,0,i*.065,0);box(1.78,.018,.016,light,0,i*.065,.022);const housing=new THREE.Mesh(new THREE.BoxGeometry(.85,.035,.025),steel);housing.position.set(1.2,i*.065,-.3);housing.rotation.y=Math.PI/4;arm.add(housing);const strip=new THREE.Mesh(new THREE.BoxGeometry(.83,.018,.016),light);strip.position.set(1.2,i*.065,-.278);strip.rotation.y=Math.PI/4;arm.add(strip);}group.add(arm);
 }
 return group;
}
