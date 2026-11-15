import assert from 'node:assert/strict';
export async function assertCardPreviews(page){
 const cards=page.locator('.card');assert.ok(await cards.count()>0,'Expected preview cards');
 const images=page.locator('.object-image .model-thumbnail');await images.evaluateAll(async list=>{for(const img of list)img.loading='eager';await Promise.all(list.map(img=>img.decode()));});
 assert.ok(await cards.evaluateAll(list=>list.every(card=>{const img=card.querySelector('.model-thumbnail');if(img)return img.complete&&img.naturalWidth>0;const c=card.querySelector('.object-image canvas');if(!c||c.width!==420)return false;return c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3&&v>0);})), 'Every card must have a loaded model preview');
}
