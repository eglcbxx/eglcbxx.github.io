import { useEffect, useRef } from 'react';

/**
 * Hook that observes an element and adds 'animated' class when it enters the viewport.
 * Replaces the IntersectionObserver-based scroll animations from main.js.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...optionsRef.current }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Hook that observes multiple children for scroll animations.
 * Attach the returned ref to a parent container.
 */
export function useScrollAnimationGroup(selector = '.animate-on-scroll, .animate-fade, .animate-slide-left, .animate-slide-right') {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    container.querySelectorAll(selector).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);

  return ref;
}
