import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';
import Section from '../components/Section.jsx';
import { ChevronDown } from 'lucide-react';

// Preview subset
const previewFaqs = [
  { q:'왜 도구를 사용하나요?', a:'도구는 개인의 체형과 유연성에 맞게 안전하고 정확한 정렬을 체득하도록 돕고 수련의 깊이를 확장합니다.' },
  { q:'왜 천천히 진행되나요?', a:'속도보다 의식과 정확성을 통해 신경계 안정 · 내면의 예민한 감각을 깨우기 위한 방식입니다.' },
  { q:'몸이 뻣뻣해도 가능한가요?', a:'정렬과 방향성 중심 접근이라 유연성과 무관하게 도구 도움으로 누구나 시작할 수 있습니다.' },
];

export default function FAQPreview(){
  const [open,setOpen]=useState(0);
  const ref = useScrollReveal();
  return (
  <Section id="faq" ref={ref} variant="tight" className="bg-white md:section will-change-transform" ariaLabelledby="faq-preview-heading">
      <div className="container-beam max-w-5xl">
  <h2 id="faq-preview-heading" className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-700 mb-12">FAQ Preview</h2>
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
          <a href="/faq" className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-brand-700 hover:bg-brand-600 text-white text-sm font-semibold shadow-soft-lg tracking-wide transition">WHY IYENGAR? 전체 FAQ →</a>
          <p className="text-[12px] text-neutral-600/80">도구 · 디테일 · 정렬 · 멘토링 · 반복 학습 등 9개 핵심 질문 모두 보기</p>
        </div>
      </div>
    </Section>
  );
}
