// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

const app = express();

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

// 갤러리 목록 (태그/폴더 병합)
app.get('/api/gallery', async (_req, res) => {
  try {
    const byTag = await cloudinary.search
      .expression('resource_type:image AND tags="iyck_gallery"')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const byFolder = await cloudinary.search
      .expression('resource_type:image AND (folder="gallery" OR folder="gallery/*")')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const map = new Map();
    [...(byTag.resources||[]), ...(byFolder.resources||[])]
      .forEach(r => map.set(r.public_id, r));

    const resources = Array.from(map.values())
      .sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));

    res.json({
      items: resources.map(r => ({
        public_id: r.public_id,
        format: r.format,
        secure_url: r.secure_url,
        created_at: r.created_at
      }))
    });
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
