import { useMemo } from 'react';
import teachersData from '../landing/shared/teachersData.js';
import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';
import Meta from '../shared/seo/Meta.jsx';
import { buildSeo, getGlobalSchemas } from '../shared/seo/seoUtils.js';

// Locale aware comparator for Korean (ㄱㄴㄷㄹㅁ ...). Fallback to string compare if not supported.
const collator = typeof Intl !== 'undefined' ? new Intl.Collator('ko-KR') : null;

// (초성 그룹 네비 제거 요청으로 관련 로직 제외)

export default function TeachersPage(){
  const { dict, lang } = useI18n();
  const d = dict.teachersPage;
  const { origin, base, hreflangs, canonical } = buildSeo('/teachers');
  const breadcrumb = {
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
  { '@type':'ListItem', position:1, name: lang==='ko'? '홈':'Home', item: origin + '/?lang='+lang },
      { '@type':'ListItem', position:2, name: d.title, item: base + '?lang='+lang }
    ]
  };
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
  <Meta title={d.title + ' | IYCK'} description={d.subtitle} lang={lang} hreflangs={hreflangs} structuredData={[...getGlobalSchemas(), breadcrumb]} canonical={canonical(lang)} />
      <NavBar />
      <header className="pt-32 pb-16 bg-gradient-to-b from-brand-800 via-brand-700 to-brand-700 text-brand-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_70%)]" />
        <div className="container-beam relative">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-5">{d.title}</h1>
          <p className="max-w-3xl text-[13px] md:text-sm leading-relaxed text-brand-100/85">{d.subtitle}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Snapshot */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 flex flex-col">
              <h2 className="text-[15px] font-semibold mb-4 tracking-tight">{d.snapshot}</h2>
              <ul className="space-y-2 text-[12.5px] text-brand-50/90">
                {d.snapshotBullets.map(b=> <li key={b} className="flex gap-2"><span className="text-brand-300">•</span><span>{b}</span></li>)}
              </ul>
              <details className="mt-5 group">
                <summary className="cursor-pointer select-none text-[12px] inline-flex items-center gap-1 text-brand-200 hover:text-white transition">Detail <span className="group-open:rotate-180 transition-transform">▾</span></summary>
                <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-brand-50/85">
                  {d.snapshotDetails.map(p=> <p key={p}>{p}</p>)}
                  <p className="text-[11px] text-brand-100/70">{d.snapshotNote}</p>
                </div>
              </details>
            </div>
            {/* Levels timeline */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6">
              <h2 className="text-[15px] font-semibold mb-4 tracking-tight">{d.levels}</h2>
              <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-px before:bg-gradient-to-b before:from-brand-400/70 before:to-brand-200/20 pl-6">
                {d.levelsList.map((lvl,i)=>(
                  <li key={lvl} className="relative">
                    <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-brand-300 shadow ring-4 ring-brand-300/30" />
                    <h3 className="font-semibold text-[13px]">{lvl}</h3>
                    <p className="mt-1 text-[11.5px] text-brand-50/80 leading-relaxed">{d.levelDescriptions[i]}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[11px] text-brand-100/60">{d.levelsNote}</p>
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
