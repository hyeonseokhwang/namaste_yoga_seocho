import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useActiveSection from '../../shared/hooks/useActiveSection.js';

// type: 'hash' = home section anchor; 'route' = standalone page
const links = [
  { type:'hash', href: '#about', label: '소개' },
  { type:'hash', href: '#lineage', label: '전통' },
  { type:'route', href: '/programs', label: '프로그램' },
  { type:'hash', href: '#membership', label: '멤버십' },
  { type:'hash', href: '#principles', label: '원칙' },
  { type:'hash', href: '#contact', label: '문의' },
];

export default function NavBar(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const location = useLocation();
  useEffect(()=>{
    const onScroll=()=> setScrolled(window.scrollY>24);
    window.addEventListener('scroll',onScroll);
    return ()=> window.removeEventListener('scroll',onScroll);
  },[]);
  const active = useActiveSection(['about','lineage','programs','membership','contact','principles'], { offsetTop: 96 });
  const onHome = location.pathname === '/';
  const brandHref = onHome ? '#top' : '/';
  return (
    <div className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 border-b animate-fade-in ${scrolled? 'bg-white/90 backdrop-blur-md border-white/60 shadow-sm':'bg-white/65 backdrop-blur-md border-white/50 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]'}`}>
      <div className="container-beam flex items-center justify-between py-3 md:py-4">
        <a href={brandHref} className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:rounded-md">
          <div className="leading-tight -space-y-0.5">
            <div className="text-[15px] md:text-[17px] font-semibold tracking-[0.16em] text-brand-800">IYENGAR</div>
            <div className="text-[15px] md:text-[17px] font-semibold tracking-[0.16em] text-brand-800">YOGA COMMUNITY</div>
            <div className="pt-1 text-[10px] md:text-[11px] font-medium tracking-widest text-brand-700">KOREA <span className="text-gray-400">|</span> IYCK</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map(l=> {
            const isHash = l.type === 'hash';
            const id = isHash ? l.href.replace('#','') : null;
            const is = isHash && active === id;
            const finalHref = isHash ? (onHome ? l.href : `/${l.href}`) : l.href; // route links keep absolute path
            return (
              <a
                key={l.label}
                href={finalHref}
                className={`group relative px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:rounded-md transition
                  ${is? 'text-brand-800 font-semibold':'text-gray-700 hover:text-brand-700'}`}
              >
                {l.label}
                <span className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-brand-600 transition-transform duration-300 ${is? 'scale-x-100':'group-hover:scale-x-100'}`} />
              </a>
            );
          })}
          <a href={onHome ? '#trial' : '/#trial'} className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-500 shadow-soft-lg text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">체험 신청</a>
        </nav>
        <button onClick={()=>setOpen(true)} className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/70 border border-white/60 text-gray-700 shadow-sm backdrop-blur hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="메뉴 열기">
          <span className="sr-only">menu</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h14M3 12h14M3 18h14" /></svg>
        </button>
      </div>
      {open && <MobileSheet onClose={()=>setOpen(false)} />}
    </div>
  );
}

function MobileSheet({onClose}){
  const location = useLocation();
  const onHome = location.pathname === '/';
  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-xl p-6 flex flex-col gap-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="leading-tight -space-y-0.5">
            <div className="text-[15px] font-semibold tracking-[0.16em] text-brand-800">IYENGAR</div>
            <div className="text-[15px] font-semibold tracking-[0.16em] text-brand-800">YOGA COMMUNITY</div>
            <div className="pt-1 text-[10px] font-medium tracking-widest text-brand-700">KOREA <span className="text-gray-400">|</span> IYCK</div>
          </div>
          <button onClick={onClose} aria-label="닫기" className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <svg width="18" height="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"><path d="M5 5l8 8M13 5l-8 8" /></svg>
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-4 text-sm font-medium">
          {links.map(l=> {
            const isHash = l.type === 'hash';
            const finalHref = isHash ? (onHome ? l.href : `/${l.href}`) : l.href;
            return (
              <a key={l.label} href={finalHref} onClick={onClose} className="px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">{l.label}</a>
            );
          })}
          <a href={onHome ? '#trial' : '/#trial'} onClick={onClose} className="mt-4 inline-flex justify-center px-4 py-3 rounded-full bg-brand-600 text-white text-xs tracking-wide shadow-soft-lg hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">체험 클래스 신청</a>
        </nav>
        <p className="text-[11px] text-gray-400">© {new Date().getFullYear()} IYCK</p>
      </div>
    </div>
  );
}
