import React, { useState, useEffect } from 'react';

// BlurImage: shows tiny blurred placeholder until main image loads.
// props: src, alt, placeholder(optional low-res), className, imgClassName
export default function BlurImage({ src, alt='', placeholder, className='', imgClassName='', width, height, aspect, ...rest }){
  const [loaded,setLoaded] = useState(false);
  const tiny = placeholder || src;
  // If no distinct placeholder, we still fade in
  useEffect(()=>{ setLoaded(false); },[src]);
  // Reserve intrinsic space to reduce CLS: prefer explicit width/height; else optional aspect ratio (e.g., 'aspect-[4/3]')
  const style = {};
  if(width && height){
    style.aspectRatio = `${width} / ${height}`;
  }
  return (
    <div className={['relative overflow-hidden', aspect && !width? aspect:'', className].join(' ')} style={style}>
      <img
        src={tiny}
        aria-hidden={placeholder? true: undefined}
        className={`absolute inset-0 w-full h-full object-cover scale-105 blur-xl brightness-110 transition-opacity duration-700 ${loaded? 'opacity-0':'opacity-100'}`}
        alt=""
      />
      <img
        src={src}
        alt={alt}
        onLoad={()=> setLoaded(true)}
        width={width}
        height={height}
        decoding="async"
        className={`relative w-full h-full object-cover transition-opacity duration-700 ${loaded? 'opacity-100':'opacity-0'} ${imgClassName}`}
        {...rest}
      />
    </div>
  );
}
