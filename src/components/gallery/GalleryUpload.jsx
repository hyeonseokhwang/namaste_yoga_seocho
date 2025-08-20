// src/components/gallery/GalleryUpload.jsx
import { useState, useRef } from "react";

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // iyck_gallery (unsigned)
const FOLDER        = "gallery";
const TAGS          = "iyck_gallery";

// 이미지 리사이즈 + 압축
async function resizeImage(file, {
  maxW=4000, maxH=4000,
  startQuality=0.9,
  minQuality=0.6,
  maxBytes=9.5 * 1024 * 1024, // 무료 10MB 제한 안전선
} = {}) {
  const img = await blobToImage(file);
  const { width, height } = scaleDown(img.naturalWidth || img.width, img.naturalHeight || img.height, maxW, maxH);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  let q = startQuality;
  let blob = await canvasToBlob(canvas, "image/jpeg", q);
  while (blob.size > maxBytes && q > minQuality) {
    q = Math.max(minQuality, q - 0.1);
    blob = await canvasToBlob(canvas, "image/jpeg", q);
  }
  return blob;
}

function blobToImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.style.imageOrientation = "from-image";
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}
function canvasToBlob(canvas, mime, quality) {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), mime, quality));
}
function scaleDown(w, h, maxW, maxH) {
  const ratio = Math.min(maxW / w, maxH / h, 1);
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}
function safeName(name) {
  return name
    .normalize("NFKD")
    .replace(/[^\w.\-가-힣]/g, "_")
    .replace(/_{2,}/g, "_");
}

// 동시 업로드 폭 제한
async function pLimit(list, limit, worker) {
  const results = [];
  let i = 0;
  const runners = new Array(Math.min(limit, list.length)).fill(0).map(async () => {
    while (i < list.length) {
      const idx = i++;
      results[idx] = await worker(list[idx], idx);
    }
  });
  await Promise.all(runners);
  return results;
}

export default function GalleryUpload() {
  const [busy, setBusy] = useState(false);
  const [logs, setLogs] = useState([]);
  const inputRef = useRef(null);

  const log = (msg) => setLogs((prev) => [...prev, msg]);
  const handlePick = () => inputRef.current?.click();

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || busy) return;

    setBusy(true);
    setLogs([]);
    log(`선택된 파일: ${files.length}개`);

    try {
      await pLimit(files, 3, async (file, idx) => {
        try {
          const resizedBlob = await resizeImage(file);
          const uploadFile = new File([resizedBlob], safeName(file.name.replace(/\.[^.]+$/, ".jpg")), { type: "image/jpeg" });
          log(`${idx+1}/${files.length} 리사이즈 완료 (${(uploadFile.size/1024/1024).toFixed(2)}MB)`);

          const fd = new FormData();
          fd.append("file", uploadFile);
          fd.append("upload_preset", UPLOAD_PRESET);
          fd.append("folder", FOLDER);
          fd.append("tags", TAGS);

          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: fd,
          });
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(`${res.status} ${res.statusText} ${JSON.stringify(err)}`);
          }
          const data = await res.json();
          log(`업로드 성공: ${data.public_id}`);
          return data;
        } catch (err) {
          log(`업로드 실패: ${file.name} → ${String(err)}`);
          return null;
        }
      });

      // 업로드 완료 → 목록 새로고침 이벤트
      window.dispatchEvent(new CustomEvent("gallery:refresh"));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-md border p-4 shadow-sm">
      <h3 className="font-semibold mb-3">갤러리 업로드</h3>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFiles}
      />

      <button
        onClick={handlePick}
        disabled={busy}
        className="inline-flex items-center px-4 py-2 rounded bg-slate-600 text-white hover:bg-slate-700 disabled:opacity-60"
      >
        {busy ? "업로드 중..." : "이미지 선택(여러 장)"}
      </button>

      <p className="text-xs text-gray-500 mt-2">
        * 선택 즉시 최대 4000px로 리사이즈 · JPEG 압축(≈9.5MB 이하) 후 Cloudinary로 업로드합니다.
      </p>

      {!!logs.length && (
        <div className="mt-3 max-h-48 overflow-auto text-sm bg-gray-50 border rounded p-2">
          {logs.map((l, i) => <div key={i}>• {l}</div>)}
        </div>
      )}
    </div>
  );
}
