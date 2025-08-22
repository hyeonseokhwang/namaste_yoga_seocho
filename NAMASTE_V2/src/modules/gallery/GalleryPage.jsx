import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import GalleryList from './components/GalleryList.jsx';
import GalleryUpload from './components/GalleryUpload.jsx';

const GEORGE_FOLDER = 'gallery/Namaste_Yoga/GeorgeDovas';

function transform(url, opts='f_auto,q_auto,c_fill,w_600'){
  if(!url) return '';
  return url.replace(/\/upload\//, `/upload/${opts}/`);
}

export default function GalleryPage(){
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
      <div id="top" />
      <NavBar />
      <main className="min-h-screen bg-gradient-to-b from-brand-50 to-neutral-50 pt-28 pb-24">
        <div className="container-beam max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800 mb-4">Practice Gallery</h1>
            <p className="text-sm text-neutral-700/80 leading-relaxed max-w-xl">워크숍 · 클래스 · 수련 순간들을 아카이브합니다. 아래 버튼으로 전체 / George Dovas 워크숍 전용 보기 전환.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={()=> setMode('all')} className={`${activeBtn} ${mode==='all'? 'bg-brand-700 text-white hover:bg-brand-600' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'}`}>전체 보기</button>
              <button type="button" onClick={()=> setMode('georgedovas')} className={`${activeBtn} ${mode==='georgedovas'? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'}`}>George Dovas 워크숍</button>
            </div>
          </div>
          <Link to="/programs" className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 hover:bg-brand-600 text-white text-sm font-medium shadow-soft-lg transition">프로그램 보기 →</Link>
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
            {gdLoading && <div className="py-16 text-center text-sm text-neutral-500">불러오는 중…</div>}
            {gdError && <div className="mb-6 p-4 rounded bg-red-50 border border-red-200 text-sm text-red-700">불러오기 실패: {gdError}</div>}
            {!gdLoading && !gdError && !gdItems.length && (
              <div className="py-16 text-center text-neutral-500 text-sm">해당 폴더에서 jpg 이미지를 찾지 못했습니다.</div>
            )}
            {!!gdItems.length && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {gdItems.map((it,idx)=> (
                  <button key={it.public_id} className="group relative block focus:outline-none" onClick={()=> setOpen(idx)} title={it.public_id}>
                    <img src={transform(it.secure_url)} alt={it.public_id} loading="lazy" className="w-full h-40 object-cover rounded-lg shadow-sm group-hover:opacity-90" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        </div>
        {mode==='georgedovas' && open>=0 && gdItems[open] && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4" onClick={()=> setOpen(-1)}>
          <button className="absolute top-4 left-4 text-white text-xs bg-red-600/80 hover:bg-red-600 px-3 py-1 rounded" onClick={e=> { e.stopPropagation(); setOpen(-1); }}>닫기</button>
          <button className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white text-3xl" onClick={e=> { e.stopPropagation(); setOpen(i=> i>0? i-1 : i); }}>‹</button>
          <img src={transform(gdItems[open].secure_url,'f_auto,q_auto,w_1600')} alt={gdItems[open].public_id} className="max-h-[88vh] max-w-[92vw] rounded shadow-lg" onClick={e=> e.stopPropagation()} />
          <button className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white text-3xl" onClick={e=> { e.stopPropagation(); setOpen(i=> i<gdItems.length-1? i+1 : i); }}>›</button>
        </div>
        )}
      </main>
      <div id="contact"><Footer /></div>
    </>
  );
}