import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollStackItem sub-component
 * Used as child wrapper when providing custom cards to ScrollStack
 */
export function ScrollStackItem({ children, className = "", style = {}, ...props }) {
  return (
    <div className={`w-full ${className}`} style={style} {...props}>
      {children}
    </div>
  );
}

/**
 * Internal card animator that scales and dims underlying cards
 * as subsequent cards stack on top during page scroll.
 */
function StackCard({
  children,
  index,
  total,
  scrollYProgress,
  scaleStep,
  dim,
  blur,
  topOffset,
  itemDistance,
  itemMarginBottom,
  cardClassName,
}) {
  const isLast = index === total - 1;
  const cardsAfter = total - 1 - index;

  // Stacking sequence completes at ~90% of the scroll track; the remaining 10% holds the full deck
  const stackFinish = 0.90;
  const startProgress = total > 1 ? (index * stackFinish) / (total - 1) : 0;
  const targetScale = 1 - cardsAfter * scaleStep;
  const targetBrightness = 1 - cardsAfter * dim;
  const targetBlur = blur > 0 ? cardsAfter * blur : 0;

  const scale = useTransform(
    scrollYProgress,
    [0, startProgress, stackFinish, 1],
    [1, 1, targetScale, targetScale]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, startProgress, stackFinish, 1],
    [
      "brightness(1) blur(0px)",
      "brightness(1) blur(0px)",
      `brightness(${targetBrightness}) blur(${targetBlur}px)`,
      `brightness(${targetBrightness}) blur(${targetBlur}px)`,
    ]
  );

  // Synchronized margin formula:
  // In CSS: unpinScrollY = containerHeight - cardHeight - (topOffset + index * itemDistance) - marginBottom.
  // By subtracting (index * itemDistance) from marginBottom, (topOffset + marginBottom) becomes identical for all cards!
  // Therefore, ALL CARDS IN THE STACK UNPIN SIMULTANEOUSLY AT THE EXACT SAME PIXEL.
  // No card leaves early, and no card is left behind!
  const synchronizedMarginBottom = `calc(${itemMarginBottom} - ${index * itemDistance}px)`;

  return (
    <div
      style={{
        position: "sticky",
        top: `calc(${topOffset}px + ${index * itemDistance}px)`,
        zIndex: index + 10,
        marginBottom: synchronizedMarginBottom,
      }}
      className="w-full"
    >
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          filter: isLast || (dim === 0 && blur === 0) ? undefined : filter,
          transformOrigin: "top center",
          willChange: "transform, filter",
        }}
        className={`w-full rounded-2xl sm:rounded-3xl bg-[#080C16] shadow-2xl shadow-black/90 ${cardClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ScrollStack Component from ReactBits
 *
 * Creates a stacked card layout where pinned cards stack, turn, and dissolve
 * seamlessly as the user scrolls the page.
 *
 * @param {React.ReactNode} children - Custom child cards (overrides items)
 * @param {Array} items - Array of default card data objects
 * @param {number} itemDistance - Vertical pixel offset between each pinned card (default: 20)
 * @param {number} scaleStep - Incremental scale reduction for cards beneath (default: 0.035)
 * @param {number} dim - Brightness reduction for cards beneath (default: 0.06)
 * @param {number} blur - Blur in px for cards beneath (default: 0)
 * @param {number} topOffset - Pixels from top where first card pins (default: 110)
 * @param {string} itemMarginBottom - Scroll travel between cards (default: "45vh")
 * @param {string} stackHold - Scroll space for the full deck to hold before unpinning together (default: "45vh")
 * @param {string} className - Wrapper container class name
 * @param {string} cardClassName - Individual card container class name
 */
export default function ScrollStack({
  children,
  items = [],
  itemDistance = 20,
  scaleStep = 0.035,
  dim = 0.06,
  blur = 0,
  topOffset = 110,
  itemMarginBottom = "45vh",
  stackHold = "45vh",
  className = "",
  cardClassName = "",
}) {
  const containerRef = useRef(null);

  // Track window scroll progress through the entire stack container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Extract children array
  const childArray = React.Children.toArray(children);
  const elements = childArray.length > 0 ? childArray : items.map((item, idx) => (
    <div
      key={idx}
      className="rounded-3xl border border-white/10 bg-[#080C16] p-8 shadow-2xl"
    >
      {item.eyebrow && (
        <span className="text-xs font-mono tracking-widest text-[#FF4ECD] uppercase">
          {item.eyebrow}
        </span>
      )}
      {item.title && (
        <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
      )}
      {item.body && (
        <p className="text-white/70 mt-2 text-sm leading-relaxed">{item.body}</p>
      )}
    </div>
  ));

  const total = elements.length;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      {elements.map((element, index) => (
        <StackCard
          key={element.key || index}
          index={index}
          total={total}
          scrollYProgress={scrollYProgress}
          scaleStep={scaleStep}
          dim={dim}
          blur={blur}
          topOffset={topOffset}
          itemDistance={itemDistance}
          itemMarginBottom={itemMarginBottom}
          cardClassName={cardClassName}
        >
          {element}
        </StackCard>
      ))}

      {/* Sibling spacer ensuring the completed stack holds before all cards unpin together */}
      <div
        style={{ height: stackHold }}
        className="w-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
