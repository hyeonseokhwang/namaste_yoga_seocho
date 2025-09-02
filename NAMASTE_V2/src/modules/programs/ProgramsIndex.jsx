import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';
import { useState, useEffect, useRef } from 'react';
import { featuredWorkshop, pastWorkshops, moreUpcoming } from './data/programsData.js';
import Meta from '../shared/seo/Meta.jsx';
import { buildSeo, getGlobalSchemas } from '../shared/seo/seoUtils.js';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';
import BlurImage from '../shared/ui/BlurImage.jsx';
import useFocusTrap from '../shared/hooks/useFocusTrap.js';

export default function ProgramsIndex(){
  const { lang, dict } = useI18n();
  const { hreflangs, canonical } = buildSeo('/programs');
  const pg = dict.programsPage;
  return (
    <>
      <Meta
        title={lang==='ko'? `프로그램 | ${featuredWorkshop.title}` : `Programs | ${featuredWorkshop.title}`}
        description={featuredWorkshop.summary}
  lang={lang}
  hreflangs={hreflangs}
        canonical={canonical(lang)}
        structuredData={[
          ...getGlobalSchemas(),
          {
            '@context':'https://schema.org',
            '@type':'Event',
            name: featuredWorkshop.title,
            startDate: featuredWorkshop.startDate,
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type':'Place',
              name: featuredWorkshop.location,
              address: featuredWorkshop.location
            },
            image: featuredWorkshop.images,
            description: featuredWorkshop.summary,
            organizer: {
              '@type':'Organization',
              name: 'Iyengar Yoga Community Korea'
            }
          }
        ]}
      />
      <div id="top" />
      <NavBar />
      <Hero />
  <ProgramsOverview />
      <div id="contact"><Footer /></div>
    </>
  );
}

function Hero(){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  const ref = useScrollReveal();
  return (
  <header ref={ref} className="relative overflow-hidden pt-40 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-brand-50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_35%,rgba(86,141,168,0.22),transparent_60%),radial-gradient(circle_at_80%_65%,rgba(50,101,127,0.18),transparent_60%)]" />
      <div className="container-beam max-w-5xl grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-7">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.heroTitle}</h1>
          <p className="mt-6 text-[15px] md:text-base leading-relaxed text-brand-800/80 max-w-xl" lang={lang}>{pg.heroDesc}</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-2xl">
            <ProgramTypeCard icon="compass" title={pg.types.workshop[0]} desc={pg.types.workshop[1]} />
            <ProgramTypeCard icon="leaf" title={pg.types.intro[0]} desc={pg.types.intro[1]} />
            <ProgramTypeCard icon="cap" title={pg.types.teacher[0]} desc={pg.types.teacher[1]} />
            <ProgramTypeCard icon="hands" title={pg.types.community[0]} desc={pg.types.community[1]} />
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col gap-5">
          <HeroThumb img="/img/practice2.jpg" label="구조·정렬을 통한 단계적 확장" />
          <HeroThumb img="/img/practice3.jpg" label="프롭 활용 & 회복 시퀀스" />
        </div>
      </div>
  <div className="h-px w-full mt-12 bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
    </header>
  );
}

