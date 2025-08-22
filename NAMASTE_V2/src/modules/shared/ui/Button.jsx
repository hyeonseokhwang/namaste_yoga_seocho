// Reusable Button primitive
// variant: primary | subtle | outline | ghost | gradient
// size: sm | md | lg
import React from 'react';

const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
const sizes = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-sm md:text-base px-7 py-3.5'
};
const variants = {
  primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-soft-lg focus-visible:ring-brand-600/70',
  subtle: 'bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-300/60',
  outline: 'border border-brand-500/60 text-brand-700 hover:bg-brand-600/10 focus-visible:ring-brand-500/50',
  ghost: 'text-brand-700 hover:bg-brand-600/10 focus-visible:ring-brand-400/50',
  gradient: 'bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-400 hover:to-accent-400 text-white shadow-soft-lg focus-visible:ring-accent-400'
};

export default function Button({ as = 'button', variant='primary', size='md', className='', children, ...rest }){
  const Tag = as;
  return <Tag className={[base, sizes[size], variants[variant], className].join(' ')} {...rest}>{children}</Tag>;
}
