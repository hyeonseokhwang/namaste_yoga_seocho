import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';
// We intentionally do NOT reuse the shorter modal summary; instead we inline the full original text user provided verbatim.

const ORIGINAL_TEXT = `Iyengar Yoga란 무엇인가요?\nIyengar Yoga는 세계적인 요가 스승 아엥가 구루지 (1918–2014) 께서 체계화한 요가 수련법으로,정렬(Alignment), 시퀀스(Sequencing), 시간(Timing)을 핵심 원리로 삼습니다.\n\n이 세 가지 요소는 아사나와 프라나야마의 정확한 수행을 가능하게 하고, 몸과 마음, 지성, 감정, 영혼의 조화를 이루는 깊이 있는 실천으로 수련을 이끕니다.\n\n아엥가 구루지는 요가를 단순한 신체 운동이 아닌 삶을 변화시키는 길로 바라보았으며, 누구나 안전하게 수련할 수 있도록 개인의 조건에 맞춘 도구 활용과 수련법을 개발했습니다.\n\nIyengar Yoga의 주요 특징\n정확한 정렬 (Alignment): 아사나의 정밀한 정렬을 통해 신체 구조에 대한 이해를 높이고, 부정확한 자세나 습관을 교정합니다.\n도구의 활용: 블록, 벨트, 의자, 벽 등 다양한 도구를 활용하여 연령, 체력, 유연성에 관계없이 누구나 안전하고 효과적으로 수련할 수 있도록 돕습니다.\n체계적이고 점진적인 수련 (Sequencing): 초급부터 고급까지 구조화된 시퀀스를 통해 신체적·정신적 균형을 점차 확장해 나갑니다.\n자세 안에서 머무는 시간 (Timing): 아사나를 충분히 유지함으로써 민감성과 인식이 깊어지고, 힘과 유연성, 집중력이 함께 발달합니다.\n치유적 접근: 신체적 불균형이나 회복기에도 적합하며, 요가를 통한 재활과 회복을 도울 수 있습니다.\n프라나야마와 철학의 통합: 아사나 수련을 통해 몸을 정돈한 후, 섬세한 호흡 수련과 요가 철학을 통한 내면 탐구로 이어집니다.\n누구나 수련할 수 있는 요가: Iyengar Yoga는 나이, 체력, 유연성, 경험 여부와 상관없이 누구나 자신에게 맞게 접근할 수 있습니다.\n부상 예방과 회복, 깊이 있는 자기 탐구를 원하는 분들에게 특히 적합합니다.\n\n현재 Iyengar Yoga는 전 세계적으로 깊이 있는 수련 방식으로 자리 잡고 있으며, 한국에서도 많은 이들이 Iyengar Yoga를 통해 몸과 마음의 균형, 그리고 삶의 긍정적 변화를 경험하고 있습니다.\n\n`;

export default function WhatIyengarPage(){
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
    <header ref={ref} className="relative overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_70%)] bg-[radial-gradient(circle_at_22%_32%,rgba(86,141,168,0.18),transparent_60%),radial-gradient(circle_at_78%_68%,rgba(50,101,127,0.14),transparent_62%)]" />
      <div className="container-beam flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">Iyengar Yoga란 무엇인가요?</h1>
        <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-gray-600">정렬 · 시퀀스 · 타이밍 3원리를 통해 신체와 의식을 세밀하게 통합하는 전통 수련법.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] font-medium tracking-wide">
          {['Alignment','Sequencing','Timing','Props'].map(t=> (
            <span key={t} className="px-3.5 py-2 rounded-full bg-white ring-1 ring-brand-200/70 shadow-sm text-brand-700">{t}</span>
          ))}
        </div>
      </div>
      <div className="h-px w-full mt-16 bg-gradient-to-r from-transparent via-brand-200/70 to-transparent" />
    </header>
  );
}

