import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ScrollVelocity({
  children,
  texts = [],
  baseVelocity = 50,
  velocity,
  numCopies = 8,
  className = "",
  damping = 40,
  stiffness = 350,
  velocityMapping = { input: [0, 800], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
}) {
  const effectiveVelocity = velocity ?? baseVelocity;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 40,
    stiffness: stiffness ?? 350,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 800],
    velocityMapping?.output || [0, 5],
    { clamp: false }
  );

  const copyRef = useRef(null);
  const [copyWidth, setCopyWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
    function updateWidth() {
      if (copyRef.current) {
        setCopyWidth(copyRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [children, texts]);

  function wrap(min, max, v) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth <= 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  // Base direction: default flowing right-to-left (-1)
  const defaultDir = effectiveVelocity >= 0 ? -1 : 1;
  const directionFactor = useRef(defaultDir);

  useAnimationFrame((t, delta) => {
    const vFactor = velocityFactor.get();

    // Direction dynamically accelerates forward or reverses on reverse scroll
    let currentDir = defaultDir;
    if (vFactor < -0.05) {
      currentDir = -defaultDir; // Reverse on upward scroll
    } else if (vFactor > 0.05) {
      currentDir = defaultDir; // Accelerate on downward scroll
    }
    directionFactor.current = currentDir;

    // Movement: base speed + dynamic scroll velocity boost
    const baseMove = Math.abs(effectiveVelocity) * (delta / 1000);
    const boost = 1 + Math.abs(vFactor);
    const moveBy = currentDir * baseMove * boost;

    baseX.set(baseX.get() + moveBy);
  });

  // Prepare content to repeat
  const contentToRender = children
    ? children
    : texts.map((text, idx) => (
        <span key={idx} className="mx-4 sm:mx-6 inline-flex items-center">
          {text}
        </span>
      ));

  const copies = [];
  for (let i = 0; i < (numCopies ?? 8); i++) {
    copies.push(
      <div
        key={i}
        ref={i === 0 ? copyRef : null}
        className="flex-shrink-0 inline-flex items-center"
      >
        {contentToRender}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden whitespace-nowrap select-none w-full ${parallaxClassName}`}
      style={parallaxStyle}
    >
      <motion.div
        className={`inline-flex items-center ${className} ${scrollerClassName}`}
        style={{ x, ...scrollerStyle }}
      >
        {copies}
      </motion.div>
    </div>
  );
}

export default ScrollVelocity;
