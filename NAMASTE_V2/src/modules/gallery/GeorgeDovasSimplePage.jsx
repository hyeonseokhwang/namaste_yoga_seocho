import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const FOLDER = 'gallery/Namaste_Yoga/GeorgeDovas';

function transform(url, opts='f_auto,q_auto,c_fill,w_600'){
  if(!url) return '';
  return url.replace(/\/upload\//, `/upload/${opts}/`);
}

export default function GeorgeDovasSimplePage(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [open,setOpen]=useState(-1);

  const load = useCallback(async ()=>{
    try {
      setLoading(true); setError(null);
      const res = await fetch(`/api/gallery?folder=${encodeURIComponent(FOLDER)}`);
      if(!res.ok) throw new Error('HTTP '+res.status);
      const data = await res.json();
      const imgs = (data.items||[]).filter(i=> /\.jpg$/i.test(i.secure_url||'') || i.format==='jpg');
      setItems(imgs);
    } catch(e){ setError(e.message||String(e)); }
    finally { setLoading(false); }
  },[]);

  useEffect(()=> { load(); }, [load]);

  const close = () => setOpen(-1);
  const prev  = () => setOpen(i=> i>0? i-1 : i);
  const next  = () => setOpen(i=> i<items.length-1? i+1 : i);

  useEffect(()=>{
    const onKey = (e)=> {
      if(open<0) return;
      if(e.key==='Escape') close();
      if(e.key==='ArrowLeft') prev();
      if(e.key==='ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[open,items.length]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-neutral-50 pt-28 pb-24">
      <div className="container-beam max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800 mb-4">George Dovas 워크숍 (JPG 전용)</h1>
            <p className="text-sm text-neutral-700/80 max-w-xl leading-relaxed">폴더: {FOLDER}. Cloudinary에서 jpg 형식만 필터링하여 표시합니다.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/gallery/georgedovas" className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-medium transition">← 확장 페이지</Link>
            <Link to="/gallery" className="inline-flex items-center px-4 py-2 rounded-full bg-brand-700 hover:bg-brand-600 text-white text-xs font-medium shadow-soft-lg transition">전체 갤러리</Link>
          </div>
        </header>
        {loading && <div className="py-16 text-center text-sm text-neutral-500">불러오는 중…</div>}
        {error && <div className="mb-6 p-4 rounded bg-red-50 border border-red-200 text-sm text-red-700">불러오기 실패: {error}</div>}
        {!loading && !error && !items.length && (
          <div className="py-16 text-center text-neutral-500 text-sm">해당 폴더에서 jpg 이미지를 찾지 못했습니다.</div>
        )}
        {!!items.length && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {items.map((it,idx)=> (
              <button key={it.public_id} className="group relative block focus:outline-none" onClick={()=> setOpen(idx)} title={it.public_id}>
                <img src={transform(it.secure_url)} alt={it.public_id} loading="lazy" className="w-full h-40 object-cover rounded-lg shadow-sm group-hover:opacity-90" />
              </button>
            ))}
          </div>
        )}
      </div>
      {open>=0 && items[open] && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4" onClick={close}>
          <button className="absolute top-4 left-4 text-white text-xs bg-red-600/80 hover:bg-red-600 px-3 py-1 rounded" onClick={e=> { e.stopPropagation(); close(); }}>닫기</button>
          <button className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white text-3xl" onClick={e=> { e.stopPropagation(); prev(); }}>‹</button>
          <img src={transform(items[open].secure_url,'f_auto,q_auto,w_1600')} alt={items[open].public_id} className="max-h-[88vh] max-w-[92vw] rounded shadow-lg" onClick={e=> e.stopPropagation()} />
          <button className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white text-3xl" onClick={e=> { e.stopPropagation(); next(); }}>›</button>
        </div>
      )}
    </main>
  );
}