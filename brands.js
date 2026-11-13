import {escapeHTML as esc,fileURL} from './storage.js';
import nike from './assets/nike.svg?raw';
import dior from './assets/dior.svg?raw';
export const normalizeLogin=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const commons=name=>'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(name);
export const brandDefinitions=[
 {name:'Sotheby’s',file:"Sotheby's Logo.svg",seed:3},
 {name:'Nike',symbol:nike,seed:4},
 {name:'Pomellato',file:'Pomellato logo.svg',seed:5},
 {name:'Louis Vuitton',fallbackLines:['Louis','Vuitton'],file:'Louis Vuitton LV logo.png',seed:2},
 {name:'Cartier',file:'Cartier logo.svg',seed:7},
 {name:'Van Cleef & Arpels',fallbackLines:['Van Cleef &','Arpels'],file:'Van Cleef & Arpels logo.svg',seed:8},
 {name:'H&M',file:'H&M-Logo.svg',seed:1},
 {name:'Ralph Lauren',fallbackLines:['Ralph','Lauren'],file:'Ralph Lauren logo.svg',seed:9},
 {name:'Paco Rabanne',fallbackLines:['Paco','Rabanne'],file:'Paco Rabanne logo.svg',seed:10},
 {name:'Longchamp',file:'Longchamp logo.svg',seed:11},
 {name:'Guerlain',file:'Guerlain logo.svg',seed:0},
 {name:'Polène',file:'Polène logo.svg',seed:12},
 {name:'Dior',symbol:dior,seed:13}
].map(b=>({...b,login:normalizeLogin(b.name),logo:b.file?commons(b.file):null}));
const storedBrand=b=>({name:b.name,login:b.login,custom:true,...b.logoKey?{logoKey:b.logoKey}:{},...b.storage?{storage:b.storage}:{}});
let customBrands=[];let settings={};try{const saved=JSON.parse(localStorage.getItem('athem-custom-brands')||'[]');if(Array.isArray(saved))customBrands=saved.filter(b=>b&&typeof b.name==='string'&&b.name.trim()&&normalizeLogin(b.name)&&!['admin','visitor','allcollaborations',...brandDefinitions.map(d=>d.login)].includes(normalizeLogin(b.name))).map(b=>storedBrand({...b,custom:true,login:normalizeLogin(b.name)}));}catch{}try{settings=JSON.parse(localStorage.getItem('athem-brand-settings')||'{}')||{};}catch{}brandDefinitions.forEach(b=>Object.assign(b,settings[b.login]||{}));brandDefinitions.push(...customBrands);
export const brands=['All collaborations',...brandDefinitions.map(b=>b.name)];
export const accounts={admin:{brand:null},visitor:{brand:null},...Object.fromEntries(brandDefinitions.map(b=>[b.login,{brand:b.name}]))};
export function brandIdentity(b){const definition=brandDefinitions.find(d=>d.name===b);if(!definition)return '';return `<span class="brand-identity identity-${definition.login}">${definition.mask&&!definition.logoKey?`<span class="brand-symbol brand-mask" role="img" aria-label="${esc(definition.name)}" data-src="${definition.mask}" style="--brand-mask:url('${definition.mask}')"></span>`:definition.symbol&&!definition.logoKey?`<span class="brand-symbol" role="img" aria-label="${esc(definition.name)}">${definition.symbol.replace(/<title>.*?<\/title>/,'').replace('<svg ','<svg aria-hidden="true" ')}</span>`:`<span class="brand-wordmark">${definition.fallbackLines?definition.fallbackLines.map(esc).join('<br>'):esc(b)}</span>${definition.logo?`<img class="brand-logo" src="${esc(definition.logo)}" alt="" referrerpolicy="no-referrer">`:''}`}</span>`;}

export function getBrandDefinition(name){return brandDefinitions.find(b=>b.name===name);}
export function validateNewBrand(name){const clean=String(name||'').trim();const login=normalizeLogin(clean);if(!clean||clean.length>80||!login)throw Error('Enter a brand name of 1–80 characters containing letters or numbers.');if(['admin','visitor','allcollaborations'].includes(login)||brandDefinitions.some(b=>b.login===login))throw Error('That brand name or demo login already exists.');return {name:clean,login};}
export function saveBrandDetails(name,{create=false,logoKey,storage}={}){let definition;if(create){definition={...validateNewBrand(name),custom:true,...logoKey?{logoKey}:{},...storage?{storage}:{}};const next=[...customBrands,definition];localStorage.setItem('athem-custom-brands',JSON.stringify(next.map(storedBrand)));customBrands=next;brandDefinitions.push(definition);brands.push(definition.name);accounts[definition.login]={brand:definition.name};}else{definition=getBrandDefinition(name);if(!definition)throw Error('Choose an existing brand.');const patch={...logoKey?{logoKey}:{},...storage?{storage}:{}};if(definition.custom){const next=customBrands.map(b=>b.login===definition.login?{...b,...patch}:b);localStorage.setItem('athem-custom-brands',JSON.stringify(next.map(storedBrand)));customBrands=next;}else{const next={...settings,[definition.login]:{...settings[definition.login],...patch}};localStorage.setItem('athem-brand-settings',JSON.stringify(next));settings=next;}Object.assign(definition,patch);}return definition;}
const hydratedKeys=new Map();
export async function hydrateBrandLogos(onChange){await Promise.all(brandDefinitions.filter(b=>b.logoKey&&hydratedKeys.get(b.login)!==b.logoKey).map(async b=>{try{const url=await fileURL(b.logoKey);const previous=b.localLogoURL;b.logo=url;b.localLogoURL=url;hydratedKeys.set(b.login,b.logoKey);if(previous)URL.revokeObjectURL(previous);}catch{}}));onChange?.();}