function ProgramsOverview(){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  return (
    <main className="bg-gradient-to-b from-brand-50 via-white to-brand-50/60 pb-44 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_70%,rgba(86,141,168,0.18),transparent_65%),radial-gradient(circle_at_85%_25%,rgba(50,101,127,0.16),transparent_60%)]" />
      <div className="container-beam max-w-6xl relative">
        {/* Featured Upcoming */}
  <section id="upcoming" className="pt-4">
          <div className="mb-10">
            <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.upcoming}</h3>
          </div>
          <div className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] md:flex group">
            <FeaturedImages />
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
              <header className="space-y-3">
                <h4 className="text-[12px] font-medium tracking-widest text-brand-600">{featuredWorkshop.dateLabel}</h4>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">{featuredWorkshop.title}</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">{featuredWorkshop.summary}</p>
              </header>
              <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                <ul className="space-y-2 text-brand-800/80">
                  <li><strong className="text-brand-700">{pg.session1}:</strong> {featuredWorkshop.sessions[0]}</li>
                  <li><strong className="text-brand-700">{pg.session2}:</strong> {featuredWorkshop.sessions[1]}</li>
                  <li><strong className="text-brand-700">{pg.totalHours}:</strong> {featuredWorkshop.totalHours}{lang==='ko'? '시간':''}</li>
                  <li><strong className="text-brand-700">{pg.location}:</strong> {featuredWorkshop.location}</li>
                </ul>
                <ul className="space-y-2 text-brand-800/80">
                  <li><strong className="text-brand-700">{pg.tuition}:</strong> {featuredWorkshop.tuition}</li>
                  <li><strong className="text-brand-700">{pg.contact}:</strong> {featuredWorkshop.contacts}</li>
                  <li><strong className="text-brand-700">{pg.email}:</strong> {featuredWorkshop.email}</li>
                  <li><strong className="text-brand-700">{pg.focus}:</strong> {featuredWorkshop.focus}</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#register" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 text-white px-6 py-3 text-[13px] font-medium shadow hover:bg-brand-600 transition">{pg.register}</a>
              </div>
              <p className="text-[11px] text-brand-600/60" lang={lang}>{pg.disclaimer}</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
          </div>
          {/* Additional upcoming workshops (same card style as featured) */}
          {!!moreUpcoming?.length && (
            <div className="mt-8 grid gap-6">
              {moreUpcoming.map(w => (
                <article key={w.id} className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] md:flex group">
                  <div className="md:w-1/2 relative h-64 md:h-[420px]">
                      <img src={w.images[0]} alt={w.title} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-brand-100/95 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">UPCOMING</span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">WORKSHOP</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
                    <header className="space-y-3">
                      <h4 className="text-[12px] font-medium tracking-widest text-brand-600">{w.dateLabel}</h4>
                      <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">{w.title}</h3>
                      <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">{w.summary}</p>
                    </header>
                    <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                      <ul className="space-y-2 text-brand-800/80">
                        <li><strong className="text-brand-700">{pg.session1}:</strong> {w.sessions[0]}</li>
                        <li><strong className="text-brand-700">{pg.session2}:</strong> {w.sessions[1]}</li>
                        <li><strong className="text-brand-700">{pg.totalHours}:</strong> {w.totalHours}{lang==='ko'? '시간':''}</li>
                        <li><strong className="text-brand-700">{pg.location}:</strong> {w.location}</li>
                      </ul>
                      <ul className="space-y-2 text-brand-800/80">
                        <li><strong className="text-brand-700">{pg.tuition}:</strong> {w.tuition}</li>
                        <li><strong className="text-brand-700">{pg.contact}:</strong> {w.contacts}</li>
                        <li><strong className="text-brand-700">{pg.email}:</strong> {w.email}</li>
                        <li><strong className="text-brand-700">{pg.focus}:</strong> {w.focus}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
                </article>
              ))}
            </div>
          )}
        </section>

  <PastSection />
      </div>
    </main>
  );
}

function ProgramCard({img, caption}){
  return (
    <div className="relative rounded-2xl overflow-hidden ring-1 ring-brand-300/60 bg-white/70 backdrop-blur shadow-sm group">
      <img src={img} alt={caption} className="w-full h-52 object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-60" />
      <div className="p-4 relative">
        <p className="text-[12px] text-white/90 leading-relaxed drop-shadow-sm">{caption}</p>
      </div>
    </div>
  );
}

function ProgramTypeCard({icon, title, desc}){
  const Icon = resolveIcon(icon);
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur ring-1 ring-brand-200/70 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_75%_25%,rgba(70,120,145,0.18),transparent_65%)]" />
      <div className="flex items-start gap-4 relative">
        <div className="h-10 w-10 rounded-full ring-1 ring-brand-200/60 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center text-brand-600">{Icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold tracking-wide text-brand-800 flex items-center gap-2">
            {title}
            <span className="h-px flex-1 bg-gradient-to-r from-brand-300/50 to-transparent" />
          </h4>
          <p className="mt-1 text-[11px] text-brand-700/75 leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="absolute -bottom-px left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

function resolveIcon(name){
  const stroke = 'stroke-current';
  const common = 'w-5 h-5 '+stroke+' text-brand-600';
  switch(name){
    case 'compass':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="m14.8 9.2-3.9 1.3-1.3 3.9 3.9-1.3 1.3-3.9Z" />
        </svg>
      );
    case 'leaf':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 13c5.5-9.5 14-9 14-9s1 8.5-4.5 14A8 8 0 0 1 5 13Z" />
          <path d="M9 9c2 2 3 3 6 4" />
        </svg>
      );
    case 'cap':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M3 10.5 12 6l9 4.5-9 4.5-9-4.5Z" />
          <path d="M7 12.7v4.3c0 .8 2.2 2.5 5 2.5s5-1.7 5-2.5v-4.3" />
        </svg>
      );
    case 'hands':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M8 13V6.5a2.5 2.5 0 0 1 5 0V13m0-3.5V7a2.5 2.5 0 0 1 5 0v6c0 4-2.5 6-6 6h-.5" />
          <path d="M8 13v2c0 2.5 1 5 4 6" />
          <path d="M8 13H6.5A2.5 2.5 0 0 1 4 10.5v-1A2.5 2.5 0 0 1 6.5 7H8" />
        </svg>
      );
    default:
      return null;
  }
}

