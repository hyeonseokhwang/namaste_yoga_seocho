export default function Footer(){
  return (
    <footer id="contact" className="relative bg-brand-900 text-brand-100 pt-20 pb-14">
      <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.14),transparent_60%)]" />
      <div className="container-beam relative">
        <div className="grid gap-12 md:grid-cols-5 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold tracking-tight mb-4 text-lg">IYCK</h3>
            <p className="text-sm leading-relaxed text-brand-100/90 max-w-xs">정확성 · 안정성 · 주의 깊은 호흡. IYCK는 아이엥가 요가의 정통성을 기반으로 체계적이고 세밀한 배움을 제공합니다.</p>
            <div className="mt-6 flex gap-4 text-xs text-brand-100/70">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm tracking-wide uppercase">Programs</h4>
            <ul className="space-y-2 text-sm">
              {['Regular Classes','Workshops','Therapeutics','Pranayama'].map(i=> <li key={i} className="hover:text-white cursor-pointer">{i}</li>)}
            </ul>
          </div>
            <div>
            <h4 className="text-white font-medium mb-4 text-sm tracking-wide uppercase">About</h4>
            <ul className="space-y-2 text-sm">
              {['Lineage','Teachers','Method','FAQ'].map(i=> <li key={i} className="hover:text-white cursor-pointer">{i}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm tracking-wide uppercase">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>서울시 ○○구 ○○로 123</li>
              <li>010-0000-0000</li>
              <li>info@iyck.org</li>
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="text-xs text-brand-100/70">© {new Date().getFullYear()} IYCK. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
