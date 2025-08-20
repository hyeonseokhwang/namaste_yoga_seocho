// src/pages/programs/Workshops.jsx

import { useState, useEffect } from 'react';

export default function Workshops() {
  return (
    <section className="bg-white py-16 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-[#2B5A75] mb-6">
          Iyengar Yoga 커뮤니티 워크숍과 프로그램 안내
        </h2>

        <p className="mb-4">
          <strong>IYCK</strong>는 정기적인 워크숍과 프로그램을 통해
          수련자들이 Iyengar Yoga의 깊이를 체험하고,
          공동체와 함께 성장할 수 있는 기회를 제공합니다.
        </p>

        <p className="mb-4">
          이 프로그램들은 초보자부터 숙련자까지,
          누구나 참여할 수 있으며 Iyengar Yoga의 철학과 수련을
          실제로 경험할 수 있는 장을 열어갑니다.
        </p>

        <h3 className="text-2xl font-semibold text-[#2B5A75] mt-10 mb-4">
          주요 프로그램
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>정기 워크숍</strong> – 특정 아사나, 호흡법, 수련 주제를 심화 학습</li>
          <li><strong>공개 수업</strong> – 처음 Iyengar Yoga를 접하는 분들을 위한 무료/체험 클래스</li>
          <li><strong>교사 연수</strong> – 공인 교사 및 수련생을 위한 전문적 교육 과정</li>
          <li><strong>커뮤니티 모임</strong> – 회원 간의 교류와 공동체 활동</li>
        </ul>

        <p className="mt-8">
          각 프로그램의 일정과 신청 방법은
          추후 홈페이지 및 커뮤니티 채널을 통해 안내됩니다.
        </p>
        
  {/* 진행중 / 예정 (섹션 배경색) */}
  <div className="mt-10 -mx-6 px-6 py-8 bg-gray-50">
          <h3 className="text-2xl font-semibold text-[#2B5A75] mb-4">진행중 / 예정</h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden md:h-96">
            <div className="md:flex items-stretch h-full">
              <div className="md:w-1/3 w-full flex items-stretch justify-center bg-gray-50 md:h-full">
                <div className="w-full h-full overflow-hidden">
                  <SideImageIndicator />
                </div>
              </div>
              <div className="md:w-2/3 p-6 md:h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2B5A75] mb-2">Eyal Shifroni 선생님 9월 워크숍</h3>
                    <p className="text-sm text-gray-600">첫 공식 한국 워크숍 — 아엥가 요가의 깊이 있는 탐구와 티칭 경험을 직접 배울 수 있는 기회</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">총 15시간</p>
                    <a href="#register" className="inline-block mt-3 bg-[#2B5A75] text-white px-4 py-2 rounded-md text-sm">Register</a>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4 text-[15px]">
                  <div>
                    <h4 className="font-semibold">일정</h4>
                    <ul className="list-disc list-inside mt-2">
                      <li>9월 12일(금): 14:00–17:00 (총 3시간)</li>
                      <li>9월 13~14일: 09:30–12:30, 14:30–16:30 (각 일 5시간)</li>
                    </ul>
                    <p className="mt-2"><strong>수강료:</strong> 429,000원 (VAT 포함)</p>
                    <p className="mt-2"><strong>장소:</strong> 공간 920 (서울시 강남구 역삼로9길 20, B1)</p>
                  </div>

                  <div>
                    <h4 className="font-semibold">신청 & 문의</h4>
                    <p className="mt-2">온라인 신청서 작성 후, 안내된 계좌로 입금</p>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      <li>김명규 010-9391-3800</li>
                      <li>홍윤서 010-3071-3212</li>
                      <li>김아람 010-3066-8458</li>
                    </ul>
                    <p className="mt-2 text-sm">이메일: <a href="mailto:iyengaryogacommunitykorea@gmail.com" className="text-[#2B5A75] underline">iyengaryogacommunitykorea@gmail.com</a></p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <a href="#register" className="inline-block bg-transparent border border-[#2B5A75] text-[#2B5A75] px-3 py-2 rounded-md text-sm">자세히 보기 / 신청</a>
                </div>
              </div>
            </div>
          </div>
        </div>

  {/* 지난 워크숍 (연도별, 최신→과거) */}
  <div className="-mx-6 px-6 py-8 bg-gray-100 border-t mt-12">
          <h3 className="text-2xl font-semibold text-[#2B5A75] mb-4">지난 워크숍</h3>
          <div className="space-y-6 text-gray-700 text-sm">
            <div>
              <h4 className="font-semibold text-lg">2025</h4>
              <ul className="list-disc list-inside mt-2">
                <li><strong>2025년 7월 19–20일</strong> — George Dovas 선생님 워크숍 (서울)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg">2024</h4>
              <ul className="list-disc list-inside mt-2">
                <li><strong>2024년 11월</strong> — 홍귀석 선생님 워크숍</li>
                <li><strong>2024년 7월</strong> — Justin Herold 선생님 워크숍 (멘토십 준비반 병행)</li>
                <li><strong>2024년 4월</strong> — Justin Herold 선생님 워크숍 (멘토십 준비반 병행)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg">2023</h4>
              <ul className="list-disc list-inside mt-2">
                <li><strong>2023년 10월</strong> — Justin Herold 선생님 워크숍</li>
                <li><strong>2023년 4월</strong> — 홍귀석 선생님 워크숍</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SideImageIndicator() {
  const imgs = [
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/vonomctpuokq780vkl76.jpg',
    'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/bptbyp2nkj7l1w6qip99.jpg',
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    function onKey(e) {
      if (!modalOpen) return;
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'ArrowLeft') setIdx(i => (i > 0 ? i - 1 : imgs.length - 1));
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % imgs.length);
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="relative w-full h-full">
        {/* clicking image opens modal at first image */}
        <button className="w-full h-full block" onClick={() => { setIdx(0); setModalOpen(true); }}>
          <img src={imgs[0]} alt="teacher" className="w-full h-full object-cover block" />
        </button>

        {/* left / right markers: open modal and set index so user can try navigation */}
  <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-2xl bg-black/30 rounded-full w-8 h-8 flex items-center justify-center" onClick={() => { setIdx(0); setModalOpen(true); }} aria-label="open-left">‹</button>
  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-2xl bg-black/30 rounded-full w-8 h-8 flex items-center justify-center" onClick={() => { setIdx(1); setModalOpen(true); }} aria-label="open-right">›</button>

        {/* modal viewer */}
        {modalOpen && (
          <div className="fixed inset-0 z-[2000] bg-black/70 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
            <div className="relative max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
              <button className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-2xl bg-black/30 rounded-full w-10 h-10 flex items-center justify-center" onClick={() => setIdx(i => (i > 0 ? i - 1 : imgs.length - 1))} aria-label="modal-prev">‹</button>
              <img src={imgs[idx]} alt={`modal-${idx}`} className="max-h-[90vh] max-w-[95vw] object-contain" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl bg-black/30 rounded-full w-10 h-10 flex items-center justify-center" onClick={() => setIdx(i => (i + 1) % imgs.length)} aria-label="modal-next">›</button>
              <button className="absolute right-2 top-2 text-white text-2xl p-2" onClick={() => setModalOpen(false)} aria-label="close">✕</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
