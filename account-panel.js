import {showGuide} from './onboarding.js';
import {changeOwnPassword} from './access.js';
import {escapeHTML as esc} from './storage.js';

export function openAccountPanel(account){
 const panel=document.createElement('dialog');panel.className='account-panel';panel.setAttribute('aria-labelledby','account-title');
 panel.innerHTML=`<div class="detail-top"><span>YOUR ACCOUNT</span><button type="button" aria-label="Close account settings">✕</button></div><div class="account-panel-body"><h2 id="account-title">${esc(account.name)}</h2><dl><dt>Login</dt><dd>${esc(account.username)}</dd></dl><div class="account-help"><button type="button" data-guide="welcome" class="action-button">Website guide</button><button type="button" data-guide="material" class="action-button">Material guide</button></div><form><h3>Change password</h3><label>Current password<input name="current" type="password" autocomplete="current-password" required></label><label>New password<input name="new" type="password" autocomplete="new-password" minlength="6" maxlength="128" required></label><label>Confirm new password<input name="confirm" type="password" autocomplete="new-password" minlength="6" maxlength="128" required></label><p class="account-storage-note">Password changes apply to this demo in this browser.</p><p class="account-status" role="status" aria-live="polite"></p><button class="primary" type="submit">Save password</button></form></div>`;
 if(account.username==='admin')panel.querySelector('.account-help').remove();
 document.body.append(panel);panel.querySelector('.detail-top button').onclick=()=>panel.close();panel.onclose=()=>panel.remove();
 panel.querySelector('form').onsubmit=async e=>{
  e.preventDefault();const form=e.currentTarget,values=new FormData(form),status=panel.querySelector('.account-status'),button=form.querySelector('button');status.textContent='';
  if(values.get('new')!==values.get('confirm')){status.textContent='The new passwords do not match.';return;}
  button.disabled=true;
  try{await changeOwnPassword(account,String(values.get('current')),String(values.get('new')));form.reset();status.textContent='Your password has been changed.';}
  catch(error){status.textContent=error.message;}
  finally{button.disabled=false;}
 };
 panel.querySelectorAll('[data-guide]').forEach(button=>button.onclick=()=>{const type=button.dataset.guide;panel.close();showGuide(account,type,{force:true});});
 panel.showModal();
}
