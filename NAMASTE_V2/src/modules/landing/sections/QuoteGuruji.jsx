import useScrollReveal from '../hooks/useScrollReveal.js';
import Section from '../components/Section.jsx';

export default function QuoteGuruji(){
  const ref = useScrollReveal();
  return (
    <Section
      ref={ref}
      ariaLabelledby="quote-guruji-heading"
    variant="tight"
    className="md:section bg-gradient-to-b from-brand-50 via-brand-100 to-brand-50 text-brand-800 overflow-hidden will-change-transform relative border-t border-brand-200/70"
    >
    <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(circle_at_20%_40%,rgba(77,132,159,0.18),transparent_60%)]" aria-hidden="true" />
    <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-brand-400/10 via-accent-300/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="container-beam relative max-w-6xl">
        <div className="grid md:grid-cols-[minmax(220px,280px)_1fr] gap-14 items-center">
          {/* Portrait decorative */}
      <div className="relative mx-auto md:mx-0 w-56 h-56 md:w-64 md:h-64 rounded-3xl p-[3px] bg-gradient-to-br from-brand-300/70 via-brand-200/50 to-brand-400/70 shadow-[0_8px_24px_-8px_rgba(31,63,81,.25)]" aria-hidden="true">
            <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden">
              <picture>
                <source srcSet="/img/bks-iyengar-profile.webp" type="image/webp" />
                <img
                  src="/img/bkskofibphoto.jpg"
                  alt=""
                  loading="lazy"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-[6000ms] ease-[cubic-bezier(.25,.1,.25,1)] will-change-transform group-hover:scale-110 grayscale-[20%] contrast-[1.05]"
                />
              </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 via-transparent to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 ring-1 ring-brand-300/40" />
            </div>
      <div className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-tr from-brand-400/20 via-transparent to-transparent blur-xl pointer-events-none" />
          </div>
          {/* Quotes */}
          <figure className="space-y-8 relative">
            <h2 id="quote-guruji-heading" className="sr-only">Guruji Quote</h2>
      <blockquote className="text-xl md:text-2xl font-serif leading-relaxed tracking-tight text-brand-800">
              “I do pray that my ending will be your beginning. The great rewards and the countless blessings of a life spent following the Inward Journey await you.”
            </blockquote>
      <blockquote className="text-base md:text-lg leading-relaxed text-brand-700">
              “저는 진심으로 바랍니다. 저의 끝이 당신의 시작이 되기를. 내면의 여정을 따르는 삶에는 위대한 보상과 셀 수 없는 축복이 기다리고 있습니다.”
            </blockquote>
      <figcaption className="text-sm tracking-wide text-brand-600">— B.K.S. Iyengar, <em>Light on Life</em></figcaption>
            <div className="pt-4">
              <a
                href="/guruji"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide bg-brand-700 hover:bg-brand-600 text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50 transition"
              >
                구루지 소개 페이지 →
              </a>
            </div>
          </figure>
        </div>
      </div>
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
  </Section>
  );
}
