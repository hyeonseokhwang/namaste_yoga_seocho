import { useState, useMemo } from 'react';
import Meta from '../shared/seo/Meta.jsx';
import { buildSeo, getGlobalSchemas } from '../shared/seo/seoUtils.js';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';
import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import { ChevronDown } from 'lucide-react';

export default function FAQPage(){
  const { lang, dict } = useI18n();
  const { hreflangs, canonical } = buildSeo('/faq');
  const fp = dict.faqPage;
  const allFaqs = dict.faqFull.items;
  const [open,setOpen]=useState(0);
  const [query,setQuery] = useState('');
  const list = allFaqs.filter(f=> {
    if(!query.trim()) return true;
    const ql = query.trim().toLowerCase();
    return f.q.toLowerCase().includes(ql) || f.a.toLowerCase().includes(ql);
  });
  const allOpen = open === -2; // custom state for expand all
  function toggleAll(){ setOpen(allOpen? -1 : -2); }
  const faqJsonLd = useMemo(()=> ({
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity: allFaqs.map(item => ({
      '@type':'Question',
      name: item.q.replace(/^\d+\.\s*/,''),
      acceptedAnswer: { '@type':'Answer', text: item.a }
    }))
  }),[allFaqs]);
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-brand-50 via-brand-100 to-brand-50">
  <Meta title={fp.title+ ' | IYCK'} description={fp.desc} lang={lang} hreflangs={hreflangs} structuredData={[...getGlobalSchemas(), faqJsonLd]} canonical={canonical(lang)} />
      <NavBar />
      <header className="relative pt-36 pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_30%,rgba(86,141,168,0.20),transparent_65%),radial-gradient(circle_at_80%_70%,rgba(50,101,127,0.18),transparent_62%)] opacity-95" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
        <div className="container-beam max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800" lang={lang}>{fp.title}</h1>
          <p className="mt-5 text-[15px] leading-relaxed text-brand-800/80 max-w-2xl" lang={lang}>{fp.desc}</p>
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-10">
            <label className="text-[12px] font-medium text-brand-700">{fp.search}
              <input value={query} onChange={e=> setQuery(e.target.value)} placeholder={fp.placeholder} className="block mt-1 w-72 px-3 py-2 rounded-md bg-white/80 backdrop-blur border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-400 shadow-sm" />
            </label>
            <div className="flex items-center gap-4 text-[12px] text-brand-600">
              <p className="whitespace-nowrap">{fp.total} {list.length}</p>
              <button onClick={toggleAll} className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-brand-700 text-white text-[11px] tracking-wide shadow hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                {allOpen? fp.collapseAll: fp.expandAll}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 pb-40">
        <div className="container-beam max-w-4xl">
          <div className="mt-10 rounded-3xl border border-brand-300/60 bg-white/70 backdrop-blur-md shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] overflow-hidden">
            {list.map((f,i)=> {
              const isSingleOpen = open===i;
              const expanded = allOpen || isSingleOpen;
              const num = i+1;
              return (
                <div key={i} className={`group border-b last:border-b-0 border-brand-100/60 ${expanded? 'bg-gradient-to-r from-brand-100/80 via-white to-white':'bg-white/50 hover:bg-brand-50/50'} transition-colors`} id={`q${num}`}>
                  <button onClick={()=> setOpen(isSingleOpen? -1:i)} className="w-full text-left px-6 py-5 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    <span className={`mt-0.5 flex-shrink-0 h-5 w-5 grid place-items-center rounded-full text-[11px] font-semibold transition-colors ${expanded? 'bg-brand-600 text-white shadow':'bg-brand-100 text-brand-700 group-hover:bg-brand-200'}`}>{num}</span>
                    <span className="font-medium text-brand-800 tracking-tight text-[15px] leading-snug flex-1">
                      {f.q.replace(/^\d+\.\s*/,'')} {/* remove leading number inside badge area */}
                    </span>
                    <span className={`mt-0.5 text-brand-600 transition-transform ${expanded? 'rotate-180':''}`}><ChevronDown className="h-5 w-5" /></span>
                  </button>
                  <div className={`px-16 pb-6 -mt-1 text-[14px] leading-relaxed text-neutral-700/95 transition-all duration-400 will-change-[max-height,opacity] ${expanded? 'opacity-100 max-h-[320px]':'opacity-0 max-h-0 overflow-hidden'}`}>{f.a}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
