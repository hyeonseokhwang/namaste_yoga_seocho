import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useActiveSection from '../../shared/hooks/useActiveSection.js';

// Optimized menu: Consolidate lineage/info under one grouped dropdown for clarity.
// types: hash | route | group
const nav = [
  { type:'hash', href:'#about', label:'소개' },
  {
    type:'group',
    label:'Iyengar',
    items:[
      { href:'/guruji', label:'구루지' },
      { href:'/what', label:'Iyengar Yoga' },
      { href:'/iyck', label:'IYCK 협회' },
    ]
  },
  { type:'route', href:'/programs', label:'프로그램' },
  { type:'route', href:'/teachers', label:'교사' },
  { type:'route', href:'/faq', label:'FAQ' },
  { type:'hash', href:'#contact', label:'문의' },
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
  const active = useActiveSection(['about','programs','contact'], { offsetTop: 96 });
  const onHome = location.pathname === '/';
  const brandHref = onHome ? '#top' : '/';
  const [openGroup, setOpenGroup] = useState(null); // desktop dropdown id
  const dropdownRef = useRef(null);
  // close dropdown on outside click
  useEffect(()=>{
    function onDoc(e){
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenGroup(null);
    }
    document.addEventListener('mousedown', onDoc);
    return ()=> document.removeEventListener('mousedown', onDoc);
  },[]);
  // close on route change
  useEffect(()=>{ setOpenGroup(null); }, [location.pathname]);

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
        <nav ref={dropdownRef} className="hidden md:flex items-center gap-7 text-sm font-medium">
          {nav.map(item=> {
            if(item.type === 'group'){
              const anyActive = item.items.some(s => location.pathname === s.href);
              const open = openGroup === item.label;
              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={()=> setOpenGroup(open? null : item.label)}
                    className={`inline-flex items-center gap-1 px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-md transition ${anyActive? 'text-brand-800 font-semibold':'text-gray-700 hover:text-brand-700'}`}
                    aria-haspopup="true"
                    aria-expanded={open}
                  >
                    {item.label}
                    <svg className={`w-3 h-3 transition-transform ${open? 'rotate-180':''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                  </button>
                  {open && (
                    <div className="absolute left-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white/95 backdrop-blur shadow-lg py-2 animate-fade-in">
                      {item.items.map(sub=> {
                        const activeSub = location.pathname === sub.href;
                        return (
                          <a key={sub.label} href={sub.href} className={`block px-4 py-2 text-[13px] rounded-md mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${activeSub? 'bg-brand-50 text-brand-800 font-semibold':'text-gray-700 hover:bg-gray-100 hover:text-brand-800'}`}>{sub.label}</a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            const isHash = item.type === 'hash';
            const id = isHash ? item.href.replace('#','') : null;
            const routeActive = item.type === 'route' && location.pathname === item.href;
            const hashActive = isHash && active === id && onHome;
            const is = routeActive || hashActive;
            const finalHref = isHash ? (onHome ? item.href : `/${item.href}`) : item.href;
            return (
              <a key={item.label} href={finalHref} className={`group relative px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-md transition ${is? 'text-brand-800 font-semibold':'text-gray-700 hover:text-brand-700'}`} aria-current={is? 'page': undefined}>
                {item.label}
                <span className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-brand-600 transition-transform duration-300 ${is? 'scale-x-100':'group-hover:scale-x-100'}`} />
              </a>
            );
          })}
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
  const [openGroup, setOpenGroup] = useState(true); // default open for quick access
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
        <nav className="flex-1 flex flex-col gap-2 text-sm font-medium">
          {nav.map(item=> {
            if(item.type === 'group'){
              const anyActive = item.items.some(s=> location.pathname === s.href);
              return (
                <div key={item.label} className="border border-gray-100 rounded-lg overflow-hidden">
                  <button onClick={()=> setOpenGroup(o=> !o)} className={`w-full flex items-center justify-between px-3 py-2 text-left ${anyActive? 'bg-brand-50 text-brand-800 font-semibold':'text-gray-700 hover:bg-gray-50'}`} aria-expanded={openGroup}>
                    <span>{item.label}</span>
                    <svg className={`w-4 h-4 transition-transform ${openGroup? 'rotate-180':''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                  </button>
                  {openGroup && (
                    <div className="px-1.5 py-1.5 flex flex-col gap-1 bg-white/60">
                      {item.items.map(sub=> {
                        const activeSub = location.pathname === sub.href;
                        return (
                          <a key={sub.label} href={sub.href} onClick={onClose} className={`px-2 py-2 rounded-md text-[13px] ${activeSub? 'bg-brand-50 text-brand-800 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>{sub.label}</a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            const isHash = item.type === 'hash';
            const finalHref = isHash ? (onHome ? item.href : `/${item.href}`) : item.href;
            const routeActive = item.type === 'route' && location.pathname === item.href;
            const hashActive = isHash && onHome && window.location.hash === item.href;
            const is = routeActive || hashActive;
            return (
              <a key={item.label} href={finalHref} onClick={onClose} aria-current={is? 'page': undefined} className={`px-2 py-2 rounded-md ${is? 'bg-brand-50 text-brand-800 font-semibold':'text-gray-700 hover:bg-gray-100'}`}>{item.label}</a>
            );
          })}
        </nav>
        <p className="text-[11px] text-gray-400">© {new Date().getFullYear()} IYCK</p>
      </div>
    </div>
  );
}
