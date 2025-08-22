import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';

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
    <header ref={ref} className="relative overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="container-beam text-center max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">프로그램 안내</h1>
        <p className="mt-6 text-[15px] md:text-base leading-relaxed text-gray-600">워크숍 · 공개 수업 · 교사 연수 · 커뮤니티 모임을 통해 Iyengar Yoga의 깊이를 단계적으로 체험합니다.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-[11px] font-medium tracking-wide">
          {['Workshop','Intro Class','Mentorship','Community'].map(t=> <span key={t} className="px-3.5 py-2 rounded-full bg-white ring-1 ring-brand-200/70 shadow-sm text-brand-700">{t}</span>)}
        </div>
      </div>
      <div className="h-px w-full mt-16 bg-gradient-to-r from-transparent via-brand-200/70 to-transparent" />
    </header>
  );
}

function ProgramsOverview(){
  return (
    <main className="bg-white pb-40">
      <div className="container-beam max-w-5xl">
        <section className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800">Iyengar Yoga 커뮤니티 워크숍과 프로그램 안내</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-gray-700"><strong>IYCK</strong>는 정기적인 워크숍과 프로그램을 통해 수련자들이 Iyengar Yoga의 깊이를 체험하고, 공동체와 함께 성장할 수 있는 기회를 제공합니다.</p>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-700">이 프로그램들은 초보자부터 숙련자까지, 누구나 참여할 수 있으며 Iyengar Yoga의 철학과 수련을 실제로 경험할 수 있는 장을 열어갑니다.</p>
        </section>

        <section className="mt-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h3 className="text-xl font-semibold tracking-tight text-brand-800 mb-4">주요 프로그램</h3>
            <ul className="list-disc pl-5 space-y-2 text-[14px] text-gray-700">
              <li><strong>정기 워크숍</strong> – 특정 아사나, 호흡법, 수련 주제를 심화 학습</li>
              <li><strong>공개 수업</strong> – 처음 Iyengar Yoga를 접하는 분들을 위한 무료/체험 클래스</li>
              <li><strong>교사 연수</strong> – 공인 교사 및 수련생을 위한 전문적 교육 과정</li>
              <li><strong>커뮤니티 모임</strong> – 회원 간의 교류와 공동체 활동</li>
            </ul>
            <p className="mt-6 text-[14px] text-gray-600">각 프로그램의 일정과 신청 방법은 추후 홈페이지 및 커뮤니티 채널을 통해 안내됩니다.</p>
            <div className="mt-6 flex flex-wrap gap-3 not-prose">
              <a href="/programs/workshops" className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-white px-5 py-2 text-[13px] font-medium shadow-soft-lg hover:bg-brand-500 transition">워크숍 상세/지난 기록 →</a>
              <a href="/" className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-brand-200/70 text-brand-700 px-5 py-2 text-[13px] font-medium hover:bg-brand-50 transition">HOME</a>
            </div>
          </div>
          <aside className="md:col-span-5 space-y-5 not-prose">
            <ProgramCard img="/img/practice2.jpg" caption="주제별 워크숍: Standing · Back Extension · Pranayama 준비 등 구조화된 심화" />
            <ProgramCard img="/img/practice3.jpg" caption="커뮤니티 모임: 수련 경험 공유 & 질문/탐구 정리로 학습 지속성 강화" />
          </aside>
        </section>

        {/* 진행중 / 예정 (Featured) */}
        <section id="upcoming" className="mt-28">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800">진행중 / 예정</h3>
            <a href="/" className="text-[12px] font-medium text-brand-700 hover:text-brand-600">HOME →</a>
          </div>
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-brand-200/70 bg-white shadow-soft-lg md:flex group">
            <div className="md:w-1/2 relative h-72 md:h-auto">
              <img src="/img/class/KakaoTalk_20250818_091833656_01.jpg" alt="Eyal Shifroni 워크숍 이미지 1" className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-700" loading="lazy" />
              <img src="/img/class/KakaoTalk_20250818_091833656_02.jpg" alt="Eyal Shifroni 워크숍 이미지 2" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/0 to-black/0 pointer-events-none" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-100/90 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">FEATURED</span>
                <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">WORKSHOP</span>
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
              <header className="space-y-3">
                <h4 className="text-[12px] font-medium tracking-widest text-brand-600">2025 SEPTEMBER</h4>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">Eyal Shifroni 선생님 9월 워크숍</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700">첫 공식 한국 방문. Iyengar Yoga 정렬·프롭·시퀀스·티칭 통합 접근을 3일 집중 구조로 체험합니다.</p>
              </header>
              <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                <ul className="space-y-2 text-gray-700">
                  <li><strong className="text-brand-700">일정:</strong> 9/12 14:00–17:00</li>
                  <li><strong className="text-brand-700">세션:</strong> 9/13~14 09:30–12:30 · 14:30–16:30</li>
                  <li><strong className="text-brand-700">총시간:</strong> 15시간</li>
                  <li><strong className="text-brand-700">장소:</strong> 공간 920 (강남 역삼로9길 20 B1)</li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li><strong className="text-brand-700">수강료:</strong> 429,000원 (VAT 포함)</li>
                  <li><strong className="text-brand-700">문의:</strong> 김명규 · 홍윤서 · 김아람</li>
                  <li><strong className="text-brand-700">이메일:</strong> iyengaryogacommunitykorea@gmail.com</li>
                  <li><strong className="text-brand-700">포커스:</strong> 정렬·프롭 통합 / 주제별 시퀀스 / 카운터 & 회복</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#register" className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-white px-6 py-3 text-[13px] font-medium shadow-soft-lg hover:bg-brand-500 transition">Register</a>
                <a href="/gallery?folder=gallery/Namaste_Yoga/GeorgeDovas" className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-brand-200/70 text-brand-700 px-6 py-3 text-[13px] font-medium hover:bg-brand-50 transition">지난 워크숍 사진</a>
                <a href="/programs/workshops" className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-brand-200/70 text-brand-700 px-6 py-3 text-[13px] font-medium hover:bg-brand-50 transition">전체 워크숍 목록</a>
              </div>
              <p className="text-[11px] text-gray-400">※ 시간/구성은 상황에 따라 일부 조정될 수 있습니다.</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-black/0 group-hover:ring-brand-300/60 transition" />
          </div>
        </section>

        <Timeline />
      </div>
    </main>
  );
}

