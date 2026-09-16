import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal component from ReactBits
 * Animates text words into view with blur-to-sharp and opacity transitions as the user scrolls.
 */
export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.15,
  baseRotation = 2,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  scrollStart = "top bottom-=15%",
  scrollEnd = "bottom bottom-=20%",
  wordAnimationEnd = "bottom bottom-=20%",
  rotationEnd = "bottom bottom",
  scrub = true,
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : String(children || "");
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word-reveal select-none pointer-events-none" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const wordElements = el.querySelectorAll(".word-reveal");
    if (!wordElements.length) return;

    const ctx = gsap.context(() => {
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: scrollStart,
              end: rotationEnd,
              scrub: scrub,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          willChange: "opacity, filter",
          ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
        },
        {
          ease: "none",
          opacity: 1,
          ...(enableBlur ? { filter: "blur(0px)" } : {}),
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: wordAnimationEnd || scrollEnd,
            scrub: scrub,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    children,
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    scrollStart,
    scrollEnd,
    wordAnimationEnd,
    rotationEnd,
    blurStrength,
    scrub,
  ]);

  return (
    <div ref={containerRef} className={`inline-block ${containerClassName}`}>
      <p className={`${textClassName}`}>{splitText}</p>
    </div>
  );
}
