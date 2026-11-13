import * as THREE from 'three';
const part=(name,materialLabel,key,type='Metal')=>({name,materialLabel,componentModel:`f25-${key}`,type,year:2025,properties:'Clean illustrative component · no visible defects'});
const project=(project,items)=>items.map(item=>({...item,project}));
export const ralphLaurenDefinitions=project('Monumental RL 888',[
 part('Large leather-effect façade panels','natural leather, embossed aluminium or painted plywood','leather-panels','Wood'),
 part('Raised rectangular panels','plywood, timber or folded aluminium','raised-panels','Structure'),
 part('Decorative stitching','cotton, linen or hemp thread','stitching','Natural fibres'),
 part('Oversized vertical strap','natural leather or embossed aluminium','vertical-strap','Natural fibres'),
 part('Horizontal straps','natural leather or embossed aluminium','horizontal-straps','Natural fibres'),
 part('Strap perforations','punched leather or metal','strap-holes','Natural fibres'),
 part('Metallic rivets and buttons','stainless steel, brass or aluminium','rivets'),
 part('Large central logo backing','plywood covered with natural leather or embossed aluminium','logo-backing','Wood'),
 part('Metallic RL lettering','brushed aluminium or stainless steel','rl-lettering'),
 part('Panel edge detailing','stitched natural leather or embossed metal','panel-edges','Natural fibres')]);
export const pacoIconiqueDefinitions=project('Iconique 1969',[
 part('Large decorative circular discs','polished aluminium sheets','large-discs'),
 part('Gold reflective discs','gold-anodised aluminium','gold-discs'),
 part('Silver reflective discs','polished or mirror-finished aluminium','silver-discs'),
 part('Dark metallic discs','black-anodised aluminium or darkened steel','dark-discs'),
 part('Circular perforations','mechanically punched holes in aluminium sheets','disc-perforations'),
 part('Curved decorative cut-outs','laser-cut aluminium sheets','disc-cutouts'),
 part('Interlocking decorative elements','aluminium sheets with mechanical connections','interlocking'),
 part('Reflective surface finishes','anodising or mechanical polishing','reflective-finishes')]);
export const longchampDefinitions=project('Longchamp x ToiletPaper',[
 part('Blue façade covering with cloud graphics','digitally printed PVC-free architectural vinyl or painted fabric','sky-covering','Screens'),
 part('Three-dimensional cloud-shaped façade elements','sculpted expanded polystyrene (EPS) with protective coating','clouds','Plastic'),
 part('Black galloping horse sculpture','moulded fibreglass-reinforced resin (GRP), painted','horse','Plastic'),
 part('Giant yellow banana sculpture','sculpted polyurethane foam with painted resin coating','banana','Plastic'),
 part('Oversized smoking pipe','moulded fibreglass or sculpted rigid polyurethane foam, painted','pipe','Plastic'),
 part('Floating baguette sculpture','sculpted polyurethane foam with textured paint finish','baguette','Plastic'),
 part('Tiger head sculpture','moulded fibreglass-reinforced resin with hand-painted details','tiger','Plastic'),
 part('Small surrealist decorative objects','painted resin or rigid polyurethane foam','surreal-objects','Plastic'),
 part('Blue sky and cloud window graphics','digitally printed self-adhesive vinyl','sky-graphics','Plastic'),
 part('Large TOILETCHAMP LONGPAPER signage','printed aluminium composite panel with coloured lettering','signage','Structure'),
 part('Decorative patterned window surrounds','digitally printed vinyl or laminated graphic panels','window-patterns','Plastic'),
 part('Colourful window display backdrops','printed rigid panels or painted MDF','backdrops','Wood')]);
