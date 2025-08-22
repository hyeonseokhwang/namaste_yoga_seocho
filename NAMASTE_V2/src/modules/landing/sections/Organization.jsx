import useScrollReveal from '../hooks/useScrollReveal.js';

const roles = [
  { role:'회장', people:['강경희'] },
  { role:'대외협력', people:['김정민'] },
  { role:'실무지원', people:['김명규','김옥교'] },
  { role:'교육지원', people:['양삼선','김아람','김유진'] },
  { role:'회계', people:['홍윤서'] },
];

export default function Organization(){
  const ref = useScrollReveal();
  return (
  <section ref={ref} className="relative py-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 will-change-transform">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(156,207,173,0.25),transparent_60%)]" />
      <div className="container-beam relative max-w-5xl">
        <div className="mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-700 mb-6">IYCK 조직 구성</h2>
          <p className="text-sm md:text-[15px] leading-relaxed text-neutral-700/80">구성원들은 자발적 참여로 커뮤니티 운영·교육·대외 협력·관리 체계를 유지하며 Iyengar Yoga 전통을 한국에 정착시키는 데 헌신하고 있습니다.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {roles.map(r=> (
            <div key={r.role} className="group relative rounded-2xl p-5 bg-white/70 backdrop-blur-sm border border-neutral-200 shadow-sm hover:shadow-md transition">
              <h3 className="font-medium tracking-tight text-brand-700 mb-3 text-sm uppercase">{r.role}</h3>
              <ul className="space-y-1 text-sm text-neutral-700/80">
                {r.people.map(p=> <li key={p}>{p}</li>)}
              </ul>
              <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-brand-500/30 via-transparent to-brand-500/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
