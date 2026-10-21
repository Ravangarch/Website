export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let database;
async function db(){if(database)return database;database=await new Promise((resolve,reject)=>{const request=indexedDB.open('athem-demo',1);request.onupgradeneeded=()=>request.result.createObjectStore('files');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});return database;}
export async function saveFile(key,file){const database=await db();await new Promise((resolve,reject)=>{const tx=database.transaction('files','readwrite');tx.objectStore('files').put(file,key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
export async function getFile(key){const database=await db();return new Promise((resolve,reject)=>{const request=database.transaction('files').objectStore('files').get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
export async function fileURL(key){const file=await getFile(key);if(!file)throw Error('This attachment is unavailable in this browser.');return URL.createObjectURL(file);}
