import { useCallback, useState } from 'react';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function resolveApiBase(){
  const raw = import.meta.env.VITE_API_BASE || '';
  try {
    const { protocol, hostname } = window.location;
    if (raw) {
      const u = new URL(raw, `${protocol}//${hostname}`);
      return `${u.protocol}//${u.hostname}${u.port ? ':'+u.port : ''}`;
    }
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:4000`;
    }
    return '';
  } catch {
    return '';
  }
}
const API_BASE = resolveApiBase();

export default function GalleryUpload(){
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState('');
  const onChange = useCallback(async (e)=>{
    const files = Array.from(e.target.files||[]);
    if(!files.length) return;
    setBusy(true); setMsg('업로드 중...');
    try {
      for(const file of files){
        const form = new FormData();
        form.append('file', file);
        form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        const cloudUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
        const r = await fetch(cloudUrl, { method:'POST', body: form });
        if(!r.ok) throw new Error('클라우드 업로드 실패');
        const data = await r.json();
        // notify backend to index (optional)
        try { await fetch(`${API_BASE}/api/gallery/index`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ public_id: data.public_id, folder_path: data.folder, format: data.format, secure_url: data.secure_url }) }); } catch {}
      }
      setMsg('완료');
      window.dispatchEvent(new Event('gallery:refresh'));
      setTimeout(()=> setMsg(''), 1500);
    } catch(e){
      setMsg('실패: ' + e.message);
    } finally { setBusy(false); e.target.value=''; }
  },[]);
  return (
    <div className="rounded-xl border border-dashed border-brand-300/70 bg-white/60 p-6 flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold tracking-wide text-brand-700">이미지 업로드</h2>
        <p className="text-[12px] text-neutral-600 mt-1">운영중 숨기려면 컴포넌트 제거. 여러 파일 선택 가능.</p>
      </div>
      <label className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand-700 hover:bg-brand-600 text-white text-xs font-medium cursor-pointer w-fit transition">
        <input type="file" multiple accept="image/*" className="hidden" onChange={onChange} disabled={busy} />
        {busy? '업로드 중...' : '파일 선택'}
      </label>
      {msg && <div className="text-[12px] text-brand-600">{msg}</div>}
    </div>
  );
}