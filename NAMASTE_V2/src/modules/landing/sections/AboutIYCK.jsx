import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../../shared/ui/SectionHeading.jsx';
import { useI18n } from '../../shared/i18n/I18nProvider.jsx';
import Button from '../../shared/ui/Button.jsx';
import BlurImage from '../../shared/ui/BlurImage.jsx';

// About IYCK teaser with motion-respect & accessibility improvements
export default function AboutIYCK(){
  const { t, dict, lang } = useI18n();
  const ref = useScrollReveal();
  const images = ['/img/practice1.jpg','/img/practice2.jpg','/img/practice3.jpg'];
  const [idx,setIdx] = useState(0);
  useEffect(()=>{
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(media.matches) return; // skip rotation
    const t=setInterval(()=> setIdx(p=> (p+1)%images.length), 4800);
    return ()=>clearInterval(t);
  },[]);
  return (
    <Section
      id="about"
      ref={ref}
      ariaLabelledby="about-iyck-heading"
      className="relative overflow-hidden"
    >
      {/* background aesthetics */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-gray-50 to-white" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_55%_45%,black,transparent_78%)] bg-[radial-gradient(circle_at_28%_32%,rgba(86,141,168,0.18),transparent_60%),radial-gradient(circle_at_74%_68%,rgba(50,101,127,0.14),transparent_62%)]" aria-hidden="true" />
  <div className="container-beam grid lg:grid-cols-2 gap-20 items-center">
        {/* Visual*/}
        <div className="relative order-last lg:order-first">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-200/40 via-white to-accent-200/30 blur-xl" aria-hidden="true" />
            <figure className="relative rounded-3xl overflow-hidden ring-1 ring-brand-200/60 shadow-[0_8px_30px_-8px_rgba(16,38,49,0.25),0_4px_16px_-4px_rgba(16,38,49,0.18)] h-[360px] md:h-[460px] group">
              <BlurImage
                key={idx}
                src={images[idx]}
                alt="IYCK 수련 사진 (정렬과 프롭 활용 장면)"
                className="w-full h-full"
                imgClassName="object-cover brightness-[1.03] animate-fade-in"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/10 to-transparent" aria-hidden="true" />
            </figure>
            <div className="hidden md:block" aria-hidden="true">
              <div className="absolute -right-10 top-10 w-40 rounded-xl overflow-hidden ring-1 ring-white/70 shadow-lg backdrop-blur bg-white/60">
                <BlurImage src={images[(idx+1)%images.length]} alt="" className="w-full h-full" imgClassName="object-cover" loading="lazy" />
              </div>
              <div className="absolute -left-10 bottom-10 w-44 rounded-xl overflow-hidden ring-1 ring-white/70 shadow-lg backdrop-blur bg-white/60">
                <BlurImage src={images[(idx+2)%images.length]} alt="" className="w-full h-full" imgClassName="object-cover" loading="lazy" />
              </div>
            </div>
        </div>
        {/* Text */}
        <div className="max-w-xl mx-auto text-center lg:text-left">
          <SectionHeading
            id="about-iyck-heading"
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
            desc={<span dangerouslySetInnerHTML={{ __html: t('about.descHtml') }} />}
            size="lg"
          />
          <div className="mt-7 text-[14.5px] md:text-[15.5px] leading-relaxed text-gray-700 dark:text-gray-300 space-y-5 tracking-[0.015em]" lang={lang}>
            <p className="[text-wrap:balance]">{t('about.p1')}</p>
            <p className="[text-wrap:balance]">{t('about.p2')}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4" role="navigation" aria-label="About IYCK links">
            <Button as="a" href="/iyck" variant="primary" size="md" className="shadow-soft-lg hover:shadow-md focus-visible:ring-brand-500">{t('about.more')}</Button>
            <Button as="a" href="/programs" variant="subtle" size="md" className="bg-white/70 backdrop-blur hover:bg-white text-brand-700 border border-brand-200/70 focus-visible:ring-brand-500">{t('about.programs')}</Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center lg:justify-start gap-2.5 text-[11px] font-medium tracking-wide" role="list">
            {dict.about.chips.map(b=> (
              <li key={b} className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur ring-1 ring-brand-200/80 text-brand-700 shadow-sm hover:bg-white dark:bg-white/10 dark:text-brand-200 dark:ring-white/20 transition">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="divider-soft mt-6" />
    </Section>
  );
}
