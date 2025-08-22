import Button from '../../shared/ui/Button.jsx';
import { useI18n } from '../../shared/i18n/I18nProvider.jsx';

export default function Hero(){
  const { t, lang } = useI18n();
  return (
    <header
      id="hero"
      role="banner"
      aria-label={t('hero.aria')}
      className="relative min-h-[85vh] min-h-[640px] md:min-h-[720px] w-full flex items-center overflow-hidden bg-[linear-gradient(120deg,#1f3f51,#285166,#32657f)] pt-24 md:pt-0"
    >
      {/* Decorative backgrounds */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,43,55,.85),rgba(31,63,81,.55),rgba(49,103,127,.20))]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=200 height=200 viewBox=0 0 200 200 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath fill=%27%23ffffff%27 fill-opacity=%270.04%27 d=%27M100 0c6 24 22 46 42 66-20 20-36 42-42 66-6-24-22-46-42-66C78 46 94 24 100 0Z M0 100c24-6 46-22 66-42 20 20 42 36 66 42-24 6-46 22-66 42C46 122 24 106 0 100Z%27/%3E%3C/svg%3E')",
            backgroundSize: '520px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>
      <div className="relative container-beam">
        <div className="max-w-2xl pt-4 md:pt-0">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-brand-50 mb-8 drop-shadow-[0_8px_18px_rgba(10,24,16,0.55)]" lang={lang}>{t('hero.title')}</h1>
          <p className="text-base md:text-lg text-brand-50/90 leading-relaxed max-w-xl mb-6" lang={lang} dangerouslySetInnerHTML={{ __html: t('hero.subtitle1') }} />
          <p className="text-sm md:text-[15px] text-brand-100/80 leading-relaxed max-w-xl mb-10" lang={lang}>{t('hero.subtitle2')}</p>
          <nav aria-label="주요 행동" className="flex flex-col sm:flex-row gap-4">
            <Button as="a" href="#programs" variant="gradient" size="md">{t('hero.ctaExperience')}</Button>
            {/* About button: elevated contrast for visibility (client request) */}
            <Button
              as="a"
              href="#about"
              variant="ghost"
              size="md"
              className="relative bg-white/95 hover:bg-white text-brand-800 font-semibold shadow-[0_4px_18px_-4px_rgba(0,0,0,0.45)] border border-white/0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f3f51]"
              aria-label={t('hero.ctaAbout')}
            >
              {t('hero.ctaAbout')}
            </Button>
            <Button as="a" href="#faq" variant="subtle" size="md" className="bg-gradient-to-r from-brand-200/80 via-brand-300/80 to-brand-200/80 hover:from-brand-200 hover:via-brand-300 hover:to-brand-200 text-brand-800 border border-brand-400/30">{t('hero.ctaWhy')}</Button>
          </nav>
        </div>
      </div>
      {/* Enhanced Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-medium tracking-[0.18em] text-brand-100/80 select-none" aria-hidden="true">
        <div className="h-10 w-6 rounded-full border border-brand-100/40 flex items-start justify-center p-1 animate-bounce-slow">
          <span className="block w-1.5 h-1.5 rounded-full bg-brand-100/80 animate-[scrollDot_1.6s_ease-in-out_infinite]" />
        </div>
        <span className="relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-px after:bg-gradient-to-r after:from-transparent after:via-brand-100/60 after:to-transparent">SCROLL</span>
      </div>
      <style>{`@keyframes scrollDot{0%{transform:translateY(0);opacity:1}60%{transform:translateY(20px);opacity:.15}100%{transform:translateY(0);opacity:1}}`}</style>
    </header>
  );
}
