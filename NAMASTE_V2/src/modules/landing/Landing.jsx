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
      <NavBar />
  <Hero />
  <QuoteGuruji />
  <AboutIYCK />
  {/* 바로 워크숍(Programs) 섹션으로 이동: Practice Principles, Lineage, LearnIyengar, Organization 제거 */}
  <div id="programs"><Programs /></div>
  <GalleryPreviewRibbon />
  <FAQPreview />
  <TeachersPreview />
      <div id="contact"><Footer /></div>
    </main>
  );
}
