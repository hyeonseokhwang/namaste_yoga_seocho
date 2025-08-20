import { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';

export default function HeaderMobile() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-100 border-b border-gray-300 shadow-sm relative z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* 로고 전체 클릭 가능 */}
        <Link to="/" className="leading-snug tracking-tight text-[#2B5A75] font-bold hover:opacity-90">
          <p className="text-lg">IYENGAR</p>
          <p className="text-lg">YOGA COMMUNITY</p>
          <p className="text-sm text-gray-500 mt-1">KOREA | IYCK</p>
        </Link>

        {/* 햄버거 버튼 */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-3xl text-gray-800 focus:outline-none"
        >
          &#9776;
        </button>
      </div>

      {/* 사이드 메뉴 */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