function Article(){
  // Split original text to integrate seamlessly (no separate homework-style box)
  const originalParagraphs = ORIGINAL_TEXT.split(/\n\n/);
  return (
    <main className="bg-white pb-40">
      <div className="container-beam max-w-4xl">
        <article className="prose prose-neutral max-w-none text-[15px] leading-relaxed [&_h1]:font-serif [&_h1]:tracking-tight [&_h1]:font-semibold [&_h1]:text-brand-800">
          {/* Integrated Original Text (verbatim) */}
          {originalParagraphs.map((block, idx)=> {
            if(block.startsWith('Iyengar Yoga란 무엇인가요?')) {
              return <h2 key={idx} className="font-serif tracking-tight text-brand-800">{block}</h2>;
            }
            if(block.trim()==='Iyengar Yoga의 주요 특징') {
              return <h3 key={idx} className="mt-14 font-semibold text-brand-800">{block}</h3>;
            }
            // 특징 목록 줄들을 리스트로 재구성 (원문 라인 그대로 유지)
            if(block.includes('정확한 정렬 (Alignment):') && block.includes('누구나 수련할 수 있는 요가:')) {
              // Split by line breaks within the combined features block (it was originally one paragraph with embedded line breaks)
              const lines = block.split(/\n/).filter(l=> l.trim().length>0);
              return (
                <ul key={idx} className="list-disc pl-5 space-y-2">
                  {lines.map(l=> <li key={l} className="whitespace-pre-wrap">{l}</li>)}
                </ul>
              );
            }
            return <p key={idx}>{block}</p>;
          })}

          

          {/* Supplemental (non-original) explanatory cards – clearly marked */}
          <h2 id="principles" className="mt-24 font-serif tracking-tight text-brand-800">핵심 3원리 요약</h2>
          <p className="text-[14px] text-gray-600">아래 카드는 위 소개 문단(원문) 속 개념들을 한눈에 구조화한 요약입니다.</p>
          <div className="mt-6 grid gap-8 md:grid-cols-3 not-prose">
            {[{t:'Alignment',d:'정밀한 정렬을 통해 구조·신경계의 균형과 민감성 향상'},{t:'Sequencing',d:'점진적 구조: 준비 → 중핵 → 회복으로 단계적 발달'},{t:'Timing',d:'머무름을 통한 감각의 세분화 · 집중 · 내적 확장'}].map(card=> (
              <div key={card.t} className="group relative rounded-2xl p-6 bg-white ring-1 ring-brand-200/60 shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold text-brand-800 tracking-tight mb-2 text-sm">{card.t}</h3>
                <p className="text-[13px] leading-relaxed text-gray-600">{card.d}</p>
                <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(86,141,168,0.15),transparent_65%)] transition" />
              </div>
            ))}
          </div>
          <h2 id="supplement" className="mt-24 font-serif tracking-tight text-brand-800">추가 보강 설명 (Reference)</h2>
          <div className="not-prose mt-6 space-y-10">
            <section className="rounded-xl p-6 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200/60">
              <h3 className="text-sm font-semibold tracking-wide text-brand-800 mb-3">Props (도구)의 역할</h3>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-600">
                <li>정렬 향상: 블록·벨트·의자·볼스터·벽은 관절 각도를 더 명확히 체감하게 함</li>
                <li>접근성 확대: 신체 조건(연령, 가동성, 회복기)에 따른 맞춤 지원</li>
                <li>지속 시간 확보: 안전하게 머무는 시간을 늘려 신경·호흡 인식 발달</li>
                <li>치유적 적용: 특정 부위에 부담을 줄이며 재활·보조 수련 가능</li>
              </ul>
            </section>
            <section className="rounded-xl p-6 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200/60">
              <h3 className="text-sm font-semibold tracking-wide text-brand-800 mb-3">Sequencing의 구조적 사고</h3>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-600">
                <li>Warm-up & Opening: 순환·관절 준비, 호흡 리듬 정돈</li>
                <li>Core Theme: 특정 패밀리(Standing, Forward Extensions, Back Extensions, Inversions 등) 집중</li>
                <li>Counter / Neutralization: 주된 패턴 후 중화 시퀀스로 긴장 재분배</li>
                <li>Recovery & Breath: 회복 아사나 → 프라나야마 전환 혹은 사바사나</li>
              </ul>
            </section>
            <section className="rounded-xl p-6 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200/60">
              <h3 className="text-sm font-semibold tracking-wide text-brand-800 mb-3">Timing이 여는 내적 과정</h3>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-600">
                <li>초기: 기계적 정렬 → 안정 확보</li>
                <li>중기: 호흡 확장 · 감각 미세화 · 분산된 주의 수렴</li>
                <li>심화: Effort → Effortlessness 이행, Pratyahara(감각 수렴) 단서 마련</li>
              </ul>
            </section>
            <section className="rounded-xl p-6 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200/60">
              <h3 className="text-sm font-semibold tracking-wide text-brand-800 mb-3">Typical Benefits (범용 정리)</h3>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-600">
                <li>Postural Re-education & Core Stability</li>
                <li>Mobility + Strength 동시 발달(균형 잡힌 부하)</li>
                <li>Nervous System Regulation & Stress Modulation</li>
                <li>Injury Prevention & 재활 보조</li>
                <li>호흡 인식 향상 및 집중·감정 조절력 증진</li>
              </ul>
            </section>
            <section className="rounded-xl p-6 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200/60">
              <h3 className="text-sm font-semibold tracking-wide text-brand-800 mb-3">Practice Scope (수련 스펙트럼)</h3>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-600">
                <li>Standing / Forward Extensions / Back Extensions / Twists</li>
                <li>Inversions & Arm Balances (조건·단계화된 접근)</li>
                <li>Restorative & Therapeutic Applications</li>
                <li>Pranayama 준비: 흉곽 확장 · 척추 연장 · 신경 안정</li>
              </ul>
            </section>
            <section className="rounded-xl p-6 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200/60">
              <h3 className="text-sm font-semibold tracking-wide text-brand-800 mb-3">Pedagogy & Teaching Ethos</h3>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-600">
                <li>Observation → Adjustment → Integration 루프</li>
                <li>Clear Verbal Cues + Demonstration + Prop Adaptation</li>
                <li>Ethics: 정직한 Self-Study(Svadhyaya) · 규율(Tapas) · 헌신(Ishvara Pranidhana)</li>
                <li>계층적 학습: 기초 안정 → 심화 감각 → 미세 내면화</li>
              </ul>
            </section>
            <section className="rounded-xl p-6 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-200/60">
              <h3 className="text-sm font-semibold tracking-wide text-brand-800 mb-3">연관 페이지</h3>
              <p className="text-[13px] text-gray-600 mb-2">더 깊이 있는 전통 이해를 위해 아래 자료도 참고하세요.</p>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-brand-700">
                <li><a href="/guruji" className="underline decoration-dotted hover:text-brand-900">구루지 소개</a></li>
                <li><a href="/iyck" className="underline decoration-dotted hover:text-brand-900">IYCK 소개</a></li>
                <li><a href="/iyengar/ciyt" className="underline decoration-dotted hover:text-brand-900">CIYT (공인 교사) 안내 – 준비 중</a></li>
              </ul>
            </section>
          </div>
        </article>
        {/* Beginner Friendly Deep-Dive (added content, clearly supplemental) */}
        <section id="beginner-guide" className="mt-32 space-y-20">
          <header className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800">처음 보는 분들을 위한 이해 가이드</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-600">Alignment · Props · Sequencing · Timing 네 가지를 시각과 비유로 풀어 아주 처음 접하는 분도 바로 감을 잡도록 구성했습니다.</p>
          </header>
          {/* Alignment */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <h3 className="text-xl font-semibold tracking-tight text-brand-800">1. Alignment (정렬)</h3>
              <p className="text-[15px] leading-relaxed text-gray-700">정렬은 <strong>관절 · 뼈대 · 근육 · 호흡</strong>이 서로 “밀거나(press)” “뻗고(extend)” “균형을 나누는(distribute)” 방향을 명확히 해 에너지가 새지 않도록 통합하는 과정입니다.</p>
              <ul className="list-disc pl-5 space-y-2 text-[14px] text-gray-700">
                <li><strong>안전성:</strong> 관절을 과하게 꺾지 않고 하중을 넓게 분산</li>
                <li><strong>효율성:</strong> 불필요한 힘(긴장)을 덜고 핵심 작용 부위는 또렷하게</li>
                <li><strong>내적 민감성:</strong> 세밀한 접촉·압·길이 변화를 감지하는 감각 훈련</li>
                <li><strong>정신 집중:</strong> 구조를 관찰·수정하는 과정 자체가 마음을 현재로 고정</li>
              </ul>
              <p className="text-[14px] text-gray-600">비유: 물이 새는 정수기(비효율 신체 패턴)를 고쳐 물줄기(호흡/에너지)가 낭비 없이 일정하게 흐르도록 만드는 과정.</p>
              <div className="not-prose grid gap-3 sm:grid-cols-2">
                {[{t:'균형',d:'좌/우 · 앞/뒤 하중 분배'},{t:'축(Axis)',d:'척추&긴 관절의 길이 유지'},{t:'근막 라인',d:'끊김 없이 연속성'},{t:'호흡',d:'가슴·늑간 확장 확보'}].map(x=> (
                  <div key={x.t} className="rounded-lg p-4 bg-white ring-1 ring-brand-200/60">
                    <p className="text-[12px] font-semibold text-brand-800">{x.t}</p>
                    <p className="mt-1 text-[12px] text-gray-600 leading-relaxed">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure className="relative rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg bg-white">
              <img src="/img/practice1.jpg" alt="Alignment 데모 – 다리와 척추를 길게 뻗으며 벽을 이용해 정렬을 체감" className="w-full h-full object-cover object-center" loading="lazy" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-white/70 backdrop-blur px-4 py-2 text-[11px] text-gray-700">벽/바닥 접촉면을 활용해 축과 방향성을 명확히 인지</figcaption>
            </figure>
          </div>
          {/* Props */}
          <div className="grid md:grid-cols-2 gap-12 items-start md:items-stretch">
            <figure className="order-last md:order-first relative rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg bg-white">
              <img src="/img/practice2.jpg" alt="Props 활용 – 블록과 벨트를 이용한 안정된 자세 지원" className="w-full h-full object-cover object-center" loading="lazy" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-white/70 backdrop-blur px-4 py-2 text-[11px] text-gray-700">높이·거리 보정으로 안전한 머무름 확보</figcaption>
            </figure>
            <div className="space-y-5">
              <h3 className="text-xl font-semibold tracking-tight text-brand-800">2. Props (도구)</h3>
              <p className="text-[15px] leading-relaxed text-gray-700">Props는 “약점 보정”이 아니라 <strong>정렬·호흡·체험을 ‘명확화’</strong>하는 확장 도구입니다. 개인 조건(유연성, 근력, 회복 상태)에 맞춰 <em>같은 핵심 경험</em>에 접근하도록 돕습니다.</p>
              <div className="not-prose grid gap-3 sm:grid-cols-2">
                {[{t:'Block',d:'손/골반/등 높이 조절'},{t:'Belt',d:'범위 유지·균형·각도 안정'},{t:'Chair',d:'역자세·전굴 지원'},{t:'Wall',d:'축/방향·저항 피드백'}].map(x=> (
                  <div key={x.t} className="rounded-lg p-4 bg-white ring-1 ring-brand-200/60">
                    <p className="text-[12px] font-semibold text-brand-800">{x.t}</p>
                    <p className="mt-1 text-[12px] text-gray-600 leading-relaxed">{x.d}</p>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-gray-600">결과: 더 오래·안전하게 머무르며 신경계가 ‘편안한 정렬’을 학습 → 내면 감각 정교화.</p>
            </div>
          </div>
          {/* Sequencing */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold tracking-tight text-brand-800">3. Sequencing (시퀀스 구성)</h3>
              <p className="text-[15px] leading-relaxed text-gray-700">시퀀스는 <strong>“준비 → 핵심 주제 → 회복/통합”</strong>의 논리. 한 수련이 다음 수련의 조건을 열도록 설계하여 누적 효과를 만든 뒤 과부하 없이 정리합니다.</p>
              <div className="not-prose overflow-hidden rounded-2xl ring-1 ring-brand-200/60 divide-y divide-brand-100 bg-white">
                {[{step:'1. Ground & Warm',focus:'호흡 리듬 & 발/다리 각성',ex:'Tadasana 변형, Uttanasana 준비'},{step:'2. Mobilize',focus:'척추·어깨 관절 부드러운 가동',ex:'Adho Mukha Svanasana, simple twists'},{step:'3. Core Theme',focus:'Standing / Hip openers / Back extension 등 집중',ex:'Trikonasana → Ardha Chandrasana 등'},{step:'4. Deep / Peak',focus:'주제 심화 혹은 변형',ex:'역자세 준비 Shoulder work, Supported backbend'},{step:'5. Neutralize',focus:'긴장 재분배·중화',ex:'Uttanasana, gentle twist'},{step:'6. Recovery & Breath',focus:'신경계 안정·내향 전환',ex:'설계된 사바사나 혹은 간단한 프라나야마 준비'}].map(row=> (
                  <div key={row.step} className="grid md:grid-cols-12 p-4 text-[12px] md:text-[13px] gap-3">
                    <div className="md:col-span-2 font-semibold text-brand-700 tracking-tight">{row.step}</div>
                    <div className="md:col-span-4 text-gray-700">{row.focus}</div>
                    <div className="md:col-span-6 text-gray-500">예: {row.ex}</div>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-gray-600">이 구조는 과도한 피로 누적·부상 위험을 낮추고 집중(Attention Curve)을 자연스럽게 유지합니다.</p>
            </div>
          {/* Timing */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <h3 className="text-xl font-semibold tracking-tight text-brand-800">4. Timing (머무름)</h3>
              <p className="text-[15px] leading-relaxed text-gray-700">머무름은 <strong>“정렬 → 안정 → 관찰 → 세분화”</strong> 단계를 거쳐 Effort가 점차 Effortlessness로 전환되는 지점을 찾는 과정입니다.</p>
              <ol className="list-decimal pl-5 space-y-2 text-[14px] text-gray-700">
                <li><strong>Enter:</strong> 기본 형태·안전 확보</li>
                <li><strong>Refine:</strong> 축 길이/폭 균형 재조정</li>
                <li><strong>Observe:</strong> 호흡·촉감·압력 지도(Body Map) 읽기</li>
                <li><strong>Dwell:</strong> 긴장 분산 & 필요 근육만 미세 유지</li>
                <li><strong>Release:</strong> 부드럽게 나와 여운 체감</li>
              </ol>
              <p className="text-[13px] text-gray-600">적절한 Timing은 <em>신경계 적응(Neuroplasticity)</em>과 <em>호흡-정신 집중 결합</em>을 촉진.</p>
            </div>
            <figure className="relative rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg bg-white">
              <img src="/img/practice3.jpg" alt="Timing 과정 – 안정된 머무름에서 호흡과 정렬을 미세 조정" className="w-full h-full object-cover object-center" loading="lazy" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-white/70 backdrop-blur px-4 py-2 text-[11px] text-gray-700">Effort → Effortlessness 전환 감지 구간</figcaption>
            </figure>
          </div>
          {/* Safety & Quick Start */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-tight text-brand-800">5. 안전 & 시작 팁</h3>
            <ul className="list-disc pl-5 space-y-2 text-[14px] text-gray-700">
              <li>통증(pain) ≠ 강한 느낌(intensity). 통증 발생 시 즉시 강도·각도 조정.</li>
              <li>벽·블록·벨트는 ‘의존’이 아니라 중립 정렬을 ‘학습’하는 임시 교사.</li>
              <li>호흡이 거칠어지면 범위를 10~20% 축소 후 다시 안정된 리듬 확보.</li>
              <li>수련 전 과식/강한 운동 직후 피함. 빈혈/고혈압/눈압 등 특이사항은 전문 지도자 상담.</li>
              <li>Consistency &gt; Intensity: 짧더라도 규칙적 수련이 구조·신경 적응 촉진.</li>
            </ul>
            <p className="text-[13px] text-gray-500">※ 본 보강 섹션은 국제 Iyengar Yoga 협회 및 대표 연구소들에서 공통적으로 강조하는 교육 포인트를 일반화해 작성한 안내이며, 의료적 진단/처방이 아닙니다.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
