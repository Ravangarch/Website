import * as THREE from 'three';

// Photo-informed reconstructions of the painted installation components.
export function springModel(key) {
 const group = new THREE.Group();
 const paint = color => new THREE.MeshStandardMaterial({color, roughness:.58, side:THREE.DoubleSide});
 const teal=paint(0x289eaa), white=paint(0xfff9fb), pink=paint(0xf499c4), red=paint(0xf52354), yellow=paint(0xffdf45);
 const add=(geometry,material,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const ball=(r,material,x,y,z=0)=>add(new THREE.SphereGeometry(r,24,16),material,x,y,z);
 const tube=(points,r=.013,material=teal)=>add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),32,r,8,false),material);
 const petal=(x,y,z,angle,size)=>{
  const shape=new THREE.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-.13,.14,-.42,.46,-.30,.77);shape.bezierCurveTo(-.25,.98,-.10,1.04,0,.96);shape.bezierCurveTo(.12,1.06,.31,.98,.33,.79);shape.bezierCurveTo(.43,.46,.13,.13,0,0);
  const geometry=new THREE.ShapeGeometry(shape,28),positions=geometry.attributes.position,colors=[];
  for(let i=0;i<positions.count;i++){const px=positions.getX(i),py=positions.getY(i);positions.setZ(i,.075*py*py+.035*Math.abs(px));const c=new THREE.Color(0xf67caf).lerp(white.color,THREE.MathUtils.smoothstep(py,.12,.91));colors.push(c.r,c.g,c.b);}
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();
  const material=white.clone();material.vertexColors=true;material.color.set(0xffffff);const mesh=add(geometry,material,x,y,z);mesh.rotation.z=angle;mesh.scale.setScalar(size);mesh.userData.component='scalloped-petal';
  for(let i=-2;i<=2;i++){const vein=tube([[0,.08,.004],[i*.035,.32,.025],[i*.068,.68,.06]],.002,white);vein.position.set(x,y,z+.006);vein.rotation.z=angle;vein.scale.setScalar(size);}
 };
 const centre=(x,y,z,r=.16,green=false)=>{
  const dome=ball(r,green?paint(0x8eae40):red,x,y,z);dome.scale.z=.48;dome.userData.component='spotted-centre';
  for(let i=0;i<19;i++){const radius=r*.82*Math.sqrt(i/19),a=i*2.39996;const dot=ball(r*.105,yellow,x+Math.cos(a)*radius,y+Math.sin(a)*radius,z+Math.sqrt(r*r-radius*radius)*.49);dot.scale.z=.4;}
 };
 const stamens=(x,y,z,size=1)=>{
  for(let i=0;i<34;i++){const a=i*Math.PI*2/34,r=(i%3===0?.48:.37)*size,dx=Math.cos(a),dy=Math.sin(a);tube([[x+dx*.10*size,y+dy*.10*size,z],[x+dx*r*.7,y+dy*r*.7,z+.07*size],[x+dx*r,y+dy*r,z+.035*size]],.005*size,red);const tip=ball(.018*size,yellow,x+dx*r,y+dy*r,z+.035*size);tip.scale.set(.8,1.4,.7);tip.rotation.z=a-Math.PI/2;}
 };
 const flower=(x,y,z,size)=>{for(let i=0;i<5;i++)petal(x,y,z,i*Math.PI*2/5+.12,size);stamens(x,y,z+.06,size);centre(x,y,z+.12,.145*size);};
 if(key==='stems'){
  for(let i=0;i<5;i++){const x=(i-2)*.22,top=.67+(i%3)*.18;tube([[x,-1,0],[x+.02,-.3,.005],[x-.035,.38,0],[x+.04,top,0]],.015);ball(.026,red,x+.04,top,0);}
 }else if(key==='branches'){
  for(let i=0;i<3;i++){const x=(i-1)*.58;tube([[x,-.95,0],[x,.1,0],[x+.04,.92,0]]);for(let j=0;j<3;j++){const sign=j%2?-1:1,y=-.55+j*.39;const end=[x+sign*.29,y+.3,0];tube([[x,y,0],[x+sign*.09,y+.23,0],end],.011);ball(.026,red,...end);}}
 }else if(key==='large-petals')flower(0,0,0,.96);
 else if(key==='small-petals'){
  for(const [x,y,s]of [[0,0,.43],[-.56,.34,.3],[.55,.38,.33],[-.47,-.43,.29],[.5,-.43,.30]])flower(x,y,.03,s);
 }else if(key==='centres'){
  centre(-.38,0,0,.27);centre(.38,0,0,.25,true);
 }else if(key==='stamens')stamens(0,0,0,1.7);
 else if(key==='buds'){
  for(let i=0;i<4;i++){const x=(i-1.5)*.43,y=i%2?.36:.1;tube([[x,-.8,0],[x+.03,-.1,0],[x,y,0]],.013);const bud=ball(.105,pink,x,y+.17,0);bud.scale.set(.8,1.65,.8);bud.rotation.z=(i-1.5)*-.15;}
  tube([[.62,-.7,-.04],[.7,.3,-.04],[.9,.68,-.04]],.011);const bud=ball(.10,red,.9,.73,-.04);bud.scale.set(.8,1.1,.7);
 }else if(key==='leaves'){
  // Two planar halves meet at a raised centre fold, as in the window display.
  for(const [x,y,angle,size]of [[-.22,-.65,.75,1.35],[.05,-.65,.02,1.65],[.28,-.65,-.78,1.2]]){
   const positions=[],indices=[];
   for(let i=0;i<=20;i++){const t=i/20,w=.24*Math.sin(Math.PI*t);positions.push(-w,t,0,0,t,.09*Math.sin(Math.PI*t),w,t,0);if(i<20){const n=i*3;indices.push(n,n+3,n+1,n+3,n+4,n+1,n+1,n+4,n+2,n+4,n+5,n+2);}}
   const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();const leaf=add(geometry,teal,x,y,0);leaf.rotation.z=angle;leaf.scale.setScalar(size);leaf.userData.component='folded-leaf';
  }
 }
 return group;
}
