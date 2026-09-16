import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import Particles from "./reactbits/Particles";
import BlurText from "./reactbits/BlurText";
import { profileData } from "../data/profile";
import { Link } from "react-router-dom";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* Official ReactBits Particles Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Particles
          particleColors={["#ffffff", "#FF4ECD", "#B3168A", "#FFD6F4"]}
          particleCount={260}
          particleSpread={10}
          speed={0.12}
          particleBaseSize={110}
          moveParticlesOnHover={true}
          particleHoverFactor={1.2}
          alphaParticles={false}
          sizeRandomness={1}
          cameraDistance={20}
          className="w-full h-full"
        />
      </div>

      {/* Ambient gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF4ECD]/[0.05] via-transparent to-[#B3168A]/[0.05] blur-3xl pointer-events-none" />

      {/* Floating angled glass capsules with entrance transitions and continuous float animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Capsule 1: Top-Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -35, y: -25 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        >
          <div
            className="-rotate-[3deg] animate-float-slow"
            style={{ "--rot": "10deg" }}
          >
            <div className="w-[360px] sm:w-[480px] md:w-[560px] h-[90px] md:h-[130px] rounded-full bg-gradient-to-r to-transparent from-[#FF4ECD]/[0.12] backdrop-blur-[2px] border border-white/[0.1] shadow-[0_4px_24px_0_rgba(255,78,205,0.06)]" />
          </div>
        </motion.div>

        {/* Capsule 2: Bottom-Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 35, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[-8%] md:right-[0%] top-[65%] md:top-[72%]"
        >
          <div
            className="-rotate-[30deg] animate-float-delayed"
            style={{ "--rot": "-30deg" }}
          >
            <div className="w-[300px] sm:w-[400px] md:w-[460px] h-[80px] md:h-[110px] rounded-full bg-gradient-to-r to-transparent from-[#B3168A]/[0.11] backdrop-blur-[2px] border border-white/[0.1] shadow-[0_4px_24px_0_rgba(179,22,138,0.06)]" />
          </div>
        </motion.div>

        {/* Capsule 3: Bottom-Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -25, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        >
          <div
            className="-rotate-[23deg] animate-float-slow"
            style={{ "--rot": "-23deg" }}
          >
            <div className="w-[200px] md:w-[280px] h-[55px] md:h-[75px] rounded-full bg-gradient-to-r to-transparent from-slate-400/[0.08] backdrop-blur-[2px] border border-white/[0.1]" />
          </div>
        </motion.div>

        {/* Capsule 4: Top-Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 25, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[12%] md:right-[18%] top-[10%] md:top-[15%]"
        >
          <div
            className="rotate-[5deg] animate-float-delayed"
            style={{ "--rot": "5deg" }}
          >
            <div className="w-[150px] md:w-[200px] h-[45px] md:h-[60px] rounded-full bg-gradient-to-r to-transparent from-[#D936B2]/[0.12] backdrop-blur-[2px] border border-white/[0.1]" />
          </div>
        </motion.div>

        {/* Capsule 5: Top-Center-Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[18%] md:left-[24%] top-[6%] md:top-[10%]"
        >
          <div
            className="-rotate-[40deg] animate-float-slow"
            style={{ "--rot": "-10deg" }}
          >
            <div className="w-[110px] md:w-[150px] h-[30px] md:h-[40px] rounded-full bg-gradient-to-r to-transparent from-[#FFD6F4]/[0.1] backdrop-blur-[2px] border border-white/[0.1]" />
          </div>
        </motion.div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Coder X Dreamer Heading with Left-to-Right Letter-by-Letter Entrance Transition */}
          <div className="w-full flex justify-center items-center py-2 sm:py-3">
            <h1 className="w-full max-w-5xl mx-auto flex flex-wrap justify-center items-center font-rajdhani font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center select-none gap-x-3 gap-y-1 cursor-text">
              {/* Word 1: Coder */}
              <span className="inline-flex whitespace-nowrap">
                {profileData.headlinePrefix.split("").map((char, i) => {
                  const globalIdx = i;
                  return (
                    <motion.span
                      key={`prefix-${i}`}
                      initial={{ opacity: 0, y: 35, filter: "blur(10px)", scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + globalIdx * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -5, rotate: 6, scale: 1.1, transition: { duration: 0.15 } }}
                      className="inline-block text-white will-change-transform drop-shadow-[0_2px_18px_rgba(255,255,255,0.22)]"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>

              {/* Word 2: X (Accent) */}
              <span className="inline-flex whitespace-nowrap mx-1 sm:mx-2">
                {profileData.headlineAccent.split("").map((char, i) => {
                  const globalIdx = profileData.headlinePrefix.length + i;
                  return (
                    <motion.span
                      key={`accent-${i}`}
                      initial={{ opacity: 0, y: 35, filter: "blur(10px)", scale: 0.7 }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.1 + globalIdx * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -6, rotate: 6, scale: 1.1, transition: { duration: 0.15 } }}
                      className="inline-block bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] bg-clip-text text-transparent font-extrabold will-change-transform drop-shadow-[0_0_28px_rgba(255,78,205,0.85)]"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>

              {/* Word 3: Dreamer */}
              <span className="inline-flex whitespace-nowrap">
                {profileData.headlineSuffix.split("").map((char, i) => {
                  const globalIdx =
                    profileData.headlinePrefix.length +
                    profileData.headlineAccent.length +
                    i;
                  return (
                    <motion.span
                      key={`suffix-${i}`}
                      initial={{ opacity: 0, y: 35, filter: "blur(10px)", scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + globalIdx * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -5, rotate: 6, scale: 1.1, transition: { duration: 0.15 } }}
                      className="inline-block text-white will-change-transform drop-shadow-[0_2px_18px_rgba(255,255,255,0.22)]"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            </h1>
          </div>

          {/* Tagline Subtitle with ReactBits BlurText */}
          <div className="flex justify-center mt-4 mb-10">
            <BlurText
              text={profileData.heroTagline}
              delay={35}
              animateBy="words"
              direction="top"
              className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-300 font-medium max-w-2xl text-center justify-center"
            />
          </div>

          {/* Call to Actions - matching reference layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
          >
            {/* Let's Connect Button - reference site sliding fill hover effect with glass shine */}
            <Link
              to="/contact"
              className="group relative flex items-center gap-1 overflow-hidden rounded-full border border-white/10 bg-white/10 p-1 text-[15px] font-medium text-white backdrop-blur-xs transition-all duration-300 hover:border-white/20 cursor-pointer"
            >
              {/* Glass shine sweep effect */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full animate-glass-sheen bg-gradient-to-r from-transparent via-white/35 to-transparent z-20" />

              <span className="z-10 px-4 py-2 text-white transition-colors duration-300 group-hover:text-black">
                Let's Connect
              </span>
              <span className="absolute inset-0 -z-10 translate-x-full rounded-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-105">
                <ArrowRight className="h-4 w-4 text-black" />
              </span>
            </Link>

            {/* Email - reference site clean text transition */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 py-3 text-base font-light text-white/75 outline-none transition-all duration-300 cursor-pointer hover:text-white/90 group"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[#FF4ECD]" />
              ) : (
                <Copy className="h-4 w-4 text-white/75 transition-colors duration-300 group-hover:text-white/90" />
              )}
              <span className="tracking-wide">
                {copied ? "Copied to clipboard!" : profileData.email}
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </div>
  );
}
