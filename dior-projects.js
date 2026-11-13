import * as THREE from 'three';
const part=(name,materialLabel,key)=>({name,materialLabel,componentModel:`dior-${key}`,type:'Lighting',year:2026,project:'Dior-Champs=Elyssess',properties:'Illuminated illustrative component · clean reusable fixture'});
export const diorDefinitions=[
 part('Illuminated window outlines','LED light strips or flexible LED neon','window-outlines'),
 part('Illuminated horizontal architectural lines','warm-white LED strips or linear LED profiles','horizontal-lines'),
 part('Decorative circular ornaments above windows','flexible LED neon or LED light strips','ornaments'),
 part('Illuminated DIOR lettering','acrylic or metal channel letters with integrated LED lighting','lettering'),
 part('Light projection around DIOR logo','LED backlighting or architectural projection lighting','projection')
];
export function diorModel(fullKey){const key=fullKey.replace('dior-',''),group=new THREE.Group();
 const glow=new THREE.MeshStandardMaterial({color:0xfff2cc,emissive:0xffce7e,emissiveIntensity:1.6,roughness:.25});
 const metal=new THREE.MeshStandardMaterial({color:0x928a7d,metalness:.7,roughness:.35});
 const add=(geometry,material,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const line=(a,b,r=.012,material=glow)=>{const start=new THREE.Vector3(...a),delta=new THREE.Vector3(...b).sub(start);const mesh=add(new THREE.CylinderGeometry(r,r,delta.length(),12),material);mesh.position.copy(start).addScaledVector(delta,.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());};
 const frame=(x,y,w,h,z=0)=>{for(const dx of [-w/2,w/2])line([x+dx,y-h/2,z],[x+dx,y+h/2,z]);for(const dy of [-h/2,h/2])line([x-w/2,y+dy,z],[x+w/2,y+dy,z]);};
 const lettering=(width=1.8,z=0)=>{const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=320;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,1024,320);ctx.font='250px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#fff0c9';ctx.fillText('DIOR',512,175,970);const texture=new THREE.CanvasTexture(canvas);const material=new THREE.MeshStandardMaterial({map:texture,emissiveMap:texture,emissive:0xffd79a,emissiveIntensity:1.1,transparent:true,alphaTest:.08,side:THREE.DoubleSide});add(new THREE.PlaneGeometry(width,width*320/1024),material,0,0,z);};
 if(key==='window-outlines'){for(const x of [-.58,.58]){frame(x,0,.77,1.35);frame(x,0,.85,1.43,-.035);line([x,-.67,0],[x,.67,0],.007,metal);}}
 else if(key==='horizontal-lines'){for(let i=0;i<5;i++){const y=(i-2)*.3;add(new THREE.BoxGeometry(1.9,.045,.05),metal,0,y,0);add(new THREE.BoxGeometry(1.86,.025,.018),glow,0,y,.035);}}
 else if(key==='ornaments'){for(const x of [-.62,0,.62]){add(new THREE.TorusGeometry(.23,.012,12,64),glow,x,.2,0);add(new THREE.TorusGeometry(.17,.009,12,64),glow,x,.2,0);frame(x,-.38,.5,.43);line([x,-.16,0],[x,-.03,0],.008);}}
 else if(key==='lettering'){lettering();const material=new THREE.MeshStandardMaterial({color:0xeee1bd,metalness:.2,roughness:.3,transparent:true,opacity:.3});add(new THREE.BoxGeometry(1.94,.62,.07),material,0,0,-.06);}
 else if(key==='projection'){const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');const gradient=ctx.createRadialGradient(256,256,24,256,256,255);gradient.addColorStop(0,'rgba(255,225,160,.9)');gradient.addColorStop(.4,'rgba(255,201,100,.38)');gradient.addColorStop(1,'rgba(255,190,90,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,512,512);const tex=new THREE.CanvasTexture(canvas);const halo=new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide});add(new THREE.PlaneGeometry(2.5,1.8),halo,0,0,-.06);lettering(1.5,.02);for(let i=0;i<12;i++){const angle=i*Math.PI/6;line([Math.cos(angle)*.65,Math.sin(angle)*.36,-.02],[Math.cos(angle)*.95,Math.sin(angle)*.63,-.02],.006);}for(const x of [-.7,.7]){add(new THREE.BoxGeometry(.18,.1,.12),metal,x,-.78,0);add(new THREE.CircleGeometry(.045,24),glow,x,-.74,.065);}}
 return group;
}
