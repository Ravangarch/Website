import {createServer} from 'vite';
import {chromium} from '@playwright/test';
import {mkdir,writeFile,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {thumbnailKey} from './thumbnail-key.js';
// Render seeded models once during asset preparation, never during normal login.
const server=await createServer({plugins:[{name:'thumbnail-build-exports',enforce:'pre',transform(code,id){if(id.endsWith('/src.js'))return code+'\nexport {sceneFor,renderer,ensureRenderer,data,projects,lastChance};';}}],server:{host:'127.0.0.1',port:5243}});
await server.listen();const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1400,height:1000},deviceScaleFactor:1});await page.route('https://commons.wikimedia.org/**',r=>r.abort());await page.goto('http://127.0.0.1:5243');
 const records=await page.evaluate(async()=>{const m=await import('/src.js');return [...m.data,...m.projects,...m.lastChance];});
 const unique=new Map(records.map(record=>[thumbnailKey(record),record]));const entries={};await mkdir('public/model-thumbnails',{recursive:true});
 for(const [key,record]of unique){
  const result=await page.evaluate(async record=>{const m=await import('/src.js');m.ensureRenderer();const s=m.sceneFor(record);m.renderer.setPixelRatio(1);m.renderer.setSize(420,320);m.renderer.render(s.scene,s.camera);const c=document.createElement('canvas');c.width=420;c.height=320;c.getContext('2d').drawImage(m.renderer.domElement,0,0);const result=c.toDataURL('image/webp',.84);const materials=new Set(),textures=new Set();s.scene.traverse(o=>{o.geometry?.dispose();for(const material of [].concat(o.material||[]))materials.add(material);});for(const material of materials){for(const value of Object.values(material))if(value?.isTexture)textures.add(value);material.dispose();}for(const texture of textures)texture.dispose();m.renderer.renderLists.dispose();return result;},record);
  const bytes=Buffer.from(result.split(',')[1],'base64');const filename=createHash('sha256').update(key).update(bytes).digest('hex').slice(0,20)+'.webp';await writeFile('public/model-thumbnails/'+filename,bytes);entries[key]=filename;
  if(Object.keys(entries).length%20===0)console.log('Prepared '+Object.keys(entries).length+' previews');
 }
 const {readdir}=await import('node:fs/promises');const keep=new Set(Object.values(entries));for(const file of await readdir('public/model-thumbnails'))if(!keep.has(file))await rm('public/model-thumbnails/'+file);
 await writeFile('thumbnail-manifest.json',JSON.stringify(entries,null,2)+'\n');console.log(`Saved ${unique.size} unique previews for ${records.length} seeded records.`);
}finally{await browser.close();await server.close();}
