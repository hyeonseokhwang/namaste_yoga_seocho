import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../../shared/ui/SectionHeading.jsx';
import Button from '../../shared/ui/Button.jsx';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../../shared/i18n/I18nProvider.jsx';

// Fetched from i18n dictionaries

export default function FAQPreview(){
  const [open,setOpen]=useState(0);
  const { t, dict } = useI18n();
  const previewFaqs = dict.faqPreview.items;
  const ref = useScrollReveal();
  return (
  <Section id="faq" ref={ref} variant="tight" className="bg-white md:section will-change-transform" ariaLabelledby="faq-preview-heading">
    <div className="container-beam max-w-5xl">
  <SectionHeading id="faq-preview-heading" eyebrow={t('faqPreview.eyebrow')} title={t('faqPreview.title')} size="md" />
  <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white">
          {previewFaqs.map((f,i)=> {
            const is = open===i;
            return (
              <div key={i} className="group">
                <button onClick={()=> setOpen(is? -1:i)} className="w-full text-left px-6 py-5 flex items-start gap-4">
                  <span className="mt-0.5 text-brand-600"><ChevronDown className={`h-5 w-5 transition-transform ${is?'rotate-180':''}`} /></span>
                  <span className="font-medium text-brand-700 tracking-tight">{f.q}</span>
                </button>
                <div className={`px-16 pb-6 -mt-2 text-sm leading-relaxed text-neutral-700/80 transition-[height,opacity] duration-300 ${is? 'opacity-100':'opacity-0 hidden'}`}>{f.a}</div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10 flex flex-col gap-3 items-center">
          <Button as="a" href="/faq" size="md">{t('faqPreview.more')}</Button>
          <p className="text-[12px] text-neutral-600/80">{t('faqPreview.subtitle')}</p>
        </div>
      </div>
    </Section>
  );
}
