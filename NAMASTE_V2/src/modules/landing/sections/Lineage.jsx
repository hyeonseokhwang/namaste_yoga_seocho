import useScrollReveal from '../hooks/useScrollReveal.js';
export default function Lineage(){
  const ref = useScrollReveal();
  return (
    <section id="lineage" ref={ref} className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-brand-50 py-24 overflow-hidden will-change-transform">
      <div className="absolute inset-0 opacity-[0.28] bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,0.10),transparent_60%)]" />
      <div className="container-beam relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-14">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white mb-6 font-semibold">Lineage & Authenticity</h2>
            <p className="text-[15px] leading-relaxed text-brand-100/90">IYCK는 B.K.S Iyengar 선생님의 가르침과 체계적 수련 전통을 충실히 계승합니다. 우리는 전통의 본질을 지키면서 현대 요가 수련자가 겪는 신체-정신적 요구를 섬세하게 지원하도록 접근을 다듬고 있습니다.</p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-brand-100/80">
            {['Guruji','Geeta','Prashant','Abhijata','RIMYI'].map(x=> (
              <li key={x} className="relative pl-3">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-accent-400/70" />{x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
