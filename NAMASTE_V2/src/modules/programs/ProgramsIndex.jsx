import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import useScrollReveal from '../landing/hooks/useScrollReveal.js';
import { useState, useEffect, useRef, useMemo } from 'react';
import { featuredWorkshop as baseFeatured, pastWorkshops, pastWorkshopsEn, moreUpcoming as baseMoreUpcoming } from './data/programsData.js';
import Meta from '../shared/seo/Meta.jsx';
import { buildSeo, getGlobalSchemas } from '../shared/seo/seoUtils.js';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';
import BlurImage from '../shared/ui/BlurImage.jsx';
import useFocusTrap from '../shared/hooks/useFocusTrap.js';

export default function ProgramsIndex(){
  const { lang, dict } = useI18n();
  const { hreflangs, canonical } = buildSeo('/programs');
  // Merge language overrides for featured + upcoming
  const featuredWorkshop = useMemo(()=> {
    if(lang==='en' && baseFeatured.en){
      return { ...baseFeatured, ...baseFeatured.en };
    }
    return baseFeatured;
  }, [lang]);
  const moreUpcoming = useMemo(()=> {
    if(lang==='en') return baseMoreUpcoming.map(w=> w.en? ({...w, ...w.en}) : w);
    return baseMoreUpcoming;
  }, [lang]);
  const pg = dict.programsPage;
  // Dynamic workshops state (admin additions)
  const [dyn, setDyn] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [loadingDyn, setLoadingDyn] = useState(false);
  const [formOpen,setFormOpen] = useState(false);
  const [creating,setCreating] = useState(false);
  const [err,setErr] = useState('');
  const newRef = useRef(null);
  const emptyTrans = { ko:'', en:'' };
  const emptyForm = { id:null, title:{...emptyTrans}, dateLabel:{...emptyTrans}, summary:{...emptyTrans}, sessionsKo:'', sessionsEn:'', totalHours:'', location:{...emptyTrans}, tuition:{...emptyTrans}, contacts:{...emptyTrans}, email:'', focus:{...emptyTrans}, images:[], imageInput:'', status:'upcoming' };
  const [form,setForm] = useState(emptyForm);
  async function loadDyn(){
    try { setLoadingDyn(true); const r = await fetch('/api/workshops'); const j = await r.json(); setDyn(j.items||[]); } catch{} finally { setLoadingDyn(false);} }
  async function checkAdmin(){ try { const r= await fetch('/api/admin/me'); const j= await r.json(); const ok=!!j.loggedIn; setAdmin(ok); if(ok) loadDyn(); } catch{} }
  useEffect(()=>{ checkAdmin(); },[]);
  async function createOrSave(e){ e.preventDefault(); setErr('');
    // Validation: all bilingual fields must have both ko & en
    const mustTrans = ['title','dateLabel','summary','location','tuition','contacts','focus'];
    const missing = mustTrans.filter(f=> !form[f].ko.trim() || !form[f].en.trim());
    const sessionsKo = form.sessionsKo.split('\n').map(s=> s.trim()).filter(Boolean);
    const sessionsEn = form.sessionsEn.split('\n').map(s=> s.trim()).filter(Boolean);
    if(!sessionsKo.length || !sessionsEn.length) missing.push('sessions');
    if(missing.length){ setErr('다국어 필드 누락: '+missing.join(', ')); return; }
    setCreating(true); try {
      const images = form.images.filter(Boolean);
      const payload = { title:{ko:form.title.ko.trim(), en:form.title.en.trim()}, dateLabel:{ko:form.dateLabel.ko.trim(), en:form.dateLabel.en.trim()}, summary:{ko:form.summary.ko.trim(), en:form.summary.en.trim()}, startDate:null, totalHours: form.totalHours.trim(), sessions:{ ko: sessionsKo, en: sessionsEn }, location:{ko:form.location.ko.trim(), en:form.location.en.trim()}, tuition:{ko:form.tuition.ko.trim(), en:form.tuition.en.trim()}, contacts:{ko:form.contacts.ko.trim(), en:form.contacts.en.trim()}, email: form.email.trim(), focus:{ko:form.focus.ko.trim(), en:form.focus.en.trim()}, images, status: form.status };
      let r,j;
      if(form.id){
        r = await fetch('/api/workshops/'+form.id,{method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      } else {
        r = await fetch('/api/workshops',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      }
      j = await r.json(); if(!r.ok) throw new Error(j.error||'save_failed');
      setForm(emptyForm);
      setFormOpen(false); loadDyn(); setTimeout(()=> newRef.current?.scrollIntoView({behavior:'smooth'}), 50);
    } catch(e){ setErr(e.message);} finally { setCreating(false);} }
  async function delDyn(id){ if(!window.confirm('Delete this workshop?')) return; try { const r = await fetch('/api/workshops/'+id,{method:'DELETE'}); const j= await r.json(); if(!r.ok) throw new Error(j.error||'delete_failed'); setDyn(d=> d.filter(x=> x.id!==id)); } catch(e){ alert(e.message); } }
  async function cloneDyn(id){ try { const r = await fetch('/api/workshops/'+id+'/clone',{method:'POST'}); const j= await r.json(); if(!r.ok) throw new Error(j.error||'clone_failed'); loadDyn(); } catch(e){ alert(e.message); } }
  function editDyn(w){
    // Normalize possible legacy strings to bilingual fields
    const norm = f=> (typeof w[f]==='string'? {ko:w[f], en:w[f]} : (w[f]||{ko:'',en:''}));
    const sessionsKo = Array.isArray(w.sessions?.ko)? w.sessions.ko : Array.isArray(w.sessions)? w.sessions: [];
    const sessionsEn = Array.isArray(w.sessions?.en)? w.sessions.en : Array.isArray(w.sessions)? w.sessions: [];
    setForm({
      id:w.id,
      title: norm('title'),
      dateLabel: norm('dateLabel'),
      summary: norm('summary'),
      sessionsKo: sessionsKo.join('\n'),
      sessionsEn: sessionsEn.join('\n'),
      totalHours: w.totalHours||'',
      location: norm('location'),
      tuition: norm('tuition'),
      contacts: norm('contacts'),
      email: w.email||'',
      focus: norm('focus'),
      images:[...(w.images||[])],
      imageInput:'',
      status:w.status||'upcoming'
    });
    setFormOpen(true); setTimeout(()=> newRef.current?.scrollIntoView({behavior:'smooth'}), 50);
  }
  function addImage(){
    const url = (form.imageInput||'').trim();
    if(!url) return;
    setForm(f=> ({...f, images:[...f.images, url], imageInput:''}));
  }
  function removeImage(i){ setForm(f=> ({...f, images: f.images.filter((_,idx)=> idx!==i)})); }
  function moveImage(i,dir){ setForm(f=> { const arr=[...f.images]; const ni=i+dir; if(ni<0||ni>=arr.length) return f; [arr[i],arr[ni]]=[arr[ni],arr[i]]; return {...f, images:arr}; }); }
  return (
    <>
      <Meta
        title={lang==='ko'? `프로그램 | ${featuredWorkshop.title}` : `Programs | ${featuredWorkshop.title}`}
        description={featuredWorkshop.summary}
  lang={lang}
  hreflangs={hreflangs}
        canonical={canonical(lang)}
        structuredData={[
          ...getGlobalSchemas(),
          {
            '@context':'https://schema.org',
            '@type':'Event',
            name: featuredWorkshop.title,
            startDate: featuredWorkshop.startDate,
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type':'Place',
              name: featuredWorkshop.location,
              address: featuredWorkshop.location
            },
            image: featuredWorkshop.images,
            description: featuredWorkshop.summary,
            organizer: {
              '@type':'Organization',
              name: 'Iyengar Yoga Community Korea'
            }
          }
        ]}
      />
      <div id="top" />
      <NavBar />
  <Hero />
  <ProgramsOverview featuredWorkshop={featuredWorkshop} moreUpcoming={moreUpcoming} dynamicList={dyn} admin={admin} handlers={{delDyn, cloneDyn, editDyn, addImage, removeImage, moveImage, setFormOpen, formOpen, form, setForm, createOrSave, creating, err, loadingDyn, newRef}} />
      <div id="contact"><Footer /></div>
    </>
  );
}

function Hero(){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  const ref = useScrollReveal();
  return (
  <header ref={ref} className="relative overflow-hidden pt-40 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-brand-50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_35%,rgba(86,141,168,0.22),transparent_60%),radial-gradient(circle_at_80%_65%,rgba(50,101,127,0.18),transparent_60%)]" />
      <div className="container-beam max-w-5xl grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-7">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.heroTitle}</h1>
          <p className="mt-6 text-[15px] md:text-base leading-relaxed text-brand-800/80 max-w-xl" lang={lang}>{pg.heroDesc}</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-2xl">
            <ProgramTypeCard icon="compass" title={pg.types.workshop[0]} desc={pg.types.workshop[1]} />
            <ProgramTypeCard icon="leaf" title={pg.types.intro[0]} desc={pg.types.intro[1]} />
            <ProgramTypeCard icon="cap" title={pg.types.teacher[0]} desc={pg.types.teacher[1]} />
            <ProgramTypeCard icon="hands" title={pg.types.community[0]} desc={pg.types.community[1]} />
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col gap-5">
          <HeroThumb img="/img/practice2.jpg" label={pg.heroThumb1} />
          <HeroThumb img="/img/practice3.jpg" label={pg.heroThumb2} />
        </div>
      </div>
  <div className="h-px w-full mt-12 bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
    </header>
  );
}

function ProgramsOverview({featuredWorkshop, moreUpcoming, dynamicList=[], admin=false, handlers}){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  const dynSorted = [...dynamicList].sort((a,b)=> (b.createdAt||'').localeCompare(a.createdAt||''));
  const ongoing = dynSorted.filter(w=> w.status==='ongoing');
  const upcomingDyn = dynSorted.filter(w=> w.status!=='ongoing');
  return (
    <main className="bg-gradient-to-b from-brand-50 via-white to-brand-50/60 pb-44 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_70%,rgba(86,141,168,0.18),transparent_65%),radial-gradient(circle_at_85%_25%,rgba(50,101,127,0.16),transparent_60%)]" />
      <div className="container-beam max-w-6xl relative">
        {/* Featured Upcoming */}
  <section id="upcoming" className="pt-4">
          <div className="mb-10">
            <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.upcoming}</h3>
          </div>
          <div className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] md:flex group">
            <FeaturedImages />
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
              <header className="space-y-3">
                <h4 className="text-[12px] font-medium tracking-widest text-brand-600">{featuredWorkshop.dateLabel}</h4>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">{featuredWorkshop.title}</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">{featuredWorkshop.summary}</p>
              </header>
              <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                <ul className="space-y-2 text-brand-800/80">
                  <li><strong className="text-brand-700">{pg.session1}:</strong> {featuredWorkshop.sessions[0]}</li>
                  <li><strong className="text-brand-700">{pg.session2}:</strong> {featuredWorkshop.sessions[1]}</li>
                  <li><strong className="text-brand-700">{pg.totalHours}:</strong> {featuredWorkshop.totalHours}{lang==='ko'? '시간':''}</li>
                  <li><strong className="text-brand-700">{pg.location}:</strong> {featuredWorkshop.location}</li>
                </ul>
                <ul className="space-y-2 text-brand-800/80">
                  <li><strong className="text-brand-700">{pg.tuition}:</strong> {featuredWorkshop.tuition}</li>
                  <li><strong className="text-brand-700">{pg.contact}:</strong> {featuredWorkshop.contacts}</li>
                  <li><strong className="text-brand-700">{pg.email}:</strong> {featuredWorkshop.email}</li>
                  <li><strong className="text-brand-700">{pg.focus}:</strong> {featuredWorkshop.focus}</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#register" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 text-white px-6 py-3 text-[13px] font-medium shadow hover:bg-brand-600 transition">{pg.register}</a>
              </div>
              <p className="text-[11px] text-brand-600/60" lang={lang}>{pg.disclaimer}</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
          </div>
          {/* Additional upcoming workshops (same card style as featured) */}
          {!!(moreUpcoming?.length || ongoing.length || upcomingDyn.length || admin) && (
            <div className="mt-8 grid gap-6" ref={handlers?.newRef}>
              {admin && (
                <div className="relative rounded-4xl overflow-hidden ring-1 ring-dashed ring-brand-300/70 bg-white/60 p-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-brand-700">{handlers.form.id? '워크숍 수정' : (handlers.formOpen? '새 워크숍 생성' : '워크숍 추가')}</h4>
                    <button onClick={()=> { if(handlers.formOpen){ handlers.setForm({ id:null, title:'', dateLabel:'', summary:'', sessions:'', totalHours:'', location:'', tuition:'', contacts:'', email:'', focus:'', images:'', status:'upcoming'});} handlers.setFormOpen(o=> !o); }} className="text-xs px-3 py-1 rounded-full bg-brand-700 text-white hover:bg-brand-600">{handlers.formOpen? pg.manage.cancel:pg.manage.add}</button>
                  </div>
                  {handlers.err && <div className="text-[12px] text-red-600">{handlers.err}</div>}
                  {handlers.formOpen && (
                    <form onSubmit={handlers.createOrSave} className="grid md:grid-cols-2 gap-4 text-[12px]">
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold text-brand-700/80 uppercase tracking-wide">{pg.manage.status}</label>
                        <select value={handlers.form.status} onChange={e=> handlers.setForm(f=>({...f,status:e.target.value}))} className="px-3 py-2 rounded border bg-white/70 text-[12px]">
                          <option value="ongoing">{pg.manage.ongoing}</option>
                          <option value="upcoming">{pg.manage.upcoming}</option>
                        </select>
                      </div>
                      {/* Bilingual fields */}
                      {['title','dateLabel','summary','location','tuition','contacts','focus'].map(k=> (
                        <div key={k} className={['summary','focus'].includes(k)? 'md:col-span-2 flex flex-col gap-2':'flex flex-col gap-2'}>
                          <label className="font-semibold text-brand-700/80 uppercase tracking-wide">{k} <span className="text-[10px] text-brand-600/70">(KO / EN)</span></label>
                          <div className="grid grid-cols-2 gap-2">
                            <input placeholder="KO" value={handlers.form[k].ko} onChange={e=> handlers.setForm(f=> ({...f, [k]: {...f[k], ko:e.target.value}}))} className="px-3 py-2 rounded border bg-white/70 text-[12px]" required />
                            <input placeholder="EN" value={handlers.form[k].en} onChange={e=> handlers.setForm(f=> ({...f, [k]: {...f[k], en:e.target.value}}))} className="px-3 py-2 rounded border bg-white/70 text-[12px]" required />
                          </div>
                        </div>
                      ))}
                      {/* Sessions bilingual */}
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="font-semibold text-brand-700/80 uppercase tracking-wide">sessions <span className="text-[10px] text-brand-600/70">(KO / EN)</span></label>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <textarea placeholder="세션별 한 줄 (KO)" rows={3} value={handlers.form.sessionsKo} onChange={e=> handlers.setForm(f=> ({...f, sessionsKo:e.target.value}))} className="px-3 py-2 rounded border bg-white/70 text-[12px]" required />
                            <p className="text-[10px] text-brand-600/70">줄바꿈 = 새 세션 (KO)</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <textarea placeholder="One line per session (EN)" rows={3} value={handlers.form.sessionsEn} onChange={e=> handlers.setForm(f=> ({...f, sessionsEn:e.target.value}))} className="px-3 py-2 rounded border bg-white/70 text-[12px]" required />
                            <p className="text-[10px] text-brand-600/70">Line break = new session (EN)</p>
                          </div>
                        </div>
                      </div>
                      {/* Total hours & email (single language) */}
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold text-brand-700/80 uppercase tracking-wide">totalHours</label>
                        <input value={handlers.form.totalHours} onChange={e=> handlers.setForm(f=> ({...f, totalHours:e.target.value}))} className="px-3 py-2 rounded border bg-white/70 text-[12px]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold text-brand-700/80 uppercase tracking-wide">email</label>
                        <input type="email" value={handlers.form.email} onChange={e=> handlers.setForm(f=> ({...f, email:e.target.value}))} className="px-3 py-2 rounded border bg-white/70 text-[12px]" required />
                      </div>
                      {/* Images manager */}
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="font-semibold text-brand-700/80 uppercase tracking-wide">Images</label>
                        <div className="flex gap-2 items-center">
                          <input value={handlers.form.imageInput} onChange={e=> handlers.setForm(f=> ({...f, imageInput:e.target.value}))} placeholder="https://..." className="flex-1 px-3 py-2 rounded border bg-white/70 text-[12px]" />
                          <button type="button" onClick={handlers.addImage} className="px-3 py-2 rounded-md bg-brand-700 text-white text-[12px] font-semibold hover:bg-brand-600">Add</button>
                        </div>
                        {handlers.form.images.length>0 && (
                          <ul className="grid sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                            {handlers.form.images.map((img,i)=> (
                              <li key={i} className="relative group">
                                <img src={img} alt="preview" className="w-full h-28 object-cover rounded-lg ring-1 ring-brand-200/60" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 rounded-lg">
                                  <button type="button" onClick={()=> handlers.moveImage(i,-1)} disabled={i===0} className="px-2 py-1 text-[10px] rounded bg-white/70 disabled:opacity-40">↑</button>
                                  <button type="button" onClick={()=> handlers.moveImage(i,1)} disabled={i===handlers.form.images.length-1} className="px-2 py-1 text-[10px] rounded bg-white/70 disabled:opacity-40">↓</button>
                                  <button type="button" onClick={()=> handlers.removeImage(i)} className="px-2 py-1 text-[10px] rounded bg-red-600 text-white">X</button>
                                </div>
                                <p className="mt-1 text-[10px] break-all leading-snug line-clamp-2 text-brand-700/70">{img}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                        <p className="text-[10px] text-brand-600/70">한 번에 하나씩 URL 추가 · 드래그 순서 기능은 추후</p>
                      </div>
                      <div className="md:col-span-2 flex justify-end">
                        <button disabled={handlers.creating} className="px-5 py-2 rounded-full bg-brand-700 text-white text-xs font-semibold hover:bg-brand-600 disabled:opacity-50">{handlers.creating? (handlers.form.id? '업데이트...' : '저장...') : (handlers.form.id? '업데이트':'저장')}</button>
                      </div>
                    </form>
                  )}
                </div>
              )}
              {!!ongoing.length && <h4 className="text-sm font-semibold text-brand-700 mt-4">{pg.ongoing}</h4>}
              {ongoing.map(w => (
                <WorkshopCard key={w.id} w={w} lang={lang} pg={pg} admin={admin} onDelete={()=> handlers.delDyn(w.id)} onClone={()=> handlers.cloneDyn(w.id)} onEdit={()=> handlers.editDyn(w)} dynamic />
              ))}
              {!!upcomingDyn.length && <h4 className="text-sm font-semibold text-brand-700 mt-6">{pg.upcoming}</h4>}
              {upcomingDyn.map(w => (
                <WorkshopCard key={w.id} w={w} lang={lang} pg={pg} admin={admin} onDelete={()=> handlers.delDyn(w.id)} onClone={()=> handlers.cloneDyn(w.id)} onEdit={()=> handlers.editDyn(w)} dynamic />
              ))}
              {moreUpcoming.map(w => (
                <article key={w.id} className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] md:flex group">
                  <div className="md:w-1/2 relative h-[28rem] md:h-[760px]">
                      <img src={w.images[0]} alt={w.title} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-brand-100/95 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">{pg.tags.upcoming}</span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">{pg.tags.workshop}</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
                    <header className="space-y-3">
                      <h4 className="text-[12px] font-medium tracking-widest text-brand-600">{w.dateLabel?.[lang] || w.dateLabel?.ko || w.dateLabel}</h4>
                      <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">{w.title?.[lang] || w.title?.ko || w.title}</h3>
                      <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">{w.summary?.[lang] || w.summary?.ko || w.summary}</p>
                    </header>
                    <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                      <ul className="space-y-2 text-brand-800/80">
                        <li><strong className="text-brand-700">{pg.session1}:</strong> {(w.sessions?.[lang]||w.sessions?.ko||w.sessions)?.[0]}</li>
                        <li><strong className="text-brand-700">{pg.session2}:</strong> {(w.sessions?.[lang]||w.sessions?.ko||w.sessions)?.[1]}</li>
                        <li><strong className="text-brand-700">{pg.totalHours}:</strong> {w.totalHours}{lang==='ko'? '시간':''}</li>
                        <li><strong className="text-brand-700">{pg.location}:</strong> {w.location?.[lang] || w.location?.ko || w.location}</li>
                      </ul>
                      <ul className="space-y-2 text-brand-800/80">
                        <li><strong className="text-brand-700">{pg.tuition}:</strong> {w.tuition?.[lang] || w.tuition?.ko || w.tuition}</li>
                        <li><strong className="text-brand-700">{pg.contact}:</strong> {w.contacts?.[lang] || w.contacts?.ko || w.contacts}</li>
                        <li><strong className="text-brand-700">{pg.email}:</strong> {w.email}</li>
                        <li><strong className="text-brand-700">{pg.focus}:</strong> {w.focus?.[lang] || w.focus?.ko || w.focus}</li>
                      </ul>
                    </div>
                    {admin && <div className="pt-2"><button onClick={()=> handlers.delDyn(w.id)} className="text-[11px] px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-500">삭제</button></div>}
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
                </article>
              ))}
              {handlers.loadingDyn && <div className="text-[12px] text-brand-600">불러오는 중...</div>}
            </div>
          )}
        </section>

  <PastSection />
      </div>
    </main>
  );
}

