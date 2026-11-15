import * as THREE from 'three';
export const longchampModelKeys=['sky-covering','clouds','horse','banana','pipe','baguette','tiger','surreal-objects','sky-graphics','signage','window-patterns','backdrops'];
// Photo-informed illustrative reconstructions of the surreal storefront components.
export function longchampReferenceModel(key){
 const group=new THREE.Group();
 const mat=(color,roughness=.55)=>new THREE.MeshStandardMaterial({color,roughness,side:THREE.DoubleSide});
 const blue=mat(0x009fe3),white=mat(0xfaf9f4),black=mat(0x101820,.3),yellow=mat(0xffd500,.32),cream=mat(0xfff4d8),red=mat(0xef2e21),orange=mat(0xc8742e);
 const add=(g,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);group.add(o);return o;};
 const box=(w,h,d,m,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const ellipsoid=(x,y,z,sx,sy,sz,m)=>{const o=add(new THREE.SphereGeometry(1,28,20),m,x,y,z);o.scale.set(sx,sy,sz);return o;};
 const tube=(points,r,m)=>add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),40,r,9,false),m);
 const texture=draw=>{if(typeof document==='undefined')return null;const c=document.createElement('canvas');c.width=c.height=1024;draw(c.getContext('2d'));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;};
 const sky=()=>texture(ctx=>{ctx.fillStyle='#009fe7';ctx.fillRect(0,0,1024,1024);for(let i=0;i<18;i++){const x=(i*297+36)%1100-40,y=(i*173+62)%1024,s=.65+(i%3)*.21;ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(let j=0;j<7;j++){const dx=(j-3)*25,dy=-18*Math.sin(j*.8),r=25+(j%3)*9;const g=ctx.createRadialGradient(dx,dy,3,dx,dy,r);g.addColorStop(0,'#fffefa');g.addColorStop(.7,'#f8fbff');g.addColorStop(1,'rgba(230,241,252,0)');ctx.fillStyle=g;ctx.fillRect(dx-r,dy-r,r*2,r*2);}ctx.restore();}});
 const patterned=()=>{const m=yellow.clone();m.map=texture(ctx=>{ctx.fillStyle='#ffcf00';ctx.fillRect(0,0,1024,1024);ctx.fillStyle='#14191e';for(let row=0;row<18;row++)for(let col=0;col<14;col++){ctx.beginPath();ctx.ellipse(col*78+(row%2)*39,row*60,13,17,0,0,Math.PI*2);ctx.fill();}});m.color.set(0xffffff);return m;};
 const signTexture=()=>texture(ctx=>{ctx.fillStyle='#ef2c20';ctx.fillRect(0,0,1024,1024);ctx.fillStyle='#fff5dc';ctx.fillRect(24,38,976,948);ctx.font='bold 240px Arial';for(const [y,words]of [[445,[['TOILET','#151a1d'],['CHAMP','#ed2b21']]],[780,[['LONG','#ed2b21'],['PAPER','#151a1d']]]]){const width=words.reduce((sum,[word])=>sum+ctx.measureText(word).width,0);ctx.save();ctx.translate(50,y);ctx.scale(924/width,1);let x=0;for(const [word,color]of words){ctx.fillStyle=color;ctx.fillText(word,x,0);x+=ctx.measureText(word).width;}ctx.restore();}});

 const sign=()=>{box(1.8,.67,.065,red);const m=cream.clone();m.map=signTexture();m.color.set(0xffffff);add(new THREE.PlaneGeometry(1.76,.64),m,0,0,.035);};
 const cloud=(x,y,z,s)=>{for(const [dx,dy,r]of [[-.35,-.02,.18],[-.17,.07,.25],[.06,.16,.28],[.3,.05,.20]])ellipsoid(x+dx*s,y+dy*s,z,r*s,r*.69*s,r*.35*s,white);};
 const banana=()=>{const path=new THREE.CatmullRomCurve3([new THREE.Vector3(-.8,.65,0),new THREE.Vector3(-.62,.10,0),new THREE.Vector3(-.13,-.32,0),new THREE.Vector3(.46,-.42,0),new THREE.Vector3(.92,-.15,0)]);const geo=new THREE.TubeGeometry(path,64,.21,16,false),p=geo.attributes.position;
  for(let i=0;i<=64;i++){const centre=path.getPointAt(i/64),f=.12+.88*Math.sin(Math.PI*i/64)**.5;for(let j=0;j<=16;j++){const n=i*17+j,v=new THREE.Vector3().fromBufferAttribute(p,n).sub(centre).multiplyScalar(f).add(centre);p.setXYZ(n,v.x,v.y,v.z);}}geo.computeVertexNormals();add(geo,yellow);tube([[-.8,.61,0],[-.84,.83,0],[-.83,.93,0]],.034,mat(0xbea51b));ellipsoid(.92,-.15,0,.028,.035,.029,black);
 };
 const horse=()=>{
  ellipsoid(0,.13,0,.47,.25,.17,black);ellipsoid(.32,.15,0,.25,.27,.19,black);ellipsoid(-.35,.2,0,.21,.27,.17,black);
  const neck=ellipsoid(-.47,.43,0,.15,.38,.14,black);neck.rotation.z=-.48;const head=ellipsoid(-.69,.67,0,.13,.21,.11,black);head.rotation.z=-.22;ellipsoid(-.76,.53,.01,.11,.13,.09,black);
  for(const z of [-.075,.075]){const ear=add(new THREE.ConeGeometry(.035,.17,8),black,-.64,.91,z);ear.rotation.z=-.2;}
  const legs=[[[.28,.06,-.1],[.49,-.18,-.1],[.72,-.52,-.1]],[[.25,.07,.1],[.16,-.19,.1],[.49,-.45,.1]],[[-.32,.12,-.11],[-.57,-.06,-.11],[-.68,.16,-.11]],[[-.34,.11,.11],[-.49,-.28,.11],[-.70,-.36,.11]]];
  for(const points of legs){tube(points,.044,black);const end=points.at(-1);const hoof=box(.13,.065,.08,black,...end);hoof.rotation.z=.25;}
  tube([[.42,.27,0],[.66,.40,0],[.84,.31,0],[.96,.44,0]],.055,black);for(let i=0;i<9;i++){const mane=add(new THREE.ConeGeometry(.035,.12,6),black,-.33-i*.038,.52+i*.035,-.015);mane.rotation.z=-.8;}
 };
 if(key==='sky-covering'||key==='sky-graphics'){
  const s=new THREE.Shape();s.moveTo(-.9,-1.1);s.lineTo(.9,-1.1);s.lineTo(.9,.8);s.lineTo(.45,.8);s.quadraticCurveTo(.32,1.1,0,1.24);s.quadraticCurveTo(-.32,1.1,-.45,.8);s.lineTo(-.9,.8);s.closePath();
  for(const y of [-.65,-.08,.49])for(const x of [-.5,.5]){const h=new THREE.Path();h.moveTo(x-.15,y-.16);h.lineTo(x+.15,y-.16);h.lineTo(x+.15,y+.16);h.lineTo(x-.15,y+.16);h.closePath();s.holes.push(h);}
  const geo=new THREE.ShapeGeometry(s,32),p=geo.attributes.position,uv=geo.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+.9)/1.8,(p.getY(i)+1.1)/2.34);const m=blue.clone();m.color.set(0xffffff);m.map=sky();add(geo,m);if(key==='sky-graphics')for(const x of [-.5,.5])box(.018,1.55,.025,black,x,-.08,-.025);
 }else if(key==='clouds'){cloud(-.4,.25,0,1);cloud(.4,-.2,0,.8);}
 else if(key==='horse')horse();
 else if(key==='banana')banana();
 else if(key==='pipe'){const bowl=add(new THREE.CylinderGeometry(.20,.14,.46,32,1,true),orange,-.5,.17,0);bowl.rotation.z=-.25;const rim=add(new THREE.TorusGeometry(.20,.025,8,40),mat(0x7c421d),-.45,.395,0);rim.rotation.x=Math.PI/2;rim.rotation.y=-.25;tube([[-.48,-.02,0],[-.13,-.14,0],[.38,-.32,0],[.83,-.38,0]],.046,black);}
 else if(key==='baguette'){const m=mat(0xdca25c);const loaf=ellipsoid(0,0,0,1,.145,.15,m);loaf.rotation.z=-.25;for(let i=0;i<7;i++){const x=(i-3)*.22;tube([[x-.06,.06-x*.25,.12],[x,.04-x*.25,.151],[x+.09,-.04-x*.25,.13]],.012,cream);}}
 else if(key==='tiger'){
  ellipsoid(0,.1,0,.46,.5,.26,orange);for(const sign of [-1,1]){ellipsoid(sign*.34,.46,0,.15,.16,.10,orange);ellipsoid(sign*.34,.46,.09,.08,.1,.035,black);ellipsoid(sign*.15,-.04,.25,.19,.14,.12,white);ellipsoid(sign*.19,.20,.24,.055,.034,.023,mat(0xa1a347));for(let i=0;i<4;i++)tube([[sign*.42,.36-i*.16,.12],[sign*.28,.24-i*.16,.23],[sign*.22,.17-i*.16,.25]],.023,black);}
  ellipsoid(0,-.17,.27,.16,.18,.05,black);ellipsoid(0,-.22,.33,.095,.12,.025,mat(0xe48391));ellipsoid(0,.02,.38,.08,.05,.04,black);for(const sign of [-1,1]){const fang=add(new THREE.ConeGeometry(.027,.13,10),white,sign*.10,-.12,.35);fang.rotation.z=Math.PI;}
 }else if(key==='surreal-objects'){cloud(-.48,.25,0,.55);ellipsoid(.42,.15,0,.24,.27,.13,cream);ellipsoid(.42,.15,.12,.08,.10,.035,blue);box(.38,.25,.17,patterned(),0,-.4,0);}
 else if(key==='signage')sign();
 else if(key==='window-patterns'){
  const m=patterned();for(const x of [-.65,.65])box(.18,1.65,.22,m,x,0,0);for(const y of [-.82,.82])box(1.48,.18,.22,m,0,y,0);
  const band=cream.clone();band.map=signTexture();band.color.set(0xffffff);for(const y of [-.72,.72])box(1.20,.055,.025,band,0,y,.14);for(const x of [-.57,.57])box(.055,1.45,.025,red,x,0,.14);
 }else if(key==='backdrops'){
  box(1.5,1.55,.025,patterned(),0,0,-.18);for(const y of [-.5,0,.5])box(1.4,.035,.35,blue,0,y,.01);for(const x of [-.7,.7])box(.025,1.5,.025,black,x,0,.01);
 }
 return group;
}
