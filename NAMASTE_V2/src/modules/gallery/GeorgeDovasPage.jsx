import { Link } from 'react-router-dom';
import GalleryList from './components/GalleryList.jsx';

const FOLDER = 'gallery/Namaste_Yoga/GeorgeDovas';

export default function GeorgeDovasPage(){
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-neutral-50 pt-28 pb-24">
      <div className="container-beam max-w-7xl">
        <header className="mb-12 space-y-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-800 mb-4">George Dovas 워크숍 갤러리</h1>
            <p className="text-sm text-neutral-700/80 leading-relaxed max-w-2xl">2025년 7월 19–20일 진행된 워크숍 기록 이미지 모음입니다. 확대하려면 썸네일을 클릭하세요.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/gallery" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-medium transition">← 전체 갤러리</Link>
            <Link to="/programs" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-700 hover:bg-brand-600 text-white text-xs font-medium shadow-soft-lg transition">프로그램 보기 →</Link>
          </div>
        </header>
        <GalleryList initialFolder={FOLDER} hideFilters />
      </div>
    </main>
  );
}