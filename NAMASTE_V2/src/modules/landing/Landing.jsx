import Hero from './sections/Hero.jsx';
import QuoteGuruji from './sections/QuoteGuruji.jsx';
import Pillars from './sections/Pillars.jsx';
import AboutIYCK from './sections/AboutIYCK.jsx';
import Lineage from './sections/Lineage.jsx';
import Programs from './sections/Programs.jsx';
import FAQPreview from './sections/FAQPreview.jsx';
import TeachersPreview from './sections/TeachersPreview.jsx';
import LearnIyengar from './sections/LearnIyengar.jsx';
import Organization from './sections/Organization.jsx';
import GalleryPreviewRibbon from './sections/GalleryPreviewRibbon.jsx';
import Membership from './sections/Membership.jsx';
import Footer from './sections/Footer.jsx';
import NavBar from './components/NavBar.jsx';

export default function Landing(){
  return (
    <main id="top" className="flex flex-col min-h-screen bg-white text-gray-800">
      <NavBar />
  <Hero />
  <QuoteGuruji />
      <div id="principles"><Pillars /></div>
      <AboutIYCK />
  <div id="lineage"><Lineage /></div>
  <LearnIyengar />
  <Organization />
  <div id="programs"><Programs /></div>
  <GalleryPreviewRibbon />
  <FAQPreview />
  <TeachersPreview />
      <div id="membership"><Membership /></div>
      <div id="contact"><Footer /></div>
    </main>
  );
}
