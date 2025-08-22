import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';

// About IYCK teaser with motion-respect & accessibility improvements
export default function AboutIYCK(){
  const ref = useScrollReveal();
  const images = ['/img/practice1.jpg','/img/practice2.jpg','/img/practice3.jpg'];
  const [idx,setIdx] = useState(0);
  useEffect(()=>{
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(media.matches) return; // skip rotation
    const t=setInterval(()=> setIdx(p=> (p+1)%images.length), 4800);
    return ()=>clearInterval(t);
  },[]);
  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-iyck-heading"
      className="relative py-32 md:py-36 overflow-hidden"
    >
      {/* background aesthetics */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-gray-50 to-white" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_55%_45%,black,transparent_78%)] bg-[radial-gradient(circle_at_28%_32%,rgba(86,141,168,0.18),transparent_60%),radial-gradient(circle_at_74%_68%,rgba(50,101,127,0.14),transparent_62%)]" aria-hidden="true" />
      <div className="container-beam grid lg:grid-cols-2 gap-20 items-center">
        {/* Visual*/}
        <div className="relative order-last lg:order-first">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-200/40 via-white to-accent-200/30 blur-xl" aria-hidden="true" />
            <figure className="relative rounded-3xl overflow-hidden ring-1 ring-brand-200/60 shadow-[0_8px_30px_-8px_rgba(16,38,49,0.25),0_4px_16px_-4px_rgba(16,38,49,0.18)] h-[360px] md:h-[460px] group">
              <img
                key={idx}
                src={images[idx]}
                alt="IYCK 수련 사진 (정렬과 프롭 활용 장면)"
                className="w-full h-full object-cover brightness-[1.03] animate-fade-in"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/10 to-transparent" aria-hidden="true" />
            </figure>
            <div className="hidden md:block" aria-hidden="true">
              <div className="absolute -right-10 top-10 w-40 rounded-xl overflow-hidden ring-1 ring-white/70 shadow-lg backdrop-blur bg-white/60">
                <img src={images[(idx+1)%images.length]} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -left-10 bottom-10 w-44 rounded-xl overflow-hidden ring-1 ring-white/70 shadow-lg backdrop-blur bg-white/60">
                <img src={images[(idx+2)%images.length]} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
        </div>
        {/* Text */}
        <div className="max-w-xl mx-auto text-center lg:text-left">
          <h2 id="about-iyck-heading" className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">IYCK 소개</h2>
          <p className="mt-7 text-[15px] md:text-[16px] leading-relaxed text-gray-600"><strong className="text-brand-700">IYCK</strong>는 Iyengar Yoga 철학과 전통을 기반으로 한국에서 <em>정확하고 깊이 있는 수련 문화</em>를 구축하는 비영리 커뮤니티입니다.</p>
          <div className="mt-6 text-[14px] md:text-[15px] leading-relaxed text-gray-600 space-y-4">
            <p>2019년 모임으로 시작 → 2024년 비영리 전환. Pune(RIMYI) 규범을 준수하며 신뢰 기반 성장 구조를 설계합니다.</p>
            <p>정렬 · 시퀀스 · 타이밍 · 프롭 통합 지도와 공동체적 피드백 순환을 통해 개인 수련과 교사 역량을 함께 끌어올립니다.</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4" role="navigation" aria-label="About IYCK links">
            <a href="/iyck" className="px-7 py-3.5 rounded-full bg-brand-600 text-white text-sm font-medium shadow-soft-lg hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600/70 transition">전체 소개 보기 →</a>
            <a href="/programs" className="px-7 py-3.5 rounded-full bg-white border border-brand-200 text-brand-700 text-sm font-medium hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 transition">프로그램</a>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center lg:justify-start gap-2 text-[11px] font-medium tracking-wide" role="list">
            {['2019 시작','2024 비영리 등록','Pune 규범 준수','Community Driven'].map(b=> (
              <li key={b} className="px-3 py-1.5 rounded-full bg-white ring-1 ring-brand-200 text-brand-700 shadow-sm">{b}</li>
            ))}
          </ul>
        </div>
      </div>
  <div className="h-px w-full mt-8 bg-gradient-to-r from-transparent via-brand-200/60 to-transparent" />
    </section>
  );
}
