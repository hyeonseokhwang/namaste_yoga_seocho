import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function GalleryPreviewRibbon(){
  const ref = useScrollReveal();
  const [items,setItems]=useState([]);
  useEffect(()=>{
    fetch('/api/gallery')
      .then(r=> r.ok? r.json(): {items:[]})
      .then(d=> setItems((d.items||[]).slice(0,18)))
      .catch(()=>{});
  },[]);
  const doubled = items.concat(items);
  return (
  <section ref={ref} className="relative bg-brand-900 py-16 overflow-hidden will-change-transform">
  <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_65%)]" />
      <div className="container-beam relative mb-10 flex items-center justify-between">
  <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-50">Practice Gallery</h2>
  <a href="/gallery" className="text-xs px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-brand-50 backdrop-blur border border-white/15 transition">전체 보기</a>
      </div>
      <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 animate-[ribbon-scroll_55s_linear_infinite] px-4">
          {doubled.map((r,i)=> (
            <div key={r.public_id + i} className="relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-xl bg-gray-800/40 ring-1 ring-white/5">
              <img src={r.secure_url || `/img/practice${(i%3)+1}.jpg`} alt="practice" loading="lazy" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes ribbon-scroll {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
