// Teachers preview (pulling legacy teacher data summarized)
import teachersData from '../shared/teachersData.js';
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function TeachersPreview(){
  const featured = teachersData.slice(0,4);
  const ref = useScrollReveal();
  return (
  <section ref={ref} className="bg-gradient-to-b from-white to-neutral-50 py-24 will-change-transform">
      <div className="container-beam">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-700 mb-4">Certified Teachers</h2>
            <p className="text-neutral-700/80 text-sm max-w-md leading-relaxed">공인 교사들은 정렬·시퀀스·호흡 원리에 기반한 세밀한 지도와 안전한 수련을 안내합니다.</p>
          </div>
          <a href="/teachers" className="self-start md:self-auto text-sm rounded-full bg-brand-600 text-white px-5 py-2.5 font-medium shadow-soft-lg hover:bg-brand-500 transition">전체 명단</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(t=> (
            <div key={t.name} className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-brand-700 tracking-tight text-sm mb-1 leading-snug">{t.name}</h3>
              <p className="text-[11px] uppercase tracking-wide text-brand-600/70 mb-3">{t.location}</p>
              <div className="space-y-1 text-[12px] text-neutral-700/80">
                <p>{t.phone}</p>
                <p className="truncate">{t.email}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.instagram && <a href={t.instagram} className="text-[11px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition">Instagram</a>}
                {t.website && <a href={t.website} className="text-[11px] px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-700 transition">Website</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
