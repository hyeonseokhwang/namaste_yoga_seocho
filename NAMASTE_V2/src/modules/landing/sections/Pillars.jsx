const pillars = [
  { title:'Alignment', desc:'정확한 정렬은 에너지 통로를 열고 부상 예방을 강화합니다.' },
  { title:'Awareness', desc:'주의 깊은 감각 인식이 내·외적 균형과 통찰을 이끕니다.' },
  { title:'Sequencing', desc:'과학적 순서 구성으로 단계적 집중과 깊이를 확보합니다.' },
  { title:'Stability & Ease', desc:'안정성 기반의 편안함이 고요한 집중을 가능하게 합니다.' },
];
import useScrollReveal from '../hooks/useScrollReveal.js';
export default function Pillars(){
  const ref = useScrollReveal();
  return (
    <section
      ref={ref}
      id="principles"
      aria-labelledby="principles-heading"
      className="bg-gradient-to-b from-neutral-50 to-white py-24 md:py-28 will-change-transform"
    >
      <div className="container-beam">
        <h2 id="principles-heading" className="font-serif text-3xl md:text-4xl mb-14 text-center text-brand-700 tracking-tight">Practice Principles</h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {pillars.map(p=> (
            <li key={p.title} className="group relative rounded-2xl bg-gradient-to-br from-white to-neutral-100/60 border border-neutral-200 p-6 shadow-sm hover:shadow-md transition focus-within:shadow-md">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(118,159,109,0.18),transparent_65%)] transition" aria-hidden="true" />
              <h3 className="relative font-semibold text-brand-700 tracking-tight mb-3 text-lg">{p.title}</h3>
              <p className="relative text-sm leading-relaxed text-neutral-700/80">{p.desc}</p>
              <div className="relative h-px mt-5 bg-gradient-to-r from-brand-500/40 via-brand-500/10 to-transparent" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
