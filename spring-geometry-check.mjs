import assert from 'node:assert/strict';
import * as THREE from 'three';
import {springModel} from './vancleef-spring-models.js';
for(const key of ['stems','branches','large-petals','small-petals','centres','stamens','buds','leaves']){
 const model=springModel(key),bounds=new THREE.Box3().setFromObject(model);assert.ok(!bounds.isEmpty(),key);assert.ok([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite),key);
 model.traverse(o=>{if(o.geometry){const p=o.geometry.attributes.position;assert.ok([...p.array].every(Number.isFinite),key);if(o.geometry.index)assert.ok([...o.geometry.index.array].every(i=>i<p.count),key);}});
}
assert.equal(springModel('large-petals').children.filter(o=>o.userData.component==='scalloped-petal').length,5);
assert.equal(springModel('small-petals').children.filter(o=>o.userData.component==='scalloped-petal').length,25);
assert.equal(springModel('centres').children.filter(o=>o.userData.component==='spotted-centre').length,2);
assert.equal(springModel('leaves').children.filter(o=>o.userData.component==='folded-leaf').length,3);
console.log('Passed eight spring geometries, valid indices, five-petal flowers, blossom clusters, spotted centres and folded leaves.');
