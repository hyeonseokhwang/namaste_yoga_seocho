import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function Programs(){
  const ref = useScrollReveal();

  // Countdown to the featured workshop start (assume 2025-09-12 local)
  const target = new Date('2025-09-12T09:30:00+09:00');
  const [countdown, setCountdown] = useState({ d:0,h:0,m:0 });
  useEffect(()=>{
    const tick = () => {
      const now = new Date();
      const diff = target - now;
      if(diff <= 0){ setCountdown({ d:0,h:0,m:0 }); return; }
      const d = Math.floor(diff/86400000);
      const h = Math.floor(diff%86400000/3600000);
      const m = Math.floor(diff%3600000/60000);
      setCountdown({ d,h,m });
    };
    tick();
    const id = setInterval(tick, 60000); // minute resolution is enough
    return ()=>clearInterval(id);
  },[]);

  return (
    <section
      id="programs"
      ref={ref}
      aria-labelledby="programs-heading"
  className="relative -mt-2 pt-14 pb-28 md:pt-16 md:pb-32 bg-gradient-to-b from-white via-gray-50 to-white will-change-transform"
    >
  <div aria-hidden="true" className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-brand-200/20 via-white/30 to-transparent pointer-events-none" />
      {/* subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_60%_35%,black,transparent_75%)] bg-[radial-gradient(circle_at_25%_40%,rgba(43,90,116,0.12),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(180,210,220,0.18),transparent_65%)]" aria-hidden="true" />
      <div className="container-beam relative">
        {/* Section Intro */}
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-10 md:mb-12">
          <div className="max-w-xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-[11px] font-semibold tracking-wide text-brand-700 ring-1 ring-brand-200/70">PROGRAMS</div>
            <h2 id="programs-heading" className="font-serif text-3xl md:text-[2.5rem] leading-[1.15] font-semibold tracking-tight text-gray-900">Upcoming Focus</h2>
            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">정확한 아사나와 의식적 호흡을 심화하는 집중 프로그램. 소규모 진행으로 개별 조정과 세밀한 피드백을 제공합니다.</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            {/* Filter / category nav (non-interactive placeholder for now) */}
            <nav aria-label="Program categories" className="w-full md:w-auto">
              <ul className="flex flex-wrap gap-2 text-[12px] font-medium">
                {['워크숍','테라퓨틱','호흡','개인세션(예정)'].map(cat=> (
                  <li key={cat}>
                    <button type="button" className="px-4 py-2 rounded-full bg-white border border-brand-200/70 hover:bg-brand-50 text-brand-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 transition">{cat}</button>
                  </li>
                ))}
              </ul>
            </nav>
            <a href="/programs#upcoming" className="inline-flex items-center gap-2 text-sm rounded-full bg-brand-600 text-white px-5 py-2.5 font-medium shadow-soft-lg hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600/70 transition">
              전체 일정 보기
            </a>
          </div>
        </div>

        {/* Featured Workshop */}
        <article aria-labelledby="featured-workshop-title" className="mb-24" role="article">
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-brand-200/70 bg-white shadow-soft-lg md:flex group">
            {/* Image panel */}
            <div className="md:w-1/2 relative h-72 md:h-auto">
              {/* 순서 변경: 선생님(초록 배경) 메인, 수련 장면 호버 */}
              <img src="/img/class/KakaoTalk_20250818_091833656_02.jpg" alt="워크숍 진행 선생님 사진" className="absolute inset-0 w-full h-full object-cover object-center opacity-100 group-hover:opacity-0 transition-opacity duration-700" loading="lazy" />
              <img src="/img/class/KakaoTalk_20250818_091833656_01.jpg" alt="워크숍 수련 장면 (정렬 지도)" className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/0 to-black/0 pointer-events-none" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-100/90 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">FEATURED</span>
                <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">WORKSHOP</span>
              </div>
              { (countdown.d+countdown.h+countdown.m) > 0 && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] font-semibold tracking-wide bg-brand-700/80 text-white px-3 py-1.5 rounded-full backdrop-blur shadow">
                  <span className="opacity-80">개최까지</span>
                  <span className="tabular-nums">{countdown.d}d {countdown.h}h {countdown.m}m</span>
                </div>
              ) }
            </div>
            {/* Content panel */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6" aria-describedby="featured-workshop-meta">
              <header className="space-y-4">
                <h3 id="featured-workshop-title" className="font-serif text-[1.75rem] md:text-3xl font-semibold tracking-tight text-brand-800">Eyal Shifroni 선생님 9월 워크숍</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700">첫 공식 한국 방문. Iyengar Yoga의 깊이 있는 정렬·프롭·티칭 접근을 3일 집중 구조로 체험합니다.</p>
              </header>
              <div id="featured-workshop-meta" className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                <ul className="space-y-2 text-gray-700">
                  <li><strong className="text-brand-700">일정:</strong> 9월 12–14 (총 15시간)</li>
                  <li><strong className="text-brand-700">세션:</strong> 9/12 14:00–17:00 · 9/13~14 09:30–12:30 & 14:30–16:30</li>
                  <li><strong className="text-brand-700">장소:</strong> 공간 920 (강남 역삼로9길 20 B1)</li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li><strong className="text-brand-700">수강료:</strong> 429,000원 (VAT 포함)</li>
                  <li><strong className="text-brand-700">문의:</strong> 김명규 · 홍윤서 · 김아람</li>
                  <li><strong className="text-brand-700">이메일:</strong> iyengaryogacommunitykorea@gmail.com</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="/programs#upcoming" className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-white px-6 py-3 text-[13px] font-medium shadow-soft-lg hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600/70 transition">상세 / 신청 안내 →</a>
                <a href="/gallery?folder=gallery/Namaste_Yoga/GeorgeDovas" className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-brand-200/70 text-brand-700 px-6 py-3 text-[13px] font-medium hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 transition">지난 워크숍 사진</a>
              </div>
              <p className="text-[11px] text-gray-400">※ 일정/구성은 상황에 따라 일부 조정될 수 있습니다.</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-black/0 group-hover:ring-brand-300/60 transition" />
          </div>
        </article>

      </div>
    </section>
  );
}
