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
export const brands=['All collaborations',...brandDefinitions.map(b=>b.name)];
export const accounts={admin:{brand:null},visitor:{brand:null},...Object.fromEntries(brandDefinitions.map(b=>[b.login,{brand:b.name}]))};
export function brandIdentity(b){const definition=brandDefinitions.find(d=>d.name===b);if(!definition)return '';return `<span class="brand-identity identity-${definition.login}">${definition.mask?`<span class="brand-symbol brand-mask" role="img" aria-label="${definition.name}" data-src="${definition.mask}" style="--brand-mask:url('${definition.mask}')"></span>`:definition.symbol?`<span class="brand-symbol" role="img" aria-label="${definition.name}">${definition.symbol.replace(/<title>.*?<\/title>/,'').replace('<svg ','<svg aria-hidden="true" ')}</span>`:`<span class="brand-wordmark">${definition.fallbackLines?definition.fallbackLines.join('<br>'):b}</span><img class="brand-logo" src="${definition.logo}" alt="" referrerpolicy="no-referrer">`}</span>`;}
