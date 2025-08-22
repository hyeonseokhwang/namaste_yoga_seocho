import { useEffect } from 'react';

// Meta: simple head manager without external libs.
// Props: title, description, structuredData (object or array) for JSON-LD
// Props:
//  - title, description
//  - structuredData: object | array (JSON-LD injected)
//  - lang: optional html lang override
//  - hreflangs: optional array [{ lang:'en', href:'/path?lang=en' }]
export default function Meta({ title, description, structuredData, lang, hreflangs, canonical, extendGlobal=false }){
  useEffect(()=>{
    if(title) document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if(!metaDesc){
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    if(description) metaDesc.content = description;
    if(lang){
      document.documentElement.setAttribute('lang', lang);
    }
    // canonical
    const prevCanonical = document.head.querySelector('link[rel="canonical"][data-managed="canonical"]');
    if(prevCanonical) prevCanonical.remove();
    if(canonical){
      const link = document.createElement('link');
      link.rel='canonical';
      link.href=canonical;
      link.dataset.managed='canonical';
      document.head.appendChild(link);
    }
    // hreflang links management
    const existing = Array.from(document.head.querySelectorAll('link[data-managed="hreflang"]'));
    existing.forEach(l => l.remove());
    if(Array.isArray(hreflangs)){
      hreflangs.forEach(h => {
        if(!h || !h.lang || !h.href) return;
        const link = document.createElement('link');
        link.setAttribute('rel','alternate');
        link.setAttribute('hreflang', h.lang);
        link.setAttribute('href', h.href);
        link.dataset.managed='hreflang';
        document.head.appendChild(link);
      });
    }
    let ldScript;
    if(structuredData){
      // allow merging of arrays / single object
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      ldScript = document.createElement('script');
      ldScript.type='application/ld+json';
      ldScript.text = JSON.stringify(dataArray.length===1? dataArray[0]: dataArray);
      document.head.appendChild(ldScript);
    }
    return ()=> { if(ldScript) ldScript.remove(); };
  }, [title, description, structuredData, lang, hreflangs, canonical]);
  return null;
}
