import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import GalleryList from './components/GalleryList.jsx';
import GalleryUpload from './components/GalleryUpload.jsx';
import Meta from '../shared/seo/Meta.jsx';
import { buildSeo } from '../shared/seo/seoUtils.js';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';
import useFocusTrap from '../shared/hooks/useFocusTrap.js';
import BlurImage from '../shared/ui/BlurImage.jsx';

const GEORGE_FOLDER = 'gallery/Namaste_Yoga/GeorgeDovas';

function transform(url, opts='f_auto,q_auto,c_fill,w_600'){
  if(!url) return '';
  return url.replace(/\/upload\//, `/upload/${opts}/`);
}

export default function GalleryPage(){
  const { lang, dict } = useI18n();
  const { hreflangs, canonical } = buildSeo('/gallery');
  const g = dict.galleryPage;
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialFolder = params.get('folder') || 'all';
  const initialMode = params.get('mode') === 'georgedovas' ? 'georgedovas' : 'all';
  const [mode,setMode] = useState(initialMode);

  // George Dovas simple viewer state
  const [gdItems,setGdItems] = useState([]);
  const [gdLoading,setGdLoading] = useState(false);
  const [gdError,setGdError] = useState(null);
  const [open,setOpen] = useState(-1); // lightbox index

  const loadGeorge = useCallback(async ()=>{
    setGdLoading(true); setGdError(null);
    try {
      const res = await fetch(`/api/gallery?folder=${encodeURIComponent(GEORGE_FOLDER)}`);
      if(!res.ok) throw new Error('HTTP '+res.status);
      const data = await res.json();
      const imgs = (data.items||[]).filter(i=> /\.jpg$/i.test(i.secure_url||'') || i.format==='jpg');
      setGdItems(imgs);
    } catch(e){ setGdError(e.message||String(e)); }
    finally { setGdLoading(false); }
  },[]);

  // Sync URL with mode (without leaving the page)
  useEffect(()=>{
    const sp = new URLSearchParams(location.search);
    if(mode==='georgedovas') sp.set('mode','georgedovas'); else sp.delete('mode');
    navigate({ pathname: location.pathname, search: sp.toString()?`?${sp.toString()}`:'' }, { replace: true });
    if(mode==='georgedovas' && !gdItems.length && !gdLoading && !gdError){
      loadGeorge();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mode]);

  // Keyboard nav for lightbox
  useEffect(()=>{
    if(mode!=='georgedovas') return; // only when active
    const handler = (e)=>{
      if(open<0) return;
      if(e.key==='Escape') setOpen(-1);
      if(e.key==='ArrowLeft') setOpen(i=> i>0? i-1 : i);
      if(e.key==='ArrowRight') setOpen(i=> i<gdItems.length-1? i+1 : i);
    };
    window.addEventListener('keydown', handler);
    return ()=> window.removeEventListener('keydown', handler);
  },[open,gdItems.length,mode]);

  const activeBtn = 'px-4 py-2 rounded-full text-xs font-medium shadow-soft-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500';

  return (
    <>
      <Meta
        title={`${g.title} | IYCK`}
        description={g.desc}
  lang={lang}
  hreflangs={hreflangs}
        canonical={canonical(lang)}
      />
      <div id="top" />
      <NavBar />
      <main className="min-h-screen bg-gradient-to-b from-brand-50 to-neutral-50 pt-28 pb-24">
        <div className="container-beam max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800 mb-4" lang={lang}>{g.title}</h1>
            <p className="text-sm text-neutral-700/80 leading-relaxed max-w-xl" lang={lang}>{g.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={()=> setMode('all')} className={`${activeBtn} ${mode==='all'? 'bg-brand-700 text-white hover:bg-brand-600' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'}`}>{g.all}</button>
              <button type="button" onClick={()=> setMode('georgedovas')} className={`${activeBtn} ${mode==='georgedovas'? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'}`}>{g.george}</button>
            </div>
          </div>
          <Link to="/programs" className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 hover:bg-brand-600 text-white text-sm font-medium shadow-soft-lg transition">{g.goPrograms}</Link>
        </header>

        {mode==='all' && (
          <>
            <section className="mb-10">
              <GalleryUpload />
            </section>
            <GalleryList initialFolder={initialFolder} omitBasePills />
          </>
        )}

        {mode==='georgedovas' && (
          <div>
            {gdLoading && <div className="py-16 text-center text-sm text-neutral-500" lang={lang}>{g.loading}</div>}
            {gdError && <div className="mb-6 p-4 rounded bg-red-50 border border-red-200 text-sm text-red-700" lang={lang}>{g.fail}: {gdError}</div>}
            {!gdLoading && !gdError && !gdItems.length && (
              <div className="py-16 text-center text-neutral-500 text-sm" lang={lang}>{g.none}</div>
            )}
            {!!gdItems.length && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {gdItems.map((it,idx)=> (
                  <button key={it.public_id} className="group relative block focus:outline-none" onClick={()=> setOpen(idx)} title={it.public_id} aria-label={g.enlarge}>
                    <BlurImage src={transform(it.secure_url)} alt="워크숍 사진" aspect="aspect-[4/3]" className="w-full" imgClassName="w-full h-full object-cover rounded-lg shadow-sm group-hover:opacity-90" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        </div>
        {mode==='georgedovas' && open>=0 && gdItems[open] && (
          <GeorgeLightbox items={gdItems} index={open} setIndex={setOpen} onClose={()=> setOpen(-1)} />
        )}
      </main>
      <div id="contact"><Footer /></div>
    </>
  );
}

function GeorgeLightbox({ items, index, setIndex, onClose }){
  const { dict, lang } = useI18n();
  const g = dict.galleryPage;
  const ref = useFocusTrapRef();
  useFocusTrap(ref, true);
  return (
    <div ref={ref} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col z-[1000]" role="dialog" aria-modal="true" aria-label={g.lightbox}>
      <div className="flex items-center justify-between px-6 py-3 text-white text-xs">
        <span className="opacity-80">{index+1} / {items.length}</span>
        <div className="flex gap-2">
          <button onClick={()=> setIndex(i=> (i-1+items.length)%items.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50">Prev</button>
          <button onClick={()=> setIndex(i=> (i+1)%items.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50">Next</button>
          <button onClick={onClose} className="px-3 py-1 rounded bg-red-600/80 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/70">{g.close}</button>
        </div>
      </div>
      <div className="relative flex-1" onClick={onClose}>
        <div className="absolute inset-0 flex items-center justify-center p-4" onClick={e=> e.stopPropagation()}>
          {items.map((it,i)=> (
            <img key={it.public_id} src={transform(it.secure_url,'f_auto,q_auto,w_1600')} alt="워크숍 사진" className={`max-h-full max-w-full object-contain transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0 absolute'}`} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}

function useFocusTrapRef(){
  const r = useRef(null); // use local hook, avoids needing React import
  return r;
}