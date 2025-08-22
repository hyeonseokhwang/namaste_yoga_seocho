import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';
import { useState, useEffect } from 'react';

export default function ProgramsIndex(){
  return (
    <>
      <div id="top" />
      <NavBar />
      <Hero />
      <ProgramsOverview />
      <div id="contact"><Footer /></div>
    </>
  );
}

function Hero(){
  const ref = useScrollReveal();
  return (
  <header ref={ref} className="relative overflow-hidden pt-40 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-brand-50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_35%,rgba(86,141,168,0.22),transparent_60%),radial-gradient(circle_at_80%_65%,rgba(50,101,127,0.18),transparent_60%)]" />
      <div className="container-beam max-w-5xl grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-7">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">프로그램 안내</h1>
          <p className="mt-6 text-[15px] md:text-base leading-relaxed text-brand-800/80 max-w-xl">워크숍 · 공개 수업 · 교사 연수 · 커뮤니티 모임을 통해 Iyengar Yoga의 깊이를 단계적으로 체험합니다. 구조화된 학습과 공동체 경험을 연결합니다.</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-2xl">
            <ProgramTypeCard icon="compass" title="정기 워크숍" desc="주제·정렬·호흡·시퀀스 집중 심화" />
            <ProgramTypeCard icon="leaf" title="공개 수업" desc="첫 체험 & 기본 원리 안내" />
            <ProgramTypeCard icon="cap" title="교사 연수" desc="멘토링·티칭 스킬·평가 대비" />
            <ProgramTypeCard icon="hands" title="커뮤니티 모임" desc="사례 공유 · 질의 · 회복 수련" />
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col gap-5">
          <HeroThumb img="/img/practice2.jpg" label="구조·정렬을 통한 단계적 확장" />
          <HeroThumb img="/img/practice3.jpg" label="프롭 활용 & 회복 시퀀스" />
        </div>
      </div>
  <div className="h-px w-full mt-12 bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
    </header>
  );
}

function ProgramsOverview(){
  return (
    <main className="bg-gradient-to-b from-brand-50 via-white to-brand-50/60 pb-44 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_70%,rgba(86,141,168,0.18),transparent_65%),radial-gradient(circle_at_85%_25%,rgba(50,101,127,0.16),transparent_60%)]" />
      <div className="container-beam max-w-6xl relative">
        {/* Featured Upcoming */}
  <section id="upcoming" className="pt-4">
          <div className="mb-10">
            <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800">진행중 / 예정</h3>
          </div>
          <div className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] md:flex group">
            <FeaturedImages />
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
              <header className="space-y-3">
                <h4 className="text-[12px] font-medium tracking-widest text-brand-600">2025 SEPTEMBER</h4>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">Eyal Shifroni 선생님 9월 워크숍</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">첫 공식 한국 방문. Iyengar Yoga 정렬·프롭·시퀀스·티칭 통합 접근을 3일 집중 구조로 체험합니다.</p>
              </header>
              <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                <ul className="space-y-2 text-brand-800/80">
                  <li><strong className="text-brand-700">일정:</strong> 9/12 14:00–17:00</li>
                  <li><strong className="text-brand-700">세션:</strong> 9/13~14 09:30–12:30 · 14:30–16:30</li>
                  <li><strong className="text-brand-700">총시간:</strong> 15시간</li>
                  <li><strong className="text-brand-700">장소:</strong> 공간 920 (강남 역삼로9길 20 B1)</li>
                </ul>
                <ul className="space-y-2 text-brand-800/80">
                  <li><strong className="text-brand-700">수강료:</strong> 429,000원 (VAT 포함)</li>
                  <li><strong className="text-brand-700">문의:</strong> 김명규 · 홍윤서 · 김아람</li>
                  <li><strong className="text-brand-700">이메일:</strong> iyengaryogacommunitykorea@gmail.com</li>
                  <li><strong className="text-brand-700">포커스:</strong> 정렬·프롭 통합 / 주제별 시퀀스 / 카운터 & 회복</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#register" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 text-white px-6 py-3 text-[13px] font-medium shadow hover:bg-brand-600 transition">Register</a>
              </div>
              <p className="text-[11px] text-brand-600/60">※ 시간/구성은 상황에 따라 일부 조정될 수 있습니다.</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
          </div>
        </section>

        <Timeline />
      </div>
    </main>
  );
}

function ProgramCard({img, caption}){
  return (
    <div className="relative rounded-2xl overflow-hidden ring-1 ring-brand-300/60 bg-white/70 backdrop-blur shadow-sm group">
      <img src={img} alt={caption} className="w-full h-52 object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-60" />
      <div className="p-4 relative">
        <p className="text-[12px] text-white/90 leading-relaxed drop-shadow-sm">{caption}</p>
      </div>
    </div>
  );
}

