// Reusable SEO helpers (origin, canonical, hreflangs)
export function getSiteOrigin(){
  if(typeof window !== 'undefined') return window.location.origin;
  return import.meta.env.VITE_SITE_ORIGIN || 'http://203.236.91.172:5174';
}

export function buildSeo(pathname){
  const origin = getSiteOrigin();
  const base = origin + pathname;
  const hreflangs = [
    { lang:'ko', href: base + '?lang=ko' },
    { lang:'en', href: base + '?lang=en' },
    { lang:'x-default', href: base + '?lang=en' }
  ];
  const canonical = (lang) => base + (lang? ('?lang='+lang):'');
  return { origin, base, hreflangs, canonical };
}

// Global JSON-LD blocks reused across pages
export function getGlobalSchemas(){
  const origin = getSiteOrigin();
  return [
    {
      '@context':'https://schema.org',
      '@type':'Organization',
      name:'Iyengar Yoga Community Korea',
      alternateName:'IYCK',
      url: origin,
      logo:'/img/bks-iyengar-profile.webp',
      sameAs:[ 'https://instagram.com/iyck_official' ]
    },
    {
      '@context':'https://schema.org',
      '@type':'WebSite',
      name:'Iyengar Yoga Community Korea',
      url: origin,
      potentialAction:{
        '@type':'SearchAction',
        target: origin + '/?s={search_term_string}',
        'query-input':'required name=search_term_string'
      }
    }
  ];
}