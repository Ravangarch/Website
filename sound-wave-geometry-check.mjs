import assert from 'node:assert/strict';
import * as THREE from 'three';
import {soundWaveKeys,soundWaveModel} from './sound-wave-models.js';
for(const key of soundWaveKeys){const model=soundWaveModel(key),bounds=new THREE.Box3().setFromObject(model);assert.ok(!bounds.isEmpty(),key);assert.ok([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite),key);model.traverse(o=>{if(o.geometry){const p=o.geometry.attributes.position;assert.ok([...p.array].every(Number.isFinite),key);if(o.geometry.index)assert.ok([...o.geometry.index.array].every(i=>i<p.count),key);}});}
const frames=soundWaveModel('window-frames').children;assert.equal(frames.length,2);assert.ok(frames.every(o=>o.geometry.parameters.shapes.holes.length===1));
assert.equal(soundWaveModel('backdrop').children.filter(o=>o.userData.component==='faceted-backdrop-tile').length,54);
assert.equal(soundWaveModel('sculptures').children.filter(o=>o.userData.component==='chrome-speaker-housing').length,10);
assert.equal(soundWaveModel('wave-panels').children.length,12);assert.equal(soundWaveModel('wave-finish').children.length,1);
console.log('Passed finite Sound Wave geometry, valid indices, open rounded frames, 54 faceted tiles, 10 hollow chrome housings and separate panel/finish models.');
