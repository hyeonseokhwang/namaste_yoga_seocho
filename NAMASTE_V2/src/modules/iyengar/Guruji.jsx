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
  <header ref={ref} className="relative overflow-hidden pt-24 md:pt-36 pb-12 md:pb-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-brand-50/50 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_72%)] bg-[radial-gradient(circle_at_24%_30%,rgba(86,141,168,0.12),transparent_65%),radial-gradient(circle_at_76%_68%,rgba(50,101,127,0.10),transparent_62%)]" />
      <div className="container-beam flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">{d.title}</h1>
  <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-gray-600">{d.subtitle}</p>
  <div className="mt-8 md:mt-9 flex flex-wrap justify-center gap-2.5 text-[11px] font-medium tracking-wide">
          {d.badges.map(t=> (
            <span key={t} className="px-3.5 py-2 rounded-full bg-white ring-1 ring-brand-200/70 shadow-sm text-brand-700">{t}</span>
          ))}
        </div>
      </div>
  <div className="h-px w-full mt-3 md:mt-5 bg-gradient-to-r from-transparent via-brand-200/60 to-transparent" />
    </header>
  );
}

function Article(){
  const { dict } = useI18n();
  const d = dict.gurujiPage;
  return (
  <main className="bg-white pb-40">
      <div className="container-beam max-w-4xl">
    <section className="mx-auto max-w-3xl text-[16px] leading-relaxed md:leading-8 prose prose-neutral prose-p:my-3 md:prose-p:my-4 prose-ul:my-3 md:prose-ul:my-4 [&_h2]:font-serif [&_h2]:tracking-tight [&_h2]:font-semibold [&_h2]:text-brand-800 [&_h2]:mt-0 [&_h2]:mb-3 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:text-brand-800">
            <h2>{d.whoTitle}</h2>
            <figure className="mt-1 mb-5 rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg">
              <img src="/img/bks2.jpg" alt="B.K.S. Iyengar" width="1200" height="800" className="w-full h-auto object-center" loading="lazy" decoding="async" />
            </figure>
            {d.introParas.map(p=> <p key={p}>{p}</p>)}
            <figure className="my-6 rounded-2xl overflow-hidden ring-1 ring-brand-200/60 shadow-soft-lg">
              <img src="/img/bks1.jpg" alt="B.K.S. Iyengar pose" width="1200" height="800" className="w-full h-auto object-center" loading="lazy" decoding="async" />
            </figure>
      <div className="h-px w-full my-8 md:my-10 bg-gradient-to-r from-transparent via-brand-200/50 to-transparent" />
      <h3 className="text-2xl font-semibold text-brand-800 mt-10 mb-4">{d.legacyTitle}</h3>
            <ul className="list-disc pl-5 space-y-1.5 md:space-y-2 md:columns-2 md:gap-x-10">
              {d.legacyList.map(item=> <li className="break-inside-avoid" key={item}>{item}</li>)}
            </ul>
      <div className="h-px w-full my-8 md:my-10 bg-gradient-to-r from-transparent via-brand-200/50 to-transparent" />
      <h3 className="text-2xl font-semibold text-brand-800 mt-8 mb-4">{d.heritageTitle}</h3>
            {d.heritageParas.map(p=> <p key={p}>{p}</p>)}
        </section>
      </div>
    </main>
  );
}