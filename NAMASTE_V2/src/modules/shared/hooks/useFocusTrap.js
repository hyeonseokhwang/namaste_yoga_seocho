import { useEffect } from 'react';

// useFocusTrap: trap focus within a ref container when active.
export default function useFocusTrap(ref, active=true){
  useEffect(()=>{
    if(!active) return; const node = ref.current; if(!node) return;
    const selectors = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';
    const focusable = ()=> Array.from(node.querySelectorAll(selectors)).filter(el=> !el.hasAttribute('disabled'));
    const first = ()=> focusable()[0];
    const last = ()=> { const f = focusable(); return f[f.length-1]; };
    const previously = document.activeElement;
    first()?.focus();
    function onKey(e){
      if(e.key==='Tab'){
        const f = focusable(); if(!f.length) return;
        if(e.shiftKey && document.activeElement === f[0]){ e.preventDefault(); last().focus(); }
        else if(!e.shiftKey && document.activeElement === f[f.length-1]){ e.preventDefault(); first().focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return ()=> { document.removeEventListener('keydown', onKey); previously && previously.focus instanceof Function && previously.focus(); };
  },[ref,active]);
}
