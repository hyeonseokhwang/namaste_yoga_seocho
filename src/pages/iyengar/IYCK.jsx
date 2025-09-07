// src/pages/iyengar/IYCK.jsx

import { useEffect, useState, useCallback } from 'react';

export default function IYCK() {
  // 사용자 제공 이미지 목록 (메인 + 서브)
  const images = [
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/agvcwzezxscgxilbae1l.jpg', // 메인
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/zw4n7rhtobrf6xmts6od.jpg', // 단체
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/apdkin9yf01kfvilhuas.jpg', // 수련1
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/wczkz4bnesrhrtsdn9ea.jpg', // 수련2
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/nbpmx95s4rrrvpmhopj5.jpg', // 수련3
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/w1eafu2d1hempouj5q4o.jpg', // 수련4
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const openLightbox = useCallback((idx) => { setOpenIndex(idx); setLightboxOpen(true); }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prev = useCallback(() => setOpenIndex(i => (i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setOpenIndex(i => (i < images.length - 1 ? i + 1 : i)), [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);
  return (
    <section className="bg-white py-12 px-6 text-gray-800">
      <div className="max-w-screen-lg mx-auto space-y-6">
        <div>
          <h2 className="text-4xl font-bold text-[#2B5A75] mb-6">Iyengar Yoga Community Korea (IYCK)</h2>

          <div className="mb-6 text-[17px] leading-relaxed text-gray-800">
            <p className="mb-4">
              <strong>Iyengar Yoga Community Korea (IYCK)</strong>는 Iyengar Yoga의
              철학과 전통을 바탕으로, 한국에서 정확하고 깊이 있는 요가 수련 문화를
              정착시키고자 하는 비영리 단체입니다.
            </p>

            <p className="mb-4">
              2019년 3월 7일, 뜻을 함께하는 수련자들의 작은 모임으로 시작되어
              2024년 3월 14일 공식 비영리 단체로 설립되었으며, 이후 꾸준한 수련과
              신뢰를 바탕으로 함께 성장하는 배움의 장으로 발전해 왔습니다.
            </p>

            <p className="mb-4">
              IYCK는 단순한 요가 단체를 넘어, 몸과 마음의 조화, 진심 어린 자기
              탐구, 그리고 함께 성장하는 수련 공동체를 지향합니다. B.K.S. Iyengar
              구루지의 가르침이 지닌 깊이와 진정성을 온전히 보존하고 전수하기 위해,
              푸네의 라마마니 아엥가 요가연구소(RIMYI)에서 정립한
              <em> ‘Iyengar Yoga 규범(Pune Constitution)’</em>에 따라 운영되고 있습니다.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2B5A75] mb-3">조직 구성</h3>
            <ul className="list-disc list-inside space-y-2 text-[16px]">
              <li><strong>회장:</strong> 강경희</li>
              <li><strong>대외협력:</strong> 김정민</li>
              <li><strong>실무지원:</strong> 김명규, 김옥교</li>
              <li><strong>교육지원:</strong> 양삼선, 김아람, 김유진</li>
              <li><strong>회계:</strong> 홍윤서</li>
            </ul>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            위 구성원들은 자발적인 참여로 IYCK의 활동을 이끌고 있습니다. 문의나
            협력이 필요하시면 커뮤니티 내 담당자와 연락하실 수 있습니다.
          </p>
        </div>

        {/* Hero image centered below the text (단체 소개: images[1]) - use same container width */}
        <figure className="w-full flex justify-center">
          <div
            className="w-full max-w-screen-lg rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white to-gray-50 cursor-pointer"
            onClick={() => openLightbox(1)}
            role="button"
            tabIndex={0}
          >
            <div className="aspect-[4/3] w-full">
              <img
                src={images[1]}
                alt="IYCK 단체 소개"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
        </figure>

        {/* Small row: up to 3 practice photos in a single horizontal row */}
        {images.length > 2 && (
          <div className="max-w-screen-lg mx-auto mt-6 grid grid-cols-3 gap-3">
            {images.slice(2, 5).map((src, i) => (
              <button key={src} onClick={() => openLightbox(i + 2)} className="overflow-hidden rounded-md shadow-sm bg-white" aria-label={`open practice ${i + 1}`}>
                <div className="aspect-[4/3] w-full">
                  <img src={src} alt={`practice-${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Lightbox modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-[2000] bg-black/70 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button className="absolute top-4 right-4 text-white text-2xl p-2" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} aria-label="close">×</button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="prev">‹</button>
            <div className="max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
              <img src={images[openIndex]} alt={`lightbox-${openIndex}`} className="max-h-[90vh] max-w-[95vw] object-contain" />
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="next">›</button>
          </div>
        )}
      </div>
    </section>
  );
}
