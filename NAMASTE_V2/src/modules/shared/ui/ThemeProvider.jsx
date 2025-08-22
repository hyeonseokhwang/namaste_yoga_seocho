import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme:'light', toggle: ()=>{} });

export function ThemeProvider({ children }){
  const [theme,setTheme] = useState(()=>{
    if(typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('iyck-theme');
    if(stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(()=>{
    const root = document.documentElement;
    if(theme==='dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('iyck-theme', theme);
  },[theme]);

  function toggle(){ setTheme(t => t==='dark'? 'light':'dark'); }

  return <ThemeContext.Provider value={{theme,toggle}}>{children}</ThemeContext.Provider>;
}

export function useTheme(){ return useContext(ThemeContext); }
