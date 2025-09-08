import React, { useState, useEffect } from 'react';

// Simple admin UI for managing workshops dynamically via /api/workshops
export default function WorkshopsAdmin(){
  const [pass,setPass] = useState('');
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [form,setForm] = useState({
    title:'', dateLabel:'', summary:'', startDate:'', totalHours:'', sessions:'', location:'', tuition:'', contacts:'', email:'', focus:'', images:''
  });
  const [message,setMessage] = useState('');
  const [loggedIn,setLoggedIn] = useState(false);

  async function load(){
    try {
      setLoading(true); setError('');
      const res = await fetch('/api/workshops');
      const json = await res.json();
      setItems(json.items||[]);
    } catch(e){ setError(e.message||'load_error'); }
    finally { setLoading(false); }
  }
  useEffect(()=>{ load(); checkSession(); },[]);

  async function checkSession(){
    try {
      const r = await fetch('/api/admin/me');
      const j = await r.json();
      setLoggedIn(!!j.loggedIn);
    } catch {}
  }

  async function login(e){
    e.preventDefault(); setError(''); setMessage('');
    try {
      const r = await fetch('/api/admin/login',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({password:pass})});
      const j = await r.json();
      if(!r.ok) throw new Error(j.error||'login_failed');
      setLoggedIn(true); setPass(''); setMessage('Logged in');
      load();
    } catch(e){ setError(e.message); }
  }

  async function logout(){
    try { await fetch('/api/admin/logout',{method:'POST'}); } catch {}
    setLoggedIn(false); setMessage('Logged out');
  }

  async function create(e){
    e.preventDefault();
    setMessage(''); setError('');
    try {
      const payload = {
        title: form.title.trim(),
        dateLabel: form.dateLabel.trim(),
        summary: form.summary.trim(),
        startDate: form.startDate || null,
        totalHours: form.totalHours? Number(form.totalHours): null,
        sessions: form.sessions.split('\n').map(s=> s.trim()).filter(Boolean),
        location: form.location.trim(),
        tuition: form.tuition.trim(),
        contacts: form.contacts.trim(),
        email: form.email.trim(),
        focus: form.focus.trim(),
        images: form.images.split('\n').map(s=> s.trim()).filter(Boolean)
      };
  const res = await fetch('/api/workshops', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
      const js = await res.json();
      if(!res.ok) throw new Error(js.error||'create_failed');
      setMessage('Created: '+js.item.id);
      setForm({ title:'', dateLabel:'', summary:'', startDate:'', totalHours:'', sessions:'', location:'', tuition:'', contacts:'', email:'', focus:'', images:'' });
      load();
    } catch(e){ setError(e.message); }
  }

  async function remove(id){
    if(!window.confirm('Delete workshop '+id+' ?')) return;
    try {
      const res = await fetch('/api/workshops/'+id, { method:'DELETE' });
      const js = await res.json();
      if(!res.ok) throw new Error(js.error||'delete_failed');
      setMessage('Deleted: '+id);
      load();
    } catch(e){ setError(e.message); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-brand-50 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-brand-800">Workshops Admin</h1>
            <p className="text-sm text-brand-700/70">Session based access. Only logged in can create / delete.</p>
          </div>
          <form onSubmit={login} className="flex gap-2 items-center">
            {!loggedIn && <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} className="px-3 py-2 rounded border text-sm w-52" />}
            {!loggedIn && <button className="px-4 py-2 rounded bg-brand-700 text-white text-sm font-medium hover:bg-brand-600">Login</button>}
            {loggedIn && <button type="button" onClick={logout} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm font-medium text-gray-800">Logout</button>}
          </form>
        </header>
        {error && <div className="text-sm text-red-600">Error: {error}</div>}
        {message && <div className="text-sm text-green-600">{message}</div>}
        <section className="grid md:grid-cols-2 gap-10">
          <form onSubmit={create} className="space-y-4 bg-white/80 backdrop-blur rounded-lg p-5 ring-1 ring-brand-200 disabled:opacity-50" aria-disabled={!loggedIn}>
            <h2 className="text-lg font-medium">Create New</h2>
            {!loggedIn && <div className="text-[12px] text-brand-600/70">Login required.</div>}
            {['title','dateLabel','summary','startDate','totalHours','sessions','location','tuition','contacts','email','focus','images'].map(k=> (
              <div key={k} className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold tracking-wide uppercase text-brand-600">{k}</label>
                {['summary','sessions','images','focus'].includes(k)? (
                  <textarea rows={k==='summary'?3: k==='focus'?2:4} value={form[k]} onChange={e=> setForm(f=>({...f,[k]:e.target.value}))} className="px-3 py-2 rounded border text-[13px]" placeholder={k==='sessions'? 'Line per session':'Enter '+k} />
                ): (
                  <input value={form[k]} onChange={e=> setForm(f=>({...f,[k]:e.target.value}))} className="px-3 py-2 rounded border text-[13px]" placeholder={'Enter '+k} />
                )}
              </div>
            ))}
            <button type="submit" disabled={!loggedIn} className="px-4 py-2 rounded bg-brand-700 text-white text-sm font-medium hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed">Create</button>
          </form>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Existing ({items.length})</h2>
              <div className="flex gap-2">
                <button onClick={load} className="text-sm px-3 py-1 rounded bg-brand-100 text-brand-700 hover:bg-brand-200">Refresh</button>
              </div>
            </div>
            <div className="space-y-3 max-h-[560px] overflow-auto pr-2">
              {loading && <div className="text-sm text-brand-600">Loading…</div>}
              {!loading && !items.length && <div className="text-sm text-brand-500">No workshops</div>}
              {items.map(w=> (
                <div key={w.id} className="p-3 rounded border bg-white/70 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-4">
                    <strong className="text-brand-800 text-sm truncate">{w.title}</strong>
                    {loggedIn && <button onClick={()=>remove(w.id)} className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-500">Delete</button>}
                  </div>
                  <div className="text-[11px] text-brand-600 flex flex-wrap gap-2">
                    <span>{w.dateLabel}</span>
                    {w.totalHours && <span>{w.totalHours}h</span>}
                    {w.sessions?.length && <span>{w.sessions.length} sessions</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
