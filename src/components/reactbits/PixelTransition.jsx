import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 8,
  pixelColor = '#FF4ECD',
  animationStepDuration = 0.25,
  once = false,
  aspectRatio = null,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const defaultRef = useRef(null);
  const activeRef = useRef(null);
  const pixelsRef = useRef([]);
  const timelineRef = useRef(null);

  const totalPixels = gridSize * gridSize;
  const pixelIndices = useMemo(() => Array.from({ length: totalPixels }, (_, i) => i), [totalPixels]);

  useEffect(() => {
    const defaultEl = defaultRef.current;
    const activeEl = activeRef.current;
    const pixels = pixelsRef.current.filter(Boolean);

    if (!defaultEl || !activeEl || pixels.length === 0) return;

    // Clean up any stale tweens
    gsap.killTweensOf([...pixels, defaultEl, activeEl]);

    // Ensure initial visual states
    gsap.set(pixels, { opacity: 0 });
    gsap.set(defaultEl, { opacity: 1, zIndex: 1 });
    gsap.set(activeEl, { opacity: 0, zIndex: 2 });

    const stagger = animationStepDuration / pixels.length;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.set(pixels, { opacity: 0 });
        gsap.set(defaultEl, { opacity: 0 });
        gsap.set(activeEl, { opacity: 1 });
      },
      onReverseComplete: () => {
        gsap.set(pixels, { opacity: 0 });
        gsap.set(defaultEl, { opacity: 1 });
        gsap.set(activeEl, { opacity: 0 });
      },
    });

    // Phase 1: Pixels flash in randomly from 0 to 1 (covering defaultEl)
    tl.to(pixels, {
      opacity: 1,
      duration: 0.04,
      stagger: { each: stagger, from: 'random' },
      immediateRender: false,
    });

    // Midway: Swap layers under the pixel cover
    tl.to(defaultEl, { opacity: 0, duration: 0.001 }, '>');
    tl.to(activeEl, { opacity: 1, duration: 0.001 }, '<');

    // Phase 2: Pixels dissolve away randomly from 1 to 0 (revealing activeEl)
    tl.to(pixels, {
      opacity: 0,
      duration: 0.04,
      stagger: { each: stagger, from: 'random' },
      immediateRender: false,
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      gsap.killTweensOf([...pixels, defaultEl, activeEl]);
    };
  }, [gridSize, pixelColor, animationStepDuration]);

  const handleEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  const handleLeave = () => {
    if (!once && timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  const handleClick = () => {
    // For touch devices where hover is not supported
    if (window.matchMedia('(pointer: coarse)').matches && timelineRef.current) {
      if (timelineRef.current.progress() >= 0.5) {
        timelineRef.current.reverse();
      } else {
        timelineRef.current.play();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Profile Avatar pixel transition"
    >
      {aspectRatio && <div style={{ paddingTop: aspectRatio }} />}
      <div
        ref={defaultRef}
        className="pixelated-image-card__default"
        style={{ opacity: 1, zIndex: 1 }}
      >
        {firstContent}
      </div>
      <div
        ref={activeRef}
        className="pixelated-image-card__active"
        style={{ opacity: 0, zIndex: 2 }}
      >
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels">
        {pixelIndices.map((i) => {
          const col = i % gridSize;
          const row = Math.floor(i / gridSize);
          const size = 100 / gridSize;
          return (
            <div
              key={i}
              ref={(el) => (pixelsRef.current[i] = el)}
              className="pixelated-image-card__pixel"
              style={{
                width: `${size + 0.6}%`,
                height: `${size + 0.6}%`,
                left: `${col * size}%`,
                top: `${row * size}%`,
                backgroundColor: pixelColor,
                opacity: 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
