// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

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
app.listen(port, () => console.log('Gallery API listening on', port));
