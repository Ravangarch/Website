import assert from 'node:assert/strict';
import * as THREE from 'three';
import {winterModel} from './vancleef-winter-models.js';
const keys=['snowdrifts','snow-finish','houses','roofs','ornaments','snowflakes','spheres','trees'];
for(const key of keys){const model=winterModel(key),bounds=new THREE.Box3().setFromObject(model);assert.ok(!bounds.isEmpty(),key);assert.ok([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite),key);model.traverse(o=>{if(o.geometry){assert.ok([...o.geometry.attributes.position.array].every(Number.isFinite),key);const idx=o.geometry.index; if(idx)assert.ok([...idx.array].every(i=>i<o.geometry.attributes.position.count),key);}});}
const houses=winterModel('houses');assert.equal(houses.children.filter(m=>m.material.vertexColors).length,3);assert.ok(houses.children.every(m=>m.geometry.type==='ExtrudeGeometry'||m.geometry.type==='CylinderGeometry'||m.geometry.type==='BoxGeometry'));
const rings=winterModel('ornaments');assert.equal(rings.children.filter(m=>m.geometry.type==='TorusGeometry'&&m.material.emissiveIntensity===.65).length,3);
assert.equal(winterModel('spheres').children.length,3);
assert.ok(winterModel('snow-finish').children.length<winterModel('snowdrifts').children.length);
console.log('Passed finite geometry and indices for eight winter components, blue house gradients, warm rings, sphere count and separate coating geometry.');
