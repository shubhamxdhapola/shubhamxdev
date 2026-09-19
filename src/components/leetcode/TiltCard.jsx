import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * TiltCard provides smooth, physics-based 3D directional tilting on hover.
 * The card tilts towards where the cursor hovers and springs smoothly back to flat on leave.
 * It also preserves existing hover styles, borders, spotlights, and child elements.
 */
export default function TiltCard({
  children,
  className = "",
  containerClassName = "",
  maxTilt = 7, // Maximum tilt in degrees
  perspective = 1000, // 3D perspective in px
  scaleOnHover = 1.015, // Subtle scale up on hover
  disabled = false,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural tactile feel without jarring jumps
  const springConfig = { stiffness: 240, damping: 22, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Directional tilt transforms: tilting towards cursor location
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    if (!isHovered) setIsHovered(true);

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={`w-full ${containerClassName}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          ...style,
        }}
        animate={{
          scale: isHovered && scaleOnHover ? scaleOnHover : 1,
        }}
        transition={{
          scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`w-full will-change-transform ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}
