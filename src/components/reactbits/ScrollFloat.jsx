import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollFloat component from ReactBits
 * Animates characters to "float" up as the user scrolls into view.
 */
export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top bottom-=10%",
  scrollEnd = "bottom bottom-=35%",
  stagger = 0.03,
  scrub = true,
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : String(children || "");
    const words = text.split(" ");
    return words.map((word, wordIndex) => (
      <React.Fragment key={wordIndex}>
        <span className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <span
              className="inline-block char-float select-none pointer-events-none"
              key={charIndex}
            >
              {char}
            </span>
          ))}
        </span>
        {wordIndex < words.length - 1 ? " " : ""}
      </React.Fragment>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll(".char-float");
    if (!charElements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.2,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
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
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    scrub,
  ]);

  return (
    <div ref={containerRef} className={`overflow-hidden inline-block ${containerClassName}`}>
      <span className={`inline-block ${textClassName}`}>
        {splitText}
      </span>
    </div>
  );
}
