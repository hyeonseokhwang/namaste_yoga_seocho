import { useMemo } from 'react';
import teachersData from '../landing/shared/teachersData.js';
import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';

// Locale aware comparator for Korean (ㄱㄴㄷㄹㅁ ...). Fallback to string compare if not supported.
const collator = typeof Intl !== 'undefined' ? new Intl.Collator('ko-KR') : null;

// (초성 그룹 네비 제거 요청으로 관련 로직 제외)

export default function TeachersPage(){
  // 정렬만 적용 (검색 제거)
  const sorted = useMemo(()=> {
    const arr = [...teachersData];
    if(collator){
      arr.sort((a,b)=> collator.compare(a.name, b.name));
    } else {
      arr.sort((a,b)=> a.name.localeCompare(b.name));
    }
    return arr;
  },[]);

  // flat list only (초성 구분 제거)

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-800">
      <NavBar />
      <header className="pt-32 pb-16 bg-gradient-to-b from-brand-800 via-brand-700 to-brand-700 text-brand-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_70%)]" />
        <div className="container-beam relative">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-5">Certified Iyengar Teachers (CIYT)</h1>
          <p className="max-w-3xl text-[13px] md:text-sm leading-relaxed text-brand-100/85">정확성 · 안전성 · 일관성을 기반으로 한 Iyengar Yoga 전통을 공식적으로 전수할 수 있는 인증 교사 명단입니다.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Snapshot */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 flex flex-col">
              <h2 className="text-[15px] font-semibold mb-4 tracking-tight">CIYT 한눈에</h2>
              <ul className="space-y-2 text-[12.5px] text-brand-50/90">
                <li className="flex gap-2"><span className="text-brand-300">•</span><span>다년간 개인 수련 & 멘토링 · 공식 평가 통과</span></li>
                <li className="flex gap-2"><span className="text-brand-300">•</span><span>RIMYI 국제 가이드라인 준수</span></li>
                <li className="flex gap-2"><span className="text-brand-300">•</span><span>지속 교육 · 연수 · 재평가로 역량 유지</span></li>
                <li className="flex gap-2"><span className="text-brand-300">•</span><span>“Iyengar Yoga” 명칭 & Certification Mark 사용 권한</span></li>
              </ul>
              <details className="mt-5 group">
                <summary className="cursor-pointer select-none text-[12px] inline-flex items-center gap-1 text-brand-200 hover:text-white transition">자세한 소개 <span className="group-open:rotate-180 transition-transform">▾</span></summary>
                <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-brand-50/85">
                  <p>Certified Iyengar Yoga Teacher(CIYT)는 B.K.S. Iyengar와 그의 가족이 정립한 아사나와 프라나야마 수련법을 정확하고 안전하게 지도할 수 있도록 정식 인증을 받은 요가 교사를 의미합니다.</p>
                  <p>B.K.S. Iyengar와 그의 가족이 남긴 전통적 가르침은 정통성과 일관성을 갖고 전수되기 위해 RIMYI(인도 본원)의 기준에 따라 엄격하고 체계적인 수련 과정을 거쳐야 합니다.</p>
                  <p>CIYT는 자격 취득 이후에도 지속적인 수련, 교육, 멘토링, 연수를 통해 지도 역량을 유지·발전해야 하며, 전 세계 CIYT 체계는 RIMYI의 가이드라인에 따라 통합적으로 운영됩니다.</p>
                  <p className="text-[11px] text-brand-100/70">※ “Iyengar Yoga” 명칭과 Certification Mark는 공인 교사(CIYT)만 사용할 수 있습니다. 멘토링/수련 중 사실은 언급 가능하나 자신을 “Iyengar Yoga 교사”로 소개하는 혼동 표현은 지양합니다.</p>
                </div>
              </details>
            </div>
            {/* Levels timeline */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6">
              <h2 className="text-[15px] font-semibold mb-4 tracking-tight">CIYT 레벨 구조</h2>
              <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-px before:bg-gradient-to-b before:from-brand-400/70 before:to-brand-200/20 pl-6">
                <li className="relative">
                  <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-brand-300 shadow ring-4 ring-brand-300/30" />
                  <h3 className="font-semibold text-[13px]">Level 1</h3>
                  <p className="mt-1 text-[11.5px] text-brand-50/80 leading-relaxed">3년 이상 정기 수련 · 멘토링 · 기초 아사나 / 지도 평가 & 이론 필기 Assessment 통과</p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-brand-300 shadow ring-4 ring-brand-300/30" />
                  <h3 className="font-semibold text-[13px]">Level 2</h3>
                  <p className="mt-1 text-[11.5px] text-brand-50/80 leading-relaxed">Level 1 이후 심화 · 중급 아사나 & 프라나야마 · 철학 필기 & 지도력 평가</p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-brand-300 shadow ring-4 ring-brand-300/30" />
                  <h3 className="font-semibold text-[13px]">Level 3</h3>
                  <p className="mt-1 text-[11.5px] text-brand-50/80 leading-relaxed">Level 2 이후 상급 수련 · 상급 아사나 & 프라나야마 · 철학/지도 종합 평가</p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-brand-300 shadow ring-4 ring-brand-300/30" />
                  <h3 className="font-semibold text-[13px]">Level 4</h3>
                  <p className="mt-1 text-[11.5px] text-brand-50/80 leading-relaxed">최상급 통합 수련 역량 · RIMYI 직접 평가 관장 단계</p>
                </li>
              </ol>
              <p className="mt-6 text-[11px] text-brand-100/60">※ 레벨 간 진행은 충분한 기간의 심화 수련과 멘토 평가를 전제로 합니다.</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 py-20 bg-gradient-to-b from-white via-neutral-50 to-white">
        <div className="container-beam">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map(t=> <TeacherCard key={t.name} {...t} />)}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function TeacherCard({ name, location, phone, email, instagram, website, blog, facebook }) {
  return (
    <article className="group relative rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow transition" aria-label={name}>
      <h2 className="font-semibold text-brand-700 tracking-tight text-[13px] mb-1 leading-snug line-clamp-2">{name}</h2>
      <p className="text-[11px] uppercase tracking-wide text-brand-600/70 mb-2">{location}</p>
      <div className="space-y-0.5 text-[11.5px] text-neutral-700/80">
        {phone && <p>{phone}</p>}
        {email && <p className="truncate">{email}</p>}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {instagram && <a href={instagram} className="text-[10.5px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition" target="_blank" rel="noreferrer">IG</a>}
        {website && <a href={website} className="text-[10.5px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition" target="_blank" rel="noreferrer">Web</a>}
        {blog && <a href={blog} className="text-[10.5px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition" target="_blank" rel="noreferrer">Blog</a>}
        {facebook && <a href={facebook} className="text-[10.5px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition" target="_blank" rel="noreferrer">FB</a>}
      </div>
    </article>
  );
}
