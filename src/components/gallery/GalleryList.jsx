// src/components/gallery/GalleryList.jsx
import { useEffect, useState, useCallback } from "react";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_BASE   = import.meta.env.VITE_API_BASE;

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

export default function GalleryList() {
  const [images, setImages] = useState([]);
  const [openIdx, setOpenIdx] = useState(-1);

  // 목록 로드
  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/gallery`);
      const data = await res.json();
      setImages(data.items || []);
    } catch (e) {
      console.error("갤러리 불러오기 실패:", e);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // 업로드 완료 시 자동 새로고침 이벤트 수신
  useEffect(() => {
    const refresh = () => load();
    window.addEventListener("gallery:refresh", refresh);
    return () => window.removeEventListener("gallery:refresh", refresh);
  }, [load]);

  const close = useCallback(() => setOpenIdx(-1), []);
  const prev  = useCallback(() => setOpenIdx(i => (i > 0 ? i - 1 : i)), []);
  const next  = useCallback(() => setOpenIdx(i => (i < images.length - 1 ? i + 1 : i)), [images.length]);

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
    } catch (e) {
      alert(`삭제 실패: ${e.message}`);
    }
  }

  if (!images.length) {
    return (
      <section className="py-8 text-center text-gray-500">
        아직 업로드된 이미지가 없습니다.
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, idx) => (
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

      {openIdx >= 0 && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-4"
          onClick={close}
        >
          {/* 라이트박스에서 삭제 버튼(선택 사항) */}
          <button
            className="absolute top-4 left-4 text-white text-sm bg-red-600/80 hover:bg-red-600 px-3 py-1 rounded"
            onClick={(e) => { e.stopPropagation(); handleDelete(images[openIdx]); }}
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
            src={large(images[openIdx].public_id, images[openIdx].format)}
            alt={images[openIdx].public_id}
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
