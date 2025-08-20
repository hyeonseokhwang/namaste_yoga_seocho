import { Link } from 'react-router-dom';

export default function HeaderDesktop() {
  return (
    <header className="bg-gray-100 border-b border-gray-300 shadow-sm z-30 relative">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* 로고 */}
        <Link to="/" className="leading-snug tracking-tight text-[#2B5A75] font-bold hover:opacity-90">
          <p className="text-xl">IYENGAR</p>
          <p className="text-xl">YOGA COMMUNITY</p>
          <p className="text-sm text-gray-500 mt-1">KOREA | IYCK</p>
        </Link>

        {/* 내비게이션 */}
        <nav className="flex space-x-4 sm:space-x-6 text-sm relative z-50">
          <Link to="/iyengar/iyck" className="text-gray-700 hover:text-blue-600">소개</Link>

          {/* 드롭다운 메뉴 (hover 영역 전체를 그룹으로 묶기) */}
          <div className="relative group">
            <div className="text-gray-700 hover:text-blue-600 cursor-pointer select-none">
              Iyengar Yoga ▾
            </div>
            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-md rounded w-52">
              <Link to="/iyengar/what" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Iyengar Yoga란?</Link>
              <Link to="/iyengar/Guruji" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">아엥가 선생 소개</Link>
              <Link to="/iyengar/ciyt" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CIYT란?</Link>
              
            </div>
          </div>
          <Link to="/teachers" className="text-gray-700 hover:text-blue-600">강사</Link>
          <Link to="/programs/workshops" className="text-gray-700 hover:text-blue-600">프로그램</Link>          
          <Link to="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link>          
          <Link to="/gallery" className="text-gray-700 hover:text-blue-600">갤러리</Link>
          <Link to="" className="text-gray-700 hover:text-blue-600">문의</Link>
        </nav>
      </div>
    </header>
  );
}
