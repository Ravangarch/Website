import assert from 'node:assert/strict';import * as THREE from 'three';import {componentModel} from './brand-collections.js';
const model=componentModel('inset-frame');model.updateMatrixWorld(true);assert.equal(model.children.length,2);assert.ok(model.children.every(m=>m.material.side===THREE.FrontSide));
for(const [x,y]of [[.69,0],[-.69,0],[0,.90],[0,-.90],[.69,.89],[-.69,-.89]])for(const sign of [-1,1]){
 const ray=new THREE.Raycaster(new THREE.Vector3(x,y,sign),new THREE.Vector3(0,0,-sign));const hits=ray.intersectObject(model,true);assert.ok(hits.length,'Surface must remain closed');const nearest=hits[0].distance;assert.equal(new Set(hits.filter(h=>Math.abs(h.distance-nearest)<1e-6).map(h=>h.object.uuid)).size,1,'Visible surfaces must not share the same depth');
 if(sign<0)assert.ok(Math.abs(hits[0].point.z)<1e-6,'Rear surface must be the continuous panel');else assert.ok(Math.abs(hits[0].point.z-.17)<1e-6,'Front trim must sit above the panel');
}
assert.equal(new THREE.Raycaster(new THREE.Vector3(0,0,1),new THREE.Vector3(0,0,-1)).intersectObject(model,true).length,0,'Arch opening stays clear');
model.traverse(o=>{if(o.geometry)assert.ok([...o.geometry.attributes.position.array].every(Number.isFinite));});console.log('Passed closed frame geometry, clear arch, single front trim and no competing visible surfaces from either side or at the corners.');
