import * as THREE from 'three';
export const layered2023Keys=['rectangular-panels','translucent-panels','gold-panels','white-panels','typography','hm-logo','layered-framework','panel-mounts','integrated-lighting'];
// Photo-informed illustrations; concealed fittings are representative.
export function layered2023Model(key){
 const group=new THREE.Group();
 const white=new THREE.MeshStandardMaterial({color:0xf2f1ed,roughness:.86});
 const steel=new THREE.MeshStandardMaterial({color:0x9ba5af,metalness:.7,roughness:.32});
 const gold=new THREE.MeshStandardMaterial({color:0xd6bd70,metalness:.45,roughness:.4});
 const light=new THREE.MeshStandardMaterial({color:0xfff1d3,emissive:0xffd18b,emissiveIntensity:1.2});
 const add=(g,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);group.add(o);return o;};
 const box=(w,h,d,m,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const canvasTexture=draw=>{if(typeof document==='undefined')return null;const c=document.createElement('canvas');c.width=512;c.height=768;draw(c.getContext('2d'));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;};
 const flecks=(ctx,full=false)=>{
  ctx.fillStyle='#efefec';ctx.fillRect(0,0,512,768);
  let state=12345;const random=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296;};
  for(let i=0;i<68000;i++){const x=random()*512,y=random()*768,density=full?.95:Math.max(0,1-y/580);if(random()>density)continue;ctx.fillStyle=['#d6bd69','#b6a271','#f6e5a1','#d4cbb0'][i%4];const size=.6+random()*1.6;ctx.fillRect(x,y,size,size);}
 };
 const panel=(x,y,z,w,h,mode='white',text)=>{
  const m=(mode==='gold'?gold:white).clone();
  if(mode==='gold'||mode==='fade'){m.color.set(0xffffff);m.map=canvasTexture(ctx=>flecks(ctx,mode==='gold'));}
  if(mode==='translucent'){m.transparent=true;m.opacity=.58;m.color.set(0xe9edf1);m.depthWrite=false;}
  const p=box(w,h,.018,m,x,y,z);p.userData.component='layered-sheet';
  if(text){const t=canvasTexture(ctx=>{ctx.fillStyle='#292a2b';ctx.textAlign='center';ctx.font='italic 62px cursive';text.forEach((line,i)=>ctx.fillText(line,256,260+i*85,460));});const ink=new THREE.MeshStandardMaterial({map:t,transparent:true,alphaTest:.1,roughness:.85,side:THREE.DoubleSide});add(new THREE.PlaneGeometry(w*.92,h*.92),ink,x,y,z+.012);}
 };
 if(['rectangular-panels','gold-panels','white-panels','translucent-panels'].includes(key)){
  if(key==='rectangular-panels'){
   for(let row=0;row<3;row++)for(let col=0;col<5;col++){const x=(col-2)*.39,y=(row-1)*.49+(col%2)*.14;panel(x,y,.025*((row+col)%3),.47,.75,row===2?'fade':'white');}
  }else{const mode={'gold-panels':'fade','white-panels':'white','translucent-panels':'translucent'}[key];for(let i=0;i<4;i++)panel((i-1.5)*.38,(i%2)*.21-.1,i*.055,.56,1.35,mode);}
 }else if(key==='typography'){
  panel(-.58,.12,0,.58,.88,'white',['TIME TO','DANCE']);panel(.05,-.13,.055,.62,1.05,'white',['PARIS','EST','MAGIQUE']);panel(.69,.10,.1,.63,1.05,'white',['You look','beautiful','today']);
 }else if(key==='hm-logo'){
  // Separate, shallow raised strokes approximate the slanted cut-out gold mark.
  const stroke=(points)=>{const s=new THREE.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return add(new THREE.ExtrudeGeometry(s,{depth:.045,bevelEnabled:true,bevelSize:.008,bevelThickness:.007,bevelSegments:2}),gold);};
  stroke([[-.97,-.65],[-.79,-.68],[-.32,.65],[-.51,.67]]);stroke([[-.52,-.65],[-.34,-.67],[.13,.65],[-.06,.66]]);stroke([[-1.04,-.06],[-.99,.10],[.02,.25],[-.02,.07]]);
  stroke([[.12,-.65],[.29,-.67],[.60,.31],[.54,-.32],[.69,-.39],[1.05,.33],[.85,-.67],[1.03,-.70],[1.30,.65],[1.07,.67],[.73,-.02],[.83,.63],[.62,.65]]);
  const tex=canvasTexture(ctx=>{ctx.fillStyle='#d7bd6a';ctx.font='bold italic 380px serif';ctx.textAlign='center';ctx.fillText('&',256,525);});add(new THREE.PlaneGeometry(.3,.43),new THREE.MeshStandardMaterial({map:tex,color:0xe1c775,transparent:true,alphaTest:.2,side:THREE.DoubleSide}),.02,-.36,.055);
  const sparkle=canvasTexture(ctx=>flecks(ctx,true));for(const mesh of group.children)if(mesh.geometry.type==='ExtrudeGeometry'){mesh.material=gold.clone();mesh.material.map=sparkle;}
 }else if(key==='layered-framework'){
  for(const z of [0,-.23]){for(const x of [-1,-.5,0,.5,1])box(.025,1.5,.025,steel,x,0,z);for(const y of [-.75,0,.75])box(2,.025,.025,steel,0,y,z);}
  for(const x of [-1,0,1])for(const y of [-.75,.75])box(.025,.025,.23,steel,x,y,-.115);
  for(let i=0;i<4;i++)box(.15,.045,.12,steel,(i-1.5)*.5,(i%2)*.45-.2,.05);
 }else if(key==='panel-mounts'){
  for(let i=0;i<4;i++){const x=(i%2-.5)*.8,y=(Math.floor(i/2)-.5)*.65;box(.22,.06,.025,steel,x,y,0);box(.025,.15,.10,steel,x-.09,y+.04,.04);const b=add(new THREE.CylinderGeometry(.025,.025,.025,6),steel,x+.04,y,.027);b.rotation.x=Math.PI/2;}
 }else if(key==='integrated-lighting'){
  for(let i=0;i<3;i++){const x=(i-1)*.62;box(.38,.045,.22,steel,x,-.5,-.04);const lamp=add(new THREE.CylinderGeometry(.08,.09,.11,24),steel,x,-.44,.015);lamp.rotation.x=.35;const lens=add(new THREE.CircleGeometry(.071,24),light,x,-.36,.052);lens.rotation.x=-Math.PI/2+.35;panel(x,.1,-.12,.50,.78,'white');}
 }
 return group;
}
