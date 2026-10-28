import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * TextRepetitionBanner
 * Exact implementation of Codrops Demo 5 (HORIZONT / scroll-23.mp4)
 * Cascading ghost echo effect with solid color and opacity decay on scroll
 */
const TextRepetitionBanner = ({
  word = "SANCTUARY",
  subtitle = "THE ARCHITECTURE OF UNCOMPROMISED TRANQUILITY",
  totalWords = 8,
  tyIncrement = 16,
  txIncrement = 2,
  opacityIncrement = 0.15,
  delayIncrement = 0.01,
  color = "#751336"
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    // All words except the last one (the main centered one)
    const words = [...el.querySelectorAll('.rep-span')].slice(0, -1);
    if (words.length === 0) return;

    // Create GSAP timeline matching Demo 5
    const tl = gsap.timeline({ paused: true });

    tl.to(words, {
      duration: 1,
      ease: 'none',
      yPercent: (_, target) => -1 * parseFloat(target.dataset.ty || '0'),
      xPercent: (_, target) => -1 * parseFloat(target.dataset.tx || '0'),
      startAt: { opacity: 0 },
      opacity: (_, target) => parseFloat(target.dataset.opacity || '1'),
      delay: (_, target) => parseFloat(target.dataset.delay || '0')
    });

    timelineRef.current = tl;

    // Calculate progress on scroll
    const updateProgress = () => {
      if (!container || !timelineRef.current) return;
      const scrollPosition = window.scrollY + window.innerHeight;
      const elPosition = scrollPosition - container.offsetTop;
      const durationDistance = window.innerHeight + container.offsetHeight;
      const currentProgress = Math.min(Math.max(elPosition / durationDistance, 0), 1);

      timelineRef.current.progress(currentProgress);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.ticker.add(updateProgress);
      } else {
        gsap.ticker.remove(updateProgress);
      }
    }, { threshold: 0 });

    observer.observe(container);
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    // Initial update
    updateProgress();

    return () => {
      gsap.ticker.remove(updateProgress);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      observer.disconnect();
      tl.kill();
    };
  }, [totalWords, tyIncrement, txIncrement, opacityIncrement, delayIncrement]);

  // Generate layers matching Demo 5
  const layers = [];
  for (let i = 0; i < totalWords; ++i) {
    const isMain = i === totalWords - 1;
    const tx = isMain ? 0 : -1 * (totalWords - i) * txIncrement;
    const ty = isMain ? 0 : -1 * (totalWords - i) * tyIncrement;
    const opacity = isMain ? 1 : Math.min(i * opacityIncrement, 1);
    const delay = isMain ? 0 : (totalWords - i) * delayIncrement;

    layers.push({
      index: i,
      tx,
      ty,
      opacity,
      delay,
      isMain
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 select-none sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        
        {/* Subtle pill kicker */}
        {subtitle && (
          <div className="glass-pill mb-5 inline-flex max-w-full items-center rounded-full border border-white/70 px-3 py-1.5 text-center text-[9px] font-bold uppercase leading-snug tracking-wider text-burgundy-950 sm:mb-4 sm:px-4 sm:text-[11px] sm:tracking-widest">
            <span>{subtitle}</span>
          </div>
        )}

        {/* Text repetition element */}
        <div className="relative flex w-full items-center justify-center pb-4 sm:pb-12">
          <div
            ref={textRef}
            className="text-rep font-black uppercase tracking-tight"
            style={{ '--mobile-word-size': `${120 / word.length}vw` }}
          >
            {layers.map((layer) => {
              if (layer.isMain) {
                return (
                  <span
                    key={layer.index}
                    className="rep-span is-main font-black relative z-30"
                    style={{
                      color: color,
                    }}
                  >
                    {word}
                  </span>
                );
              }

              return (
                <span
                  key={layer.index}
                  data-delay={layer.delay}
                  data-opacity={layer.opacity}
                  data-ty={layer.ty}
                  data-tx={layer.tx}
                  className="rep-span font-black pointer-events-none will-change-transform z-10"
                  style={{
                    color: color,
                    opacity: 0,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TextRepetitionBanner;
