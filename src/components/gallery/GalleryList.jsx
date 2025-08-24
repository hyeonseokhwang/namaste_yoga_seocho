// src/components/gallery/GalleryList.jsx
import { useEffect, useState, useCallback, useRef } from "react";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
function resolveApiBase() {
  const raw = import.meta.env.VITE_API_BASE || '';
  try {
    const { protocol, hostname } = window.location;
    if (raw) {
      const u = new URL(raw, `${protocol}//${hostname}`);
      return `${u.protocol}//${u.hostname}${u.port ? ':'+u.port : ''}`;
    }
    // local dev -> direct 4000
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:4000`;
    }
    // prod -> same-origin (nginx proxies /api)
    return '';
  } catch {
    return '';
  }
}
const API_BASE = resolveApiBase();

const thumb = (public_id, format="jpg") =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_fill,w_400/${public_id}.${format}`;
const large = (public_id, format="jpg") =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_1600/${public_id}.${format}`;

function getAdminToken() {
  return localStorage.getItem('iyck_admin_token') || '';
}
function ensureAdminToken() {
  let t = getAdminToken();
  if (!t) {
    t = window.prompt('삭제 권한 토큰을 입력하세요 (서버 ADMIN_TOKEN)') || '';
    if (t) localStorage.setItem('iyck_admin_token', t);
  }
  return t;
}

export default function GalleryList({ initialFolder = 'all' }) {
  const [images, setImages] = useState([]);
  const [openIdx, setOpenIdx] = useState(-1);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(initialFolder || 'all');
  const reqIdRef = useRef(0);
  const abortRef = useRef(null);
  const [error, setError] = useState(null);

  // 목록 로드
  const load = useCallback(async () => {
    try {
      setError(null);
      const folderAtStart = activeFolder;
      const thisId = ++reqIdRef.current;
      if (abortRef.current) {
        try { abortRef.current.abort(); } catch {}
      }
      const controller = new AbortController();
      abortRef.current = controller;

      const qs = activeFolder && activeFolder !== 'all' ? `?folder=${encodeURIComponent(activeFolder)}` : '';
      const url = `${API_BASE}/api/gallery${qs}`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        // try to get text for debugging
        const txt = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} ${res.statusText} ${txt.slice(0,200)}`);
      }
      const data = await res.json();
      const items = data.items || [];
      // Ignore stale responses
      if (thisId !== reqIdRef.current) return;
      // If an 'all' response comes back after user switched to a folder, ignore it
      if (folderAtStart === 'all' && activeFolder !== 'all') return;
      setImages(items);
      console.debug('[gallery] url=', url, 'activeFolder=', activeFolder, 'items=', items.length);

      // derive available folders from returned items using folder_path and folder(label)
  const map = new Map();
      items.forEach(i => {
        if (i.folder_path) map.set(i.folder_path, i.folder || i.folder_path.split('/').slice(-1)[0]);
      });
      const folderArr = Array.from(map.entries()).map(([path,label]) => ({ path, label }));
      setFolders(folderArr.sort((a,b)=> a.label.localeCompare(b.label)));
    } catch (e) {
      // AbortError is expected when a previous request is cancelled — don't show as a user error
      if (e && (e.name === 'AbortError' || String(e).toLowerCase().includes('aborted'))) {
        console.debug('gallery load aborted:', e.message || e);
        return;
      }
      console.error("갤러리 불러오기 실패:", e);
      setError(String(e?.message || e));
    }
  }, [activeFolder]);

  useEffect(() => { setActiveFolder(initialFolder || 'all'); setOpenIdx(-1); }, [initialFolder]);
  useEffect(() => { load(); }, [load]);

  // debug: log activeFolder changes
  useEffect(() => {
    console.debug('[gallery] activeFolder=', activeFolder);
  }, [activeFolder]);

  // 업로드 완료 시 자동 새로고침 이벤트 수신
  useEffect(() => {
    const refresh = () => load();
    window.addEventListener("gallery:refresh", refresh);
    return () => window.removeEventListener("gallery:refresh", refresh);
  }, [load]);

  const close = useCallback(() => setOpenIdx(-1), []);
  // client-side fallback filtering: if server returns all, filter by public_id prefix
  const displayed = activeFolder && activeFolder !== 'all'
    ? images.filter(i => {
        const pid = i.public_id || '';
        // match exact folder path prefix; be tolerant to 'gallery/' prefix differences
        const folderRaw = activeFolder.replace(/^gallery\//, '');
        const candidates = [activeFolder, folderRaw, `gallery/${folderRaw}`].filter(Boolean);
        return candidates.some(f => pid === f || pid.startsWith(f + '/'));
      })
    : images;

  // debug: log images/sample and displayed count
  useEffect(() => {
    try {
      console.debug('[gallery] images=', images.length, 'sample=', images.slice(0,5).map(x=>x.public_id));
      console.debug('[gallery] displayed=', displayed.length);
    } catch(e) { console.debug('[gallery] debug failed', e); }
  }, [images, displayed]);

  const prev  = useCallback(() => setOpenIdx(i => (i > 0 ? i - 1 : i)), []);
  const next  = useCallback(() => setOpenIdx(i => (i < displayed.length - 1 ? i + 1 : i)), [displayed.length]);

  // reset lightbox index when folder changes
  useEffect(() => { setOpenIdx(-1); }, [activeFolder]);

  // ESC / ← / → 단축키
  useEffect(() => {
    const onKey = (e) => {
      if (openIdx < 0) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, close, prev, next]);

  // 삭제
  async function handleDelete(img) {
    const ok = window.confirm(`정말 삭제할까요?\n${img.public_id}`);
    if (!ok) return;

    const token = ensureAdminToken();
    if (!token) return;

    try {
      const url = `${API_BASE}/api/gallery?public_id=${encodeURIComponent(img.public_id)}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || '삭제 실패');

      setImages(prev => prev.filter(i => i.public_id !== img.public_id));
  if (openIdx >= 0) setOpenIdx(-1);
  // reload to refresh folder list
  load();
    } catch (e) {
      alert(`삭제 실패: ${e.message}`);
    }
  }

  // abort in-flight on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        try { abortRef.current.abort(); } catch {}
      }
    };
  }, []);

  return (
    <section className="py-8">
  {error && (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
      <div className="text-sm text-red-800">갤러리 불러오기 실패: {error}</div>
      <div className="mt-2">
        <button onClick={() => load()} className="px-3 py-1 bg-red-600 text-white rounded text-sm">다시 시도</button>
      </div>
    </div>
  )}
  <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveFolder('all')}
          className={`px-3 py-1 rounded ${activeFolder === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          전체
        </button>
        {/* customer requested quick link */}
        <button
          onClick={() => setActiveFolder('gallery/Namaste_Yoga/GeorgeDovas')}
          className={`px-3 py-1 rounded ${activeFolder === 'gallery/Namaste_Yoga/GeorgeDovas' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-800'}`}
        >
          George Dovas 워크숍
        </button>
        {folders.map(f => (
          <button
            key={f.path}
            onClick={() => setActiveFolder(f.path)}
            className={`px-3 py-1 rounded ${activeFolder === f.path ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

    {/* count badge */}
    <div className="mb-3 text-sm text-gray-500">이미지 {displayed.length}개</div>

    {!displayed.length ? (
        <div className="py-8 text-center text-gray-500">선택한 폴더에 이미지가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
      {displayed.map((img, idx) => (
            <div key={img.public_id} className="group relative">
              <button
                onClick={() => setOpenIdx(idx)}
                className="block focus:outline-none w-full"
                title={img.public_id}
              >
                <img
                  src={thumb(img.public_id, img.format)}
                  alt={img.public_id}
                  className="w-full h-44 sm:h-48 object-cover rounded-md shadow-sm group-hover:opacity-90"
                  loading="lazy"
                />
              </button>
              <button
                onClick={() => handleDelete(img)}
                className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center justify-center
                           h-7 w-7 rounded-full bg-black/70 text-white text-sm"
                title="삭제"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

  {openIdx >= 0 && displayed[openIdx] && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-4"
          onClick={close}
        >
          {/* 라이트박스에서 삭제 버튼(선택 사항) */}
          <button
            className="absolute top-4 left-4 text-white text-sm bg-red-600/80 hover:bg-red-600 px-3 py-1 rounded"
            onClick={(e) => { e.stopPropagation(); handleDelete(displayed[openIdx]); }}
          >
            삭제
          </button>

          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ‹
          </button>
          <img
            src={large(displayed[openIdx].public_id, displayed[openIdx].format)}
            alt={displayed[openIdx].public_id}
            className="max-h-[90vh] max-w-[95vw] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            ›
          </button>
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); close(); }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
