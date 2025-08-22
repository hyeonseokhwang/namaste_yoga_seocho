import { useI18n } from '../../shared/i18n/I18nProvider.jsx';

export default function Footer(){
  const { t } = useI18n();
  return (
    <footer id="contact" className="relative bg-brand-900 text-brand-100 py-14 md:py-16">
      <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.14),transparent_60%)]" />
      <div className="container-beam relative">
        <div className="grid md:grid-cols-4 gap-10 md:gap-14">
          <div className="space-y-4 col-span-2">
            <div className="leading-tight">
              <div className="text-[15px] md:text-[17px] font-semibold tracking-[0.16em]">IYENGAR</div>
              <div className="text-[15px] md:text-[17px] font-semibold tracking-[0.16em]">YOGA COMMUNITY KOREA</div>
              <p className="pt-2 text-[12px] text-brand-200/80">Iyengar Yoga Community Korea (IYCK)</p>
            </div>
            <p className="text-[13px] leading-relaxed text-brand-100/80 max-w-md" lang="ko" suppressHydrationWarning>{t('footer.mission')}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-brand-50/90">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-[13px] text-brand-100/70">
              <li>{t('footer.email')}: <a href="mailto:info@iyck.or.kr" className="underline hover:text-white">info@iyck.or.kr</a></li>
              <li>{t('footer.instagram')}: <a href="https://instagram.com/iyck_official" className="underline hover:text-white" rel="noopener">@iyck_official</a></li>
              <li>{t('footer.location')}: {t('footer.locationValue')}</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-brand-50/90">{t('footer.quick')}</h3>
            <ul className="space-y-2 text-[13px] text-brand-100/70">
              {[
                ['소개','#about'],
                ['Iyengar Yoga','/what'],
                ['구루지','/guruji'],
                ['프로그램','/programs'],
                ['교사','/teachers'],
                ['FAQ','/faq'],
              ].map(([label,href]) => (
                <li key={href}><a href={href} className="hover:text-white transition underline underline-offset-2 decoration-brand-500/40 hover:decoration-brand-300">{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex items-center justify-center pt-4 relative before:absolute before:top-0 before:left-4 before:right-4 before:h-px before:bg-gradient-to-r from-transparent via-white/15 to-transparent">
          <p className="text-[11px] tracking-wide text-brand-100/60">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
