// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const app = express();
// Disable implicit ETag generation to avoid 304 reuse with dynamic queries
app.set('etag', false);

// CORS: 개발 단계에선 넓게 허용
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-token'],
}));
app.use(express.json());

// --- Simple cookie parser (avoid extra dependency) ---
function parseCookies(cookieHeader){
  const out = {};
  if(!cookieHeader) return out;
  cookieHeader.split(/; */).forEach(part=>{
    const idx = part.indexOf('=');
    if(idx>0){
      const k = decodeURIComponent(part.slice(0,idx).trim());
      const v = decodeURIComponent(part.slice(idx+1).trim());
      out[k]=v;
    }
  });
  return out;
}
app.use((req,_res,next)=>{ req.cookies = parseCookies(req.headers.cookie||''); next(); });

// 필수 env 체크
const REQUIRED = ['CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET'];
const missing = REQUIRED.filter(k => !process.env[k]);
if (missing.length) {
  console.error('[ENV] Missing:', missing.join(', '));
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 단순 헬스체크
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
    api_key: !!process.env.CLOUDINARY_API_KEY,
    api_secret: !!process.env.CLOUDINARY_API_SECRET
  });
});

// Folder tree & counts (debug helper)
app.get('/api/gallery/tree', async (_req, res) => {
  try {
    // Grab broad gallery scope (include nested) — adjust max_results as needed.
    const search = await cloudinary.search
      .expression('resource_type:image AND (folder="gallery" OR folder="gallery/*")')
      .sort_by('created_at','desc')
      .max_results(500)
      .execute();
    const resources = search.resources || [];
    const map = new Map();
    for (const r of resources) {
      const pid = r.public_id || '';
      const parts = pid.split('/');
      if (parts.length >= 2) {
        const folderPath = parts.slice(0, parts.length - 1).join('/');
        map.set(folderPath, (map.get(folderPath) || 0) + 1);
      } else {
        map.set('(root)', (map.get('(root)') || 0) + 1);
      }
    }
    const tree = Array.from(map.entries())
      .map(([path,count]) => ({ path, count }))
      .sort((a,b)=> a.path.localeCompare(b.path));
    res.json({ total: resources.length, folders: tree });
  } catch (e) {
    res.status(500).json({ error: e?.message || 'tree_error' });
  }
});

