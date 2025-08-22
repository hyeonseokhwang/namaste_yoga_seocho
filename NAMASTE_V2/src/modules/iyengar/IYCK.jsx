import { useState, useCallback, useEffect } from 'react';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';
import useActiveSection from '../shared/hooks/useActiveSection.js';
import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';

// IYCK 소개 전체 페이지 (레거시 콘텐츠 통합 + 향상된 구조)
export default function IYCKPage(){
  return (
    <>
      <div id="top" />
      <NavBar />
      <PageLayout
        title="IYCK 소개"
        intro="Iyengar Yoga 철학과 전통을 기반으로 한국에서 정확하고 깊이 있는 수련 문화를 구축하고 수련자와 교사 모두의 성장 구조를 설계하는 비영리 단체입니다."
        sections={sections}
      >
        <ArticleBody />
      </PageLayout>
      <div id="contact"><Footer /></div>
    </>
  );
}

function PageLayout({ title, intro, sections, children }){
  return (
    <main className="pt-28 pb-40 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      <HeaderHero title={title} intro={intro} />
      <div className="container-beam mt-16 grid gap-16 xl:grid-cols-[1fr_280px]">
        <div>{children}</div>
        <SideToc sections={sections} />
      </div>
    </main>
  );
}

function HeaderHero({title,intro}){
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background decorative layers */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_78%)] bg-[radial-gradient(circle_at_28%_32%,rgba(86,141,168,0.18),transparent_60%),radial-gradient(circle_at_74%_68%,rgba(50,101,127,0.14),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0)_0%,#ffffff_92%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] bg-[linear-gradient(120deg,rgba(77,132,159,0.08)_0%,rgba(255,255,255,0)_40%),repeating-linear-gradient(90deg,rgba(77,132,159,0.08)_0_1px,transparent_1px_120px)]" />

      <div className="container-beam pt-36 pb-28 flex flex-col items-center text-center">
        <div className="relative">
          <span className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-100 via-white to-white blur-[22px] -z-10" aria-hidden="true" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-800 drop-shadow-sm">
            {title}
          </h1>
        </div>
        <p className="mt-7 max-w-2xl text-[15px] md:text-[16px] leading-relaxed text-gray-600">{intro}</p>

        {/* Quick facts / badges */}
        <ul className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] font-medium tracking-wide">
          {[
            ['2019 시작','bg-brand-50 text-brand-700 ring-brand-200'],
            ['2024 비영리 등록','bg-white text-brand-800 ring-brand-300'],
            ['Pune 규범 준수','bg-accent-50 text-accent-700 ring-accent-200'],
            ['Community Driven','bg-white text-brand-700 ring-brand-200']
          ].map(([label,cls])=> (
            <li key={label} className={`px-3.5 py-2 rounded-full ring-1 shadow-sm ${cls}`}>{label}</li>
          ))}
        </ul>

        {/* Hero media */}
        <div className="mt-14 relative w-full max-w-5xl">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-brand-200/50 via-white to-accent-200/40 blur-xl opacity-70" aria-hidden="true" />
          <figure className="relative rounded-3xl overflow-hidden ring-1 ring-brand-200/60 shadow-[0_8px_28px_-6px_rgba(16,38,49,0.25),0_4px_16px_-4px_rgba(16,38,49,0.18)] group">
            <img src="https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/agvcwzezxscgxilbae1l.jpg" alt="IYCK 메인" className="w-full h-[340px] md:h-[440px] object-cover brightness-[1.02] group-hover:scale-[1.02] transition-transform duration-[2200ms] ease-[cubic-bezier(.19,1,.22,1)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />
          </figure>
          {/* Floating small thumbnails */}
          <div className="hidden md:block">
            <div className="absolute -right-10 top-10 w-40 rounded-xl overflow-hidden ring-1 ring-white/70 shadow-lg backdrop-blur bg-white/60">
              <img src="https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_800/gallery/apdkin9yf01kfvilhuas.jpg" alt="practice" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -left-10 bottom-10 w-44 rounded-xl overflow-hidden ring-1 ring-white/70 shadow-lg backdrop-blur bg-white/60">
              <img src="https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_800/gallery/nbpmx95s4rrrvpmhopj5.jpg" alt="practice" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <a href="#legacy-about" className="px-7 py-3.5 rounded-full bg-brand-600 text-white text-sm font-medium hover:bg-brand-500 shadow-soft-lg">소개 바로가기</a>
          <a href="#legacy-org" className="px-7 py-3.5 rounded-full bg-white border border-brand-200 text-brand-700 text-sm font-medium hover:bg-brand-50">조직 구성</a>
        </div>
        <div className="mt-16 animate-bounce-slow" aria-hidden="true">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
            Scroll
          </span>
        </div>
      </div>

      {/* bottom subtle divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-200/70 to-transparent" />
    </section>
  );
}

const sections = [
  { id:'legacy-about', title:'소개' },
  { id:'legacy-org', title:'조직 구성' },
  { id:'gallery', title:'갤러리' },
];

function ArticleBody(){
  // 이미지 (샘플) - 갤러리 최소 유지
  const images = [
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/agvcwzezxscgxilbae1l.jpg', // 메인
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/zw4n7rhtobrf6xmts6od.jpg', // 단체
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/apdkin9yf01kfvilhuas.jpg', // 수련1
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/wczkz4bnesrhrtsdn9ea.jpg', // 수련2
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/nbpmx95s4rrrvpmhopj5.jpg', // 수련3
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/w1eafu2d1hempouj5q4o.jpg', // 수련4
  ];
  const [open,setOpen]=useState(false);
  const [index,setIndex]=useState(0);
  const openAt = useCallback(i=>{setIndex(i);setOpen(true);},[]);
  const close = useCallback(()=>setOpen(false),[]);
  const prev = useCallback(()=> setIndex(i=> i>0? i-1: i),[]);
  const next = useCallback(()=> setIndex(i=> i<images.length-1? i+1: i),[images.length]);
  useEffect(()=>{ if(!open) return; const onKey=e=>{ if(e.key==='Escape') close(); if(e.key==='ArrowLeft') prev(); if(e.key==='ArrowRight') next(); }; window.addEventListener('keydown',onKey); return ()=> window.removeEventListener('keydown',onKey);},[open,close,prev,next]);

  return (
    <article className="prose prose-neutral max-w-3xl text-[15px] leading-relaxed [&_h2]:font-serif [&_h2]:tracking-tight [&_h2]:font-semibold [&_h2]:text-brand-800 [&_h2]:scroll-mt-28 mx-auto">
      <section id="legacy-about" className="relative">
        <h2>Iyengar Yoga Community Korea (IYCK)</h2>
        <p><strong>Iyengar Yoga Community Korea (IYCK)</strong>는 Iyengar Yoga의 철학과 전통을 바탕으로, 한국에서 정확하고 깊이 있는 요가 수련 문화를 정착시키고자 하는 비영리 단체입니다.</p>
        <p>2019년 3월 7일, 뜻을 함께하는 수련자들의 작은 모임으로 시작되어 2024년 3월 14일 공식 비영리 단체로 설립되었으며, 이후 꾸준한 수련과 신뢰를 바탕으로 함께 성장하는 배움의 장으로 발전해 왔습니다.</p>
        <p>IYCK는 단순한 요가 단체를 넘어, 몸과 마음의 조화, 진심 어린 자기 탐구, 그리고 함께 성장하는 수련 공동체를 지향합니다. B.K.S. Iyengar 구루지의 가르침이 지닌 깊이와 진정성을 온전히 보존하고 전수하기 위해, 푸네의 라마마니 아엥가 요가연구소(RIMYI)에서 정립한<em> ‘Iyengar Yoga 규범(Pune Constitution)’</em>에 따라 운영되고 있습니다.</p>
      </section>
      <section id="legacy-org" className="pt-12 border-t border-gray-200/70">
        <h2>조직 구성</h2>
        <ul className="list-disc list-inside space-y-2 text-[16px]">
          <li><strong>회장:</strong> 강경희</li>
          <li><strong>대외협력:</strong> 김정민</li>
          <li><strong>실무지원:</strong> 김명규, 김옥교</li>
          <li><strong>교육지원:</strong> 양삼선, 김아람, 김유진</li>
          <li><strong>회계:</strong> 홍윤서</li>
        </ul>
        <p className="mt-6 text-sm text-gray-600">위 구성원들은 자발적인 참여로 IYCK의 활동을 이끌고 있습니다. 문의나 협력이 필요하시면 커뮤니티 내 담당자와 연락하실 수 있습니다.</p>
      </section>
      <section id="gallery" className="pt-12 border-t border-gray-200/70">
        <h2>갤러리</h2>
        <figure className="w-full flex justify-center mt-4">
          <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white to-gray-50 cursor-pointer" onClick={()=>openAt(1)} role="button" tabIndex={0}>
            <div className="aspect-[4/3] w-full">
              <img src={images[1]} alt="IYCK 협회 소개" className="w-full h-full object-cover block" />
            </div>
          </div>
        </figure>
        <div className="grid grid-cols-3 gap-3 mt-6">
          {images.slice(2,5).map((src,i)=>(
            <button key={src} onClick={()=>openAt(i+2)} className="overflow-hidden rounded-md shadow-sm bg-white" aria-label={`open practice ${i+1}`}>
              <div className="aspect-[4/3] w-full">
                <img src={src} alt={`practice-${i+1}`} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </button>
          ))}
        </div>
        {open && (
          <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 p-4" onClick={close}>
            <button className="absolute top-4 right-4 text-white text-2xl p-2" onClick={(e)=>{e.stopPropagation();close();}} aria-label="close">×</button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2" onClick={(e)=>{e.stopPropagation();prev();}} aria-label="prev">‹</button>
            <div className="max-h-[88vh] max-w-[92vw]" onClick={e=>e.stopPropagation()}>
              <img src={images[index]} alt="lightbox" className="max-h-[88vh] max-w-[92vw] object-contain" />
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2" onClick={(e)=>{e.stopPropagation();next();}} aria-label="next">›</button>
          </div>
        )}
      </section>
    </article>
  );
}

function SideToc({sections}){
  const active = useActiveSection(sections.map(s=>s.id), { offsetTop: 88 });
  return (
    <aside className="hidden lg:flex flex-col gap-4 top-32 sticky h-max">
      <div className="text-xs font-semibold tracking-wide text-brand-600 uppercase">On this page</div>
      <ul className="space-y-1 text-sm">
        {sections.map(s=> {
          const is = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`group flex items-center gap-2 px-3 py-2 rounded-md text-[13px] transition relative overflow-hidden
                  ${is? 'bg-brand-50 text-brand-800 font-medium shadow-sm ring-1 ring-brand-200':'text-gray-600 hover:text-brand-700 hover:bg-brand-50'}`}
              >
                <span className={`inline-block h-1.5 w-1.5 rounded-full transition-transform ${is? 'bg-brand-600 scale-100':'bg-gray-300 scale-75 group-hover:scale-90 group-hover:bg-brand-400'}`} />
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
