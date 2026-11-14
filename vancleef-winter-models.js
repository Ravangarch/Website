import * as THREE from 'three';

// Photo-informed component reconstructions, not measured photogrammetry.
export function winterModel(key) {
 const group = new THREE.Group();
 const paint = (color, glow = false) => new THREE.MeshStandardMaterial({color, roughness: .65, ...(glow ? {emissive: color, emissiveIntensity: .65} : {})});
 const snow = paint(0xf5f6ff), ice = paint(0x96b8f2), blues = [paint(0x325aca), paint(0x667cea), paint(0x8d79df)], red = paint(0xf51d19), violet = paint(0x8452df), light = paint(0xffdf83, true), wire = paint(0xd8dce4), green = paint(0x154b35);
 const add = (geometry, material, x=0,y=0,z=0) => {const mesh = new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const ball = (r,mat,x,y,z=0) => add(new THREE.SphereGeometry(r,24,16),mat,x,y,z);
 const rod = (a,b,r,mat) => {const start=new THREE.Vector3(...a),delta=new THREE.Vector3(...b).sub(start);const mesh=add(new THREE.CylinderGeometry(r,r,delta.length(),8),mat);mesh.position.copy(start).addScaledVector(delta,.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh;};
 const extrude = (shape,depth,mat,x=0,y=0,z=0,bevel=.012) => add(new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelSegments:3,bevelSize:bevel,bevelThickness:bevel}),mat,x,y,z);
 const roof = (x,y,z,w) => {const s=new THREE.Shape();s.moveTo(-w*.58,0);s.lineTo(0,w*.59);s.lineTo(w*.58,0);s.quadraticCurveTo(w*.62,-.07,w*.49,-.08);s.lineTo(0,w*.43);s.lineTo(-w*.49,-.08);s.quadraticCurveTo(-w*.62,-.07,-w*.58,0);extrude(s,.12,snow,x,y,z);};
 const house = (x,y,z,w,h,index,door=false) => {
  const s=new THREE.Shape();s.moveTo(-w/2,0);
  if(door){const r=w*.13;s.lineTo(-r,0);s.lineTo(-r,h*.47);s.absarc(0,h*.47,r,Math.PI,0,true);s.lineTo(r,0);}
  s.lineTo(w/2,0);s.lineTo(w/2,h);s.lineTo(0,h+w*.5);s.lineTo(-w/2,h);s.closePath();
  const body=extrude(s,.14,blues[index%3].clone(),x,y,z);
  const positions=body.geometry.attributes.position,colors=[];
  for(let i=0;i<positions.count;i++){const c=new THREE.Color(0xc9a1ff).lerp(blues[index%3].color,Math.min(1,Math.max(0,positions.getY(i)/.26)));colors.push(c.r,c.g,c.b);}
  body.geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));body.material.color.set(0xffffff);body.material.vertexColors=true;
  roof(x,y+h,z-.015,w);
  if(!door){const disk=add(new THREE.CylinderGeometry(w*.14,w*.14,.018,32),snow,x,y+h*.56,z+.16);disk.rotation.x=Math.PI/2;}
  if(index===0)add(new THREE.BoxGeometry(w*.16,h*.36,.14),blues[0],x-w*.32,y+h+w*.18,z);
 };
 const bank = (y,z,h,mat,cap=false) => {const s=new THREE.Shape();if(cap){s.moveTo(-1.25,h-.08);s.bezierCurveTo(-.85,h+.02,-.65,h-.23,-.1,h-.07);s.bezierCurveTo(.4,h+.04,.65,h-.22,1.25,h-.1);}else{s.moveTo(-1.25,-.7);s.lineTo(1.25,-.7);}s.lineTo(1.25,h);s.bezierCurveTo(.65,h-.12,.4,h+.14,-.1,h+.03);s.bezierCurveTo(-.65,h-.13,-.85,h+.12,-1.25,h+.02);s.closePath();extrude(s,cap?.38:.28,mat,0,y,z,.025);};
 if(key==='snow-finish'){
  bank(0,0,.21,snow,true);
 } else if(key==='snowdrifts'){
  bank(.23,-.24,.39,ice);bank(.23,-.27,.46,snow,true);bank(-.28,.25,.13,ice);bank(-.28,.22,.21,snow,true);
 } else if(key==='houses') {
  house(-.65,-.65,-.1,.52,.95,0,true);house(.05,-.65,.05,.48,.65,1,true);house(.65,-.65,.2,.48,.32,2);
 } else if(key==='roofs') {
  roof(-.65,.1,0,.56);roof(0,-.15,.12,.56);roof(.65,.23,-.05,.56);
 } else if(key==='ornaments') {
  for(let i=0;i<3;i++){const x=(i-1)*.65,y=i===1?-.22:.13,r=.23+i*.025;add(new THREE.TorusGeometry(r,.014,12,64),light,x,y,0);for(const dx of [-r*.65,r*.65])rod([x+dx,y+Math.sqrt(r*r-dx*dx),0],[x+dx,1,0],.003,wire);ball(.045,i%2?red:violet,x+r*.55,y-r*.83,.02);}
 } else if(key==='snowflakes') {
  for(let j=0;j<3;j++){const x=(j-1)*.65,y=j===1?-.27:.12,r=j===1?.32:.23,s=new THREE.Shape();for(let k=0;k<24;k++){const a=k*Math.PI/12,rr=k%4===0||k%4===3?r:r*.46;const px=Math.sin(a)*rr,py=Math.cos(a)*rr;k?s.lineTo(px,py):s.moveTo(px,py);}s.closePath();extrude(s,.045,light,x,y,0,.005);rod([x,y+r,0],[x,1,0],.003,wire);}
 } else if(key==='spheres') {
  for(const [x,y,z,r,mat] of [[-.6,-.2,0,.21,red],[.05,.2,-.05,.18,violet],[.58,-.23,.1,.16,red]]){const m=mat.clone();m.roughness=.19;ball(r,m,x,y,z);}
 } else if(key==='trees') {
  add(new THREE.BoxGeometry(.55,.24,.5),paint(0x283d3b),0,-.82,0);rod([0,-.7,0],[0,1,0],.035,paint(0x75563a));
  for(let layer=0;layer<12;layer++){const y=-.63+layer*.13,r=.48*(1-layer/13);for(let j=0;j<9;j++){const a=j*Math.PI*2/9+layer*.7,tip=[Math.cos(a)*r,y,Math.sin(a)*r];rod([0,y+.17,0],tip,.012,green);for(let t=0;t<3;t++){const f=.45+t*.22;const twig=add(new THREE.ConeGeometry(.055,.23,5),green,tip[0]*f,y+.13*(1-f),tip[2]*f);twig.rotation.z=-Math.cos(a)*.8;twig.rotation.x=Math.sin(a)*.8;}if(j%3===0)ball(.021,light,...tip);if(j===layer%9)ball(.043,layer%2?snow:ice,...tip);}}
 }
 return group;
}
