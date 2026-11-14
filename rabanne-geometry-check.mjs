import assert from 'node:assert/strict';
import * as THREE from 'three';
import {rabanneSequinModel} from './rabanne-sequin-models.js';
for(const [key,count,cols]of [['sequin-facade',672,28],['hanging-sequins',54,6]]){
 const model=rabanneSequinModel(key),bounds=new THREE.Box3().setFromObject(model);assert.ok(!bounds.isEmpty());assert.ok([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite));
 const discs=model.children.find(o=>o.userData.component==='circular-sequins');assert.equal(discs.count,count);assert.equal(discs.geometry.type,'CylinderGeometry');assert.ok(discs.material.envMap);assert.equal(model.children.find(o=>o.userData.component==='vertical-carriers').count,cols);assert.equal(model.children.find(o=>o.userData.component==='cut-sheet-tabs').count,count);
 const matrix=new THREE.Matrix4();for(let i=0;i<count;i++){discs.getMatrixAt(i,matrix);assert.ok(matrix.elements.every(Number.isFinite));}
}
console.log('Passed round sequin geometry, 672 façade discs, 54 sample discs, vertical carriers, cut-sheet tabs, reflection maps and finite instance transforms.');
