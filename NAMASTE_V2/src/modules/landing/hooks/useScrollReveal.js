import { useEffect, useRef } from 'react';

export default function useScrollReveal(options={ rootMargin:'0px 0px -10% 0px', threshold:0.15, once:true }){
  const ref = useRef(null);
  useEffect(()=>{
    if(!ref.current) return;
    const el = ref.current;
    el.classList.add('opacity-0','translate-y-6');
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          el.classList.add('!opacity-100','!translate-y-0');
          el.classList.add('transition','duration-700');
          if(options.once) observer.disconnect();
        }
      });
    }, options);
    observer.observe(el);
    return ()=> observer.disconnect();
  },[]);
  return ref;
}
