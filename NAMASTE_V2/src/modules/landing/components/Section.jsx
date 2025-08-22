import React, { forwardRef } from 'react';

// Generic Section wrapper to standardize vertical rhythm.
// variant: default | tight | none | dark
const Section = forwardRef(function Section({ id, as='section', variant='default', className='', ariaLabelledby, children, ...rest }, ref){
  const Tag = as;
  let base = '';
  switch(variant){
    case 'tight': base = 'section-tight'; break;
    case 'none': base = ''; break;
    case 'dark': base = 'section bg-brand-900 text-white'; break;
    default: base = 'section';
  }
  return (
    <Tag id={id} ref={ref} aria-labelledby={ariaLabelledby} className={[base, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
});

export default Section;
