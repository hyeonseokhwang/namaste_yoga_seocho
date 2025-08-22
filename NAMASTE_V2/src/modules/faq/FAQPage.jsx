import { useState } from 'react';
import NavBar from '../landing/components/NavBar.jsx';
import Footer from '../landing/sections/Footer.jsx';
import { ChevronDown } from 'lucide-react';

// Verbatim FAQ content provided by user (초보 수련자를 위한 안내 – FAQ)
const faqs = [
  {
    q:'1. 아엥가 요가는 왜 도구를 쓰나요?',
    a:'도구는 동작을 더 안전하고 정확하게 익히도록 도와줍니다. 개인의 유연성이나 체력에 따라 부담 없이 자세를 익힐 수 있도록 돕고, 수련의 깊이를 확장하는 데에도 유용합니다.'
  },
  {
    q:'2. 왜 이렇게 천천히, 디테일하게 가르치나요?',
    a:'각 자세에 깃든 정렬과 작용을 깊이 이해하고 내면화하기 위해서입니다. 속도보다 의식과 정확성을 중시하는 것이 아엥가 요가의 특징입니다.'
  },
  {
    q:'3. 같은 동작을 매번 반복하는 이유는 뭔가요?',
    a:"반복은 익숙함을 넘어 '깊은 이해'로 나아가기 위한 수련입니다. 동일한 자세도 매번 새로운 관찰과 통찰을 허용합니다."
  },
  {
    q:'4. 몸이 뻣뻣해도 할 수 있나요?',
    a:"물론입니다. 아엥가 요가는 유연성보다 '올바른 방향성'과 '주의 깊은 수련'을 중시합니다. 도구를 통해 각자에게 맞는 방식으로 수련할 수 있습니다."
  },
  {
    q:'5. 왜 짧은 반바지를 입나요?',
    a:'무릎과 허벅지의 정렬을 눈으로 확인하기 위함입니다. 정확한 수련을 위해 관절의 위치와 움직임을 관찰할 수 있는 복장을 권장합니다.'
  },
  {
    q:'6. 스탠딩 포즈만 하나요?',
    a:'아닙니다. 스탠딩 포즈는 모든 자세의 기본이며 몸의 구조를 바로잡는 기초 단계입니다. 그 외에도 전굴, 후굴, 트위스트, 인버전(거꾸로 서는 자세) 등 다양한 동작을 체계적으로 익혀갑니다.'
  },
  {
    q:'7. 아엥가 요가 선생님은 어떻게 되나요?',
    a:'공식 멘토 아래에서 수년간의 꾸준한 수련과 교육을 받은 후, 국제 기준에 따라 자격시험을 통해 공인됩니다.'
  },
  {
    q:'8. 아엥가 요가에서도 어려운 자세를 하나요?',
    a:'물론입니다. 아엥가 요가는 기초부터 고급 아사나까지 매우 넓은 범위의 동작을 다룹니다. 단계적으로 접근하며, 깊은 이해와 안전을 우선합니다.'
  },
  {
    q:'9. 최종 자세(풀 포즈)를 왜 바로 안 하나요?',
    a:"모양보다 '안정성과 준비된 상태'를 더 중요하게 보기 때문입니다. 점진적으로 신체를 준비시켜 자세의 본질에 도달하는 방식입니다."
  },
];

export default function FAQPage(){
  const [open,setOpen]=useState(0);
  const [query,setQuery] = useState('');
  const list = faqs.filter(f=> !query.trim() || f.q.includes(query.trim()) || f.a.includes(query.trim()));
  const allOpen = open === -2; // custom state for expand all
  function toggleAll(){ setOpen(allOpen? -1 : -2); }
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-brand-50 via-brand-100 to-brand-50">
      <NavBar />
      <header className="relative pt-36 pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_30%,rgba(86,141,168,0.20),transparent_65%),radial-gradient(circle_at_80%_70%,rgba(50,101,127,0.18),transparent_62%)] opacity-95" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
        <div className="container-beam max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-800">초보 수련자를 위한 안내 – FAQ</h1>
          <p className="mt-5 text-[15px] leading-relaxed text-brand-800/80 max-w-2xl">아엥가 요가가 생소하신 분들을 위해 자주 묻는 질문을 정리했습니다. 누구나 안전하게 수련을 시작할 수 있도록 도움이 되길 바랍니다.</p>
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-10">
            <label className="text-[12px] font-medium text-brand-700">검색
              <input value={query} onChange={e=> setQuery(e.target.value)} placeholder="키워드 입력" className="block mt-1 w-72 px-3 py-2 rounded-md bg-white/80 backdrop-blur border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-400 shadow-sm" />
            </label>
            <div className="flex items-center gap-4 text-[12px] text-brand-600">
              <p className="whitespace-nowrap">총 {list.length}개</p>
              <button onClick={toggleAll} className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-brand-700 text-white text-[11px] tracking-wide shadow hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                {allOpen? '모두 접기':'모두 펼치기'}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 pb-40">
        <div className="container-beam max-w-4xl">
          <div className="mt-10 rounded-3xl border border-brand-300/60 bg-white/70 backdrop-blur-md shadow-[0_6px_28px_-8px_rgba(40,70,90,0.25)] overflow-hidden">
            {list.map((f,i)=> {
              const isSingleOpen = open===i;
              const expanded = allOpen || isSingleOpen;
              const num = i+1;
              return (
                <div key={i} className={`group border-b last:border-b-0 border-brand-100/60 ${expanded? 'bg-gradient-to-r from-brand-100/80 via-white to-white':'bg-white/50 hover:bg-brand-50/50'} transition-colors`} id={`q${num}`}>
                  <button onClick={()=> setOpen(isSingleOpen? -1:i)} className="w-full text-left px-6 py-5 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    <span className={`mt-0.5 flex-shrink-0 h-5 w-5 grid place-items-center rounded-full text-[11px] font-semibold transition-colors ${expanded? 'bg-brand-600 text-white shadow':'bg-brand-100 text-brand-700 group-hover:bg-brand-200'}`}>{num}</span>
                    <span className="font-medium text-brand-800 tracking-tight text-[15px] leading-snug flex-1">
                      {f.q.replace(/^\d+\.\s*/,'')} {/* remove leading number inside badge area */}
                    </span>
                    <span className={`mt-0.5 text-brand-600 transition-transform ${expanded? 'rotate-180':''}`}><ChevronDown className="h-5 w-5" /></span>
                  </button>
                  <div className={`px-16 pb-6 -mt-1 text-[14px] leading-relaxed text-neutral-700/95 transition-all duration-400 will-change-[max-height,opacity] ${expanded? 'opacity-100 max-h-[320px]':'opacity-0 max-h-0 overflow-hidden'}`}>{f.a}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
