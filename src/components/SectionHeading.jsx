import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ watermark, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
      {/* Watermark + Foreground Title */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center select-none">
        {/* Subtle radial glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-[#FF4ECD]/25 via-[#B3168A]/20 to-transparent blur-3xl pointer-events-none" />

        {/* Translucent background watermark with balanced large proportions */}
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.75rem] font-bold text-white/[0.055] select-none tracking-wide uppercase leading-none font-rajdhani pointer-events-none"
        >
          {watermark}
        </motion.span>

        {/* Crisp foreground title with refined size & ReactBits blur-to-sharp entrance */}
        <motion.h2
          initial={{ opacity: 0, filter: "blur(10px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-4xl md:text-[3.1rem] lg:text-[3.5rem] font-bold text-white capitalize tracking-wide font-rajdhani drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          {title}
        </motion.h2>
      </div>

      {/* Decorative divider lines with glowing center dot */}
      <div className="flex items-center gap-3 my-4 md:my-5">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-10 md:w-14 bg-gradient-to-r from-transparent to-[#FF4ECD]/60 origin-right"
        />
        <div className="h-1.5 w-1.5 rounded-full bg-[#FF4ECD] shadow-[0_0_10px_#FF4ECD] animate-pulse" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-10 md:w-14 bg-gradient-to-l from-transparent to-[#FF4ECD]/60 origin-left"
        />
      </div>

      {/* Uppercase description label with subtle tracking reveal */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.15em", y: 10 }}
          whileInView={{ opacity: 1, letterSpacing: "0.25em", y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-sm text-gray-400 uppercase max-w-md text-center font-medium font-rajdhani"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
