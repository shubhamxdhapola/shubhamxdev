import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiCode, FiTerminal, FiMail, FiLayers } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { Github, Linkedin, Facebook } from "./SocialIcons";
import SectionHeading from "./SectionHeading";
import PixelTransition from "./reactbits/PixelTransition";
import CircularText from "./reactbits/CircularText";
import LogoLoop from "./reactbits/LogoLoop";
import ScrollReveal from "./reactbits/ScrollReveal";
import { profileData } from "../data/profile";
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const whatIDoLogos = [
    {
      node: (
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300 cursor-default select-none whitespace-nowrap">
          <FiCode className="h-4 w-4 text-[#FF4ECD]" />
          <span className="text-sm font-semibold text-gray-200">
            Frontend Development
          </span>
        </div>
      ),
      title: "Frontend Development",
    },
    {
      node: (
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300 cursor-default select-none whitespace-nowrap">
          <FiTerminal className="h-4 w-4 text-[#D936B2]" />
          <span className="text-sm font-semibold text-gray-200">
            Backend Development
          </span>
        </div>
      ),
      title: "Backend Development",
    },
    {
      node: (
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300 cursor-default select-none whitespace-nowrap">
          <FiLayers className="h-4 w-4 text-[#FFD6F4]" />
          <span className="text-sm font-semibold text-gray-200">
            Full Stack Development
          </span>
        </div>
      ),
      title: "Full Stack Development",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-10 sm:pt-16 pb-28 sm:pb-24 text-gray-300 relative overflow-hidden"
    >
      {/* Background ambient radial glow spots with gentle parallax */}
      <motion.div
        style={{ y: glowY1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#FF4ECD]/5 rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <motion.div
        style={{ y: glowY2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#B3168A]/5 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      {/* Section Heading */}
      <SectionHeading
        watermark="ABOUT ME"
        title="About Me"
        subtitle="MORE ABOUT ME"
      />

      {/* Content Container */}
      <div className="flex flex-col xl:flex-row items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 gap-10 lg:gap-16 w-full min-w-0">
        {/* Left: Avatar with floating badges (Order 1 on mobile & desktop for natural flow) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 xl:order-1 flex-shrink-0 my-3 sm:my-5 xl:my-0"
        >
          {/* Moving & Floating Animation container replicating reference website */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Glowing background circles with breathing pulse animation */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-[#FF4ECD]/25 via-[#B3168A]/25 to-[#FF4ECD]/25 blur-xl -z-10"
            />
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FFD6F4]/30 via-[#FF4ECD]/40 to-[#B3168A]/30 -z-10"
            />

            {/* Circular Text from ReactBits */}
            <div className="absolute -inset-6 sm:-inset-7 md:-inset-8 pointer-events-none flex items-center justify-center z-0 select-none">
              <CircularText
                text="OPEN TO WORK ● OPEN TO WORK ● OPEN TO WORK ● OPEN TO WORK ● "
                spinDuration={24}
                onHover="speedUp"
                className="size-full text-[#FFD6F4]/75 text-[12px] sm:text-[13px] md:text-[14px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,78,205,0.4)] pointer-events-none"
              />
            </div>

            {/* Avatar image container with PixelTransition */}
            <div className="flex justify-center size-48 sm:size-56 md:size-60 lg:size-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-900/60 backdrop-blur-sm relative cursor-pointer group z-20">
              <PixelTransition
                firstContent={
                  <img
                    src={profileData.avatarUrl}
                    alt={`${profileData.name}'s Avatar`}
                    className="h-full w-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                }
                secondContent={
                  <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0b26] via-[#11071F] to-[#0a0514] select-none">
                    <div className="absolute inset-0 bg-radial from-[#FF4ECD]/20 to-transparent pointer-events-none" />
                    <img
                      src={profileData.avatarAltUrl || "/memoji.png"}
                      alt={`${profileData.name} Memoji`}
                      className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_10px_20px_rgba(255,78,205,0.35)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                }
                gridSize={8}
                pixelColor="#FF4ECD"
                animationStepDuration={0.35}
                className="w-full h-full rounded-full"
              />
            </div>

            {/* Top-Right Floating Badge with counter-float */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 md:-top-6 md:-right-6 bg-gradient-to-br from-[#FFD6F4] to-[#FF4ECD] text-slate-950 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[12px] sm:text-xs md:text-sm font-bold shadow-lg shadow-[#FF4ECD]/20 select-none z-30 cursor-default"
            >
              Developer
            </motion.div>

            {/* Bottom-Left Floating Badge with counter-float */}
            <motion.div
              animate={{
                y: [0, 6, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 4.2,
                delay: 0.3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-4 md:-bottom-4 md:-left-6 bg-gradient-to-br from-slate-900/90 to-slate-950/90 text-[#FFD6F4] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[12px] sm:text-xs md:text-sm font-medium shadow-lg border border-[#FF4ECD]/25 backdrop-blur-md select-none z-30 cursor-default"
            >
              Full Stack
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Bio and details (Order 2 on mobile & desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="w-full min-w-0 max-w-xl xl:text-left text-center order-2 lg:order-2 px-1 sm:px-0"
        >
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-white tracking-wide">
            Hey! I'm{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] bg-clip-text text-transparent font-bold">
                {profileData.shortName}
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD6F4] to-[#FF4ECD] rounded-full" />
            </span>
          </h3>

          <ScrollReveal
            containerClassName="mb-4 block"
            textClassName="text-sm text-justify sm:text-base leading-relaxed text-gray-200 font-normal break-words"
            scrollStart="top bottom-=10%"
            scrollEnd="bottom bottom-=20%"
            blurStrength={3}
            baseOpacity={0.2}
          >
            {profileData.bioParagraph1}
          </ScrollReveal>

          <ScrollReveal
            containerClassName="mb-6 block"
            textClassName="text-sm sm:text-base text-justify leading-relaxed text-gray-200 font-normal break-words"
            scrollStart="top bottom-=10%"
            scrollEnd="bottom bottom-=20%"
            blurStrength={3}
            baseOpacity={0.2}
          >
            {profileData.bioParagraph2}
          </ScrollReveal>

          {/* What I Do Pills with ReactBits LogoLoop animation */}
          <div className="mb-6 sm:mb-7 w-full min-w-0 overflow-hidden">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 text-white tracking-wide">What I Do</h4>
            <div className="w-full max-w-full overflow-hidden -my-2 min-w-0">
              <LogoLoop
                logos={whatIDoLogos}
                speed={50}
                direction="left"
                gap={16}
                logoHeight={40}
                pauseOnHover={true}
                fadeOut={true}
                fadeOutColor="#030712"
                className="py-2"
                ariaLabel="What I Do skills loop"
              />
            </div>
          </div>

          {/* Connect With Me Socials */}
          <div className="w-full min-w-0">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 text-white tracking-wide">
              Connect With Me
            </h4>
            <div className="flex items-center gap-3 sm:gap-4 mt-4 xl:justify-start justify-center flex-wrap">
              {profileData.socials.github && (
                <Link
                  to={profileData.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex items-center justify-center size-11 sm:size-12 rounded-full bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:text-[#FFD6F4] hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 ease-out cursor-pointer shadow-sm"
                >
                  <Github size={19} />
                </Link>
              )}

              {profileData.socials.linkedin && (
                <Link
                  to={profileData.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center size-11 sm:size-12 rounded-full bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:text-[#FFD6F4] hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 ease-out cursor-pointer shadow-sm"
                >
                  <Linkedin size={19} />
                </Link>
              )}

              {profileData.socials.leetcode && (
                <Link
                  to={profileData.socials.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LeetCode"
                  className="flex items-center justify-center size-11 sm:size-12 rounded-full bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:text-[#FFD6F4] hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 ease-out cursor-pointer shadow-sm"
                >
                  <SiLeetcode size={19} />
                </Link>
              )}

              {profileData.socials.facebook && (
                <Link
                  to={profileData.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center size-11 sm:size-12 rounded-full bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:text-[#FFD6F4] hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 ease-out cursor-pointer shadow-sm"
                >
                  <Facebook size={19} />
                </Link>
              )}

              {profileData.socials.email && (
                <Link
                  to={profileData.socials.email}
                  aria-label="Email"
                  className="flex items-center justify-center size-11 sm:size-12 rounded-full bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10 hover:border-[#FF4ECD]/50 hover:bg-white/[0.08] hover:text-[#FFD6F4] hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 ease-out cursor-pointer shadow-sm"
                >
                  <FiMail size={18} />
                </Link>
              )}
            </div>
          </div>

          {/* View Resume CTA with capsule-like hover style */}
          <div className="mt-8 mb-6 sm:mb-0 flex xl:justify-start justify-center">
            <Link
              to="/resume"
              className="inline-block px-7 sm:px-8 py-3 bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] bg-no-repeat text-slate-950 font-semibold rounded-full overflow-hidden shadow-lg shadow-[#FF4ECD]/20 hover:shadow-[#FF4ECD]/40 hover:scale-105 active:scale-95 transition-all duration-300 tracking-wide cursor-pointer text-sm sm:text-base"
            >
              View Resume
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
