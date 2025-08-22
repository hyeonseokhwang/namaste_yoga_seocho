import useScrollReveal from '../hooks/useScrollReveal.js';

export default function QuoteGuruji(){
  const ref = useScrollReveal();
  return (
  <section ref={ref} className="relative bg-gradient-to-b from-brand-800 via-brand-700 to-brand-800 text-brand-50 py-24 overflow-hidden will-change-transform">
      <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_30%_60%,#9ccfad55,transparent_60%)]" />
  <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-brand-300/10 via-brand-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="container-beam relative max-w-6xl">
        <div className="grid md:grid-cols-[minmax(220px,280px)_1fr] gap-14 items-center">
          {/* Portrait */}
          <div className="relative mx-auto md:mx-0 w-56 h-56 md:w-64 md:h-64 rounded-3xl p-[3px] bg-gradient-to-br from-brand-200/60 via-brand-400/40 to-brand-700/60 shadow-[0_8px_28px_-6px_rgba(15,35,55,.55)]">
            <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden">
              <picture>
                <source srcSet="/img/bks-iyengar-profile.webp" type="image/webp" />
                <img
                  src="/img/bkskofibphoto.jpg"
                  alt="B.K.S. Iyengar (Guruji) performing an asana"
                  loading="lazy"
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-[6000ms] ease-[cubic-bezier(.25,.1,.25,1)] will-change-transform hover:scale-110"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-transparent to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 ring-1 ring-brand-200/20" />
            </div>
            <div className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-tr from-brand-300/10 via-transparent to-transparent blur-xl pointer-events-none" />
          </div>
          {/* Quotes */}
          <figure className="space-y-8 relative">
            <blockquote className="text-xl md:text-2xl font-serif leading-relaxed tracking-tight text-brand-50">
              “I do pray that my ending will be your beginning. The great rewards and the countless blessings of a life spent following the Inward Journey await you.”
            </blockquote>
            <blockquote className="text-base md:text-lg leading-relaxed text-brand-100/80">
              “저는 진심으로 바랍니다. 저의 끝이 당신의 시작이 되기를. 내면의 여정을 따르는 삶에는 위대한 보상과 셀 수 없는 축복이 기다리고 있습니다.”
            </blockquote>
            <figcaption className="text-sm tracking-wide text-brand-200/80">— B.K.S. Iyengar, <em>Light on Life</em></figcaption>
            <div className="pt-4">
              <a
                href="/guruji"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide bg-brand-300/20 hover:bg-brand-300/30 text-brand-50 border border-brand-200/30 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800/60 transition"
              >
                구루지 소개 페이지 →
              </a>
            </div>
          </figure>
        </div>
      </div>
  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-300/30 to-transparent" />
    </section>
  );
}
