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
import Meta from '../shared/seo/Meta.jsx';
import { buildSeo, getGlobalSchemas } from '../shared/seo/seoUtils.js';
import { useI18n } from '../shared/i18n/I18nProvider.jsx';

export default function Landing(){
  const { lang } = useI18n();
  const { base, hreflangs, canonical } = buildSeo('/');
  const title = lang==='ko'
    ? 'IYCK | Iyengar Yoga Community Korea'
    : 'IYCK | Iyengar Yoga Community Korea';
  const description = lang==='ko'
    ? '정확한 정렬·디테일·프롭 통합을 연구·공유하는 Iyengar Yoga Community Korea (IYCK) 공식 페이지. 프로그램, 교사, 워크숍 정보를 확인하세요.'
    : 'Official site of Iyengar Yoga Community Korea (IYCK). Researching & sharing precision alignment, detail and integrated prop work. Explore programs, teachers and workshops.';
  return (
    <main id="top" className="flex flex-col min-h-screen bg-white text-gray-800">
      <Meta
        title={title}
        description={description}
  lang={lang}
  hreflangs={hreflangs}
  structuredData={getGlobalSchemas()}
  canonical={canonical(lang)}
      />
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
