import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './landing/Landing.jsx';
import IYCKPage from './iyengar/IYCK.jsx';
import GurujiPage from './iyengar/Guruji.jsx';
import WhatIyengarPage from './iyengar/What.jsx';
import ProgramsIndex from './programs/ProgramsIndex.jsx';
import GalleryPage from './gallery/GalleryPage.jsx';
import TeachersPage from './iyengar/Teachers.jsx';
import FAQPage from './faq/FAQPage.jsx';
import WorkshopsAdmin from './admin/WorkshopsAdmin.jsx';
import { Navigate } from 'react-router-dom';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/iyck" element={<IYCKPage />} />
  <Route path="/guruji" element={<GurujiPage />} />
  {/* Legacy or alternative path for Guruji page to ensure links like /iyengar/guruji still work */}
  <Route path="/iyengar/guruji" element={<GurujiPage />} />
  <Route path="/what" element={<WhatIyengarPage />} />
  <Route path="/iyengar/what" element={<WhatIyengarPage />} />
  <Route path="/programs" element={<ProgramsIndex />} />
  <Route path="/teachers" element={<TeachersPage />} />
  <Route path="/faq" element={<FAQPage />} />
  <Route path="/gallery" element={<GalleryPage />} />
  {/* Backward compatibility: redirect old admin workshops path to programs page */}
  <Route path="/admin/workshops" element={<Navigate to="/programs" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
