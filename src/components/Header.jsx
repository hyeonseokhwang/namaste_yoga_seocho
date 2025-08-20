import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <div className="text-center sm:text-left leading-tight text-[#2B5A75] font-bold">
          <p className="text-lg sm:text-xl">IYENGAR</p>
          <p className="text-lg sm:text-xl">YOGA</p>
          <p className="text-sm sm:text-base text-gray-500 tracking-wide">KOREA | IYCK</p>
        </div>
        <nav className="mt-4 sm:mt-0 space-x-4 sm:space-x-6 text-sm">
          <Link to="/about" className="text-gray-700 hover:text-blue-600">소개</Link>
          <Link to="/teachers" className="text-gray-700 hover:text-blue-600">강사</Link>
          <Link to="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link>
          <Link to="/schedule" className="text-gray-700 hover:text-blue-600">시간표</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">문의</Link>
        </nav>
      </div>
    </header>
  );
}
