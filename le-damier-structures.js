import * as THREE from 'three';

// Isolated visual approximation of the photographed checkerboard facade panels.
export function leDamierPanels(){
 const group=new THREE.Group();group.name='Le Damier embossed gold and reflective checkerboard panels';
 const canvas=document.createElement('canvas');canvas.width=canvas.height=768;const ctx=canvas.getContext('2d');ctx.fillStyle='#eed49a';ctx.fillRect(0,0,768,768);
 const relief=document.createElement('canvas');relief.width=relief.height=768;const bump=relief.getContext('2d');bump.fillStyle='#888';bump.fillRect(0,0,768,768);
 for(let row=0;row<9;row++)for(let col=0;col<9;col++){
  const x=(col+.5)*768/9,y=(row+.5)*768/9;
  ctx.beginPath();ctx.ellipse(x,y,19,8,0,0,Math.PI*2);ctx.strokeStyle='#9c7736';ctx.lineWidth=3;ctx.stroke();
  ctx.beginPath();ctx.ellipse(x,y+2,17,6,0,0,Math.PI*2);ctx.strokeStyle='#fff0c5';ctx.lineWidth=2;ctx.stroke();
  bump.beginPath();bump.ellipse(x,y,19,8,0,0,Math.PI*2);bump.strokeStyle='#ddd';bump.lineWidth=4;bump.stroke();
 }
 const texture=new THREE.CanvasTexture(canvas),bumpMap=new THREE.CanvasTexture(relief);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=bumpMap.anisotropy=4;
 const gold=new THREE.MeshStandardMaterial({map:texture,bumpMap,bumpScale:.012,metalness:.3,roughness:.4});
 const silver=new THREE.MeshStandardMaterial({color:0xd6d4c5,metalness:.38,roughness:.22});
 for(let row=0;row<3;row++)for(let col=0;col<3;col++){
  const isGold=(row+col)%2===0,panel=new THREE.Mesh(new THREE.BoxGeometry(.59,.59,.025),isGold?gold:silver);
  const x=(col-1)*.61,y=(row-1)*.61;
  // A shallow bow evokes the installation's curved checkerboard surface.
  panel.position.set(x,y,-.045*x*x-(isGold?0:.035));panel.rotation.y=.09*x;
  panel.name=isGold?'Gold panel with repeated oval relief':'Reflective silver panel';panel.userData.part=isGold?'embossed-gold-panel':'reflective-panel';group.add(panel);
 }
 group.rotation.z=Math.PI/4;return group;
}
