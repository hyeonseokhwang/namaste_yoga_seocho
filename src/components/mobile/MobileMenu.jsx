// src/components/mobile/MobileMenu.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  const [isIyengarOpen, setIyengarOpen] = useState(false);

  if (!isOpen) return null;

  return (
    // 오버레이 클릭 시 닫힘
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40" onClick={onClose}>
      {/* 패널 영역 클릭 시 닫힘 방지 */}
      <div
        className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
      >
        {/* 닫기 버튼 */}
        <button
          className="self-end text-2xl text-gray-700"
          onClick={onClose}
          aria-label="메뉴 닫기"
        >
          &times;
        </button>

        {/* 메뉴 리스트 */}
        <nav className="mt-4 space-y-4 text-gray-800">
          <Link to="/iyengar/iyck" className="block hover:text-blue-600" onClick={onClose}>
            협회소개
          </Link>

          <div className="border-t pt-4">
            <button
              onClick={() => setIyengarOpen(!isIyengarOpen)}
              className="flex justify-between items-center w-full text-left font-semibold text-gray-600 hover:text-blue-600"
              aria-expanded={isIyengarOpen}
              aria-controls="iyengar-submenu"
            >
              <span>Iyengar Yoga</span>
              <span>{isIyengarOpen ? '▲' : '▼'}</span>
            </button>

            {isIyengarOpen && (
              <div id="iyengar-submenu" className="mt-2 space-y-1 pl-2 text-sm">
                <Link to="/iyengar/what" className="block px-2 py-1 hover:bg-gray-100" onClick={onClose}>
                  Iyengar Yoga란?
                </Link>
                <Link to="/iyengar/Guruji" className="block px-2 py-1 hover:bg-gray-100" onClick={onClose}>
                  아엥가 선생 소개
                </Link>
                {/* 새로 추가: CIYT 페이지 */}
                <Link to="/iyengar/ciyt" className="block px-2 py-1 hover:bg-gray-100" onClick={onClose}>
                  공인 교사(CIYT)란?
                </Link>
              </div>
            )}
          </div>

          <Link to="/programs/workshops" className="block hover:text-blue-600" onClick={onClose}>
            프로그램
          </Link>
          <Link to="/teachers" className="block hover:text-blue-600" onClick={onClose}>
            강사
          </Link>
          <Link to="/faq" className="block hover:text-blue-600" onClick={onClose}>
            FAQ
          </Link>
          <Link to="/gallery" className="block hover:text-blue-600" onClick={onClose}>
            갤러리
          </Link>
          <Link to="" className="block hover:text-blue-600" onClick={onClose}>
            문의
          </Link>
        </nav>
      </div>
    </div>
  );
}
