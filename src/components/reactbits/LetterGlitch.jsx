import React, { useEffect, useRef } from "react";

const DEFAULT_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=/[]{};:<>.,";
const DEFAULT_COLORS = ["#ffffff", "#FF4ECD", "#B3168A", "#60a5fa", "#a855f7"];

export default function LetterGlitch({
  characters = DEFAULT_CHARACTERS,
  glitchColors = DEFAULT_COLORS,
  baseColor = "#374151",
  fontSize = 15,
  spacing = 1.1,
  glitchAmount = 0.25,
  speed = 1,
  interactive = true,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const cellWidth = fontSize * 0.9 * spacing;
    const cellHeight = fontSize * 1.3 * spacing;

    // Grid data holding character, current color, and glitch status
    let grid = [];

    const initGrid = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      ctx.font = `${fontSize}px "SF Mono", "Fira Code", "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      cols = Math.ceil(width / cellWidth) + 1;
      rows = Math.ceil(height / cellHeight) + 1;

      grid = new Array(cols * rows).fill(null).map(() => ({
        char: characters[Math.floor(Math.random() * characters.length)],
        color: baseColor,
        isGlitched: false,
        ttl: 0,
      }));
    };

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    initGrid();
    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = performance.now();
    const glitchInterval = 60 / speed;
    let accumulator = 0;

    const render = (time) => {
      animationId = requestAnimationFrame(render);
      const delta = time - lastTime;
      lastTime = time;
      accumulator += delta;

      if (accumulator < glitchInterval) return;
      accumulator = 0;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active;
      const mouseRadius = 140;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const cell = grid[index];
          if (!cell) continue;

          const x = c * cellWidth + cellWidth / 2;
          const y = r * cellHeight + cellHeight / 2;

          // Check distance to mouse
          let isNearMouse = false;
          if (isMouseActive) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < mouseRadius) {
              isNearMouse = true;
            }
          }

          // Random glitch chance or mouse excitation
          if (cell.ttl > 0) {
            cell.ttl--;
            if (cell.ttl === 0) {
              cell.isGlitched = false;
              cell.color = baseColor;
            }
          } else if (isNearMouse || Math.random() < glitchAmount * 0.08) {
            cell.char = characters[Math.floor(Math.random() * characters.length)];
            cell.isGlitched = true;
            cell.color =
              glitchColors[Math.floor(Math.random() * glitchColors.length)];
            cell.ttl = Math.floor(Math.random() * 8) + 3;
          }

          ctx.fillStyle = cell.color;
          ctx.fillText(cell.char, x, y);
        }
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [
    characters,
    glitchColors,
    baseColor,
    fontSize,
    spacing,
    glitchAmount,
    speed,
    interactive,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
