import { useRef, useEffect, useCallback, Children, cloneElement } from 'react';

/**
 * Seamless infinite-scroll carousel.
 *
 * Strategy (mirrors the static site):
 *   Render [OriginalSet] [CloneSet] in JSX.
 *   Scroll continuously via translate3d.
 *   When we've scrolled past the full width of one set, instantly jump
 *   back by exactly that width — the clone is visually identical so the
 *   user sees no seam.
 */
export default function Carousel({ id, children }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const setWidthRef = useRef(0);
  const childCount = Children.count(children);

  /* Measure the width of one complete set once cards are laid out */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || childCount === 0) return;

    // Measure after the browser has painted
    const measure = () => {
      const firstCard = track.children[0];
      if (!firstCard || firstCard.offsetWidth === 0) {
        // Cards haven't painted yet; try again next frame
        requestAnimationFrame(measure);
        return;
      }

      const gap = parseInt(getComputedStyle(track).gap) || 20;
      const cardWidth = firstCard.offsetWidth;
      setWidthRef.current = childCount * (cardWidth + gap);
    };

    requestAnimationFrame(measure);
  }, [childCount]);

  /* Animation loop */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += 1.5; // px per frame — matches original speed

        const setWidth = setWidthRef.current;
        if (setWidth > 0 && posRef.current >= setWidth) {
          posRef.current -= setWidth;
        }

        track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [childCount]);

  /* Pause / resume on expanded card */
  const handleTrackClick = useCallback((e) => {
    const card = e.target.closest('.skill-card, .strength-card');
    if (!card) return;
    if (e.target.tagName === 'A' || e.target.closest('a')) return;

    e.stopPropagation();

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const wasExpanded = card.classList.contains('expanded');

    // Close all
    track.querySelectorAll('.skill-card, .strength-card').forEach((c) =>
      c.classList.remove('expanded')
    );

    if (!wasExpanded) {
      pausedRef.current = true;
      wrapper.classList.add('has-expanded-card');
      card.classList.add('expanded');

      // Center the expanded card
      requestAnimationFrame(() => {
        const cardRect = card.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        const adjustment =
          cardRect.left + cardRect.width / 2 - (wrapperRect.left + wrapperRect.width / 2);
        posRef.current += adjustment;
        track.style.transition = 'transform 0.3s ease';
        track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
        setTimeout(() => {
          track.style.transition = 'none';
        }, 300);
      });
    } else {
      pausedRef.current = false;
      wrapper.classList.remove('has-expanded-card');
    }
  }, []);

  /* Build the two sets: originals + clones (keyed differently to avoid React warnings) */
  const items = Children.toArray(children);

  return (
    <div className="carousel-wrapper" id={id} ref={wrapperRef}>
      <div className="carousel-track" ref={trackRef} onClick={handleTrackClick}>
        {/* Original set */}
        {items}
        {/* Clone set — identical markup, different keys */}
        {items.map((child, i) =>
          cloneElement(child, { key: `clone-${i}` })
        )}
      </div>
    </div>
  );
}