export function facade2025Model(fullKey){const key=fullKey.replace('f25-',''),group=new THREE.Group();
 const mat=(color,metalness=0,roughness=.65)=>new THREE.MeshStandardMaterial({color,metalness,roughness,side:THREE.DoubleSide});
 const leather=mat(0x684130),raised=mat(0x80543c),thread=mat(0xe3c89b),silver=mat(0xdce1e5,1,.1),gold=mat(0xc7a457,.95,.15),dark=mat(0x25282c,.85,.2),white=mat(0xf3f0e6),black=mat(0x171719,.1,.35),yellow=mat(0xf7d034),orange=mat(0xdc8c34),pink=mat(0xe887a7),blue=mat(0x378acb);
 const add=(geo,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);group.add(o);return o;};
 const box=(w,h,d,m,x=0,y=0,z=0)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const ellipsoid=(x,y,z,sx,sy,sz,m)=>{const o=add(new THREE.SphereGeometry(1,32,24),m,x,y,z);o.scale.set(sx,sy,sz);return o;};
 const rod=(a,b,r=.015,m=silver)=>{const u=new THREE.Vector3(...a),d=new THREE.Vector3(...b).sub(u),o=add(new THREE.CylinderGeometry(r,r,d.length(),10),m);o.position.copy(u).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;};
 const curve=(points,r,m)=>add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),40,r,10,false),m);
 const ring=(r,t,m,x=0,y=0,z=0)=>add(new THREE.TorusGeometry(r,t,10,48),m,x,y,z);
 const stitchLine=(a,b)=>{for(let i=0;i<30;i++){const t=i/30,u=(i+.5)/30;rod(a.map((v,k)=>v+(b[k]-v)*t),a.map((v,k)=>v+(b[k]-v)*u),.004,thread);}};
 const stitchRect=(w,h,z=.06)=>{for(const x of [-w/2,w/2])stitchLine([x,-h/2,z],[x,h/2,z]);for(const y of [-h/2,h/2])stitchLine([-w/2,y,z],[w/2,y,z]);};
 const disc=(r,m,x=0,y=0,z=0)=>{const o=add(new THREE.CylinderGeometry(r,r,.018,48),m,x,y,z);o.rotation.x=Math.PI/2;return o;};
 const textPanel=(lines,colors,background=null)=>{const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);if(background){ctx.fillStyle=background;ctx.fillRect(0,0,c.width,c.height);}ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=lines.length===1?'bold 300px Georgia':'bold 100px Arial';lines.forEach((line,i)=>{ctx.fillStyle=colors[i%colors.length];ctx.fillText(line,512,(i+.5)*512/lines.length,980);});const texture=new THREE.CanvasTexture(c);add(new THREE.PlaneGeometry(2,1),new THREE.MeshStandardMaterial({map:texture,transparent:!background,alphaTest:.1,side:THREE.DoubleSide,roughness:.45}));};
 const cloud=(x,y,z,s=1)=>{for(const [dx,dy,r]of [[-.4,-.03,.23],[-.18,.1,.3],[.14,.15,.34],[.4,0,.24]])ellipsoid(x+dx*s,y+dy*s,z,r*s,r*.75*s,r*.5*s,white);};
 const skyTexture=()=>{const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d');ctx.fillStyle='#338ac8';ctx.fillRect(0,0,512,512);for(let i=0;i<7;i++){const x=(i*173)%512,y=50+(i*93)%420;ctx.fillStyle='#f7f3e9';for(let j=0;j<4;j++){ctx.beginPath();ctx.ellipse(x+(j-1.5)*24,y-15*Math.sin(j),30,20,0,0,Math.PI*2);ctx.fill();}}return new THREE.CanvasTexture(c);};
 if(key==='leather-panels'||key==='raised-panels'){for(let i=0;i<3;i++){box(.56,1.4,.07,leather,(i-1)*.6,0,0);box(.44,1.22,.055,raised,(i-1)*.6,0,.06);}stitchRect(1.74,1.48,.035);}
 else if(key==='stitching'){box(1.6,.75,.04,leather);for(const y of [-.25,0,.25])stitchLine([-.7,y,.03],[.7,y,.03]);}
 else if(key==='vertical-strap'){box(.42,1.8,.07,leather);stitchRect(.34,1.7,.045);for(let i=0;i<5;i++)disc(.025,dark,0,-.55+i*.2,.047);ring(.19,.025,gold,0,.65,.06).scale.set(1,1.2,1);}
 else if(key==='horizontal-straps'){for(const y of [-.4,.4]){box(1.8,.28,.06,leather,0,y,0);for(const dy of [-.09,.09])stitchLine([-.84,y+dy,.04],[.84,y+dy,.04]);ring(.12,.02,silver,.5,y,.05).scale.set(1.2,1,1);}}
 else if(key==='strap-holes'){const shape=new THREE.Shape();shape.moveTo(-.3,-.85);shape.lineTo(.3,-.85);shape.lineTo(.3,.85);shape.lineTo(-.3,.85);shape.closePath();for(let i=0;i<7;i++){const hole=new THREE.Path();hole.absarc(0,-.6+i*.2,.04,0,Math.PI*2,true);shape.holes.push(hole);}add(new THREE.ExtrudeGeometry(shape,{depth:.045,bevelEnabled:false}),leather);stitchRect(.5,1.6,.052);}
 else if(key==='rivets'){for(let i=0;i<9;i++){const x=(i%3-1)*.4,y=(Math.floor(i/3)-1)*.4;disc(.11,i%2?gold:silver,x,y);ring(.08,.01,dark,x,y,.03);}}
 else if(key==='logo-backing'){box(1.4,1.4,.1,leather);box(1.15,1.15,.05,raised,0,0,.07);stitchRect(1.3,1.3,.06);}
 else if(key==='rl-lettering')textPanel(['RL'],['#c9cdd0']);
 else if(key==='panel-edges'){box(1.5,1.3,.06,leather);stitchRect(1.4,1.2,.04);stitchRect(1.32,1.12,.043);}
 else if(['large-discs','gold-discs','silver-discs','dark-discs','reflective-finishes'].includes(key)){const materials=key==='gold-discs'?[gold]:key==='dark-discs'?[dark]:key==='reflective-finishes'?[gold,silver,dark]:[silver];for(let i=0;i<6;i++){const x=(i%3-1)*.5,y=(Math.floor(i/3)-.5)*.55;const o=disc(.23,materials[i%materials.length],x,y,(i%2)*.04);o.rotation.y=(i%3-1)*.12;}}
 else if(key==='disc-perforations'){const shape=new THREE.Shape();shape.absarc(0,0,.75,0,Math.PI*2,false);for(let i=0;i<18;i++){const a=i*Math.PI/9,hole=new THREE.Path();hole.absarc(.58*Math.cos(a),.58*Math.sin(a),.055,0,Math.PI*2,true);shape.holes.push(hole);}add(new THREE.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:false}),silver);}
 else if(key==='disc-cutouts'){for(let i=0;i<3;i++){const x=(i-1)*.6;add(new THREE.RingGeometry(.18,.3,48,1,.35,Math.PI*1.55),i%2?gold:silver,x,0,0);}}
 else if(key==='interlocking'){for(let row=0;row<3;row++)for(let col=0;col<4;col++){const x=(col-1.5)*.37,y=(row-1)*.37;disc(.175,(col+row)%2?gold:silver,x,y);for(const [dx,dy]of [[.18,0],[0,.18]])ring(.035,.009,dark,x+dx,y+dy,.03);}}
 else if(key==='sky-covering'||key==='sky-graphics'){const m=new THREE.MeshStandardMaterial({map:skyTexture(),roughness:.7,side:THREE.DoubleSide});box(1.8,1.4,.03,m);if(key==='sky-graphics')for(const x of [-.6,0,.6])box(.025,1.4,.03,silver,x,0,.03);}
 else if(key==='clouds'){cloud(-.45,-.1,0,.8);cloud(.4,.25,0,.85);}
 else if(key==='horse'){ellipsoid(-.1,.12,0,.5,.24,.19,black);ellipsoid(.34,.4,0,.15,.33,.14,black).rotation.z=.4;ellipsoid(.5,.6,0,.22,.12,.12,black);for(const z of [-.11,.11]){curve([[-.38,0,z],[-.65,-.2,z],[-.9,-.13,z]],.045,black);curve([[.2,0,z],[.48,-.18,z],[.67,-.46,z]],.04,black);}curve([[-.5,.18,0],[-.85,.3,0],[-1,.05,0]],.05,black);for(const x of [.37,.48])add(new THREE.ConeGeometry(.05,.19,10),black,x,.8,0);}
 else if(key==='banana'){const path=new THREE.CatmullRomCurve3([new THREE.Vector3(-.85,.38,0),new THREE.Vector3(-.5,-.15,0),new THREE.Vector3(0,-.33,0),new THREE.Vector3(.55,-.12,0),new THREE.Vector3(.85,.4,0)]);const geo=new THREE.TubeGeometry(path,64,.15,12,false),pos=geo.attributes.position;for(let i=0;i<=64;i++){const centre=path.getPointAt(i/64),factor=.2+.8*Math.sin(Math.PI*i/64)**.5;for(let j=0;j<=12;j++){const index=i*13+j,v=new THREE.Vector3().fromBufferAttribute(pos,index).sub(centre).multiplyScalar(factor).add(centre);pos.setXYZ(index,v.x,v.y,v.z);}}geo.computeVertexNormals();add(geo,yellow);rod([.83,.38,0],[.89,.53,0],.035,leather);}
 else if(key==='pipe'){add(new THREE.CylinderGeometry(.25,.18,.47,32,1,true),orange,-.47,.1,0);const rim=ring(.25,.045,leather,-.47,.34,0);rim.rotation.x=Math.PI/2;const interior=add(new THREE.CircleGeometry(.19,32),dark,-.47,.325,0);interior.rotation.x=-Math.PI/2;curve([[-.3,-.08,0],[.16,-.14,0],[.55,.04,0],[.83,.08,0]],.06,black);}
 else if(key==='baguette'){const loaf=ellipsoid(0,0,0,1,.19,.2,mat(0xc58a42));loaf.rotation.z=.2;for(let i=0;i<6;i++){const x=(i-2.5)*.25;curve([[x-.07,-.03+x*.2,.18],[x,.04+x*.2,.2],[x+.07,.11+x*.2,.17]],.012,thread);}}
 else if(key==='tiger'){ellipsoid(0,0,0,.55,.53,.3,orange);for(const sign of [-1,1]){ellipsoid(sign*.4,.42,0,.17,.17,.1,orange);ellipsoid(sign*.4,.42,.08,.09,.1,.04,black);ellipsoid(sign*.18,-.17,.28,.21,.16,.12,white);ellipsoid(sign*.2,.13,.29,.07,.035,.025,greenMaterial());for(let i=0;i<3;i++)curve([[sign*.5,.25-i*.2,.15],[sign*.34,.2-i*.2,.27],[sign*.28,.1-i*.2,.29]],.022,black);}ellipsoid(0,-.09,.4,.09,.055,.04,black);for(let i=0;i<3;i++)curve([[-.16,.41-i*.07,.23],[0,.3-i*.07,.31],[.12,.38-i*.07,.25]],.018,black);}
 else if(key==='surreal-objects'){ellipsoid(-.48,.2,0,.32,.19,.12,white);ellipsoid(-.48,.2,.1,.1,.13,.04,blue);ellipsoid(-.48,.2,.14,.04,.07,.015,black);box(.4,.4,.4,pink,.45,.2,0);for(const [x,y]of [[.35,.3],[.55,.1],[.45,.2]])disc(.025,black,x,y,.21);ellipsoid(0,-.4,0,.45,.09,.13,pink);ellipsoid(0,-.5,.02,.42,.08,.12,pink);}
 else if(key==='signage')textPanel(['TOILETCHAMP','LONGPAPER'],['#e93d71','#e2c431'],'#f5edda');
 else if(key==='window-patterns'){for(const x of [-.7,.7])box(.18,1.4,.04,pink,x,0,0);for(const y of [-.7,.7])box(1.6,.18,.04,yellow,0,y,0);for(let i=0;i<9;i++){const p=-.6+i*.15;disc(.04,blue,p,.7,.03);disc(.04,blue,p,-.7,.03);}for(let i=0;i<8;i++){const p=-.5+i*.15;disc(.04,black,-.7,p,.03);disc(.04,black,.7,p,.03);}}
 else if(key==='backdrops'){for(let i=0;i<3;i++)box(.75,1.4,.035,[pink,yellow,blue][i],(i-1)*.6,(i-1)*.1,(i-1)*.12);}
 return group;
 function greenMaterial(){return mat(0x899c55);}
}
