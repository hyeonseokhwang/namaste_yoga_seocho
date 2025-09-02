import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import useActiveSection from '../../shared/hooks/useActiveSection.js';
import { useTheme } from '../../shared/ui/ThemeProvider.jsx';
import { useI18n } from '../../shared/i18n/I18nProvider.jsx';

// Optimized menu: Consolidate lineage/info under one grouped dropdown for clarity.
// types: hash | route | group
function buildNav(t){
  return [
    { type:'hash', href:'#about', label:t('nav.about') },
    {
      type:'group',
      label:t('nav.iyengar'),
      items:[
  { href:'/guruji', label:'B.K.S. Iyengar' }, // renamed per request
        { href:'/what', label:'Iyengar Yoga' },
        { href:'/iyck', label:'IYCK 협회' },
      ]
    },
    { type:'route', href:'/programs', label:t('nav.programs') },
    { type:'route', href:'/teachers', label:t('nav.teachers') },
    { type:'route', href:'/gallery', label:t('nav.gallery') },
    { type:'route', href:'/faq', label:t('nav.faq') },
    { type:'hash', href:'#contact', label:t('nav.contact') },
  ];
}

export default function NavBar(){
  const { t, lang, toggleLang } = useI18n();
  const nav = buildNav(t);
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

  const mobileTriggerRef = useRef(null);
  const { theme, toggle } = useTheme();
  // lock scroll when mobile sheet open
  useEffect(()=>{
    if(open){
      const prev = document.body.style.overflow;
      document.body.style.overflow='hidden';
      return ()=> { document.body.style.overflow = prev; };
    }
  },[open]);

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
  <nav ref={dropdownRef} className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium whitespace-nowrap" role="menubar" aria-label="Main navigation">
          {nav.map(item=> {
            if(item.type === 'group'){
              const anyActive = item.items.some(s => location.pathname === s.href);
              const open = openGroup === item.label;
              return (
    <div key={item.label} className="relative cursor-pointer" role="none">
                  <button
                    onClick={()=> setOpenGroup(open? null : item.label)}
        className={`inline-flex items-center gap-1 px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-md transition cursor-pointer whitespace-nowrap ${anyActive? 'text-brand-800 font-semibold':'text-gray-700 hover:text-brand-700'}`}
                    aria-haspopup="true"
                    aria-expanded={open}
        aria-controls={`group-${item.label}`}
        role="menuitem"
                    onKeyDown={(e)=>{
                      if(e.key==='ArrowDown'){
                        e.preventDefault();
                        if(!open) setOpenGroup(item.label);
                        setTimeout(()=>{
                          const first = dropdownRef.current?.querySelector(`#group-${item.label} a`);
                          first?.focus();
                        },0);
                      }
                    }}
                  >
                    {item.label}
                    <svg className={`w-3 h-3 transition-transform ${open? 'rotate-180':''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                  </button>
                  {open && (
        <div id={`group-${item.label}`} role="menu" className="absolute left-0 mt-2 w-60 rounded-xl border border-gray-200 bg-white/95 backdrop-blur shadow-lg py-2 animate-fade-in" onKeyDown={(e)=>{ if(e.key==='Escape'){ setOpenGroup(null); } }}>
                      {item.items.map(sub=> {
                        const activeSub = location.pathname === sub.href;
                        return (
        <a role="menuitem" key={sub.label} href={sub.href} className={`block px-4 py-2 text-[13px] rounded-md mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap ${activeSub? 'bg-brand-50 text-brand-800 font-semibold':'text-gray-700 hover:bg-gray-100 hover:text-brand-800'}`}>{sub.label}</a>
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
  <a role="menuitem" key={item.label} href={finalHref} className={`group relative px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-md transition cursor-pointer whitespace-nowrap ${is? 'text-brand-800 font-semibold':'text-gray-700 hover:text-brand-700'}`} aria-current={is? 'page': undefined}>
                {item.label}
                <span className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-brand-600 transition-transform duration-300 ${is? 'scale-x-100':'group-hover:scale-x-100'}`} />
              </a>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-2">
        <button
          onClick={toggle}
          aria-label={theme==='dark'? t('theme.toLight'): t('theme.toDark')}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 border border-white/60 text-gray-700 shadow-sm backdrop-blur hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition cursor-pointer group"
        >
          {/* Animated sun/moon (improved clarity) */}
          <span className="relative block w-5 h-5">
            <svg
              className={`absolute inset-0 w-5 h-5 origin-center transition-all duration-500 ${theme==='dark'? 'scale-0 rotate-90 opacity-0':'scale-100 rotate-0 opacity-100'}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <g className="transition-opacity duration-500" >
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
            <svg
              className={`absolute inset-0 w-5 h-5 origin-center transition-all duration-500 ${theme==='dark'? 'scale-100 rotate-0 opacity-100':'scale-0 -rotate-90 opacity-0'}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              {/* Crescent (lucide style) */}
              <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
            </svg>
          </span>
        </button>
        <button onClick={toggleLang} aria-label={lang==='ko'? 'Switch to English':'한국어로 보기'} className="inline-flex h-10 px-4 items-center justify-center rounded-full bg-white/70 border border-white/60 text-[11px] font-semibold tracking-wide text-gray-700 shadow-sm backdrop-blur hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition cursor-pointer">
          {lang==='ko'? 'EN':'KO'}
        </button>
        </div>
  <button ref={mobileTriggerRef} onClick={()=>setOpen(true)} className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/70 border border-white/60 text-gray-700 shadow-sm backdrop-blur hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer" aria-label="메뉴 열기">
          <span className="sr-only">menu</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h14M3 12h14M3 18h14" /></svg>
        </button>
      </div>
  {open && <StandardMobileMenu onClose={()=>{ setOpen(false); mobileTriggerRef.current?.focus(); }} />}
    </div>
  );
}

function StandardMobileMenu({onClose}){
  const location = useLocation();
  const onHome = location.pathname === '/';
  const menuRef = useRef(null);
  const [openGroup, setOpenGroup] = useState(true);
  const { theme, toggle } = useTheme();
  const { t, lang, toggleLang } = useI18n();
  const nav = buildNav(t);
  // focus + trap
  useEffect(()=>{
    menuRef.current?.querySelector('button, a')?.focus();
    function onKey(e){
      if(e.key==='Escape'){ e.preventDefault(); onClose(); }
      if(e.key==='Tab'){
        const nodes = menuRef.current?.querySelectorAll('button,a');
        if(!nodes) return; const arr=[...nodes]; const idx=arr.indexOf(document.activeElement);
        if(e.shiftKey && (idx<=0)){ e.preventDefault(); arr[arr.length-1].focus(); }
        else if(!e.shiftKey && idx===arr.length-1){ e.preventDefault(); arr[0].focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return ()=> document.removeEventListener('keydown', onKey);
  },[onClose]);
  return createPortal(
    <div className="fixed inset-0 z-[1000]" role="dialog" aria-modal="true" aria-label="모바일 메뉴">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-100" onClick={onClose} />
      {/* panel */}
      <div ref={menuRef} className="absolute inset-0 bg-white dark:bg-brand-900 text-brand-800 dark:text-brand-50 flex flex-col pt-[calc(env(safe-area-inset-top)+12px)] animate-fade-in">
        <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200/70 dark:border-white/10">
          <div className="leading-tight -space-y-0.5">
            <div className="text-[16px] font-semibold tracking-[0.16em]">IYENGAR</div>
            <div className="text-[16px] font-semibold tracking-[0.16em]">YOGA COMMUNITY</div>
            <div className="pt-1 text-[10px] font-medium tracking-widest text-brand-600 dark:text-brand-200">KOREA <span className="text-gray-400 dark:text-white/40">|</span> IYCK</div>
          </div>
          <button onClick={onClose} aria-label="닫기" className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 ring-1 ring-gray-300/70 dark:ring-white/20 transition cursor-pointer">
            <svg width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"><path d="M5 5l10 10M15 5 5 15" /></svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-4 text-[15px] font-medium">
          <button onClick={toggle} className="w-full flex items-center justify-between px-4 py-3 rounded-xl ring-1 ring-gray-200/80 dark:ring-white/15 bg-white/70 dark:bg-white/5" aria-label={theme==='dark'? t('theme.toLight'): t('theme.toDark')}>
            <span className="text-sm font-semibold">{theme==='dark'? t('theme.toLight'): t('theme.toDark')}</span>
            <span className="relative w-5 h-5">
              <svg
                className={`absolute inset-0 w-5 h-5 origin-center transition-all duration-500 ${theme==='dark'? 'scale-0 rotate-90 opacity-0':'scale-100 rotate-0 opacity-100'}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <g>
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
              </svg>
              <svg
                className={`absolute inset-0 w-5 h-5 origin-center transition-all duration-500 ${theme==='dark'? 'scale-100 rotate-0 opacity-100':'scale-0 -rotate-90 opacity-0'}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
              </svg>
            </span>
          </button>
          <button onClick={toggleLang} className="w-full flex items-center justify-between px-4 py-3 rounded-xl ring-1 ring-gray-200/80 dark:ring-white/15 bg-white/70 dark:bg-white/5" aria-label={lang==='ko'? 'Switch to English':'한국어로 보기'}>
            <span className="text-sm font-semibold">{lang==='ko'? 'English':'한국어'}</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4h12M2 8h12M2 12h12" /></svg>
          </button>
          {nav.map(item=> {
            if(item.type==='group'){
              return (
                <div key={item.label} className="border border-gray-200 dark:border-white/15 rounded-xl overflow-hidden">
                  <button onClick={()=> setOpenGroup(o=> !o)} aria-expanded={openGroup} className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50/60 dark:bg-white/5 cursor-pointer">
                    <span className="font-semibold tracking-wide">{item.label}</span>
                    <svg className={`w-4 h-4 transition-transform ${openGroup? 'rotate-180':''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                  </button>
                  <div className={`${openGroup? 'max-h-96 opacity-100':'max-h-0 opacity-0'} transition-all duration-300 overflow-hidden`}> 
                    <ul className="p-2 flex flex-col gap-1">
                      {item.items.map(sub=> {
                        const activeSub = location.pathname === sub.href;
                        return (
                          <li key={sub.href}>
                            <a href={sub.href} onClick={onClose} className={`block px-3 py-2 rounded-lg text-[14px] transition ${activeSub? 'bg-brand-100 text-brand-800 font-semibold dark:bg-white/15 dark:text-white':'hover:bg-gray-100 dark:hover:bg-white/10'}`}>{sub.label}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            }
            const isHash = item.type==='hash';
            const finalHref = isHash ? (onHome ? item.href : `/${item.href}`) : item.href;
            const routeActive = item.type==='route' && location.pathname === item.href;
            const hashActive = isHash && onHome && window.location.hash === item.href;
            const active = routeActive || hashActive;
            return (
              <a key={item.label} href={finalHref} onClick={onClose} aria-current={active? 'page':undefined} className={`block px-5 py-4 rounded-xl ring-1 ring-gray-200/80 dark:ring-white/15 bg-white/70 dark:bg-white/5 backdrop-blur transition ${active? 'bg-brand-50 ring-brand-300 text-brand-900 font-semibold dark:bg-white/15 dark:text-white':'hover:bg-gray-50 dark:hover:bg-white/10'}`}>{item.label}</a>
            );
          })}
        </nav>
        <div className="px-6 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-4 border-t border-gray-200/70 dark:border-white/10 text-center text-[11px] text-gray-500 dark:text-white/40">© 2025 IYCK. All rights reserved.</div>
      </div>
    </div>,
    document.body
  );
}
