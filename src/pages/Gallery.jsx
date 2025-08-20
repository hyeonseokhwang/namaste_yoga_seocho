import GalleryUpload from "../components/gallery/GalleryUpload";
import GalleryList from "../components/gallery/GalleryList";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#2B5A75] mb-6">갤러리</h1>

        {/* 운영 전엔 업로드 박스 감추고 싶으면 아래 블록을 주석 처리 */}
        <div className="mb-8">
          <GalleryUpload />
        </div>

        <GalleryList />
      </div>
    </div>
  );
}
