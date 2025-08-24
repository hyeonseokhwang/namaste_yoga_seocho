import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';
import Meta from '../shared/seo/Meta.jsx';
import { getGlobalSchemas } from '../shared/seo/seoUtils.js';
// We intentionally do NOT reuse the shorter modal summary; instead we inline the full original text user provided verbatim.

const ORIGINAL_TEXT = `Iyengar Yoga란 무엇인가요?\nIyengar Yoga는 세계적인 요가 스승 아엥가 구루지 (1918–2014) 께서 체계화한 요가 수련법으로,정렬(Alignment), 시퀀스(Sequencing), 시간(Timing)을 핵심 원리로 삼습니다.\n\n이 세 가지 요소는 아사나와 프라나야마의 정확한 수행을 가능하게 하고, 몸과 마음, 지성, 감정, 영혼의 조화를 이루는 깊이 있는 실천으로 수련을 이끕니다.\n\n아엥가 구루지는 요가를 단순한 신체 운동이 아닌 삶을 변화시키는 길로 바라보았으며, 누구나 안전하게 수련할 수 있도록 개인의 조건에 맞춘 도구 활용과 수련법을 개발했습니다.\n\nIyengar Yoga의 주요 특징\n정확한 정렬 (Alignment): 아사나의 정밀한 정렬을 통해 신체 구조에 대한 이해를 높이고, 부정확한 자세나 습관을 교정합니다.\n도구의 활용: 블록, 벨트, 의자, 벽 등 다양한 도구를 활용하여 연령, 체력, 유연성에 관계없이 누구나 안전하고 효과적으로 수련할 수 있도록 돕습니다.\n체계적이고 점진적인 수련 (Sequencing): 초급부터 고급까지 구조화된 시퀀스를 통해 신체적·정신적 균형을 점차 확장해 나갑니다.\n자세 안에서 머무는 시간 (Timing): 아사나를 충분히 유지함으로써 민감성과 인식이 깊어지고, 힘과 유연성, 집중력이 함께 발달합니다.\n치유적 접근: 신체적 불균형이나 회복기에도 적합하며, 요가를 통한 재활과 회복을 도울 수 있습니다.\n프라나야마와 철학의 통합: 아사나 수련을 통해 몸을 정돈한 후, 섬세한 호흡 수련과 요가 철학을 통한 내면 탐구로 이어집니다.\n누구나 수련할 수 있는 요가: Iyengar Yoga는 나이, 체력, 유연성, 경험 여부와 상관없이 누구나 자신에게 맞게 접근할 수 있습니다.\n부상 예방과 회복, 깊이 있는 자기 탐구를 원하는 분들에게 특히 적합합니다.\n\n현재 Iyengar Yoga는 전 세계적으로 깊이 있는 수련 방식으로 자리 잡고 있으며, 한국에서도 많은 이들이 Iyengar Yoga를 통해 몸과 마음의 균형, 그리고 삶의 긍정적 변화를 경험하고 있습니다.\n\n`;

export default function WhatIyengarPage(){
  const { dict, lang } = useI18n();
  const d = dict.whatPage;
  const runtime = typeof window !== 'undefined';
  // Fixed public origin for customer preview
  const origin = runtime ? window.location.origin : 'http://203.236.91.172:5174';
  const pathname = '/what';
  const base = origin + pathname;
  const hreflangs = [
    { lang: 'ko', href: base + '?lang=ko' },
    { lang: 'en', href: base + '?lang=en' },
    { lang: 'x-default', href: base + '?lang=en' }
  ];
  const breadcrumb = {
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      { '@type':'ListItem', position:1, name: lang==='ko'? '홈':'Home', item: origin + '/?lang='+lang },
      { '@type':'ListItem', position:2, name: d.title, item: base + '?lang='+lang }
    ]
  };
  return (
    <>
  <Meta title={d.title + ' | IYCK'} description={d.subtitle} lang={lang} hreflangs={hreflangs} structuredData={[...getGlobalSchemas(), breadcrumb]} canonical={base + (lang? ('?lang='+lang):'')} />
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
  const { dict } = useI18n();
  const d = dict.whatPage;
  return (
    <header ref={ref} className="relative overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_70%)] bg-[radial-gradient(circle_at_22%_32%,rgba(86,141,168,0.18),transparent_60%),radial-gradient(circle_at_78%_68%,rgba(50,101,127,0.14),transparent_62%)]" />
      <div className="container-beam flex flex-col items-center text-center">
  <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">{d.title}</h1>
  <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-gray-600">{d.subtitle}</p>
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
  // Split original text to integrate in current site layout
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
        </article>
        {/* Only legacy content above; no additional explanatory sections */}
      </div>
    </main>
  );
}
