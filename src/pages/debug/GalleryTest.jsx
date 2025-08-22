import { useLocation } from 'react-router-dom';
import GalleryList from '../../components/gallery/GalleryList';

export default function GalleryTest(){
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const folder = params.get('folder') || 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">Gallery Test</h1>
        <p className="text-sm text-gray-600 mb-4">Testing folder: <strong>{folder}</strong></p>
        <GalleryList initialFolder={folder} />
      </div>
    </div>
  );
}
