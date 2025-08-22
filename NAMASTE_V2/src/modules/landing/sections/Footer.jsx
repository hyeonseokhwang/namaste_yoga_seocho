export default function Footer(){
  return (
    <footer id="contact" className="relative bg-brand-900 text-brand-100 py-8 md:py-10">
      <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.14),transparent_60%)]" />
      <div className="container-beam relative">
        <div className="flex items-center justify-center pt-4 before:absolute before:top-0 before:left-4 before:right-4 before:h-px before:bg-gradient-to-r from-transparent via-white/15 to-transparent">
          <p className="text-[11px] tracking-wide text-brand-100/60">© 2025 IYCK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