function HeroThumb({img, label}){
  return (
    <div className="relative group rounded-xl overflow-hidden ring-1 ring-brand-200/60 bg-white/30 backdrop-blur">
  <img src={img} alt={label} loading="lazy" decoding="async" width="640" height="320" className="h-40 w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2 text-[11px] text-white/90 leading-snug drop-shadow-sm">{label}</div>
    </div>
  );
}

// Unified Past Section
function PastSection(){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  return (
    <section id="past" className="mt-40">
      <div className="mb-14 flex items-center gap-4">
  <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.pastHeading}</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-300/70 via-brand-200/40 to-transparent" />
      </div>
      <PastHighlightCard />
      <PastTimeline className="mt-32" />
    </section>
  );
}

function FeaturedImages(){
  const images = [
    {src:'/img/class/KakaoTalk_20250818_091833656_02.jpg', alt:'Eyal Shifroni 워크숍 이미지 1 (남자 강사 지도)' },
    {src:'/img/class/KakaoTalk_20250818_091833656_01.jpg', alt:'Eyal Shifroni 워크숍 이미지 2 (참가자 수련)' }
  ];
  const [index,setIndex] = useState(0);
  const [open,setOpen] = useState(false);
  // ESC close with cleanup
  useEffect(()=>{
    if(!open) return;
    const handler = e => { if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);
  return (
    <div className="md:w-1/2 relative h-64 md:h-[420px] flex flex-col">
      <button onClick={()=>setOpen(true)} className="relative flex-1 text-left cursor-zoom-in">
    {images.map((im,i)=> (
          <BlurImage
            key={im.src}
            src={im.src}
            alt={im.alt}
            className="absolute inset-0"
            imgClassName={`w-full h-full object-cover object-center transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0'}`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/5 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-brand-100/90 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">FEATURED</span>
          <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">WORKSHOP</span>
        </div>
      </button>
      <div className="flex gap-2 p-3 justify-center bg-white/30 backdrop-blur-sm md:bg-transparent md:absolute md:bottom-4 md:left-4 md:flex-col md:gap-3">
        {images.map((im,i)=>(
          <button key={im.src} onClick={()=>setIndex(i)} aria-label={`이미지 ${i+1}`}
                  className={`relative overflow-hidden rounded-lg ring-1 ${i===index? 'ring-brand-400':'ring-brand-200'} w-16 h-12 transition`}>
            <img src={im.src} alt="" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-black/40 ${i===index? 'opacity-0':'opacity-30'} hover:opacity-0 transition-opacity`} />
          </button>
        ))}
      </div>
  {open && <Lightbox images={images} index={index} setIndex={setIndex} onClose={()=> setOpen(false)} />}
    </div>
  );
}

// Past workshop highlight card with integrated gallery preview & lightbox
function PastHighlightCard(){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  const folder = 'gallery/Namaste_Yoga/GeorgeDovas';
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [open,setOpen] = useState(-1);
  useEffect(()=>{
    let alive = true;
    (async ()=> {
      try {
        setLoading(true); setError(null);
        const res = await fetch(`/api/gallery?folder=${encodeURIComponent(folder)}`);
        if(!res.ok) throw new Error('HTTP '+res.status);
        const data = await res.json();
        if(!alive) return;
  // Limit to 6 images to keep highlight card height similar to upcoming section
  setItems((data.items||[]).slice(0,6));
      } catch(e){ if(alive) setError(e.message||String(e)); }
      finally { if(alive) setLoading(false); }
    })();
    return ()=> { alive=false; };
  },[]);

  const transform = (url, opts='f_auto,q_auto,c_fill,w_600') => url? url.replace(/\/upload\//, `/upload/${opts}/`) : '';

  useEffect(()=>{
    if(open<0) return;
    const onKey = (e)=>{
      if(e.key==='Escape') setOpen(-1);
      if(e.key==='ArrowLeft') setOpen(i=> i>0? i-1 : i);
      if(e.key==='ArrowRight') setOpen(i=> i<items.length-1? i+1 : i);
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[open,items.length]);

  return (
  <div className="relative" aria-labelledby="past-highlight-heading">
      <div className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-10px_rgba(40,70,90,0.25)] md:flex group">
        {/* Image mosaic / gallery preview */}
  <div className="md:w-1/2 p-6 md:p-8 grid grid-cols-3 grid-rows-2 gap-2 content-start min-h-[340px] bg-gradient-to-b from-brand-50/60 via-white/40 to-brand-100/40">
          {loading && <div className="col-span-3 h-40 flex items-center justify-center text-[12px] text-brand-700/50">이미지 로딩중…</div>}
          {error && <div className="col-span-3 h-40 flex items-center justify-center text-[12px] text-red-600/70">불러오기 실패</div>}
          {!loading && !error && !items.length && <div className="col-span-3 h-40 flex items-center justify-center text-[12px] text-brand-700/50">이미지 없음</div>}
          {!!items.length && items.slice(0,6).map((it,idx)=> (
            <button key={it.public_id} onClick={()=> setOpen(idx)} className="relative group aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-brand-200/60 bg-white/40 focus:outline-none">
              <img src={transform(it.secure_url,'f_auto,q_auto,c_fill,w_400')} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity" />
            </button>
          ))}
        </div>
        {/* Textual info */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
          <header id="past-highlight-heading" className="space-y-4" lang={lang}>
            <div className="flex flex-wrap gap-2 items-center text-[11px] tracking-wide font-semibold">
              <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700">HIGHLIGHT</span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">GEORGE DOVAS</span>
              <span className="px-3 py-1 rounded-full bg-white/70 ring-1 ring-brand-200 text-brand-700">2025 JULY</span>
              <span className="px-3 py-1 rounded-full bg-white/60 ring-1 ring-brand-300 text-brand-600">PAST</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">George Dovas {pg.highlight}</h3>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">{pg.highlightDesc}</p>
          </header>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/gallery?mode=georgedovas" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 text-white px-6 py-3 text-[13px] font-medium shadow hover:bg-brand-600 transition">{pg.viewAllGallery}</a>
          </div>
          <p className="text-[11px] text-brand-600/60">{pg.highlightNote}</p>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
      </div>
  {open>=0 && items[open] && <Lightbox dynamic images={items.map(it=> ({src:transform(it.secure_url,'f_auto,q_auto,w_1600'), alt:'워크숍 사진'}))} index={open} setIndex={setOpen} onClose={()=> setOpen(-1)} />}
    </div>
  );
}

function PastTimeline({className=''}){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  const years = Object.keys(pastWorkshops).sort((a,b)=> b.localeCompare(a));
  return (
    <div className={"relative "+className}>
      <div className="mb-10 flex items-center gap-3">
        <h4 className="text-xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.years}</h4>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-200/70 via-brand-200/30 to-transparent" />
      </div>
      <div className="grid md:grid-cols-3 gap-10 text-[13px] text-brand-800/80">
        {years.map(year => {
          const filtered = pastWorkshops[year].filter(item => !/George Dovas/i.test(item));
          if(!filtered.length) return null;
          return (
            <div key={year} className="relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-gradient-to-b from-brand-400/60 to-brand-200/20">
              <h5 className="font-semibold text-brand-700 mb-3 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-400" />{year}</h5>
              <ul className="space-y-2">
                {filtered.map((item,i)=> <li key={i}>{item}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Accessible Lightbox reusable
function Lightbox({ images, index, setIndex, onClose, dynamic=false }){
  const ref = useRef(null);
  useFocusTrap(ref, true);
  useEffect(()=>{
    function onKey(e){
      if(e.key==='Escape'){ onClose(); }
      if(e.key==='ArrowLeft'){ setIndex(i=> (i-1+images.length)%images.length); }
      if(e.key==='ArrowRight'){ setIndex(i=> (i+1)%images.length); }
    }
    document.addEventListener('keydown', onKey);
    return ()=> document.removeEventListener('keydown', onKey);
  },[images.length,onClose,setIndex]);
  return (
    <div ref={ref} className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex flex-col" role="dialog" aria-modal="true" aria-label="이미지 상세 보기">
      <div className="flex items-center justify-between px-6 py-4 text-white text-xs tracking-wide">
        <span className="opacity-80">{index+1} / {images.length}</span>
        <div className="flex items-center gap-2">
          <button onClick={()=> setIndex(i=> (i-1+images.length)%images.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60">Prev</button>
          <button onClick={()=> setIndex(i=> (i+1)%images.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60">Next</button>
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60" autoFocus>Close</button>
        </div>
      </div>
      <div className="relative flex-1" onClick={onClose}>
        <div className="absolute inset-0 flex items-center justify-center p-4" onClick={e=> e.stopPropagation()}>
          {images.map((im,i)=> (
            <img key={im.src} src={im.src} alt={im.alt} width={dynamic? undefined:1200} height={dynamic? undefined:800}
                 className={`max-h-full max-w-full object-contain transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0 absolute'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
