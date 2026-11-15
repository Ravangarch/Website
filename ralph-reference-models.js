import * as THREE from 'three';
export const ralphModelKeys=['leather-panels','raised-panels','stitching','vertical-strap','horizontal-straps','strap-holes','rivets','logo-backing','rl-lettering','panel-edges'];
// Photo-informed reconstructions of the oversized leather-goods façade components.
export function ralphReferenceModel(key){
 const group=new THREE.Group();
 const pixels=new Uint8Array(128*128*4);let seed=402;for(let i=0;i<128*128;i++){seed=(seed*1664525+1013904223)>>>0;const t=(seed/4294967296-.5)*12;pixels.set([139+t,83+t,66+t,255],i*4);}
 const grain=new THREE.DataTexture(pixels,128,128);grain.colorSpace=THREE.SRGBColorSpace;grain.wrapS=grain.wrapT=THREE.RepeatWrapping;grain.repeat.set(3,3);grain.needsUpdate=true;
 const leather=new THREE.MeshStandardMaterial({map:grain,color:0xffffff,roughness:.62});
 const edge=new THREE.MeshStandardMaterial({color:0x55372d,roughness:.77});
 const thread=new THREE.MeshStandardMaterial({color:0xe2d8c7,roughness:.85});
 const reflectionData=new Uint8Array(64*32*4);for(let y=0;y<32;y++)for(let x=0;x<64;x++){const v=x>10&&x<26||x>39&&x<52?245:85;reflectionData.set([v,v,v,255],(y*64+x)*4);}const env=new THREE.DataTexture(reflectionData,64,32);env.mapping=THREE.EquirectangularReflectionMapping;env.colorSpace=THREE.SRGBColorSpace;env.needsUpdate=true;
 const silver=new THREE.MeshStandardMaterial({color:0xe6e9ef,metalness:1,roughness:.21,envMap:env});
 const add=(g,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);group.add(o);return o;};
 const extrude=(shape,depth,mat,x=0,y=0,z=0,bevel=.012)=>add(new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:bevel>0,bevelSize:bevel,bevelThickness:bevel,bevelSegments:4,curveSegments:24}),mat,x,y,z);
 const rect=(w,h)=>{const s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.closePath();return s;};
 const stitches=(points,z=.1)=>{for(let j=0;j<points.length-1;j++){const a=new THREE.Vector3(points[j][0],points[j][1],z),b=new THREE.Vector3(points[j+1][0],points[j+1][1],z),d=b.clone().sub(a),n=Math.ceil(d.length()/.028);for(let i=0;i<n;i++){const start=a.clone().addScaledVector(d,(i+.12)/n),end=a.clone().addScaledVector(d,(i+.63)/n),delta=end.clone().sub(start),m=add(new THREE.CylinderGeometry(.0023,.0023,delta.length(),5),thread);m.position.copy(start).addScaledVector(delta,.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());}}};
 const seamRect=(x,y,w,h,z)=>stitches([[x-w/2,y-h/2],[x+w/2,y-h/2],[x+w/2,y+h/2],[x-w/2,y+h/2],[x-w/2,y-h/2]],z);
 const panel=(x,y,w,h)=>{extrude(rect(w,h),.035,edge,x,y,0,.006);extrude(rect(w-.07,h-.07),.035,leather,x,y,.035,.025);seamRect(x,y,w-.10,h-.10,.109);};
 const ovalHole=(shape,x,y,rx,ry)=>{const hole=new THREE.Path();hole.absellipse(x,y,rx,ry,0,Math.PI*2,true);shape.holes.push(hole);};
 const strap=(horizontal=false)=>{const s=rect(horizontal?2:.24,horizontal?.23:2);if(horizontal){for(let i=0;i<5;i++){const hole=new THREE.Path();hole.absellipse(-.7+i*.35,0,.025,.018,0,Math.PI*2,true);s.holes.push(hole);}}else for(let i=0;i<12;i++)ovalHole(s,0,-.84+i*.15,.022,.037);const m=extrude(s,.048,leather,0,0,0,.007);m.userData.component='punched-strap';seamRect(0,0,horizontal?1.92:.18,horizontal?.16:1.92,.061);if(horizontal)for(const x of [-.72,.72]){const keeper=add(new THREE.BoxGeometry(.055,.28,.085),silver,x,0,.047);keeper.userData.component='silver-keeper';}};
 const rl=()=>{
  const stroke=points=>{const s=new THREE.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return extrude(s,.065,silver);};
  stroke([[-.55,-.5],[-.43,-.5],[-.43,.55],[-.55,.55]]);
  const r=new THREE.Shape();r.moveTo(-.48,.55);r.lineTo(-.04,.55);r.bezierCurveTo(.40,.55,.40,.02,-.04,.02);r.lineTo(-.43,.02);r.lineTo(-.43,.12);r.lineTo(-.05,.12);r.bezierCurveTo(.23,.12,.23,.44,-.05,.44);r.lineTo(-.48,.44);r.closePath();extrude(r,.065,silver);
  stroke([[-.09,.06],[.06,.04],[.55,-.5],[.39,-.5]]);
  stroke([[-.25,.36],[-.13,.36],[-.13,-.60],[.60,-.60],[.60,-.72],[-.25,-.72]]);
 };
 if(key==='leather-panels'||key==='raised-panels'){
  if(key==='leather-panels'){const s=rect(1.9,1.8);for(const x of [-.48,.48]){const h=rect(.48,.90);const p=new THREE.Path(h.getPoints().map(v=>new THREE.Vector2(v.x+x,v.y)));s.holes.push(p);}extrude(s,.035,leather);for(const x of [-.48,.48])seamRect(x,0,.60,1.04,.052);}
  else for(let i=0;i<3;i++)panel((i-1)*.62,(i%2)*.13,.52,1.6);
 }else if(key==='stitching'){panel(0,0,1.65,.75);for(const y of [-.16,.16])stitches([[-.72,y],[.72,y]],.111);}
 else if(key==='vertical-strap'||key==='strap-holes')strap();
 else if(key==='horizontal-straps')strap(true);
 else if(key==='rivets'){for(const [x,y,r]of [[-.55,.2,.12],[0,.2,.08],[.5,.2,.055],[-.4,-.3,.10],[.3,-.3,.075]]){const o=add(new THREE.CylinderGeometry(r,r,.055,32),silver,x,y,0);o.rotation.x=Math.PI/2;const neck=add(new THREE.CylinderGeometry(r*.4,r*.4,.08,16),silver,x,y,-.05);neck.rotation.x=Math.PI/2;}}
 else if(key==='logo-backing'){
  const points=[[-.65,.62],[.65,.62],[.65,-.45],[.47,-.65],[-.47,-.65],[-.65,-.45],[-.65,.62]],s=new THREE.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();extrude(s,.07,edge,0,0,0,.018);extrude(s,.045,leather,0,0,.055,.025);stitches(points.map(([x,y])=>[x*.91,y*.91]),.14);extrude(rect(.15,.65),.045,leather,0,.9,.03,.012);for(let i=0;i<4;i++){const o=add(new THREE.CircleGeometry(.012,20),edge,0,.7+i*.12,.08);}
 }else if(key==='rl-lettering')rl();
 else if(key==='panel-edges'){panel(0,0,1.6,1.2);const cut=add(new THREE.BoxGeometry(1.6,.04,.08),edge,0,-.64,.02);seamRect(0,0,1.41,1.01,.112);}
 return group;
}
