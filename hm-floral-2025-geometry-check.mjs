import assert from 'node:assert/strict';import * as THREE from 'three';
import {floral2025Keys,floral2025Model} from './hm-floral-2025-models.js';
for(const key of floral2025Keys){const model=floral2025Model(key),bounds=new THREE.Box3().setFromObject(model);assert.ok(!bounds.isEmpty(),key);assert.ok([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite),key);model.traverse(o=>{if(o.geometry){const p=o.geometry.attributes.position;assert.ok([...p.array].every(Number.isFinite),key);if(o.geometry.index)assert.ok([...o.geometry.index.array].every(i=>i<p.count),key);}});}
for(const key of ['floral-covering','perforated-background'])assert.equal(floral2025Model(key).children[0].geometry.parameters.shapes.holes.length,4);
assert.equal(floral2025Model('hm-lettering').children[0].material.color.getHex(),0xfaf8f4);
assert.ok(floral2025Model('perimeter').children.some(o=>o.material?.emissiveIntensity===1.4));
console.log('Passed seven floral component geometries, finite indices/positions, four open oval windows, white lettering and luminous canopy strips.');
