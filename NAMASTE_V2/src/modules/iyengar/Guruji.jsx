import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';
import Meta from '../shared/seo/Meta.jsx';
import { buildSeo, getGlobalSchemas } from '../shared/seo/seoUtils.js';

export default function GurujiPage(){
  const { dict, lang } = useI18n();
  const d = dict.gurujiPage;
  const { origin, base, hreflangs, canonical } = buildSeo('/guruji');
  const structured = {
    '@context':'https://schema.org',
    '@graph':[{
      '@type':'BreadcrumbList',
      itemListElement:[
        { '@type':'ListItem', position:1, name: lang==='ko'? '홈':'Home', item: origin + '/?lang='+lang },
        { '@type':'ListItem', position:2, name: d.title, item: base + '?lang='+lang }
      ]
    }, {
      '@type':'Person',
      name: 'B.K.S. Iyengar',
      description: d.subtitle,
      sameAs:[
        'https://en.wikipedia.org/wiki/B._K._S._Iyengar'
      ]
    }]
  };
  return (
    <>
  <Meta title={d.title + ' | IYCK'} description={d.subtitle} lang={lang} hreflangs={hreflangs} structuredData={[...getGlobalSchemas(), structured]} canonical={canonical(lang)} />
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
  const d = dict.gurujiPage;
  return (
    <header ref={ref} className="relative overflow-hidden pt-36 pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_70%)] bg-[radial-gradient(circle_at_30%_30%,rgba(86,141,168,0.18),transparent_60%),radial-gradient(circle_at_72%_68%,rgba(50,101,127,0.14),transparent_62%)]" />
      <div className="container-beam flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">{d.title}</h1>
        <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-gray-600">{d.subtitle}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] font-medium tracking-wide">
          {d.badges.map(t=> (
            <span key={t} className="px-3.5 py-2 rounded-full bg-white ring-1 ring-brand-200/70 shadow-sm text-brand-700">{t}</span>
          ))}
        </div>
      </div>
      <div className="h-px w-full mt-16 bg-gradient-to-r from-transparent via-brand-200/70 to-transparent" />
    </header>
  );
}

function Article(){
  const { dict } = useI18n();
  const d = dict.gurujiPage;
  return (
    <main className="bg-white pb-40">
      <div className="container-beam max-w-4xl">
        <div className="grid gap-14">
          <section className="prose prose-neutral max-w-none text-[15px] leading-relaxed [&_h2]:font-serif [&_h2]:tracking-tight [&_h2]:font-semibold [&_h2]:text-brand-800">
            <h2>{d.whoTitle}</h2>
            <figure className="mt-6 mb-8 rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg">
              <div style={{aspectRatio:'3/2'}} className="w-full">
                <img src="/img/bks2.jpg" alt="B.K.S. Iyengar" width="1200" height="800" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </figure>
            {d.introParas.map(p=> <p key={p}>{p}</p>)}
            <figure className="my-10 rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg">
              <div style={{aspectRatio:'3/2'}} className="w-full">
                <img src="/img/bks1.jpg" alt="B.K.S. Iyengar pose" width="1200" height="800" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </figure>
            <h3 className="text-2xl font-semibold text-brand-800 mt-12 mb-4">{d.legacyTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {d.legacyList.map(item=> <li key={item}>{item}</li>)}
            </ul>
            <h3 className="text-2xl font-semibold text-brand-800 mt-12 mb-4">{d.heritageTitle}</h3>
            {d.heritageParas.map(p=> <p key={p}>{p}</p>)}
          </section>
        </div>
      </div>
    </main>
  );
}