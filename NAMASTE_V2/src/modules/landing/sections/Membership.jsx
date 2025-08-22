import useScrollReveal from '../hooks/useScrollReveal.js';
export default function Membership(){
  const ref = useScrollReveal();
  return (
  <section ref={ref} className="relative py-28 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 overflow-hidden will-change-transform">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_120%,rgba(118,159,109,0.35),transparent_70%)] opacity-[0.25]" />
      <div className="container-beam relative text-center">
  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-700 tracking-tight mb-6">꾸준함이 치유를 만듭니다</h2>
  <p className="text-neutral-700/80 text-[15px] leading-relaxed max-w-2xl mx-auto mb-12">회원 전용 커리큘럼과 정기적 피드백으로 자연스러운 회복과 내면 안정, 지속 가능한 수련 루틴을 설계하세요.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-full bg-accent-500 hover:bg-accent-400 text-white font-medium text-sm shadow-soft-lg transition">멤버십 안내</button>
          <button className="px-8 py-3 rounded-full bg-white text-brand-700 font-medium text-sm border border-neutral-300 hover:bg-neutral-100 transition">체험 클래스 신청</button>
        </div>
      </div>
    </section>
  );
}
