import { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { ChevronDown } from 'lucide-react';
import Modal from './learnIyengar/Modal.jsx';

// Preview subset
const previewFaqs = [
  { q:'왜 도구를 사용하나요?', a:'도구는 개인의 체형과 유연성에 맞게 안전하고 정확한 정렬을 체득하도록 돕고 수련의 깊이를 확장합니다.' },
  { q:'왜 천천히 진행되나요?', a:'속도보다 의식과 정확성을 통해 신경계 안정 · 내면의 예민한 감각을 깨우기 위한 방식입니다.' },
  { q:'몸이 뻣뻣해도 가능한가요?', a:'정렬과 방향성 중심 접근이라 유연성과 무관하게 도구 도움으로 누구나 시작할 수 있습니다.' },
];

export default function FAQPreview(){
  const [open,setOpen]=useState(0);
  const [show,setShow]=useState(false);
  const [allFaqs,setAllFaqs]=useState([]);
  useEffect(()=>{
    setAllFaqs([
      {q:'아엥가 요가는 왜 도구를 쓰나요?', a:'도구는 동작을 더 안전하고 정확하게 익히도록 돕고 개인 조건 차이를 보완하여 깊이를 확장합니다.'},
      {q:'왜 이렇게 천천히, 디테일하게 가르치나요?', a:'정렬·작용·호흡의 내재화를 위해 속도보다 인식과 정확성을 중시합니다.'},
      {q:'같은 동작을 반복하는 이유는?', a:'반복은 관찰을 정밀하게 하고 의식·감각 층위를 확장시키는 학습 방식입니다.'},
      {q:'몸이 뻣뻣해도 할 수 있나요?', a:'유연성보다 방향성과 주의가 핵심이며 도구로 맞춤 조정이 가능합니다.'},
      {q:'왜 짧은 반바지를 입나요?', a:'무릎·대퇴 근육/관절 정렬을 시각적으로 확인하여 안전성과 효율을 높입니다.'},
      {q:'스탠딩 포즈만 하나요?', a:'스탠딩은 기초 구조 재정렬 단계이며 이후 전굴/후굴/트위스트/인버전 등으로 확장됩니다.'},
      {q:'교사는 어떻게 되나요?', a:'수년 수련·멘토링·평가를 거쳐 국제 기준 CIYT 인증 과정을 통과합니다.'},
      {q:'어려운 자세도 하나요?', a:'점진적 단계에서 조건이 성숙되면 고급 아사나도 접근합니다.'},
      {q:'최종 자세(풀 포즈)는 왜 바로 안 하나요?', a:'준비된 기초와 내적 정렬이 안정성을 만든 뒤 본질에 도달하는 접근입니다.'},
    ]);
  },[]);
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 will-change-transform">
      <div className="container-beam max-w-5xl">
  <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-700 mb-12">FAQ Preview</h2>
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
        <div className="text-center mt-10 flex flex-col gap-4 items-center">
          <a href="/faq" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium shadow-soft-lg transition">전체 FAQ 페이지</a>
          <button onClick={()=> setShow(true)} className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-brand-700 border border-neutral-300 hover:bg-neutral-100 text-sm font-medium transition">전체 FAQ 모달 보기</button>
        </div>
      </div>
      <Modal open={show} onClose={()=>setShow(false)} title="전체 FAQ" body={allFaqs.map(f=>`Q. ${f.q}\n${f.a}`).join('\n\n')} />
    </section>
  );
}
