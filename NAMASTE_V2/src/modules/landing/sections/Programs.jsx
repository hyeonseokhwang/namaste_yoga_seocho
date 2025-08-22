// Secondary (non-feature) focus items
const secondaryItems = [
  { tag:'Therapeutics', title:'Back Care Intensive', desc:'정렬 중심 회복 & 허리 안정 세션.' },
  { tag:'Breath', title:'Pranayama Grounding', desc:'의식적 호흡 기반의 집중과 신경계 안정.' },
];
import useScrollReveal from '../hooks/useScrollReveal.js';
export default function Programs(){
  const ref = useScrollReveal();
  return (
  <section id="programs" ref={ref} className="py-24 bg-gradient-to-b from-white via-gray-50 to-white will-change-transform">
      <div className="container-beam">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">Upcoming Focus</h2>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">정확한 아사나와 의식적 호흡을 심화하는 집중 프로그램. 소규모 진행으로 개별 조정과 세밀한 피드백을 제공합니다.</p>
          </div>
          <button className="self-start md:self-auto text-sm rounded-full bg-brand-600 text-white px-5 py-2.5 font-medium shadow-soft-lg hover:bg-brand-500 transition">
            전체 일정 보기
          </button>
        </div>
        {/* Featured Workshop (legacy-like emphasis) */}
        <div className="mb-20">
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-brand-200/70 bg-white shadow-soft-lg md:flex group">
            {/* Image panel */}
            <div className="md:w-1/2 relative h-72 md:h-auto">
              <img src="/img/class/KakaoTalk_20250818_091833656_01.jpg" alt="Eyal Shifroni 워크숍 수련 이미지 1" className="absolute inset-0 w-full h-full object-cover object-center opacity-100 group-hover:opacity-0 transition-opacity duration-700" loading="lazy" />
              <img src="/img/class/KakaoTalk_20250818_091833656_02.jpg" alt="Eyal Shifroni 워크숍 수련 이미지 2" className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/0 to-black/0 pointer-events-none" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-100/90 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">FEATURED</span>
                <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">WORKSHOP</span>
              </div>
            </div>
            {/* Content panel */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
              <header className="space-y-3">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">Eyal Shifroni 선생님 9월 워크숍</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700">첫 공식 한국 방문. Iyengar Yoga의 깊이 있는 정렬·프롭·티칭 접근을 3일 집중 구조로 체험합니다.</p>
              </header>
              <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
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
                <a href="/programs#upcoming" className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-white px-6 py-3 text-[13px] font-medium shadow-soft-lg hover:bg-brand-500 transition">상세 / 신청 안내 →</a>
                <a href="/gallery?folder=gallery/Namaste_Yoga/GeorgeDovas" className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-brand-200/70 text-brand-700 px-6 py-3 text-[13px] font-medium hover:bg-brand-50 transition">지난 워크숍 사진</a>
              </div>
              <p className="text-[11px] text-gray-400">※ 일정/구성은 상황에 따라 일부 조정될 수 있습니다.</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-black/0 group-hover:ring-brand-300/60 transition" />
          </div>
        </div>

        {/* Secondary focus cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {secondaryItems.map(it=> (
            <div key={it.title} className="group rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm hover:shadow-md transition relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(43,90,114,0.12),transparent_60%)] transition" />
              <span className="relative inline-flex items-center gap-2 text-[11px] uppercase tracking-wide font-medium text-brand-700 bg-brand-100 rounded-full px-3 py-1">{it.tag}</span>
              <h3 className="relative mt-4 font-semibold text-gray-900 tracking-tight text-lg">{it.title}</h3>
              <p className="relative mt-2 text-[13px] text-gray-500 leading-relaxed">{it.desc}</p>
              <div className="relative mt-6 flex items-center justify-between text-sm">
                <a href="/programs" className="text-brand-700 hover:text-brand-600 font-medium text-[13px]">자세히 →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
