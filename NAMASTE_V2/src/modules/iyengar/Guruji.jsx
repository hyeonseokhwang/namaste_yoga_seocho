import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';

export default function GurujiPage(){
  return (
    <>
      <div id="top" />
      <NavBar />
      <Hero />
      <Article />
      <div id="contact"><Footer /></div>
    </>
  );
}

function Hero(){
  const ref = useScrollReveal();
  return (
    <header ref={ref} className="relative overflow-hidden pt-36 pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_70%)] bg-[radial-gradient(circle_at_30%_30%,rgba(86,141,168,0.18),transparent_60%),radial-gradient(circle_at_72%_68%,rgba(50,101,127,0.14),transparent_62%)]" />
      <div className="container-beam flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">B.K.S. Iyengar</h1>
        <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-gray-600">현대 요가의 한 축을 세운 세계적 스승, 정렬과 주의 깊음으로 요가를 누구나 접근 가능한 보편적 실천으로 확장한 구루지.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] font-medium tracking-wide">
          {['1918–2014','Light on Yoga','RIMYI 설립','Time 100 (2004)'].map(t=> (
            <span key={t} className="px-3.5 py-2 rounded-full bg-white ring-1 ring-brand-200/70 shadow-sm text-brand-700">{t}</span>
          ))}
        </div>
      </div>
      <div className="h-px w-full mt-16 bg-gradient-to-r from-transparent via-brand-200/70 to-transparent" />
    </header>
  );
}

function Article(){
  return (
    <main className="bg-white pb-40">
      <div className="container-beam max-w-4xl">
        <div className="grid gap-14">
          <section className="prose prose-neutral max-w-none text-[15px] leading-relaxed [&_h2]:font-serif [&_h2]:tracking-tight [&_h2]:font-semibold [&_h2]:text-brand-800">
            <h2>B.K.S. Iyengar는 누구인가요?</h2>
            <figure className="mt-6 mb-8 rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg">
              <img src="/img/bks2.jpg" alt="B.K.S. Iyengar" className="w-full h-auto object-cover" />
            </figure>
            <p><strong>B.K.S. Iyengar</strong> (Bellur Krishnamachar Sundararaja Iyengar, 1918–2014, 이하 아엥가 구루지)는 현대 요가를 대표하는 세계적인 요가 스승입니다.  그는 요가를 과학적이고 체계적으로 정립하여, 누구나 안전하게 접근할 수 있도록 길을 연 인물로 널리 알려져 있습니다.</p>
            <p>인도에서 태어난 그는 어린 시절 병약했으나, 요가 수련을 통해 스스로를 치유하고 단련했으며,  이후 평생에 걸쳐 요가의 본질과 깊이를 탐구했습니다.  특히 아사나(요가 자세)의 정렬과 정밀한 수행을 통해 신체, 마음, 지성, 감정, 영혼이 조화롭게 연결되는 길을 제시했고,  이를 전 세계 수련자들과 나누며 가르쳤습니다.</p>
            <p>아엥가요가는 아엥가 구루지의 철학과 접근 방식을 바탕으로 발전한 수련법으로,  정확한 정렬, 주의 깊은 관찰, 꾸준한 연습을 중시합니다.  또한 블록, 벨트, 의자, 벽 등 다양한 도구를 활용해 연령, 성별, 유연성, 체력, 질환 여부와 관계없이  누구나 요가의 본질과 효과를 경험할 수 있도록 안내합니다.  이러한 접근은 요가의 깊이를 안전하고 체계적으로 전달하는 데 중요한 역할을 했습니다.</p>
            <figure className="my-10 rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg">
              <img src="/img/bks1.jpg" alt="B.K.S. Iyengar pose" className="w-full h-auto object-cover" />
            </figure>
            <h3 className="text-2xl font-semibold text-brand-800 mt-12 mb-4">주요 이력</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>1918년 인도 벨루르에서 출생</li>
              <li>1934년 스승 T. 크리슈나마차리아에게서 요가를 배우기 시작</li>
              <li>1950년대 서양 세계에 요가를 알리기 시작</li>
              <li>1966년 현대 요가의 고전으로 불리는 『Light on Yoga』 출간</li>
              <li>1975년 인도 푸네에 라마마니 아엥가르 기념 요가 연구소(RIMYI) 설립</li>
              <li>2004년 타임지가 선정한 ‘세계에서 가장 영향력 있는 100인’에 포함</li>
              <li>2014년 인도 정부로부터 Padma Vibhushan 훈장 수훈</li>
            </ul>
            <h3 className="text-2xl font-semibold text-brand-800 mt-12 mb-4">요가 지도자로서의 유산</h3>
            <p>아엥가 구루지는 생애 끝까지 요가의 길 위에 서 계셨으며,  요가가 단순한 신체 운동이 아니라 삶을 깊이 있게 변화시키는 실천임을 몸소 보여주었습니다.</p>
            <p>그가 남긴 가르침은 단순한 수련법이 아니라, 자신의 몸과 마음을 정직하게 바라보고 조율하는  ‘삶의 태도’로 이어지고 있으며, 제자들과 가족들의 변함없는 헌신으로 지금도 살아 전해지고 있습니다.  많은 사람들이 그가 보여준 길 위에서 자신의 균형을 찾고, 스스로를 돌아보는 여정을 계속하고 있습니다.</p>
          </section>
        </div>
      </div>
    </main>
  );
}