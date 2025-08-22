// Summarize legacy pages Iyengar What / Guruji / CIYT into a learning strip
import useScrollReveal from '../hooks/useScrollReveal.js';
import { useState } from 'react';
import Modal from './learnIyengar/Modal.jsx';
import { whatIyengar, guruji, ciyt } from './learnIyengar/FullTexts.js';

const items = [
  { title:'What is Iyengar Yoga?', slug:'/iyengar/what', desc:'정렬 · 시퀀스 · 타이밍 3원리를 통해 몸과 마음의 정교한 통합을 추구하는 수련 체계.' },
  { title:'Guruji B.K.S. Iyengar', slug:'/iyengar/guruji', desc:'정확성과 접근성 있는 도구 활용으로 현대 요가에 혁신을 남긴 세계적 스승.' },
  { title:'CIYT Certification', slug:'/iyengar/ciyt', desc:'체계적 멘토링 · 다년 수련 · 평가를 거쳐 전통을 책임감 있게 전수하는 공인 교사.' },
];

export default function LearnIyengar(){
  const ref = useScrollReveal();
  const [open,setOpen] = useState(false);
  const [modal,setModal] = useState({title:'',body:''});
  const openModal=(type)=>{
    if(type==='what') setModal({title:'Iyengar Yoga란 무엇인가요?', body: whatIyengar});
    if(type==='guruji') setModal({title:'B.K.S. Iyengar (Guruji)', body: guruji});
    if(type==='ciyt') setModal({title:'공인 Iyengar Yoga 교사 (CIYT)', body: ciyt});
    setOpen(true);
  };
  return (
  <section ref={ref} className="relative py-24 bg-[linear-gradient(140deg,#1f3f51,#285166,#32657f)] text-brand-50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_30%_60%,#9ccfad55,transparent_60%)]" />
      <div className="container-beam relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight mb-4">Learn Iyengar Method</h2>
            <p className="text-sm md:text-base text-brand-100/80 leading-relaxed">전통 페이지 내용을 응축한 빠른 개요. 더 깊은 이해를 위해 아래 카드를 눌러 전체 내용을 펼쳐 보세요.</p>
          </div>
          <a href="/iyengar/what" className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-medium tracking-wide px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-brand-50 border border-brand-300/30">전체 페이지 이동</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <button onClick={()=>openModal('what')} className="text-left group relative rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur-sm hover:bg-white/10 transition">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(156,207,173,0.18),transparent_65%)] transition" />
            <h3 className="relative font-semibold tracking-tight text-brand-50 mb-3 text-lg">What is Iyengar Yoga?</h3>
            <p className="relative text-sm leading-relaxed text-brand-100/80">정렬 · 시퀀스 · 타이밍 3원리를 통해 몸과 마음의 정교한 통합을 추구하는 수련 체계.</p>
            <div className="relative mt-5 flex flex-col gap-2">
              <span className="inline-block text-[11px] font-medium tracking-wider text-brand-200 group-hover:text-white">모달로 요약 보기 →</span>
              <a href="/iyengar/what" className="inline-block w-fit text-[11px] font-medium tracking-wider text-brand-50 hover:text-white underline/30 hover:underline">전체 페이지 이동 →</a>
            </div>
          </button>
          <button onClick={()=>openModal('guruji')} className="text-left group relative rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur-sm hover:bg-white/10 transition">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(156,207,173,0.18),transparent_65%)] transition" />
            <h3 className="relative font-semibold tracking-tight text-brand-50 mb-3 text-lg">Guruji B.K.S. Iyengar</h3>
            <p className="relative text-sm leading-relaxed text-brand-100/80">정확성과 접근성 있는 도구 활용으로 현대 요가에 혁신을 남긴 세계적 스승.</p>
            <span className="relative mt-5 inline-block text-[11px] font-medium tracking-wider text-brand-200 group-hover:text-white">전체 내용 열기 →</span>
          </button>
          <button onClick={()=>openModal('ciyt')} className="text-left group relative rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur-sm hover:bg-white/10 transition">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(156,207,173,0.18),transparent_65%)] transition" />
            <h3 className="relative font-semibold tracking-tight text-brand-50 mb-3 text-lg">CIYT Certification</h3>
            <p className="relative text-sm leading-relaxed text-brand-100/80">체계적 멘토링 · 다년 수련 · 평가로 전통을 책임감 있게 전수하는 공인 교사 제도.</p>
            <span className="relative mt-5 inline-block text-[11px] font-medium tracking-wider text-brand-200 group-hover:text-white">전체 내용 열기 →</span>
          </button>
        </div>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} title={modal.title} body={modal.body} />
    </section>
  );
}
