import { useEffect, useState } from 'react';

// Generic scrollspy hook: pass an array of section ids; returns currently active id.
export default function useActiveSection(ids = [], options = {}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!ids.length || typeof window === 'undefined') return;
    const elements = ids
      .map(id => document.getElementById(id.replace(/^#/, '')))
      .filter(Boolean);
    if (!elements.length) return;

    const rootMarginTop = options.offsetTop ?? 0;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) {
        const id = visible[0].target.getAttribute('id');
        setActive(id);
      } else {
        // Fallback: find last element above viewport
        let lastAbove = null;
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
            if (rect.top < (rootMarginTop + 10)) lastAbove = el;
        }
        if (lastAbove) setActive(lastAbove.id);
      }
    }, { rootMargin: `${- (rootMarginTop)}px 0px -65% 0px`, threshold: [0.1,0.25,0.5] });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|')]);

  return active;
}
