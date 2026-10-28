import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_STEPS = [
  "AWAKENING DEVELOPER NO JUTSU 🌀",
  "COMPILING WITH PLUS ULTRA ENERGY 💥",
  "SUMMONING DATA FROM THE SHADOW REALM 👾",
  "DEBUGGING LIKE A SLEEP-DEPRIVED SORCERER ☕",
  "DOMAIN EXPANSION: PORTFOLIO LOADED ⚡",
];

export default function InitialLoader({ isReady = true, minDuration = 2200, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [isMorphed, setIsMorphed] = useState(false);
  const [laserActive, setLaserActive] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);

  const completedRef = useRef(false);
  const startTimeRef = useRef(null);

  // Derive status step reactively based on progress
  const stepIndex =
    progress < 25 ? 0 :
      progress < 50 ? 1 :
        progress < 75 ? 2 :
          progress < 98 ? 3 : 4;

  const triggerExitSequence = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Phase 1: Snap to 100% and activate laser slicing beam
    setProgress(100);
    setIsMorphed(true);
    setLaserActive(true);

    // Phase 2: After laser slices across, split curtains open
    setTimeout(() => {
      setIsSplitting(true);
    }, 280);

    // Phase 3: Notify parent app as curtains reveal the underlying hero
    setTimeout(() => {
      onComplete?.();
    }, 550);

    // Phase 4: Unmount loader after curtains have fully opened
    setTimeout(() => {
      setShow(false);
    }, 1150);
  }, [onComplete]);

  // Smooth progress animation with organic easing
  useEffect(() => {
    let animationFrameId;

    const animateProgress = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Calculate base progress based on minDuration
      const durationFraction = Math.min(elapsed / minDuration, 1);

      // Smooth custom easing curve
      const easedProgress = Math.min(
        Math.floor(
          durationFraction < 0.5
            ? 4 * durationFraction * durationFraction * durationFraction * 50
            : (1 - Math.pow(-2 * durationFraction + 2, 3) / 2) * 100
        ),
        isReady ? 100 : 98
      );

      setProgress((prev) => Math.max(prev, easedProgress));

      // Morph typography around 44%
      if (easedProgress >= 44 && !isMorphed) {
        setIsMorphed(true);
      }

      // Check if finished
      if (elapsed >= minDuration && isReady) {
        triggerExitSequence();
      } else if (!completedRef.current) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [minDuration, isReady, isMorphed, triggerExitSequence]);

  // Safety fallback timeout to prevent ever hanging indefinitely
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!completedRef.current) {
        triggerExitSequence();
      }
    }, Math.max(minDuration + 2500, 5000));

    return () => clearTimeout(safetyTimer);
  }, [minDuration, triggerExitSequence]);

  // Keyboard shortcut to skip (Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        triggerExitSequence();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerExitSequence]);

  if (!show) return null;

  // Render identical viewport content inside each curtain half
  const renderHalfContent = (isTop) => (
    <div
      className={`absolute left-0 w-full h-[100vh] pointer-events-none ${isTop ? "top-0" : "bottom-0"
        }`}
    >
      {/* Background Subtle Luxury Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-[#FF4ECD]/[0.08] blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-[#00f5ff]/[0.04] blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* TOP ROW: Architectural Corner Metadata (Anchored to top, visible in Top Curtain) */}
      <div className="absolute top-6 left-6 right-6 sm:top-10 sm:left-12 sm:right-12 flex items-start justify-between z-20">
        {/* Top Left */}
        {/* <div className="flex flex-col gap-0.5 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4ECD]" />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.22em] text-white uppercase">
              SHUBHAM DHAPOLA
            </span>
          </div>
          <span className="font-mono text-[9px]font-semibold sm:text-[10px] tracking-[0.16em] text-zinc-400 pl-3.5">
            CREATIVE ENGINEER &bull; ARCHITECT
          </span>
        </div> */}

        {/* Top Right */}
        {/* <div className="flex flex-col gap-0.5 text-right">
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.22em] text-white uppercase">
            PORTFOLIO // 2025
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] text-[#FF4ECD]">
            V2.0 &bull; 22.71&deg;N 75.85&deg;E
          </span>
        </div> */}
      </div>

      {/* CENTER ROW: The Kinetic Wordmark & Typographic Morph */}
      {/* Centered mathematically at 50vh so the split line cuts exactly through its equator */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center z-10 px-4">
        <AnimatePresence mode="wait">
          {!isMorphed ? (
            /* Phase 1: Full Name Editorial Typography (0% - ~45%) */
            <motion.div
              key="full-name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -14,
                filter: "blur(10px)",
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center select-none"
            >
              <div className="overflow-hidden">
                <h1 className="font-rajdhani font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.16em] sm:tracking-[0.22em] md:tracking-[0.28em] text-white uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.18)]">
                  SHUBHAM DHAPOLA
                </h1>
              </div>
              <div className="flex items-center gap-3 mt-2 sm:mt-3">
                <span className="h-[1px] w-6 sm:w-12 bg-white/20" />
                <p className="font-semibold text-[9px] sm:text-xs md:text-sm tracking-[0.32em] text-zinc-400 uppercase">
                  FULL STACK DEVELOPER
                </p>
                <span className="h-[1px] w-6 sm:w-12 bg-white/20" />
              </div>
            </motion.div>
          ) : (
            /* Phase 2: Morph into Monogram S ˣ D (Directly inspired by Pesquera Diez P¹⁰) */
            <motion.div
              key="monogram"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center select-none relative"
            >
              {/* S Letter */}
              <span className="font-rajdhani font-black text-5xl sm:text-7xl md:text-[7rem] lg:text-[10rem] tracking-tighter text-white leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                影.exe
              </span>

              {/* Cyber Cross Accent ˣ */}
              <div className="flex flex-col items-center justify-center mx-1 sm:mx-3 md:mx-4">
                <span className="font-mono text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#FF4ECD] font-bold leading-none drop-shadow-[0_0_20px_#FF4ECD]">
                  &times;
                </span>
              </div>

              {/* D Letter */}
              <div className="relative flex items-center">
                <span className="font-rajdhani font-black text-5xl sm:text-7xl md:text-[7rem] lg:text-[10rem] tracking-tighter text-white leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                  シ
                </span>

                {/* High-Tech Superscript Pill Badge */}
                {/* <div className="absolute -top-3 sm:-top-5 md:-top-7 -right-8 sm:-right-12 md:-right-16 flex flex-col items-start">
                  <span className="font-mono text-[9px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF4ECD] bg-[#FF4ECD]/10 border border-[#FF4ECD]/40 px-1.5 sm:px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(255,78,205,0.3)]">
                    DEV
                  </span>
                  <span className="font-mono text-[7px] sm:text-[9px] tracking-widest text-zinc-400 mt-0.5 pl-1">
                    2025
                  </span>
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* COUNTER & PROGRESS SECTION: Positioned below center in Bottom Curtain */}
      <div className="absolute top-[calc(50%+65px)] sm:top-[calc(50%+85px)] md:top-[calc(50%+110px)] left-0 right-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none">
        <div className="flex flex-col items-center w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
          {/* Big Tabular Counter (Inspired by Spylt reference video 1) */}
          <div className="flex items-baseline justify-center gap-1  mb-2">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white tabular-nums drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {String(progress).padStart(2, "0")}
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#FF4ECD]">
              %
            </span>
          </div>

          {/* Glowing Hairline Progress Track */}
          <div className="relative w-full h-[5px] bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-white via-[#FF4ECD] to-[#00f5ff] rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_#FF4ECD]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Technical Status Feed */}
          <div className="mt-3 flex items-center justify-between w-full text-[9px] sm:text-[10px] text-zinc-400">
            <div className="flex items-center gap-1.5 truncate max-w-[210px] sm:max-w-none">
              <span className="text-[#FF4ECD] font-bold">&gt;</span>
              <span className="text-zinc-300 tracking-wider truncate font-semibold">
                {STATUS_STEPS[stepIndex]}
              </span>
            </div>
            <span className="text-zinc-500 font-semibold tracking-widest ml-2 shrink-0">
              [0{stepIndex + 1}/05]
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Footer Telemetry & Live Status (Anchored to bottom, visible in Bottom Curtain) */}
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-12 sm:right-12 flex items-end justify-between z-20">
        {/* Bottom Left */}
        {/* <div className="flex flex-col gap-0.5 text-left">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4ECD] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4ECD]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-300">
              STATUS: LIVE_CONNECT
            </span>
          </div>
          <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.16em] text-zinc-400 pl-4">
            CORE READY &bull; HIGH PERFORMANCE
          </span>
        </div> */}

        {/* Bottom Right: Skip Hint */}
        <button
          type="button"
          onClick={triggerExitSequence}
          className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white uppercase cursor-pointer font-semibold"
          title="Skip loader animation"
        >
          <span>SKIP</span>
          <span className="text-[8px] text-zinc-400 bg-white/10 px-1.5 py-0.2 rounded font-sans">
            ESC
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP HALF CURTAIN (0% to 50vh) - Slides UP on split
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isSplitting ? "-100%" : "0%" }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
        className="fixed top-0 left-0 right-0 h-[50vh] overflow-hidden bg-[#030712] pointer-events-auto"
      >
        {renderHalfContent(true)}
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          2. BOTTOM HALF CURTAIN (50vh to 100vh) - Slides DOWN on split
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isSplitting ? "100%" : "0%" }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
        className="fixed bottom-0 left-0 right-0 h-[50vh] overflow-hidden bg-[#030712] pointer-events-auto"
      >
        {renderHalfContent(false)}
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          3. HORIZONTAL LASER SLICING LINE (Right at 50vh Centerline)
             Slices across horizontally from center, then dissolves as curtains part
          ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-[10001] flex items-center justify-center">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            laserActive
              ? {
                scaleX: isSplitting ? [1, 1] : [0, 1],
                opacity: isSplitting ? 0 : [0, 1, 1],
              }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{
            duration: isSplitting ? 0.35 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full h-[2px] bg-white shadow-[0_0_15px_#ffffff,0_0_35px_#FF4ECD,0_0_70px_#FF4ECD]"
        />
      </div>
    </div>
  );
}