function ProgramTypeCard({icon, title, desc}){
  const Icon = resolveIcon(icon);
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur ring-1 ring-brand-200/70 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_75%_25%,rgba(70,120,145,0.18),transparent_65%)]" />
      <div className="flex items-start gap-4 relative">
        <div className="h-10 w-10 rounded-full ring-1 ring-brand-200/60 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center text-brand-600">{Icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold tracking-wide text-brand-800 flex items-center gap-2">
            {title}
            <span className="h-px flex-1 bg-gradient-to-r from-brand-300/50 to-transparent" />
          </h4>
          <p className="mt-1 text-[11px] text-brand-700/75 leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="absolute -bottom-px left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

function resolveIcon(name){
  const stroke = 'stroke-current';
  const common = 'w-5 h-5 '+stroke+' text-brand-600';
  switch(name){
    case 'compass':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="m14.8 9.2-3.9 1.3-1.3 3.9 3.9-1.3 1.3-3.9Z" />
        </svg>
      );
    case 'leaf':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 13c5.5-9.5 14-9 14-9s1 8.5-4.5 14A8 8 0 0 1 5 13Z" />
          <path d="M9 9c2 2 3 3 6 4" />
        </svg>
      );
    case 'cap':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M3 10.5 12 6l9 4.5-9 4.5-9-4.5Z" />
          <path d="M7 12.7v4.3c0 .8 2.2 2.5 5 2.5s5-1.7 5-2.5v-4.3" />
        </svg>
      );
    case 'hands':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M8 13V6.5a2.5 2.5 0 0 1 5 0V13m0-3.5V7a2.5 2.5 0 0 1 5 0v6c0 4-2.5 6-6 6h-.5" />
          <path d="M8 13v2c0 2.5 1 5 4 6" />
          <path d="M8 13H6.5A2.5 2.5 0 0 1 4 10.5v-1A2.5 2.5 0 0 1 6.5 7H8" />
        </svg>
      );
    default:
      return null;
  }
}

function HeroThumb({img, label}){
  return (
    <div className="relative group rounded-xl overflow-hidden ring-1 ring-brand-200/60 bg-white/30 backdrop-blur">
      <img src={img} alt={label} loading="lazy" className="h-40 w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2 text-[11px] text-white/90 leading-snug drop-shadow-sm">{label}</div>
    </div>
  );
}

function Timeline(){
  return (
    <section className="mt-32">
      <h3 className="text-xl font-semibold tracking-tight text-brand-800 mb-8">지난 워크숍 (요약)</h3>
      <div className="grid md:grid-cols-3 gap-10 text-[13px] text-brand-800/80">
        <TimelineYear year="2025" list={["7월 19–20일 — George Dovas 선생님 (서울) 사진"]} links={["/gallery?folder=gallery/Namaste_Yoga/GeorgeDovas"]} />
        <TimelineYear year="2024" list={["11월 — 홍귀석 선생님 워크숍","7월 — Justin Herold 선생님 (멘토십 준비반)","4월 — Justin Herold 선생님 (멘토십 준비반)"]} />
        <TimelineYear year="2023" list={["10월 — Justin Herold 선생님","4월 — 홍귀석 선생님"]} />
      </div>
      <p className="mt-10 text-[12px] text-brand-700/50">※ 상세 사진 및 추가 연도는 워크숍 상세 페이지에서 순차 업데이트 예정.</p>
    </section>
  );
}

function TimelineYear({year, list, links}){
  return (
    <div className="relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-gradient-to-b from-brand-400/60 to-brand-200/20">
      <h4 className="font-semibold text-brand-700 mb-3 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-400" />{year}</h4>
      <ul className="space-y-2">
        {list.map((item,i)=> {
          const link = links && links[i];
          if(link && item.includes('사진')){
            return <li key={i}>{item.replace('사진','')}<a href={link} className="ml-1 text-brand-600 hover:underline">사진</a></li>;
          }
          return <li key={i}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

function FeaturedImages(){
  const images = [
    {src:'/img/class/KakaoTalk_20250818_091833656_02.jpg', alt:'Eyal Shifroni 워크숍 이미지 1 (남자 강사 지도)' },
    {src:'/img/class/KakaoTalk_20250818_091833656_01.jpg', alt:'Eyal Shifroni 워크숍 이미지 2 (참가자 수련)' }
  ];
  const [index,setIndex] = useState(0);
  const [open,setOpen] = useState(false);
  // ESC close with cleanup
  useEffect(()=>{
    if(!open) return;
    const handler = e => { if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);
  return (
    <div className="md:w-1/2 relative h-72 md:h-auto flex flex-col">
      <button onClick={()=>setOpen(true)} className="relative flex-1 text-left cursor-zoom-in">
        {images.map((im,i)=> (
          <img key={im.src} src={im.src} alt={im.alt} loading="lazy"
               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/5 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-brand-100/90 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">FEATURED</span>
          <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">WORKSHOP</span>
        </div>
      </button>
      <div className="flex gap-2 p-3 justify-center bg-white/30 backdrop-blur-sm md:bg-transparent md:absolute md:bottom-4 md:left-4 md:flex-col md:gap-3">
        {images.map((im,i)=>(
          <button key={im.src} onClick={()=>setIndex(i)} aria-label={`이미지 ${i+1}`}
                  className={`relative overflow-hidden rounded-lg ring-1 ${i===index? 'ring-brand-400':'ring-brand-200'} w-16 h-12 transition`}>
            <img src={im.src} alt="thumb" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-black/40 ${i===index? 'opacity-0':'opacity-30'} hover:opacity-0 transition-opacity`} />
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-sm">
          <div className="flex justify-between items-center px-6 py-4 text-white text-sm tracking-wide select-none">
            <span className="truncate pr-4">{images[index].alt}</span>
            <div className="flex items-center gap-2">
              <button onClick={()=>setIndex((index-1+images.length)%images.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Prev</button>
              <button onClick={()=>setIndex((index+1)%images.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Next</button>
              <button onClick={()=>setOpen(false)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Close</button>
            </div>
          </div>
          <div className="relative flex-1">
            <button onClick={()=>setOpen(false)} aria-label="닫기" className="absolute inset-0 w-full h-full cursor-zoom-out" />
            <div className="absolute inset-0 flex items-center justify-center p-4" onClick={e=>e.stopPropagation()}>
              {images.map((im,i)=> (
                <img key={im.src} src={im.src} alt={im.alt}
                     className={`max-h-full max-w-full object-contain transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0 absolute'}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
