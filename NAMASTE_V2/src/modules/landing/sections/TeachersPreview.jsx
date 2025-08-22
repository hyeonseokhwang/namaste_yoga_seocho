// Teachers preview (pulling legacy teacher data summarized)
import { useEffect, useMemo, useRef, useState } from 'react';
import teachersData from '../shared/teachersData.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import Section from '../components/Section.jsx';
import { ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';

// Utility: shuffle immutable
function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

export default function TeachersPreview(){
  const ref = useScrollReveal();
  const [order,setOrder] = useState(()=> shuffle(teachersData));
  const [index,setIndex] = useState(0); // start index of visible window
  const visible = 4;
  const maxIndex = Math.max(0, order.length - visible);
  const slice = useMemo(()=> order.slice(index, index+visible),[order,index]);
  const trackRef = useRef(null);

  function prev(){ setIndex(i=> Math.max(0, i-1)); }
  function next(){ setIndex(i=> Math.min(maxIndex, i+1)); }
  function reshuffle(){
    setOrder(shuffle(teachersData));
    setIndex(0);
  }

  // Keyboard accessibility for carousel container
  useEffect(()=>{
    const el = trackRef.current;
    if(!el) return;
    function onKey(e){
      if(e.key==='ArrowRight'){ next(); }
      if(e.key==='ArrowLeft'){ prev(); }
    }
    el.addEventListener('keydown',onKey);
    return ()=> el.removeEventListener('keydown',onKey);
  },[maxIndex]);

  return (
    <Section ref={ref} variant="tight" className="bg-gradient-to-b from-white to-neutral-50 md:section will-change-transform">
      <div className="container-beam">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-700 mb-4">Certified Teachers</h2>
            <p className="text-neutral-700/80 text-sm max-w-md leading-relaxed">공인 교사들은 정렬·시퀀스·호흡 원리에 기반해 세밀하고 안전한 수련을 안내합니다.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={reshuffle} aria-label="무작위 재배치" className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 border border-neutral-200 shadow-sm transition"><RefreshCcw className="w-4 h-4" /></button>
            <div className="flex gap-2">
              <button onClick={prev} disabled={index===0} aria-label="이전" className="p-2 rounded-full bg-neutral-100 enabled:hover:bg-neutral-200 text-brand-700 border border-neutral-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={next} disabled={index===maxIndex} aria-label="다음" className="p-2 rounded-full bg-neutral-100 enabled:hover:bg-neutral-200 text-brand-700 border border-neutral-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <a href="/teachers" className="text-sm rounded-full bg-brand-600 text-white px-5 py-2.5 font-medium shadow-soft-lg hover:bg-brand-500 transition">전체 명단</a>
          </div>
        </div>
        <div
          ref={trackRef}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Certified Teachers Carousel"
          className="relative outline-none"
        >
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
            {slice.map(t => (
              <li key={t.name} className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition focus-within:ring-2 focus-within:ring-brand-400/50">
                <h3 className="font-semibold text-brand-700 tracking-tight text-sm mb-1 leading-snug">{t.name}</h3>
                <p className="text-[11px] uppercase tracking-wide text-brand-600/70 mb-3">{t.location}</p>
                <div className="space-y-1 text-[12px] text-neutral-700/80">
                  <p>{t.phone}</p>
                  <p className="truncate">{t.email}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.instagram && <a href={t.instagram} className="text-[11px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition">Instagram</a>}
                  {t.website && <a href={t.website} className="text-[11px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition">Website</a>}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-3 text-[11px] text-neutral-600/70">
            <span className="font-medium tracking-wide">{index+1}–{Math.min(index+visible, order.length)} / {order.length}</span>
            <span className="h-1 w-24 bg-neutral-200 rounded overflow-hidden relative">
              <span className="absolute inset-y-0 left-0 bg-brand-500 transition-[width] duration-300" style={{width: `${((index+visible)/order.length)*100}%`}} />
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
