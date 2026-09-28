import { useEffect } from 'react';

/*
 * Fades sections in as they scroll into view.
 *
 * Progressive enhancement: the hidden starting state only applies once this
 * hook has put `reveal-ready` on <html>, so the static HTML (what crawlers,
 * no-JS visitors and the first paint see) is always fully visible.
 * Visitors who prefer reduced motion get no animation at all.
 */
const useReveal = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return undefined;

    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll('[data-reveal]'));

    // Anything already on screen is shown straight away, so nothing blinks.
    const viewportBottom = window.innerHeight;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < viewportBottom) el.classList.add('is-revealed');
    });
    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.filter((el) => !el.classList.contains('is-revealed')).forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
};

export default useReveal;