// 갤러리 목록 (태그/폴더 병합)
app.get('/api/gallery', async (req, res) => {
  // Explicitly disable caching for this dynamic endpoint
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  try {
    const folderQuery = req.query.folder;
    const wantDebug = String(req.query.debug||'').toLowerCase() === '1';
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || '<unset>';
    const debugLogs = [];
    const logSearch = (label, expr) => {
      const line = `[cloudinary:search] ${label} -> POST https://api.cloudinary.com/v1_1/${cloudName}/resources/search expr=${expr}`;
      debugLogs.push(line);
      try { console.log(line); } catch {}
    };

    // helper to extract a folder label from public_id like "Namaste_Yoga/GeorgeDovas/image"
    // returns the last folder segment (e.g. 'GeorgeDovas') when possible
    const getFolderFromPublicId = (pid) => {
      try {
        const parts = pid.split('/');
        if (parts.length >= 2) return parts[parts.length - 2];
      } catch (e) {}
      return null;
    };

    let resources = [];

  if (folderQuery) {
      // Normalize candidate folder/public_id prefixes
      const base = folderQuery.replace(/^\/+/, '').replace(/\/+$/, '');
      const candidates = new Set([base]);
      if (!base.startsWith('gallery/')) candidates.add(`gallery/${base}`);
      // also add stripped form if already had gallery/
      if (base.startsWith('gallery/')) candidates.add(base.replace(/^gallery\//,''));

      // Build OR expressions using folder= (exact) and public_id prefix fallback
      const exprParts = [];
      for (const c of candidates) {
        exprParts.push(`folder="${c}"`);
        exprParts.push(`folder="${c}/*"`); // nested safety
        exprParts.push(`public_id:${c}/*`); // public_id prefix style
      }
      const expr = `resource_type:image AND (${exprParts.join(' OR ')})`;
      logSearch('folderQuery', expr);
      let byFolder;
      try {
        byFolder = await cloudinary.search
          .expression(expr)
          .sort_by('created_at', 'desc')
          .max_results(200)
          .execute();
      } catch (e) {
        console.error('[gallery] primary folder search failed, retry simple folder=', base, e?.message);
        const fallbackExpr = `resource_type:image AND folder="${base}"`;
        logSearch('folderQuery-fallback', fallbackExpr);
        byFolder = await cloudinary.search
          .expression(fallbackExpr)
          .sort_by('created_at','desc')
          .max_results(200)
          .execute();
      }
      resources = (byFolder.resources || []);
    } else {
      // default behaviour: merge tagged items and everything under gallery/*
      const exprTag = 'resource_type:image AND tags="iyck_gallery"';
      logSearch('default-tag', exprTag);
      const byTag = await cloudinary.search
        .expression(exprTag)
        .sort_by('created_at', 'desc')
        .max_results(100)
        .execute();

      const exprFolder = 'resource_type:image AND (folder="gallery" OR folder="gallery/*")';
      logSearch('default-folder', exprFolder);
      const byFolder = await cloudinary.search
        .expression(exprFolder)
        .sort_by('created_at', 'desc')
        .max_results(100)
        .execute();

      const map = new Map();
      [...(byTag.resources||[]), ...(byFolder.resources||[])]
        .forEach(r => map.set(r.public_id, r));

      resources = Array.from(map.values())
        .sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
    }

    const items = resources.map(r => {
      const parts = (r.public_id || '').split('/');
      const folder_label = parts.length >= 2 ? parts[parts.length - 2] : null; // short
      const folder_path = parts.length >= 2 ? parts.slice(0, parts.length - 1).join('/') : null; // full path
      return {
        public_id: r.public_id,
        format: r.format,
        secure_url: r.secure_url,
        created_at: r.created_at,
        folder: folder_label,
        folder_path,
      };
    });
    if (wantDebug) {
      return res.json({ items, debug: debugLogs });
    }
    res.json({ items });
  } catch (e) {
    const status = e?.http_code || e?.status || 500;
    const msg = e?.message || 'cloudinary_error';
    console.error('[gallery:error]', status, msg, e?.error || e?.response || e);
    res.status(500).json({ error: msg });
  }
});

// 관리자 토큰 미들웨어
function requireAdmin(req, res, next) {
  const token = req.header('x-admin-token');
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

// ✅ 삭제 (쿼리스트링 public_id=… 형태; 슬래시 안전)
app.delete('/api/gallery', requireAdmin, async (req, res) => {
  try {
    const publicId = req.query.public_id;
    if (!publicId) return res.status(400).json({ error: 'missing_public_id' });

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });

    if (result.result === 'ok' || result.result === 'not found') {
      return res.json({ ok: true, result: result.result });
    }
    return res.status(500).json({ error: result.result || 'delete_failed' });
  } catch (e) {
    const status = e?.http_code || 500;
    res.status(status).json({ error: e?.message || 'cloudinary_error' });
  }
});

const port = process.env.PORT || 4000;
// ------------------ Dynamic Workshops (file-based simple store) ------------------
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const WORKSHOPS_FILE = path.join(DATA_DIR, 'workshops.json');
if(!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, {recursive:true});
function loadWorkshops(){
  try { return JSON.parse(fs.readFileSync(WORKSHOPS_FILE,'utf8')); } catch { return []; }
}
function saveWorkshops(list){
  try { fs.writeFileSync(WORKSHOPS_FILE, JSON.stringify(list,null,2)); } catch(e){ console.error('[workshops:save]', e); }
}
let workshops = loadWorkshops();

function sha256(v){ return crypto.createHash('sha256').update(v).digest('hex'); }
// Fallback default password (requested) if env hash not supplied.
// NOTE: For production, set WORKSHOP_ADMIN_PASSWORD_HASH to override this.
const DEFAULT_ADMIN_PASSWORD = 'namaste11!';
const workshopHash = process.env.WORKSHOP_ADMIN_PASSWORD_HASH || sha256(DEFAULT_ADMIN_PASSWORD);

// In-memory session store (token -> timestamp)
const SESSIONS = new Map();
const SESSION_TTL_MS = 1000 * 60 * 60 * 2; // 2h
function createSession(){
  const token = crypto.randomBytes(32).toString('hex');
  SESSIONS.set(token, Date.now());
  return token;
}
function validateSession(token){
  if(!token) return false;
  const ts = SESSIONS.get(token);
  if(!ts) return false;
  if(Date.now()-ts > SESSION_TTL_MS){
    SESSIONS.delete(token);
    return false;
  }
  // refresh sliding expiration
  SESSIONS.set(token, Date.now());
  return true;
}
function clearSession(token){ if(token) SESSIONS.delete(token); }

function setSessionCookie(res, token){
  const secure = process.env.NODE_ENV === 'production';
  const cookie = `iyck_admin=${token}; Path=/; HttpOnly; SameSite=Lax${secure?'; Secure':''}`;
  res.setHeader('Set-Cookie', cookie);
}
function clearSessionCookie(res){
  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', `iyck_admin=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT${secure?'; Secure':''}`);
}

// --- Admin session endpoints ---
app.post('/api/admin/login', (req,res)=> {
  const pwd = (req.body?.password || '').trim();
  if(!workshopHash) return res.status(500).json({error:'server_not_configured'});
  if(!pwd || sha256(pwd)!==workshopHash) return res.status(401).json({error:'invalid_password'});
  const token = createSession();
  setSessionCookie(res, token);
  res.json({ ok:true });
});

app.post('/api/admin/logout', (req,res)=> {
  const token = req.cookies.iyck_admin;
  clearSession(token);
  clearSessionCookie(res);
  res.json({ ok:true });
});

app.get('/api/admin/me', (req,res)=> {
  const token = req.cookies.iyck_admin;
  const loggedIn = validateSession(token);
  res.json({ loggedIn });
});

function requireWorkshopAuth(req,res,next){
  // Prefer session cookie
  const token = req.cookies.iyck_admin;
  if(validateSession(token)) return next();
  // Fallback legacy header (will be deprecated)
  const pwd = req.header('x-workshop-pass');
  if(workshopHash && pwd && sha256(pwd) === workshopHash) return next();
  return res.status(401).json({error:'unauthorized'});
}

// Public list
app.get('/api/workshops', (_req,res)=> {
  res.set({'Cache-Control':'no-store'});
  res.json({ items: workshops });
});

// Create
app.post('/api/workshops', requireWorkshopAuth, (req,res)=> {
  const b = req.body||{};
  const required = ['title','dateLabel','summary','sessions','location','tuition','contacts','email','focus'];
  const missing = required.filter(k=> !b[k]);
  if(missing.length) return res.status(400).json({error:'missing_fields', fields:missing});
  const id = b.id || (b.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-'+Date.now());
  const item = {
    id,
    dateLabel: b.dateLabel,
    title: b.title,
    summary: b.summary,
    startDate: b.startDate||null,
    totalHours: b.totalHours||null,
    sessions: Array.isArray(b.sessions)? b.sessions : [],
    location: b.location,
    tuition: b.tuition,
    contacts: b.contacts,
    email: b.email,
    focus: b.focus,
    images: Array.isArray(b.images)? b.images : [],
    createdAt: new Date().toISOString()
  };
  workshops.push(item);
  saveWorkshops(workshops);
  res.status(201).json({ ok:true, item });
});

// Delete
app.delete('/api/workshops/:id', requireWorkshopAuth, (req,res)=> {
  const { id } = req.params;
  const before = workshops.length;
  workshops = workshops.filter(w=> w.id!==id);
  if(before===workshops.length) return res.status(404).json({error:'not_found'});
  saveWorkshops(workshops);
  res.json({ ok:true });
});

app.listen(port, () => console.log('Gallery & Workshops API listening on', port));
