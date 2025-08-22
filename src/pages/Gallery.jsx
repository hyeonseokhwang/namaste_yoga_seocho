import { useLocation, Link } from "react-router-dom";
import GalleryUpload from "../components/gallery/GalleryUpload";
import GalleryList from "../components/gallery/GalleryList";

export default function Gallery() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialFolder = params.get('folder') || 'all';
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#2B5A75] mb-6">갤러리</h1>
        <div className="mb-4">
          <Link
            to="/gallery?folder=gallery/Namaste_Yoga/GeorgeDovas"
            className="inline-block text-sm px-3 py-1 rounded bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
          >
            2025. 7.19–20 George Dovas 워크숍
          </Link>
        </div>

        {/* 운영 전엔 업로드 박스 감추고 싶으면 아래 블록을 주석 처리 */}
        <div className="mb-8">
          <GalleryUpload />
        </div>

  <GalleryList initialFolder={initialFolder} />
      </div>
    </div>
  );
}
