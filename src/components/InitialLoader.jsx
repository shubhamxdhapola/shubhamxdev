import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LetterGlitch from "./reactbits/LetterGlitch";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText || text}</span>;
}

const STATUS_STEPS = [
  "CONNECTING_TO_CMS",
  "FETCHING_SITE_CONTENT",
  "HYDRATING_PORTFOLIO_DATA",
  "INITIALIZING_INTERFACE",
  "SYSTEM_ONLINE",
];

export default function InitialLoader({ isReady, minDuration = 1400, onComplete }) {
  const [progress, setProgress] = useState(12);
  const [show, setShow] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Derive status step reactively based on progress
  const stepIndex =
    progress < 30 ? 0 :
    progress < 60 ? 1 :
    progress < 85 ? 2 :
    progress < 100 ? 3 : 4;

  // Ensure loader stays visible for a pleasant minimum showcase duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  // Fallback safety timeout so the app never hangs indefinitely
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setMinTimeElapsed(true);
      setShow(false);
      onComplete?.();
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, [onComplete]);

  // Animate progress and status text
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (isReady && minTimeElapsed) return 100;
        if (prev < 88) {
          return prev + Math.floor(Math.random() * 8) + 3;
        }
        return prev;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isReady, minTimeElapsed]);

  // Trigger dismissal when both CMS is ready and min time elapsed
  useEffect(() => {
    if (isReady && minTimeElapsed) {
      setProgress(100);
      const dismissTimer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 450);
      return () => clearTimeout(dismissTimer);
    }
  }, [isReady, minTimeElapsed, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(12px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none"
        >
          {/* Background Letter Glitch Effect */}
          <div className="absolute inset-0 w-full h-full opacity-35">
            <LetterGlitch
              glitchColors={["#ffffff", "#FF4ECD", "#B3168A", "#00f5ff", "#e0e7ff"]}
              baseColor="#1e293b"
              fontSize={15}
              spacing={1.15}
              glitchAmount={0.3}
              speed={1.2}
              interactive={false}
              className="w-full h-full"
            />
          </div>

          {/* Vignette / Radial Gradient Overlay to focus center card */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.7)_55%,#030712_100%)]" />

          {/* Ambient Glow Orbs */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#FF4ECD]/10 blur-[120px] pointer-events-none -top-20 -left-20" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#B3168A]/10 blur-[120px] pointer-events-none -bottom-20 -right-20" />

          {/* Central Cyber Card */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[90%] max-w-md p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(255,78,205,0.18)] flex flex-col"
          >
            {/* Cyber Corner Decors */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF4ECD]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF4ECD]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#B3168A]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#B3168A]" />

            {/* Header / Subtitle */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 tracking-wider uppercase">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4ECD] animate-ping" />
                <span className="text-zinc-300">LIVE SYNC</span>
              </span>
              <span className="text-[#FF4ECD] font-semibold">CMS v2.0</span>
            </div>

            {/* Main Glitch Title */}
            <div className="my-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider font-mono">
                <ScrambleText text="SHUBHAM.DEV" />
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                FULL STACK DEVELOPER PORTFOLIO
              </p>
            </div>

            {/* Terminal Status Line */}
            <div className="mt-6 mb-3 p-2.5 rounded-lg bg-zinc-950/80 border border-white/5 font-mono text-xs text-zinc-300 flex items-center justify-between overflow-hidden">
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#FF4ECD] font-bold">&gt;</span>
                <span className="text-zinc-300 truncate">
                  {STATUS_STEPS[stepIndex]}
                </span>
              </div>
              <span className="text-[#FF4ECD] font-bold ml-2">
                {progress}%
              </span>
            </div>

            {/* Glowing High-Tech Progress Bar */}
            <div className="relative w-full h-1.5 rounded-full bg-zinc-800/80 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#FF4ECD] via-[#B3168A] to-[#00f5ff] shadow-[0_0_12px_rgba(255,78,205,0.8)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            {/* Footer Tag */}
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>INITIALIZING SECURE PROTOCOL</span>
              <span className="text-zinc-400">READY</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
