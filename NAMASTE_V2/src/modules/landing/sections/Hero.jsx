export default function Hero(){
  return (
  <header className="relative h-[86vh] min-h-[620px] w-full flex items-center overflow-hidden bg-[linear-gradient(125deg,#1f3f51,#285166,#32657f)]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,43,55,.85),rgba(31,63,81,.55),rgba(49,103,127,.20))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay" style={{backgroundImage:"url('data:image/svg+xml,%3Csvg width=200 height=200 viewBox=0 0 200 200 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath fill=%27%23ffffff%27 fill-opacity=%270.04%27 d=%27M100 0c6 24 22 46 42 66-20 20-36 42-42 66-6-24-22-46-42-66C78 46 94 24 100 0Z M0 100c24-6 46-22 66-42 20 20 42 36 66 42-24 6-46 22-66 42C46 122 24 106 0 100Z%27/%3E%3C/svg%3E')",backgroundSize:'520px',backgroundRepeat:'repeat'}} />
      </div>
      <div className="relative container-beam">
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-brand-50 mb-8 drop-shadow-[0_8px_18px_rgba(10,24,16,0.55)]">
            깊은 호흡, 고요한 정렬
          </h1>
          <p className="text-base md:text-lg text-brand-100/90 leading-relaxed max-w-xl mb-10">
            도시의 속도에서 한 발 물러나 집중 · 정렬 · 호흡의 본질로 돌아오는 Iyengar 수련을 경험하세요. 정교한 디테일과 안정된 호흡이 몸과 마음을 재구성합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 rounded-full bg-accent-500 hover:bg-accent-400 text-white text-sm font-medium shadow-soft-lg transition">체험 클래스</button>
            <button className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-brand-50 text-sm font-medium border border-brand-300/30 transition">센터 소개</button>
          </div>
        </div>
      </div>
    </header>
  );
}
