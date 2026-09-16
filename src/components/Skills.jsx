import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollVelocity from "./reactbits/ScrollVelocity";
import { skillsData, marqueeItems } from "../data/skills";
import { TbSparkle } from "react-icons/tb";

export default function Skills() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.4,
  });

  // Scroll transitions: rotation, parallax Y, 3D tilt, scale & glow response
  const rotate = useTransform(smoothProgress, [0, 1], [-180, 180]);
  const translateY = useTransform(smoothProgress, [0, 1], [60, -60]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-12, 0, 12]);
  const scale = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.78, 1.06, 1, 0.82]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.35]);

  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.15, 0.85]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.08, 0.22, 0.08]);

  return (
    <section id="skills" className="relative mx-auto mt-16 flex flex-col rounded-3xl pt-10">
      {/* Background ambient blur */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FF4ECD]/5 blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#B3168A]/5 blur-[140px]" />
      </div>

      {/* 3D Graphic Artwork with ambient glow and scrolling transition */}
      <div
        ref={containerRef}
        className="relative mx-auto size-fit mb-6 select-none"
        style={{ perspective: 1000 }}
      >
        {/* Scroll-reactive subtle ambient glow */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF4ECD]/10 via-[#6799fe]/8 to-transparent blur-3xl -z-10 pointer-events-none"
        />

        {/* Scroll-driven parallax & scale container */}
        <motion.div
          style={{ y: translateY, scale, opacity }}
          className="relative mx-auto size-48 sm:size-56 md:size-64 flex items-center justify-center cursor-pointer will-change-transform"
        >
          {/* Ambient idle float */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="size-full flex items-center justify-center"
          >
            {/* Scroll-driven 3D rotation and tilt */}
            <motion.div
              style={{
                rotate,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.1, rotate: 15, transition: { duration: 0.3 } }}
              className="size-full flex items-center justify-center"
            >
              <img
                src="/skills.webp"
                alt="Skills Artwork"
                className="size-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] drop-shadow-[0_0_15px_rgba(255,78,205,0.06)] filter"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Heading */}
      <SectionHeading
        watermark="SKILLS"
        title="Skills"
        subtitle="I CONSTANTLY TRY TO IMPROVE"
      />

      {/* Grid of skill badges */}
      <div className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-3.5 lg:gap-4 px-4">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.4,
                delay: (index % 8) * 0.035,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{
              scale: 1.06,
              rotate: 6,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.96,
              transition: { duration: 0.1 },
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="group relative flex items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-neutral-900/90 px-4 py-2 text-[15px] sm:text-base text-white/80 hover:text-white hover:bg-neutral-800 transition-colors duration-150 shadow-md cursor-pointer select-none"
          >
            <div className="size-5 flex items-center justify-center flex-shrink-0 cursor-pointer transition-transform duration-200 ease-out group-hover:scale-110">
              <motion.div
                whileHover={{ rotate: 360, transition: { duration: 0.5, ease: "easeInOut" } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="size-full flex items-center justify-center"
              >
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  className="size-full object-contain pointer-events-none"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.failed && skill.localFallback) {
                      e.currentTarget.dataset.failed = "true";
                      e.currentTarget.src = skill.localFallback;
                    } else {
                      e.currentTarget.style.display = "none";
                    }
                  }}
                />
              </motion.div>
            </div>
            <span className="font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Tilted Crossed Marquee Ribbons */}
      <div className="py-24 overflow-x-clip relative mt-8">
        {/* Background tilted decorative ribbon */}
        <div
          className="z-0 translate-y-10 rotate-6 bg-gradient-to-r from-[#6799fe] to-[#0255fb] py-5 opacity-40 md:rotate-3 lg:translate-y-14 lg:py-7 w-[120%] -ml-[10%]"
        />

        {/* Foreground tilted marquee ribbon with Scroll Velocity Effect */}
        <div
          className="z-10 -mx-2 flex -rotate-3 items-center justify-center overflow-x-clip bg-gradient-to-r from-[#6799fe] via-[#a855f7] to-[#e401d1] py-3 lg:py-5 shadow-2xl"
        >
          <div className="flex overflow-hidden w-full select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ScrollVelocity baseVelocity={55} numCopies={8}>
              {marqueeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3 font-semibold uppercase tracking-wide text-white text-sm md:text-lg whitespace-nowrap mx-3 sm:mx-4 md:mx-6"
                >
                  <span>{item}</span>
                  <TbSparkle className="size-5 text-white/90 fill-white shrink-0" />
                </div>
              ))}
            </ScrollVelocity>
          </div>
        </div>
      </div>
    </section>
  );
}
