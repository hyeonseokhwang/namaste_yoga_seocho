import { useEffect } from 'react';

export default function Modal({ open, onClose, title, body }){
  useEffect(()=>{
    if(open){
      const prev = document.body.style.overflow;
      document.body.style.overflow='hidden';
      return ()=>{ document.body.style.overflow = prev; };
    }
  },[open]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-start md:items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-w-3xl w-full bg-gradient-to-br from-brand-800 via-brand-700/90 to-brand-800 text-brand-50 rounded-2xl ring-1 ring-brand-300/15 shadow-[0_12px_40px_-8px_rgba(15,35,55,.55)] overflow-hidden animate-[fadeIn_.4s_ease]">
        <div className="px-6 md:px-8 py-5 flex items-start gap-4 border-b border-brand-300/15">
          <h3 className="font-serif text-xl md:text-2xl font-semibold tracking-tight flex-1">{title}</h3>
          <button onClick={onClose} aria-label="닫기" className="rounded-full w-9 h-9 grid place-content-center bg-white/5 hover:bg-white/10 text-brand-200/80 hover:text-white transition">✕</button>
        </div>
  <div className="px-6 md:px-8 py-6 max-h-[70vh] overflow-y-auto leading-relaxed text-sm md:text-[15px] space-y-4 whitespace-pre-line text-brand-100/90">
          {body.split('\n').map((p,i)=> <p key={i} className="[&:empty]:hidden">{p}</p> )}
        </div>
        <div className="px-6 md:px-8 py-4 flex justify-end bg-brand-900/30 border-t border-brand-300/15">
          <button onClick={onClose} className="px-5 py-2 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-brand-50 border border-brand-300/30 tracking-wide">닫기</button>
        </div>
      </div>
    </div>
  );
}
