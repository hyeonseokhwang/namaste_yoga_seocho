import { useEffect, useRef } from 'react';

export default function useScrollReveal(options={ rootMargin:'0px 0px -10% 0px', threshold:0.15, once:true }){
  const ref = useRef(null);
  useEffect(()=>{
    if(!ref.current) return;
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce){
      el.classList.add('opacity-0','translate-y-6');
    } else {
      el.classList.add('opacity-0');
    }
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          el.classList.add('!opacity-100');
          if(!reduce) el.classList.add('!translate-y-0');
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
