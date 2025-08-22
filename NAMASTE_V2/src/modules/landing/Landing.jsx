import Hero from './sections/Hero.jsx';
import QuoteGuruji from './sections/QuoteGuruji.jsx';
import AboutIYCK from './sections/AboutIYCK.jsx';
import Programs from './sections/Programs.jsx';
import FAQPreview from './sections/FAQPreview.jsx';
import TeachersPreview from './sections/TeachersPreview.jsx';
import GalleryPreviewRibbon from './sections/GalleryPreviewRibbon.jsx';
// Membership section removed per latest requirements.
import Footer from './sections/Footer.jsx';
import NavBar from './components/NavBar.jsx';

export default function Landing(){
  return (
    <main id="top" className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Skip to main content for keyboard users */}
      <a href="#main" className="skip-link">본문 바로가기</a>
      <NavBar />
      {/* Hero occupies initial viewport but allows scroll hint */}
      <Hero />
      {/* Main content wrapper anchors skip link */}
      <div id="main" className="flex-1 flex flex-col">
        <QuoteGuruji />
        {/* About / Programs grouped with consistent spacing utilities */}
        <AboutIYCK />
        <div id="programs"><Programs /></div>
        <GalleryPreviewRibbon />
        <TeachersPreview />
        <FAQPreview />
      </div>
      <div id="contact"><Footer /></div>
    </main>
  );
}
