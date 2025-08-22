import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../../shared/ui/SectionHeading.jsx';
import Button from '../../shared/ui/Button.jsx';
import { featuredWorkshop } from '../../programs/data/programsData.js';
import { useI18n } from '../../shared/i18n/I18nProvider.jsx';

export default function Programs(){
  const { t, dict, lang } = useI18n();
  const ref = useScrollReveal();

  // Countdown based on featured workshop data
  const target = new Date(featuredWorkshop.startDate);
  const [countdown, setCountdown] = useState({ d:0,h:0,m:0 });
  useEffect(()=>{
    const tick = () => {
      const now = new Date();
      const diff = target - now;
      if(diff <= 0){ setCountdown({ d:0,h:0,m:0 }); return; }
      const d = Math.floor(diff/86400000);
      const h = Math.floor(diff%86400000/3600000);
      const m = Math.floor(diff%3600000/60000);
      setCountdown({ d,h,m });
    };
    tick();
    const id = setInterval(tick, 60000); // minute resolution is enough
    return ()=>clearInterval(id);
  },[]);

  return (
    <Section
      id="programs"
      ref={ref}
      ariaLabelledby="programs-heading"
      className="relative pt-14 md:pt-20 bg-gradient-to-b from-white via-gray-50 to-white will-change-transform"
    >
  <div aria-hidden="true" className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-brand-200/20 via-white/30 to-transparent pointer-events-none" />
      {/* subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_60%_35%,black,transparent_75%)] bg-[radial-gradient(circle_at_25%_40%,rgba(43,90,116,0.12),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(180,210,220,0.18),transparent_65%)]" aria-hidden="true" />
      <div className="container-beam relative">
        {/* Section Intro */}
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-10 md:mb-12">
          <div className="max-w-xl">
            <SectionHeading
              id="programs-heading"
              eyebrow={t('programsPreview.eyebrow')}
              title={t('programsPreview.title')}
              desc={t('programsPreview.desc')}
            />
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            {/* Filter / category nav (non-interactive placeholder for now) */}
            <nav aria-label="Program categories" className="w-full md:w-auto">
              <ul className="flex flex-wrap gap-2 text-[12px] font-medium">
                {dict.programsPreview.categories.map(cat=> (
                  <li key={cat}>
                    <button type="button" className="px-4 py-2 rounded-full bg-white border border-brand-200/70 hover:bg-brand-50 text-brand-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 transition">{cat}</button>
                  </li>
                ))}
              </ul>
            </nav>
            <Button as="a" href="/programs#upcoming" size="sm">{t('programsPreview.allSchedule')}</Button>
          </div>
        </div>

        {/* Featured Workshop */}
  <article aria-labelledby="featured-workshop-title" className="mb-24" role="article">
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-brand-200/70 bg-white shadow-soft-lg md:flex group">
            {/* Image panel */}
            <div className="md:w-1/2 relative h-72 md:h-auto">
              {/* 순서 변경: 선생님(초록 배경) 메인, 수련 장면 호버 */}
              <img src="/img/class/KakaoTalk_20250818_091833656_02.jpg" alt="워크숍 진행 선생님 사진" className="absolute inset-0 w-full h-full object-cover object-center opacity-100 group-hover:opacity-0 transition-opacity duration-700" loading="lazy" />
              <img src="/img/class/KakaoTalk_20250818_091833656_01.jpg" alt="워크숍 수련 장면 (정렬 지도)" className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/0 to-black/0 pointer-events-none" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-100/90 backdrop-blur text-[11px] font-semibold tracking-wide text-brand-700">{t('programsPreview.featured')}</span>
                <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur text-[11px] font-medium tracking-wide text-brand-800">{t('programsPreview.workshop')}</span>
              </div>
              { (countdown.d+countdown.h+countdown.m) > 0 && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] font-semibold tracking-wide bg-brand-700/80 text-white px-3 py-1.5 rounded-full backdrop-blur shadow">
                  <span className="opacity-80">{t('programsPreview.countdown')}</span>
                  <span className="tabular-nums">{countdown.d}d {countdown.h}h {countdown.m}m</span>
                </div>
              ) }
            </div>
            {/* Content panel */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col gap-6" aria-describedby="featured-workshop-meta">
              <header className="space-y-4">
                <h3 id="featured-workshop-title" className="font-serif text-[1.75rem] md:text-3xl font-semibold tracking-tight text-brand-800">{featuredWorkshop.title}</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700">{featuredWorkshop.summary}</p>
              </header>
              <div id="featured-workshop-meta" className="grid sm:grid-cols-2 gap-6 text-[13px] leading-relaxed">
                <ul className="space-y-2 text-gray-700" lang={lang}>
                  <li><strong className="text-brand-700">{t('programsPreview.session1')}:</strong> {featuredWorkshop.sessions[0]}</li>
                  <li><strong className="text-brand-700">{t('programsPreview.session2')}:</strong> {featuredWorkshop.sessions[1]}</li>
                  <li><strong className="text-brand-700">{t('programsPreview.totalHours')}:</strong> {featuredWorkshop.totalHours}{lang==='ko'? '시간':''}</li>
                  <li><strong className="text-brand-700">{t('programsPreview.location')}:</strong> {featuredWorkshop.location}</li>
                </ul>
                <ul className="space-y-2 text-gray-700" lang={lang}>
                  <li><strong className="text-brand-700">{t('programsPreview.tuition')}:</strong> {featuredWorkshop.tuition}</li>
                  <li><strong className="text-brand-700">{t('programsPreview.contact')}:</strong> {featuredWorkshop.contacts}</li>
                  <li><strong className="text-brand-700">{t('programsPreview.email')}:</strong> {featuredWorkshop.email}</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button as="a" href="/programs#upcoming" size="md">{t('programsPreview.details')}</Button>
                <Button as="a" href="/gallery?folder=gallery/Namaste_Yoga/GeorgeDovas" variant="subtle" size="md">{t('programsPreview.pastPhotos')}</Button>
              </div>
              <p className="text-[11px] text-gray-400" lang={lang}>{t('programsPreview.disclaimer')}</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-black/0 group-hover:ring-brand-300/60 transition" />
          </div>
        </article>

      </div>
    </Section>
  );
}
