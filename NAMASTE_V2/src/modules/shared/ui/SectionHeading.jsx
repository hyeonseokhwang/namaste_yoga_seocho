import React from 'react';

// SectionHeading standardizes eyebrow (small label), title, description.
// size: sm | md | lg
export default function SectionHeading({ id, eyebrow, title, desc, align='left', size='md', className='' }){
  const sizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-[2.75rem]'
  };
  const alignCls = align==='center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={[ 'space-y-5', alignCls, className].join(' ')}>
      {eyebrow && <div className="flex justify-start">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-[11px] font-semibold tracking-wide text-brand-700 ring-1 ring-brand-200/70">{eyebrow}</span>
      </div>}
      {title && <h2 id={id} className={[ 'font-serif font-semibold tracking-tight text-gray-900', sizes[size] ].join(' ')}>{title}</h2>}
      {desc && <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed max-w-xl">{desc}</p>}
    </div>
  );
}
