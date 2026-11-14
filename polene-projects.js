import * as THREE from 'three';
export const poleneDefinitions=[
 {name:'Sculptural flower petals',materialLabel:'Thermoformed Kairlin (bio-based composite)',componentModel:'polene-kairlin-petals',type:'Bio-based composite',properties:'Thermoformed curved petals · bio-based composite'},
 {name:'Leather-effect petal surfaces',materialLabel:'Mineral mass tinted plaster coating, imitating leather texture',componentModel:'polene-plaster-petals',type:'Mineral coating',properties:'Mineral plaster coating · tinted mass · leather-like surface texture'}
].map(item=>({...item,project:'Blossoming Lether',year:2025}));
// Visual reconstructions of the folded petal reference boards, not measured scans.
// Each petal is a thin closed shell: a broad rounded blade with a cupped,
// asymmetrically rolled edge and a narrow attachment at the flower's centre.
function petalGeometry({length,width,cup,roll,twist}){
 const rows=48,columns=32,points=[],indices=[];
 const layerSize=(rows+1)*(columns+1);
 for(let side=0;side<2;side++)for(let i=0;i<=rows;i++){
  const t=i/rows;
  const silhouette=.004+Math.pow(Math.sin(Math.PI*t),.68)*( .72+.28*t);
  for(let j=0;j<=columns;j++){
   const v=j/columns*2-1;
   const x=v*width*silhouette+twist*t*t;
   const y=length*t-.09*v*v*Math.sin(Math.PI*t);
   const z=cup*v*v*Math.sin(Math.PI*t*.88)+roll*v*Math.sin(Math.PI*t)+.12*t*t;
   points.push(x,y,z+(side?-.006:.006));
  }
 }
 for(let side=0;side<2;side++)for(let i=0;i<rows;i++)for(let j=0;j<columns;j++){
  const a=side*layerSize+i*(columns+1)+j,b=a+columns+1;
  if(side)indices.push(a,a+1,b,b,a+1,b+1);
  else indices.push(a,b,a+1,b,b+1,a+1);
 }
 const stitch=(a,b)=>indices.push(a,b,a+layerSize,b,b+layerSize,a+layerSize);
 for(let i=0;i<rows;i++){stitch(i*(columns+1),(i+1)*(columns+1));stitch((i+1)*(columns+1)+columns,i*(columns+1)+columns);}
 for(let j=0;j<columns;j++){stitch(j+1,j);stitch(rows*(columns+1)+j,rows*(columns+1)+j+1);}
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
 geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
function cord(group,points,radius,material){
 const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
 group.add(new THREE.Mesh(new THREE.TubeGeometry(curve,40,radius,8,false),material));
}
export function poleneModel(key){
 const group=new THREE.Group(),coated=key==='polene-plaster-petals';
 const palette=coated?[0xe5e2d8,0xd1b99f,0xa58b7d,0xf0e7d9,0xe6d2a2,0xc6b2a0]:[0xe6d9ca,0xece2d5,0xd8c9b9,0xe4d6c5,0xf0e5d8,0xdacbbd];
 let bumpMap;
 if(coated){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
  const ctx=canvas.getContext('2d'),pixels=ctx.createImageData(128,128);let seed=71;
  for(let i=0;i<pixels.data.length;i+=4){seed=seed*16807%2147483647;const value=117+seed%22;pixels.data.set([value,value,value,255],i);}
  ctx.putImageData(pixels,0,0);bumpMap=new THREE.CanvasTexture(canvas);
  bumpMap.wrapS=bumpMap.wrapT=THREE.RepeatWrapping;bumpMap.repeat.set(3,3);
 }
 // Deliberately uneven sizes, tilts and depths, following the modular A–E blades.
 const blades=[
  [1.19,.43,.42,-.14,-.12,.15,-.32,.12],
  [1.04,.37,.34,.13,.09,-.12,.55,-1.12],
  [1.10,.46,.32,-.16,-.07,.25,-.25,-2.13],
  [.93,.36,.25,.10,.08,-.28,.15,-3.15],
  [1.02,.41,.39,-.12,.05,.18,-.35,-4.12],
  [.78,.29,.24,.10,-.04,-.10,.28,-5.22],
  [.62,.26,.22,-.08,.03,.35,-.22,-.62]
 ];
 blades.forEach(([length,width,cup,roll,twist,rx,ry,rz],n)=>{
  const material=new THREE.MeshStandardMaterial({color:palette[n%palette.length],roughness:coated?.93:.82,metalness:0,side:THREE.DoubleSide,...(coated?{bumpMap,bumpScale:.004}:{})});
  const leaf=new THREE.Mesh(petalGeometry({length,width,cup,roll,twist}),material);
  leaf.rotation.set(rx,ry,rz+(coated?.18:0));
  leaf.position.set((n%3-1)*.035,.18,(n===6?.24:n*.017));group.add(leaf);
 });
 const stem=new THREE.MeshStandardMaterial({color:0x98673e,metalness:.48,roughness:.46});
 if(coated){
  // Paired slender bronze stems visible on the assembled reference flower.
  for(let n=0;n<2;n++)cord(group,[[-.46+n*.035,-1.52,-.12],[-.29+n*.035,-.72,-.10],[-.04+n*.035,.19,-.08]],.012,stem);
 }else{
  // Fine hanging strips gathered at the centre, with staggered free ends.
  const fringe=new THREE.MeshStandardMaterial({color:0xd6c8b7,roughness:.86});
  for(let n=0;n<23;n++){
   const spread=(n-11)/11,end=-.59-.34*(1-Math.abs(spread))+.035*Math.sin(n*2.1);
   cord(group,[[spread*.035,.22,.34],[spread*.12,.02,.40],[spread*.15,-.33,.39],[spread*.16,end,.35]],.006,fringe);
  }
  for(let n=0;n<3;n++)cord(group,[[-.065,.20+n*.018,.34],[0,.185+n*.018,.39],[.065,.20+n*.018,.34]],.009,fringe);
 }
 group.rotation.y=-.22;
 return group;
}
