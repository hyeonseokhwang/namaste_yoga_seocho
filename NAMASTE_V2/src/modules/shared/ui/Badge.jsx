import React from 'react';
// Simple Badge pill
// tone: brand | neutral | accent
const tones = {
  brand: 'bg-brand-100 text-brand-700 ring-brand-200/70',
  neutral: 'bg-neutral-100 text-neutral-700 ring-neutral-300/70',
  accent: 'bg-accent-100 text-accent-700 ring-accent-200/70'
};
export default function Badge({tone='brand', className='', children, ...rest}){
  return <span className={[ 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ring-1', tones[tone], className].join(' ')} {...rest}>{children}</span>;
}