function ProgramCard({img, caption}){
  return (
    <div className="relative rounded-2xl overflow-hidden ring-1 ring-brand-200/60 bg-white shadow-sm">
      <img src={img} alt={caption} className="w-full h-52 object-cover object-center" loading="lazy" />
      <div className="p-4">
        <p className="text-[12px] text-gray-600 leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}

function Timeline(){
  return (
    <section className="mt-28">
      <h3 className="text-xl font-semibold tracking-tight text-brand-800 mb-6">지난 워크숍 (요약)</h3>
      <div className="grid md:grid-cols-3 gap-8 text-[13px] text-gray-700">
        <div>
          <h4 className="font-semibold text-brand-700">2025</h4>
          <ul className="mt-2 space-y-2 list-disc pl-4">
            <li>7월 19–20일 — George Dovas 선생님 (서울) <a href="/gallery?folder=gallery/Namaste_Yoga/GeorgeDovas" className="text-brand-600 hover:underline">사진</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-700">2024</h4>
          <ul className="mt-2 space-y-2 list-disc pl-4">
            <li>11월 — 홍귀석 선생님 워크숍</li>
            <li>7월 — Justin Herold 선생님 (멘토십 준비반)</li>
            <li>4월 — Justin Herold 선생님 (멘토십 준비반)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-700">2023</h4>
          <ul className="mt-2 space-y-2 list-disc pl-4">
            <li>10월 — Justin Herold 선생님</li>
            <li>4월 — 홍귀석 선생님</li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-[12px] text-gray-500">※ 상세 사진 및 추가 연도는 워크숍 상세 페이지에서 순차 업데이트 예정.</p>
    </section>
  );
}