// Reusable card for dynamic workshops (same style)
function WorkshopCard({w, lang, pg, admin, onDelete, onClone, onEdit, dynamic}){
  const [active,setActive] = useState(0);
  const [lightbox,setLightbox] = useState(false);
  const images = w.images||[];
  useEffect(()=> { if(active>=images.length) setActive(0); }, [images.length]);
  return (
    <article className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] md:flex group">
  <div className="md:w-1/2 relative h-[28rem] md:h-[760px] select-none">
  {images[active] && <img onClick={()=> setLightbox(true)} src={images[active]} alt={w.title} className="cursor-zoom-in absolute inset-0 w-full h-full object-cover object-top transition-opacity" loading="lazy" />}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-brand-100/95 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">{w.status==='ongoing'? pg.tags.ongoing : pg.tags.upcoming}</span>
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">{pg.tags.workshop}</span>
          {dynamic && <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-medium">NEW</span>}
        </div>
        {images.length>1 && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-2 overflow-x-auto scrollbar-thin pr-4">
            {images.map((img,i)=> (
              <button type="button" key={i} onClick={()=> setActive(i)} className={`relative w-14 h-14 rounded-lg overflow-hidden ring-2 ${i===active? 'ring-brand-500':'ring-white/40'} shrink-0 group/thumb`}>
                <img src={img} alt="thumb" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                {i!==active && <span className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition" />}
              </button>
            ))}
          </div>
        )}
        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 text-white text-xs">
              <span>{active+1} / {images.length}</span>
              <div className="flex gap-2 items-center">
                <button onClick={()=> setActive(a=> (a-1+images.length)%images.length)} className="px-3 py-1 bg-white/15 rounded-full hover:bg-white/25 disabled:opacity-30" disabled={images.length<2}>Prev</button>
                <button onClick={()=> setActive(a=> (a+1)%images.length)} className="px-3 py-1 bg-white/15 rounded-full hover:bg-white/25 disabled:opacity-30" disabled={images.length<2}>Next</button>
                <button onClick={()=> setLightbox(false)} className="px-3 py-1 bg-white/20 rounded-full hover:bg-white/30">닫기</button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center relative px-4 pb-4 md:px-10 md:pb-8">
              {active>0 && images.length>1 && <button onClick={()=> setActive(a=> a-1)} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white/90 bg-black/40 hover:bg-black/60 rounded-full w-11 h-11 items-center justify-center text-lg">‹</button>}
              {active<images.length-1 && images.length>1 && <button onClick={()=> setActive(a=> a+1)} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white/90 bg-black/40 hover:bg-black/60 rounded-full w-11 h-11 items-center justify-center text-lg">›</button>}
              <div className="relative max-h-[70vh] max-w-[82vw] md:max-w-[860px] w-full h-full flex items-center justify-center rounded-xl ring-1 ring-white/10 bg-black/10 p-2 md:p-4">
                <img src={images[active]} alt={w.title} className="max-h-full max-w-full object-contain shadow-xl rounded-lg" />
              </div>
            </div>
            {images.length>1 && (
              <div className="px-4 pt-2 pb-4 flex gap-2 overflow-x-auto bg-black/30">
                {images.map((img,i)=> (
                  <button key={i} onClick={()=> setActive(i)} className={`relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden ring-2 transition ${i===active? 'ring-brand-400':'ring-white/20 hover:ring-white/40'}`}>
                    <img src={img} alt="thumb" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
        <header className="space-y-3">
          <h4 className="text-[12px] font-medium tracking-widest text-brand-600">{w.dateLabel?.[lang] || w.dateLabel?.ko || w.dateLabel}</h4>
          <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">{w.title?.[lang] || w.title?.ko || w.title}</h3>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">{w.summary?.[lang] || w.summary?.ko || w.summary}</p>
        </header>
        <div className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
          <ul className="space-y-2 text-brand-800/80">
            <li><strong className="text-brand-700">{pg.session1}:</strong> {(w.sessions?.[lang]||w.sessions?.ko||w.sessions)?.[0]}</li>
            <li><strong className="text-brand-700">{pg.session2}:</strong> {(w.sessions?.[lang]||w.sessions?.ko||w.sessions)?.[1]}</li>
            <li><strong className="text-brand-700">{pg.totalHours}:</strong> {w.totalHours}{lang==='ko'? '시간':''}</li>
            <li><strong className="text-brand-700">{pg.location}:</strong> {w.location?.[lang] || w.location?.ko || w.location}</li>
          </ul>
          <ul className="space-y-2 text-brand-800/80">
            <li><strong className="text-brand-700">{pg.tuition}:</strong> {w.tuition?.[lang] || w.tuition?.ko || w.tuition}</li>
            <li><strong className="text-brand-700">{pg.contact}:</strong> {w.contacts?.[lang] || w.contacts?.ko || w.contacts}</li>
            <li><strong className="text-brand-700">{pg.email}:</strong> {w.email}</li>
            <li><strong className="text-brand-700">{pg.focus}:</strong> {w.focus?.[lang] || w.focus?.ko || w.focus}</li>
          </ul>
        </div>
        {admin && <div className="pt-2 flex gap-2 flex-wrap">
          <button onClick={onEdit} className="text-[11px] px-3 py-1 rounded-full bg-brand-700 text-white hover:bg-brand-600">수정</button>
            <button onClick={onClone} className="text-[11px] px-3 py-1 rounded-full bg-amber-600 text-white hover:bg-amber-500">복제</button>
            <button onClick={onDelete} className="text-[11px] px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-500">삭제</button>
        </div>}
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
    </article>
  );
}

// (Removed unused ProgramCard component)

function ProgramTypeCard({icon, title, desc}){
  const Icon = resolveIcon(icon);
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur ring-1 ring-brand-200/70 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_75%_25%,rgba(70,120,145,0.18),transparent_65%)]" />
      <div className="flex items-start gap-4 relative">
        <div className="h-10 w-10 rounded-full ring-1 ring-brand-200/60 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center text-brand-600">{Icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold tracking-wide text-brand-800 flex items-center gap-2">
            {title}
            <span className="h-px flex-1 bg-gradient-to-r from-brand-300/50 to-transparent" />
          </h4>
          <p className="mt-1 text-[11px] text-brand-700/75 leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="absolute -bottom-px left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

function resolveIcon(name){
  const stroke = 'stroke-current';
  const common = 'w-5 h-5 '+stroke+' text-brand-600';
  switch(name){
    case 'compass':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="m14.8 9.2-3.9 1.3-1.3 3.9 3.9-1.3 1.3-3.9Z" />
        </svg>
      );
    case 'leaf':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 13c5.5-9.5 14-9 14-9s1 8.5-4.5 14A8 8 0 0 1 5 13Z" />
          <path d="M9 9c2 2 3 3 6 4" />
        </svg>
      );
    case 'cap':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M3 10.5 12 6l9 4.5-9 4.5-9-4.5Z" />
          <path d="M7 12.7v4.3c0 .8 2.2 2.5 5 2.5s5-1.7 5-2.5v-4.3" />
        </svg>
      );
    case 'hands':
      return (
        <svg className={common} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
          <path d="M8 13V6.5a2.5 2.5 0 0 1 5 0V13m0-3.5V7a2.5 2.5 0 0 1 5 0v6c0 4-2.5 6-6 6h-.5" />
          <path d="M8 13v2c0 2.5 1 5 4 6" />
          <path d="M8 13H6.5A2.5 2.5 0 0 1 4 10.5v-1A2.5 2.5 0 0 1 6.5 7H8" />
        </svg>
      );
    default:
      return null;
  }
}

function HeroThumb({img, label}){
  return (
    <div className="relative group rounded-xl overflow-hidden ring-1 ring-brand-200/60 bg-white/30 backdrop-blur">
  <img src={img} alt={label} loading="lazy" decoding="async" width="640" height="320" className="h-40 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2 text-[11px] text-white/90 leading-snug drop-shadow-sm">{label}</div>
    </div>
  );
}

// Unified Past Section
function PastSection(){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  return (
    <section id="past" className="mt-40">
      <div className="mb-14 flex items-center gap-4">
  <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.pastHeading}</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-300/70 via-brand-200/40 to-transparent" />
      </div>
      <PastHighlightCard />
      <PastTimeline className="mt-32" />
    </section>
  );
}

function FeaturedImages(){
  const { dict } = useI18n();
  const pg = dict.programsPage;
  const images = [
    {src:'/img/class/KakaoTalk_20250818_091833656_02.jpg', alt:'Eyal Shifroni 워크숍 이미지 1 (남자 강사 지도)' },
    {src:'/img/class/KakaoTalk_20250818_091833656_01.jpg', alt:'Eyal Shifroni 워크숍 이미지 2 (참가자 수련)' }
  ];
  const [index,setIndex] = useState(0);
  const [open,setOpen] = useState(false);
  // ESC close with cleanup
  useEffect(()=>{
    if(!open) return;
    const handler = e => { if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);
  return (
  <div className="md:w-1/2 relative h-[28rem] md:h-[760px] flex flex-col">
      <button onClick={()=>setOpen(true)} className="relative flex-1 text-left cursor-zoom-in">
    {images.map((im,i)=> (
          <BlurImage
            key={im.src}
            src={im.src}
            alt={im.alt}
            className="absolute inset-0"
            imgClassName={`w-full h-full object-cover object-top transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0'}`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/5 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-brand-100/90 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">{pg.tags.featured}</span>
          <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">{pg.tags.workshop}</span>
        </div>
      </button>
      <div className="flex gap-2 p-3 justify-center bg-white/30 backdrop-blur-sm md:bg-transparent md:absolute md:bottom-4 md:left-4 md:flex-col md:gap-3">
        {images.map((im,i)=>(
          <button key={im.src} onClick={()=>setIndex(i)} aria-label={`이미지 ${i+1}`}
                  className={`relative overflow-hidden rounded-lg ring-1 ${i===index? 'ring-brand-400':'ring-brand-200'} w-16 h-12 transition`}>
            <img src={im.src} alt="" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-black/40 ${i===index? 'opacity-0':'opacity-30'} hover:opacity-0 transition-opacity`} />
          </button>
        ))}
      </div>
  {open && <Lightbox images={images} index={index} setIndex={setIndex} onClose={()=> setOpen(false)} />}
    </div>
  );
}

// Past workshop highlight card with integrated gallery preview & lightbox
function PastHighlightCard(){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  const folder = 'gallery/Namaste_Yoga/GeorgeDovas';
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [open,setOpen] = useState(-1);
  useEffect(()=>{
    let alive = true;
    (async ()=> {
      try {
        setLoading(true); setError(null);
        const res = await fetch(`/api/gallery?folder=${encodeURIComponent(folder)}`);
        if(!res.ok) throw new Error('HTTP '+res.status);
        const data = await res.json();
        if(!alive) return;
  // Limit to 6 images to keep highlight card height similar to upcoming section
  setItems((data.items||[]).slice(0,6));
      } catch(e){ if(alive) setError(e.message||String(e)); }
      finally { if(alive) setLoading(false); }
    })();
    return ()=> { alive=false; };
  },[]);

  const transform = (url, opts='f_auto,q_auto,c_fill,w_600') => url? url.replace(/\/upload\//, `/upload/${opts}/`) : '';

  useEffect(()=>{
    if(open<0) return;
    const onKey = (e)=>{
      if(e.key==='Escape') setOpen(-1);
      if(e.key==='ArrowLeft') setOpen(i=> i>0? i-1 : i);
      if(e.key==='ArrowRight') setOpen(i=> i<items.length-1? i+1 : i);
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[open,items.length]);

  return (
  <div className="relative" aria-labelledby="past-highlight-heading">
      <div className="relative rounded-4xl overflow-hidden ring-1 ring-brand-300/60 bg-gradient-to-br from-white via-brand-50 to-brand-100 shadow-[0_6px_28px_-10px_rgba(40,70,90,0.25)] md:flex group">
        {/* Image mosaic / gallery preview */}
  <div className="md:w-1/2 p-6 md:p-8 grid grid-cols-3 grid-rows-2 gap-2 content-start min-h-[340px] bg-gradient-to-b from-brand-50/60 via-white/40 to-brand-100/40">
          {loading && <div className="col-span-3 h-40 flex items-center justify-center text-[12px] text-brand-700/50">이미지 로딩중…</div>}
          {error && <div className="col-span-3 h-40 flex items-center justify-center text-[12px] text-red-600/70">불러오기 실패</div>}
          {!loading && !error && !items.length && <div className="col-span-3 h-40 flex items-center justify-center text-[12px] text-brand-700/50">이미지 없음</div>}
          {!!items.length && items.slice(0,6).map((it,idx)=> (
            <button key={it.public_id} onClick={()=> setOpen(idx)} className="relative group aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-brand-200/60 bg-white/40 focus:outline-none">
              <img src={transform(it.secure_url,'f_auto,q_auto,c_fill,w_400')} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity" />
            </button>
          ))}
        </div>
        {/* Textual info */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
          <header id="past-highlight-heading" className="space-y-4" lang={lang}>
            <div className="flex flex-wrap gap-2 items-center text-[11px] tracking-wide font-semibold">
              <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700">{pg.tags.highlight}</span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">GEORGE DOVAS</span>
              <span className="px-3 py-1 rounded-full bg-white/70 ring-1 ring-brand-200 text-brand-700">2025 JULY</span>
              <span className="px-3 py-1 rounded-full bg-white/60 ring-1 ring-brand-300 text-brand-600">{pg.tags.past}</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-brand-800">George Dovas {pg.highlight}</h3>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-800/80">{pg.highlightDesc}</p>
          </header>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/gallery?mode=georgedovas" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 text-white px-6 py-3 text-[13px] font-medium shadow hover:bg-brand-600 transition">{pg.viewAllGallery}</a>
          </div>
          <p className="text-[11px] text-brand-600/60">{pg.highlightNote}</p>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-brand-300/0 group-hover:ring-brand-400/70 transition" />
      </div>
  {open>=0 && items[open] && <Lightbox dynamic images={items.map(it=> ({src:transform(it.secure_url,'f_auto,q_auto,w_1600'), alt:'워크숍 사진'}))} index={open} setIndex={setOpen} onClose={()=> setOpen(-1)} />}
    </div>
  );
}

function PastTimeline({className=''}){
  const { dict, lang } = useI18n();
  const pg = dict.programsPage;
  const source = lang==='en'? pastWorkshopsEn : pastWorkshops;
  const years = Object.keys(source).sort((a,b)=> b.localeCompare(a));
  return (
    <div className={"relative "+className}>
      <div className="mb-10 flex items-center gap-3">
        <h4 className="text-xl font-semibold tracking-tight text-brand-800" lang={lang}>{pg.years}</h4>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-200/70 via-brand-200/30 to-transparent" />
      </div>
      <div className="grid md:grid-cols-3 gap-10 text-[13px] text-brand-800/80">
        {years.map(year => {
          const filtered = source[year].filter(item => !/George Dovas/i.test(item));
          if(!filtered.length) return null;
          return (
            <div key={year} className="relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-gradient-to-b from-brand-400/60 to-brand-200/20">
              <h5 className="font-semibold text-brand-700 mb-3 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-400" />{year}</h5>
              <ul className="space-y-2">
                {filtered.map((item,i)=> <li key={i}>{item}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Accessible Lightbox reusable
function Lightbox({ images, index, setIndex, onClose, dynamic=false }){
  const ref = useRef(null);
  useFocusTrap(ref, true);
  useEffect(()=>{
    function onKey(e){
      if(e.key==='Escape'){ onClose(); }
      if(e.key==='ArrowLeft'){ setIndex(i=> (i-1+images.length)%images.length); }
      if(e.key==='ArrowRight'){ setIndex(i=> (i+1)%images.length); }
    }
    document.addEventListener('keydown', onKey);
    return ()=> document.removeEventListener('keydown', onKey);
  },[images.length,onClose,setIndex]);
  return (
    <div ref={ref} className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex flex-col" role="dialog" aria-modal="true" aria-label="이미지 상세 보기">
      <div className="flex items-center justify-between px-6 py-4 text-white text-xs tracking-wide">
        <span className="opacity-80">{index+1} / {images.length}</span>
        <div className="flex items-center gap-2">
          <button onClick={()=> setIndex(i=> (i-1+images.length)%images.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60">Prev</button>
          <button onClick={()=> setIndex(i=> (i+1)%images.length)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60">Next</button>
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60" autoFocus>Close</button>
        </div>
      </div>
      <div className="relative flex-1" onClick={onClose}>
        <div className="absolute inset-0 flex items-center justify-center p-4" onClick={e=> e.stopPropagation()}>
          {images.map((im,i)=> (
            <img key={im.src} src={im.src} alt={im.alt} width={dynamic? undefined:1200} height={dynamic? undefined:800}
                 className={`max-h-full max-w-full object-contain transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0 absolute'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
