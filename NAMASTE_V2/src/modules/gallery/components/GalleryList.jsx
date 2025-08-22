import { useEffect, useState, useCallback, useRef } from 'react';
import BlurImage from '../../shared/ui/BlurImage.jsx';
import useFocusTrap from '../../shared/hooks/useFocusTrap.js';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
if(!CLOUD_NAME){
  try { console.warn('[Gallery] VITE_CLOUDINARY_CLOUD_NAME not set – using secure_url based transformation fallback'); } catch {}
}

function resolveApiBase(){
  const raw = import.meta.env.VITE_API_BASE || '';
  try {
    const { protocol, hostname } = window.location;
    if(!raw) return `${protocol}//${hostname}:4000`;
    const u = new URL(raw, `${protocol}//${hostname}`);
    const isLocal = ['localhost','127.0.0.1'].includes(u.hostname);
    if(!['localhost','127.0.0.1'].includes(hostname) && isLocal){
      return `${protocol}//${hostname}:4000`;
    }
    return `${u.protocol}//${u.hostname}${u.port? ':'+u.port:''}`;
  } catch {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:4000`;
  }
}
const API_BASE = resolveApiBase();

const thumb = (public_id, format='jpg', secure_url='') => {
  if(CLOUD_NAME){
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_fill,w_400/${public_id}.${format}`;
  }
  if(secure_url){
    // insert transformation segment after /upload/
    return secure_url.replace(/\/upload\//, '/upload/f_auto,q_auto,c_fill,w_400/');
  }
  return secure_url || '';
};
const large = (public_id, format='jpg', secure_url='') => {
  if(CLOUD_NAME){
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_1600/${public_id}.${format}`;
  }
  if(secure_url){
    return secure_url.replace(/\/upload\//, '/upload/f_auto,q_auto,w_1600/');
  }
  return secure_url || '';
};

function getAdminToken(){ return localStorage.getItem('iyck_admin_token') || ''; }
function ensureAdminToken(){
  let t = getAdminToken();
  if(!t){
    t = window.prompt('삭제 권한 토큰을 입력하세요 (서버 ADMIN_TOKEN)') || '';
    if(t) localStorage.setItem('iyck_admin_token', t);
  }
  return t;
}

export default function GalleryList({ initialFolder='all', hideFilters=false, omitBasePills=false }){
  const [images,setImages]=useState([]);
  const [openIdx,setOpenIdx]=useState(-1);
  const [folders,setFolders]=useState([]);
  const [activeFolder,setActiveFolder]=useState(initialFolder||'all');
  const reqIdRef = useRef(0);
  const abortRef = useRef(null);
  const [error,setError] = useState(null);

  const load = useCallback(async ()=>{
    try {
      setError(null);
      const folderAtStart = activeFolder;
      const thisId = ++reqIdRef.current;
      if(abortRef.current){ try { abortRef.current.abort(); } catch {} }
      const controller = new AbortController();
      abortRef.current = controller;
      const qs = activeFolder && activeFolder !== 'all' ? `?folder=${encodeURIComponent(activeFolder)}` : '';
      const url = `${API_BASE}/api/gallery${qs}`;
      const res = await fetch(url, { signal: controller.signal });
      if(!res.ok){
        const txt = await res.text().catch(()=> '');
        throw new Error(`HTTP ${res.status} ${res.statusText} ${txt.slice(0,160)}`);
      }
      const data = await res.json();
      const items = data.items || [];
      if(thisId !== reqIdRef.current) return; // stale
      if(folderAtStart === 'all' && activeFolder !== 'all') return; // switched while loading
      setImages(items);
      const map = new Map();
      items.forEach(i=> { if(i.folder_path) map.set(i.folder_path, i.folder || i.folder_path.split('/').pop()); });
      setFolders(Array.from(map.entries()).map(([path,label])=>({path,label})).sort((a,b)=> a.label.localeCompare(b.label)));
    } catch(e){
      if(e && (e.name === 'AbortError' || String(e).toLowerCase().includes('aborted'))) return;
      console.error('[gallery] load failed', e);
      setError(String(e?.message || e));
    }
  },[activeFolder]);

  useEffect(()=> { setActiveFolder(initialFolder||'all'); setOpenIdx(-1); }, [initialFolder]);
  useEffect(()=> { load(); }, [load]);
  useEffect(()=> { return ()=> { if(abortRef.current){ try { abortRef.current.abort(); } catch {} } }; },[]);

  // folder filter fallback
  const displayed = activeFolder && activeFolder !== 'all'
    ? images.filter(i=>{
        const pid = i.public_id || '';
        const folderRaw = activeFolder.replace(/^gallery\//,'');
        const candidates = [activeFolder, folderRaw, `gallery/${folderRaw}`];
        return candidates.some(f => pid === f || pid.startsWith(f + '/'));
      })
    : images;

  const close = () => setOpenIdx(-1);
  const prev = () => setOpenIdx(i => (i>0? i-1 : i));
  const next = () => setOpenIdx(i => (i<displayed.length-1? i+1 : i));
  useEffect(()=> { setOpenIdx(-1); }, [activeFolder]);
  useEffect(()=> {
    const onKey = (e)=>{
      if(openIdx<0) return;
      if(e.key==='Escape') close();
      if(e.key==='ArrowLeft') prev();
      if(e.key==='ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[openIdx]);

  async function handleDelete(img){
    const ok = window.confirm(`정말 삭제할까요?\n${img.public_id}`);
    if(!ok) return;
    const token = ensureAdminToken();
    if(!token) return;
    try {
      const url = `${API_BASE}/api/gallery?public_id=${encodeURIComponent(img.public_id)}`;
      const res = await fetch(url, { method:'DELETE', headers:{ 'x-admin-token': token } });
      const data = await res.json();
      if(!res.ok) throw new Error(data?.error || '삭제 실패');
      setImages(prev => prev.filter(i => i.public_id !== img.public_id));
      setOpenIdx(-1);
      load();
    } catch(e){ alert(`삭제 실패: ${e.message}`); }
  }

  return (
    <div className="pb-12">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          갤러리 불러오기 실패: {error}
          <div className="mt-2"><button onClick={load} className="px-3 py-1 rounded bg-red-600 text-white">다시 시도</button></div>
        </div>
      )}
      {!hideFilters && (
        <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="갤러리 폴더 필터">
          {!omitBasePills && (
            <>
              <button onClick={()=> setActiveFolder('all')} className={`px-3 py-1 rounded-full text-xs font-medium ${activeFolder==='all' ? 'bg-brand-700 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>전체</button>
              <button onClick={()=> setActiveFolder('gallery/Namaste_Yoga/GeorgeDovas')} className={`px-3 py-1 rounded-full text-xs font-medium ${activeFolder==='gallery/Namaste_Yoga/GeorgeDovas' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}>George Dovas 워크숍</button>
            </>
          )}
          {folders
            .filter(f => f.path !== 'gallery' && f.path !== 'gallery/Namaste_Yoga/GeorgeDovas')
            .map(f => (
              <button key={f.path} onClick={()=> setActiveFolder(f.path)} className={`px-3 py-1 rounded-full text-xs font-medium ${activeFolder===f.path ? 'bg-brand-700 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>{f.label}</button>
            ))}
        </div>
      )}
      {/* 이미지 수 카운트 제거 (요청) */}
      {!displayed.length ? (
        <div className="py-10 text-center text-neutral-500 text-sm">선택한 폴더에 이미지가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {displayed.map((img,idx)=>(
            <div key={img.public_id} className="group relative">
              <button onClick={()=> setOpenIdx(idx)} className="block w-full focus:outline-none" title={img.public_id}>
                {/* 4:3 aspect ratio placeholder for CLS stability */}
                <div style={{aspectRatio:'4/3'}} className="w-full rounded-lg overflow-hidden bg-neutral-100">
                  <img
                    src={thumb(img.public_id, img.format, img.secure_url)}
                    alt={img.public_id}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="w-full h-full object-cover object-center rounded-lg shadow-sm group-hover:opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
              <button onClick={()=> handleDelete(img)} className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center justify-center h-7 w-7 rounded-full bg-black/70 text-white text-sm" title="삭제">×</button>
            </div>
          ))}
        </div>
      )}
      {openIdx >=0 && displayed[openIdx] && (
        <LightboxGallery
          img={displayed[openIdx]}
          onDelete={()=> handleDelete(displayed[openIdx])}
          onPrev={prev}
          onNext={next}
          onClose={close}
          canPrev={openIdx>0}
          canNext={openIdx<displayed.length-1}
          src={large(displayed[openIdx].public_id, displayed[openIdx].format, displayed[openIdx].secure_url)}
        />
      )}
    </div>
  );
}

function LightboxGallery({ img, src, onClose, onPrev, onNext, onDelete, canPrev, canNext }){
  const ref = useRef(null);
  useFocusTrap(ref, true);
  return (
    <div ref={ref} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col z-[1100]" role="dialog" aria-modal="true" aria-label="갤러리 이미지 보기">
      <div className="flex items-center justify-between px-6 py-3 text-white text-xs">
        <span className="truncate max-w-[50vw] opacity-80">{img.public_id}</span>
        <div className="flex gap-2">
          <button onClick={onDelete} className="px-3 py-1 rounded bg-red-600/80 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/70">삭제</button>
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60">닫기</button>
        </div>
      </div>
      <div className="relative flex-1" onClick={onClose}>
        {canPrev && <button onClick={(e)=> { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl" aria-label="이전">‹</button>}
        {canNext && <button onClick={(e)=> { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl" aria-label="다음">›</button>}
        <div className="absolute inset-0 flex items-center justify-center p-4" onClick={e=> e.stopPropagation()}>
          <img src={src} alt="갤러리 이미지" className="max-w-[92vw] max-h-[88vh] rounded shadow-xl" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}