// Render a still model once; continue only for interaction, damping or auto-rotation.
export function createViewerRenderLoop({host,controls,render}){
 let frame=0,disposed=false,rendering=false,visible=typeof IntersectionObserver==='undefined';
 function requestRender(){if(disposed||!visible||document.hidden||frame||rendering)return;frame=requestAnimationFrame(tick);}
 function pause(){if(frame)cancelAnimationFrame(frame);frame=0;}
 function tick(){frame=0;if(disposed||!visible||document.hidden)return;rendering=true;const changed=controls.update();render();rendering=false;if(controls.autoRotate||changed)requestRender();}
 const visibility=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)requestRender();else pause();});
 visibility?.observe(host);
 const onVisibility=()=>{if(document.hidden)pause();else requestRender();};
 controls.addEventListener('change',requestRender);document.addEventListener('visibilitychange',onVisibility);requestRender();
 return {requestRender,dispose(){disposed=true;pause();visibility?.disconnect();controls.removeEventListener('change',requestRender);document.removeEventListener('visibilitychange',onVisibility);}};
}
