import * as THREE from 'three';
export const poleneDefinitions=[
 {name:'Sculptural flower petals',materialLabel:'Thermoformed Kairlin (bio-based composite)',componentModel:'polene-kairlin-petals',type:'Bio-based composite',properties:'Thermoformed curved petals · bio-based composite'},
 {name:'Leather-effect petal surfaces',materialLabel:'Mineral mass tinted plaster coating, imitating leather texture',componentModel:'polene-plaster-petals',type:'Mineral coating',properties:'Mineral plaster coating · tinted mass · leather-like surface texture'}
].map(item=>({...item,project:'Blossoming Lether',year:2025}));
export function poleneModel(key){const group=new THREE.Group(),coated=key==='polene-plaster-petals';
 const material=new THREE.MeshStandardMaterial({color:coated?0xb58159:0xd8c19a,roughness:coated?.94:.8,side:THREE.DoubleSide});
 if(coated){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#ad7a54';ctx.fillRect(0,0,128,128);let seed=71;for(let i=0;i<7000;i++){seed=seed*16807%2147483647;const x=seed%128;seed=seed*16807%2147483647;const y=seed%128;ctx.fillStyle=i%2?'#d2a87e70':'#593d2a50';ctx.fillRect(x,y,1,2);}material.map=new THREE.CanvasTexture(c);material.bumpMap=material.map;material.bumpScale=.022;}
 const count=coated?3:6;
 for(let n=0;n<count;n++){const geometry=new THREE.PlaneGeometry(1,1,32,40),pos=geometry.attributes.position;for(let i=0;i<pos.count;i++){const u=pos.getX(i)*2,t=pos.getY(i)+.5;const width=.03+.42*Math.sin(Math.PI*t)**.75;pos.setXYZ(i,u*width,t*1.25,.16*u*u+.32*t*t+.045*Math.sin(t*5));}geometry.computeVertexNormals();const mesh=new THREE.Mesh(geometry,material);if(coated){mesh.position.set((n-1)*.55,-.65,(n%2)*.14);mesh.rotation.z=(n-1)*-.2;}else{mesh.rotation.z=n*Math.PI/3;mesh.rotation.x=.2;mesh.position.z=(n%2)*.035;}group.add(mesh);}
 return group;
}
